"use client";

import Link from "next/link";

import type { WorkoutDay } from "@/types/fitness";

type Props = {
  workout: WorkoutDay;
};

export function WorkoutCard({ workout }: Props) {
  if (workout.sessionKind === "activeRecovery" && workout.activeRecovery) {
    const ar = workout.activeRecovery;
    return (
      <Link
        href="/workout"
        className="block rounded-3xl border border-zinc-800 bg-gradient-to-br from-violet-950/40 to-zinc-950 p-6 transition hover:border-violet-500/40 hover:shadow-lg hover:shadow-violet-500/10"
      >
        <div className="flex flex-col gap-1">
          <span className="text-xs font-semibold uppercase tracking-wide text-violet-300">
            Active recovery
          </span>
          <h3 className="text-xl font-semibold text-zinc-100">{workout.title}</h3>
          <p className="text-sm text-zinc-400">{workout.subtitle}</p>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-zinc-500">{ar.rationale}</p>
        <div className="mt-4 rounded-2xl bg-zinc-950/70 px-3 py-2 text-sm text-zinc-300">
          Walk target:{" "}
          <span className="font-semibold text-emerald-300">{ar.walkTarget}</span>
        </div>
        <ul className="mt-4 space-y-2 text-sm text-zinc-400">
          {ar.sections[0]?.moves?.slice(0, 3).map((m) => (
            <li key={m.id}>
              • {m.name}{" "}
              <span className="text-zinc-500">({m.prescription})</span>
            </li>
          ))}
        </ul>
        <p className="mt-5 text-center text-sm font-semibold text-violet-300">
          Full recovery plan →
        </p>
      </Link>
    );
  }

  if (workout.sessionKind === "fullRest") {
    return (
      <div className="rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-6">
        <div className="flex items-start gap-4">
          <span className="text-4xl" aria-hidden>
            {workout.key === "sundayRest" ? "🌙" : "🛋️"}
          </span>
          <div>
            <h3 className="text-xl font-semibold text-zinc-100">{workout.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              {workout.subtitle}
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

  const core = workout.coreFinisher;

  return (
    <Link
      href="/workout"
      className="block rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-6 transition hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/10"
    >
      <div className="flex flex-col gap-1">
        <h3 className="text-xl font-semibold text-zinc-100">{workout.title}</h3>
        <p className="text-sm text-zinc-400">{workout.subtitle}</p>
      </div>
      <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">
        Main lifts ({workout.exercises.length})
      </p>
      <ul className="mt-2 space-y-3">
        {workout.exercises.map((e) => (
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
      {core ? (
        <div className="mt-5 rounded-2xl border border-violet-500/20 bg-violet-950/20 px-3 py-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-violet-300">
            After lifts — {core.label}
          </p>
          <ul className="mt-2 space-y-1.5 text-sm text-zinc-400">
            {core.exercises.map((c) => (
              <li key={c.id}>
                {c.name}{" "}
                <span className="text-zinc-500">· {c.prescription}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      <p className="mt-5 text-center text-sm font-semibold text-emerald-400/90">
        View Full Workout + Videos →
      </p>
    </Link>
  );
}
