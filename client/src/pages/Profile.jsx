import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadUserFromStorage, logout } from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoggedIn } = useSelector((state) => state.auth);

  // Load user if refreshing the page
  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/"); // redirect to homepage
  };

  if (!isLoggedIn || !user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">
          Please login to see your profile
        </p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">User Profile</h2>
        <p className="mb-2">
          <span className="font-semibold">ID:</span> {user.id}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Name:</span> {user.name}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Email:</span> {user.email}
        </p>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-4 w-full bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
