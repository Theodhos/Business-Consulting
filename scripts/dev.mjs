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
import { spawn } from "node:child_process";
import { createRequire } from "node:module";

const PREFERRED_PORT = 3002;
const MAX_ATTEMPTS = 25;

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
