import { Dashboard } from "@/components/Dashboard";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50">
      <main className="mx-auto max-w-2xl px-4 pb-16 pt-10">
        <Dashboard />
      </main>
    </div>
  );
}
