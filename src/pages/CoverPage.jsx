import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CoverPage = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="relative flex flex-col justify-center items-center min-h-screen bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white overflow-hidden">
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

          {/* Learn More opens modal */}
          <button
            onClick={() => setShowModal(true)}
            className="bg-transparent border border-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-700 transition"
          >
            Learn More
          </button>
        </motion.div>
      </div>

      {/* ✅ Modal Section */}
      {showModal && (
        <motion.div
          className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white text-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-lg relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black text-2xl"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold mb-4 text-center text-blue-900">
              About Our Platform
            </h2>
            <p className="mb-4 text-gray-700 text-justify">
              Our platform is designed to help individuals and teams stay organized,
              track their progress, and collaborate efficiently. Whether you’re
              managing personal tasks or coordinating with a team, everything you
              need is in one place.
            </p>

            <ul className="list-disc list-inside space-y-2 mb-6 text-gray-700">
              <li>✅ Create, assign, and monitor tasks easily</li>
              <li>✅ Set deadlines and receive reminders</li>
              <li>✅ Collaborate and communicate with team members</li>
              <li>✅ Boost productivity and minimize confusion</li>
            </ul>

            <div className="flex justify-center">
              <Link
                to="/auth/login"
                onClick={() => setShowModal(false)}
                className="bg-[#3755db] text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 transition"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default CoverPage;
