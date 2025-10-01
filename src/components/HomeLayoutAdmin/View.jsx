import React from "react";
import { Trash, Edit } from "lucide-react";
import { LuArrowBigLeft } from "react-icons/lu";
import { useNavigate, useLocation, useParams } from "react-router-dom";

const ViewTask = () => {
  const navigate = useNavigate();
  const { state: task } = useLocation(); // ✅ Task comes from navigate state
  const { id } = useParams(); // just in case you need task.id from url

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

  return (
    <div className="bg-white max-w-2xl mx-auto rounded-2xl shadow-lg p-6 grid grid-cols-12 ">
      {/* Main content */}
      <div className="col-span-10 flex flex-col justify-between pr-6 relative">
        {/* Header */}
        <div className="flex flex-col mb-4">
          <h1 className="text-xl font-bold">{task.title}</h1>
          <button
            className="flex items-center justify-center text-[#3755db] hover:text-blue-600 text-sm font-medium py-4 rounded-xl bg-gray-100 w-8 h-6"
            onClick={() => navigate(-1)}
          >
            <LuArrowBigLeft size={20} className="mr-1" />
          </button>
          <p className="text-sm mb-2">{task.status}</p>
        </div>

        {/* Description */}
        <p className="text-gray-700 mb-4 flex-1">{task.description}</p>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mt-auto">
          <div className="flex gap-2">
            <button className="bg-[#3755db] text-white px-3 py-1 rounded-xl hover:bg-blue-600 transition">
              Work on it Now
            </button>
            <button
              className="text-gray-600 hover:text-blue-600 transition"
              onClick={() => navigate("/home/admin/edit", { state: task })}
            >
              <Edit size={20} />
            </button>
            <button
              onClick={() => navigate("/home/admin/delete-task", { state: task })}
              className="text-red-500 transition"
            >
              <Trash size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Right column */}
      <div className="col-span-2 flex flex-col items-center justify-between py-4">
        <p className="text-sm text-gray-400">{task.createdDate}</p>
        <div className="relative w-3 flex-1 bg-gray-200 rounded-full my-2">
          <div
            className="bg-[#3755db] w-3 rounded-full absolute bottom-0"
            style={{ height: `${task.progress || 0}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-400">{task.dueDate}</p>
      </div>
    </div>
  );
};

export default ViewTask;
