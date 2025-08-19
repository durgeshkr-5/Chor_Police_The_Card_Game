const express = require("express");
const Room = require("../models/room.model");
const router = express.Router();

// Create Room
router.post("/create", async (req, res) => {
  try {
    // Generate random 6-char room code
    const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    const room = new Room({ code: roomCode });
    await room.save();

    res.json({ success: true, roomCode });
  } catch (err) {
    console.error("Error creating room:", err.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Join Room
router.post("/join", async (req, res) => {
  try {
    const { roomCode } = req.body;

    if (!roomCode) {
      return res.status(400).json({ success: false, message: "Room code required" });
    }

    const room = await Room.findOne({ code: roomCode.toUpperCase() });

    if (!room) {
      return res.status(404).json({ success: false, message: "Room not found" });
    }

    res.json({ success: true, message: `Joined room ${roomCode}` });
  } catch (err) {
    console.error("Error joining room:", err.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

module.exports = router;
