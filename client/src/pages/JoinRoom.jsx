import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setRoom, setPlayers,setStatus } from "../redux/features/game/gameSlice";
import { useSocket } from "../context/SocketContext";

const JoinRoom = () => {
  const [roomCode, setRoomCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const socket = useSocket();

  const handleJoinRoom = async (e) => {
    e.preventDefault();
    if (!roomCode) return;

    setLoading(true);
    setError("");

    // emit event to backend
    socket.emit("joinRoom", { roomId: roomCode });

    // listen for success
    socket.once("roomJoined", ({ roomId, players }) => {
      dispatch(setRoom(roomId));
      dispatch(setPlayers(players));
      dispatch(setStatus("waiting"));
      navigate(`/game-room/${roomId}`);
    });

    // listen for errors
    socket.once("errorJoining", (message) => {
      setError(message || "Unable to join room");
      setLoading(false);
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 to-purple-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Join a Game Room
        </h1>
        <form onSubmit={handleJoinRoom} className="space-y-5">
          <input
            type="text"
            placeholder="Enter Room Code"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
            required
            maxLength={6}
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-pink-400 text-center tracking-widest text-lg font-mono"
          />
          {error && <p className="text-red-500 font-medium">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-600 text-white py-2 rounded-md font-semibold hover:bg-pink-700 transition disabled:opacity-50"
          >
            {loading ? "Joining..." : "Join Room"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default JoinRoom;
