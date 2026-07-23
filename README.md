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

## Publishing articles — `/admin`

Articles come from two places, merged at request time by `src/lib/posts.ts`:

- The six editorial pieces in `content.ts`. They are the baseline, are never
  mutated, and are not editable from the panel.
- Anything published in `/admin`, stored in `data/posts.json`. The newest of these
  sits at the top of `/articles`, above the baseline.

Sign in at `/admin/login`, write in `/admin/posts/new`, and press **Publish** — the
article is on `/articles` immediately. **Save draft** stores it without exposing it.
The editor carries every field an article needs: title, URL slug, excerpt, body,
cover image, category, author, publication date, read time, and the feature flag
that promotes it to the large panel in the home page news section. Slug, read time
and date fill themselves in if you leave them alone.

Bodies are written in a small subset of Markdown, the same one the baseline articles
use: `## ` for a section heading, `- ` for a bullet, `**bold**` for emphasis, and a
blank line between paragraphs. Everything else is escaped — the renderer emits only
its own tags.

Cover images upload to `data/uploads` and are served by `/media/<file>`. They do not
go in `public/`: a production server serves `public/` from a manifest fixed at build
time, so an image uploaded after a deploy would 404 until the next one.

### Configuration

`ADMIN_USERNAME`, `ADMIN_PASSWORD` (or `ADMIN_PASSWORD_HASH`) and
`ADMIN_SESSION_SECRET` — see `.env.example` for how to generate the last two. In
production all three are required and login is refused outright without them. In
development the panel runs on `admin` / `admin` so it is usable straight away.

The session is a signed, `httpOnly` cookie valid for eight hours. `src/proxy.ts`
bounces anonymous visitors before the panel renders, but it only checks that a
cookie exists — the signature is verified on the server on every admin page and
every publish, delete and upload.

### Deployment note

The store is a JSON file and uploads are files on disk, so **the host must have a
writable, persistent filesystem** — a normal Node server, a container with a volume,
or a VPS. On a read-only or ephemeral serverless filesystem, publishing fails with a
visible error and uploads are lost between invocations. Moving to a database or
object store means rewriting `src/lib/posts.ts` and `src/lib/uploads.ts`; nothing
else reads the disk.

Because articles are read at request time, `/`, `/articles` and `/articles/[slug]`
are server-rendered rather than prerendered. The rest of the site is still static.

## Before launch

- [ ] Set SMTP credentials (`.env.example`) — the forms are inert without them.
- [ ] Set `ADMIN_USERNAME`, `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET`, or `/admin`
      cannot be signed into in production.
- [ ] Have an attorney review `/privacy` and `/terms`. They are drafted against POPIA
      and South African law but have not been reviewed by counsel.
- [ ] Replace the hero image (`HERO_IMAGE` in `app/page.tsx`) — it is Unsplash stock.
- [ ] Confirm the social handles in `content.ts` resolve; the profiles are assumed
      from `@TideGlobalHQ`, not verified.
- [ ] Publish the first insights briefings — `/insights` currently states plainly
      that they are in preparation.
- [ ] Set the real domain in `metadataBase` (`app/layout.tsx`).
