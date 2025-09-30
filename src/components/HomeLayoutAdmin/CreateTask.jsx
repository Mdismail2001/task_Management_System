import React, { useState } from "react";
import { X } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router";

const CreateTask = () => {
  const [date, setDate] = useState(new Date());
  const [priority, setPriority] = useState("normal");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    // Fullscreen overlay
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Blurred background */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      {/* Modal */}
      <div className="relative max-w-lg w-full mx-4 bg-white rounded-2xl shadow-xl p-6 z-10">
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition"
          onClick={() => navigate(-1)}
        >
          <X size={24} />
        </button>

        <h1 className="text-2xl font-bold mb-4">Create Task</h1>

        {/* Task Name */}
        <label className="block mb-2 font-medium">Task Name</label>
        <input
          type="text"
          placeholder="Enter task name"
          className="w-full shadow rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        {/* Priority & Due Date */}
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block mb-2 font-medium">Task Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full shadow rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="low">Less Important</option>
              <option value="normal">Normal</option>
              <option value="high">Emergency</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block mb-2 font-medium">Due Date</label>
            <DatePicker
              selected={date}
              onChange={(d) => setDate(d)}
              dateFormat="yyyy-MM-dd"
              className="w-full shadow rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Description */}
        <label className="block mb-2 font-medium">Task Description</label>
        <textarea
          placeholder="Enter task details"
          className="w-full shadow rounded-lg px-3 py-2 mb-4 h-24 resize-none focus:ring-2 focus:ring-blue-600 outline-none"
        ></textarea>

        {/* File Upload */}
        <label className="block mb-2 font-medium">Attach File</label>
        <input
          type="file"
          onChange={handleFileChange}
          className="w-full shadow rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-blue-600 outline-none"
        />
        {file && (
          <p className="text-sm text-gray-600 mb-4">Selected file: {file.name}</p>
        )}

        {/* Submit Button */}
        <button
          onClick={() => navigate("/home/admin/all-task")}
          className="w-1/2 bg-[#3755db] text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default CreateTask;
