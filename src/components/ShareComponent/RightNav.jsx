import React, { useContext, useState } from "react";
import { FaCalendarAlt, FaBell } from "react-icons/fa";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { AuthContext } from "../Provider/AuthProvider";

const RightNav = () => {
  const [date, setDate] = useState(new Date());
  const [isActive, setIsActive] = useState(true); // status light
  const [userImage, setUserImage] = useState();
  const {user} = useContext(AuthContext);
  // console.log(user)

  return (
    <div className=" bg-white shadow-lg flex flex-col items-center p-6 min-h-screen">
      {/* User Profile */}
      <div className="relative flex flex-col items-center">
        <img
          className="w-20 h-20 rounded-xl cursor-pointer"
          src="/src/assets/images/WhatsApp Image 2025-09-18 at 2.44.32 AM.jpeg"
          alt="User"
        />
        <span
          className={`absolute top-0 right-9 w-4 h-4 rounded-full border-2 border-white ${
            isActive ? "bg-green-500" : "bg-gray-400"
          }`}
        ></span>

        <h2 className="mt-4 text-lg font-semibold text-gray-800">{user.name}</h2>
        <p className="text-sm text-gray-500">john.doe@example.com</p>

        <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
          My Profile
        </button>
      </div>

      {/* Divider */}
      <hr className="w-full my-6 border-gray-200" />

      {/* Quick Actions */}
      <div className="w-full flex flex-col items-center gap-4">
        <div className="flex justify-between w-full ">
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
            <FaCalendarAlt className="text-blue-600" /> Calendar
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition">
            <FaBell className="text-yellow-500" /> Reminder
          </button>
        </div>

        {/* Calendar */}
        <div className="w-full">
          <Calendar
            onChange={setDate}
            value={date}
            className="rounded-lg overflow-hidden shadow-inner"
          />
        </div>
      </div>
    </div>
  );
};

export default RightNav;
