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
  subtitle: "Chest · Shoulders · Triceps · Anti-extension core",
  isRestDay: false,
  sessionKind: "gymWithCore",
  coreFinisher: coreA_Mon,
  exercises: [
    ex("bp-1", "Barbell Bench Press", 4, "6–8", "2–3 min", "vcBig73ojpE", "chest", "Retract scapula, touch chest, drive up in a slight arc."),
    ex("ohp-1", "Standing Overhead Press", 3, "8–10", "2 min", "_RlRDWO2jfg", "shoulders", "Brace core, press straight up; clear chin then head through."),
    ex("id-1", "Incline Dumbbell Press", 3, "10–12", "90s", "8iPEnn-ltC8", "chest", "30–45° bench, control the stretch, no bouncing."),
    ex("lr-1", "Lateral Raises", 3, "12–15", "60s", "3VcKaWpzqHg", "shoulders", "Slight bend in elbows, lead with elbows not hands."),
    ex("pd-1", "Triceps Pushdown (Rope)", 3, "12–15", "60s", "2-LAMcpzODo", "arms", "Split rope at bottom, elbows pinned to sides."),
    ex("sk-1", "Skull Crushers (EZ)", 2, "10–12", "90s", "d_KZxkY_0cM", "arms", "Upper arms fixed; lower to forehead or behind head with control."),
  ],
});

export const lowerQuadDay: WorkoutDay = w({
  key: "lowerQuadDay",
  title: "Lower Quad + Core B",
  subtitle: "Squats · Leg press · Lunges · Oblique core (finishers)",
  isRestDay: false,
  sessionKind: "gymWithCore",
  coreFinisher: coreB_Tue,
  exercises: [
    ex("sq-1", "Back Squat", 4, "6–8", "3 min", "ultWZbUMPL8", "legs", "Depth you own, knees track toes, brace hard each rep."),
    ex("lp-1", "Leg Press", 3, "10–12", "2 min", "IZxyjW7MPJQ", "legs", "Full ROM without rounding low back off pad."),
    ex("lk-1", "Walking Lunges", 3, "12 each", "90s", "wrwwXE_x-pQ", "legs", "Torso tall, slight forward tibia angle on front leg."),
  ],
});

export const upperPullDay: WorkoutDay = w({
  key: "upperPullDay",
  title: "Upper Pull + Core A",
  subtitle: "Back · Biceps · Rear delts · Anti-extension core",
  isRestDay: false,
  sessionKind: "gymWithCore",
  coreFinisher: coreA_Thu,
  exercises: [
    ex("dl-1", "Conventional Deadlift", 3, "5–6", "3 min", "op9kVnSfh6k", "back", "Hinge pattern, lats on, bar close; reset each rep if needed."),
    ex("pr-1", "Weighted Pull-Up / Lat Pulldown", 4, "6–10", "2 min", "eGo4IYlbE5g", "back", "Full stretch at top, drive elbows to pockets."),
    ex("br-1", "Chest-Supported Row", 3, "10–12", "90s", "roCP6wC-6pg", "back", "Pause briefly at peak contraction."),
    ex("fc-1", "Face Pull", 3, "15–20", "60s", "V3NAfMBTmvI", "shoulders", "Pull to face height, external rotate at end."),
    ex("cu-1", "Incline Dumbbell Curl", 3, "10–12", "60s", "soxrZlIl35U", "arms", "Keep elbows slightly forward of torso."),
    ex("hc-1", "Hammer Curl", 2, "12–15", "60s", "TwD-YGVP4Bk", "arms", "Neutral grip, no swinging."),
  ],
});

