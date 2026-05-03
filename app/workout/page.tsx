"use client";

import Link from "next/link";
import { useEffect } from "react";
import { motion } from "motion/react";
import { useShallow } from "zustand/shallow";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDateLabel } from "@/lib/todayController";
import {
  isValidYoutubeWatchId,
  youtubeSearchForExercise,
  youtubeWatchUrl,
} from "@/lib/youtube";
import { useFittrackStore } from "@/stores/fittrackStore";

function VideoLinks({ name, videoId }: { name: string; videoId?: string }) {
  const hasId = videoId && isValidYoutubeWatchId(videoId);
  return (
    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
      {hasId ? (
        <a
          href={youtubeWatchUrl(videoId)}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-sky-600 hover:text-sky-800 dark:text-sky-400 dark:hover:text-sky-300"
        >
          Open video →
        </a>
      ) : null}
      <a
        href={youtubeSearchForExercise(name)}
        target="_blank"
        rel="noopener noreferrer"
        className="font-semibold text-zinc-600 underline decoration-zinc-400 decoration-1 underline-offset-2 hover:text-zinc-900 dark:text-zinc-400 dark:decoration-zinc-600 dark:hover:text-zinc-200"
      >
        Search YouTube
      </a>
    </div>
  );
}

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
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-4 bg-background px-4 text-muted-foreground">
        <div className="flex flex-col items-center gap-3">
          <Skeleton className="size-12 rounded-full" />
          <Skeleton className="h-4 w-44" />
          <Skeleton className="h-3 w-32" />
        </div>
        <p className="text-sm">Loading workout…</p>
      </div>
    );
  }

  if (planStatus === "error") {
    return (
      <div className="mx-auto max-w-2xl bg-background px-4 py-16 text-center text-destructive">
        <p className="font-medium">Something went wrong.</p>
        <Button type="button" onClick={loadAll} className="mt-4 w-full rounded-2xl py-6">
          Retry
        </Button>
      </div>
    );
  }

  const { workout } = today;

  return (
    <motion.div
      className="mx-auto min-h-screen max-w-2xl bg-background px-4 pb-20 pt-8 text-foreground"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href="/"
        className="text-sm font-semibold text-emerald-600 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
      >
        ← Back
      </Link>
      <p className="mt-4 text-sm text-zinc-500">{formatDateLabel(today.date)}</p>
      <h1 className="mt-2 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
        {workout.title}
      </h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">{workout.subtitle}</p>

      {workout.sessionKind === "activeRecovery" && workout.activeRecovery ? (
        <div className="mt-8 space-y-6">
          <div className="rounded-3xl border border-violet-200 bg-violet-50 dark:border-violet-500/25 dark:bg-violet-950/25 p-6">
            <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              {workout.activeRecovery.rationale}
            </p>
            <p className="mt-4 text-sm font-semibold text-emerald-700 dark:text-emerald-300">
              Walk: {workout.activeRecovery.walkTarget}
            </p>
          </div>
          {workout.activeRecovery.sections.map((sec) => (
            <section
              key={sec.title}
              className="rounded-3xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/50 p-5"
            >
              <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
                {sec.title}
              </h2>
              {sec.moves && sec.moves.length > 0 ? (
                <div className="mt-4 space-y-4">
                  {sec.moves.map((m) => (
                    <article
                      key={m.id}
                      className="rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800/80 dark:bg-zinc-950/60 p-4"
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                          {m.name}
                        </h3>
                        <span className="text-sm font-semibold text-violet-700 dark:text-violet-300">
                          {m.prescription}
                        </span>
                      </div>
                      <p className="mt-1 text-xs uppercase tracking-wide text-zinc-500">
                        {m.muscleGroup}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                        {m.instructions}
                      </p>
                      <VideoLinks name={m.name} videoId={m.youtubeVideoId} />
                    </article>
                  ))}
                </div>
              ) : null}
              {sec.bullets && sec.bullets.length > 0 ? (
                <ul className="mt-3 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                  {sec.bullets.map((line) => (
                    <li key={line}>• {line}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
          <section className="rounded-3xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/40 p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
              Prep
            </h2>
            <ul className="mt-2 space-y-1.5 text-sm text-zinc-700 dark:text-zinc-300">
              {workout.warmUp.map((l) => (
                <li key={l}>• {l}</li>
              ))}
            </ul>
          </section>
          <section className="rounded-3xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/40 p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
              Afterward
            </h2>
            <ul className="mt-2 space-y-1.5 text-sm text-zinc-700 dark:text-zinc-300">
              {workout.coolDown.map((l) => (
                <li key={l}>• {l}</li>
              ))}
            </ul>
          </section>
        </div>
      ) : workout.sessionKind === "fullRest" ? (
        <div className="mt-8 rounded-3xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900/60 p-6">
          <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
            {workout.key === "sundayRest"
              ? "No core work — let the week consolidate. Use the day for sleep and meal prep."
              : "No core work today. Optional easy walk and foam rolling only; prioritize 7–8 hours sleep."}
          </p>
          <div className="mt-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
              Ideas
            </h2>
            <ul className="mt-2 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
              {workout.warmUp.map((l) => (
                <li key={l}>• {l}</li>
              ))}
            </ul>
          </div>
          <div className="mt-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
              Recovery focus
            </h2>
            <ul className="mt-2 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
              {workout.coolDown.map((l) => (
                <li key={l}>• {l}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <>
          <section className="mt-8 rounded-3xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/40 p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
              Warm-up
            </h2>
            <ul className="mt-2 space-y-1.5 text-sm text-zinc-700 dark:text-zinc-300">
              {workout.warmUp.map((l) => (
                <li key={l}>• {l}</li>
              ))}
            </ul>
          </section>
          <section className="mt-6 space-y-4">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Main lifts ({workout.exercises.length})
            </h2>
            {workout.exercises.map((e, i) => (
              <article
                key={e.id}
                className="rounded-3xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950/80 p-5"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                    {i + 1}. {e.name}
                  </h3>
                  <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                    {e.sets}×{e.reps} · rest {e.rest}
                  </span>
                </div>
                <p className="mt-1 text-xs uppercase tracking-wide text-zinc-500">
                  {e.muscleGroup}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {e.instructions}
                </p>
                <VideoLinks name={e.name} videoId={e.youtubeVideoId} />
              </article>
            ))}
          </section>
          {workout.coreFinisher ? (
            <section className="mt-6 space-y-4">
              <div className="rounded-3xl border border-violet-200 bg-violet-50/90 dark:border-violet-500/30 dark:bg-violet-950/30 p-5">
                <h2 className="text-lg font-semibold text-violet-900 dark:text-violet-200">
                  After lifts — {workout.coreFinisher.label}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {workout.coreFinisher.rationale}
                </p>
              </div>
              {workout.coreFinisher.exercises.map((c) => (
                <article
                  key={c.id}
                  className="rounded-3xl border border-violet-200 bg-violet-50/40 dark:border-violet-500/20 dark:bg-zinc-950/80 p-5"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                      {c.name}
                    </h3>
                    <span className="text-sm font-semibold text-violet-700 dark:text-violet-300">
                      {c.prescription}
                    </span>
                  </div>
                  <p className="mt-1 text-xs uppercase tracking-wide text-zinc-500">
                    {c.muscleGroup}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {c.instructions}
                  </p>
                  <VideoLinks name={c.name} videoId={c.youtubeVideoId} />
                </article>
              ))}
            </section>
          ) : null}
          <section className="mt-6 rounded-3xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/40 p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
              Cool-down
            </h2>
            <ul className="mt-2 space-y-1.5 text-sm text-zinc-700 dark:text-zinc-300">
              {workout.coolDown.map((l) => (
                <li key={l}>• {l}</li>
              ))}
            </ul>
          </section>
        </>
      )}
    </motion.div>
  );
}
