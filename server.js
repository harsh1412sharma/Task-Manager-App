// server.js

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import the cors package here
require("dotenv").config();

const app = express();

// Middleware: This allows the server to read JSON data.
app.use(express.json());
app.use(cors()); // Use the cors middleware

// Routes: Import and use the task and user routes.
const taskRoutes = require("./routes/taskRoutes");
app.use("/api/tasks", taskRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes); // Mount user routes at '/api/users'

// MongoDB Connection and Server Startup
// The server will only start after a successful database connection.
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected...");

    // Start the server here
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });