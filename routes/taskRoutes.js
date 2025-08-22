const express = require("express");
const Task = require("../models/Task");
const auth = require("../middlewares/auth"); // auth middleware ko import karo

const router = express.Router();

// @route   POST /api/tasks
// @desc    Create a new task for a logged-in user
// @access  Private
router.post("/", auth, async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = new Task({
      title,
      description,
      user: req.user.id, // User ki ID ko task mein save karo
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// @route   GET /api/tasks
// @desc    Get all tasks for a specific user
// @access  Private
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }); // Sirf logged-in user ke tasks fetch karo
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// @route   PUT /api/tasks/:id
// @desc    Update a task
// @access  Private
router.put("/:id", auth, async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id }, // Task ID aur user ID dono check karo
      { title, description, status },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// @route   DELETE /api/tasks/:id
// @desc    Delete a task
// @access  Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id }); // Task ID aur user ID dono check karo
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;