// pages/GameRoom.jsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSocket } from "../context/SocketContext";
import { setPlayers, setStatus } from "../redux/features/game/gameSlice";
import { useParams } from "react-router-dom";

const GameRoom = () => {
  const { roomId } = useParams();
  const { players, status } = useSelector((state) => state.game);
  const socket = useSocket();
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on("playerLeft", ({ players }) => {
      dispatch(setPlayers(players));
    });

    socket.on("gameStarted", ({ roles }) => {
      dispatch(setStatus("started"));
      console.log("Roles:", roles); // later show in UI
    });

    return () => {
      socket.off("playerLeft");
      socket.off("gameStarted");
    };
  }, [socket, dispatch]);

  const handleStart = () => {
    socket.emit("startGame", { roomId });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Room: {roomId}</h1>
      <h2 className="text-lg mb-4">Players:</h2>
      <ul>
        {players.map((p) => (
          <li key={p.userId}>{p.name}</li>
        ))}
      </ul>
      {status === "waiting" && (
        <button
          onClick={handleStart}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Start Game
        </button>
      )}
    </div>
  );
};

export default GameRoom;
