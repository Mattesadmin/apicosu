import { Link } from "react-router-dom";
import type { ApicosuModule } from "@/data/modules";

type ModuleCardProps = {
  module: ApicosuModule;
};

export const ModuleCard = ({ module }: ModuleCardProps) => {
  const Icon = module.icon;

  return (
    <Link
      to={module.path}
      className="
        group relative rounded-2xl border border-[#2a2a2a] bg-[#181818]
        p-5 shadow-2xl shadow-black/35 transition-all duration-300
        hover:-translate-y-1 hover:border-[#0A6ED1]/40 hover:bg-[#1f1f1f]
        hover:shadow-[#0A6ED1]/20
      "
    >
      {/* Glare-Effekt */}
      <div
        className="
          pointer-events-none absolute inset-0 rounded-2xl opacity-0
          transition-opacity duration-300 group-hover:opacity-100
          bg-gradient-to-br from-transparent via-[#ffffff10] to-transparent
        "
      />

      {/* Icon + Arrow */}
      <div className="mb-5 flex items-start justify-between gap-4">
        <div
          className="
            flex h-12 w-12 items-center justify-center rounded-2xl
            border border-[#0A6ED1]/25 bg-[#0A6ED1]/12 text-[#70bdff]
            transition-all duration-300
            group-hover:bg-[#0A6ED1] group-hover:text-white
            group-hover:rotate-[3deg] group-hover:scale-[1.05]
          "
        >
          <Icon className="h-6 w-6" />
        </div>

        <ArrowIcon />
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold tracking-tight text-white">
        {module.title}
      </h3>

      {/* Description */}
      <p className="mt-3 min-h-20 text-sm leading-6 text-zinc-400">
        {module.description}
      </p>

      {/* Input / Output */}
      <div className="mt-5 space-y-3 border-t border-[#2a2a2a] pt-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
            Input
          </p>
          <p className="mt-1 text-sm leading-6 text-zinc-300">{module.input}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
            Output
          </p>
          <p className="mt-1 text-sm leading-6 text-zinc-300">{module.output}</p>
        </div>
      </div>
    </Link>
  );
};

const ArrowIcon = () => (
  <div
    className="
      mt-3 h-5 w-5 text-zinc-500 transition-all duration-300
      group-hover:translate-x-1 group-hover:text-[#70bdff]
    "
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-full w-full"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  </div>
);
