import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

const emptyForm = { title: "", description: "", priority: "Medium", status: "Pending", dueDate: "" };
const PRIORITIES = ["Low", "Medium", "High"];
const STATUSES = ["Pending", "In Progress", "Done"];

export default function TaskForm({ initialData, onSubmit, onClose }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        description: initialData.description || "",
        priority: initialData.priority || "Medium",
        status: initialData.status || "Pending",
        dueDate: initialData.dueDate ? initialData.dueDate.slice(0, 10) : "",
      });
    } else {
      setForm(emptyForm);
    }
  }, [initialData]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) { setError("Title likhna zaroori hai."); return; }
    setError("");
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-950/70 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="w-full max-w-lg animate-rise rounded-2xl border border-ink-700 bg-ink-800 shadow-card" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-ink-700 px-6 py-4">
          <h2 className="font-display text-xl font-semibold text-ink-50">
            {initialData ? "Task Update Karo" : "Naya Task Banao"}
          </h2>
          <button onClick={onClose} className="rounded-full p-1.5 text-ink-400 transition hover:bg-ink-700 hover:text-ink-50" aria-label="Band karo">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 px-6 py-5">
          <div>
            <label className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-ink-400">Title</label>
            <input type="text" name="title" value={form.title} onChange={handleChange}
              placeholder="Jaise: Client ko report bhejo"
              className="w-full rounded-lg border border-ink-600 bg-ink-900 px-3 py-2.5 text-ink-50 placeholder:text-ink-400 outline-none transition focus:border-amber focus:ring-1 focus:ring-amber" />
          </div>

          <div>
            <label className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-ink-400">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={3}
              placeholder="Thoda detail likho (optional)"
              className="w-full resize-none rounded-lg border border-ink-600 bg-ink-900 px-3 py-2.5 text-ink-50 placeholder:text-ink-400 outline-none transition focus:border-amber focus:ring-1 focus:ring-amber" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-ink-400">Priority</label>
              <select name="priority" value={form.priority} onChange={handleChange}
                className="w-full rounded-lg border border-ink-600 bg-ink-900 px-3 py-2.5 text-ink-50 outline-none transition focus:border-amber focus:ring-1 focus:ring-amber">
                {PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-ink-400">Status</label>
              <select name="status" value={form.status} onChange={handleChange}
                className="w-full rounded-lg border border-ink-600 bg-ink-900 px-3 py-2.5 text-ink-50 outline-none transition focus:border-amber focus:ring-1 focus:ring-amber">
                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-ink-400">Due Date</label>
            <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange}
              className="w-full rounded-lg border border-ink-600 bg-ink-900 px-3 py-2.5 text-ink-50 outline-none transition focus:border-amber focus:ring-1 focus:ring-amber [color-scheme:dark]" />
          </div>

          {error && (
            <p className="rounded-lg border border-coral/30 bg-coral/10 px-3 py-2 text-sm text-coral">{error}</p>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="rounded-lg px-4 py-2 text-sm font-medium text-ink-200 transition hover:bg-ink-700">Cancel</button>
            <button type="submit" className="rounded-lg bg-amber px-4 py-2 text-sm font-semibold text-ink-950 transition hover:bg-amber-light">
              {initialData ? "Save Changes" : "Task Add Karo"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}