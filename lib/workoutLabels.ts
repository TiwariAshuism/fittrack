import type { WorkoutDay } from "@/types/fitness";

/** Summary strip: gym vs recovery vs rest. */
export function workoutStripLabel(workout: WorkoutDay): string {
  if (workout.sessionKind === "fullRest") return "REST";
  if (workout.sessionKind === "activeRecovery") return "MOVE";
  return "GYM";
}

/** Short core line for summary strip. */
export function coreStripLabel(workout: WorkoutDay): string {
  if (workout.coreFinisher) {
    const [head] = workout.coreFinisher.label.split("—");
    return head?.trim() ?? workout.coreFinisher.label;
  }
  if (workout.sessionKind === "activeRecovery") return "Core C";
  if (workout.sessionKind === "fullRest") return "Off";
  return "—";
}
