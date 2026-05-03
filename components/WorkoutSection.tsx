"use client";

import type { WorkoutDay } from "@/types/fitness";

import { WorkoutCard } from "@/components/WorkoutCard";

type Props = {
  workout: WorkoutDay;
};

export function WorkoutSection({ workout }: Props) {
  return (
    <section>
      <h2 className="mb-3 text-lg font-semibold text-zinc-100">
        🏋️ Today&apos;s Workout
      </h2>
      <WorkoutCard workout={workout} />
    </section>
  );
}
