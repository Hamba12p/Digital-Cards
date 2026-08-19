import type { Metadata } from "next";
import NkUdadaContactCard from "./contact-card";

export const metadata: Metadata = {
  title: "Naira Nantale Kateregga — NK Udada Foundation",
  description:
    "Founder & Coordinator, NK Udada Foundation. Youth-led nonprofit equipping Uganda's next generation, based in Kampala, Uganda.",
};

export default function NkUdadaPage() {
  return <NkUdadaContactCard />;
}
