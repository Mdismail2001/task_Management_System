import React, { useContext, useState } from "react";
import { User, Bell, Mail, Check, X as XIcon } from "lucide-react"; // icons
import { useNavigate } from "react-router";
import { AuthContext } from '../Provider/AuthProvider';

const Settings = () => {
  const [fullName, setFullName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState("");
  const [desktopNotif, setDesktopNotif] = useState(true);
  const [desktopLevel, setDesktopLevel] = useState("Normal");
  const [emailNotif, setEmailNotif] = useState(false);
  const [emailLevel, setEmailLevel] = useState("Critical");
  const navigate = useNavigate();
  const {user} = useContext(AuthContext);
  console.log(user)

  const logout = () => {
    // Remove user and token from storage
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");

    // Redirect to login page
    navigate("/auth/login");
  };


  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg space-y-8">
      {/* Header: Title + Logout */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
          Log Out
        </button>
      </div>

      {/* Account Settings Form */}
      <div className="space-y-4">
        <p className="text-lg font-semibold">Account Settings</p>
        <form className="grid grid-cols-1 gap-4">
          {/* Full Name */}
          <div className="flex items-center border rounded-lg px-3 py-2">
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
          <div className="flex items-center border rounded-lg px-3 py-2">
            <Mail className="mr-2 text-gray-400" />
            <input
              type="email"
              placeholder={user.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full outline-none"
            />
          </div>

          {/* Password */}
          <div className="flex items-center border rounded-lg px-3 py-2">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full outline-none"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button onClick={()=> navigate('/home/admin/profile-edit')} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
              Edit
            </button>
          </div>
        </form>
      </div>

      {/* Notification Settings */}
      <div className="space-y-4">
        <p className="text-lg font-semibold">Notification Settings</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Desktop Notifications */}
          <div className="border rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2">
              <Bell className="text-gray-500" />
              <span>Allow desktop notifications</span>
              <span>
                {desktopNotif ? <Check className="text-green-500" /> : <XIcon className="text-red-500" />}
              </span>
            </div>
            <input
              type="text"
              placeholder="Notification Level"
              value={desktopLevel}
              onChange={(e) => setDesktopLevel(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 mt-2 outline-none"
            />
            <button
              className={`px-3 py-1 rounded font-semibold ${
                desktopNotif ? "bg-green-500 text-white" : "bg-gray-300"
              }`}
              onClick={() => setDesktopNotif(!desktopNotif)}
            >
              {desktopNotif ? "Enabled" : "Enable"}
            </button>
          </div>

          {/* Critical Email Notifications */}
          <div className="border rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2">
              <Mail className="text-gray-500" />
              <span>Send critical notifications to my email</span>
              <span>
                {emailNotif ? <Check className="text-green-500" /> : <XIcon className="text-red-500" />}
              </span>
            </div>
            <input
              type="text"
              placeholder="Notification Level"
              value={emailLevel}
              onChange={(e) => setEmailLevel(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 mt-2 outline-none"
            />
            <button
              className={`px-3 py-1 rounded font-semibold ${
                emailNotif ? "bg-green-500 text-white" : "bg-gray-300"
              }`}
              onClick={() => setEmailNotif(!emailNotif)}
            >
              {emailNotif ? "Enabled" : "Enable"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
