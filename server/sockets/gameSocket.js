// sockets/gameSocket.js
const Game = require("../models/game.model");
const User = require("../models/user.model");
const { v4: uuidv4 } = require("uuid");

function generateRoomCode() {
  return uuidv4().slice(0, 6).toUpperCase();
}

module.exports = function registerGameHandlers(io, socket) {
  console.log(`🟢 Socket connected: ${socket.id}`);

  // CREATE ROOM
  socket.on("createRoom", async ({ userId, name }) => {
    try {
      const roomId = generateRoomCode();

      const newGame = new Game({
        roomId,
        players: [{ userId, socketId: socket.id, name }],
      });

      await newGame.save();

      socket.join(roomId);
      io.to(roomId).emit("roomCreated", { roomId, players: newGame.players });
    } catch (error) {
      console.error("Error creating room:", error);
      socket.emit("errorCreating", "Failed to create room");
    }
  });

  // JOIN ROOM
  socket.on("joinRoom", async ({ roomId, userId, name }) => {
    try {
      const game = await Game.findOne({ roomId });

      if (!game) {
        socket.emit("errorJoining", "Room not found");
        return;
      }

      if (game.status !== "waiting") {
        socket.emit("errorJoining", "Game already started");
        return;
      }

      if (game.players.length >= game.maxPlayers) {
        socket.emit("errorJoining", "Room is full");
        return;
      }

      const alreadyIn = game.players.some(
        (p) => p.userId.toString() === userId
      );

      if (!alreadyIn) {
        game.players.push({ userId, socketId: socket.id, name });
        await game.save();
      }

      socket.join(roomId);
      io.to(roomId).emit("roomJoined", { roomId, players: game.players });
    } catch (error) {
      console.error("Error joining room:", error);
      socket.emit("errorJoining", "Failed to join room");
    }
  });

  // START GAME
  socket.on("startGame", async ({ roomId }) => {
    try {
      const game = await Game.findOne({ roomId });
      if (!game) {
        socket.emit("errorStarting", "Room not found");
        return;
      }

      if (game.status !== "waiting") {
        socket.emit("errorStarting", "Game already started");
        return;
      }

      if (game.players.length < 2) {
        socket.emit("errorStarting", "At least 2 players required");
        return;
      }

      // Assign roles randomly
      const shuffledPlayers = [...game.players].sort(() => 0.5 - Math.random());
      shuffledPlayers[0].role = "Chor"; // first = Chor
      for (let i = 1; i < shuffledPlayers.length; i++) {
        shuffledPlayers[i].role = "Police";
      }

      game.players = shuffledPlayers;
      game.status = "in-progress";
      await game.save();

      io.to(roomId).emit("gameStarted", {
        roomId,
        players: game.players.map((p) => ({
          userId: p.userId,
          name: p.name,
          role: p.role,
        })),
      });
    } catch (error) {
      console.error("Error starting game:", error);
      socket.emit("errorStarting", "Failed to start game");
    }
  });

  // DISCONNECT
  socket.on("disconnect", async () => {
    try {
      const game = await Game.findOne({ "players.socketId": socket.id });
      if (!game) return;

      game.players = game.players.filter((p) => p.socketId !== socket.id);
      await game.save();

      io.to(game.roomId).emit("playerLeft", { players: game.players });
    } catch (error) {
      console.error("Error handling disconnect:", error);
    }
  });
};
