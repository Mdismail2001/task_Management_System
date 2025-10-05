import React from "react";
import { Trash, Edit, X, CalendarDays, Clock3, CheckCircle2 } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const ViewTask = () => {
  const navigate = useNavigate();
  const { state: task } = useLocation();

  if (!task) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
        <p className="text-red-500 font-medium text-lg mb-4">
          ⚠️ No task details provided
        </p>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  const getStatusStyles = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "In Progress":
        return "bg-blue-100 text-blue-700 border-blue-300";
      case "Completed":
        return "bg-green-100 text-green-700 border-green-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  return (
    <div className=" flex items-center justify-center mt-25 ">
      <div className="relative bg-white rounded-3xl shadow-2xl p-8 w-full max-w-2xl border border-gray-100">
        {/* Close button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
        >
          <X size={24} />
        </button>

        {/* Title + Status */}
        <div className="mb-6 border-b border-gray-100 pb-4">
          <h1 className="text-2xl font-semibold text-gray-800 tracking-wide mb-2">
            {task.title}
          </h1>
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusStyles(
              task.status
            )}`}
          >
            <CheckCircle2 size={16} />
            {task.status}
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-700 leading-relaxed mb-6">{task.description}</p>

        {/* Dates */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <CalendarDays size={18} className="text-blue-600" />
            <span>
              <strong>Created:</strong>{" "}
              {task.created_at ? task.created_at : "N/A"}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Clock3 size={18} className="text-rose-600" />
            <span>
              <strong>Deadline:</strong>{" "}
              {task.deadline ? task.deadline : "N/A"}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <button
            onClick={() => navigate(`/home/admin/edit/${task.id}`, { state: task })}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition flex items-center gap-2"
          >
            <Edit size={18} />
            Edit
          </button>

          <button
            onClick={() => navigate(`/home/admin/delete-task/${task.id}`, { state: task })}
            className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition flex items-center gap-2"
          >
            <Trash size={18} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewTask;
