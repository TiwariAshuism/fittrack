import type {
  CoreFinisherBlock,
  CoreFinisherExercise,
  DayMealPlan,
  Exercise,
  WorkoutDay,
} from "@/types/fitness";

const defaultWarmUp = [
  "5 min light cardio (bike or walk)",
  "Arm circles & band pull-aparts",
  "Empty-bar or light warm-up sets",
];

const defaultCoolDown = [
  "5 min easy walk",
  "Chest + hip flexor stretches",
  "Deep breathing",
];

/** Appended on Mon / Tue / Thu / Fri gym days — lean-phase finisher. */
const inclineWalkFinisher =
  "Finish: 20 min incline treadmill walk — incline 8–10, speed 5–6 km/h (walk, not jog; ~150–200 kcal, minimal muscle stress).";

const gymCoolDown = [...defaultCoolDown, inclineWalkFinisher];

function w(
  partial: Omit<WorkoutDay, "warmUp" | "coolDown"> & {
    warmUp?: string[];
    coolDown?: string[];
  },
): WorkoutDay {
  return {
    warmUp: partial.warmUp ?? defaultWarmUp,
    coolDown: partial.coolDown ?? defaultCoolDown,
    ...partial,
  };
}

function ce(
  id: string,
  name: string,
  prescription: string,
  instructions: string,
  youtubeVideoId?: string,
): CoreFinisherExercise {
  return {
    id,
    name,
    prescription,
    instructions,
    muscleGroup: "core",
    ...(youtubeVideoId ? { youtubeVideoId } : {}),
  };
}

const coreA_Mon: CoreFinisherBlock = {
  label: "Core A — Anti-extension",
  rationale:
    "Push day loads chest and shoulders. Anti-extension work uses fresh patterns so you can hit planks and dead bugs with full intent.",
  exercises: [
    ce(
      "c-pl",
      "Plank",
      "3×45 sec",
      "Forearms under shoulders, ribs down, squeeze glutes. Breathe behind the brace.",
      "pSHjTRCQxIw",
    ),
    ce(
      "c-db",
      "Dead Bug",
      "3×10 per side",
      "Low back glued to the floor; reach opposite arm and leg long, pause, return with control.",
      "wpVDzNG8JY0",
    ),
    ce(
      "c-aw",
      "Ab Wheel or Hollow Body Hold",
      "3×30 sec",
      "Ab wheel: short range first, abs not lower back. Hollow: lower ribs down, legs slightly lifted.",
      "py0gxrzAqok",
    ),
  ],
};

const coreB_Tue: CoreFinisherBlock = {
  label: "Core B — Obliques / rotation",
  rationale:
    "Squats already demand midline stability. This block hits obliques and rotation — the love-handle line — while legs are done.",
  exercises: [
    ce(
      "c-bc",
      "Bicycle Crunches",
      "3×20 slow",
      "Slow elbows to knee; avoid yanking the neck — let ribs rotate.",
      "IwyvozK0oD8",
    ),
    ce(
      "c-rt",
      "Russian Twists",
      "3×15 per side",
      "Feet down or up for difficulty; rotate from mid-back, not just the arms.",
      "wkD66rBL1VE",
    ),
    ce(
      "c-sp",
      "Side Plank",
      "3×35 sec each side",
      "Elbow under shoulder, hips stacked; lift hips into one straight line.",
      "rCxF2nG9vQ0",
    ),
  ],
};

const coreA_Thu: CoreFinisherBlock = {
  label: "Core A — Anti-extension (pull pairing)",
  rationale:
    "Pull day builds the back; anti-extension core locks in that posture chain with face pulls + bird dogs over weeks.",
  exercises: [
    ce(
      "c-pst",
      "Plank with Shoulder Tap",
      "3×12 per side",
      "Minimize hip sway; tap opposite shoulder, reset hips level each rep.",
      "IAH-_A69_Mc",
    ),
    ce(
      "c-bd",
      "Bird Dog",
      "3×12 per side",
      "Neutral spine; extend hip and opposite shoulder, pause 1 sec, no rotation.",
      "biN8oIV1umA",
    ),
    ce(
      "c-awr",
      "Ab Wheel Rollout (or Plank)",
      "3×30 sec",
      "Roll only as far as you can keep ribs down; substitute hard plank if needed.",
      "py0gxrzAqok",
    ),
  ],
};

