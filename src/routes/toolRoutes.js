const express = require("express");
const {
  getTools,
  createTool,
  updateTool,
  deleteTool,
  getSingleTools,
} = require("../controllers/toolController");
const router = express.Router();

router.post("/create-tools", createTool);
router.get("/", getTools);
router.get("/:id", getSingleTools);
router.put("/:id", updateTool);
router.delete("/:id", deleteTool);

module.exports = router;
