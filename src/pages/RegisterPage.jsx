import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="grid grid-cols-12 h-screen">
      {/* Left Side - Background Image */}
      <div className="col-span-12 lg:col-span-6 relative flex flex-col justify-between items-center text-white p-8 overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/src/assets/images/Frame 23.png')",
          }}
        ></div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30"></div>

        {/* Centered Text */}
        <div className="relative z-10 flex-1 flex flex-col justify-center items-center text-center">
          <h2 className="text-3xl font-bold max-w-sm">
            Join us and unlock new possibilities.
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

      {/* Right Side - Register Form */}
      <div className="col-span-12 lg:col-span-6 flex justify-center items-center bg-gray-50 relative">
        {/* Login Button (top-right corner of form side) */}
        <div className="absolute top-6 right-6">
          <Link to ="/auth/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium shadow hover:bg-blue-700">
            Login
          </Link>
        </div>

        <div className="w-full max-w-sm p-8">
          <h2 className="text-2xl font-bold mb-6">Create Account</h2>

          <form className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
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

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
