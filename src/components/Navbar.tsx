"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, MapPin, Mail, Clock, PhoneCall } from "lucide-react";
import { Container } from "./ui/Section";

/* ─── Inline SVG brand icons (lucide dropped brand marks) ─── */
type IconProps = React.SVGProps<SVGSVGElement> & { size?: number };
const glyph = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const FacebookIcon = ({ size = 14, ...p }: IconProps) => (
  <svg {...glyph} width={size} height={size} aria-hidden {...p}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const TwitterIcon = ({ size = 14, ...p }: IconProps) => (
  <svg {...glyph} width={size} height={size} aria-hidden {...p}>
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
);
const YoutubeIcon = ({ size = 14, ...p }: IconProps) => (
  <svg {...glyph} width={size} height={size} aria-hidden {...p}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);
const InstagramIcon = ({ size = 14, ...p }: IconProps) => (
  <svg {...glyph} width={size} height={size} aria-hidden {...p}>
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

/* ─── Logo ─── */
function Wordmark() {
  return (
    <img
      src="/logo final.png"
      alt="Tide Global — Private Client Immigration Advisory"
      className="block h-12 w-auto object-contain md:h-14"
    />
  );
}

/* ─── Nav links ─── */
const NAV_LINKS = ["Home","About", "Services", "Visa", "Contact"] as const;
const HAS_DROPDOWN = new Set(["Features"]);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  /* Detect scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Lock body when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">

      {/* ── Top information bar ─────────────────────────────────────
          Slides up and disappears on scroll so it doesn't clutter
          the sticky navbar.
      ──────────────────────────────────────────────────────────── */}
      <div
        className={[
          "hidden lg:block w-full overflow-hidden",
          "bg-charcoal border-b border-white/10",   /* PCS Charcoal #2D3748 */
          "transition-[max-height,opacity] duration-500 ease-in-out",
          scrolled ? "max-h-0 opacity-0" : "max-h-14 opacity-100",
        ].join(" ")}
      >
        <Container>
          <div className="flex h-10 items-center justify-between font-sans text-[12.5px] text-white/65">
            {/* Contact info */}
            <div className="flex items-center divide-x divide-white/15">
              <div className="flex items-center gap-1.5 pr-5">
                <MapPin size={13} className="shrink-0 text-gold" />
                <span>Taman Raya Jimbaran No.1, Bali</span>
              </div>
              <div className="flex items-center gap-1.5 px-5">
                <Mail size={13} className="shrink-0 text-gold" />
                <a href="mailto:travisa@domain.com" className="transition-colors hover:text-white">
                  travisa@domain.com
                </a>
              </div>
              <div className="flex items-center gap-1.5 pl-5">
                <Clock size={13} className="shrink-0 text-gold" />
                <span>Mon – Fri &nbsp;09:00 – 18:00</span>
              </div>
            </div>
            {/* Social icons */}
            <div className="flex items-center gap-4">
              {[
                { Icon: FacebookIcon, label: "Facebook" },
                { Icon: TwitterIcon,  label: "Twitter"  },
                { Icon: YoutubeIcon,  label: "YouTube"  },
                { Icon: InstagramIcon,label: "Instagram"},
              ].map(({ Icon, label }) => (
                <a key={label} href="#" aria-label={label}
                  className="text-white/55 transition-colors hover:text-gold">
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* ── Main navigation bar ─────────────────────────────────────
          · Transparent over the hero
          · Solid PCS Navy (#1A3A5C) + shadow once user scrolls 60 px
          · Gold underline marks the active route
      ──────────────────────────────────────────────────────────── */}
      <div
        className={[
          "w-full transition-all duration-400",
          scrolled || open
            ? "bg-navy shadow-[0_4px_24px_rgba(26,58,92,0.35)]"   /* PCS Navy */
            : "bg-transparent",
        ].join(" ")}
      >
        <Container className="px-4 lg:px-8">
          <div className="flex h-[88px] items-center justify-between">

            {/* Logo */}
            <Link href="/" aria-label="Tide Global — home" className="shrink-0 transition-opacity hover:opacity-85">
              <Wordmark />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden h-full items-center gap-2 lg:flex" aria-label="Primary">
              {NAV_LINKS.map((label) => {
                const href = label === "Home" ? "/" : `/${label.toLowerCase()}`;
                const active = pathname === href;
                return (
                  <Link
                    key={label}
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={[
                      "relative flex h-full items-center gap-0.5 px-3",
                      "font-sans text-[14px] font-medium transition-colors duration-200",
                      active ? "text-gold" : "text-white/80 hover:text-white",
                      /* Gold bottom bar for active */
                      active
                        ? "after:absolute after:bottom-0 after:inset-x-3 after:h-[2px] after:bg-gold after:content-['']"
                        : "",
                    ].join(" ")}
                  >
                    {label}
                    {HAS_DROPDOWN.has(label as typeof NAV_LINKS[number]) && (
                      <svg className="h-3.5 w-3.5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* CTA phone block — PCS Gold accent */}
            <div className="hidden lg:flex h-full">
              <a
                href="tel:+622025550133"
                className={[
                  "group flex h-full items-center gap-3.5 px-7 transition-colors duration-300",
                  "bg-gold text-navy hover:bg-[#b8913f]",   /* Gold → darker gold on hover */
                ].join(" ")}
              >
                <PhoneCall size={28} strokeWidth={1.5} className="shrink-0" />
                <div className="flex flex-col leading-none">
                  {/* Inter Medium 500 */}
                  <span className="font-sans text-[11px] font-medium uppercase tracking-[0.14em] opacity-80">
                    Have Any Questions?
                  </span>
                  {/* Inter Bold 700 */}
                  <span className="mt-1 font-sans text-[18px] font-bold tracking-tight">
                    +62-202-555-0133
                  </span>
                </div>
              </a>
            </div>

            {/* Hamburger (mobile) */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex items-center justify-center text-white lg:hidden"
            >
              {open ? <X size={26} strokeWidth={1.5} /> : <Menu size={26} strokeWidth={1.5} />}
            </button>
          </div>
        </Container>
      </div>

      {/* ── Mobile drawer ─────────────────────────────────────────── */}
      <div
        className={[
          "fixed inset-x-0 bottom-0 overflow-y-auto lg:hidden",
          "bg-navy transition-[top] duration-300",      /* PCS Navy background */
          open ? "top-[88px]" : "top-full",
        ].join(" ")}
        aria-hidden={!open}
      >
        <Container className="py-8">
          <nav className="flex flex-col" aria-label="Mobile primary">
            {NAV_LINKS.map((label) => {
              const href = label === "Home" ? "/" : `/${label.toLowerCase()}`;
              const active = pathname === href;
              return (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={[
                    "border-b border-white/10 py-5",
                    "font-display text-2xl font-medium",   /* Cormorant Garamond Medium */
                    active ? "text-gold" : "text-white",
                  ].join(" ")}
                >
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* CTA in mobile */}
          <a
            href="tel:+622025550133"
            className="mt-8 flex items-center justify-center gap-3 bg-gold px-6 py-4 font-sans text-[14px] font-semibold text-navy"
          >
            <PhoneCall size={20} strokeWidth={1.5} />
            +62-202-555-0133
          </a>

          {/* Contact info mobile */}
          <div className="mt-8 space-y-3 pb-8 font-sans text-[13px] text-white/55">
            <p className="flex items-center gap-2">
              <Mail size={13} className="text-gold" />
              <a href="mailto:travisa@domain.com" className="hover:text-white">travisa@domain.com</a>
            </p>
            <p className="flex items-center gap-2">
              <Clock size={13} className="text-gold" />
              <span>Mon – Fri &nbsp;09:00 – 18:00</span>
            </p>
          </div>
        </Container>
      </div>
    </header>
  );
}
