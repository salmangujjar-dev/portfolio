import { Metadata } from "next";

import HeroScreen from "@screen/hero";
import CareerScreen from "@screen/career";
import ProjectsScreen from "@screen/projects";
import ContactScreen from "@screen/contact";

export const metadata: Metadata = {
  title: "Salman Ahmed | Portfolio",
  description:
    "Full-stack developer portfolio — projects, career and contact, on a single page.",
};

export default function Home() {
  return (
    <>
      <HeroScreen />
      <CareerScreen />
      <ProjectsScreen />
      <ContactScreen />
    </>
  );
}
