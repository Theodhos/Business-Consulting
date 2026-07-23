import React from "react";
import { site } from "@/lib/content";

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * The office address, the office phone, and any email address. Order matters:
 * the address is listed first so the longest literal wins the match. The domain
 * is `(\.[\w-]+)+` rather than `[\w.-]+` so a sentence-ending full stop after an
 * address — "write to x@y.com." — stays out of the mailto: link.
 */
const CONTACT_RE = new RegExp(
  `(${escapeRe(site.address.full)}|${escapeRe(site.phone)}|[\\w.+-]+@[\\w-]+(?:\\.[\\w-]+)+)`,
  "g",
);

function hrefFor(match: string) {
  if (match.includes("@")) return `mailto:${match}`;
  if (match === site.phone) return site.phoneHref;
  return site.address.mapsHref;
}

/**
 * Turns the contact details inside a prose string into working links, so body
 * copy dials, mails and opens maps like the rest of the site does. Used by the
 * legal pages, where the address and email only ever appear mid-sentence.
 */
export function linkifyContacts(text: string): React.ReactNode[] {
  /* split() with one capture group alternates [text, match, text, match, …]. */
  return text.split(CONTACT_RE).map((part, i) => {
    if (i % 2 === 0 || !part) return part;
    const href = hrefFor(part);
    const external = href.startsWith("http");
    return (
      <a
        key={i}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        className="text-navy underline decoration-gold/60 underline-offset-2 transition-colors hover:text-gold"
      >
        {part}
      </a>
    );
  });
}