const coreB_Fri: CoreFinisherBlock = {
  label: "Core B — Obliques (hinge pairing)",
  rationale:
    "Hinges like the RDL wake the posterior chain and deep core. This block doubles down on obliques so every core angle gets hit twice this week.",
  exercises: [
    ce(
      "c-rt2",
      "Russian Twists",
      "3×20 per side (progress weekly)",
      "Add a light med ball or plate when 20 reps feels easy.",
      "wkD66rBL1VE",
    ),
    ce(
      "c-sphd",
      "Side Plank with Hip Dip",
      "3×12 per side",
      "Controlled dip of bottom hip toward floor, then drive back to stack.",
      "CMJA332bfs0",
    ),
    ce(
      "c-bc2",
      "Bicycle Crunches",
      "3×25 slow",
      "Longer set than Tuesday — keep tempo slow and exhale on the twist.",
      "IwyvozK0oD8",
    ),
  ],
};

const ex = (
  id: string,
  name: string,
  sets: number,
  reps: string,
  rest: string,
  youtubeVideoId: string,
  muscleGroup: Exercise["muscleGroup"],
  instructions: string,
): Exercise => ({
  id,
  name,
  sets,
  reps,
  rest,
  youtubeVideoId,
  muscleGroup,
  instructions,
});

export const upperPushDay: WorkoutDay = w({
  key: "upperPushDay",
  title: "Upper Push + Core A",
  subtitle:
    "Lean phase · 8–12 rep compounds · Core A — ~75 min incl. 20 min incline finisher",
  isRestDay: false,
  sessionKind: "gymWithCore",
  coolDown: gymCoolDown,
  coreFinisher: coreA_Mon,
  exercises: [
    ex("bp-1", "Barbell Bench Press", 4, "8–10", "90–120s", "vcBig73ojpE", "chest", "Retract scapula, touch chest, drive up in a slight arc."),
    ex("ohp-1", "Standing Overhead Press", 3, "8–10", "90–120s", "_RlRDWO2jfg", "shoulders", "Brace core, press straight up; clear chin then head through."),
    ex("id-1", "Incline Dumbbell Press", 3, "10–12", "90s", "8iPEnn-ltC8", "chest", "30–45° bench, control the stretch, no bouncing."),
    ex("lr-1", "Lateral Raises", 3, "12–15", "60s", "3VcKaWpzqHg", "shoulders", "Slight bend in elbows, lead with elbows not hands."),
    ex("pd-1", "Triceps Pushdown (Rope)", 3, "12–15", "60s", "2-LAMcpzODo", "arms", "Split rope at bottom, elbows pinned to sides."),
    ex("sk-1", "Skull Crushers (EZ)", 2, "10–12", "90s", "d_KZxkY_0cM", "arms", "Upper arms fixed; lower to forehead or behind head with control."),
  ],
});

export const lowerQuadDay: WorkoutDay = w({
  key: "lowerQuadDay",
  title: "Lower Quad + Core B",
  subtitle:
    "Lean phase · Squat 10–12 reps · Core B — ~75 min incl. 20 min incline finisher",
  isRestDay: false,
  sessionKind: "gymWithCore",
  coolDown: gymCoolDown,
  coreFinisher: coreB_Tue,
  exercises: [
    ex("sq-1", "Back Squat", 4, "10–12", "90–120s", "ultWZbUMPL8", "legs", "Depth you own, knees track toes, brace hard each rep."),
    ex("lp-1", "Leg Press", 3, "10–12", "90–120s", "IZxyjW7MPJQ", "legs", "Full ROM without rounding low back off pad."),
    ex("lk-1", "Walking Lunges", 3, "12 each", "90s", "wrwwXE_x-pQ", "legs", "Torso tall, slight forward tibia angle on front leg."),
  ],
});

