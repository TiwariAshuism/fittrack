"use client";

import { useEffect } from "react";
import { useShallow } from "zustand/shallow";

import { MealsSection } from "@/components/MealsSection";
import { SummaryStrip } from "@/components/SummaryStrip";
import { WaterTracker } from "@/components/WaterTracker";
import { WorkoutSection } from "@/components/WorkoutSection";
import { formatDateLabel } from "@/lib/todayController";
import { useFittrackStore } from "@/stores/fittrackStore";

export function Dashboard() {
  const {
    planStatus,
    today,
    water,
    toast,
    loadAll,
    addWater,
    resetWater,
  } = useFittrackStore(
    useShallow((s) => ({
      planStatus: s.planStatus,
      today: s.today,
      water: s.water,
      toast: s.toast,
      loadAll: s.loadAll,
      addWater: s.addWater,
      resetWater: s.resetWater,
    })),
  );

  useEffect(() => {
    queueMicrotask(() => {
      loadAll();
    });
  }, [loadAll]);

  if (planStatus === "loading" || !today) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 text-zinc-400">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-zinc-600 border-t-emerald-400" />
        <p className="text-sm">Loading your day…</p>
      </div>
    );
  }

  if (planStatus === "error") {
    return (
      <div className="rounded-3xl border border-rose-500/30 bg-rose-950/40 p-8 text-center">
        <p className="text-rose-200">Could not load today&apos;s plan.</p>
        <button
          type="button"
          onClick={loadAll}
          className="mt-4 rounded-full bg-zinc-100 px-5 py-2 text-sm font-semibold text-zinc-900"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {toast ? (
        <div
          role="status"
          className="rounded-2xl border border-emerald-500/30 bg-emerald-950/50 px-4 py-3 text-center text-sm text-emerald-100"
        >
          {toast}
        </div>
      ) : null}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-50">
            Hey Ashu 👋
          </h1>
          <p className="mt-1 text-lg text-zinc-400">
            {formatDateLabel(today.date)}
          </p>
        </div>
        <button
          type="button"
          onClick={loadAll}
          className="inline-flex items-center justify-center gap-2 self-start rounded-2xl border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-zinc-100 transition hover:border-emerald-500/50 hover:text-emerald-200"
        >
          ⟳ Refresh
        </button>
      </header>
      <SummaryStrip workout={today.workout} meal={today.meal} />
      <WorkoutSection workout={today.workout} />
      <MealsSection meal={today.meal} />
      <WaterTracker water={water} onAdd={addWater} onReset={resetWater} />
    </div>
  );
}
