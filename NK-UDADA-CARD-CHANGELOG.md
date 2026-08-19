# Task: wire in the second digital contact card (NK Udada Foundation)

This folder (`nk-udada-card-assets/`) was unzipped directly into the repo root.
It mirrors the real repo's folder structure, so every path inside it maps
1:1 onto where the file belongs in the actual project.

This has already been built and verified in a sandbox (`next build` and
`next start`, all nine routes hit with curl, both cards confirmed working
independently). Your job is just to move it into place correctly and confirm
it still holds in this repo.

## 1. Move the files

Move each file from `nk-udada-card-assets/` to the same path under the
repo root, creating parent folders as needed:

- `nk-udada-card-assets/app/nk-udada/contact.ts` → `app/nk-udada/contact.ts`
- `nk-udada-card-assets/app/nk-udada/contact-card.tsx` → `app/nk-udada/contact-card.tsx`
- `nk-udada-card-assets/app/nk-udada/contact-card.module.css` → `app/nk-udada/contact-card.module.css`
- `nk-udada-card-assets/app/nk-udada/page.tsx` → `app/nk-udada/page.tsx`
- `nk-udada-card-assets/app/api/vcard/nk-udada/route.ts` → `app/api/vcard/nk-udada/route.ts`
- `nk-udada-card-assets/app/api/qr/card/nk-udada/route.ts` → `app/api/qr/card/nk-udada/route.ts`
- `nk-udada-card-assets/app/api/qr/contact/nk-udada/route.ts` → `app/api/qr/contact/nk-udada/route.ts`
- `nk-udada-card-assets/public/nk-udada-logo.jpg` → `public/nk-udada-logo.jpg`

Do not touch, rename, or move any existing file in the repo. This change is
purely additive — `app/page.tsx`, `app/contact.ts`, `app/contact-card.tsx`,
`app/contact-card.css`, and the existing `app/api/vcard`, `app/api/qr/card`,
`app/api/qr/contact` routes at the top level all stay exactly as they are.

## 2. Why this is safe (context, not extra work)

- The new card lives entirely under the `/nk-udada` route and its own
  `/api/*/nk-udada` endpoints. Next.js's App Router lets a nested folder
  (`app/api/vcard/nk-udada/`) sit alongside a parent's own `route.ts`
  (`app/api/vcard/route.ts`) without conflict — both are already tested
  and working together.
- `contact-card.module.css` is a CSS Module, not a global stylesheet, and
  it is imported directly by `app/nk-udada/contact-card.tsx`, not through
  `app/layout.tsx`. Next hashes every class name in a module at build
  time, so even though this file reuses the same class names as the
  original `contact-card.css` (`.card`, `.name`, `.qrGrid`, etc.), there is
  no collision — confirmed by inspecting the rendered HTML: the original
  page renders `class="card"`, the new page renders
  `class="contact-card-module__xxxxxx__card"`. Nothing needs to change in
  `app/layout.tsx`.
- Neither card links to the other. The NK Udada card's Save/Share/QR
  actions all point at its own `/nk-udada` and `/api/*/nk-udada` endpoints
  only, and vice versa for the original card.

## 3. Verify

From the repo root:

```
npm install   # only if node_modules isn't already present
npm run build
```

Confirm the route table printed by the build includes all of these,
unchanged for the first four and new for the last four:

```
○ /
ƒ /api/qr/card
○ /api/qr/contact
ƒ /api/vcard
○ /nk-udada
ƒ /api/qr/card/nk-udada
○ /api/qr/contact/nk-udada
ƒ /api/vcard/nk-udada
```

Then run `npm run start` and check by hand (or curl):

- `GET /` — original card renders unchanged.
- `GET /nk-udada` — new card renders: NK Udada logo, "Naira Nantale
  Kateregga", "Founder & Coordinator", cream/maroon/pink theme.
- `GET /api/vcard/nk-udada` — returns a `.vcf` with Naira's details.
- `GET /api/qr/card/nk-udada` — returns an SVG QR that decodes to
  `<your-deployed-origin>/nk-udada`.
- `GET /api/qr/contact/nk-udada` — returns an SVG QR that decodes straight
  to Naira's vCard text.
- Triple-tap the NK Udada logo on `/nk-udada` — reveals a second QR
  ("Open this card") the same way the original card's crest does.
  Long-press that second QR to confirm it downloads
  `naira-nantale-kateregga-card-qr.svg`.
- Confirm `/` still behaves exactly as before this change (Save to
  Contacts, Google Contacts link, Share, both QR codes, triple-tap on the
  crest) — none of that logic was touched, but verify anyway.

Once deployed, the two QR codes printed for Naira (business card, poster,
whatever medium is used) should point at `/nk-udada` and its `/api/qr/...`
endpoints — Vercel serves every route in `app/` automatically, so no extra
routing configuration is needed for the second card to go live alongside
the first.

## 4. Clean up

Once the build and the manual checks above pass:

1. Delete the now-empty `nk-udada-card-assets/` folder (everything in it
   has been moved to its real location).
2. Move this file, `AGENT_PROMPT.md`, out to the repo root — e.g. rename it
   to `NK-UDADA-CARD-CHANGELOG.md` — as a short record of what was added
   and why, rather than deleting it outright.
