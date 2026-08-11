import Task from "../models/Task.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Tasks laane mein error", error: error.message });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task nahi mila" });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Task laane mein error", error: error.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description, priority, status, dueDate } = req.body;
    if (!title) return res.status(400).json({ message: "Title zaroori hai" });

    const task = await Task.create({ title, description, priority, status, dueDate });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: "Task banane mein error", error: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) return res.status(404).json({ message: "Task nahi mila" });
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ message: "Task update karne mein error", error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task nahi mila" });
    res.status(200).json({ message: "Task delete ho gaya", id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: "Task delete karne mein error", error: error.message });
  }
};