export const lowerHamstringDay: WorkoutDay = w({
  key: "lowerHamstringDay",
  title: "Lower Hamstring + Core B",
  subtitle: "RDL · Hip thrust · Leg curl · Oblique core (finishers)",
  isRestDay: false,
  sessionKind: "gymWithCore",
  coreFinisher: coreB_Fri,
  exercises: [
    ex("rdl-1", "Romanian Deadlift", 4, "8–10", "2–3 min", "JCXUYuzwNrY", "legs", "Soft knees, push hips back, bar skims legs."),
    ex("lph-1", "Lying Leg Curl", 3, "10–12", "90s", "1Tq3QdYUuHs", "legs", "Control negative; hips pinned to pad."),
    ex("bg-1", "Barbell Hip Thrust", 3, "8–12", "2 min", "xDmFkJxP8M0", "legs", "Chin tucked, ribs down, squeeze glutes hard at top."),
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
      "Your weekday off from the gym. Core C targets lower abs (hardest to hit). The walk adds ~300–400 kcal toward trunk-fat goals while joints recover.",
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
  subtitle: "Optional 20–30 min walk · Foam roll only · Sleep 7–8 hrs",
  isRestDay: true,
  sessionKind: "fullRest",
  warmUp: ["Optional 20–30 min easy walk"],
  coolDown: ["Foam rolling only", "Sleep 7–8 hrs — this is when abs actually consolidate"],
  exercises: [],
});

export const sundayRest: WorkoutDay = w({
  key: "sundayRest",
  title: "Full Rest",
  subtitle: "Complete recovery · Meal prep · 8 hr sleep target",
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
// Structure: Morning whey shake → big lunch → evening snack/shake → post-workout dinner
// Protein target: 125–130g/day | Calories: ~1700–1800 kcal

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
  label: "Monday — Upper Push Fuel",
  isVegetarian: false,
  meals: [
    {
      time: "08:00",
      name: "Whey + Oats Shake",
      description: "1 scoop whey in 200ml milk, 40g oats blended in, 1 banana. Thick and filling.",
      protein: 38,
      carbs: 58,
      fat: 8,
      calories: 460,
      emoji: "🥤",
    },
    {
      time: "13:00",
      name: "Chicken Breast + Rice + Dal",
      description: "150g grilled/boiled chicken breast, 1.5 cup basmati rice, 1 cup toor dal, kachumber salad.",
      protein: 48,
      carbs: 72,
      fat: 8,
      calories: 560,
      emoji: "🍗",
    },
    {
      time: "18:00",
      name: "Pre-Workout Whey + Dates",
      description: "1 scoop whey in water, 5 medjool dates for fast carbs. 30 min before gym.",
      protein: 25,
      carbs: 32,
      fat: 2,
      calories: 244,
      emoji: "💪",
    },
    {
      time: "21:00",
      name: "Egg Bhurji + Roti",
      description: "4 eggs (2 whole + 2 whites) bhurji with onion, tomato, green chilli, 2 whole wheat roti, sabzi.",
      protein: 28,
      carbs: 36,
      fat: 12,
      calories: 360,
      emoji: "🍳",
    },
  ],
});

// ─── TUESDAY (Gym — Lower Quad) ───────────────────────────────────────────────
const tuesdayMeals: DayMealPlan = mealPlan({
  key: "tuesday",
  label: "Tuesday — Lower Quad Fuel",
  isVegetarian: false,
  meals: [
    {
      time: "08:00",
      name: "Whey + Oats + Banana",
      description: "1 scoop whey, 40g rolled oats, 1 banana, 200ml milk — blended or stirred.",
      protein: 38,
      carbs: 58,
      fat: 8,
      calories: 460,
      emoji: "🥤",
    },
    {
      time: "13:00",
      name: "Mutton Keema + Rice",
      description: "150g lean mutton keema, 1.5 cup rice, onion-tomato masala, raita 100g, salad.",
      protein: 46,
      carbs: 70,
      fat: 14,
      calories: 590,
      emoji: "🍖",
    },
    {
      time: "18:00",
      name: "Pre-Workout Whey + Apple",
      description: "1 scoop whey in water, 1 apple. 30 min before squats.",
      protein: 25,
      carbs: 25,
      fat: 2,
      calories: 218,
      emoji: "💪",
    },
    {
      time: "21:00",
      name: "Chicken Curry + 2 Roti",
      description: "150g chicken curry (home-style, light oil), 2 whole wheat roti, cucumber salad.",
      protein: 38,
      carbs: 38,
      fat: 12,
      calories: 420,
      emoji: "🍛",
    },
  ],
});

// ─── WEDNESDAY (Recovery + Core C) ───────────────────────────────────────────
const wednesdayMeals: DayMealPlan = mealPlan({
  key: "wednesday",
  label: "Wednesday — Recovery Day",
  isVegetarian: false,
  meals: [
    {
      time: "08:00",
      name: "Whey + Oats (lighter)",
      description: "1 scoop whey in 200ml milk, 30g oats, 1 small banana. Rest day so slightly smaller.",
      protein: 35,
      carbs: 48,
      fat: 7,
      calories: 395,
      emoji: "🥤",
    },
    {
      time: "13:00",
      name: "Grilled Fish + Brown Rice + Dal",
      description: "150g rohu/surmai grilled with minimal oil, 1 cup brown rice, 1 cup masoor dal, salad.",
      protein: 46,
      carbs: 58,
      fat: 8,
      calories: 490,
      emoji: "🐟",
    },
    {
      time: "17:00",
      name: "Whey in Water + Almonds",
      description: "1 scoop whey in plain water, 10 almonds. Rest day snack — no pre-workout needed.",
      protein: 26,
      carbs: 6,
      fat: 8,
      calories: 196,
      emoji: "🥤",
    },
    {
      time: "20:30",
      name: "Egg Omelette + Roti + Sabzi",
      description: "3 whole egg omelette with onion, tomato, 2 whole wheat roti, any seasonal sabzi.",
      protein: 24,
      carbs: 34,
      fat: 14,
      calories: 350,
      emoji: "🍳",
    },
  ],
});

// ─── THURSDAY (Gym — Upper Pull) ──────────────────────────────────────────────
const thursdayMeals: DayMealPlan = mealPlan({
  key: "thursday",
  label: "Thursday — Upper Pull Fuel",
  isVegetarian: false,
  meals: [
    {
      time: "08:00",
      name: "Whey + Oats + Banana",
      description: "1 scoop whey, 40g oats, 1 banana, 200ml milk. Same reliable morning shake.",
      protein: 38,
      carbs: 58,
      fat: 8,
      calories: 460,
      emoji: "🥤",
    },
    {
      time: "13:00",
      name: "Chicken Breast + Roti + Dal",
      description: "150g grilled chicken, 2 whole wheat roti, 1 cup chana dal, onion salad, dahi 100g.",
      protein: 50,
      carbs: 62,
      fat: 10,
      calories: 540,
      emoji: "🍗",
    },
    {
      time: "18:00",
      name: "Pre-Workout Whey + Dates",
      description: "1 scoop whey in water, 5 dates. Deadlift day needs good fuel.",
      protein: 25,
      carbs: 32,
      fat: 2,
      calories: 244,
      emoji: "💪",
    },
    {
      time: "21:00",
      name: "Egg Bhurji + Rice",
      description: "4 eggs (2 whole + 2 whites) bhurji, 1 cup rice, simple sabzi or dal.",
      protein: 28,
      carbs: 42,
      fat: 12,
      calories: 380,
      emoji: "🍳",
    },
  ],
});

// ─── FRIDAY (Gym — Lower Hamstring) ──────────────────────────────────────────
const fridayMeals: DayMealPlan = mealPlan({
  key: "friday",
  label: "Friday — Lower Hamstring Fuel",
  isVegetarian: false,
  meals: [
    {
      time: "08:00",
      name: "Whey + Oats + Banana",
      description: "1 scoop whey, 40g oats, 1 banana, 200ml milk. Biggest gym day of the week.",
      protein: 38,
      carbs: 58,
      fat: 8,
      calories: 460,
      emoji: "🥤",
    },
    {
      time: "13:00",
      name: "Mutton/Chicken + Rice + Dal",
      description: "150g mutton curry or chicken, 1.5 cup rice, 1 cup dal, raita, salad. Friday — eat well.",
      protein: 48,
      carbs: 72,
      fat: 14,
      calories: 590,
      emoji: "🍖",
    },
    {
      time: "18:00",
      name: "Pre-Workout Whey + Banana",
      description: "1 scoop whey in water, 1 banana. RDL + Hip Thrust needs good carb fuel.",
      protein: 25,
      carbs: 27,
      fat: 2,
      calories: 228,
      emoji: "💪",
    },
    {
      time: "21:00",
      name: "Chicken Tikka + Roti",
      description: "150g home-style chicken tikka (oven or tawa), 2 whole wheat roti, green chutney, salad.",
      protein: 40,
      carbs: 34,
      fat: 10,
      calories: 380,
      emoji: "🍗",
    },
  ],
});

// ─── SATURDAY (Rest) ──────────────────────────────────────────────────────────
const saturdayMeals: DayMealPlan = mealPlan({
  key: "saturday",
  label: "Saturday — Rest Day",
  isVegetarian: false,
  meals: [
    {
      time: "09:00",
      name: "Whey + Oats (relaxed)",
      description: "1 scoop whey, 40g oats, 1 banana, 200ml milk. Weekend — eat at your own pace.",
      protein: 38,
      carbs: 58,
      fat: 8,
      calories: 460,
      emoji: "🥤",
    },
    {
      time: "13:30",
      name: "Fish Curry + Rice",
      description: "150g rohu/pomfret light curry, 1.5 cup basmati rice, dal, kachumber salad.",
      protein: 44,
      carbs: 68,
      fat: 10,
      calories: 540,
      emoji: "🐟",
    },
    {
      time: "17:00",
      name: "Whey in Water + Walnuts",
      description: "1 scoop whey in water, 8 walnuts. Light rest day snack.",
      protein: 26,
      carbs: 4,
      fat: 10,
      calories: 206,
      emoji: "🥤",
    },
    {
      time: "20:30",
      name: "Egg Curry + 2 Roti",
      description: "2 whole eggs in light onion-tomato curry, 2 whole wheat roti, sabzi.",
      protein: 22,
      carbs: 36,
      fat: 14,
      calories: 350,
      emoji: "🍳",
    },
  ],
});

// ─── SUNDAY (Rest) ────────────────────────────────────────────────────────────
const sundayMeals: DayMealPlan = mealPlan({
  key: "sunday",
  label: "Sunday — Full Rest",
  isVegetarian: false,
  meals: [
    {
      time: "09:30",
      name: "Whey + Oats + Banana",
      description: "1 scoop whey, 40g oats, 1 banana, 200ml milk. Even on Sunday — hit your protein.",
      protein: 38,
      carbs: 58,
      fat: 8,
      calories: 460,
      emoji: "🥤",
    },
    {
      time: "13:30",
      name: "Chicken Rice Bowl",
      description: "150g chicken (any style — curry, grilled, bhuna), 1.5 cup rice, dal, raita, salad.",
      protein: 46,
      carbs: 68,
      fat: 10,
      calories: 542,
      emoji: "🍗",
    },
    {
      time: "16:30",
      name: "Whey in Water + Almonds",
      description: "1 scoop whey in water, 10 almonds. Keep protein topped up on rest days too.",
      protein: 26,
      carbs: 5,
      fat: 8,
      calories: 196,
      emoji: "🥤",
    },
    {
      time: "20:00",
      name: "Omelette + Roti + Dal",
      description: "3 whole egg masala omelette, 2 whole wheat roti, 1 cup dal. Light Sunday dinner.",
      protein: 28,
      carbs: 38,
      fat: 14,
      calories: 378,
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