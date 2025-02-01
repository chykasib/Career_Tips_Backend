const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Initialize Express App
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Import Routes (Make sure routes using `wss` are correctly imported)
const toolRoutes = require("./routes/toolRoutes");
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
const taskRoutes = require("./routes/taskRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

// API Routes
app.use("/api/tools", toolRoutes);
app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/notifications", notificationRoutes);

// WebSocket Connection
let activeSocket;

io.on("connection", (socket) => {
  console.log("User connected");
  activeSocket = socket; // Store the active socket for later use

  // You can emit events later using activeSocket.emit
  activeSocket.emit("welcome", "Welcome to the server!");
});

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to the Career-tips API!");
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { io };
