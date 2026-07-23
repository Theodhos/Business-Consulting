"use client";

import { useActionState } from "react";
import { Lock, LogIn } from "lucide-react";

import { loginAction, type LoginState } from "@/app/admin/actions";

const controlClass =
  "w-full border border-line bg-transparent px-4 py-3.5 font-sans text-sm text-navy transition-colors placeholder:text-navy/30 focus:border-gold focus:outline-none";
const labelClass = "mb-2 block font-sans text-[10px] font-semibold uppercase tracking-[0.16em] text-navy/50";

export default function LoginForm({ hint, from }: { hint?: string; from?: string }) {
  const [state, action, pending] = useActionState<LoginState, FormData>(loginAction, undefined);

  return (
    <form action={action} className="flex flex-col gap-6" noValidate>
      <input type="hidden" name="from" value={from ?? ""} />

      <div>
        <label htmlFor="username" className={labelClass}>
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          required
          autoComplete="username"
          autoFocus
          placeholder="admin"
          className={controlClass}
        />
      </div>

      <div>
        <label htmlFor="password" className={labelClass}>
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          placeholder="••••••••"
          className={controlClass}
        />
      </div>

      {state?.error && (
        <p
          role="alert"
          className="border-l-2 border-red-600 bg-red-50 px-4 py-3 font-sans text-[13px] leading-relaxed text-red-800"
        >
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center gap-3 bg-navy px-8 py-4 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-paper transition-colors duration-300 hover:bg-gold hover:text-ink disabled:cursor-not-allowed disabled:opacity-50"
      >
        {pending ? (
          "Verifying…"
        ) : (
          <>
            <LogIn size={13} strokeWidth={2} />
            Sign in
          </>
        )}
      </button>

      {hint && (
        <p className="flex items-start gap-2 border border-gold/30 bg-gold/5 px-4 py-3 font-sans text-[12px] leading-relaxed text-navy/70">
          <Lock size={12} strokeWidth={2} className="mt-1 shrink-0 text-gold" />
          <span>{hint}</span>
        </p>
      )}
    </form>
  );
}
