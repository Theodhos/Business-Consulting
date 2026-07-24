import Link from "next/link";
import React from "react";

type Variant = "solid" | "outline" | "invert";

/* py-4 keeps the hit area at 52px, comfortably past the 44px touch minimum;
   tracking eases off on phones so long labels stay on one line. */
const base =
  "inline-flex items-center justify-center gap-3 px-6 py-4 text-center font-sans text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors duration-300 sm:px-8 sm:tracking-[0.18em]";

const variants: Record<Variant, string> = {
  // Primary action on light ground.
  solid: "bg-navy text-paper hover:bg-gold hover:text-ink",
  // Secondary action on light ground.
  outline: "border border-line-strong text-navy hover:border-navy hover:bg-navy hover:text-paper",
  // Any action on navy ground.
  invert: "border border-line-invert text-paper hover:border-gold hover:bg-gold hover:text-ink",
};

export function Button({
  href,
  variant = "solid",
  className = "",
  children,
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}

export function SubmitButton({
  variant = "solid",
  className = "",
  disabled,
  children,
}: {
  variant?: Variant;
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`${base} ${variants[variant]} disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      {children}
    </button>
  );
}
