import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CoverPage = () => {
  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30 z-0"></div>

      {/* Content Section */}
      <div className="relative z-10 flex flex-col justify-center items-center text-center px-8 max-w-2xl">
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to <span className="text-yellow-400">Our Platform</span>
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl mb-8 text-gray-200"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Manage your events, connect with your community, and explore new
          opportunities with ease.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex gap-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <Link
            to="/auth/login"
            className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
          >
            Get Started
          </Link>
          <Link
            to="/auth/register"
            className="bg-transparent border border-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-700 transition"
          >
            Learn More
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default CoverPage;
