const express = require("express");
const router = express.Router();
const { isAdmin } = require("../middlewares/authMiddleware");
const Tool = require("../models/Tool");

// Middleware to check admin
router.use(isAdmin);

// Create a Tool
router.post("/tools", async (req, res) => {
  try {
    const tool = new Tool(req.body);
    await tool.save();
    res.status(201).json(tool);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a Tool
router.put("/tools/:id", async (req, res) => {
  try {
    const tool = await Tool.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(tool);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a Tool
router.delete("/tools/:id", async (req, res) => {
  try {
    await Tool.findByIdAndDelete(req.params.id);
    res.json({ message: "Tool deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Similarly, add routes for blogs...

module.exports = router;
