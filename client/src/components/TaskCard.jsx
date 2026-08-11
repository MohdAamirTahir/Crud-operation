import React from "react";
import { Pencil, Trash2, Calendar, Check } from "lucide-react";

const priorityStyles = {
  High: { bar: "bg-coral", text: "text-coral", chip: "bg-coral/10 border-coral/30" },
  Medium: { bar: "bg-amber", text: "text-amber", chip: "bg-amber/10 border-amber/30" },
  Low: { bar: "bg-ink-400", text: "text-ink-200", chip: "bg-ink-600/30 border-ink-600" },
};

const statusStyles = {
  Pending: "text-ink-200 bg-ink-700",
  "In Progress": "text-amber bg-amber/10",
  Done: "text-sage bg-sage/10",
};

function formatDate(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

export default function TaskCard({ task, onEdit, onDelete, onToggleDone }) {
  const p = priorityStyles[task.priority] || priorityStyles.Medium;
  const isDone = task.status === "Done";

  return (
    <div className={`group relative flex animate-rise overflow-hidden rounded-xl border border-ink-700 bg-ink-800 shadow-card transition hover:border-ink-600 ${isDone ? "opacity-70" : ""}`}>
      <div className={`w-1.5 shrink-0 ${p.bar}`} />

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className={`font-display text-lg font-semibold leading-snug text-ink-50 ${isDone ? "line-through decoration-ink-400" : ""}`}>
            {task.title}
          </h3>

          <button onClick={() => onToggleDone(task)} title={isDone ? "Pending mark karo" : "Done mark karo"}
            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition ${
              isDone ? "border-sage bg-sage text-ink-950" : "border-ink-500 text-transparent hover:border-sage hover:text-sage"
            }`}>
            <Check size={14} strokeWidth={3} />
          </button>
        </div>

        {task.description && <p className="text-sm leading-relaxed text-ink-200">{task.description}</p>}

        <div className="mt-1 flex flex-wrap items-center gap-2">
          <span className={`rounded-full border px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider ${p.chip} ${p.text}`}>
            {task.priority}
          </span>
          <span className={`rounded-full px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider ${statusStyles[task.status]}`}>
            {task.status}
          </span>
          {task.dueDate && (
            <span className="ml-auto flex items-center gap-1 font-mono text-[11px] text-ink-400">
              <Calendar size={12} />
              {formatDate(task.dueDate)}
            </span>
          )}
        </div>

        <div className="mt-1 flex items-center gap-2 border-t border-ink-700 pt-3 opacity-0 transition group-hover:opacity-100">
          <button onClick={() => onEdit(task)} className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-ink-200 transition hover:bg-ink-700 hover:text-amber">
            <Pencil size={13} /> Edit
          </button>
          <button onClick={() => onDelete(task._id)} className="flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium text-ink-200 transition hover:bg-coral/10 hover:text-coral">
            <Trash2 size={13} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}