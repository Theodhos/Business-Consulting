import type { Metadata } from "next";
import { redirect } from "next/navigation";

import LoginForm from "@/components/admin/LoginForm";
import { getSession, usingDevCredentials } from "@/lib/auth";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  if (await getSession()) redirect("/admin");

  const { from } = await searchParams;

  const hint = usingDevCredentials()
    ? "Development credentials are active: admin / admin. Set ADMIN_USERNAME, ADMIN_PASSWORD and ADMIN_SESSION_SECRET before going live."
    : undefined;

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

          <LoginForm hint={hint} from={from} />
        </div>

        <p className="mt-8 text-center font-sans text-[11px] tracking-wide text-slate/60">
          This area is restricted to {site.name} editorial staff.
        </p>
      </div>
    </div>
  );
}
