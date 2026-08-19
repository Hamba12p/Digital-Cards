import { NextResponse } from "next/server";
import { buildVcard } from "../../contact";

export async function GET() {
  const vcard = buildVcard();
  return new NextResponse(vcard, {
    status: 200,
    headers: {
      // "inline" (not "attachment") is what lets iOS Safari open this
      // straight into the native Add Contact preview instead of just
      // downloading a file. Some Android browsers respect it too; others
      // fall back to a download, which is the platform's own limit, not
      // something fixable from the response headers alone.
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": 'inline; filename="namisi-derrick.vcf"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
