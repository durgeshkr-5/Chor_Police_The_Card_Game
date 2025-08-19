// src/socket/socketListeners.js
import {
  setRole,
  updatePlayers,
  startGuessPhase,
  setRoundResult,
  updateScoreboard,
} from "../redux/features/game/gameSlice.js";

export const registerSocketListeners = (socket, dispatch) => {
  socket.on("roleAssignment", (assignedRole) => {
    dispatch(setRole(assignedRole));
  });

  socket.on("updatePlayers", (playersList) => {
    dispatch(updatePlayers(playersList));
  });

  socket.on("guessPhaseStart", () => {
    dispatch(startGuessPhase());
  });

  socket.on("roundResult", (result) => {
    dispatch(setRoundResult(result));
  });

  socket.on("scoreboard", (scores) => {
    dispatch(updateScoreboard(scores));
  });
};
