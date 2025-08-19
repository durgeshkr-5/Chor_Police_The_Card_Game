import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import socketReducer from "../redux/features/socket/socketSlice";
import gameReducer from "../redux/features/game/gameSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    socket : socketReducer,
    game:gameReducer

  },
});

export default store;
