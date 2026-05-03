"use client";

import { useEffect } from "react";

import { useBodyGoalsStore } from "@/stores/bodyGoalsStore";

/** Rehydrate persisted body-goal metrics after SSR (see `skipHydration` on the store). */
export function BodyGoalsHydration() {
  useEffect(() => {
    void useBodyGoalsStore.persist.rehydrate();
  }, []);
  return null;
}
