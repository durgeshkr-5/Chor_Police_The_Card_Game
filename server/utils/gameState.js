// In-memory game state (can move to Redis/DB later)
const gameStates = {};

function assignRoles(players) {
  const roles = ["Raja", "Mantri", "Sipahi", "Chor"];
  roles.sort(() => Math.random() - 0.5); // shuffle

  const assigned = {};
  players.forEach((p, i) => {
    assigned[p] = roles[i];
  });

  // Save game state
  gameStates[players[0]] = { players, roles: assigned, scores: {} };

  return assigned;
}

function handleGuess(roomCode, guessedPlayerId) {
  const game = gameStates[roomCode];
  if (!game) return {};

  const roles = game.roles;
  const sipahiId = Object.keys(roles).find((id) => roles[id] === "Sipahi");
  const chorId = Object.keys(roles).find((id) => roles[id] === "Chor");

  let scores = {};

  if (guessedPlayerId === chorId) {
    scores = { [chorId]: 0, [sipahiId]: 500 };
  } else {
    scores = { [chorId]: 500, [sipahiId]: 0 };
  }

  game.scores = { ...game.scores, ...scores };
  return scores;
}

function endGame(roomCode) {
  const game = gameStates[roomCode];
  return game ? game.scores : {};
}

module.exports = { assignRoles, handleGuess, endGame };
