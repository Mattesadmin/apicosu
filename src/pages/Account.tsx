import { CalendarDays, CreditCard, Crown, Settings2 } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { Paywall } from "@/components/Paywall";
import { Button } from "@/components/ui/button";

const accountCards = [
  { label: "Subscription status", value: "APICOSU Free", icon: Crown },
  { label: "Next billing date", value: "Not scheduled", icon: CalendarDays },
  { label: "Payment method", value: "No payment method connected", icon: CreditCard },
];

const Account = () => (
  <AppLayout>
    <section className="relative mx-auto max-w-[1200px] px-5 py-10 md:px-8 md:py-16">
      <div className="mb-8">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#70bdff]">Account</p>
        <h1 className="text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl">Subscription overview</h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-300">Manage plan, billing placeholders and subscription actions for APICOSU.</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {accountCards.map((card) => {
          const Icon = card.icon;
          return (
            <article key={card.label} className="rounded-2xl border border-[#2a2a2a] bg-[#181818] p-5 shadow-2xl shadow-black/35">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0A6ED1]/15 text-[#70bdff]">
                <Icon className="h-5 w-5" />
              </div>
              <p className="text-sm text-zinc-500">{card.label}</p>
              <p className="mt-2 text-xl font-semibold tracking-tight text-white">{card.value}</p>
            </article>
          );
        })}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_0.75fr]">
        <section className="rounded-2xl border border-[#2a2a2a] bg-[#181818] p-6 shadow-2xl shadow-black/35">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0A6ED1]/15 text-[#70bdff]">
              <Settings2 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-semibold tracking-tight text-white">Plan actions</h2>
              <p className="mt-1 text-sm text-zinc-400">UI placeholders for subscription management integration.</p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <Button className="h-12 rounded-2xl bg-[#0A6ED1] font-semibold text-white shadow-lg shadow-[#0A6ED1]/25 hover:bg-[#0b7ce8]">Upgrade</Button>
            <Button variant="outline" className="h-12 rounded-2xl border-[#2a2a2a] bg-[#101010] text-zinc-200 hover:bg-[#202020] hover:text-white">Cancel Subscription</Button>
            <Button variant="outline" className="h-12 rounded-2xl border-[#2a2a2a] bg-[#101010] text-zinc-200 hover:bg-[#202020] hover:text-white">Change Plan</Button>
          </div>
        </section>

        <Paywall />
      </div>
    </section>
  </AppLayout>
);

export default Account;
