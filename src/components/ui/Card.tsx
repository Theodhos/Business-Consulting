import React from "react";
import type { LucideIcon } from "lucide-react";

/**
 * The one surface treatment on the site: a hairline box on the section's own
 * ground. No shadow, no radius, no lift — the border darkens on hover and that
 * is the entire interaction.
 */
export function Card({
  invert = false,
  interactive = false,
  className = "",
  children,
}: {
  invert?: boolean;
  interactive?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`border p-8 transition-colors duration-300 ${
        invert
          ? `border-line-invert ${interactive ? "hover:border-gold" : ""}`
          : `border-line ${interactive ? "hover:border-line-strong" : ""}`
      } ${className}`}
    >
      {children}
    </div>
  );
}

/**
 * Icon or index, title, body. Used for every capability / advantage / step grid
 * so they all read as one family.
 */
export function FeatureCard({
  icon: Icon,
  index,
  title,
  children,
  invert = false,
}: {
  icon?: LucideIcon;
  /** Zero-based; rendered as a two-digit gold numeral. */
  index?: number;
  title: string;
  children: React.ReactNode;
  invert?: boolean;
}) {
  return (
    <Card invert={invert} interactive className="flex h-full flex-col">
      {Icon ? (
        <Icon size={22} strokeWidth={1.25} className="mb-6 text-gold" aria-hidden />
      ) : index !== undefined ? (
        <span className="eyebrow mb-6 block">{String(index + 1).padStart(2, "0")}</span>
      ) : null}

      <h3 className={`display-sm mb-3 ${invert ? "text-paper" : "text-navy"}`}>{title}</h3>

      <p className={`text-sm leading-relaxed ${invert ? "text-paper/60" : "text-navy/65"}`}>
        {children}
      </p>
    </Card>
  );
}
