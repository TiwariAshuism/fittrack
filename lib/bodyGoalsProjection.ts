/**
 * Body-composition goal projections for trunk fat, total fat, weight, and BF%.
 * Calibrated to Ashu's InBody-style plan; inputs are editable on /goals.
 */

/** Reference start (kg) used for “absolute loss per month” curve from the written plan. */
export const REFERENCE_TRUNK_START_KG = 12.1;

/** Reference trunk mass (kg) by month along the coach’s staged table (piecewise linear). */
const REF_TRUNK_KG_BY_MONTH: ReadonlyArray<readonly [number, number]> = [
  [0, 12.1],
  [2, 10.5],
  [3, 9],
  [4, 7.5],
  [5, 6.5],
  [6, 5.75],
];

/** Floor for projected trunk fat (kg); editable inputs below this clamp on save. */
export const MIN_TRUNK_KG = 3.5;
const KCAL_PER_KG_FAT = 7700;

export type BodyGoalsInputs = {
  trunkFatKg: number;
  totalBodyFatKg: number;
  weightKg: number;
  /** Planned average daily deficit (kcal). */
  dailyDeficitKcal: number;
};

export const DEFAULT_BODY_GOALS_INPUTS: BodyGoalsInputs = {
  trunkFatKg: 12.1,
  totalBodyFatKg: 21,
  weightKg: 78,
  dailyDeficitKcal: 450,
};

/** Linear InBody-style regional index from trunk segmental fat mass (100% = “normal” on device). */
export function trunkFatPctFromKg(trunkFatKg: number): number {
  const slope = 277.5 / REFERENCE_TRUNK_START_KG;
  return Math.round(trunkFatKg * slope * 10) / 10;
}

/** Interpolate reference trunk kg at fractional month in [0, 6]. */
export function referenceTrunkKgAtMonth(month: number): number {
  const m = Math.max(0, Math.min(6, month));
  if (m <= REF_TRUNK_KG_BY_MONTH[0][0]) {
    return REF_TRUNK_KG_BY_MONTH[0][1];
  }
  for (let i = 0; i < REF_TRUNK_KG_BY_MONTH.length - 1; i++) {
    const [m0, k0] = REF_TRUNK_KG_BY_MONTH[i];
    const [m1, k1] = REF_TRUNK_KG_BY_MONTH[i + 1];
    if (m >= m0 && m <= m1) {
      const t = m1 === m0 ? 0 : (m - m0) / (m1 - m0);
      return k0 + t * (k1 - k0);
    }
  }
  return REF_TRUNK_KG_BY_MONTH[REF_TRUNK_KG_BY_MONTH.length - 1][1];
}

/**
 * Project trunk fat (kg) at a given month: same absolute drop as the reference
 * curve from the plan (deficit + lifting), floored at {@link MIN_TRUNK_KG}.
 */
export function projectTrunkFatKg(inputs: BodyGoalsInputs, month: number): number {
  const m = Math.max(0, Math.min(6, month));
  const refLoss = REFERENCE_TRUNK_START_KG - referenceTrunkKgAtMonth(m);
  const projected = inputs.trunkFatKg - refLoss;
  return Math.max(MIN_TRUNK_KG, Math.round(projected * 10) / 10);
}

/** Total body fat (kg): ~9 kg absolute loss over 6 months at reference adherence. */
export function projectTotalBodyFatKg(inputs: BodyGoalsInputs, month: number): number {
  const m = Math.max(0, Math.min(6, month));
  const refStart = 21;
  const refEnd = 12;
  const loss = (refStart - refEnd) * (m / 6);
  const projected = inputs.totalBodyFatKg - loss * (inputs.totalBodyFatKg / refStart);
  return Math.max(8, Math.round(projected * 10) / 10);
}

/** Body weight (kg): ~6 kg loss over 6 months at reference curve. */
export function projectWeightKg(inputs: BodyGoalsInputs, month: number): number {
  const m = Math.max(0, Math.min(6, month));
  const refLoss = 6 * (m / 6);
  const projected = inputs.weightKg - refLoss * (inputs.weightKg / 78);
  return Math.max(62, Math.round(projected * 10) / 10);
}

export function bodyFatPctFromMass(totalFatKg: number, weightKg: number): number {
  if (weightKg <= 0) return 0;
  return Math.round((100 * totalFatKg) / weightKg * 10) / 10;
}

export type NowVsSixRow = {
  label: string;
  now: string;
  targetSixMo: string;
};

export type DeficitMath = {
  dailyDeficitKcal: number;
  monthlyKcal: number;
  kgFatPerMonthMid: number;
  kgFatPerMonthLow: number;
  kgFatPerMonthHigh: number;
  sixMonthFatLossKgMid: number;
  trunkShareOfSixMoLoss: string;
};

export type TrunkStageRow = {
  label: string;
  trunkKg: number;
  trunkPct: number;
  status: string;
};

