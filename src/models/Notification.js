const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    readBy: { type: [String], default: [] }, // Array of users who read the notification
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", NotificationSchema);
