import type {
  CoreFinisherBlock,
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

const coreA_Mon: CoreFinisherBlock = {
  label: "Core A — Anti-extension",
  rationale:
    "Push day loads chest and shoulders. Anti-extension work uses fresh patterns so you can hit planks and dead bugs with full intent.",
  exercises: [
    { id: "c-pl", name: "Plank", prescription: "3×45 sec" },
    { id: "c-db", name: "Dead Bug", prescription: "3×10 per side" },
    {
      id: "c-aw",
      name: "Ab Wheel or Hollow Body Hold",
      prescription: "3×30 sec",
    },
  ],
};

const coreB_Tue: CoreFinisherBlock = {
  label: "Core B — Obliques / rotation",
  rationale:
    "Squats already demand midline stability. This block hits obliques and rotation — the love-handle line — while legs are done.",
  exercises: [
    { id: "c-bc", name: "Bicycle Crunches", prescription: "3×20 slow" },
    { id: "c-rt", name: "Russian Twists", prescription: "3×15 per side" },
    { id: "c-sp", name: "Side Plank", prescription: "3×35 sec each side" },
  ],
};

const coreA_Thu: CoreFinisherBlock = {
  label: "Core A — Anti-extension (pull pairing)",
  rationale:
    "Pull day builds the back; anti-extension core locks in that posture chain with face pulls + bird dogs over weeks.",
  exercises: [
    {
      id: "c-pst",
      name: "Plank with Shoulder Tap",
      prescription: "3×12 per side",
    },
    { id: "c-bd", name: "Bird Dog", prescription: "3×12 per side" },
    {
      id: "c-awr",
      name: "Ab Wheel Rollout (or Plank)",
      prescription: "3×30 sec",
    },
  ],
};

const coreB_Fri: CoreFinisherBlock = {
  label: "Core B — Obliques (hinge pairing)",
  rationale:
    "Hinges like the RDL wake the posterior chain and deep core. This block doubles down on obliques so every core angle gets hit twice this week.",
  exercises: [
    {
      id: "c-rt2",
      name: "Russian Twists",
      prescription: "3×20 per side (progress weekly)",
    },
    {
      id: "c-sphd",
      name: "Side Plank with Hip Dip",
      prescription: "3×12 per side",
    },
    { id: "c-bc2", name: "Bicycle Crunches", prescription: "3×25 slow" },
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
    ex(
      "bp-1",
      "Barbell Bench Press",
      4,
      "6–8",
      "2–3 min",
      "rT7DgMMlOYE",
      "chest",
      "Retract scapula, touch chest, drive up in a slight arc.",
    ),
    ex(
      "ohp-1",
      "Standing Overhead Press",
      3,
      "8–10",
      "2 min",
      "2yjwsvQQoEo",
      "shoulders",
      "Brace core, press straight up; clear chin then head through.",
    ),
    ex(
      "id-1",
      "Incline Dumbbell Press",
      3,
      "10–12",
      "90s",
      "8iPEnn-ltC8",
      "chest",
      "30–45° bench, control the stretch, no bouncing.",
    ),
    ex(
      "lr-1",
      "Lateral Raises",
      3,
      "12–15",
      "60s",
      "3VcKaWpzqHg",
      "shoulders",
      "Slight bend in elbows, lead with elbows not hands.",
    ),
    ex(
      "pd-1",
      "Triceps Pushdown (Rope)",
      3,
      "12–15",
      "60s",
      "2-LAMcpzODo",
      "arms",
      "Split rope at bottom, elbows pinned to sides.",
    ),
    ex(
      "sk-1",
      "Skull Crushers (EZ)",
      2,
      "10–12",
      "90s",
      "d_KZxkY_0cM",
      "arms",
      "Upper arms fixed; lower to forehead or behind head with control.",
    ),
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
    ex(
      "sq-1",
      "Back Squat",
      4,
      "6–8",
      "3 min",
      "ultWZbUMPL8",
      "legs",
      "Depth you own, knees track toes, brace hard each rep.",
    ),
    ex(
      "lp-1",
      "Leg Press",
      3,
      "10–12",
      "2 min",
      "IZxyjW7MPJQ",
      "legs",
      "Full ROM without rounding low back off pad.",
    ),
    ex(
      "lk-1",
      "Walking Lunges",
      3,
      "12 each",
      "90s",
      "wrwwXE_x-pQ",
      "legs",
      "Torso tall, slight forward tibia angle on front leg.",
    ),
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
    ex(
      "dl-1",
      "Conventional Deadlift",
      3,
      "5–6",
      "3 min",
      "op9kVnSfh6k",
      "back",
      "Hinge pattern, lats on, bar close; reset each rep if needed.",
    ),
    ex(
      "pr-1",
      "Weighted Pull-Up / Lat Pulldown",
      4,
      "6–10",
      "2 min",
      "eGo4IYlbE5g",
      "back",
      "Full stretch at top, drive elbows to pockets.",
    ),
    ex(
      "br-1",
      "Chest-Supported Row",
      3,
      "10–12",
      "90s",
      "roCP6wC-6pg",
      "back",
      "Pause briefly at peak contraction.",
    ),
    ex(
      "fc-1",
      "Face Pull",
      3,
      "15–20",
      "60s",
      "V3NAfMBTmvI",
      "shoulders",
      "Pull to face height, external rotate at end.",
    ),
    ex(
      "cu-1",
      "Incline Dumbbell Curl",
      3,
      "10–12",
      "60s",
      "soxrZlIl35U",
      "arms",
      "Keep elbows slightly forward of torso.",
    ),
    ex(
      "hc-1",
      "Hammer Curl",
      2,
      "12–15",
      "60s",
      "TwD-YGVP4Bk",
      "arms",
      "Neutral grip, no swinging.",
    ),
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
    ex(
      "rdl-1",
      "Romanian Deadlift",
      4,
      "8–10",
      "2–3 min",
      "JCXUYuzwNrY",
      "legs",
      "Soft knees, push hips back, bar skims legs.",
    ),
    ex(
      "lph-1",
      "Lying Leg Curl",
      3,
      "10–12",
      "90s",
      "1Tq3QdYUuHs",
      "legs",
      "Control negative; hips pinned to pad.",
    ),
    ex(
      "bg-1",
      "Barbell Hip Thrust",
      3,
      "8–12",
      "2 min",
      "xDmFkJxP8M0",
      "legs",
      "Chin tucked, ribs down, squeeze glutes hard at top.",
    ),
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
        items: [
          "Reverse Crunches — 3×15",
          "Leg Raises — 3×12",
          "Mountain Climbers — 3×20 per side",
          "Dead Bug — 2×10 per side",
        ],
      },
      {
        title: "Then",
        items: [
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
  coolDown: [
    "Foam rolling only",
    "Sleep 7–8 hrs — this is when abs actually consolidate",
  ],
  exercises: [],
});

export const sundayRest: WorkoutDay = w({
  key: "sundayRest",
  title: "Full Rest",
  subtitle: "Complete recovery · Meal prep · 8 hr sleep target",
  isRestDay: true,
  sessionKind: "fullRest",
  warmUp: ["Light stroll if you want fresh air"],
  coolDown: [
    "Prep meals for the week",
    "No core work — let the week’s stimulus consolidate",
  ],
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

const mondayMeals: DayMealPlan = mealPlan({
  key: "monday",
  label: "Monday Fuel",
  isVegetarian: false,
  meals: [
    {
      time: "07:30",
      name: "Pre-workout oats",
      description: "Rolled oats, banana, peanut butter, cinnamon.",
      protein: 18,
      carbs: 62,
      fat: 14,
      calories: 420,
      emoji: "🥣",
    },
    {
      time: "11:30",
      name: "Chicken rice bowl",
      description: "Grilled chicken, jasmine rice, broccoli, olive oil.",
      protein: 48,
      carbs: 55,
      fat: 18,
      calories: 560,
      emoji: "🍚",
    },
    {
      time: "16:00",
      name: "Greek yogurt parfait",
      description: "Yogurt, berries, honey, granola.",
      protein: 28,
      carbs: 38,
      fat: 8,
      calories: 320,
      emoji: "🫐",
    },
    {
      time: "20:00",
      name: "Salmon + potatoes",
      description: "Baked salmon, roasted potatoes, salad.",
      protein: 42,
      carbs: 40,
      fat: 22,
      calories: 540,
      emoji: "🐟",
    },
  ],
});

const wednesdayMeals: DayMealPlan = mealPlan({
  key: "wednesday",
  label: "Wednesday Balance",
  isVegetarian: false,
  meals: [
    {
      time: "08:00",
      name: "Egg wrap",
      description: "Whole eggs, spinach, whole-wheat wrap, salsa.",
      protein: 32,
      carbs: 28,
      fat: 16,
      calories: 380,
      emoji: "🌯",
    },
    {
      time: "12:30",
      name: "Turkey quinoa salad",
      description: "Turkey, quinoa, mixed greens, feta, vinaigrette.",
      protein: 44,
      carbs: 42,
      fat: 20,
      calories: 520,
      emoji: "🥗",
    },
    {
      time: "15:30",
      name: "Protein shake + fruit",
      description: "Whey, oats, apple.",
      protein: 30,
      carbs: 35,
      fat: 6,
      calories: 290,
      emoji: "🥤",
    },
    {
      time: "20:30",
      name: "Lean beef stir-fry",
      description: "Beef strips, peppers, rice noodles, soy-ginger.",
      protein: 46,
      carbs: 48,
      fat: 18,
      calories: 540,
      emoji: "🥢",
    },
  ],
});

const fridayMeals: DayMealPlan = mealPlan({
  key: "friday",
  label: "Friday Power",
  isVegetarian: false,
  meals: [
    {
      time: "07:45",
      name: "Bagel + eggs",
      description: "Whole bagel, 3 eggs, cheese, tomato.",
      protein: 34,
      carbs: 58,
      fat: 22,
      calories: 520,
      emoji: "🥯",
    },
    {
      time: "12:00",
      name: "Tuna pasta",
      description: "Whole-wheat pasta, tuna, peas, light cream sauce.",
      protein: 42,
      carbs: 65,
      fat: 14,
      calories: 560,
      emoji: "🍝",
    },
    {
      time: "16:30",
      name: "Cottage cheese bowl",
      description: "Cottage cheese, pineapple, walnuts.",
      protein: 32,
      carbs: 22,
      fat: 12,
      calories: 300,
      emoji: "🍍",
    },
    {
      time: "21:00",
      name: "Steak + sweet potato",
      description: "Sirloin, roasted sweet potato, green beans.",
      protein: 50,
      carbs: 45,
      fat: 24,
      calories: 600,
      emoji: "🥩",
    },
  ],
});

const saturdayMeals: DayMealPlan = mealPlan({
  key: "saturday",
  label: "Saturday Maintenance",
  isVegetarian: false,
  meals: [
    {
      time: "09:00",
      name: "Protein pancakes",
      description: "Oats, eggs, protein powder, berries, maple.",
      protein: 36,
      carbs: 52,
      fat: 12,
      calories: 430,
      emoji: "🥞",
    },
    {
      time: "13:00",
      name: "Chicken shawarma plate",
      description: "Chicken, rice, hummus, salad, tahini.",
      protein: 46,
      carbs: 58,
      fat: 22,
      calories: 610,
      emoji: "🧆",
    },
    {
      time: "17:00",
      name: "Apple + almond butter",
      description: "Quick snack before evening plans.",
      protein: 8,
      carbs: 28,
      fat: 16,
      calories: 260,
      emoji: "🍎",
    },
    {
      time: "20:30",
      name: "Shrimp tacos",
      description: "Corn tortillas, shrimp, slaw, lime crema.",
      protein: 40,
      carbs: 48,
      fat: 18,
      calories: 520,
      emoji: "🌮",
    },
  ],
});

const sundayMeals: DayMealPlan = mealPlan({
  key: "sunday",
  label: "Sunday Reset",
  isVegetarian: false,
  meals: [
    {
      time: "09:30",
      name: "Avocado toast + eggs",
      description: "Sourdough, eggs, avocado, chili flakes.",
      protein: 26,
      carbs: 42,
      fat: 22,
      calories: 430,
      emoji: "🥑",
    },
    {
      time: "13:30",
      name: "Grilled chicken Caesar",
      description: "Romaine, parmesan, croutons, light dressing.",
      protein: 44,
      carbs: 32,
      fat: 20,
      calories: 460,
      emoji: "🥬",
    },
    {
      time: "16:00",
      name: "Rice cakes + tuna",
      description: "Tuna mix with Greek yogurt, pickles.",
      protein: 28,
      carbs: 24,
      fat: 6,
      calories: 240,
      emoji: "🍘",
    },
    {
      time: "20:00",
      name: "Baked cod + rice",
      description: "Herb cod, basmati rice, asparagus.",
      protein: 42,
      carbs: 46,
      fat: 12,
      calories: 450,
      emoji: "🍚",
    },
  ],
});

const tuesdayVegetarian: DayMealPlan = mealPlan({
  key: "tuesday-veg",
  label: "Tuesday — Plant Power",
  isVegetarian: true,
  meals: [
    {
      time: "08:00",
      name: "Tofu scramble wrap",
      description: "Firm tofu, nutritional yeast, spinach, tortilla.",
      protein: 28,
      carbs: 36,
      fat: 14,
      calories: 360,
      emoji: "🌯",
    },
    {
      time: "12:30",
      name: "Chickpea buddha bowl",
      description: "Chickpeas, brown rice, tahini, roasted veg.",
      protein: 22,
      carbs: 68,
      fat: 18,
      calories: 480,
      emoji: "🥙",
    },
    {
      time: "16:00",
      name: "Edamame + fruit",
      description: "Steamed edamame, orange segments.",
      protein: 16,
      carbs: 30,
      fat: 8,
      calories: 220,
      emoji: "🫛",
    },
    {
      time: "20:30",
      name: "Lentil dal + naan",
      description: "Red lentils, coconut milk, whole-wheat naan.",
      protein: 26,
      carbs: 72,
      fat: 14,
      calories: 490,
      emoji: "🍛",
    },
  ],
});

const thursdayVegetarian: DayMealPlan = mealPlan({
  key: "thursday-veg",
  label: "Thursday — Veg Focus",
  isVegetarian: true,
  meals: [
    {
      time: "07:30",
      name: "Overnight chia pudding",
      description: "Chia, soy milk, berries, hemp seeds.",
      protein: 18,
      carbs: 38,
      fat: 16,
      calories: 320,
      emoji: "🫐",
    },
    {
      time: "12:00",
      name: "Paneer tikka plate",
      description: "Grilled paneer, quinoa, cucumber raita.",
      protein: 36,
      carbs: 44,
      fat: 24,
      calories: 520,
      emoji: "🧀",
    },
    {
      time: "15:30",
      name: "Roasted chickpea snack",
      description: "Spiced chickpeas + carrot sticks.",
      protein: 12,
      carbs: 34,
      fat: 8,
      calories: 240,
      emoji: "🥕",
    },
    {
      time: "20:00",
      name: "Tempeh stir-fry",
      description: "Tempeh, mixed veg, soba noodles.",
      protein: 32,
      carbs: 56,
      fat: 16,
      calories: 480,
      emoji: "🍜",
    },
  ],
});

export const MEAL_BY_WEEKDAY: Record<number, DayMealPlan> = {
  1: mondayMeals,
  2: tuesdayVegetarian,
  3: wednesdayMeals,
  4: thursdayVegetarian,
  5: fridayMeals,
  6: saturdayMeals,
  7: sundayMeals,
};
