import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import {
  DEFAULT_BODY_GOALS_INPUTS,
  type BodyGoalsInputs,
} from "@/lib/bodyGoalsProjection";

const STORAGE_KEY = "fittrack-body-goals-v1";

export type BodyGoalsStore = BodyGoalsInputs & {
  setTrunkFatKg: (v: number) => void;
  setTotalBodyFatKg: (v: number) => void;
  setWeightKg: (v: number) => void;
  setDailyDeficitKcal: (v: number) => void;
  resetToDefaults: () => void;
};

export const useBodyGoalsStore = create<BodyGoalsStore>()(
  persist(
    (set) => ({
      ...DEFAULT_BODY_GOALS_INPUTS,
      setTrunkFatKg: (v) => set({ trunkFatKg: v }),
      setTotalBodyFatKg: (v) => set({ totalBodyFatKg: v }),
      setWeightKg: (v) => set({ weightKg: v }),
      setDailyDeficitKcal: (v) => set({ dailyDeficitKcal: v }),
      resetToDefaults: () => set({ ...DEFAULT_BODY_GOALS_INPUTS }),
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        trunkFatKg: s.trunkFatKg,
        totalBodyFatKg: s.totalBodyFatKg,
        weightKg: s.weightKg,
        dailyDeficitKcal: s.dailyDeficitKcal,
      }),
      skipHydration: true,
    },
  ),
);
