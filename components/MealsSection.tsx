"use client";

import type { DayMealPlan } from "@/types/fitness";

import { MealCard } from "@/components/MealCard";

type Props = {
  meal: DayMealPlan;
};

export function MealsSection({ meal }: Props) {
  return (
    <section>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          🍽️ Meal Plan
        </h2>
        {meal.isVegetarian ? (
          <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
            🌱 Veg Day
          </span>
        ) : null}
      </div>
      <MealCard meal={meal} />
    </section>
  );
}
