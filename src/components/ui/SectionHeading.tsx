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
      {eyebrow && <p className="eyebrow mb-4 sm:mb-5">{eyebrow}</p>}
      <h2 className={`display-lg ${invert ? "text-paper" : "text-navy"}`}>{title}</h2>
      {lead && (
        <p
          className={
            invert
              ? "mt-5 font-sans text-[14.5px] font-normal leading-[1.85] text-paper/90 sm:mt-6 sm:text-[15.5px]"
              : "lead mt-5 sm:mt-6"
          }
        >
          {lead}
        </p>
      )}
      <span
        className={`mt-6 block h-px w-14 bg-gold sm:mt-8 ${centered ? "mx-auto" : ""}`}
        aria-hidden
      />
    </div>
  );
}
