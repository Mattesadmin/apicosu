import { Check, Minus } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "Free",
    price: "€0",
    description: "Für erste SAP-Analysen und Evaluation.",
    features: ["Basis-Modulzugriff", "Manuelle Texteingabe", "Standard-Ausgabe"],
  },
  {
    name: "Pro",
    price: "€49",
    description: "Für SAP-Berater mit regelmäßigem Analysebedarf.",
    features: ["Alle Module", "Upload-Bereiche", "Copy & Download UI", "Paywall-freie Nutzung"],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Für Beratungsteams, Rollouts und SAP-Projektorganisationen.",
    features: ["Team-Verwaltung", "Zentrale Abrechnung", "Priorisierte Integration", "Governance-Struktur"],
  },
];

const comparison = [
  { feature: "Error Finder", free: true, pro: true, enterprise: true },
  { feature: "Customizing Analyzer", free: false, pro: true, enterprise: true },
  { feature: "Transport Impact Analyzer", free: false, pro: true, enterprise: true },
  { feature: "Blueprint & Training Generator", free: false, pro: true, enterprise: true },
  { feature: "Team billing", free: false, pro: false, enterprise: true },
];

const Pricing = () => (
  <AppLayout>
    <section className="relative mx-auto max-w-[1200px] px-5 py-10 md:px-8 md:py-16">
      <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#70bdff]">Pricing</p>
          <h1 className="text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl">Subscription plans for APICOSU</h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-300">Wählen Sie das passende Modell für SAP-Analyse, Dokumentation und Beratungsunterstützung.</p>
        </div>
        <div className="flex w-fit rounded-full border border-[#2a2a2a] bg-[#181818] p-1 shadow-xl shadow-black/25">
          <button className="rounded-full bg-[#0A6ED1] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[#0A6ED1]/20">Monthly</button>
          <button className="rounded-full px-4 py-2 text-sm font-semibold text-zinc-400 hover:text-white">Yearly</button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {tiers.map((tier) => (
          <article key={tier.name} className={`rounded-2xl border p-6 shadow-2xl shadow-black/35 ${tier.highlighted ? "border-[#0A6ED1]/50 bg-[#0A6ED1]/10" : "border-[#2a2a2a] bg-[#181818]"}`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-white">{tier.name}</h2>
                <p className="mt-2 text-sm leading-6 text-zinc-400">{tier.description}</p>
              </div>
              {tier.highlighted && <span className="rounded-full bg-[#0A6ED1] px-3 py-1 text-xs font-semibold text-white">Popular</span>}
            </div>
            <div className="mt-6 flex items-end gap-2">
              <span className="text-4xl font-semibold tracking-tight text-white">{tier.price}</span>
              {tier.price !== "Custom" && <span className="pb-1 text-sm text-zinc-500">/month</span>}
            </div>
            <ul className="mt-6 space-y-3 border-t border-[#2a2a2a] pt-6">
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-3 text-sm text-zinc-300">
                  <Check className="h-4 w-4 shrink-0 text-[#70bdff]" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button className="mt-6 h-12 w-full rounded-2xl bg-[#0A6ED1] font-semibold text-white shadow-lg shadow-[#0A6ED1]/25 hover:bg-[#0b7ce8]">
              Subscribe now
            </Button>
          </article>
        ))}
      </div>

      <section className="mt-8 rounded-2xl border border-[#2a2a2a] bg-[#181818] p-5 shadow-2xl shadow-black/35 md:p-6">
        <h2 className="text-xl font-semibold tracking-tight text-white">Feature comparison</h2>
        <div className="mt-5 overflow-hidden rounded-2xl border border-[#2a2a2a]">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#101010] text-zinc-300">
              <tr>
                <th className="px-4 py-4 font-semibold">Feature</th>
                <th className="px-4 py-4 font-semibold">Free</th>
                <th className="px-4 py-4 font-semibold">Pro</th>
                <th className="px-4 py-4 font-semibold">Enterprise</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2a2a2a] text-zinc-400">
              {comparison.map((row) => (
                <tr key={row.feature}>
                  <td className="px-4 py-4 text-zinc-200">{row.feature}</td>
                  {[row.free, row.pro, row.enterprise].map((value, index) => (
                    <td key={index} className="px-4 py-4">{value ? <Check className="h-5 w-5 text-[#70bdff]" /> : <Minus className="h-5 w-5 text-zinc-600" />}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  </AppLayout>
);

export default Pricing;
