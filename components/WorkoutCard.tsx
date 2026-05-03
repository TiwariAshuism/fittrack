"use client";

import Link from "next/link";

import type { WorkoutDay } from "@/types/fitness";

type Props = {
  workout: WorkoutDay;
};

export function WorkoutCard({ workout }: Props) {
  if (workout.isRestDay) {
    return (
      <div className="rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-6">
        <div className="flex items-start gap-4">
          <span className="text-4xl" aria-hidden>
            🛋️
          </span>
          <div>
            <h3 className="text-xl font-semibold text-zinc-100">
              {workout.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              {workout.subtitle}. Light movement, sleep, and nutrition still
              move the needle.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-zinc-500">
              {workout.warmUp.slice(0, 2).map((line) => (
                <li key={line}>• {line}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  const preview = workout.exercises.slice(0, 3);

  return (
    <Link
      href="/workout"
      className="block rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-6 transition hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/10"
    >
      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-semibold text-zinc-100">{workout.title}</h3>
        <p className="text-sm text-zinc-400">{workout.subtitle}</p>
      </div>
      <ul className="mt-5 space-y-3">
        {preview.map((e) => (
          <li
            key={e.id}
            className="flex items-center justify-between gap-3 rounded-2xl bg-zinc-950/80 px-3 py-2.5"
          >
            <span className="truncate text-sm font-medium text-zinc-200">
              {e.name}
            </span>
            <span className="shrink-0 text-xs font-semibold text-emerald-400/90">
              {e.sets}×{e.reps}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-5 text-center text-sm font-semibold text-emerald-400/90">
        View Full Workout + Videos →
      </p>
    </Link>
  );
}
