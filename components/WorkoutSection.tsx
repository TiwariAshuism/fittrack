"use client";

import type { WorkoutDay } from "@/types/fitness";

import { WorkoutCard } from "@/components/WorkoutCard";

type Props = {
  workout: WorkoutDay;
};

function sectionHeading(workout: WorkoutDay): string {
  if (workout.sessionKind === "activeRecovery") return "🚶 Today’s session";
  if (workout.sessionKind === "fullRest") return "🛋️ Recovery";
  return "🏋️ Today’s workout";
}

export function WorkoutSection({ workout }: Props) {
  return (
    <section>
      <h2 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        {sectionHeading(workout)}
      </h2>
      <WorkoutCard workout={workout} />
    </section>
  );
}
