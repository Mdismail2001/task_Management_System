import React, {  useState } from "react";
import { User, Mail, Lock } from "lucide-react"; // icons
import { useNavigate } from "react-router";

const ProfileEdit = () => {
  // Example user data (replace with props or context later)
  const [fullName, setFullName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@example.com");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ fullName, email, password });
    alert("Profile updated successfully!");
    navigate(-1);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div className="flex items-center border rounded-lg px-3 py-2">
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
        <div className="flex items-center border rounded-lg px-3 py-2">
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
        <div className="flex items-center border rounded-lg px-3 py-2">
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
  );
};

export default ProfileEdit;
