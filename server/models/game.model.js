// models/game.model.js
const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  socketId: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ["Chor", "Police", "Unknown"], default: "Unknown" }, // useful for game logic later
});

const gameSchema = new mongoose.Schema(
  {
    roomId: { type: String, required: true, unique: true }, // short room code
    players: [playerSchema],

    // extra fields
    status: {
      type: String,
      enum: ["waiting", "in-progress", "finished"],
      default: "waiting",
    },
    maxPlayers: { type: Number, default: 4 }, // can adjust based on game rules
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Game", gameSchema);
