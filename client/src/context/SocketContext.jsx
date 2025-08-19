/* eslint-disable react-refresh/only-export-components */
// src/context/SocketContext.jsx
import React, { createContext, useContext, useMemo } from "react";
import io from "socket.io-client";

const SocketContext = createContext(null);

// Change URL if backend runs on a different host/port
const SOCKET_URL = import.meta.env.VITE_BASE_URL;

export const SocketProvider = ({ children }) => {
  // Ensure socket is memoized (not re-created on each render)
  const socket = useMemo(
    () =>
      io(SOCKET_URL, {
        transports: ["websocket"], // fast & stable
        reconnection: true,        // auto reconnect
        reconnectionAttempts: 5,   // retry up to 5 times
      }),
    []
  );

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

// Custom hook for easier usage
export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
