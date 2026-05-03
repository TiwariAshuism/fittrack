"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const OPTIONS = ["light", "dark", "system"] as const;

const noopSubscribe = () => () => {};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);

  if (!mounted) {
    return (
      <Skeleton className="h-10 w-[8.5rem] rounded-2xl" aria-hidden />
    );
  }

  return (
    <div
      className="flex rounded-2xl border border-border bg-card/95 p-1 backdrop-blur-sm"
      role="group"
      aria-label="Theme"
    >
      {OPTIONS.map((t) => {
        const label =
          t === "system" ? "Auto" : t === "light" ? "Light" : "Dark";
        const active = theme === t;
        return (
          <Button
            key={t}
            type="button"
            variant={active ? "default" : "ghost"}
            size="sm"
            className={cn(
              "rounded-xl px-2.5 capitalize",
              active && "shadow-sm",
            )}
            onClick={() => setTheme(t)}
          >
            {label}
          </Button>
        );
      })}
    </div>
  );
}
