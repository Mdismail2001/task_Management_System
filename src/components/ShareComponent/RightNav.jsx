import React, { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const RightNav = ({ setShowPopup, userImage }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isActive, setIsActive] = useState(true);
  const { user } = useContext(AuthContext);

  return (
    <div className="flex flex-col gap-6  bg-[#f5f7fc] h-screen pr-4 py-4">
      {/* User Profile */}
      <div className="flex flex-col items-center bg-white rounded  p-4">
        <div className="relative">
          <img
            className="w-[90px] h-[90px] rounded-xl cursor-pointer"
            src={userImage}
            alt="User"
          />
          <span
            className={`absolute top-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
              isActive ? "bg-green-500" : "bg-gray-400"
            }`}
          ></span>
        </div>

        <h2 className="mt-4 text-lg font-semibold text-gray-800 text-center truncate w-full">
          {user?.username}
        </h2>
        <p className="text-sm text-gray-500 text-center truncate w-full">
          {user?.email}
        </p>

        <button
          onClick={() => setShowPopup(true)}
          className="mt-4 w-[108px]  h-[39px] bg-[#3755db] text-white rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          My Profile
        </button>
      </div>

      {/* Calendar Buttons */}
      <div className="flex flex-col bg-[#f5f7fc] py-4  rounded-xl">
        <div className="grid grid-cols-2 gap-2 w-full mb-3">
          <button className="px-3 py-2 text-sm rounded-lg bg-[#3755db] text-white hover:bg-blue-600 transition">
            Calendar
          </button>
          <button className="px-3 py-2 text-sm rounded-lg bg-gray-200 hover:bg-gray-300 transition">
            Reminder
          </button>
        </div>

        {/* Calendar with arrows removed */}
        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          className="react-calendar text-sm mt-5"
          nextLabel={null}   // removes right arrow
          prevLabel={null}   // removes left arrow
        />
      </div>
    </div>
  );
};

export default RightNav;
