import React, { useState } from "react";
import { X } from "lucide-react"; // close icon
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateTask = () => {
  const [date, setDate] = useState(new Date());
  const [priority, setPriority] = useState("normal");
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white rounded-2xl shadow-xl p-6 relative">
      {/* Top-right corner close button */}
      <button className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition">
        <X size={24} />
      </button>

      <h1 className="text-2xl font-bold mb-4">Create Task</h1>

      {/* Task Name */}
      <label className="block mb-2 font-medium">Task Name</label>
      <input
        type="text"
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
        placeholder="Enter task details"
        className="w-full border rounded-lg px-3 py-2 mb-4 h-24 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
      ></textarea>

      {/* File Upload */}
      <label className="block mb-2 font-medium">Attach File</label>
      <input
        type="file"
        onChange={handleFileChange}
        className="w-full border rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
      />
      {file && <p className="text-sm text-gray-600 mb-4">Selected file: {file.name}</p>}

      {/* Submit Button */}
      <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
        Create
      </button>
    </div>
  );
};

export default CreateTask;
