import { Dashboard } from "@/components/Dashboard";
import { PageShell } from "@/components/PageShell";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      <main className="mx-auto max-w-2xl px-4 pb-24 pt-10">
        <PageShell>
          <Dashboard />
        </PageShell>
      </main>
    </div>
  );
}
