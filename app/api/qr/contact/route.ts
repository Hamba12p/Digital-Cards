import QRCode from "qrcode";
import { buildVcard } from "../../../contact";

export const dynamic = "force-static";

export async function GET() {
  // Encode the contact itself so recognized mobile scanners can open a
  // populated Add Contact screen without first visiting this website.
  const svg = await QRCode.toString(buildVcard({ compact: true }), {
    type: "svg",
    errorCorrectionLevel: "M",
    margin: 2,
    width: 512,
    color: {
      dark: "#000000",
      light: "#ffffff",
    },
  });

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Content-Disposition": 'inline; filename="namisi-derrick-contact-qr.svg"',
      "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
