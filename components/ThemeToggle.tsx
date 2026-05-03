"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const OPTIONS = ["light", "dark", "system"] as const;

const noopSubscribe = () => () => {};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);

  if (!mounted) {
    return (
      <div
        className="h-10 w-[8.5rem] rounded-2xl border border-zinc-200 bg-white/90 shadow-lg dark:border-zinc-700 dark:bg-zinc-900/90"
        aria-hidden
      />
    );
  }

  return (
    <div
      className="flex rounded-2xl border border-zinc-200 bg-white/95 p-1 shadow-lg backdrop-blur-sm dark:border-zinc-600 dark:bg-zinc-900/95"
      role="group"
      aria-label="Theme"
    >
      {OPTIONS.map((t) => {
        const label = t === "system" ? "Auto" : t === "light" ? "Light" : "Dark";
        const active = theme === t;
        return (
          <button
            key={t}
            type="button"
            onClick={() => setTheme(t)}
            className={`rounded-xl px-2.5 py-1.5 text-xs font-semibold capitalize transition ${
              active
                ? "bg-zinc-900 text-white shadow-sm dark:bg-zinc-100 dark:text-zinc-900"
                : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
