"use client";

import { ThemeProvider } from "next-themes";

import { ThemeToggle } from "@/components/ThemeToggle";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
      <div className="pointer-events-none fixed bottom-5 right-4 z-50 md:bottom-6">
        <div className="pointer-events-auto">
          <ThemeToggle />
        </div>
      </div>
    </ThemeProvider>
  );
}
