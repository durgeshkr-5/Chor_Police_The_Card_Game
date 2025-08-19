import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUserFromStorage } from "./redux/features/auth/authSlice";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import CreateRoom from "./pages/CreateRoom";
import JoinRoom from "./pages/JoinRoom";
import GameRoom from "./pages/GameRoom";
import History from "./pages/History";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserFromStorage()); // restore user + token from localStorage
  }, [dispatch]);

  return (
    <div>
      <Navbar />

      {/* routes */}

      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/signup"} element={<Signup />} />
        <Route path={"/login"} element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path={"/profile"}
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path={"/create-room"}
          element={
            <ProtectedRoute>
              <CreateRoom />
            </ProtectedRoute>
          }
        />
        <Route
          path={"/join-room"}
          element={
            <ProtectedRoute>
              <JoinRoom />
            </ProtectedRoute>
          }
        />
        <Route
          path={"/game-room"}
          element={
            <ProtectedRoute>
              <GameRoom />
            </ProtectedRoute>
          }
        />
        <Route
          path={"/history"}
          element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
