import { createSlice } from "@reduxjs/toolkit";
import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_BASE_URL;

let socket = null;

const socketSlice = createSlice({
  name: "socket",
  initialState: {
    socket: null,
    connected: false,
  },
  reducers: {
    connectSocket: (state) => {
      if (!socket) {
        socket = io(SOCKET_URL, {
          transports: ["websocket"],
          withCredentials: true,
        });

        state.socket = socket;
        state.connected = true;
      }
    },
    disconnectSocket: (state) => {
      if (socket) {
        socket.disconnect();
        socket = null;
        state.socket = null;
        state.connected = false;
      }
    },
  },
});

export const { connectSocket, disconnectSocket } = socketSlice.actions;
export default socketSlice.reducer;
