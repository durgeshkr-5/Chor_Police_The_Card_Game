import React, { useState, useRef, useEffect } from "react";
import { Menu, User, LogIn, LogOut, LayoutDashboard, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/features/auth/authSlice"; // <-- adjust path

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth); // <-- get auth state

  const profileRef = useRef(null);
  const mobileRef = useRef(null);

  // Close profile dropdown if click outside
  useEffect(() => {
    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    if (profileOpen) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [profileOpen]);

  // Mobile drawer: close on click outside
  useEffect(() => {
    const handleClick = (e) => {
      if (mobileRef.current && !mobileRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
    };
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("mousedown", handleClick);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("mousedown", handleClick);
    };
  }, [mobileOpen]);

  const handleLogout = () => {
    dispatch(logout()); // <-- clears token & user from Redux + localStorage
    setProfileOpen(false);
    setMobileOpen(false);
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="h-8 w-8" />
          <span className="font-bold text-xl text-gray-800">ChorPolice</span>
        </Link>

        {/* Right: Desktop/Tablet */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            to="/dashboard"
            className="flex items-center gap-1 hover:text-blue-600"
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </Link>

          <div className="relative" ref={profileRef}>
            <button
              className="flex items-center gap-1 rounded-full p-2 hover:bg-gray-100 focus:outline-none"
              onClick={() => setProfileOpen((v) => !v)}
            >
              <User className="w-6 h-6" />
            </button>
            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-44 bg-white border rounded-md shadow-lg flex flex-col"
                >
                  <Link
                    to="/profile"
                    className="px-4 py-2 hover:bg-gray-100 text-gray-700"
                    onClick={() => setProfileOpen(false)}
                  >
                    Profile
                  </Link>
                  {isLoggedIn ? (
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-red-500"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  ) : (
                    <Link
                      to="/login"
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-blue-500"
                      onClick={() => setProfileOpen(false)}
                    >
                      <LogIn className="w-4 h-4" /> Login
                    </Link>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Hamburger Mobile */}
        <div className="md:hidden flex items-center">
          <button
            className="p-2 rounded hover:bg-gray-100 focus:outline-none"
            onClick={() => setMobileOpen(true)}
            aria-label="Open mobile menu"
          >
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black z-40"
            />
            <motion.div
              key="drawer"
              ref={mobileRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 w-64 h-full bg-white shadow-xl z-50 flex flex-col pt-6"
            >
              <button
                className="self-end mr-4 mt-2 p-2 rounded hover:bg-gray-100"
                onClick={() => setMobileOpen(false)}
                aria-label="Close mobile menu"
              >
                <X className="w-7 h-7" />
              </button>
              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-6 py-4 hover:bg-gray-100 text-gray-800"
                onClick={() => setMobileOpen(false)}
              >
                <LayoutDashboard className="w-5 h-5" /> Dashboard
              </Link>
              <Link
                to="/profile"
                className="flex items-center gap-2 px-6 py-4 hover:bg-gray-100 text-gray-800"
                onClick={() => setMobileOpen(false)}
              >
                <User className="w-5 h-5" /> Profile
              </Link>
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-6 py-4 hover:bg-gray-100 text-red-500"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center gap-2 px-6 py-4 hover:bg-gray-100 text-blue-500"
                  onClick={() => setMobileOpen(false)}
                >
                  <LogIn className="w-4 h-4" /> Login
                </Link>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
