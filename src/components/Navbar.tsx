"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, MapPin, Mail, Clock, PhoneCall } from "lucide-react";
import { Container } from "./ui/Section";
import { SOCIAL_LINKS } from "./ui/social";
import { site } from "@/lib/content";

/* ─── Logo ─── */
function Wordmark() {
  return (
    <img
      src="/logo final.png"
      alt="Tide Global — Private Client Immigration Advisory"
      className="block h-10 w-auto object-contain sm:h-12 md:h-14"
    />
  );
}

/* ─── Nav links ─── */
const NAV_LINKS = ["Home","About", "Services", "Articles", "Coaching", "Contact"] as const;
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
                <a
                  href={site.address.mapsHref}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-white"
                >
                  {site.address.line1}, {site.address.city} {site.address.postal}
                </a>
              </div>
              <div className="flex items-center gap-1.5 px-5">
                <Mail size={13} className="shrink-0 text-gold" />
                <a href={`mailto:${site.emails.general}`} className="transition-colors hover:text-white">
                  {site.emails.general}
                </a>
              </div>
              <div className="flex items-center gap-1.5 pl-5">
                <Clock size={13} className="shrink-0 text-gold" />
                <span>{site.hours}</span>
              </div>
            </div>
            {/* Social icons */}
            <div className="flex items-center gap-4">
              {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
                <a key={label} href={href} aria-label={label}
                  target="_blank" rel="noreferrer"
                  className="text-white/55 transition-colors hover:text-gold">
                  <Icon className="h-[14px] w-[14px]" />
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
        <Container>
          <div className="flex h-[68px] items-center justify-between sm:h-[76px] lg:h-[88px]">

            {/* Logo — also dismisses the drawer, which sits directly below it */}
            <Link
              href="/"
              aria-label="Tide Global — home"
              onClick={() => setOpen(false)}
              className="min-w-0 shrink transition-opacity hover:opacity-85"
            >
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
                href={site.phoneHref}
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
                    {site.phone}
                  </span>
                </div>
              </a>
            </div>

            {/* Mobile actions — call shortcut + hamburger, both 44px targets */}
            <div className="flex items-center gap-1 lg:hidden">
              <a
                href={site.phoneHref}
                aria-label={`Call ${site.phone}`}
                className="flex h-11 w-11 items-center justify-center bg-gold text-navy transition-colors active:bg-[#b8913f]"
              >
                <PhoneCall size={19} strokeWidth={1.75} />
              </a>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                className="flex h-11 w-11 items-center justify-center text-white"
              >
                {open ? <X size={26} strokeWidth={1.5} /> : <Menu size={26} strokeWidth={1.5} />}
              </button>
            </div>
          </div>
        </Container>
      </div>

      {/* ── Mobile drawer ─────────────────────────────────────────── */}
      <div
        id="mobile-menu"
        className={[
          "fixed inset-x-0 bottom-0 overflow-y-auto overscroll-contain lg:hidden",
          "top-[68px] sm:top-[76px]",
          "bg-navy transition-[transform,opacity] duration-300 ease-out",
          /* Off-canvas rather than parked at top-full: nothing below the fold
             stretches the document, and closed links stay unfocusable. */
          open
            ? "translate-y-0 opacity-100"
            : "pointer-events-none invisible -translate-y-3 opacity-0",
        ].join(" ")}
        aria-hidden={!open}
      >
        <Container className="py-6">
          <nav className="flex flex-col" aria-label="Mobile primary">
            {NAV_LINKS.map((label) => {
              const href = label === "Home" ? "/" : `/${label.toLowerCase()}`;
              const active = pathname === href;
              return (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={[
                    "flex items-center justify-between border-b border-white/10 py-4",
                    "font-display text-[1.6rem] font-medium leading-none",
                    active ? "text-gold" : "text-white",
                  ].join(" ")}
                >
                  {label}
                  {active && <span className="h-1.5 w-1.5 shrink-0 bg-gold" aria-hidden />}
                </Link>
              );
            })}
          </nav>

          {/* CTAs in mobile */}
          <div className="mt-7 grid grid-cols-1 gap-3">
            <Link
              href="/book-consultation"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-3 bg-gold px-6 py-4 font-sans text-[11px] font-bold uppercase tracking-[0.18em] text-navy"
            >
              Book a consultation
            </Link>
            <a
              href={site.phoneHref}
              className="flex items-center justify-center gap-3 border border-white/25 px-6 py-4 font-sans text-[14px] font-semibold text-white"
            >
              <PhoneCall size={18} strokeWidth={1.5} className="text-gold" />
              {site.phone}
            </a>
          </div>

          {/* Contact info mobile */}
          <div className="mt-7 space-y-3 font-sans text-[13px] leading-relaxed text-white/55">
            <p className="flex items-start gap-2.5">
              <MapPin size={14} className="mt-1 shrink-0 text-gold" />
              <a href={site.address.mapsHref} target="_blank" rel="noreferrer" className="break-words hover:text-white">
                {site.address.full}
              </a>
            </p>
            <p className="flex items-start gap-2.5">
              <Mail size={14} className="mt-1 shrink-0 text-gold" />
              <a href={`mailto:${site.emails.general}`} className="break-all hover:text-white">{site.emails.general}</a>
            </p>
            <p className="flex items-start gap-2.5">
              <Clock size={14} className="mt-1 shrink-0 text-gold" />
              <span>{site.hours}</span>
            </p>
          </div>

          {/* Social row */}
          <div className="mt-7 flex items-center gap-5 border-t border-white/10 pb-[max(2rem,env(safe-area-inset-bottom))] pt-6">
            {SOCIAL_LINKS.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                className="text-white/60 transition-colors hover:text-gold"
              >
                <Icon className="h-[17px] w-[17px]" />
              </a>
            ))}
          </div>
        </Container>
      </div>
    </header>
  );
}
