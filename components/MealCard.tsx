"use client";

import Link from "next/link";

import type { DayMealPlan } from "@/types/fitness";

type Props = {
  meal: DayMealPlan;
};

export function MealCard({ meal }: Props) {
  return (
    <Link
      href="/meal"
      className="block rounded-3xl border border-zinc-200 bg-gradient-to-br from-zinc-50 to-zinc-100 p-6 transition hover:border-sky-400/50 hover:shadow-lg dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-950 dark:hover:border-sky-500/40 dark:hover:shadow-sky-500/10"
    >
      <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        {meal.label}
      </h3>
      <div className="mt-4 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
        <MacroPill label="kcal" value={String(meal.totalCalories)} tone="emerald" />
        <MacroPill label="P" value={`${meal.totalProtein}g`} tone="sky" />
        <MacroPill label="C" value={`${meal.totalCarbs}g`} tone="amber" />
        <MacroPill label="F" value={`${meal.totalFat}g`} tone="rose" />
      </div>
      <ul className="mt-5 divide-y divide-zinc-200 dark:divide-zinc-800/80">
        {meal.meals.map((m) => (
          <li
            key={`${m.time}-${m.name}`}
            className="flex items-center gap-3 py-3 first:pt-0 last:pb-0"
          >
            <span className="text-2xl" aria-hidden>
              {m.emoji}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-zinc-800 dark:text-zinc-200">
                {m.name}
              </p>
              <p className="text-xs text-zinc-500">{m.time}</p>
            </div>
            <span className="shrink-0 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              {m.calories} kcal
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-center text-sm font-semibold text-sky-700 dark:text-sky-400/90">
        Tap for Full Meal Details & Macros →
      </p>
    </Link>
  );
}

function MacroPill({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "emerald" | "sky" | "amber" | "rose";
}) {
  const tones: Record<typeof tone, string> = {
    emerald: "text-emerald-700 dark:text-emerald-300",
    sky: "text-sky-700 dark:text-sky-300",
    amber: "text-amber-700 dark:text-amber-300",
    rose: "text-rose-700 dark:text-rose-300",
  };
  return (
    <div className="rounded-xl bg-white/90 px-2 py-2 text-center shadow-sm dark:bg-zinc-950/70 dark:shadow-none">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-zinc-500">
        {label}
      </p>
      <p className={`mt-0.5 text-sm font-bold ${tones[tone]}`}>{value}</p>
    </div>
  );
}
