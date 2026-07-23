# Tide Global — Private Client Services

Marketing site for a boutique private client immigration advisory firm in Johannesburg.
Next.js 16 (App Router, Turbopack), React 19, Tailwind CSS 4.

```bash
npm run dev     # starts on http://localhost:3002
npm run build
npm start       # same address, production build
```

`npm run dev` steps to the next free port if 3002 is taken, and prints the address
it chose along with the console link. Force one with `npm run dev -- -p 4000`.

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

## The editorial console

Every article lives in `data/posts.json` and every one is editable and deletable
from the console — including the six the site launched with.

Those six are written in `content.ts`, which acts as a **seed**: the first time the
store is read they are copied in, once, and the store takes over. `content.ts` is
not read again unless `data/posts.json` is deleted. So an edit sticks, and a
deletion stays deleted rather than reappearing from source on the next request.
They carry an **Original** label in the list so you can tell them apart.

Delete `data/posts.json` to start over from the six originals.

| | |
| --- | --- |
| Article list | `/admin` |
| Sign in | `/admin/login` |
| Write an article | `/admin/posts/new` |

Press **Publish** and the article is on `/articles` immediately. **Save draft**
stores it without exposing it. The editor carries every field an article needs:
title, URL slug, excerpt, body, cover image, category, author, publication date,
read time, and the feature flag that promotes it to the large panel in the home page
news section. Slug, read time and date fill themselves in if you leave them alone.

Bodies are written in a small subset of Markdown, the same one the baseline articles
use: `## ` for a section heading, `- ` for a bullet, `**bold**` for emphasis, and a
blank line between paragraphs. Everything else is escaped — the renderer emits only
its own tags.

Cover images upload to `data/uploads` and are served by `/media/<file>`. They do not
go in `public/`: a production server serves `public/` from a manifest fixed at build
time, so an image uploaded after a deploy would 404 until the next one.

### The console is unlinked

It is linked from nowhere — not the navigation, not the footer, not the sitemap —
and every response carries `noindex, nofollow, noarchive`, set both as a meta tag
and as an `X-Robots-Tag` header from `src/proxy.ts`.

`/admin` is a guessable path, so the password is what protects the console — not
the address. Keep the password strong and it does not matter that the door is easy
to find.

To move it somewhere less obvious, rename `src/app/admin` and `src/app/api/admin`,
then update `CONSOLE_PATH` in `src/lib/console-path.ts` and the matcher in
`src/proxy.ts`. If you also add a `robots.txt`, do not name the console in it — a
`Disallow` line publishes the path to anyone who reads the file.

### Accounts

Administrator accounts live in MongoDB, in the `admin_users` collection. Passwords
are stored as salted scrypt derivations — never as text, and never recoverable. The
derivation is in `src/lib/password.mjs`, shared by the app and the seed script so
the two cannot drift apart.

Set `MONGODB_URI`, `ADMIN_USERNAME` and `ADMIN_PASSWORD` in `.env.local`, then:

```bash
npm run seed:admin
```

That writes the account. `ADMIN_USERNAME` and `ADMIN_PASSWORD` are read **only** by
that script — sign-in always checks MongoDB, so the running app never needs the
password in its environment. To change the password, set a new `ADMIN_PASSWORD` and
run the seed again: it matches on username and updates in place rather than creating
a second account.

Usernames are matched case-insensitively; passwords are not.

`ADMIN_SESSION_SECRET` signs the session cookie — an `httpOnly` cookie valid for
eight hours. It is required in production and sign-in is refused without it.
Changing it signs everyone out. `src/proxy.ts` bounces anonymous visitors before the
console renders, but it only checks that a cookie exists — the signature is verified
on the server on every console page and every publish, delete and upload.

If MongoDB is unreachable, the login page says so plainly and sign-in is refused;
the public site is unaffected. It recovers on its own once the database is back —
no restart needed.

### Deployment note

Articles are a JSON file and uploads are files on disk, so **the host must have a
writable, persistent filesystem** — a normal Node server, a container with a volume,
or a VPS. On a read-only or ephemeral serverless filesystem, publishing fails with a
visible error and uploads are lost between invocations. Moving articles into MongoDB
alongside the accounts means rewriting `src/lib/posts.ts` and `src/lib/uploads.ts`;
nothing else touches the disk.

Because articles are read at request time, `/`, `/articles` and `/articles/[slug]`
are server-rendered rather than prerendered. The rest of the site is still static.

## Before launch

- [ ] Set SMTP credentials (`.env.example`) — the forms are inert without them.
- [ ] Point `MONGODB_URI` at the production database and run `npm run seed:admin`
      there. The account does not travel with the code.
- [ ] Set `ADMIN_SESSION_SECRET` to a fresh random value in production — sign-in is
      refused without it.
- [ ] Have an attorney review `/privacy` and `/terms`. They are drafted against POPIA
      and South African law but have not been reviewed by counsel.
- [ ] Replace the hero image (`HERO_IMAGE` in `app/page.tsx`) — it is Unsplash stock.
- [ ] Confirm the social handles in `content.ts` resolve; the profiles are assumed
      from `@TideGlobalHQ`, not verified.
- [ ] Publish the first insights briefings — `/insights` currently states plainly
      that they are in preparation.
- [ ] Set the real domain in `metadataBase` (`app/layout.tsx`).
