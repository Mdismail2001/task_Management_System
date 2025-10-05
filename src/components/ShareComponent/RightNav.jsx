import React, { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

// ✅ Inline Reminder Component (Compact Sidebar Version)
const Reminder = () => {
  const [reminders, setReminders] = useState([
    { id: 1, title: "Submit Report", date: "2025-10-07", priority: "High" },
    { id: 2, title: "Team Meeting", date: "2025-10-09", priority: "Medium" },
    { id: 3, title: "Server Check", date: "2025-10-12", priority: "Low" },
  ]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "border-red-500";
      case "Medium":
        return "border-yellow-500";
      default:
        return "border-green-500";
    }
  };

  return (
    <div className="space-y-3">
      <h2 className="text-base font-semibold text-gray-800 mb-2">
        Upcoming Reminders
      </h2>
      <div className="max-h-[280px] overflow-y-auto pr-1">
        {reminders.map((r) => (
          <div
            key={r.id}
            className={`bg-gray-50 rounded-lg p-3 border-l-4 ${getPriorityColor(
              r.priority
            )} hover:shadow-sm transition`}
          >
            <p className="font-medium text-gray-800 text-sm truncate">
              {r.title}
            </p>
            <div className="flex justify-between items-center mt-1">
              <span className="text-xs text-gray-500">Due: {r.date}</span>
              <span
                className={`text-xs px-2 py-0.5 rounded-full ${
                  r.priority === "High"
                    ? "bg-red-100 text-red-600"
                    : r.priority === "Medium"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {r.priority}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ✅ Main RightNav Component
const RightNav = ({ setShowPopup, userImage, setSelectedDate }) => {
  const [isActive] = useState(true);
  const [activeTab, setActiveTab] = useState("calendar");
  const { user } = useContext(AuthContext);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="flex flex-col gap-6 bg-[#f5f7fc] h-screen pr-4 py-4">
      {/* User Profile Section */}
      <div className="flex flex-col items-center bg-white rounded-xl p-4 shadow-sm">
        <div className="relative">
          <img
            className="w-[90px] h-[90px] rounded-xl cursor-pointer object-cover"
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
          {user?.fullname}
        </h2>
        <p className="text-sm text-gray-500 text-center truncate w-full">
          {user?.email}
        </p>

        <button
          onClick={() => setShowPopup(true)}
          className="mt-4 w-[108px] h-[39px] bg-[#3755db] text-white rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          My Profile
        </button>
      </div>

      {/* Calendar / Reminder Switch */}
      <div className="flex flex-col bg-[#f5f7fc] py-4 rounded-xl">
        <div className="grid grid-cols-2 gap-2 w-full mb-3">
          {/* Calendar Button */}
          <button
            onClick={() => setActiveTab("calendar")}
            className={`px-3 py-2 text-sm rounded-lg transition ${
              activeTab === "calendar"
                ? "bg-[#3755db] text-white hover:bg-blue-600"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Calendar
          </button>

          {/* Reminder Button */}
          <button
            onClick={() => setActiveTab("reminder")}
            className={`px-3 py-2 text-sm rounded-lg transition ${
              activeTab === "reminder"
                ? "bg-[#3755db] text-white hover:bg-blue-600"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Reminder
          </button>
        </div>

        {/* Conditional Render Section */}
        <div className="bg-white rounded-xl shadow-sm p-3">
          {activeTab === "calendar" ? (
            <Calendar
              onChange={handleDateChange}
              className="react-calendar text-sm rounded"
              nextLabel={null}
              prevLabel={null}
            />
          ) : (
            <Reminder />
          )}
        </div>
      </div>
    </div>
  );
};

export default RightNav;
