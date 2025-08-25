// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",          // Local frontend
      process.env.FRONTEND_ORIGIN       // e.g. https://your-frontend.vercel.app
    ].filter(Boolean),
    credentials: true,
  })
);

// Routes
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");

app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

// Health check endpoint
app.get("/", (_req, res) => {
  res.json({ ok: true, service: "task-manager-api" });
});

// Start the server
async function start() {
  try {
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI missing");
    if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET missing");

    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected...");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error("❌ Startup error:", err);
    process.exit(1);
  }
}

start();
