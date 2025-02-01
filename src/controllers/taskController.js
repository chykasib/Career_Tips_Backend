// controllers/taskController.js
const Task = require("../models/Task");
const Notification = require("../models/Notification");
const { io } = require("../server");

exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = new Task({ title, description });
    await task.save();

    const notification = new Notification({
      message: `New Task: ${title}`,
      taskId: task._id,
    });
    await notification.save();

    if (io) {
      io.emit("newNotification", notification); // Send real-time update
    }

    res.status(201).json({ task, notification });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
