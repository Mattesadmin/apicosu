import { Link } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Login = () => (
  <AppLayout>
    <section className="relative mx-auto flex max-w-[1200px] justify-center px-5 py-10 md:px-8 md:py-16">
      <div className="w-full max-w-md rounded-2xl border border-[#2a2a2a] bg-[#181818] p-6 shadow-2xl shadow-black/35">
        
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#70bdff]">
          Login
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-white">
          Willkommen zurück
        </h1>
        <p className="mt-3 text-sm leading-6 text-zinc-400">
          Melde dich an, um Zugriff auf APICOSU‑Module und deine Abos zu erhalten.
        </p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-200">
              E‑Mail
            </label>
            <Input
              type="email"
              placeholder="berater@example.com"
              className="h-12 rounded-2xl border-[#2a2a2a] bg-[#101010] 
                         text-zinc-100 placeholder:text-zinc-600 
                         focus-visible:ring-[#0A6ED1] focus-visible:ring-offset-0"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-200">
              Passwort
            </label>
            <Input
              type="password"
              placeholder="••••••••"
              className="h-12 rounded-2xl border-[#2a2a2a] bg-[#101010] 
                         text-zinc-100 placeholder:text-zinc-600 
                         focus-visible:ring-[#0A6ED1] focus-visible:ring-offset-0"
            />
          </div>
        </div>

        <Button
          className="mt-6 h-12 w-full rounded-2xl bg-[#0A6ED1] font-semibold 
                     text-white shadow-lg shadow-[#0A6ED1]/25 hover:bg-[#0b7ce8]"
        >
          Login
        </Button>

        <div className="mt-5 flex justify-between text-sm">
          <Link to="/forgot-password" className="text-[#70bdff] hover:text-[#9bd2ff]">
            Passwort vergessen
          </Link>
          <Link to="/register" className="text-zinc-400 hover:text-white">
            Konto erstellen
          </Link>
        </div>
      </div>
    </section>

    {/* DISCLAIMER */}
    <div className="mt-10 text-center text-xs leading-relaxed text-zinc-500 pb-10">
      <p className="mb-2">
        APICOSU ist kein offizielles SAP‑Produkt und steht in keiner Verbindung zur SAP SE.
      </p>
      <p>
        APICOSU ist eine reine Web‑App ohne Speicherung von Dateien oder Analyseergebnissen.
        Es gibt keine System‑Integrationen oder Rollenmodelle.
      </p>
    </div>
  </AppLayout>
);

export default Login;
