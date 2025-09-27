import React from "react";
import { useNavigate } from "react-router";

const TaskList = () => {

  const navigate = useNavigate();
  // Demo tasks
  const tasks = [
    { id: "T-101", title: "Design Homepage", status: "Pending" },
    { id: "T-102", title: "Develop API", status: "In Progress" },
    { id: "T-103", title: "Fix Login Bug", status: "Completed" },
    { id: "T-104", title: "Write Documentation", status: "Pending" },
    { id: "T-105", title: "Database Migration", status: "In Progress" },
    { id: "T-106", title: "UI Review", status: "Completed" },
    { id: "T-101", title: "Design Homepage", status: "Pending" },
    { id: "T-102", title: "Develop API", status: "In Progress" },
    { id: "T-103", title: "Fix Login Bug", status: "Completed" },
    { id: "T-104", title: "Write Documentation", status: "Pending" },
    { id: "T-105", title: "Database Migration", status: "In Progress" },
    { id: "T-106", title: "UI Review", status: "Completed" },

  ];

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between h-40 border border-gray-200"
        >
          {/* Top Row: Task ID + Status */}
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span className="font-semibold">{task.id}</span>
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${
                task.status === "Completed"
                  ? "bg-green-100 text-green-600"
                  : task.status === "In Progress"
                  ? "bg-yellow-100 text-yellow-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {task.status}
            </span>
          </div>

          {/* Middle: Task Title */}
          <h3 className="text-lg font-bold text-gray-800 text-center flex-1 flex items-center justify-center">
            {task.title}
          </h3>

          {/* Bottom: View Task */}
          <button onClick={()=> navigate('/home/user/task-view') } className="text-sm text-[rgb(55,85,219)] font-medium hover:underline self-start">
            View Task
          </button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
