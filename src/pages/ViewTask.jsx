import React, { useState } from "react";

const ViewTask = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Task submitted with:", file);
    // send to backend here
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-6 mt-6">
      {/* Task Details */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Task Title</h1>
        <p className="text-gray-600 mb-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Complete this
          task before the deadline.
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
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Submit Task
        </button>
      </form>
    </div>
  );
};

export default ViewTask;
