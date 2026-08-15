import { NextResponse } from "next/server";

// Single source of truth for the contact data. Update here and both
// the vCard download and the page render stay in sync.
const contact = {
  firstName: "Namisi",
  lastName: "Derrick",
  fullName: "Namisi Derrick",
  title: "Principal Economist",
  org: "Ministry of Education and Sports",
  department: "Education Planning Department",
  mobile: "+256779034746",
  emails: ["derricknamisi@gmail.com", "derrick.namisi@education.go.ug"],
  address: {
    street: "Plot 9-11, King George IV Way, Embassy House, P.O. Box 7063",
    city: "Kampala",
    country: "Uganda",
  },
  website: "https://www.education.go.ug",
};

function buildVcard() {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${contact.lastName};${contact.firstName};;;`,
    `FN:${contact.fullName}`,
    `TITLE:${contact.title}`,
    `ORG:${contact.org};${contact.department}`,
    `TEL;TYPE=CELL:${contact.mobile}`,
    ...contact.emails.map((e) => `EMAIL;TYPE=INTERNET:${e}`),
    `ADR;TYPE=WORK:;;${contact.address.street};${contact.address.city};;;${contact.address.country}`,
    `URL:${contact.website}`,
    "END:VCARD",
  ];
  // vCard requires CRLF line endings per RFC 2426.
  return lines.join("\r\n");
}

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
