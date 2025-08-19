const { assignRoles, handleGuess, endGame } = require("../utils/gameState");

function registerGameHandlers(io, socket) {
  // Create room
  socket.on("createRoom", ({ username, roomCode }) => {
    socket.join(roomCode);
    io.to(roomCode).emit("roomCreated", {
      message: `${username} created room ${roomCode}`,
    });
  });

  // Join room
  socket.on("joinRoom", ({ username, roomCode }) => {
    const room = io.sockets.adapter.rooms.get(roomCode);

    if (!room) {
      socket.emit("errorMessage", "Room does not exist");
      return;
    }

    if (room.size >= 4) {
      socket.emit("errorMessage", "Room is full");
      return;
    }

    socket.join(roomCode);
    io.to(roomCode).emit("playerJoined", {
      username,
      players: [...room],
    });
  });

  // Start game
  socket.on("startGame", (roomCode) => {
    const players = [...io.sockets.adapter.rooms.get(roomCode)];
    const roles = assignRoles(players);

    players.forEach((playerId) => {
      io.to(playerId).emit("roleAssigned", { role: roles[playerId] });
    });

    io.to(roomCode).emit("gameStarted", { message: "Game has started!" });
  });

  // Guess Chor
  socket.on("guessChor", ({ roomCode, guessedPlayerId }) => {
    const result = handleGuess(roomCode, guessedPlayerId);
    io.to(roomCode).emit("roundResult", result);
  });

  // End game
  socket.on("endGame", (roomCode) => {
    const finalScores = endGame(roomCode);
    io.to(roomCode).emit("gameOver", { finalScores });
  });
}

module.exports = registerGameHandlers;
