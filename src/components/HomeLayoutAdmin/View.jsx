import React from "react";
import { Trash, Edit, X } from "lucide-react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

const ViewTask = () => {
  const navigate = useNavigate();
  const { state: task } = useLocation(); // ✅ Task comes from navigate state
  const { id } = useParams(); // from URL if needed

  // console.log(task)

  if (!task) {
    return (
      <div className="text-center p-6">
        <p className="text-red-500">No task details provided</p>
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 underline mt-4"
        >
          Go Back
        </button>
      </div>
    );
  }

  // ✅ status badge color
  const getStatusClasses = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border border-yellow-300";
      case "In Progress":
        return "bg-blue-100 text-blue-800 border border-blue-300";
      case "Completed":
        return "bg-green-100 text-green-800 border border-green-300";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-300";
    }
  };

  return (
    <div className="bg-white max-w-2xl mx-auto rounded-2xl shadow-lg p-6 relative">
      {/* ❌ Close (X) button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 right-4 text-gray-600 hover:text-red-600 transition"
      >
        <X size={22} />
      </button>

      {/* Header */}
      <div className="mb-4">
        <h1 className="text-xl font-bold">{task.title}</h1>
        <span
          className={`inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full ${getStatusClasses(
            task.status
          )}`}
        >
          {task.status}
        </span>
      </div>

      {/* Description */}
      <p className="text-gray-700 mb-6">{task.description}</p>

      {/* Footer */}
      <div className="flex justify-between items-center mt-auto">
        <div className="flex gap-2">

          {/* Edit Task */}
          <button
            className="text-gray-600 hover:text-blue-600 transition"
            onClick={() =>
              navigate(`/home/admin/edit/${task.id}`, { state: task })
            }
          >
            <Edit size={20} />
          </button>

          {/* Delete Task */}
          <button
            onClick={() =>
              navigate(`/home/admin/delete-task/${task.id}`, { state: task })
            }
            className="text-red-500 hover:text-red-600 transition"
          >
            <Trash size={20} />
          </button>
        </div>

        {/* Created & Due dates */}
        <div className="text-sm text-gray-500 text-right">
          <p>Created: {task.created_at || "N/A"}</p>
          <p>Due: {task.deadline || "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewTask;
