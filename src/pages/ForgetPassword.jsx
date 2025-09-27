import React from "react";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const navigate = useNavigate();

  const handleNext = (e) => {
    e.preventDefault(); // prevent refresh
    navigate("/otp");   // redirect to OTP page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl w-[400px] p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Forget Password
        </h1>
        <p className="text-sm text-gray-500 text-center mt-2">
          Enter your registered email address and we’ll send you instructions to
          reset your password.
        </p>

        {/* Form */}
        <form className="mt-6 space-y-4" onSubmit={handleNext}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[rgb(55,85,219)] text-white py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Next
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-6">
          Remember your password?{" "}
          <a href="/login" className="text-[rgb(55,85,219)] hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgetPassword;
