const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");

// Load environment variables
dotenv.config();

// Initialize app
const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Import Routes
const toolRoutes = require("./routes/toolRoutes");
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");

//middlewares
app.use("/images", express.static("uploads")); // Serve static images
app.use("/api/blogs", blogRoutes);

// Example API route
app.get("/api/blogs", (req, res) => {
  const blogs = [
    {
      _id: "1",
      title: "Sample Blog",
      content: "This is a sample blog.",
      category: "Productivity",
      image: "/uploads/sample.jpg", // Relative path to the image
    },
  ];
  res.json({ blogs });
});

// API Routes
app.use("/api/tools", toolRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Career-tips API!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
