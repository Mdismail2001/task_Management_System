import React, { useState } from "react";
import { X, ArrowLeft } from "lucide-react"; // back arrow icon
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
    <div className="max-w-lg mx-auto mt-10 bg-white rounded-2xl shadow-xl p-6 relative">
      {/* Back arrow button */}
      <button
        className="flex items-center gap-2 text-gray-600 hover:text-blue-500 mb-4"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={20} /> Back
      </button>

      <h1 className="text-2xl font-bold mb-4">Edit Task</h1>

      {/* Task Name */}
      <label className="block mb-2 font-medium">Task Name</label>
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Enter task name"
        className="w-full border rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
      />

      {/* Priority & Due Date Inline */}
      <div className="flex gap-4 mb-4">
        <div className="flex-1">
          <label className="block mb-2 font-medium">Task Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
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
            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      {/* Description */}
      <label className="block mb-2 font-medium">Task Description</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter task details"
        className="w-full border rounded-lg px-3 py-2 mb-4 h-24 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
      ></textarea>

      {/* Submit Button */}
      <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
        Save Changes
      </button>
    </div>
  );
};

export default Edit;
