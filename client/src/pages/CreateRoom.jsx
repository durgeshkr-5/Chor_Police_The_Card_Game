// pages/CreateRoom.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketContext";
import { setRoom, setPlayers, setStatus } from "../redux/features/game/gameSlice";




const CreateRoom = () => {
    const {user} = useSelector((state) => state.auth)
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const socket = useSocket();

  const handleCreateRoom = (e) => {
    e.preventDefault();
    if (!name) return;

    socket.emit("createRoom", { userId: user.id, name:user.name });

    socket.once("roomCreated", ({ roomId, players }) => {
      dispatch(setRoom(roomId));
      dispatch(setPlayers(players));
      dispatch(setStatus("waiting"));
      navigate(`/game-room/${roomId}`);
    });

    socket.once("errorCreating", (msg) => {
      alert(msg);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
        <pre>
            <code>
                state:{JSON.stringify(user)}
            </code>
        </pre>
      <h1 className="text-2xl font-bold mb-4">Create a Room</h1>
      <form onSubmit={handleCreateRoom} className="space-y-4">
        <input
          type="text"
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="px-3 py-2 border rounded"
        />
        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
          Create Room
        </button>
      </form>
    </div>
  );
};

export default CreateRoom;
