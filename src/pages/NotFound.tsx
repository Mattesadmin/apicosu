import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <AppLayout>
      <section className="relative mx-auto flex max-w-[1200px] justify-center px-5 py-16 md:px-8 md:py-24">
        <div className="w-full max-w-xl rounded-2xl border border-[#2a2a2a] bg-[#181818] p-8 text-center shadow-2xl shadow-black/35">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-[#70bdff]">404</p>
          <h1 className="text-4xl font-semibold tracking-tight text-white">Page not found</h1>
          <p className="mt-4 text-sm leading-6 text-zinc-400">The requested APICOSU page does not exist.</p>
          <Button asChild className="mt-6 rounded-2xl bg-[#0A6ED1] font-semibold text-white shadow-lg shadow-[#0A6ED1]/25 hover:bg-[#0b7ce8]">
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </section>
    </AppLayout>
  );
};

export default NotFound;
