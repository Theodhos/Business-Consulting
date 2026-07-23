import { site } from "@/lib/content";

/* Inline SVG brand marks — lucide dropped its brand icons. Size is controlled
   by the caller via className; the width/height attrs are only a fallback. */
type IconProps = React.SVGProps<SVGSVGElement>;

const glyph = {
  viewBox: "0 0 24 24",
  width: 16,
  height: 16,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const LinkedinIcon = (props: IconProps) => (
  <svg {...glyph} aria-hidden {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = (props: IconProps) => (
  <svg {...glyph} aria-hidden {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = (props: IconProps) => (
  <svg {...glyph} aria-hidden {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

/**
 * The complete, canonical set of Tide Global social accounts — LinkedIn,
 * Instagram and Facebook, all @TideGlobalHQ. Every social row on the site
 * renders from this list, so no surface can drift or add a dead account.
 */
export const SOCIAL_LINKS = [
  { href: site.social.linkedin, icon: LinkedinIcon, label: "LinkedIn" },
  { href: site.social.instagram, icon: InstagramIcon, label: "Instagram" },
  { href: site.social.facebook, icon: FacebookIcon, label: "Facebook" },
] as const;
