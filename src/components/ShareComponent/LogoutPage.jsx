import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { AuthContext } from "../Provider/AuthProvider"; // adjust path if needed

const LogoutPage = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext); // assume you have logout in AuthProvider

  const handleLogout = () => {
    logout(); // clear session
    navigate("/auth/login"); // redirect to login
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50">
      {/* Card */}
      <div className="bg-white w-[90%] max-w-md p-6 rounded-2xl shadow-lg relative text-center">
        {/* Close button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          <X size={20} />
        </button>

        {/* Title */}
        <h1 className="text-2xl font-bold mb-4">Confirm Logout</h1>
        <p className="text-gray-600 mb-6">
          Are you sure you want to log out of your account?
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPage;
