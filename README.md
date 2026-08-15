# Namisi Derrick digital contact card

A production-ready Next.js contact card for Namisi Derrick, Principal Economist at Uganda's Ministry of Education and Sports.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production build

```bash
npm run build
npm start
```

## Routes

- `/` displays the digital contact card.
- `/api/vcard` returns the contact as a vCard for the phone's contact-import flow.
- `/api/qr/contact` returns an SVG QR code that points to the current deployment's `/api/vcard` route.
- `/api/qr/card` returns an SVG QR code that points to the current deployment's home page.

The QR routes derive their destination from the incoming request, so preview, production, and custom-domain deployments each encode their own origin without a hard-coded hostname.

Mobile operating systems require the user to confirm adding a contact. The app opens the native contact-import flow where supported; some Android browsers download the `.vcf` file first.
