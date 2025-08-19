/* eslint-disable no-unused-vars */
import React from "react";
import { Crown, User, ShieldAlert, UserX, Play } from "lucide-react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const roles = [
  { icon: Crown, name: "Raja", color: "text-yellow-500" },
  { icon: User, name: "Mantri", color: "text-green-500" },
  { icon: ShieldAlert, name: "Sipahi", color: "text-blue-500" },
  { icon: UserX, name: "Chor", color: "text-red-400" },
];

const Home = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth); // <-- check Redux state

  const handlePlayClick = () => {
    if (isLoggedIn) {
      navigate("/dashboard"); // ✅ logged in → dashboard
    } else {
      navigate("/signup"); // ❌ not logged in → signup
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-50 to-blue-100 flex flex-col items-center pt-20 px-3">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-3xl w-full flex flex-col items-center"
      >
        <img
          src="/logo.png"
          alt="ChorPolice Logo"
          className="h-40 w-45 mb-4 drop-shadow-lg"
        />
        <h1 className="text-5xl font-extrabold text-center mb-4 tracking-tight bg-gradient-to-r from-yellow-500 via-pink-500 to-blue-500 text-transparent bg-clip-text animate-pulse">
          ChorPolice
        </h1>
        <p className="text-lg md:text-xl text-gray-700 font-medium text-center mb-8 leading-relaxed">
          Relive the timeless childhood game of{" "}
          <span className="font-semibold text-yellow-600">Raja</span>,{" "}
          <span className="font-semibold text-green-600">Mantri</span>,{" "}
          <span className="font-semibold text-blue-600">Sipahi</span>, and{" "}
          <span className="font-semibold text-red-500">Chor</span>. Now with
          friends, online—anytime, anywhere!
        </p>
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <button
            onClick={handlePlayClick}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold text-xl shadow-lg hover:shadow-2xl hover:scale-105 transition"
          >
            <Play className="w-7 h-7" /> Play Now
          </button>
        </motion.div>
      </motion.div>

      {/* Nostalgia Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="mt-16 max-w-2xl w-full bg-white/70 backdrop-blur-md rounded-2xl shadow-lg p-10"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Nostalgia Corner ✨
        </h2>
        <p className="text-gray-700 text-lg mb-4 text-center">
          Remember sitting in circles, guessing the{" "}
          <span className="text-red-500 font-semibold">Chor</span>, cheering as
          the <span className="text-yellow-600 font-semibold">Raja</span>, and
          catching the culprit as{" "}
          <span className="text-blue-600 font-semibold">Sipahi</span>?
        </p>
        <p className="text-gray-600 text-center mb-8">
          With ChorPolice, those laughs, rivalries, and memories come alive
          again in a digital twist.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 justify-center">
          {roles.map((role) => (
            <motion.div
              key={role.name}
              whileHover={{ scale: 1.15 }}
              className="flex flex-col items-center bg-white/60 rounded-xl p-4 shadow hover:shadow-md transition"
            >
              <role.icon className={`w-10 h-10 ${role.color}`} />
              <span className="mt-2 font-bold">{role.name}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="text-gray-500 text-sm mt-20 mb-6 border-t pt-4 text-center w-full max-w-4xl">
        Made with ❤️ for every 90s kid | © {new Date().getFullYear()} ChorPolice
      </footer>
    </div>
  );
};

export default Home;
