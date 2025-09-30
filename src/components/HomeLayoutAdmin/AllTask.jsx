import React, { useState } from "react";
import { useNavigate } from "react-router";
import { FaArrowRight } from "react-icons/fa";

const AllTask = () => {
  const navigate = useNavigate();

  // Active tab state
  const [activeTab, setActiveTab] = useState("All");

  // Demo tasks
  const tasks = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    title: `Task ${i + 1}`,
    description: `This is a short description for Task ${i + 1}.`,
    status: ["Pending", "In Progress", "Completed"][i % 3],
  }));

  // Status badge color for task cards
  const getStatusClasses = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "In Progress":
        return "bg-blue-100 text-[#3755db]";
      case "Completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Count tasks by status
  const counts = {
    All: tasks.length,
    Pending: tasks.filter((t) => t.status === "Pending").length,
    "In Progress": tasks.filter((t) => t.status === "In Progress").length,
    Completed: tasks.filter((t) => t.status === "Completed").length,
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      {/* Header */}
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h1 className="text-2xl text-blue-900 font-bold">Tasks</h1>
          <p className="text-gray-600">Your tasks in your space.</p>
        </div>
        <button
          onClick={() => navigate("/home/admin/create-task")}
          className="bg-[#3755db] text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Create Task
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b mb-6">
        {["All", "Pending", "In Progress", "Completed"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 flex items-center justify-between px-8 py-3 border-b-2 transition ${
              activeTab === tab
                ? "border-[#3755db] text-[#3755db] font-semibold bg-blue-50"
                : "border-transparent text-gray-600  hover:bg-gray-50"
            }`}
          >
            <span>{tab}</span>
            <span
              className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-medium ${
                activeTab === tab
                  ? "bg-[#3755db] text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {counts[tab]}
            </span>
          </button>
        ))}
      </div>

      {/* Task Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks
          .filter((task) => activeTab === "All" || task.status === activeTab)
          .map((task) => (
            <div
              key={task.id}
              className="bg-white rounded-lg p-4 shadow hover:shadow-lg transition flex flex-col justify-between"
            >
              {/* Top Row: ID left, Status badge right */}
              <div className="flex justify-between items-center mb-3">
                <p className="font-semibold text-gray-800">#{task.id}</p>
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusClasses(
                    task.status
                  )}`}
                >
                  {task.status}
                </span>
              </div>

              {/* Task Title + Description */}
              <div className="mb-4 flex-1">
                <h2 className="text-lg font-semibold text-gray-900">
                  {task.description}
                </h2>
              </div>

              {/* View Task with Text + Arrow */}
              <button
                onClick={() => navigate("/home/admin/view")}
                className="flex items-center gap-2 text-[#3755db] font-medium hover:text-blue-600 transition"
              >
                View Task <FaArrowRight size={14} />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AllTask;
