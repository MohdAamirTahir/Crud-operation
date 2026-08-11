import React, { useEffect, useMemo, useState } from "react";
import { Plus, Search, NotebookPen, Loader2 } from "lucide-react";
import * as taskApi from "./api/taskApi.js";
import TaskCard from "./components/TaskCard.jsx";
import TaskForm from "./components/TaskForm.jsx";
import StatsBar from "./components/StatsBar.jsx";

const FILTERS = ["All", "Pending", "In Progress", "Done"];

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const loadTasks = async () => {
    try {
      setLoading(true);
      const { data } = await taskApi.fetchTasks();
      setTasks(data);
      setErrorMsg("");
    } catch (err) {
      setErrorMsg("Backend se connect nahi ho paaya. Check karo ki server http://localhost:5000 par chal raha hai.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadTasks(); }, []);

  const handleCreateOrUpdate = async (formData) => {
    try {
      if (editingTask) {
        const { data } = await taskApi.updateTask(editingTask._id, formData);
        setTasks((prev) => prev.map((t) => (t._id === data._id ? data : t)));
      } else {
        const { data } = await taskApi.createTask(formData);
        setTasks((prev) => [data, ...prev]);
      }
      setShowForm(false);
      setEditingTask(null);
    } catch (err) {
      setErrorMsg("Task save karne mein error aaya. Dobara try karo.");
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Pakka is task ko delete karna hai?");
    if (!confirmed) return;
    try {
      await taskApi.deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      setErrorMsg("Task delete karne mein error aaya.");
    }
  };

  const handleToggleDone = async (task) => {
    const newStatus = task.status === "Done" ? "Pending" : "Done";
    try {
      const { data } = await taskApi.updateTask(task._id, { status: newStatus });
      setTasks((prev) => prev.map((t) => (t._id === data._id ? data : t)));
    } catch (err) {
      setErrorMsg("Status update karne mein error aaya.");
    }
  };

  const openEdit = (task) => { setEditingTask(task); setShowForm(true); };
  const openCreate = () => { setEditingTask(null); setShowForm(true); };

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      const matchesFilter = filter === "All" || t.status === filter;
      const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [tasks, filter, search]);

  return (
    <div className="mx-auto min-h-screen max-w-5xl px-5 py-10 sm:px-8">
      <header className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber/10 text-amber">
            <NotebookPen size={22} />
          </div>
          <div>
            <h1 className="font-display text-3xl font-semibold text-ink-50">Ledger</h1>
            <p className="text-sm text-ink-400">Apne kaam ka hisaab, ek jagah par.</p>
          </div>
        </div>

        <button onClick={openCreate} className="flex items-center justify-center gap-2 rounded-lg bg-amber px-4 py-2.5 text-sm font-semibold text-ink-950 shadow-card transition hover:bg-amber-light">
          <Plus size={16} strokeWidth={2.5} />
          Naya Task
        </button>
      </header>

      <div className="mb-6"><StatsBar tasks={tasks} /></div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`rounded-full px-3.5 py-1.5 font-mono text-xs uppercase tracking-wider transition ${
                filter === f ? "bg-amber text-ink-950" : "border border-ink-700 text-ink-300 hover:border-ink-500"
              }`}>
              {f}
            </button>
          ))}
        </div>

        <div className="relative sm:w-64">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-400" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Task dhundo..."
            className="w-full rounded-lg border border-ink-700 bg-ink-800 py-2 pl-9 pr-3 text-sm text-ink-50 placeholder:text-ink-400 outline-none transition focus:border-amber focus:ring-1 focus:ring-amber" />
        </div>
      </div>

      {errorMsg && (
        <div className="mb-6 rounded-lg border border-coral/30 bg-coral/10 px-4 py-3 text-sm text-coral">{errorMsg}</div>
      )}

      {loading ? (
        <div className="flex items-center justify-center gap-2 py-24 text-ink-400">
          <Loader2 className="animate-spin" size={18} />
          <span className="font-mono text-sm">Tasks load ho rahe hain...</span>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-ink-700 py-20 text-center">
          <p className="font-display text-lg text-ink-200">Koi task nahi mila</p>
          <p className="text-sm text-ink-400">
            {tasks.length === 0 ? "Apna pehla task banao aur shuru karo." : "Filter ya search badal kar dekho."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {filteredTasks.map((task) => (
            <TaskCard key={task._id} task={task} onEdit={openEdit} onDelete={handleDelete} onToggleDone={handleToggleDone} />
          ))}
        </div>
      )}

      {showForm && (
        <TaskForm initialData={editingTask} onSubmit={handleCreateOrUpdate}
          onClose={() => { setShowForm(false); setEditingTask(null); }} />
      )}
    </div>
  );
}