import React from "react";

export default function StatsBar({ tasks }) {
  const total = tasks.length;
  const done = tasks.filter((t) => t.status === "Done").length;
  const inProgress = tasks.filter((t) => t.status === "In Progress").length;
  const pending = tasks.filter((t) => t.status === "Pending").length;

  const stats = [
    { label: "Total", value: total, color: "text-ink-50" },
    { label: "Pending", value: pending, color: "text-ink-200" },
    { label: "In Progress", value: inProgress, color: "text-amber" },
    { label: "Done", value: done, color: "text-sage" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="rounded-xl border border-ink-700 bg-ink-800/60 px-4 py-3">
          <p className={`font-display text-2xl font-semibold ${s.color}`}>{s.value}</p>
          <p className="font-mono text-[11px] uppercase tracking-wider text-ink-400">{s.label}</p>
        </div>
      ))}
    </div>
  );
}