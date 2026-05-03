"use client";

import type { DayMealPlan, WorkoutDay } from "@/types/fitness";

import { coreStripLabel, workoutStripLabel } from "@/lib/workoutLabels";

type Props = {
  workout: WorkoutDay;
  meal: DayMealPlan;
};

export function SummaryStrip({ workout, meal }: Props) {
  const workoutLabel = workoutStripLabel(workout);
  const coreLabel = coreStripLabel(workout);

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 px-3 py-3 text-center">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
          Workout
        </p>
        <p className="mt-1 text-lg font-bold text-zinc-100">{workoutLabel}</p>
      </div>
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 px-3 py-3 text-center">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
          Core
        </p>
        <p className="mt-1 text-sm font-bold leading-tight text-violet-300">
          {coreLabel}
        </p>
      </div>
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 px-3 py-3 text-center">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
          Calories
        </p>
        <p className="mt-1 text-lg font-bold text-emerald-400">
          {meal.totalCalories}
        </p>
      </div>
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 px-3 py-3 text-center">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
          Protein
        </p>
        <p className="mt-1 text-lg font-bold text-sky-400">
          {meal.totalProtein}g
        </p>
      </div>
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 px-3 py-3 text-center">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
          Water
        </p>
        <p className="mt-1 text-lg font-bold text-cyan-400">3L</p>
      </div>
    </div>
  );
}
