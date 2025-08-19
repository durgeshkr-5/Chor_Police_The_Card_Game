import { io } from "socket.io-client";

// adjust port if your backend runs on 5000
const SOCKET_URL = import.meta.env.VITE_BASE_URL;

// create and export socket instance
const socket = io(SOCKET_URL, {
  transports: ["websocket"], // force websocket
  withCredentials: true
});

export default socket;
