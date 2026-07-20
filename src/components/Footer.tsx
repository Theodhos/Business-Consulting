import Link from "next/link";
import { ArrowRight, ChevronRight, MapPin, Phone, Mail, Clock } from "lucide-react";

import { site, nav } from "@/lib/content";
import { Container } from "./ui/Section";

const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Instagram = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
    {...props}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const Facebook = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const GlobeLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="42"
    height="42"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    <path d="M2 12h20" />
  </svg>
);

const socials = [
  { href: site.social.facebook, icon: Facebook, label: "Facebook" },
  { href: site.social.instagram, icon: Instagram, label: "Instagram" },
  { href: site.social.linkedin, icon: Linkedin, label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="relative mt-24 w-full bg-navy text-paper">
      <Container className="relative z-10">
        <div className="relative -mt-20 overflow-hidden border border-white/10 bg-[#1f3550]">
          <div
            className="pointer-events-none absolute inset-0 bg-center bg-no-repeat opacity-[0.16]"
            style={{
              backgroundImage: 'url("/world-map.svg")',
              backgroundSize: "cover",
            }}
            aria-hidden
          />

          <div className="relative z-10 flex flex-col items-center justify-between gap-8 px-8 py-16 md:flex-row md:px-14 lg:px-20">
            <div className="max-w-2xl text-center md:text-left">
              <h2 className="font-display text-[clamp(1.8rem,2.8vw,2.6rem)] font-light leading-snug text-paper">
                Are You Looking For{" "}
                <span className="font-bold text-white">Private Client Advisory</span> Just Call Us
              </h2>
              <p className="mt-3 max-w-xl font-sans text-[14px] font-medium leading-[1.8] tracking-wide text-paper/70">
                Need A Consultation? Call us today {site.phone} or email us : {site.emails.general}
              </p>
            </div>

            <Link
              href="/book-consultation"
              className="group inline-flex shrink-0 items-center gap-3 border border-gold px-8 py-4 font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-paper transition-all duration-300 hover:bg-gold hover:text-navy"
            >
              Contact Us
              <ArrowRight
                size={14}
                strokeWidth={2}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </Container>

      <Container>
        <div className="flex flex-col items-center border-b border-white/10 py-20 text-center">
          <div className="mb-6 flex items-center justify-center">
            <img src="/logo final.png" alt={site.name} className="h-16 w-auto object-contain" />
          </div>

          <p className="mb-8 max-w-xl font-sans text-[14px] font-medium leading-[1.8] text-paper/65">
            Boutique South African immigration advisory for high-net-worth individuals, investors and
            executives. Our specialists advise on strategy before a single form is filed, ensuring
            your time and capital are protected.
          </p>

          <div className="flex items-center gap-5">
            {socials.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center text-paper/80 transition-colors hover:text-gold"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>
        </div>
      </Container>

      <Container>
        <div className="grid grid-cols-1 gap-12 py-20 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div>
            <h3 className="mb-8 font-display text-[1.35rem] font-semibold text-white">
              Important Links
            </h3>
            <ul className="space-y-4">
              {[
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
                { label: "Coaching", href: "/coaching" },
                { label: "Visa", href: "/visa" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center font-sans text-[14px] font-medium text-paper/70 transition-colors hover:text-gold"
                  >
                    <ChevronRight
                      size={14}
                      strokeWidth={2.5}
                      className="mr-2 -ml-3 text-gold opacity-0 transition-all group-hover:ml-0 group-hover:opacity-100"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-8 font-display text-[1.35rem] font-semibold text-white">Support</h3>
            <ul className="space-y-4">
              {[
                { label: "FAQ's", href: "/faq" },
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Term & Conditions", href: "/terms" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group flex items-center font-sans text-[14px] font-medium text-paper/70 transition-colors hover:text-gold"
                  >
                    <ChevronRight
                      size={14}
                      strokeWidth={2.5}
                      className="mr-2 -ml-3 text-gold opacity-0 transition-all group-hover:ml-0 group-hover:opacity-100"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-8 font-display text-[1.35rem] font-semibold text-white">Contact</h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-3 font-sans text-[14px] font-medium text-paper/70">
                <MapPin size={16} className="mt-0.5 shrink-0 text-gold" />
                <span className="leading-snug">
                  Location : {site.address.line1}, {site.address.city}
                </span>
              </li>
              <li className="flex items-center gap-3 font-sans text-[14px] font-medium text-paper/70">
                <Phone size={16} className="shrink-0 text-gold" />
                <span>Phone : {site.phone}</span>
              </li>
              <li className="flex items-center gap-3 font-sans text-[14px] font-medium text-paper/70">
                <Mail size={16} className="shrink-0 text-gold" />
                <span>Email : {site.emails.general}</span>
              </li>
              <li className="flex items-start gap-3 font-sans text-[14px] font-medium text-paper/70">
                <Clock size={16} className="mt-0.5 shrink-0 text-gold" />
                <span className="leading-snug">Work Hours : {site.hours}</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-8 font-display text-[1.35rem] font-semibold text-white">
              Subscribe Our Newsletter
            </h3>
            <p className="mb-6 pr-4 font-sans text-[14px] font-medium leading-[1.7] text-paper/70">
              Receive occasional briefings on South African immigration policy and private client
              planning. We respect your inbox.
            </p>

            <form className="mt-2 flex w-full overflow-hidden border border-white/15 bg-paper">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3.5 font-sans text-[13.5px] font-medium text-navy outline-none placeholder:text-slate/40"
                required
              />
              <button
                type="submit"
                className="flex items-center justify-center bg-gold px-5 text-navy transition-colors hover:bg-paper"
              >
                <ChevronRight size={18} strokeWidth={3} />
              </button>
            </form>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10 bg-[#152f49] py-6">
        <Container>
          <div className="text-center md:text-left">
            <p className="font-sans text-[12.5px] font-medium text-paper/55">
              Copyright © {new Date().getFullYear()} {site.name}. Powered by PCS Design Systems.
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
