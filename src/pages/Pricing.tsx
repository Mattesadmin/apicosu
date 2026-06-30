import { useState } from "react";
import { Check } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");

  const prices = {
    free: 0,
    basic: 19,
    pro: 49,
    team: 199,
    enterprise15: 499,
    enterprise20: 699,
  };

  const yearlyPrice = (monthly: number) => Math.round(monthly * 0.9);
  const yearlyTotal = (monthly: number) => yearlyPrice(monthly) * 12;

  const renderPrice = (monthly: number, isFree = false) => {
    if (isFree) {
      return (
        <div className="flex items-end gap-2">
          <span className="text-4xl font-semibold text-white">€0</span>
          <span className="pb-1 text-sm text-zinc-500">/Monat</span>
        </div>
      );
    }

    if (billingCycle === "monthly") {
      return (
        <div className="flex items-end gap-2">
          <span className="text-4xl font-semibold text-white">€{monthly}</span>
          <span className="pb-1 text-sm text-zinc-500">/Monat</span>
        </div>
      );
    }

    return (
      <div className="flex flex-col">
        <div className="flex items-end gap-2">
          <span className="text-4xl font-semibold text-white">€{yearlyPrice(monthly)}</span>
          <span className="pb-1 text-sm text-zinc-500">/Monat</span>
        </div>
        <span className="text-sm text-zinc-400 mt-1">
          statt €{monthly} / Monat
        </span>
        <span className="text-xs text-zinc-500 mt-1">
          Gesamtpreis: €{yearlyTotal(monthly)} / Jahr
        </span>
      </div>
    );
  };

  return (
    <AppLayout>
      <section className="relative mx-auto max-w-[1200px] px-5 py-10 md:px-8 md:py-16">

        {/* HEADER */}
        <div className="mb-8 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#70bdff]">
            Preise
          </p>
          <h1 className="text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl">
            Abonnements
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base leading-8 text-zinc-300">
            Wählen Sie das passende Modell aus:
          </p>
        </div>

        {/* MONTH/YEAR SWITCH */}
        <div className="flex justify-center mb-10">
          <div className="flex rounded-full border border-[#2a2a2a] bg-[#181818] p-1 shadow-xl shadow-black/25">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                billingCycle === "monthly"
                  ? "bg-[#0A6ED1] text-white shadow-lg shadow-[#0A6ED1]/20"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Monat
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                billingCycle === "yearly"
                  ? "bg-[#0A6ED1] text-white shadow-lg shadow-[#0A6ED1]/20"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Jahr (-10%)
            </button>
          </div>
        </div>

        {/* PLANS */}
        <div className="grid gap-6 lg:grid-cols-5">

          {/* FREE */}
          <article className="flex flex-col justify-between rounded-2xl border border-[#2a2a2a] bg-[#181818] p-6 shadow-xl shadow-black/35">
            <div>
              <h2 className="text-2xl font-semibold text-white">Free</h2>
              <p className="mt-2 text-sm text-zinc-400">Für erste SAP‑Analysen und Evaluation.</p>
              <div className="mt-6">{renderPrice(prices.free, true)}</div>
              <ul className="mt-6 space-y-3 border-t border-[#2a2a2a] pt-6 text-sm text-zinc-300">
                <li className="flex gap-3"><Check className="h-4 w-4 text-[#70bdff]" />5 Analysen / Monat</li>
                <li className="flex gap-3"><Check className="h-4 w-4 text-[#70bdff]" />1 Datei‑Upload / Monat</li>
                <li className="flex gap-3"><Check className="h-4 w-4 text-[#70bdff]" />Basis‑Module</li>
              </ul>
            </div>
            <Button className="mt-6 h-12 w-full rounded-2xl bg-[#0A6ED1] text-white hover:bg-[#0b7ce8]">
              Kostenlos starten
            </Button>
          </article>

          {/* BASIC */}
          <article className="flex flex-col justify-between rounded-2xl border border-[#2a2a2a] bg-[#181818] p-6 shadow-xl shadow-black/35">
            <div>
              <h2 className="text-2xl font-semibold text-white">Basic</h2>
              <p className="mt-2 text-sm text-zinc-400">Für Key‑User & kleine Fachbereiche.</p>
              <div className="mt-6">{renderPrice(prices.basic)}</div>
              <ul className="mt-6 space-y-3 border-t border-[#2a2a2a] pt-6 text-sm text-zinc-300">
                <li className="flex gap-3"><Check className="h-4 w-4 text-[#70bdff]" />20 Analysen / Monat</li>
                <li className="flex gap-3"><Check className="h-4 w-4 text-[#70bdff]" />5 Datei‑Uploads / Monat</li>
                <li className="flex gap-3"><Check className="h-4 w-4 text-[#70bdff]" />Zugriff auf 3 Module</li>
              </ul>
            </div>
            <Button className="mt-6 h-12 w-full rounded-2xl bg-[#0A6ED1] text-white hover:bg-[#0b7ce8]">
              auswählen
            </Button>
          </article>

          {/* PRO */}
          <article className="flex flex-col justify-between rounded-2xl border border-[#0A6ED1]/50 bg-[#0A6ED1]/10 p-6 shadow-xl shadow-black/35">
            <div>
              <div className="flex items-start justify-between">
                <h2 className="text-2xl font-semibold text-white">Pro</h2>
                <span className="rounded-full bg-[#0A6ED1] px-3 py-1 text-xs font-semibold text-white">
                  Beliebt
                </span>
              </div>
              <p className="mt-2 text-sm text-zinc-300">Für Berater mit täglichen Analysebedarf.</p>
              <div className="mt-6">{renderPrice(prices.pro)}</div>
              <ul className="mt-6 space-y-3 border-t border-[#2a2a2a] pt-6 text-sm text-zinc-300">
                <li className="flex gap-3"><Check className="h-4 w-4 text-[#70bdff]" />Unbegrenzte Analysen</li>
                <li className="flex gap-3"><Check className="h-4 w-4 text-[#70bdff]" />Unbegrenzte Uploads</li>
                <li className="flex gap-3"><Check className="h-4 w-4 text-[#70bdff]" />Alle Module</li>
                <li className="flex gap-3"><Check className="h-4 w-4 text-[#70bdff]" />Premium‑Ausgabe</li>
              </ul>
            </div>
            <Button className="mt-6 h-12 w-full rounded-2xl bg-[#0A6ED1] text-white hover:bg-[#0b7ce8]">
              auswählen
            </Button>
          </article>

          {/* TEAM */}
          <article className="flex flex-col justify-between rounded-2xl border border-[#2a2a2a] bg-[#181818] p-6 shadow-xl shadow-black/35">
            <div>
              <h2 className="text-2xl font-semibold text-white">Team</h2>
              <p className="mt-2 text-sm text-zinc-400">Für kleine Beratungsteams.</p>
              <div className="mt-6">{renderPrice(prices.team)}</div>
              <ul className="mt-6 space-y-3 border-t border-[#2a2a2a] pt-6 text-sm text-zinc-300">
                <li className="flex gap-3"><Check className="h-4 w-4 text-[#70bdff]" />5 Pro‑Lizenzen inklusive</li>
                <li className="flex gap-3"><Check className="h-4 w-4 text-[#70bdff]" />5 Login‑Keys</li>
                <li className="flex gap-3"><Check className="h-4 w-4 text-[#70bdff]" />Gemeinsame Abrechnung</li>
              </ul>
            </div>
            <Button className="mt-6 h-12 w-full rounded-2xl bg-[#0A6ED1] text-white hover:bg-[#0b7ce8]">
              auswählen
            </Button>
          </article>

          {/* ENTERPRISE */}
          <article className="flex flex-col justify-between rounded-2xl border border-[#2a2a2a] bg-[#181818] p-6 shadow-xl shadow-black/35">
            <div>
              <h2 className="text-2xl font-semibold text-white">Enterprise</h2>
              <p className="mt-2 text-sm text-zinc-400">Für größere Organisationen & Projektteams.</p>

              <div className="mt-6 space-y-4">

                {/* 15 Nutzer */}
                <Button className="w-full h-20 flex flex-col items-center justify-center rounded-2xl bg-[#0A6ED1] text-white hover:bg-[#0b7ce8]">
                  <span className="text-sm font-semibold">Bis 15 Nutzer</span>
                  {billingCycle === "monthly" ? (
                    <span className="text-base font-medium">€449 / Monat</span>
                  ) : (
                    <span className="text-base font-medium">
                      €{yearlyPrice(prices.enterprise15)} / Monat  
                      <span className="text-xs text-zinc-300 block mt-1">
                        Gesamtpreis: €{yearlyTotal(prices.enterprise15)} / Jahr
                      </span>
                    </span>
                  )}
                </Button>

                {/* 20 Nutzer */}
                <Button className="w-full h-20 flex flex-col items-center justify-center rounded-2xl bg-[#0A6ED1] text-white hover:bg-[#0b7ce8]">
                  <span className="text-sm font-semibold">Bis 20 Nutzer</span>
                  {billingCycle === "monthly" ? (
                    <span className="text-base font-medium">€699 / Monat</span>
                  ) : (
                    <span className="text-base font-medium">
                      €{yearlyPrice(prices.enterprise20)} / Monat  
                      <span className="text-xs text-zinc-300 block mt-1">
                        Gesamtpreis: €{yearlyTotal(prices.enterprise20)} / Jahr
                      </span>
                    </span>
                  )}
                </Button>

              </div>
            </div>
          </article>
        </div>

        {/* DISCLAIMER */}
        <div className="mt-10 text-center text-xs leading-relaxed text-zinc-500">
          <p className="mb-2">
            APICOSU ist kein offizielles SAP‑Produkt und steht in keiner Verbindung zur SAP SE.
          </p>
          <p>
            APICOSU ist eine reine Web‑App ohne Speicherung von Dateien oder Analyseergebnissen.
            Es gibt keine System‑Integrationen oder Rollenmodelle.
          </p>
        </div>
      </section>
    </AppLayout>
  );
};

export default Pricing;

