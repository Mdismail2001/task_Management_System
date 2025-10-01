import React from "react";
import { Trash, Edit } from "lucide-react";
import { LuArrowBigLeft } from "react-icons/lu";
import { useNavigate, useLocation, useParams } from "react-router-dom";

const ViewTask = () => {
  const navigate = useNavigate();
  const { state: task } = useLocation(); // ✅ Task comes from navigate state
  const { id } = useParams(); // from URL if needed

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
    <div className="bg-white max-w-2xl mx-auto rounded-2xl shadow-lg p-6 grid grid-cols-12">
      {/* Main content */}
      <div className="col-span-10 flex flex-col justify-between pr-6 relative">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold">{task.title}</h1>
            {/* ✅ show task ID */}
            <p className="text-sm text-gray-500">Task ID: #{task.id}</p>
            <span
              className={`inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full ${getStatusClasses(
                task.status
              )}`}
            >
              {task.status}
            </span>
          </div>
          <button
            className="flex items-center justify-center text-gray-600 hover:text-blue-600 w-8 h-8 rounded-full bg-gray-100"
            onClick={() => navigate(-1)}
          >
            <LuArrowBigLeft size={20} />
          </button>
        </div>

        {/* Description */}
        <p className="text-gray-700 mb-4 flex-1">{task.description}</p>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-auto">
          <div className="flex gap-2">
            <button className="bg-[#3755db] text-white px-3 py-1 rounded-xl hover:bg-blue-600 transition">
              Work on it Now
            </button>
            {/* ✅ Pass ID in URL and task as state */}
            <button
              className="text-gray-600 hover:text-blue-600 transition"
              onClick={() =>
                navigate(`/home/admin/edit/${task.id}`, { state: task })
              }
            >
              <Edit size={20} />
            </button>
            <button
              onClick={() =>
                navigate(`/home/admin/delete-task/${task.id}`, { state: task })
              }
              className="text-red-500 hover:text-red-600 transition"
            >
              <Trash size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Right column */}
      <div className="col-span-2 flex flex-col items-center justify-between py-4">
        <p className="text-sm text-gray-400">{task.createdDate || "N/A"}</p>
        <div className="relative w-3 flex-1 bg-gray-200 rounded-full my-2">
          <div
            className="bg-[#3755db] w-3 rounded-full absolute bottom-0"
            style={{ height: `${task.progress || 0}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-400">{task.dueDate || "N/A"}</p>
      </div>
    </div>
  );
};

export default ViewTask;
