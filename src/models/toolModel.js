const mongoose = require("mongoose");

const toolSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  category: {
    type: String,
    enum: ["Resume Building", "Interview Preparation", "Skill Tracking"],
    required: true,
  },
  userProgress: {
    completedSteps: { type: Number, default: 0 },
    totalSteps: { type: Number, default: 1 },
  },
});

module.exports = mongoose.model("Tool", toolSchema);
