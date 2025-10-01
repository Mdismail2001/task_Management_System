import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/Provider/AuthProvider";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); //  get login from context

  const handleLogin = async (e) => {
    e.preventDefault();
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

      if (!res.ok) throw new Error("Login failed");

      const data = await res.json();

      //  use context login so state updates immediately
      login(data.user, data.token);

      //  navigate by role
      if (data.user.role === "admin") {
        navigate("/home/admin");
      } else {
        navigate("/home/user");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="grid grid-cols-12 h-screen">
      {/* Left Side - Login Form */}
      <div className="col-span-12 lg:col-span-6 flex justify-center items-center bg-gray-50">
        <div className="w-full max-w-sm p-8">
          <h2 className="text-2xl font-bold mb-6">Welcome Back</h2>

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

            {/* Password with Eye Icon */}
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
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Log In
            </button>
          </form>
        </div>
      </div>

      {/* Right Side - Rotated Background Image */}
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

        {/* Create Account Button */}
        <div className="absolute top-6 right-6 z-10">
          <Link
            to="/auth/register"
            className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium shadow hover:bg-gray-100"
          >
            Create Account
          </Link>
        </div>

        {/* Centered Text */}
        <div className="relative z-10 flex-1 flex flex-col justify-center items-center text-center">
          <h2 className="text-3xl font-bold max-w-sm">
            Take your productivity to the next level.
          </h2>
        </div>

        {/* Mobile App Buttons */}
        <div className="relative z-10 w-full text-center space-y-2">
          <p className="text-sm">Get the Mobile App</p>
          <div className="flex justify-center gap-4">
            <button className="bg-yellow-500 text-black px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600">
              Download
            </button>
            <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100">
              Download
            </button>
          </div>
          <p className="mt-4 text-xs">Copyright 2021 | All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