export const upperPullDay: WorkoutDay = w({
  key: "upperPullDay",
  title: "Upper Pull + Core A",
  subtitle:
    "Lean phase · DL 6–8 · Pulldown 10–12 · Core A — ~75 min incl. incline finisher",
  isRestDay: false,
  sessionKind: "gymWithCore",
  coolDown: gymCoolDown,
  coreFinisher: coreA_Thu,
  exercises: [
    ex("dl-1", "Conventional Deadlift", 3, "6–8", "90–120s", "op9kVnSfh6k", "back", "Hinge pattern, lats on, bar close; reset each rep if needed."),
    ex("pr-1", "Weighted Pull-Up / Lat Pulldown", 4, "10–12", "90–120s", "eGo4IYlbE5g", "back", "Full stretch at top, drive elbows to pockets."),
    ex("br-1", "Chest-Supported Row", 3, "10–12", "90s", "roCP6wC-6pg", "back", "Pause briefly at peak contraction."),
    ex("fc-1", "Face Pull", 3, "15–20", "60s", "V3NAfMBTmvI", "shoulders", "Pull to face height, external rotate at end."),
    ex("cu-1", "Incline Dumbbell Curl", 3, "10–12", "60s", "soxrZlIl35U", "arms", "Keep elbows slightly forward of torso."),
    ex("hc-1", "Hammer Curl", 2, "12–15", "60s", "TwD-YGVP4Bk", "arms", "Neutral grip, no swinging."),
  ],
});

export const lowerHamstringDay: WorkoutDay = w({
  key: "lowerHamstringDay",
  title: "Lower Hamstring + Core B",
  subtitle:
    "Lean phase · RDL 8–10s · Core B — ~75 min incl. 20 min incline finisher",
  isRestDay: false,
  sessionKind: "gymWithCore",
  coolDown: gymCoolDown,
  coreFinisher: coreB_Fri,
  exercises: [
    ex("rdl-1", "Romanian Deadlift", 4, "8–10", "90–120s", "JCXUYuzwNrY", "legs", "Soft knees, push hips back, bar skims legs."),
    ex("lph-1", "Lying Leg Curl", 3, "10–12", "90s", "1Tq3QdYUuHs", "legs", "Control negative; hips pinned to pad."),
    ex("bg-1", "Barbell Hip Thrust", 3, "8–12", "90–120s", "xDmFkJxP8M0", "legs", "Chin tucked, ribs down, squeeze glutes hard at top."),
  ],
});

export const wednesdayActiveRecovery: WorkoutDay = w({
  key: "wednesdayActiveRecovery",
  title: "Recovery + Core C + Walk",
  subtitle: "Active recovery · Lower abs · Steps",
  isRestDay: false,
  sessionKind: "activeRecovery",
  warmUp: ["Easy 5 min walk", "Ankle + hip circles"],
  coolDown: [
    "10 min hip flexor + chest stretch (desk posture)",
    "Hydrate + hit protein target",
  ],
  exercises: [],
  activeRecovery: {
    rationale:
      "Mid-week from heavy lifting. Core C hits lower abs; 8–10k steps plus easy walking keeps you in the lean-recomp lane without beating up joints. Pair with ~1750–1800 kcal + 7–8 hr sleep.",
    walkTarget: "8,000–10,000 steps",
    sections: [
      {
        title: "Morning — Core C (~10 min)",
        moves: [
          ce("w-rc", "Reverse Crunches", "3×15", "Curl pelvis up with control; avoid momentum from the legs swinging.", "HYWJ0jVwzHo"),
          ce("w-lr", "Leg Raises", "3×12", "Press low back down; lift legs with abs, stop before back arches off floor.", "JB2oyawG9KI"),
          ce("w-mc", "Mountain Climbers", "3×20 per side", "Hands under shoulders; drive knee toward chest with a stacked trunk.", "nmwgirngXMA"),
          ce("w-db", "Dead Bug", "2×10 per side", "Same pattern as Mon/Tue finishers — low back stays imprinted throughout.", "wpVDzNG8JY0"),
        ],
      },
      {
        title: "Then",
        bullets: [
          "8,000–10,000 steps walk",
          "10 min hip flexor + chest stretch (desk posture fix)",
          "Foam roll — upper back, glutes, quads",
        ],
      },
    ],
  },
});

export const saturdayRest: WorkoutDay = w({
  key: "saturdayRest",
  title: "Full Rest or Light Walk",
  subtitle:
    "Optional 20–30 min easy walk · Foam roll · 7–8 hr sleep (hormones + cravings)",
  isRestDay: true,
  sessionKind: "fullRest",
  warmUp: ["Optional 20–30 min easy walk"],
  coolDown: ["Foam rolling only", "Sleep 7–8 hrs — this is when abs actually consolidate"],
  exercises: [],
});

