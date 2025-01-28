// controllers/blogController.js
const Blog = require("../models/Blog");

// Create a new blog
exports.createBlog = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null; // Handle image upload

    const blog = await Blog.create({ title, content, category, image });
    res.status(201).json(blog);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create blog", error: err.message });
  }
};

// Fetch blogs with pagination
exports.getBlogs = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Pagination params
  try {
    const blogs = await Blog.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Blog.countDocuments();
    res.status(200).json({ blogs, total });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch blogs", error: err.message });
  }
};

// Update a blog
exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, category } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, content, category, ...(image && { image }) },
      { new: true }
    );

    res.status(200).json(updatedBlog);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update blog", error: err.message });
  }
};

// Delete a blog
exports.deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    await Blog.findByIdAndDelete(id);
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete blog", error: err.message });
  }
};
