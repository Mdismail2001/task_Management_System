import React, { useContext } from "react";
import { useNavigate } from "react-router";
import Banner from "./Banner";
import { AuthContext } from "../Provider/AuthProvider";
import { ClipboardList, CheckCircle, Clock, Star } from "lucide-react";

const MainContainer = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-[#f5f7fc]">
      {/*  Banner */}
      <Banner />

      {/*  Main Dashboard Section */}
      <div className="container mx-auto px-6 py-10">

        {/*  Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Pending Tasks */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-600 font-semibold">Pending Tasks</h3>
              <Clock className="text-yellow-500" size={24} />
            </div>
            <p className="text-3xl font-bold text-gray-800 mt-3">8</p>
            <p className="text-sm text-gray-500 mt-1">Tasks waiting for action</p>
          </div>

          {/* In Progress */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-600 font-semibold">In Progress</h3>
              <ClipboardList className="text-blue-500" size={24} />
            </div>
            <p className="text-3xl font-bold text-gray-800 mt-3">5</p>
            <p className="text-sm text-gray-500 mt-1">Tasks you’re working on</p>
          </div>

          {/* Completed */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <div className="flex items-center justify-between">
              <h3 className="text-gray-600 font-semibold">Completed</h3>
              <CheckCircle className="text-green-500" size={24} />
            </div>
            <p className="text-3xl font-bold text-gray-800 mt-3">12</p>
            <p className="text-sm text-gray-500 mt-1">Tasks done this week</p>
          </div>
        </div>

        {/*  Productivity Tip Section */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between shadow-lg mb-10">
          <div className="mb-6 md:mb-0 md:w-3/4">
            <h2 className="text-2xl font-bold mb-2">
              “Plan your day, achieve your goals.”
            </h2>
            <p className="text-white/80">
              Manage your time wisely — focus on the most important tasks first.  
              Every small win keeps you moving forward.
            </p>
          </div>
          <button
            onClick={() => navigate("/home/user/task")}
            className="bg-white text-[rgb(55,85,219)] font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-gray-100 transition"
          >
            View My Tasks
          </button>
        </div>

        {/*  Featured / Upcoming Tasks */}
        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Star className="text-yellow-500" /> Upcoming Tasks
            </h3>
            <button
              onClick={() => navigate("/home/user/task")}
              className="text-blue-600 text-sm font-medium hover:underline"
            >
              View All
            </button>
          </div>

          {/* Sample Tasks List */}
          <ul className="divide-y divide-gray-200">
            {[
              { title: "Submit weekly progress report", deadline: "Oct 8, 2025" },
              { title: "Design meeting with UI team", deadline: "Oct 9, 2025" },
              { title: "Client feedback revision", deadline: "Oct 10, 2025" },
            ].map((task, index) => (
              <li
                key={index}
                className="py-4 flex justify-between items-center hover:bg-gray-50 rounded-lg px-2 transition"
              >
                <div>
                  <p className="text-gray-800 font-medium">{task.title}</p>
                  <p className="text-gray-500 text-sm">
                    Deadline: {task.deadline}
                  </p>
                </div>
                <button
                  onClick={() => navigate("/home/user/task")}
                  className="text-sm text-[rgb(55,85,219)] font-medium hover:underline"
                >
                  View
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
