import React from "react";
import { Trash, Edit, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ViewTask = () => {
  const navigate = useNavigate();

  const task = {
    title: "Task Title Example",
    status: "Pending",
    description:
      "This is a sample description for the task. It explains what needs to be done.",
    progress: 50,
    createdDate: "2025-09-28",
    dueDate: "2025-10-05",
  };

  return (
    <div className="bg-white max-w-2xl mx-auto rounded-2xl shadow-lg p-6 grid grid-cols-12 ">
      {/* Main content: spans 10/12 */}
      <div className="col-span-10 flex flex-col justify-between pr-6 relative">
        {/* Top section: title + status */}
        <div className="flex flex-col mb-4">
          <h1 className="text-xl font-bold">{task.title}</h1>
          <p className="text-sm text-gray-500 mb-2">{task.status}</p>

          {/* Back arrow */}
          <button
            className="flex items-center text-blue-500 hover:text-blue-700 text-sm font-medium"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={16} className="mr-1" /> Back
          </button>
        </div>

        {/* Description */}
        <p className="text-gray-700 mb-4 flex-1">{task.description}</p>

        {/* Bottom section: buttons */}
        <div className="flex justify-between items-center mt-auto">
          <div className="flex gap-2">
            <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition">
              Work on it Now
            </button>
            <button
              className="text-gray-600 hover:text-blue-500 transition"
              onClick={() => navigate("/home/admin/edit")}
            >
              <Edit size={20} />
            </button>
            <button className="text-gray-600 hover:text-red-500 transition">
              <Trash size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Right column: created date, vertical progress bar, due date */}
      <div className="col-span-2 flex flex-col items-center justify-between py-4">
        <p className="text-sm text-gray-400">{task.createdDate}</p>

        {/* Progress bar */}
        <div className="relative w-3 flex-1 bg-gray-200 rounded-full my-2">
          <div
            className="bg-blue-600 w-3 rounded-full absolute bottom-0"
            style={{ height: `${task.progress}%` }}
          ></div>
        </div>

        <p className="text-sm text-gray-400">{task.dueDate}</p>
      </div>
    </div>
  );
};

export default ViewTask;
