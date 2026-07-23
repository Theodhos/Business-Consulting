#!/usr/bin/env node
/**
 * Starts Next.js on the first free port and prints where to find things.
 *
 *   npm run dev            → development server
 *   npm start              → production server (run `npm run build` first)
 *   npm run dev -- -p 4000 → force a specific port
 *
 * Plain `next dev -p 3002` dies with EADDRINUSE the moment anything else holds
 * the port — another copy of this server left running, or an unrelated app.
 * That is a poor greeting for a command whose whole job is "start the site", so
 * this steps to the next free port instead and tells you which one it took.
 */

import { createServer } from "node:net";
import { execFileSync, spawn } from "node:child_process";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";

const PREFERRED_PORT = 3002;
const MAX_ATTEMPTS = 25;
/** Next writes `{ pid, port, ... }` here and holds an OS lock on it while it runs. */
const DEV_LOCK = new URL("../.next/dev/lock", import.meta.url);

const mode = process.argv[2] === "start" ? "start" : "dev";
const passthrough = process.argv.slice(3);

/** An explicit -p/--port is honoured exactly — no searching, no surprises. */
function requestedPort() {
  const index = passthrough.findIndex((a) => a === "-p" || a === "--port");
  if (index >= 0 && passthrough[index + 1]) return Number(passthrough[index + 1]);
  const inline = passthrough.find((a) => a.startsWith("--port="));
  return inline ? Number(inline.split("=")[1]) : null;
}

/**
 * Binds with no host, which is the same wildcard address Next uses (`::`). A
 * check against 127.0.0.1 alone would miss a process already holding `::3002`.
 */
function isFree(port) {
  return new Promise((resolve) => {
    const probe = createServer();
    probe.once("error", () => resolve(false));
    probe.once("listening", () => probe.close(() => resolve(true)));
    probe.listen(port);
  });
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** `process.kill(pid, 0)` only probes; EPERM still means the process is there. */
function isAlive(pid) {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return error.code === "EPERM";
  }
}

/**
 * Pids get recycled, so a lock alone is not proof: we only stop a process we can
 * still see listening on the port it recorded. A lock left behind by a crashed
 * server is harmless — the operating system released it when the owner died.
 */
async function ownsPort(pid, port) {
  if (!port || (await isFree(port))) return false;
  if (process.platform !== "win32") return true;
  try {
    const rows = execFileSync("netstat", ["-ano", "-p", "tcp"], { encoding: "utf8" });
    return rows.split("\n").some((row) => {
      // proto, local address, foreign address, state, pid — the state word is
      // translated on localised Windows, so match by position, not by text.
      const columns = row.trim().split(/\s+/);
      return (
        columns.length === 5 &&
        columns[1].endsWith(`:${port}`) &&
        columns[4] === String(pid)
      );
    });
  } catch {
    // No netstat: a live pid plus a busy port is evidence enough.
    return true;
  }
}

function stop(pid) {
  if (process.platform === "win32") {
    // /T takes the build workers with it, /F because the server ignores CTRL_C
    // from a process it is not sharing a console with.
    execFileSync("taskkill", ["/PID", String(pid), "/T", "/F"], { stdio: "ignore" });
  } else {
    process.kill(pid, "SIGTERM");
  }
}

/**
 * Next 16 allows one dev server per project: the second one exits with "Another
 * next dev server is already running" no matter which port it was given. Almost
 * always that other server is a copy of this one left over from an earlier run,
 * and the intent behind `npm run dev` is "serve this site now" — so retire it.
 */
async function takeOverFromPreviousServer() {
  let info;
  try {
    info = JSON.parse(readFileSync(DEV_LOCK, "utf8"));
  } catch {
    return; // no lock file, or one caught half-written — nothing to take over
  }

  const pid = Number(info?.pid);
  const port = Number(info?.port);
  if (!pid || pid === process.pid || !isAlive(pid)) return;
  if (!(await ownsPort(pid, port))) return;

  console.log(`\n  Replacing the dev server already running on port ${port} (pid ${pid}).`);
  try {
    stop(pid);
  } catch {
    // Already gone between the check and the kill — the wait below confirms it.
  }

  // The lock is only released once the process is really gone.
  const deadline = Date.now() + 10_000;
  while (Date.now() < deadline) {
    if (!isAlive(pid) && (await isFree(port))) return;
    await delay(100);
    if (process.platform !== "win32" && Date.now() > deadline - 7_000 && isAlive(pid)) {
      try {
        process.kill(pid, "SIGKILL");
      } catch {}
    }
  }

  const killCommand = process.platform === "win32" ? `taskkill /PID ${pid} /F` : `kill -9 ${pid}`;
  console.error(`\n  Could not stop pid ${pid}. Run ${killCommand} and try again.\n`);
  process.exit(1);
}

async function choosePort() {
  const explicit = requestedPort();
  if (explicit) return { port: explicit, explicit: true };

  for (let port = PREFERRED_PORT; port < PREFERRED_PORT + MAX_ATTEMPTS; port++) {
    if (await isFree(port)) return { port, explicit: false };
  }
  console.error(
    `\n  No free port between ${PREFERRED_PORT} and ${PREFERRED_PORT + MAX_ATTEMPTS - 1}.` +
      `\n  Close something, or pass one: npm run ${mode} -- -p 4000\n`,
  );
  process.exit(1);
}

// Clear the old server out of the way first, so its port is free to reuse.
if (mode === "dev") await takeOverFromPreviousServer();

const { port, explicit } = await choosePort();

if (!explicit && port !== PREFERRED_PORT) {
  console.log(`\n  Port ${PREFERRED_PORT} is busy — using ${port} instead.`);
}

console.log(`
  Site       http://localhost:${port}
  Articles   http://localhost:${port}/articles
  Console    http://localhost:${port}/admin/login
`);

// The port is already in `-p`, so drop any the caller passed to avoid a duplicate.
const forwarded = passthrough.filter((arg, i, all) => {
  if (arg === "-p" || arg === "--port") return false;
  if (all[i - 1] === "-p" || all[i - 1] === "--port") return false;
  return !arg.startsWith("--port=");
});

// Run Next's CLI through Node directly. Going via the `next` shim would need
// `shell: true` on Windows, which Node warns about on every start.
const nextCli = createRequire(import.meta.url).resolve("next/dist/bin/next");

const child = spawn(process.execPath, [nextCli, mode, "-p", String(port), ...forwarded], {
  stdio: "inherit",
});

child.on("exit", (code, signal) => process.exit(signal ? 1 : (code ?? 0)));
for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => child.kill(signal));
}