export type FullProjection = {
  inputs: BodyGoalsInputs;
  nowVsSixMonths: NowVsSixRow[];
  deficitMath: DeficitMath;
  trunkStages: TrunkStageRow[];
  monthMarkers: readonly number[];
};

const MONTH_MARKERS = [0, 2, 3, 4, 5, 6] as const;

function buildDeficitMath(dailyDeficitKcal: number): DeficitMath {
  const monthlyKcal = dailyDeficitKcal * 30;
  const perMonth = monthlyKcal / KCAL_PER_KG_FAT;
  const low = Math.round((perMonth - 0.15) * 10) / 10;
  const mid = Math.round(perMonth * 10) / 10;
  const high = Math.round((perMonth + 0.15) * 10) / 10;
  const sixMid = Math.round(mid * 6 * 10) / 10;
  return {
    dailyDeficitKcal,
    monthlyKcal,
    kgFatPerMonthLow: low,
    kgFatPerMonthMid: mid,
    kgFatPerMonthHigh: high,
    sixMonthFatLossKgMid: sixMid,
    trunkShareOfSixMoLoss:
      "Roughly 5.5–6.5 kg of a ~9–10 kg six-month fat loss typically comes off the trunk first (deficit + compounds).",
  };
}

function trunkStageStatus(month: number, trunkPct: number): string {
  if (month === 0) return "Current";
  if (trunkPct <= 140) return "Near normal";
  if (trunkPct <= 155) return "Approaching normal";
  return "Over";
}

export function buildFullProjection(inputs: BodyGoalsInputs): FullProjection {
  const trunk0 = Math.max(MIN_TRUNK_KG, inputs.trunkFatKg);
  const trunk6 = projectTrunkFatKg(inputs, 6);

  const fat0 = inputs.totalBodyFatKg;
  const fat6 = projectTotalBodyFatKg(inputs, 6);

  const w0 = inputs.weightKg;
  const w6 = projectWeightKg(inputs, 6);

  const bf0 = bodyFatPctFromMass(fat0, w0);
  const bf6 = bodyFatPctFromMass(fat6, w6);

  const pct0 = trunkFatPctFromKg(trunk0);
  const pctLo = trunkFatPctFromKg(Math.max(MIN_TRUNK_KG, trunk6 - 0.5));
  const pctHi = trunkFatPctFromKg(trunk6 + 0.5);
  const pct6Range = `${Math.round(pctLo)}–${Math.round(pctHi)}`;

  const trunkLo = Math.max(MIN_TRUNK_KG, trunk6 - 0.5);
  const trunkHi = trunk6 + 0.5;

  const nowVsSixMonths: NowVsSixRow[] = [
    {
      label: "Trunk fat",
      now: `${trunk0} kg`,
      targetSixMo: `${trunkLo.toFixed(1)}–${trunkHi.toFixed(1)} kg`,
    },
    {
      label: "Trunk fat % (InBody-style)",
      now: `${pct0}%`,
      targetSixMo: `${pct6Range}% (near-normal band)`,
    },
    {
      label: "Total body fat",
      now: `~${fat0} kg`,
      targetSixMo: `~${(fat6 - 0.5).toFixed(1)}–${(fat6 + 1).toFixed(1)} kg`,
    },
    {
      label: "Body weight",
      now: `${w0} kg`,
      targetSixMo: `${(w6 - 1).toFixed(1)}–${(w6 + 1).toFixed(1)} kg`,
    },
    {
      label: "Body fat %",
      now: `~${bf0}%`,
      targetSixMo: `~${Math.floor(bf6)}–${Math.ceil(bf6 + 2)}%`,
    },
  ];

  const trunkStages: TrunkStageRow[] = MONTH_MARKERS.map((mo) => {
    const kg = projectTrunkFatKg(inputs, mo);
    const pct = trunkFatPctFromKg(kg);
    const label = mo === 0 ? "Now" : `Month ${mo}`;
    return {
      label,
      trunkKg: kg,
      trunkPct: pct,
      status: trunkStageStatus(mo, pct),
    };
  });

  return {
    inputs,
    nowVsSixMonths,
    deficitMath: buildDeficitMath(inputs.dailyDeficitKcal),
    trunkStages,
    monthMarkers: MONTH_MARKERS,
  };
}

export const GOALS_REQUIREMENTS = [
  "Diet tight 6 days out of 7 — one flex day is fine; more than that erases the deficit.",
  "20 min incline walk after every gym session (~700 kcal/week extra).",
  "8,000+ steps on rest / Wednesday — not optional for the walk-day burn.",
  "Sleep 7–8 hrs — cortisol from poor sleep favors trunk and visceral fat.",
] as const;

export const GOALS_BEYOND_SIX = [
  {
    title: "Month 9",
    body: "Trunk fat % can approach ~100–110% (InBody “normal” zone) if adherence stays high.",
  },
  {
    title: "Month 12",
    body: "Fully lean trunk, visible abs year-round, body fat often in the ~12–14% range for similar frames.",
  },
] as const;
