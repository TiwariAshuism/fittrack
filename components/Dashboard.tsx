"use client";

import { useEffect } from "react";
import { useShallow } from "zustand/shallow";

import { Stagger, StaggerItem } from "@/components/animate/Stagger";
import { MealsSection } from "@/components/MealsSection";
import { SummaryStrip } from "@/components/SummaryStrip";
import { WeeklyCoreRoadmap } from "@/components/WeeklyCoreRoadmap";
import { WaterTracker } from "@/components/WaterTracker";
import { WorkoutSection } from "@/components/WorkoutSection";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDateLabel } from "@/lib/todayController";
import { useFittrackStore } from "@/stores/fittrackStore";

export function Dashboard() {
  const {
    planStatus,
    today,
    water,
    toast,
    loadAll,
    addWater,
    resetWater,
  } = useFittrackStore(
    useShallow((s) => ({
      planStatus: s.planStatus,
      today: s.today,
      water: s.water,
      toast: s.toast,
      loadAll: s.loadAll,
      addWater: s.addWater,
      resetWater: s.resetWater,
    })),
  );

  useEffect(() => {
    queueMicrotask(() => {
      loadAll();
    });
  }, [loadAll]);

  if (planStatus === "loading" || !today) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-muted-foreground">
        <div className="flex flex-col items-center gap-3">
          <Skeleton className="size-12 rounded-full" />
          <Skeleton className="h-4 w-44" />
          <Skeleton className="h-3 w-28" />
        </div>
        <p className="text-sm">Loading your day…</p>
      </div>
    );
  }

  if (planStatus === "error") {
    return (
      <Card className="mx-auto max-w-md border-destructive/30 bg-destructive/5 py-8 text-center shadow-none">
        <CardHeader>
          <CardTitle className="text-destructive">Could not load plan</CardTitle>
          <CardDescription>
            Check your connection and try again.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button type="button" onClick={loadAll} className="w-full">
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Stagger className="space-y-8">
      {toast ? (
        <StaggerItem>
          <div
            role="status"
            className="rounded-2xl border border-emerald-500/25 bg-emerald-500/10 px-4 py-3 text-center text-sm text-emerald-900 dark:text-emerald-100"
          >
            {toast}
          </div>
        </StaggerItem>
      ) : null}
      <StaggerItem>
        <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Hey Ashu 👋
            </h1>
            <p className="mt-1 text-lg text-muted-foreground">
              {formatDateLabel(today.date)}
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="default"
            onClick={loadAll}
            className="self-start rounded-2xl shadow-sm"
          >
            ⟳ Refresh
          </Button>
        </header>
      </StaggerItem>
      <StaggerItem>
        <SummaryStrip workout={today.workout} meal={today.meal} />
      </StaggerItem>
      <StaggerItem>
        <WeeklyCoreRoadmap />
      </StaggerItem>
      <StaggerItem>
        <WorkoutSection workout={today.workout} />
      </StaggerItem>
      <StaggerItem>
        <MealsSection meal={today.meal} />
      </StaggerItem>
      <StaggerItem>
        <WaterTracker water={water} onAdd={addWater} onReset={resetWater} />
      </StaggerItem>
    </Stagger>
  );
}
