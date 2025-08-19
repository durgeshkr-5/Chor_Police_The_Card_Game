// redux/features/game/gameSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roomId: null,
  players: [],
  status: "idle", // idle | waiting | started | ended
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setRoom: (state, action) => {
      state.roomId = action.payload;
    },
    setPlayers: (state, action) => {
      state.players = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    resetGame: () => initialState,
  },
});

export const { setRoom, setPlayers, setStatus, resetGame } = gameSlice.actions;
export default gameSlice.reducer;
