import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/taskmanager";

app.use(cors());
app.use(express.json());

app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("Task Manager API chal raha hai 🚀");
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB se connect ho gaya");

    app.listen(PORT, () => {
      console.log(`✅ Server http://localhost:${PORT} par chal raha hai`);
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  });