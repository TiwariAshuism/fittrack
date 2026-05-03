"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useShallow } from "zustand/shallow";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { buildFullProjection, trunkFatPctFromKg } from "@/lib/bodyGoalsProjection";
import { useBodyGoalsStore } from "@/stores/bodyGoalsStore";

const inputClass =
  "pointer-events-none flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm";

export function GoalCard() {
  const { trunkFatKg, totalBodyFatKg, weightKg, dailyDeficitKcal } =
    useBodyGoalsStore(
      useShallow((s) => ({
        trunkFatKg: s.trunkFatKg,
        totalBodyFatKg: s.totalBodyFatKg,
        weightKg: s.weightKg,
        dailyDeficitKcal: s.dailyDeficitKcal,
      })),
    );

  const projection = buildFullProjection({
    trunkFatKg,
    totalBodyFatKg,
    weightKg,
    dailyDeficitKcal,
  });
  const trunkRow = projection.nowVsSixMonths[0];
  const pctRow = projection.nowVsSixMonths[1];
  const dm = projection.deficitMath;

  return (
    <Link href="/goals" className="block transition hover:opacity-95">
      <Card className="cursor-pointer border-violet-500/25 bg-gradient-to-br from-violet-500/8 to-transparent shadow-sm hover:border-violet-500/40 hover:shadow-md">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <CardTitle className="text-lg">Lean body goals</CardTitle>
              <CardDescription>
                Trunk fat · six-month curve · deficit math — tap to edit and
                recalculate
              </CardDescription>
            </div>
            <ChevronRight
              className="mt-0.5 size-5 shrink-0 text-muted-foreground"
              aria-hidden
            />
          </div>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1.5 rounded-xl border border-border/80 bg-card/50 p-3">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              Now
            </p>
            <p className="text-sm font-medium text-foreground">
              {trunkRow.now} · {pctRow.now}
            </p>
            <p className="text-xs text-muted-foreground">
              InBody-style trunk % ≈{" "}
              <span className="font-semibold text-foreground">
                {trunkFatPctFromKg(trunkFatKg)}%
              </span>{" "}
              from current trunk mass model
            </p>
          </div>
          <div className="space-y-1.5 rounded-xl border border-border/80 bg-card/50 p-3">
            <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
              ~6 months (model)
            </p>
            <p className="text-sm font-medium text-foreground">
              {trunkRow.targetSixMo}
            </p>
            <p className="text-xs text-muted-foreground">{pctRow.targetSixMo}</p>
          </div>
          <div className="sm:col-span-2 grid gap-2 sm:grid-cols-3">
            <div>
              <p className="text-[10px] font-semibold uppercase text-muted-foreground">
                Weight
              </p>
              <p className={inputClass}>{weightKg} kg</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase text-muted-foreground">
                Total fat
              </p>
              <p className={inputClass}>~{totalBodyFatKg} kg</p>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase text-muted-foreground">
                Deficit
              </p>
              <p className={inputClass}>{dailyDeficitKcal} kcal / day</p>
            </div>
          </div>
          <p className="sm:col-span-2 text-xs text-muted-foreground">
            Model fat loss: ~{dm.kgFatPerMonthLow}–{dm.kgFatPerMonthHigh} kg / mo
            from deficit → ~{dm.sixMonthFatLossKgMid} kg over 6 months (whole
            body, not trunk-only).
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
