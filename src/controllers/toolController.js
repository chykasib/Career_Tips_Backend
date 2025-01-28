const Tool = require("../models/toolModel");

// Fetch all tools
exports.getTools = async (req, res) => {
  try {
    const { category } = req.query;
    const query = category ? { category } : {};
    const tools = await Tool.find();
    res.status(200).json(tools);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSingleTools = async (req, res) => {
  try {
    const tools = await Tool.findById(req.params.id);
    res.status(200).json(tools);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new tool
exports.createTool = async (req, res) => {
  try {
    const newTool = new Tool(req.body);
    await newTool.save();
    res.status(201).json(newTool);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a tool
exports.updateTool = async (req, res) => {
  try {
    const updatedTool = await Tool.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedTool);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a tool
exports.deleteTool = async (req, res) => {
  try {
    await Tool.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Tool deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
