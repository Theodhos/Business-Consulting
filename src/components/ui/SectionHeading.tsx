import React from "react";

/**
 * Eyebrow / title / lead, always in that order and always spaced the same.
 * `invert` is for navy sections; `align` is the only permitted variation.
 */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  invert = false,
  className = "",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: string;
  align?: "left" | "center";
  invert?: boolean;
  className?: string;
}) {
  const centered = align === "center";

  return (
    <div className={`${centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}>
      {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
      <h2 className={`display-lg ${invert ? "text-paper" : "text-navy"}`}>{title}</h2>
      {lead && (
        <p
          className={
            invert
              ? "mt-6 font-sans text-[15.5px] font-normal leading-[1.85] text-paper/90"
              : "lead mt-6"
          }
        >
          {lead}
        </p>
      )}
      <span
        className={`mt-8 block h-px w-14 bg-gold ${centered ? "mx-auto" : ""}`}
        aria-hidden
      />
    </div>
  );
}
