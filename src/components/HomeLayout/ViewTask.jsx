import React, { useState } from "react";
import { X } from "lucide-react";
import { useNavigate } from "react-router";

const ViewTask = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(40); // initial progress
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Task submitted with:", file, "Progress:", progress);
    // send to backend here
  };

  return (
    <div className="fixed inset-0 bg-black/40 bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      {/* Task Card */}
      <div className="relative max-w-3xl w-full bg-white shadow-lg rounded-xl p-6">
        {/* Close Button (Go Back) */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        {/* Task Details */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Task Title</h1>
          <p className="text-gray-600 mb-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Complete
            this task before the deadline.
          </p>
          <p className="text-sm text-gray-500">
            <span className="font-semibold">Deadline:</span> 30 Sept 2025
          </p>
          <p className="text-sm text-gray-500">
            <span className="font-semibold">Status:</span> Pending
          </p>
        </div>

        {/* Submission Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Text Answer */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Answer
            </label>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="5"
              placeholder="Write your answer here..."
            ></textarea>
          </div>

          {/* PDF Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload PDF (optional)
            </label>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            />
            {file && (
              <p className="text-sm text-gray-500 mt-2">
                Selected: {file.name}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="px-4 bg-[#3755db] text-white py-3 rounded-xl hover:bg-blue-600 transition"
          >
            Submit Task
          </button>
        </form>

        {/* Progress Bar (Bottom Right, Updatable) */}
        <div className="absolute bottom-4 right-4 w-44">
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          {/* % text */}
          <p className="text-xs text-gray-600 mt-1 text-right">
            {progress}% Complete
          </p>
          {/* Slider (controls the bar) */}
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => setProgress(e.target.value)}
            className="w-full accent-blue-600 mt-1"
          />
        </div>
      </div>
    </div>
  );
};

export default ViewTask;
