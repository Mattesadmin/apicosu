import { LockKeyhole } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const Paywall = () => (
  <div className="rounded-2xl border border-[#0A6ED1]/30 bg-[#0A6ED1]/10 p-6 shadow-2xl shadow-black/35">
    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0A6ED1]/15 text-[#70bdff]">
      <LockKeyhole className="h-6 w-6" />
    </div>
    <h3 className="text-xl font-semibold tracking-tight text-white">Pro feature</h3>
    <p className="mt-3 text-sm leading-6 text-zinc-300">This feature requires an active APICOSU Pro subscription.</p>
    <Button asChild className="mt-5 rounded-2xl bg-[#0A6ED1] font-semibold text-white shadow-lg shadow-[#0A6ED1]/25 hover:bg-[#0b7ce8]">
      <Link to="/pricing">Upgrade now</Link>
    </Button>
  </div>
);
