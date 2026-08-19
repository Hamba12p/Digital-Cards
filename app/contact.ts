export const contact = {
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
    `ORG:${escapeVcardText(contact.org)};${escapeVcardText(contact.department)}`,
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
