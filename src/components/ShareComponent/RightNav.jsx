import React, { useContext, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { AuthContext } from "../Provider/AuthProvider";

const RightNav = ({ setShowPopup, userImage }) => {
  const [date, setDate] = useState(new Date());
  const [isActive, setIsActive] = useState(true);
  const { user } = useContext(AuthContext);

  return (
    <div className="  flex flex-col items-center -2 min-h-screen fixed  p-2  mt-4">
      {/* User Profile */}
      <div className="relative flex flex-col items-center">
        <img
          className="w-20 h-20 rounded-xl cursor-pointer"
          src={userImage}
          alt="User"
        />
        <span
          className={`absolute top-0 right-5 w-4 h-4 rounded-full border-2 border-white ${
            isActive ? "bg-green-500" : "bg-gray-400"
          }`}
        ></span>

        <h2 className="mt-4 text-lg font-semibold text-gray-800">
          {user?.username}
        </h2>
        <p className="text-sm text-gray-500">{user?.email}</p>

        <button
          onClick={() => setShowPopup(true)}
          className="mt-4 px-4 py-2 bg-[#3755db] text-white rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          My Profile
        </button>
      </div>

      {/* Divider */}
      {/* <hr className="w-full my-6 border-gray-200" /> */}

          <div className=" flex flex-col items-center  bg-[#f5f7fc] py-2 rounded-xl mt-5">
        <div className="flex justify-between w-full p-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#3755db] text-white rounded-lg hover:bg-blue-600 transition">
            Calendar
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition">
            Reminder
          </button>
        </div>

        {/* Calendar */}
        <div className="w-full ">
          <DayPicker
            mode="single"
            selected={date}
            onSelect={setDate}
            className="bg-transparent p-2 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default RightNav;
