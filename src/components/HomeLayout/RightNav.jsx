import React, { useState } from "react";
import { FaUserCircle, FaCalendarAlt, FaBell } from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css"; // Import default calendar styles

const RightNav = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className=" h-screen bg-white shadow-lg flex flex-col items-center p-6">
      {/* User Profile */}
      <div className="flex flex-col items-center">
        <FaUserCircle size={80} className="text-gray-400" />
        <h2 className="mt-4 text-lg font-semibold text-gray-800">John Doe</h2>
        <p className="text-sm text-gray-500">john.doe@example.com</p>
        <button className="mt-4 px-6 py-2 bg-[rgb(55,85,219)] text-white rounded-lg shadow-md hover:bg-blue-700 transition">
          My Profile
        </button>
      </div>

      {/* Divider */}
      <hr className="w-full my-6 border-gray-200" />

      {/* Quick Actions */}
      <div className="w-full bg-gray-100">
        <div className="flex justify-around mb-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
            <FaCalendarAlt className="text-blue-600" /> Calendar
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
            <FaBell className="text-yellow-500" /> Reminder
          </button>
        </div>

        {/* Calendar */}
        <div className=" rounded-lg p-2 shadow-inner">
          <Calendar onChange={setDate} value={date} />
        </div>
      </div>
    </div>
  );
};

export default RightNav;
