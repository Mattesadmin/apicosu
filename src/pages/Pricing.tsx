import { useState } from "react";
import { Check } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [enterpriseSelection, setEnterpriseSelection] = useState<15 | 20 | null>(null);

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

    const total = yearlyTotal(monthly);

    return (
      <div className="flex flex-col">
        <div className="flex items-end gap-2">
          <span className="text-4xl font-semibold text-white">€{total}</span>
          <span className="pb-1 text-sm text-zinc-500">/Jahr</span>
        </div>
        <span className="text-sm text-zinc-400 mt-1">
          statt €{monthly * 12} / Jahr
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
            Wählen Sie den passenden Tarif aus:
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

              <div className="mt-6">
                {renderPrice(prices.free, true)}
                {/* Platzhalter für gleiche Höhe */}
                <div className="h-3"></div>
              </div>

              <div className="border-t border-[#2a2a2a] mt-6 pt-6">
                <ul className="space-y-3 text-sm text-zinc-300">
                  <li className="flex gap-3"><Check className="h-4 w-4 text-[#70bdff]" />5 Analysen / Monat</li>
                  <li className="flex gap-3"><Check className="h-4 w-4 text-[#70bdff]" />1 Datei‑Upload / Monat</li>
                  <li className="flex gap-3"><Check className="h-4 w-4 text-[#70bdff]" />Basis‑Module</li>
                </ul>
              </div>
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

              <div className="border-t border-[#2a2a2a] mt-6 pt-6">
                <ul className="space-y-3 text-sm text-zinc-300">
                  <li className="flex gap-3"><Check className="h-4 w-4 text-[#70bdff]" />20 Analysen / Monat</li>
                  <li className="flex gap-3"><Check className="h-4 w-4 text-[#70bdff]" />5 Datei‑Uploads / Monat</li>
                  <li className="flex gap-3"><Check className="h-4 w-4 text-[#70bdff]" />Zugriff auf 3 Module</li>
                </ul>
              </div>
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

              <div className="border-t border-[#2a2a2a] mt-6 pt-6">
                <ul className="space-y-3 text-sm text-zinc-300">
                  <li className="flex gap-3"><Check className="h-4 w-4 text-[#70bdff]" />Unbegrenzte Analysen</li>
                  <li className="flex gap-3"><Check className="h-4 w-4 text-[#70bdff]" />Unbegrenzte Uploads</li>
                  <li className="flex gap-3"><Check className="h-4 w-4 text-[#70bdff]" />Alle Module</li>
                  <li className="flex gap-3"><Check className="h-4 w-4 text-[#70bdff]" />Premium‑Ausgabe</li>
                </ul>
              </div>
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

              <div className="border-t border-[#2a2a2a] mt-6 pt-6">
                <ul className="space-y-3 text-sm text-zinc-300">
                  <li className="flex gap-3"><Check className="h-4 w-4 text-[#70bdff]" />5 Pro‑Lizenzen inklusive</li>
                  <li className="flex gap-3"><Check className="h-4 w-4 text-[#70bdff]" />5 Login‑Keys</li>
                </ul>
              </div>
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

              <div className="mt-11 space-y-9">

                {/* 15 Nutzer */}
                <Button
                  onClick={() => setEnterpriseSelection(15)}
                  className={`w-full flex flex-col items-center justify-center rounded-2xl py-12 transition-all ${
                    enterpriseSelection === 15
                      ? "bg-[#0A6ED1] text-white"
                      : "bg-[#1f1f1f] text-zinc-300 hover:bg-[#2a2a2a]"
                  }`}
                >
                  <span className="text-sm font-semibold">Bis 15 Nutzer</span>

                  {billingCycle === "monthly" ? (
                    <span className="text-xl font-semibold mt-0">
                      €499 <span className="text-sm">/Monat</span>
                    </span>
                  ) : (
                    <div className="flex flex-col items-center mt-0">
                      <span className="text-xl font-semibold">
                        €{yearlyTotal(prices.enterprise15)} <span className="text-sm">/Jahr</span>
                      </span>
                      <span className="text-sm text-zinc-400 mt-0.5">
                        statt €{prices.enterprise15 * 12} / Jahr
                      </span>
                    </div>
                  )}
                </Button>

                {/* 20 Nutzer */}
                <Button
                  onClick={() => setEnterpriseSelection(20)}
                  className={`w-full flex flex-col items-center justify-center rounded-2xl py-12 transition-all ${
                    enterpriseSelection === 20
                      ? "bg-[#0A6ED1] text-white"
                      : "bg-[#1f1f1f] text-zinc-300 hover:bg-[#2a2a2a]"
                  }`}
                >
                  <span className="text-sm font-semibold">Bis 20 Nutzer</span>

                  {billingCycle === "monthly" ? (
                    <span className="text-xl font-semibold mt-0">
                      €699 <span className="text-sm">/Monat</span>
                    </span>
                  ) : (
                    <div className="flex flex-col items-center mt-0">
                      <span className="text-xl font-semibold">
                        €{yearlyTotal(prices.enterprise20)} <span className="text-sm">/Jahr</span>
                      </span>
                      <span className="text-sm text-zinc-400 mt-0.5">
                        statt €{prices.enterprise20 * 12} / Jahr
                      </span>
                    </div>
                  )}
                </Button>

              </div>

              <div className="border-t border-[#2a2a2a] mt-11 pt-6">
                <ul className="space-y-3 text-sm text-zinc-300">
                  <li className="flex gap-3">
                    <Check className="h-4 w-4 text-[#70bdff]" />
                    {enterpriseSelection === 15
                      ? "15 Pro‑Lizenzen inklusive Login‑Keys"
                      : enterpriseSelection === 20
                      ? "20 Pro‑Lizenzen inklusive Login‑Keys"
                      : "Pro‑Lizenzen inklusive Login‑Keys"}
                  </li>
                </ul>
              </div>
            </div>

            <Button
              disabled={!enterpriseSelection}
              className={`mt-6 h-12 w-full rounded-2xl ${
                enterpriseSelection
                  ? "bg-[#0A6ED1] text-white hover:bg-[#0b7ce8]"
                  : "bg-[#2a2a2a] text-zinc-500"
              }`}
            >
              auswählen
            </Button>
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
