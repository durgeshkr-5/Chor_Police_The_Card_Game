import React, { useEffect, useState } from "react";
import axios from "axios";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // Replace with your API endpoint to get user game history
        const response = await axios.get("/api/history");
        setHistory(response.data.history || []);
      } catch (err) {
        setError("Failed to load history.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-6 mt-15">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-6">Game History</h1>

        {loading && <p>Loading history...</p>}

        {error && (
          <p className="text-red-500 font-medium mb-4">{error}</p>
        )}

        {!loading && history.length === 0 && (
          <p>You have no games played yet.</p>
        )}

        {!loading && history.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-300 bg-gray-100">
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Room Code</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Score</th>
                  <th className="py-3 px-4">Result</th>
                </tr>
              </thead>
              <tbody>
                {history.map((entry) => (
                  <tr key={entry._id} className="border-b border-gray-200">
                    <td className="py-2 px-4">
                      {new Date(entry.date).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 font-mono">{entry.roomCode}</td>
                    <td className="py-2 px-4">{entry.role}</td>
                    <td className="py-2 px-4 font-semibold">{entry.score}</td>
                    <td className="py-2 px-4">
                      {entry.result === "win" ? (
                        <span className="text-green-600 font-semibold">Win</span>
                      ) : (
                        <span className="text-red-600 font-semibold">Lose</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