export const sundayRest: WorkoutDay = w({
  key: "sundayRest",
  title: "Full Rest",
  subtitle: "Recovery · Meal prep · 7–8 hr sleep (non-negotiable for fat loss)",
  isRestDay: true,
  sessionKind: "fullRest",
  warmUp: ["Light stroll if you want fresh air"],
  coolDown: ["Prep meals for the week", "No core work — let the week's stimulus consolidate"],
  exercises: [],
});

export const WORKOUT_BY_WEEKDAY: Record<number, WorkoutDay> = {
  1: upperPushDay,
  2: lowerQuadDay,
  3: wednesdayActiveRecovery,
  4: upperPullDay,
  5: lowerHamstringDay,
  6: saturdayRest,
  7: sundayRest,
};

// ─── MEALS ────────────────────────────────────────────────────────────────────
// All 7 days are non-veg. Indian meals throughout.
// Structure: Morning whey shake → big lunch → snack/pre-gym → dinner
// Lean-phase targets (78 kg, recomp): ~1750–1850 kcal | P 120–130g | C 160–175g | F 45–55g

const sumMeals = (meals: DayMealPlan["meals"]) => {
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFat = 0;
  let totalCalories = 0;
  for (const m of meals) {
    totalProtein += m.protein;
    totalCarbs += m.carbs;
    totalFat += m.fat;
    totalCalories += m.calories;
  }
  return { totalProtein, totalCarbs, totalFat, totalCalories };
};

function mealPlan(
  base: Omit<DayMealPlan, "totalProtein" | "totalCarbs" | "totalFat" | "totalCalories">,
): DayMealPlan {
  const t = sumMeals(base.meals);
  return { ...base, ...t };
}

// ─── MONDAY (Gym — Upper Push) ────────────────────────────────────────────────
const mondayMeals: DayMealPlan = mealPlan({
  key: "monday",
  label: "Monday — Upper Push Fuel (~1800 kcal)",
  isVegetarian: false,
  meals: [
    {
      time: "08:00",
      name: "Whey + Oats Shake",
      description:
        "1 scoop whey in 200ml milk, 35g oats, 1 small banana — lean-phase portions.",
      protein: 34,
      carbs: 46,
      fat: 8,
      calories: 385,
      emoji: "🥤",
    },
    {
      time: "13:00",
      name: "Chicken Breast + Rice + Dal",
      description:
        "140g chicken breast, ~1.25 cup basmati rice, 1 cup toor dal, kachumber — carbs dialled for 160–175g band.",
      protein: 44,
      carbs: 56,
      fat: 10,
      calories: 530,
      emoji: "🍗",
    },
    {
      time: "18:00",
      name: "Pre-Workout Whey + Dates",
      description: "1 scoop whey in water, 4 medjool dates. 30 min before gym.",
      protein: 24,
      carbs: 30,
      fat: 2,
      calories: 230,
      emoji: "💪",
    },
    {
      time: "21:00",
      name: "Egg Bhurji + Roti",
      description:
        "3 whole + 1 white egg bhurji, 2 roti, sabzi cooked with ~1 tsp ghee — fats in the 45–55g target band.",
      protein: 25,
      carbs: 40,
      fat: 30,
      calories: 655,
      emoji: "🍳",
    },
  ],
});

// ─── TUESDAY (Gym — Lower Quad) ───────────────────────────────────────────────
const tuesdayMeals: DayMealPlan = mealPlan({
  key: "tuesday",
  label: "Tuesday — Lower Quad Fuel (~1800 kcal)",
  isVegetarian: false,
  meals: [
    {
      time: "08:00",
      name: "Whey + Oats + Banana",
      description: "1 scoop whey, 35g oats, 1 small banana, 200ml milk.",
      protein: 34,
      carbs: 45,
      fat: 8,
      calories: 380,
      emoji: "🥤",
    },
    {
      time: "13:00",
      name: "Mutton Keema + Rice",
      description:
        "135g lean keema, ~1.25 cup rice, masala, raita 100g — protein without overshooting 130g.",
      protein: 42,
      carbs: 54,
      fat: 14,
      calories: 555,
      emoji: "🍖",
    },
    {
      time: "18:00",
      name: "Pre-Workout Whey + Apple",
      description: "1 scoop whey in water, 1 medium apple. 30 min before squats.",
      protein: 24,
      carbs: 30,
      fat: 2,
      calories: 230,
      emoji: "💪",
    },
    {
      time: "21:00",
      name: "Chicken Curry + 2 Roti",
      description:
        "140g chicken curry, 2 roti, sabzi with ~1 tsp ghee — pulls fats into the 45–55g band.",
      protein: 27,
      carbs: 36,
      fat: 30,
      calories: 655,
      emoji: "🍛",
    },
  ],
});

