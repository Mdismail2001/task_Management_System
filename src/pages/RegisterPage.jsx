import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Left Section with Image & Text */}
      <div className="hidden lg:flex flex-col justify-center items-center w-1/2 p-10 relative">
        <div className="relative flex justify-center items-center">
          {/* Image with fixed size */}
          <img
            src="/src/assets/images/Frame 23.png"
            alt="Productivity"
            className="w-[688px] h-[984px] object-cover"
          />

          {/* Centered Text on Image */}
          <h1 className="absolute text-4xl font-bold leading-tight text-center text-white drop-shadow-lg">
            Take your <br /> productivity to the <br /> next level
          </h1>

          {/* Bottom Buttons + Text */}
          <div className="absolute bottom-6 flex flex-col items-center gap-3 w-full">
            <div className="flex gap-4">
              <button className="px-6 py-2 rounded-lg bg-yellow-400 text-black font-semibold shadow-md hover:bg-yellow-500">
                Button 1
              </button>
              <button className="px-6 py-2 rounded-lg bg-yellow-400 text-black font-semibold shadow-md hover:bg-yellow-500">
                Button 2
              </button>
            </div>
            <p className="text-sm text-white mt-2">
              © 2021 | All Rights Reserved
            </p>
          </div>
        </div>
      </div>

      {/* Right Section with Form */}
      <div className="flex flex-col justify-start items-center w-full lg:w-1/2 p-8 relative">
        {/* Login button top-right */}
        <div className="absolute top-6 right-6">
          <Link to ='/login' className="btn border-[rgb(55,85,219)] rounded-2xl">
            Login
          </Link>
        </div>

        {/* Form card with fixed size */}
        <div className="bg-white shadow-lg rounded-2xl p-8 mt-16 w-[384px] h-[569px]">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Create an Account
          </h2>

          <form className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                type="text"
                className="w-full input input-bordered"
                placeholder="Enter your name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full input input-bordered"
                placeholder="Enter your email"
              />
            </div>

            {/* Password with Eye Icon */}
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full input input-bordered pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Button */}
            <button className="w-full btn border-0 mt-4 bg-[rgb(55,85,219)] text-white rounded-2xl">
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
