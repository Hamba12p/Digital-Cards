import QRCode from "qrcode";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const cardUrl = new URL("/", request.url).toString();
  const svg = await QRCode.toString(cardUrl, {
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
      "Content-Disposition": 'inline; filename="namisi-derrick-card-qr.svg"',
      "Cache-Control": "no-store",
    },
  });
}
