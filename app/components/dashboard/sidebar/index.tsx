'use client';

import { Dispatch, SetStateAction } from "react";

interface SidebarProps {
  activeSection: string;
  setActiveSection: Dispatch<SetStateAction<string>>;
}

export default function Sidebar({ activeSection, setActiveSection }: SidebarProps) {
  const isActive = (section: string) => activeSection === section;

  return (
    <div className="hidden sm:block lg:bg-[#F5F5F5] w-full lg:w-1/4 p-8 lg:mt-8 lg:rounded-lg">
      <ul className="lg:space-y-6 lg:block flex justify-around">
        <li
          onClick={() => setActiveSection("dashboard")}
          className={`text-sm font-bold border-b-2 text-center cursor-pointer hover:text-green hover:border-green ${
            isActive("dashboard") ? "text-green border-green" : "text-black"
          }`}
        >
          <span>Início</span>
        </li>
        <li
          onClick={() => setActiveSection("transactions")}
          className={`text-sm font-bold border-b-2 text-center cursor-pointer hover:text-green hover:border-green ${
            isActive("transactions") ? "text-green border-green" : "text-black"
          }`}
        >
          <span>Transferências</span>
        </li>
        <li
          onClick={() => setActiveSection("investments")}
          className={`text-sm font-bold border-b-2 text-center cursor-pointer hover:text-green hover:border-green ${
            isActive("investments") ? "text-green border-green" : "text-black"
          }`}
        >
          <span>Investimentos</span>
        </li>
        <li
          onClick={() => setActiveSection("other-services")}
          className={`text-sm font-bold text-center cursor-pointer hover:border-b-2 hover:text-green hover:border-green ${
            isActive("other-services") ? "text-green border-green" : "text-black"
          }`}
        >
          <span>Outros serviços</span>
        </li>
      </ul>
    </div>
  );
}
