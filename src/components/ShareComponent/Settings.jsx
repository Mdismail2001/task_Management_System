import React, { useContext, useState } from "react";
import { User, Bell, Mail, Eye, EyeOff } from "lucide-react"; // added Eye, EyeOff
import { useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";

const Settings = () => {
  const [fullName, setFullName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // state for toggle
  const [desktopNotif, setDesktopNotif] = useState(true);
  const [emailNotif, setEmailNotif] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const logout = () => {
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    navigate("/auth/login");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <button
          onClick={logout}
          className="bg-[#b8001f] text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
        >
          Log Out
        </button>
      </div>

      {/* Account Settings */}
      <div className="space-y-4">
        <p className="text-lg font-semibold">Account Settings</p>
        <form className="grid grid-cols-1 gap-4">
          {/* Full Name */}
          <div className="flex items-center shadow rounded-lg px-3 py-2">
            <User className="mr-2 text-gray-400" />
            <input
              type="text"
              placeholder={user.username}
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
              placeholder={user.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full outline-none"
            />
          </div>

          {/* Password with eye toggle */}
          <div className="flex items-center shadow rounded-lg px-3 py-2 relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full outline-none pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              onClick={() => navigate("/home/admin/profile-edit")}
              className=" bg-[#3755db] text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition"
            >
              Edit
            </button>
          </div>
        </form>
      </div>

      {/* Notification Settings */}
      <div className="space-y-4">
        <p className="text-lg font-semibold">Notification Settings</p>

        {/* Desktop Notifications */}
        <div className="flex items-center shadow rounded-lg px-3 py-2 justify-between">
          <div className="flex items-center gap-2">
            <Bell className="text-gray-500" />
            <span>Desktop Notifications</span>
          </div>
          {/* Toggle Switch */}
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={desktopNotif}
              onChange={() => setDesktopNotif(!desktopNotif)}
            />
            <div className="w-11 h-6 bg-gray-300 peer-checked:bg-[#3755db] rounded-full peer transition"></div>
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition peer-checked:translate-x-5"></div>
          </label>
        </div>

        {/* Email Notifications */}
        <div className="flex items-center shadow rounded-lg px-3 py-2 justify-between">
          <div className="flex items-center gap-2">
            <Mail className="text-gray-500" />
            <span>Email Notifications</span>
          </div>
          {/* Toggle Switch */}
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={emailNotif}
              onChange={() => setEmailNotif(!emailNotif)}
            />
            <div className="w-11 h-6 bg-gray-300 peer-checked:bg-[#3755db] rounded-full peer transition"></div>
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition peer-checked:translate-x-5"></div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Settings;
