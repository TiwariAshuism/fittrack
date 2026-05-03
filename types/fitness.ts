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

export interface WorkoutDay {
  key: string;
  title: string;
  subtitle: string;
  isRestDay: boolean;
  exercises: Exercise[];
  warmUp: string[];
  coolDown: string[];
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
