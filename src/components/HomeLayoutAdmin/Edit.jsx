import React, { useState } from "react";
import { X } from "lucide-react"; // cross icon
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

const Edit = () => {
  const navigate = useNavigate();

  const [taskName, setTaskName] = useState("Task Title Example");
  const [priority, setPriority] = useState("normal");
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState(
    "This is a sample description for the task."
  );

  return (
    // 🔹 Fullscreen blurred background with flexbox center
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      {/* Card */}
      <div className="relative max-w-lg w-full bg-white rounded-2xl shadow-xl p-6">
        {/* Close Icon */}
        <button
          onClick={() => navigate(-1)} // go back
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={22} />
        </button>

        <h1 className="text-2xl font-bold mb-6 text-center">Edit Task</h1>

        {/* Task Name */}
        <label className="block mb-2 font-medium">Task Name</label>
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Enter task name"
          className="w-full shadow rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-blue-600 outline-none"
        />

        {/* Priority & Due Date */}
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <label className="block mb-2 font-medium">Task Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full shadow rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-600 outline-none"
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
              className="w-full shadow rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </div>
        </div>

        {/* Description */}
        <label className="block mb-2 font-medium">Task Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter task details"
          className="w-full shadow rounded-lg px-3 py-2 mb-4 h-24 resize-none focus:ring-2 focus:ring-blue-600 outline-none"
        ></textarea>

        {/* Save Button */}
        <button className="w-1/2 bg-[#3755db] text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition">
          Save Task
        </button>
      </div>
    </div>
  );
};

export default Edit;
