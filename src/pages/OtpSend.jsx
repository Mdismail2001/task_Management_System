import React, { useState } from "react";

const OtpSend = () => {
  const [otp, setOtp] = useState("");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Card */}
      <div className="bg-white shadow-lg rounded-2xl w-[400px] p-8">
        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Forgot Password
        </h1>
        <p className="text-sm text-gray-500 text-center mt-2">
          Enter the OTP sent to your email address
        </p>

        {/* Form */}
        <form className="mt-6 space-y-6">
          {/* OTP input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              OTP Code
            </label>
            <input
              type="text"
              maxLength="6"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6-digit OTP"
              className="w-full px-4 py-2 border rounded-lg text-center tracking-widest text-lg font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-[rgb(55,85,219)] text-white py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Recover Account
          </button>
        </form>

        {/* Resend OTP */}
        <p className="text-sm text-gray-500 text-center mt-6">
          Didn’t receive the OTP?{" "}
          <button
            type="button"
            className="text-[rgb(55,85,219)] font-medium hover:underline"
            onClick={() => alert("OTP Resent!")}
          >
            Resend
          </button>
        </p>
      </div>
    </div>
  );
};

export default OtpSend;
