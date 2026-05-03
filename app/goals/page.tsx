"use client";

import Link from "next/link";
import type { FormEvent } from "react";
import { useEffect, useMemo } from "react";
import { useShallow } from "zustand/shallow";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  GOALS_BEYOND_SIX,
  GOALS_REQUIREMENTS,
  MIN_TRUNK_KG,
  buildFullProjection,
  bodyFatPctFromMass,
  trunkFatPctFromKg,
} from "@/lib/bodyGoalsProjection";
import { useBodyGoalsStore } from "@/stores/bodyGoalsStore";

const fieldClass =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-ring";

export default function GoalsPage() {
  useEffect(() => {
    void useBodyGoalsStore.persist.rehydrate();
  }, []);

  const {
    trunkFatKg,
    totalBodyFatKg,
    weightKg,
    dailyDeficitKcal,
    setTrunkFatKg,
    setTotalBodyFatKg,
    setWeightKg,
    setDailyDeficitKcal,
    resetToDefaults,
  } = useBodyGoalsStore(
    useShallow((s) => ({
      trunkFatKg: s.trunkFatKg,
      totalBodyFatKg: s.totalBodyFatKg,
      weightKg: s.weightKg,
      dailyDeficitKcal: s.dailyDeficitKcal,
      setTrunkFatKg: s.setTrunkFatKg,
      setTotalBodyFatKg: s.setTotalBodyFatKg,
      setWeightKg: s.setWeightKg,
      setDailyDeficitKcal: s.setDailyDeficitKcal,
      resetToDefaults: s.resetToDefaults,
    })),
  );

  const projection = useMemo(
    () =>
      buildFullProjection({
        trunkFatKg,
        totalBodyFatKg,
        weightKg,
        dailyDeficitKcal,
      }),
    [trunkFatKg, totalBodyFatKg, weightKg, dailyDeficitKcal],
  );

  const bfNow = bodyFatPctFromMass(totalBodyFatKg, weightKg);

  function onSave(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parse = (name: string) =>
      parseFloat(String(fd.get(name) ?? "").replace(",", "."));

    const t = parse("trunk");
    const f = parse("fat");
    const w = parse("weight");
    const d = parse("deficit");

    if (Number.isFinite(t) && t >= MIN_TRUNK_KG && t <= 40) {
      setTrunkFatKg(Math.round(t * 10) / 10);
    }
    if (Number.isFinite(f) && f >= 8 && f <= 50) {
      setTotalBodyFatKg(Math.round(f * 10) / 10);
    }
    if (Number.isFinite(w) && w >= 50 && w <= 140) {
      setWeightKg(Math.round(w * 10) / 10);
    }
    if (Number.isFinite(d) && d >= 200 && d <= 900) {
      setDailyDeficitKcal(Math.round(d));
    }
  }

  const formKey = `${trunkFatKg}-${totalBodyFatKg}-${weightKg}-${dailyDeficitKcal}`;

  const dm = projection.deficitMath;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="mx-auto max-w-2xl space-y-6 px-4 pb-28 pt-8">
        <Link
          href="/"
          className="text-sm font-semibold text-emerald-600 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300"
        >
          ← Back to dashboard
        </Link>

        <header>
          <h1 className="text-3xl font-bold tracking-tight">Body goals</h1>
          <p className="mt-1 text-muted-foreground">
            Edit your latest InBody numbers; projections use the curve + deficit
            math in <code className="rounded bg-muted px-1 text-xs">lib/bodyGoalsProjection.ts</code>.
          </p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle>Edit current metrics</CardTitle>
            <CardDescription>
              Trunk fat drives the staged table; other fields scale whole-body
              fat and weight trends.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              key={formKey}
              className="grid gap-4 sm:grid-cols-2"
              onSubmit={onSave}
            >
              <label className="grid gap-1.5 text-sm">
                <span className="font-medium text-foreground">
                  Trunk fat (kg)
                </span>
                <input
                  name="trunk"
                  className={fieldClass}
                  inputMode="decimal"
                  defaultValue={String(trunkFatKg)}
                />
                <span className="text-xs text-muted-foreground">
                  Min {MIN_TRUNK_KG} kg · InBody segmental trunk mass
                </span>
              </label>
              <label className="grid gap-1.5 text-sm">
                <span className="font-medium text-foreground">
                  Total body fat (kg)
                </span>
                <input
                  name="fat"
                  className={fieldClass}
                  inputMode="decimal"
                  defaultValue={String(totalBodyFatKg)}
                />
              </label>
              <label className="grid gap-1.5 text-sm">
                <span className="font-medium text-foreground">
                  Body weight (kg)
                </span>
                <input
                  name="weight"
                  className={fieldClass}
                  inputMode="decimal"
                  defaultValue={String(weightKg)}
                />
              </label>
              <label className="grid gap-1.5 text-sm">
                <span className="font-medium text-foreground">
                  Planned daily deficit (kcal)
                </span>
                <input
                  name="deficit"
                  className={fieldClass}
                  inputMode="numeric"
                  defaultValue={String(dailyDeficitKcal)}
                />
              </label>
              <div className="flex flex-wrap gap-2 sm:col-span-2">
                <Button type="submit">Save and recalculate</Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetToDefaults}
                >
                  Reset to plan defaults
                </Button>
              </div>
              <p className="text-xs text-muted-foreground sm:col-span-2">
                Derived now: body fat % ≈{" "}
                <span className="font-semibold text-foreground">{bfNow}%</span>{" "}
                (total fat ÷ weight). Trunk % model ≈{" "}
                <span className="font-semibold text-foreground">
                  {trunkFatPctFromKg(trunkFatKg)}%
                </span>
                .
              </p>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Now vs 6 months (model)</CardTitle>
            <CardDescription>
              Targets update when you save new trunk / fat / weight / deficit
              values.
            </CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full min-w-[280px] text-left text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-2 pr-2 font-semibold">Metric</th>
                  <th className="pb-2 pr-2 font-semibold">Now</th>
                  <th className="pb-2 font-semibold">~6 mo</th>
                </tr>
              </thead>
              <tbody>
                {projection.nowVsSixMonths.map((row) => (
                  <tr key={row.label} className="border-b border-border/60">
                    <td className="py-2 pr-2 text-muted-foreground">{row.label}</td>
                    <td className="py-2 pr-2 font-medium">{row.now}</td>
                    <td className="py-2 font-medium text-emerald-700 dark:text-emerald-400">
                      {row.targetSixMo}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How the math works</CardTitle>
            <CardDescription>
              Fat mass change from energy deficit (7700 kcal ≈ 1 kg fat).
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              <span className="font-semibold text-foreground">
                {dm.dailyDeficitKcal} kcal
              </span>{" "}
              × 30 days ≈{" "}
              <span className="font-semibold text-foreground">
                {Math.round(dm.monthlyKcal).toLocaleString()} kcal
              </span>{" "}
              / month → ~{dm.kgFatPerMonthLow}–{dm.kgFatPerMonthHigh} kg fat /
              month → ~{dm.sixMonthFatLossKgMid} kg over 6 months (whole-body
              estimate).
            </p>
            <p>{dm.trunkShareOfSixMoLoss}</p>
            <p>
              Trunk trajectory uses the same <em>absolute</em> monthly drops as
              your coach table anchored at {projection.inputs.trunkFatKg} kg
              trunk start, floored at {MIN_TRUNK_KG} kg.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Trunk fat — staged path</CardTitle>
            <CardDescription>
              InBody trunk % is modeled as proportional to trunk fat mass at
              your height/leanness band (~22.9% per kg at the reference point).
            </CardDescription>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="w-full min-w-[320px] text-left text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-2 pr-2 font-semibold">Stage</th>
                  <th className="pb-2 pr-2 font-semibold">Trunk (kg)</th>
                  <th className="pb-2 pr-2 font-semibold">Trunk %</th>
                  <th className="pb-2 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {projection.trunkStages.map((row) => (
                  <tr key={row.label} className="border-b border-border/60">
                    <td className="py-2 pr-2 font-medium">{row.label}</td>
                    <td className="py-2 pr-2">{row.trunkKg} kg</td>
                    <td className="py-2 pr-2">{row.trunkPct}%</td>
                    <td className="py-2 text-muted-foreground">{row.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>What has to stay true</CardTitle>
            <CardDescription>
              If one pillar slips, the timeline shifts — not the laws of energy
              balance.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-inside list-disc space-y-2 text-sm text-muted-foreground">
              {GOALS_REQUIREMENTS.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Beyond 6 months</CardTitle>
            <CardDescription>Qualitative targets if adherence holds.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-muted-foreground">
            {GOALS_BEYOND_SIX.map((b) => (
              <div key={b.title}>
                <p className="font-semibold text-foreground">{b.title}</p>
                <p className="mt-1 leading-relaxed">{b.body}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
