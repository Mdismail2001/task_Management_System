import React from "react";
import { FaBell } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="w-full px-6 py-3 flex items-center justify-between ">
      {/* Search Bar */}
      <div className="flex items-center w-1/2">
        <input
          type="search"
          placeholder="Search..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(55,85,219)]"
        />
      </div>

      {/* Notification Icon */}
      <div className="flex items-center gap-4">
        <button className="relative">
          <FaBell className="text-gray-600 text-xl hover:text-[rgb(55,85,219)] transition" />
          {/* Notification Dot */}
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