// ─── WEDNESDAY (Recovery + Core C) ───────────────────────────────────────────
const wednesdayMeals: DayMealPlan = mealPlan({
  key: "wednesday",
  label: "Wednesday — Recovery Day (~1760 kcal)",
  isVegetarian: false,
  meals: [
    {
      time: "08:00",
      name: "Whey + Oats (lighter)",
      description: "1 scoop whey, 200ml milk, 32g oats, 1 small banana — walk day, not a gym surplus.",
      protein: 34,
      carbs: 48,
      fat: 8,
      calories: 450,
      emoji: "🥤",
    },
    {
      time: "13:00",
      name: "Grilled Fish + Brown Rice + Dal",
      description:
        "150g grilled fish, 1 cup brown rice, 1 cup masoor dal, salad — steady carbs for steps + core.",
      protein: 42,
      carbs: 64,
      fat: 10,
      calories: 560,
      emoji: "🐟",
    },
    {
      time: "17:00",
      name: "Whey in Water + Almonds",
      description: "1 scoop whey, 8 almonds.",
      protein: 25,
      carbs: 6,
      fat: 8,
      calories: 210,
      emoji: "🥤",
    },
    {
      time: "20:30",
      name: "Egg Omelette + Roti + Sabzi",
      description:
        "3 whole eggs, 2 roti, sabzi with ~1 tsp oil — keeps fats in band without gym-day extras.",
      protein: 24,
      carbs: 40,
      fat: 22,
      calories: 565,
      emoji: "🍳",
    },
  ],
});

// ─── THURSDAY (Gym — Upper Pull) ──────────────────────────────────────────────
const thursdayMeals: DayMealPlan = mealPlan({
  key: "thursday",
  label: "Thursday — Upper Pull Fuel (~1800 kcal)",
  isVegetarian: false,
  meals: [
    {
      time: "08:00",
      name: "Whey + Oats + Banana",
      description: "1 scoop whey, 35g oats, 1 small banana, 200ml milk.",
      protein: 34,
      carbs: 46,
      fat: 8,
      calories: 385,
      emoji: "🥤",
    },
    {
      time: "13:00",
      name: "Chicken Breast + Roti + Dal",
      description:
        "140g grilled chicken, 2 roti, 1 cup chana dal, salad, dahi 100g — mirrors Monday carb control.",
      protein: 44,
      carbs: 56,
      fat: 10,
      calories: 530,
      emoji: "🍗",
    },
    {
      time: "18:00",
      name: "Pre-Workout Whey + Dates",
      description: "1 scoop whey, 4 dates before deadlifts + rows.",
      protein: 24,
      carbs: 30,
      fat: 2,
      calories: 230,
      emoji: "💪",
    },
    {
      time: "21:00",
      name: "Egg Bhurji + Rice",
      description:
        "3 whole + 1 white bhurji, ~1 cup rice, sabzi with ~1 tsp ghee — post-hinge recovery meal.",
      protein: 25,
      carbs: 40,
      fat: 30,
      calories: 655,
      emoji: "🍳",
    },
  ],
});

