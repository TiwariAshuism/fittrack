"use client";

import type { WaterState } from "@/types/fitness";

type Props = {
  water: WaterState;
  onAdd: (ml: number) => void;
  onReset: () => void;
};

export function WaterTracker({ water, onAdd, onReset }: Props) {
  const pct = Math.min(100, (water.currentMl / water.targetMl) * 100);
  const remainingMl = Math.max(0, water.targetMl - water.currentMl);
  const currentL = water.currentMl / 1000;
  const targetL = water.targetMl / 1000;
  const remainingL = remainingMl / 1000;

  const circumference = 2 * Math.PI * 52;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-zinc-100">
          💧 Hydration
        </h2>
        <button
          type="button"
          onClick={onReset}
          className="rounded-full border border-zinc-700 px-3 py-1 text-xs font-semibold text-zinc-400 transition hover:border-rose-500/50 hover:text-rose-300"
        >
          Reset
        </button>
      </div>
      <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-center">
        <div className="relative h-36 w-36 shrink-0">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke="rgb(39 39 42)"
              strokeWidth="10"
            />
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke="url(#waterGrad)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className="transition-[stroke-dashoffset] duration-500 ease-out"
            />
            <defs>
              <linearGradient id="waterGrad" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#34d399" />
              </linearGradient>
            </defs>
          </svg>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-zinc-50">
              {currentL.toFixed(2)}L
            </span>
            <span className="text-xs text-zinc-500">/ {targetL.toFixed(1)}L</span>
          </div>
        </div>
        <div className="w-full max-w-sm flex-1 space-y-3 text-center sm:text-left">
          <p className="text-sm text-zinc-300">
            Goal: hit{" "}
            <span className="font-semibold text-cyan-300">
              {targetL.toFixed(1)}L
            </span>{" "}
            today. You can log up to{" "}
            <span className="font-semibold text-zinc-200">+500ml</span> over goal.
          </p>
          <p className="text-sm text-zinc-400">
            Remaining to goal:{" "}
            <span className="font-semibold text-emerald-300">
              {remainingL.toFixed(2)}L
            </span>
          </p>
          <div>
            <div className="flex justify-between text-xs text-zinc-500">
              <span>Progress</span>
              <span>{pct.toFixed(0)}%</span>
            </div>
            <div className="mt-1 h-2 overflow-hidden rounded-full bg-zinc-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 transition-[width] duration-500 ease-out"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {([150, 250, 500] as const).map((ml) => (
          <button
            key={ml}
            type="button"
            onClick={() => onAdd(ml)}
            className="rounded-2xl bg-zinc-800 px-4 py-2.5 text-sm font-semibold text-zinc-100 transition hover:bg-zinc-700 active:scale-[0.98]"
          >
            +{ml}ml
          </button>
        ))}
      </div>
    </section>
  );
}
