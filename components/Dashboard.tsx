"use client";

import { useEffect } from "react";
import { useShallow } from "zustand/shallow";

import { MealsSection } from "@/components/MealsSection";
import { SummaryStrip } from "@/components/SummaryStrip";
import { WeeklyCoreRoadmap } from "@/components/WeeklyCoreRoadmap";
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
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 text-zinc-500 dark:text-zinc-400">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-zinc-300 border-t-emerald-600 dark:border-zinc-600 dark:border-t-emerald-400" />
        <p className="text-sm">Loading your day…</p>
      </div>
    );
  }

  if (planStatus === "error") {
    return (
      <div className="rounded-3xl border border-rose-200 bg-rose-50 p-8 text-center text-rose-900 dark:border-rose-500/30 dark:bg-rose-950/40 dark:text-rose-200">
        <p>Could not load today&apos;s plan.</p>
        <button
          type="button"
          onClick={loadAll}
          className="mt-4 rounded-full border border-zinc-200 bg-zinc-900 px-5 py-2 text-sm font-semibold text-white dark:border-0 dark:bg-zinc-100 dark:text-zinc-900"
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
          className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-center text-sm text-emerald-900 dark:border-emerald-500/30 dark:bg-emerald-950/50 dark:text-emerald-100"
        >
          {toast}
        </div>
      ) : null}
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Hey Ashu 👋
          </h1>
          <p className="mt-1 text-lg text-zinc-600 dark:text-zinc-400">
            {formatDateLabel(today.date)}
          </p>
        </div>
        <button
          type="button"
          onClick={loadAll}
          className="inline-flex items-center justify-center gap-2 self-start rounded-2xl border border-zinc-300 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-900 shadow-sm transition hover:border-emerald-500/50 hover:text-emerald-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-emerald-500/50 dark:hover:text-emerald-200"
        >
          ⟳ Refresh
        </button>
      </header>
      <SummaryStrip workout={today.workout} meal={today.meal} />
      <WeeklyCoreRoadmap />
      <WorkoutSection workout={today.workout} />
      <MealsSection meal={today.meal} />
      <WaterTracker water={water} onAdd={addWater} onReset={resetWater} />
    </div>
  );
}
