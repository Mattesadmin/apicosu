import { BrainCircuit, ClipboardList } from "lucide-react";
import { NavLink } from "react-router-dom";
import { modules } from "@/data/modules";
import { ModuleDropdown } from "@/components/ModuleDropdown";


const utilityLinks = [
  { label: "Pricing", path: "/pricing" },
  { label: "Login", path: "/login" },
  { label: "Register", path: "/register" },
  { label: "Account", path: "/account" },
];

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `rounded-full px-3 py-2 text-sm transition duration-200 ${
    isActive ? "bg-[#0A6ED1]/18 text-[#9bd2ff]" : "text-zinc-400 hover:bg-[#181818] hover:text-white"
  }`;

export const AppBackground = () => (
  <div className="pointer-events-none fixed inset-0 overflow-hidden">
    <div className="absolute left-1/2 top-0 h-[520px] w-[760px] -translate-x-1/2 rounded-full bg-[#0A6ED1]/10 blur-3xl" />
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:64px_64px] opacity-35" />
  </div>
);

export const AppHeader = () => (
  <header className="sticky top-0 z-50 border-b border-[#2a2a2a]/80 bg-[#0e0e0e]/90 shadow-2xl shadow-black/30 backdrop-blur-xl">
    <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-5 py-4 md:px-8 xl:flex-row xl:items-center xl:justify-between">
      <div className="flex items-center justify-between gap-4">
        <NavLink to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#0A6ED1]/40 bg-[#101f2f] shadow-lg shadow-[#0A6ED1]/15">
            <BrainCircuit className="h-6 w-6 text-[#39a5ff]" />
          </div>
          <div>
            <p className="text-lg font-semibold tracking-tight text-white">APICOSU</p>
            <p className="text-xs text-zinc-400">Application for Intelligent Consulting Support</p>
          </div>
        </NavLink>
        <div className="flex shrink-0 items-center gap-2 rounded-full border border-[#2a2a2a] bg-[#181818] px-3 py-2 text-xs text-zinc-300 md:px-4 md:text-sm xl:hidden">
          <span className="h-2 w-2 rounded-full bg-[#39a5ff] shadow-[0_0_14px_rgba(57,165,255,0.9)]" />
          Consulting AI
        </div>
      </div>

      <nav className="flex flex-wrap items-center gap-1">
        <NavLink to="/" className={navLinkClass} end>
          Home
        </NavLink>
        
        <ModuleDropdown />
        
        {utilityLinks.map((link) => (
          <NavLink key={link.path} to={link.path} className={navLinkClass}>
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="hidden shrink-0 items-center gap-2 rounded-full border border-[#2a2a2a] bg-[#181818] px-4 py-2 text-sm text-zinc-300 xl:flex">
        <span className="h-2 w-2 rounded-full bg-[#39a5ff] shadow-[0_0_14px_rgba(57,165,255,0.9)]" />
        Consulting AI
      </div>
    </div>
  </header>
);

export const AppFooter = () => (
  <footer className="relative border-t border-[#2a2a2a] bg-[#0b0b0b]">
    <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-5 py-8 text-sm text-zinc-500 md:flex-row md:items-center md:justify-between md:px-8">
      <p>APICOSU · 2026</p>

      {/* Link-Bereich */}
      <div className="flex flex-wrap items-center gap-4 text-zinc-400">

        <NavLink to="/impressum" className="hover:text-white transition">
          Impressum
        </NavLink>

        <NavLink to="/datenschutz" className="hover:text-white transition">
          Datenschutz
        </NavLink>

        <NavLink to="/ai-act" className="hover:text-white transition">
          AI‑Act
        </NavLink>

        <NavLink to="/agb" className="hover:text-white transition">
          AGB
        </NavLink>

        <NavLink to="/haftung" className="hover:text-white transition">
          Haftung
        </NavLink>

        <NavLink to="/widerruf" className="hover:text-white transition">
          Widerruf
        </NavLink>

        {/* Gesetzlich vorgeschriebener Kündigungsbutton */}
        <NavLink
          to="/kuendigung"
          className="rounded-full bg-[#0A6ED1] px-4 py-1.5 text-white font-medium shadow-lg shadow-[#0A6ED1]/40 hover:bg-[#0b7ff0] transition"
        >
          Vertrag kündigen
        </NavLink>
      </div>

      {/* Branding rechts */}
      <div className="flex items-center gap-2 text-zinc-400">
        <ClipboardList className="h-4 w-4 text-[#70bdff]" />
        Issue · Analyze · Solution
      </div>
    </div>
  </footer>
);

export const AppLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <AppBackground />
    <AppHeader />
    <main>{children}</main>
    <AppFooter />
  </>
);