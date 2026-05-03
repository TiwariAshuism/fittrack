import { Dashboard } from "@/components/Dashboard";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 transition-colors duration-200 dark:bg-zinc-950 dark:text-zinc-50">
      <main className="mx-auto max-w-2xl px-4 pb-24 pt-10">
        <Dashboard />
      </main>
    </div>
  );
}
