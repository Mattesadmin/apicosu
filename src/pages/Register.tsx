import { Link } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Register = () => (
  <AppLayout>
    <section className="relative mx-auto flex max-w-[1200px] justify-center px-5 py-10 md:px-8 md:py-16">
      <div className="w-full max-w-md rounded-2xl border border-[#2a2a2a] bg-[#181818] p-6 shadow-2xl shadow-black/35">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#70bdff]">Register</p>
        <h1 className="text-3xl font-semibold tracking-tight text-white">Create APICOSU account</h1>
        <p className="mt-3 text-sm leading-6 text-zinc-400">Set up access for SAP analysis, documentation and subscription management.</p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-200">Email</label>
            <Input type="email" placeholder="consultant@example.com" className="h-12 rounded-2xl border-[#2a2a2a] bg-[#101010] text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-[#0A6ED1] focus-visible:ring-offset-0" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-200">Password</label>
            <Input type="password" placeholder="••••••••" className="h-12 rounded-2xl border-[#2a2a2a] bg-[#101010] text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-[#0A6ED1] focus-visible:ring-offset-0" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-semibold text-zinc-200">Confirm password</label>
            <Input type="password" placeholder="••••••••" className="h-12 rounded-2xl border-[#2a2a2a] bg-[#101010] text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-[#0A6ED1] focus-visible:ring-offset-0" />
          </div>
        </div>

        <Button className="mt-6 h-12 w-full rounded-2xl bg-[#0A6ED1] font-semibold text-white shadow-lg shadow-[#0A6ED1]/25 hover:bg-[#0b7ce8]">Register</Button>
        <p className="mt-5 text-sm text-zinc-400">Already have an account? <Link to="/login" className="text-[#70bdff] hover:text-[#9bd2ff]">Login</Link></p>
      </div>
    </section>
  </AppLayout>
);

export default Register;
