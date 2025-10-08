import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/Provider/AuthProvider";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // get login from context

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const email = e.target.email.value;
      const password = e.target.password.value;

      const res = await fetch(
        "https://limegreen-wren-873008.hostingersite.com/api.php?endpoint=login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      if (!res.ok) {
        setErrorMsg("Invalid email or password.");
        return;
      }

      const data = await res.json();

      // update context state
      login(data.user, data.token);
      setSuccessMsg("Login successful! Redirecting...");

      if (data.user.role === "admin") {
        const taskRes = await fetch(
          `https://limegreen-wren-873008.hostingersite.com/api.php?endpoint=tasks&assigned_to_user_id=${data.user.id}`,
          {
            headers: { Authorization: `Bearer ${data.token}` },
          }
        );
        if (!taskRes.ok) {
          setErrorMsg("Failed to fetch tasks.");
          return;
        }

        const tasks = await taskRes.json();

        setTimeout(() => {
          if (tasks && tasks.length > 0) {
            navigate("/home/admin/all-task");
          } else {
            navigate("/home/admin");
          }
        }, 1000);
      } else {
        setTimeout(() => {
          navigate("/home/user");
        }, 1000);
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="grid grid-cols-12 h-screen">
      {/* Left Side - Login Form */}
      <div className="col-span-12 lg:col-span-6 flex justify-center items-center bg-gray-50">
        <div className="w-full max-w-sm p-8">
          <h2 className="text-2xl font-bold mb-6">Welcome Back</h2>

          {/* ✅ Show Messages */}
          {errorMsg && (
            <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded-lg">
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="mb-4 p-3 text-sm text-green-700 bg-green-100 rounded-lg">
              {successMsg}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleLogin}>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Enter Your Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full p-3 shadow rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Enter Your Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  className="w-full p-3 shadow rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Remember Me + Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" />
                Keep me signed in
              </label>
              <a href="#" className="text-blue-600 hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-[#3755db] text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
            >
              Log In
            </button>
          </form>
        </div>
      </div>

      {/* Right Side - Background Image */}
      <div className="col-span-12 lg:col-span-6 relative flex flex-col justify-between items-center text-white p-8 overflow-hidden">
        {/* Rotated background */}
        <div
          className="absolute inset-0 bg-cover bg-center transform -rotate-180"
          style={{
            backgroundImage: "url('/src/assets/images/Frame 23.png')",
          }}
        ></div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Centered Text */}
        <div className="relative z-10 flex-1 flex flex-col justify-center items-center text-center">
          <h2 className="text-3xl font-bold max-w-sm">
            Take your productivity to the next level.
          </h2>
        </div>

        {/* Copyright */}
        <div className="relative z-10 w-full text-center space-y-2">
          <p className="mt-4 text-xs">Copyright 2021 | All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
