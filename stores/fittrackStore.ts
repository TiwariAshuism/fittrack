import { create } from "zustand";

import { getTodayState, waterStorageKeyForDate } from "@/lib/todayController";
import {
  clampWaterTotal,
  emptyWaterStateForDate,
  loadWaterState,
  resetWaterForDate,
  saveWaterState,
  WATER_TARGET_ML,
} from "@/lib/waterStorage";
import type { TodayPlanStatus, TodayState, WaterEntry, WaterState } from "@/types/fitness";

function nowTimeLabel(): string {
  return new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

function tryHydrationGoalNotification(): void {
  if (typeof window === "undefined") return;
  if (!("Notification" in window)) return;
  if (Notification.permission !== "granted") return;
  new Notification("Hydration goal reached", {
    body: "You hit 3L for today. Keep sipping if you want that buffer.",
  });
}

let toastTimer: ReturnType<typeof setTimeout> | undefined;

function scheduleToastClear(): void {
  if (toastTimer !== undefined) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toastTimer = undefined;
    useFittrackStore.setState({ toast: null });
  }, 4000);
}

export type FittrackState = {
  planStatus: TodayPlanStatus;
  today: TodayState | null;
  water: WaterState;
  toast: string | null;
  loadAll: () => void;
  addWater: (ml: number) => void;
  resetWater: () => void;
  clearToast: () => void;
  /** Re-read today’s water row from localStorage (e.g. after cross-tab writes). */
  rehydrateWater: () => void;
};

export const useFittrackStore = create<FittrackState>((set, get) => ({
  planStatus: "loading",
  today: null,
  water: emptyWaterStateForDate(new Date()),
  toast: null,

  clearToast: () => set({ toast: null }),

  loadAll: () => {
    set({ planStatus: "loading" });
    try {
      const today = getTodayState(new Date());
      const water = loadWaterState(today.date);
      set({ today, water, planStatus: "loaded", toast: null });
    } catch {
      set({ planStatus: "error", today: null });
    }
  },

  rehydrateWater: () => {
    const { today } = get();
    if (!today) return;
    set({ water: loadWaterState(today.date) });
  },

  addWater: (ml: number) => {
    const { today } = get();
    if (!today) return;

    const prev = get().water;
    const before = prev.currentMl;
    const nextTotal = clampWaterTotal(before + ml);
    const delta = nextTotal - before;
    const entries: WaterEntry[] =
      delta > 0
        ? [...prev.entries, { ml: delta, time: nowTimeLabel() }]
        : prev.entries;
    const water: WaterState = {
      ...prev,
      currentMl: nextTotal,
      entries,
    };
    saveWaterState(today.date, water);

    const hitGoal = before < WATER_TARGET_ML && nextTotal >= WATER_TARGET_ML;
    const toast = hitGoal ? "Goal hit: 3L logged today." : get().toast;
    set({ water, toast });

    if (hitGoal) {
      tryHydrationGoalNotification();
      scheduleToastClear();
    }
  },

  resetWater: () => {
    const { today } = get();
    if (!today) return;
    resetWaterForDate(today.date);
    set({ water: emptyWaterStateForDate(today.date), toast: null });
  },
}));

function onStorage(e: StorageEvent): void {
  if (typeof window === "undefined") return;
  if (!e.key?.startsWith("water_ml_")) return;
  const today = useFittrackStore.getState().today;
  if (!today) return;
  if (e.key !== waterStorageKeyForDate(today.date)) return;
  useFittrackStore.getState().rehydrateWater();
}

if (typeof window !== "undefined") {
  window.addEventListener("storage", onStorage);
}
