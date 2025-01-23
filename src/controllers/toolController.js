const Tool = require("../models/Tool");

// Get all tools
exports.getAllTools = async (req, res) => {
  try {
    const tools = await Tool.find().populate("createdBy", "name email");
    res.status(200).json(tools);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Create a new tool
exports.createTool = async (req, res) => {
  const { title, description, link } = req.body;

  try {
    const tool = await Tool.create({
      title,
      description,
      link,
      createdBy: req.user.id,
    });
    res.status(201).json(tool);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete a tool
exports.deleteTool = async (req, res) => {
  try {
    const tool = await Tool.findByIdAndDelete(req.params.id);
    if (!tool) return res.status(404).json({ message: "Tool not found" });
    res.status(200).json({ message: "Tool deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
