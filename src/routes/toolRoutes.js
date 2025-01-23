const express = require("express");
const {
  getAllTools,
  createTool,
  deleteTool,
} = require("../controllers/toolController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get all tools
router.get("/", getAllTools);

// Create a new tool (admin only)
router.post("/", authMiddleware, createTool);

// Delete a tool (admin only)
router.delete("/:id", authMiddleware, deleteTool);

module.exports = router;
