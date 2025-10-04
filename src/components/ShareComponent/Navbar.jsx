import React from "react";
import { IoNotificationsOutline, IoSearchOutline } from "react-icons/io5";

const Navbar = ({ setSearchQuery }) => {
  return (
    <div className="w-full px-6 py-3 flex items-center justify-between">
      {/* Search Bar */}
      <div className="relative flex items-center w-1/2">
        <input
          type="search"
          placeholder="Search tasks..."
          onChange={(e) => setSearchQuery(e.target.value)} // 🔍 send to RootAdmin
          className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(55,85,219)]"
        />
        <IoSearchOutline className="absolute right-3 text-gray-400 text-lg cursor-pointer" />
      </div>

      {/* Notification Icon */}
      <div className="flex items-center gap-4">
        <button className="relative">
          <IoNotificationsOutline className="text-xl text-[rgb(55,85,219)]" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
