# Tide Global — Private Client Services

Marketing site for a boutique private client immigration advisory firm in Johannesburg.
Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS 4.

```bash
npm run dev     # http://localhost:3000
npm run build
```

Copy `.env.example` to `.env.local` before testing the forms. Without SMTP credentials
the enquiry route logs to the console in development and returns 503 in production —
it will not accept an enquiry it cannot deliver.

## The design system

The site has one visual language, enforced by primitives rather than by convention.
Before adding a section, use these — do not restyle a `<section>` by hand.

| Concern | Owner |
| --- | --- |
| Vertical rhythm, container width, section background | `components/ui/Section.tsx` |
| Eyebrow / title / lead | `components/ui/SectionHeading.tsx` |
| Surfaces | `components/ui/Card.tsx` |
| Actions | `components/ui/Button.tsx` |
| Form controls | `components/ui/Field.tsx` |
| Page openers | `components/PageHero.tsx` |
| Legal documents | `components/ui/Legal.tsx` |
| Tokens (colour, type scale, `.eyebrow`, `.display-*`) | `app/globals.css` |

House rules, encoded in those files:

- **Corners are square.** There is no radius scale.
- **No shadows.** Surfaces separate with hairlines (`border-line`).
- **Gold is an accent** — rules, eyebrows, numerals, icons. Never a fill.
- **Display type is light.** Weight comes from size, not from bold.
- Sections alternate `paper` → `mist`, with `navy` reserved for emphasis.

## Content

Every fact on the site — contact details, the eleven practice areas, values,
advantages, the client journey, FAQs — lives in `src/lib/content.ts`. Pages compose
from it and declare no copy of their own, so a change to the brief is a change to
one file.

## Before launch

- [ ] Set SMTP credentials (`.env.example`) — the forms are inert without them.
- [ ] Have an attorney review `/privacy` and `/terms`. They are drafted against POPIA
      and South African law but have not been reviewed by counsel.
- [ ] Replace the hero image (`HERO_IMAGE` in `app/page.tsx`) — it is Unsplash stock.
- [ ] Confirm the social handles in `content.ts` resolve; the profiles are assumed
      from `@TideGlobalHQ`, not verified.
- [ ] Publish the first insights briefings — `/insights` currently states plainly
      that they are in preparation.
- [ ] Set the real domain in `metadataBase` (`app/layout.tsx`).
