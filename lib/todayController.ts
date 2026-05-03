import { MEAL_BY_WEEKDAY, WORKOUT_BY_WEEKDAY } from "@/data/fitnessData";
import type { TodayState } from "@/types/fitness";

const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

/**
 * Convert JS Date weekday to 1 = Monday … 7 = Sunday.
 */
export function getWeekday1to7(date: Date): number {
  const d = date.getDay();
  return d === 0 ? 7 : d;
}

export function formatDateLabel(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export function getDayName(date: Date): string {
  return DAY_NAMES[date.getDay()];
}

/**
 * Storage key for water: `water_ml_YYYYMMDD` (local day in en-CA = ISO-like).
 */
export function waterStorageKeyForDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `water_ml_${y}${m}${d}`;
}

export function getTodayState(now: Date = new Date()): TodayState {
  const weekday = getWeekday1to7(now);
  const workout = WORKOUT_BY_WEEKDAY[weekday];
  const meal = MEAL_BY_WEEKDAY[weekday];
  if (!workout || !meal) {
    throw new Error(`Missing schedule for weekday ${weekday}`);
  }
  return {
    workout,
    meal,
    date: now,
    dayName: getDayName(now),
    weekday,
  };
}
