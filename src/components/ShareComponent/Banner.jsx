import React from "react";
import { FaTimes } from "react-icons/fa";

const Banner = () => {
  return (
    <div className="relative w-full rounded-2xl overflow-hidden shadow-lg">
      {/* Background Image */}
      <img
        src="/src/assets/images/Frame 419.png"
        alt="Banner"
        className="w-full h-40 md:h-56 lg:h-64 object-cover"
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 flex items-start justify-start px-6 py-6 text-white">
        {/* Left side - Heading */}
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">
          Welcome to Help <br /> Your Workspace
        </h2>
      </div>

      {/* Button - Bottom Right */}
      <button className="absolute bottom-4 right-4 px-6 py-3 bg-[rgb(55,85,219)] rounded-lg shadow-md hover:bg-blue-700 transition">
        Get Started
      </button>

      {/* Cross/Close Icon - Top Right */}
      <button className="absolute top-4 right-4 text-white text-xl hover:text-red-400 transition">
        <FaTimes />
      </button>
    </div>
  );
};

export default Banner;
