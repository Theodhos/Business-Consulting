import React from "react";

type Tone = "paper" | "mist" | "navy";

const toneClass: Record<Tone, string> = {
  paper: "bg-paper text-navy",
  mist: "bg-mist text-navy",
  navy: "bg-ink text-paper",
};

/**
 * The vertical rhythm of the whole site. Sections never set their own padding,
 * background, or container width — that lives here so every page stacks the same.
 */
export function Section({
  tone = "paper",
  divide = true,
  id,
  className = "",
  children,
}: {
  tone?: Tone;
  /** Hairline rule on the top edge. Turn off where two tones already meet. */
  divide?: boolean;
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={`w-full py-20 md:py-28 ${toneClass[tone]} ${
        divide ? (tone === "navy" ? "border-t border-line-invert" : "border-t border-line") : ""
      } ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}

/** The one container width on the site. */
export function Container({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={`mx-auto w-full max-w-6xl px-6 md:px-8 ${className}`}>{children}</div>;
}
