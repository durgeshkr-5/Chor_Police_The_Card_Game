import React, { useState } from "react";
import axios from "axios";

const CreateRoom = () => {
  const [roomCode, setRoomCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreateRoom = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("/api/rooms/create");
      setRoomCode(response.data.roomCode); // assuming backend returns roomCode
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create room");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-blue-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md text-center">
        <h1 className="text-3xl font-bold mb-6">Create a New Game Room</h1>
        <button
          onClick={handleCreateRoom}
          disabled={loading}
          className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Room"}
        </button>

        {roomCode && (
          <div className="mt-6 bg-green-100 border border-green-400 rounded-lg p-4 text-green-900 font-mono text-xl select-all">
            Room Code: <span>{roomCode}</span>
          </div>
        )}

        {error && (
          <p className="mt-4 text-red-500 font-medium">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default CreateRoom;
