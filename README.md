# Namisi Derrick — one-page contact card (Next.js, App Router)

Drop these into an existing Next.js 13+ app (App Router):

```
app/page.tsx
app/layout.tsx        (merge with your existing root layout if you have one)
app/contact-card.tsx
app/contact-card.css
app/api/vcard/route.ts
public/coat-of-arms-uganda.png
public/qr-save-contact.svg
public/qr-ministry-website.svg
```

Requires `lucide-react` (`npm install lucide-react`).

## What it does

- `/` renders the one-page card: seal, name, title, tap-to-call, tap-to-email,
  and a "Save to Contacts" button.
- `/api/vcard` serves the vCard as `text/vcard` with `Content-Disposition: inline`,
  so iOS Safari opens it straight into the native Add Contact sheet. Android's
  behavior here depends on the browser — some open it directly, most download
  it first — that's a platform limit, not something fixable from the response
  headers alone.
- Contact details live in one place, the `contact` object in
  `app/api/vcard/route.ts`. Update his number or title there and the vCard,
  the API route, and (if you wire the page to fetch it) the on-page fields
  all stay in sync from a single source.
- The Google Contacts button uses Google's direct add-contact URL scheme as
  a fallback on Android, opening in a new tab.
- Two QR code assets are included in `public/` for quick save-to-contact and
  ministry website access, and they are rendered in the card layout.
- The Share button uses the Web Share API where available, falling back to
  the vCard download on browsers that don't support it.

## Before shipping

- `public/coat-of-arms-uganda.png` is the official coat of arms with the
  background removed. If the ministry has a higher-resolution or
  differently-licensed version they'd prefer, drop it in at the same path
  and filename and nothing else needs to change.
- Confirm the P.O. Box and street address against the current business card.
