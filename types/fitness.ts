/**
 * Shared fitness domain types for workouts, meals, and hydration.
 */

export type MuscleGroup =
  | "chest"
  | "back"
  | "shoulders"
  | "arms"
  | "legs"
  | "core"
  | "fullBody";

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  rest: string;
  youtubeVideoId: string;
  muscleGroup: MuscleGroup;
  instructions: string;
}

/** Bodyweight / finisher line after main lifts (no video required). */
export interface CoreFinisherExercise {
  id: string;
  name: string;
  /** e.g. "3×45 sec" or "3×10 per side" */
  prescription: string;
}

export interface CoreFinisherBlock {
  label: string;
  /** Why this core pairs with today’s lift. */
  rationale: string;
  exercises: CoreFinisherExercise[];
}

export interface ActiveRecoverySection {
  title: string;
  items: string[];
}

export type WorkoutSessionKind = "gymWithCore" | "activeRecovery" | "fullRest";

export interface WorkoutDay {
  key: string;
  title: string;
  subtitle: string;
  isRestDay: boolean;
  /** Drives summary strip + cards (fullRest = Sat/Sun style). */
  sessionKind: WorkoutSessionKind;
  exercises: Exercise[];
  warmUp: string[];
  coolDown: string[];
  /** After main gym work (Mon, Tue, Thu, Fri). */
  coreFinisher?: CoreFinisherBlock;
  /** Wednesday: core C + walk + mobility. */
  activeRecovery?: {
    rationale: string;
    walkTarget: string;
    sections: ActiveRecoverySection[];
  };
}

export interface MealItem {
  time: string;
  name: string;
  description: string;
  protein: number;
  carbs: number;
  fat: number;
  calories: number;
  emoji: string;
}

export interface DayMealPlan {
  key: string;
  label: string;
  isVegetarian: boolean;
  meals: MealItem[];
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  totalCalories: number;
}

export interface WaterEntry {
  ml: number;
  time: string;
}

export interface WaterState {
  targetMl: number;
  currentMl: number;
  date: string;
  entries: WaterEntry[];
}

export interface TodayState {
  workout: WorkoutDay;
  meal: DayMealPlan;
  date: Date;
  dayName: string;
  /** Weekday 1 = Monday … 7 = Sunday */
  weekday: number;
}

export type TodayPlanStatus = "loading" | "loaded" | "error";
