import type { Metadata } from "next";
import { redirect } from "next/navigation";

import LoginForm from "@/components/console/LoginForm";
import { countAdminUsers } from "@/lib/admin-users";
import { authConfigError, getSession } from "@/lib/auth";
import { CONSOLE_PATH } from "@/lib/console-path";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false, nocache: true },
};

/**
 * Reports a setup problem before the operator wastes an attempt on it — an
 * unreachable database and an empty account collection both look like "wrong
 * password" otherwise.
 */
async function setupNotice(): Promise<string | undefined> {
  const configError = authConfigError();
  if (configError === "missing-database") {
    return "MONGODB_URI is not set, so there is nothing to check credentials against. Add it to .env.local.";
  }
  if (configError === "missing-secret") {
    return "ADMIN_SESSION_SECRET is not set. Sign-in will be refused until it is.";
  }

  try {
    if ((await countAdminUsers()) === 0) {
      return "No administrator account exists yet. Run `npm run seed:admin` to create one.";
    }
  } catch {
    return "MongoDB could not be reached. Start the server, then reload this page.";
  }

  return undefined;
}

export default async function ConsoleLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  if (await getSession()) redirect(CONSOLE_PATH);

  const { from } = await searchParams;
  const notice = await setupNotice();

  return (
    <div className="flex min-h-[100dvh] w-full items-center justify-center bg-mist px-6 py-16">
      <div className="w-full max-w-[420px]">
        {/* Mark */}
        <div className="mb-10 text-center">
          <p className="eyebrow mb-3">{site.division}</p>
          <h1 className="font-display text-[2rem] font-bold leading-tight text-navy">{site.name}</h1>
          <span className="mx-auto mt-5 block h-px w-12 bg-gold" aria-hidden />
        </div>

        {/* Card */}
        <div className="border border-silver/50 bg-paper p-8 md:p-10">
          <p className="mb-2 font-sans text-[10px] font-bold uppercase tracking-[0.22em] text-gold">
            Editorial access
          </p>
          <h2 className="mb-8 font-display text-[1.4rem] font-semibold text-navy">
            Sign in to publish
          </h2>

          <LoginForm hint={notice} from={from} />
        </div>

        <p className="mt-8 text-center font-sans text-[11px] tracking-wide text-slate/60">
          This area is restricted to {site.name} editorial staff.
        </p>
      </div>
    </div>
  );
}
