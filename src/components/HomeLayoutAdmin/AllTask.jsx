import React from "react";
import { useNavigate } from "react-router";

const AllTask = () => {
const navigate = useNavigate();
  // Demo tasks
  const tasks = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    title: `Task ${i + 1}`,
    status: ["Pending", "In Progress", "Completed"][i % 3],
  }));

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      {/* Header + Button */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Tasks</h1>
        <button onClick={()=> navigate('/home/admin/create-task')} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          Create Task
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex justify-between border-b mb-6">
        <a href="#" className="py-2 border-b-2 border-transparent hover:border-blue-600 transition">
          All Tasks
        </a>
        <a href="#" className="py-2 border-b-2 border-transparent hover:border-blue-600 transition">
          Pending
        </a>
        <a href="#" className="py-2 border-b-2 border-transparent hover:border-blue-600 transition">
          In Progress
        </a>
        <a href="#" className="py-2 border-b-2 border-transparent hover:border-blue-600 transition">
          Completed
        </a>
      </div>

      {/* Task Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">{task.title}</h2>
            <p className="text-gray-600">Status: {task.status}</p>
            <button onClick={()=> navigate('/home/admin/view')} className="mt-4 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition">
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTask;
