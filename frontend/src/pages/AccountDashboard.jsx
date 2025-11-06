// frontend/src/pages/AccountDashboard.jsx
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserEdit, FaHome, FaSignOutAlt } from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const AccountDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout(); // clears user from context/localStorage
    navigate("/login"); // redirect to login page
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      {/* Sign Out Button (Top Right Corner) */}
      <button
        onClick={handleLogout}
        className="absolute top-5 right-5 flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg shadow-md transition-all"
      >
        <FaSignOutAlt /> Sign Out
      </button>

      {/* Main Account Settings Card */}
      <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md text-center">
        <h1 className="text-2xl font-semibold mb-8">Your Account Settings</h1>

        <div className="space-y-5">
          <button
            onClick={() => navigate("/account/profile")}
            className="flex items-center justify-center gap-3 bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 px-6 rounded-lg w-full"
          >
            <FaUserEdit /> Edit Profile
          </button>

          <button
            onClick={() => navigate("/account/address")}
            className="flex items-center justify-center gap-3 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg w-full"
          >
            <FaHome /> Manage Addresses
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountDashboard;
