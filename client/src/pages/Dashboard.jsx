import React from "react";
import { Link } from "react-router-dom";

const Dashboard = ({ user }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-6 mt-15">
      <header className="max-w-4xl mx-auto mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">
          Welcome back, <span className="text-blue-600">{user?.name || "Player"}</span>!
        </h1>
        <p className="mt-2 text-gray-700">
          Get ready to play ChorPolice — the classic Raja, Mantri, Chor, Sipahi game reinvented for online fun.
        </p>
      </header>

      <main className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Create Room */}
        <Link
          to="/create-room"
          className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center hover:shadow-lg transition cursor-pointer"
        >
          <div className="text-blue-600 text-6xl mb-4 select-none">🎲</div>
          <h2 className="text-xl font-semibold mb-2">Create a Game Room</h2>
          <p className="text-center text-gray-600">
            Start a new game and invite your friends with a room code.
          </p>
        </Link>

        {/* Join Room */}
        <Link
          to="/join-room"
          className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center hover:shadow-lg transition cursor-pointer"
        >
          <div className="text-green-600 text-6xl mb-4 select-none">🔑</div>
          <h2 className="text-xl font-semibold mb-2">Join a Game Room</h2>
          <p className="text-center text-gray-600">
            Enter a code to join a friend’s game instantly.
          </p>
        </Link>

        {/* Game History */}
        <Link
          to="/history"
          className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center justify-center hover:shadow-lg transition cursor-pointer"
        >
          <div className="text-purple-600 text-6xl mb-4 select-none">📜</div>
          <h2 className="text-xl font-semibold mb-2">Game History</h2>
          <p className="text-center text-gray-600">
            Review your past games and scores to improve your strategy.
          </p>
        </Link>
      </main>
    </div>
  );
};

export default Dashboard;
