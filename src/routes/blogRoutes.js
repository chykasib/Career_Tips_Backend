// routes/blogRoutes.js
const express = require("express");
const multer = require("multer");
const {
  createBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogController");

const router = express.Router();

// Multer setup for image uploads
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("image"), createBlog);
router.get("/", getBlogs);
router.put("/:id", upload.single("image"), updateBlog);
router.delete("/:id", deleteBlog);

module.exports = router;
