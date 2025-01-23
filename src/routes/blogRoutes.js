const express = require("express");
const {
  getAllBlogs,
  createBlog,
  deleteBlog,
} = require("../controllers/blogController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get all blogs
router.get("/", getAllBlogs);

// Create a new blog (admin only)
router.post("/", authMiddleware, createBlog);

// Delete a blog (admin only)
router.delete("/:id", authMiddleware, deleteBlog);

module.exports = router;
