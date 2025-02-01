const Notification = require("../models/Notification");

exports.getNotifications = async (req, res) => {
  try {
    const { email } = req.query; // Get the user email (or uid)

    // Fetch notifications where the user hasn't marked it as read
    const notifications = await Notification.find({
      readBy: { $ne: email }, // Only get notifications that haven't been read by this user
    });

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// markAsRead.js
exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params; // Notification ID
    const { email } = req.body; // User's email or uid

    // Find the notification by ID
    const notification = await Notification.findById(id);

    // Check if the notification has already been marked as read by this user
    if (!notification.readBy.includes(email)) {
      notification.readBy.push(email);
      await notification.save();
    }

    res.json({ message: "Marked as read" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