// ─── FRIDAY (Gym — Lower Hamstring) ──────────────────────────────────────────
const fridayMeals: DayMealPlan = mealPlan({
  key: "friday",
  label: "Friday — Lower Hamstring Fuel (~1800 kcal)",
  isVegetarian: false,
  meals: [
    {
      time: "08:00",
      name: "Whey + Oats + Banana",
      description: "1 scoop whey, 35g oats, 1 small banana, 200ml milk.",
      protein: 34,
      carbs: 45,
      fat: 8,
      calories: 380,
      emoji: "🥤",
    },
    {
      time: "13:00",
      name: "Mutton/Chicken + Rice + Dal",
      description:
        "135g mutton or chicken, ~1.25 cup rice, 1 cup dal, raita — hinge day without a huge surplus.",
      protein: 42,
      carbs: 54,
      fat: 14,
      calories: 555,
      emoji: "🍖",
    },
    {
      time: "18:00",
      name: "Pre-Workout Whey + Banana",
      description: "1 scoop whey, 1 medium banana before RDL + hip thrust.",
      protein: 24,
      carbs: 30,
      fat: 2,
      calories: 230,
      emoji: "💪",
    },
    {
      time: "21:00",
      name: "Chicken Tikka + Roti",
      description:
        "140g tikka, 2 roti, chutney, salad + ~1 tsp ghee in sabzi — same fat strategy as Tuesday curry night.",
      protein: 27,
      carbs: 36,
      fat: 30,
      calories: 655,
      emoji: "🍗",
    },
  ],
});

// ─── SATURDAY (Rest) ──────────────────────────────────────────────────────────
const saturdayMeals: DayMealPlan = mealPlan({
  key: "saturday",
  label: "Saturday — Rest Day (~1785 kcal)",
  isVegetarian: false,
  meals: [
    {
      time: "09:00",
      name: "Whey + Oats (relaxed)",
      description: "1 scoop whey, 35g oats, 1 small banana, 200ml milk.",
      protein: 34,
      carbs: 48,
      fat: 8,
      calories: 445,
      emoji: "🥤",
    },
    {
      time: "13:30",
      name: "Fish Curry + Rice",
      description:
        "150g fish curry, ~1.25 cup rice, dal, salad — weekend rest, still inside macro rails.",
      protein: 40,
      carbs: 64,
      fat: 11,
      calories: 555,
      emoji: "🐟",
    },
    {
      time: "17:00",
      name: "Whey in Water + Walnuts",
      description: "1 scoop whey, 6 walnuts.",
      protein: 25,
      carbs: 5,
      fat: 8,
      calories: 205,
      emoji: "🥤",
    },
    {
      time: "20:30",
      name: "Egg Curry + 2 Roti",
      description:
        "2 whole eggs in light curry, 2 roti, sabzi — extra roti vs weekday dinner for satiety on rest day.",
      protein: 24,
      carbs: 48,
      fat: 20,
      calories: 580,
      emoji: "🍳",
    },
  ],
});

// ─── SUNDAY (Rest) ────────────────────────────────────────────────────────────
const sundayMeals: DayMealPlan = mealPlan({
  key: "sunday",
  label: "Sunday — Full Rest (~1785 kcal)",
  isVegetarian: false,
  meals: [
    {
      time: "09:30",
      name: "Whey + Oats + Banana",
      description: "1 scoop whey, 35g oats, 1 small banana, 200ml milk.",
      protein: 34,
      carbs: 48,
      fat: 8,
      calories: 445,
      emoji: "🥤",
    },
    {
      time: "13:30",
      name: "Chicken Rice Bowl",
      description:
        "140g chicken, ~1.25 cup rice, dal, raita, salad — meal prep friendly, same targets as Saturday.",
      protein: 40,
      carbs: 64,
      fat: 10,
      calories: 555,
      emoji: "🍗",
    },
    {
      time: "16:30",
      name: "Whey in Water + Almonds",
      description: "1 scoop whey, 8 almonds.",
      protein: 25,
      carbs: 6,
      fat: 8,
      calories: 210,
      emoji: "🥤",
    },
    {
      time: "20:00",
      name: "Omelette + Roti + Dal",
      description: "3 whole egg omelette, 2 roti, 1 cup dal, ~1 tsp oil in cooking.",
      protein: 24,
      carbs: 48,
      fat: 22,
      calories: 565,
      emoji: "🍳",
    },
  ],
});

export const MEAL_BY_WEEKDAY: Record<number, DayMealPlan> = {
  1: mondayMeals,
  2: tuesdayMeals,
  3: wednesdayMeals,
  4: thursdayMeals,
  5: fridayMeals,
  6: saturdayMeals,
  7: sundayMeals,
};