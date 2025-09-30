import React from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DeleteTask = () => {
  const navigate = useNavigate();

  // Example task
  const task = { title: "Task Title Example", status: "Pending" };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      {/* Modal */}
      <div className="bg-white p-6 rounded-2xl shadow-lg w-[90%] max-w-md relative">
        {/* Cross icon */}
        <button
          onClick={() => navigate(-1)} // go back to previous page
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          <X size={20} />
        </button>

        <h1 className="text-xl font-semibold mb-4">Delete Task</h1>
        <p className="mb-6 text-gray-700">
          Are you sure you want to delete this task{" "}
          <span className="font-medium">{task.title}</span>? It is currently{" "}
          <span className="italic">{task.status}</span>.
        </p>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={() => {
              alert("Deleted!");
              navigate(-1); // after delete, go back too
            }}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
          >
            Yes
          </button>
          <button
            onClick={() => navigate(-1)} // back page
            className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTask;
