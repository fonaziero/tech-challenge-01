"use client";

import { useState } from "react";
import DashboardHeader from "../components/dashboard/header";
import MainContent from "../components/dashboard/main";
import { Section } from "../types/section";

export default function ServicesPage() {
  const [activeSection, setActiveSection] = useState<Section>(Section.Dashboard);

  return (
    <>
      <DashboardHeader activeSection={activeSection} setActiveSection={setActiveSection} />
      <div className="flex flex-col min-h-screen bg-lightGreen">
        <MainContent currentSection={activeSection} />
      </div>
    </>
  );
}
