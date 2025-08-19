import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const JoinRoom = () => {
  const [roomCode, setRoomCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleJoinRoom = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // Replace with your backend API to verify or join room
      const response = await axios.post("/api/rooms/join", { roomCode });
      if (response.data.success) {
        // Navigate to game room page with room code param
        navigate(`/game-room/${roomCode}`);
      } else {
        setError(response.data.message || "Unable to join room");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error joining room");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 to-purple-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Join a Game Room</h1>
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
          {error && (
            <p className="text-red-500 font-medium">{error}</p>
          )}
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
