import type { Metadata } from "next";
import ContactCard from "./contact-card";

export const metadata: Metadata = {
  title: "Namisi Derrick — Ministry of Education and Sports",
  description:
    "Principal Economist, Education Planning Department, Ministry of Education and Sports, Republic of Uganda.",
};

export default function Page() {
  return <ContactCard />;
}
