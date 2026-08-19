export const contact = {
  firstName: "Naira Nantale",
  lastName: "Kateregga",
  fullName: "Naira Nantale Kateregga",
  title: "Founder & Coordinator",
  org: "NK Udada Foundation",
  tagline: "Empower & Equip · Uganda",
  mobile: "+256762522306",
  emails: ["admin@the-nkfoundation.org"],
  address: {
    street: "Nansana East, East 1A",
    city: "Wakiso District",
    country: "Uganda",
  },
  website: "https://www.the-nkfoundation.org",
};

function escapeVcardText(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\r?\n/g, "\\n")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,");
}

export function buildVcard({ compact = false } = {}) {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${escapeVcardText(contact.lastName)};${escapeVcardText(contact.firstName)};;;`,
    `FN:${escapeVcardText(contact.fullName)}`,
    `TITLE:${escapeVcardText(contact.title)}`,
    `ORG:${escapeVcardText(contact.org)}`,
    `TEL;TYPE=CELL:${contact.mobile}`,
    ...contact.emails.map((email) => `${compact ? "EMAIL" : "EMAIL;TYPE=INTERNET"}:${email}`),
    ...(compact
      ? []
      : [
          `ADR;TYPE=WORK:;;${escapeVcardText(contact.address.street)};${escapeVcardText(contact.address.city)};;;${escapeVcardText(contact.address.country)}`,
          `URL:${contact.website}`,
        ]),
    "END:VCARD",
  ];

  return `${lines.join("\r\n")}\r\n`;
}
