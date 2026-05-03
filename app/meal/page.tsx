"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";

import { formatDateLabel } from "@/lib/todayController";
import { useFittrackStore } from "@/stores/fittrackStore";

export default function MealDetailPage() {
  const { planStatus, today, loadAll } = useFittrackStore(
    useShallow((s) => ({
      planStatus: s.planStatus,
      today: s.today,
      loadAll: s.loadAll,
    })),
  );

  useEffect(() => {
    queueMicrotask(() => {
      loadAll();
    });
  }, [loadAll]);

  if (planStatus === "loading" || !today) {
    return (
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-3 px-4 text-zinc-500 dark:text-zinc-400">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-zinc-300 border-t-sky-600 dark:border-zinc-600 dark:border-t-sky-400" />
        <p className="text-sm">Loading meals…</p>
      </div>
    );
  }

  if (planStatus === "error") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center text-rose-700 dark:text-rose-200">
        Something went wrong.
        <button
          type="button"
          onClick={loadAll}
          className="mt-4 block w-full rounded-2xl border border-zinc-200 bg-zinc-900 py-3 font-semibold text-white dark:border-0 dark:bg-zinc-100 dark:text-zinc-900"
        >
          Retry
        </button>
      </div>
    );
  }

  const { meal } = today;

  return (
    <div className="mx-auto min-h-screen max-w-2xl px-4 pb-24 pt-8 text-zinc-900 dark:text-zinc-50">
      <Link
        href="/"
        className="text-sm font-semibold text-sky-600 hover:text-sky-800 dark:text-sky-400 dark:hover:text-sky-300"
      >
        ← Back
      </Link>
      <p className="mt-4 text-sm text-zinc-500">{formatDateLabel(today.date)}</p>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          {meal.label}
        </h1>
        {meal.isVegetarian ? (
          <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
            🌱 Veg Day
          </span>
        ) : null}
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <MacroCard label="Calories" value={`${meal.totalCalories}`} unit="kcal" />
        <MacroCard label="Protein" value={`${meal.totalProtein}`} unit="g" />
        <MacroCard label="Carbs" value={`${meal.totalCarbs}`} unit="g" />
        <MacroCard label="Fat" value={`${meal.totalFat}`} unit="g" />
      </div>
      <section className="mt-8 space-y-4">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          All meals
        </h2>
        {meal.meals.map((m) => (
          <article
            key={`${m.time}-${m.name}`}
            className="rounded-3xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950/80 p-5"
          >
            <div className="flex items-start gap-3">
              <span className="text-3xl" aria-hidden>
                {m.emoji}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                    {m.name}
                  </h3>
                  <span className="text-sm text-zinc-500">{m.time}</span>
                </div>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {m.description}
                </p>
                <dl className="mt-4 grid grid-cols-2 gap-2 text-sm sm:grid-cols-4">
                  <div>
                    <dt className="text-xs uppercase text-zinc-500">Calories</dt>
                    <dd className="font-semibold text-zinc-800 dark:text-zinc-200">
                      {m.calories}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase text-zinc-500">Protein</dt>
                    <dd className="font-semibold text-sky-700 dark:text-sky-300">
                      {m.protein}g
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase text-zinc-500">Carbs</dt>
                    <dd className="font-semibold text-amber-700 dark:text-amber-300">
                      {m.carbs}g
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase text-zinc-500">Fat</dt>
                    <dd className="font-semibold text-rose-700 dark:text-rose-300">
                      {m.fat}g
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

function MacroCard({
  label,
  value,
  unit,
}: {
  label: string;
  value: string;
  unit: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-3 py-3 dark:border-zinc-800 dark:bg-zinc-900/60">
      <p className="text-[10px] font-semibold uppercase tracking-wide text-zinc-500">
        {label}
      </p>
      <p className="mt-1 text-xl font-bold text-zinc-900 dark:text-zinc-100">
        {value}
        <span className="ml-0.5 text-sm font-medium text-zinc-500">{unit}</span>
      </p>
    </div>
  );
}
