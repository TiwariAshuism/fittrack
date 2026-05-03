"use client";

/**
 * Static copy from the training plan: weekly core volume + 6-month trajectory.
 */
export function WeeklyCoreRoadmap() {
  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-5">
      <h2 className="text-base font-semibold text-zinc-100">
        📊 Weekly core & abs roadmap
      </h2>
      <div className="mt-4 overflow-x-auto rounded-2xl border border-zinc-800/80">
        <table className="w-full min-w-[320px] text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-950/80 text-xs uppercase tracking-wide text-zinc-500">
              <th className="px-3 py-2 font-semibold">Core type</th>
              <th className="px-3 py-2 font-semibold">Days</th>
              <th className="px-3 py-2 font-semibold">Sets / wk</th>
            </tr>
          </thead>
          <tbody className="text-zinc-300">
            <tr className="border-b border-zinc-800/60">
              <td className="px-3 py-2">Anti-extension</td>
              <td className="px-3 py-2">Mon + Thu</td>
              <td className="px-3 py-2 font-medium text-zinc-100">12–15</td>
            </tr>
            <tr className="border-b border-zinc-800/60">
              <td className="px-3 py-2">Obliques / rotation</td>
              <td className="px-3 py-2">Tue + Fri</td>
              <td className="px-3 py-2 font-medium text-zinc-100">12–15</td>
            </tr>
            <tr className="border-b border-zinc-800/60">
              <td className="px-3 py-2">Lower abs</td>
              <td className="px-3 py-2">Wed</td>
              <td className="px-3 py-2 font-medium text-zinc-100">~9</td>
            </tr>
            <tr>
              <td className="px-3 py-2 font-semibold text-zinc-100">Total</td>
              <td className="px-3 py-2">5 days</td>
              <td className="px-3 py-2 font-semibold text-emerald-300">~36 sets</td>
            </tr>
          </tbody>
        </table>
      </div>
      <ul className="mt-4 space-y-2 text-xs leading-relaxed text-zinc-400">
        <li>
          <span className="font-semibold text-zinc-300">M1–M2:</span> habit,
          posture, waist feels tighter.
        </li>
        <li>
          <span className="font-semibold text-zinc-300">M3–M4:</span> waist
          down, upper abs in good lighting if deficit holds.
        </li>
        <li>
          <span className="font-semibold text-zinc-300">M5–M6:</span> clearer
          definition flexed → visible in natural light with consistency.
        </li>
      </ul>
      <p className="mt-4 rounded-2xl border border-amber-500/20 bg-amber-950/30 px-3 py-2 text-xs text-amber-100/90">
        Trunk fat drops from diet: aim for your calorie & protein targets daily.
        Training builds the muscle underneath.
      </p>
    </section>
  );
}
