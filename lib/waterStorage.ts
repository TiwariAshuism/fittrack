import type { WaterEntry, WaterState } from "@/types/fitness";

import { waterStorageKeyForDate } from "@/lib/todayController";

const TARGET_ML = 3000;
const MAX_EXTRA_ML = 500;

export const WATER_TARGET_ML = TARGET_ML;
export const WATER_MAX_ML = TARGET_ML + MAX_EXTRA_ML;

interface StoredWaterPayload {
  currentMl: number;
  entries: WaterEntry[];
}

function isStoredPayload(v: unknown): v is StoredWaterPayload {
  if (!v || typeof v !== "object") return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o.currentMl === "number" &&
    Array.isArray(o.entries) &&
    o.entries.every(
      (e) =>
        e &&
        typeof e === "object" &&
        typeof (e as WaterEntry).ml === "number" &&
        typeof (e as WaterEntry).time === "string",
    )
  );
}

export function emptyWaterStateForDate(date: Date): WaterState {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return {
    targetMl: TARGET_ML,
    currentMl: 0,
    date: `${y}-${m}-${d}`,
    entries: [],
  };
}

export function loadWaterState(date: Date): WaterState {
  if (typeof window === "undefined") {
    return emptyWaterStateForDate(date);
  }
  const key = waterStorageKeyForDate(date);
  const raw = window.localStorage.getItem(key);
  const base = emptyWaterStateForDate(date);
  if (!raw) return base;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isStoredPayload(parsed)) return base;
    return {
      ...base,
      currentMl: Math.max(0, parsed.currentMl),
      entries: parsed.entries,
    };
  } catch {
    return base;
  }
}

export function saveWaterState(date: Date, state: WaterState): void {
  if (typeof window === "undefined") return;
  const key = waterStorageKeyForDate(date);
  const payload: StoredWaterPayload = {
    currentMl: state.currentMl,
    entries: state.entries,
  };
  window.localStorage.setItem(key, JSON.stringify(payload));
}

export function resetWaterForDate(date: Date): void {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(waterStorageKeyForDate(date));
}

export function clampWaterTotal(ml: number): number {
  return Math.min(Math.max(0, ml), WATER_MAX_ML);
}
