"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";

import { formatDateLabel } from "@/lib/todayController";
import { useFittrackStore } from "@/stores/fittrackStore";

export default function WorkoutDetailPage() {
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
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-3 px-4 text-zinc-400">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-zinc-600 border-t-emerald-400" />
        <p className="text-sm">Loading workout…</p>
      </div>
    );
  }

  if (planStatus === "error") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center text-rose-200">
        Something went wrong.
        <button
          type="button"
          onClick={loadAll}
          className="mt-4 block w-full rounded-2xl bg-zinc-100 py-3 font-semibold text-zinc-900"
        >
          Retry
        </button>
      </div>
    );
  }

  const { workout } = today;
  const yt = (id: string) => `https://www.youtube.com/watch?v=${id}`;

  return (
    <div className="mx-auto min-h-screen max-w-2xl px-4 pb-16 pt-8">
      <Link
        href="/"
        className="text-sm font-semibold text-emerald-400 hover:text-emerald-300"
      >
        ← Back
      </Link>
      <p className="mt-4 text-sm text-zinc-500">{formatDateLabel(today.date)}</p>
      <h1 className="mt-2 text-3xl font-bold text-zinc-50">{workout.title}</h1>
      <p className="mt-2 text-zinc-400">{workout.subtitle}</p>

      {workout.isRestDay ? (
        <div className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6">
          <p className="text-zinc-300">
            Full recovery: keep steps light, prioritize sleep and protein.
          </p>
          <div className="mt-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
              Warm-up ideas
            </h2>
            <ul className="mt-2 space-y-2 text-sm text-zinc-300">
              {workout.warmUp.map((l) => (
                <li key={l}>• {l}</li>
              ))}
            </ul>
          </div>
          <div className="mt-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
              Cool-down
            </h2>
            <ul className="mt-2 space-y-2 text-sm text-zinc-300">
              {workout.coolDown.map((l) => (
                <li key={l}>• {l}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <>
          <section className="mt-8 rounded-3xl border border-zinc-800 bg-zinc-900/40 p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
              Warm-up
            </h2>
            <ul className="mt-2 space-y-1.5 text-sm text-zinc-300">
              {workout.warmUp.map((l) => (
                <li key={l}>• {l}</li>
              ))}
            </ul>
          </section>
          <section className="mt-6 space-y-4">
            <h2 className="text-lg font-semibold text-zinc-100">
              Exercises ({workout.exercises.length})
            </h2>
            {workout.exercises.map((e, i) => (
              <article
                key={e.id}
                className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-5"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-base font-semibold text-zinc-100">
                    {i + 1}. {e.name}
                  </h3>
                  <span className="text-sm font-semibold text-emerald-400">
                    {e.sets}×{e.reps} · rest {e.rest}
                  </span>
                </div>
                <p className="mt-1 text-xs uppercase tracking-wide text-zinc-500">
                  {e.muscleGroup}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                  {e.instructions}
                </p>
                <a
                  href={yt(e.youtubeVideoId)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex text-sm font-semibold text-sky-400 hover:text-sky-300"
                >
                  Watch video →
                </a>
              </article>
            ))}
          </section>
          <section className="mt-6 rounded-3xl border border-zinc-800 bg-zinc-900/40 p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
              Cool-down
            </h2>
            <ul className="mt-2 space-y-1.5 text-sm text-zinc-300">
              {workout.coolDown.map((l) => (
                <li key={l}>• {l}</li>
              ))}
            </ul>
          </section>
        </>
      )}
    </div>
  );
}
