const express = require("express");
const http = require("http"); 
const { Server } = require("socket.io");
require("dotenv").config();
const connectMongoDB = require("./config/mongoDb.config");
const authRouter = require("./routes/auth.routes");
const registerGameHandlers = require("./sockets/gameSocket");
const cors = require("cors")

// constants
const app = express();
const port = process.env.PORT || 5000;

// connect MongoDb
connectMongoDB();

// middleware
app.use(express.json());
app.use(cors())

// routes
app.get("/test", (req, res) => {
  return res.send("this is testing route!!!");
});

app.use("/api/auth", authRouter);

// undefined routes
app.use((req, res) => {
  res.status(404).json({ msg: "No Routes Found!!!" });
});

// create HTTP server for socket.io
const server = http.createServer(app);

// socket.io setup
const io = new Server(server, {
  cors: {
    origin: "*", // ⚠️ allow all for now (restrict later to frontend domain)
    methods: ["GET", "POST"],
  },
});

// socket.io connection
io.on("connection", (socket) => {
  console.log("🔗 User connected:", socket.id);
  registerGameHandlers(io, socket);

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

// start server
server.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});
