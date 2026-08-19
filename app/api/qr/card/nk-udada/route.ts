import QRCode from "qrcode";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const cardUrl = new URL("/nk-udada", requestUrl).toString();
  const contentDisposition = requestUrl.searchParams.get("download") === "1"
    ? 'attachment; filename="naira-nantale-kateregga-card-qr.svg"'
    : 'inline; filename="naira-nantale-kateregga-card-qr.svg"';
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
      "Content-Disposition": contentDisposition,
      "Cache-Control": "no-store",
    },
  });
}
