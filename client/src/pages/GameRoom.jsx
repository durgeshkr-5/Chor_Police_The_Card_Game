import React, { useEffect, useState } from "react";

const rolesDisplayName = {
  Raja: "Raja (King)",
  Mantri: "Mantri (Minister)",
  Sipahi: "Sipahi (Police)",
  Chor: "Chor (Thief)",
};

const GameRoom = ({ roomCode, userId, socket }) => {
  const [role, setRole] = useState(null); // current player role
  const [players, setPlayers] = useState([]); // array of players with {id, name}
  const [guessTarget, setGuessTarget] = useState(null);
  const [guessPhase, setGuessPhase] = useState(false);
  const [roundResult, setRoundResult] = useState(null); // object with outcome details
  const [scoreboard, setScoreboard] = useState([]);

  useEffect(() => {
    // Join room event on mount
    if (socket) {
      socket.emit("joinRoom", { roomCode, userId });

      // Receive assigned role (private)
      socket.on("roleAssignment", (assignedRole) => {
        setRole(assignedRole);
      });

      // Receive updated player list
      socket.on("updatePlayers", (playersList) => {
        setPlayers(playersList);
      });

      // Sipahi guess phase started
      socket.on("guessPhaseStart", () => {
        setGuessPhase(true);
        setGuessTarget(null);
        setRoundResult(null);
      });

      // Guess result broadcast
      socket.on("roundResult", (result) => {
        setRoundResult(result);
        setGuessPhase(false);
      });

      // Scoreboard updates
      socket.on("scoreboard", (scores) => {
        setScoreboard(scores);
      });

      return () => {
        socket.off("roleAssignment");
        socket.off("updatePlayers");
        socket.off("guessPhaseStart");
        socket.off("roundResult");
        socket.off("scoreboard");
      };
    }
  }, [roomCode, socket, userId]);

  const handleGuess = (playerId) => {
    if (!guessPhase || !socket) return;
    socket.emit("sipahiGuess", { guess: playerId });
    setGuessPhase(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-6 flex flex-col max-w-5xl mx-auto">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          ChorPolice — Room:{" "}
          <span className="font-mono tracking-wide text-blue-600">{roomCode}</span>
        </h1>
        <div className="text-gray-600">
          Your Role:{" "}
          <span className="font-semibold text-lg text-indigo-700">
            {role ? rolesDisplayName[role] : "Loading..."}
          </span>
        </div>
      </header>

      <section className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-bold mb-4">Players in Room</h2>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {players.map((p) => (
            <li
              key={p.id}
              className={`p-4 rounded border cursor-pointer text-center ${
                guessPhase && p.id !== userId ? "hover:bg-blue-100" : ""
              }`}
              onClick={() => guessPhase && p.id !== userId && role === "Sipahi" && handleGuess(p.id)}
              title={guessPhase && role === "Sipahi" ? "Click to guess if this is Chor" : ""}
            >
              <div className="text-lg font-semibold">{p.name}</div>
              {/* Optionally obscure role */}
              {/* <div className="text-sm text-gray-500">{p.role}</div> */}
            </li>
          ))}
        </ul>
      </section>

      {guessPhase && role === "Sipahi" && (
        <div className="mb-6 text-center bg-yellow-100 p-4 rounded-lg border border-yellow-300 text-yellow-800 font-semibold">
          It's your turn! Guess who the <span className="font-bold">Chor</span> is by clicking on their name.
        </div>
      )}

      {roundResult && (
        <div className="mb-6 p-4 rounded-lg border border-green-400 bg-green-50 text-green-700">
          <h3 className="font-bold mb-2">Round Result</h3>
          <p>
            {roundResult.sipahiCorrect
              ? `Sipahi correctly guessed ${roundResult.chorName}!`
              : `Sipahi guessed wrong. ${roundResult.chorName} escaped!`}
          </p>
          <p>
            Scores updated. Raja: 1000 pts, Mantri: 800 pts, Sipahi:{" "}
            {roundResult.sipahiCorrect ? 500 : 0} pts, Chor:{" "}
            {roundResult.sipahiCorrect ? 0 : 500} pts.
          </p>
        </div>
      )}

      <section className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">Scoreboard</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="py-2">Player</th>
              <th className="py-2">Score</th>
            </tr>
          </thead>
          <tbody>
            {scoreboard.map(({ id, name, score }) => (
              <tr key={id} className="border-b border-gray-200">
                <td className="py-2">{name}</td>
                <td className="py-2 font-semibold">{score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default GameRoom;
