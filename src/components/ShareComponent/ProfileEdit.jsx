import React, { useState } from "react";
import { User, Mail, Lock, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfileEdit = () => {
  const [fullName, setFullName] = useState("admin");
  const [email, setEmail] = useState("admin@gmail.com");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ fullName, email, password });
    alert("Profile updated successfully!");
    navigate(-1); // ✅ back to previous page
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
      onClick={() => navigate(-1)} // ✅ close when clicking outside modal
    >
      {/* Modal */}
      <div
        className="bg-white w-[90%] max-w-2xl p-6 shadow-lg rounded-2xl relative"
        onClick={(e) => e.stopPropagation()} // stop outside close
      >
        {/* Close (X) button */}
        <button
          onClick={() => navigate(-1)} // ✅ one click → go back
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          <X size={20} />
        </button>

        {/* Title */}
        <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="flex items-center shadow rounded-lg px-3 py-2">
            <User className="mr-2 text-gray-400" />
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full outline-none"
            />
          </div>

          {/* Email */}
          <div className="flex items-center shadow rounded-lg px-3 py-2">
            <Mail className="mr-2 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full outline-none"
            />
          </div>

          {/* Password */}
          <div className="flex items-center shadow rounded-lg px-3 py-2">
            <Lock className="mr-2 text-gray-400" />
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full outline-none"
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEdit;
