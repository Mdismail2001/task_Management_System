import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router";
import { body } from "framer-motion/client";

const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [priority, setPriority] = useState("low");
  const [file, setFile] = useState(null);
  const [assignedUser, setAssignedUser] = useState(""); // only user id
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // console.log( title,description,date,priority,file,assignedUser)

  const navigate = useNavigate();

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = sessionStorage.getItem("token");
        // console.log(token)
        if (!token) return;

        const res = await fetch(
          "https://limegreen-wren-873008.hostingersite.com/api.php?endpoint=users",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();

        if (res.ok) {
          setUsers(data.data || []);
        } else {
          setError("Failed to fetch users");
        }
      } catch (err) {
        console.error("Error fetching users:", err);
        setError("Error loading users");
      }
    };

    fetchUsers();
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCreateTask = async (e) => {
    e.preventDefault(); // ✅ prevent page reload
    setLoading(true);
    setError("");

    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to create a task.");
        setLoading(false);
        return;
      }

      const data = {
          "title": title,
          "description": description,
          "status": "pending", // pending, in_progress, completed, cancelled
          "assigned_to_user_id": assignedUser,
          "deadline": date,
          "priority": priority // low, medium, high
        }
console.log(priority)
      const res = await fetch(
        "https://limegreen-wren-873008.hostingersite.com/api.php?endpoint=tasks",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: JSON.stringify(data),

        }
      );
console.log(data)
      const result = await res.json();
      // console.log("Task API Response:", result);
        alert(result.message);

      if (res.ok) {
        navigate("/home/admin/all-task");
      } else {
        setError(result.message || "Failed to create task");
      }
    } catch (err) {
      console.error("Task API Error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background */}
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

        {/* ✅ Form starts here */}
        <form onSubmit={handleCreateTask}>
          {/* Task Name */}
          <label className="block mb-2 font-medium">Task Name</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task name"
            className="w-full shadow rounded-lg px-3 py-2 mb-4"
          />

          {/* Priority & Due Date */}
          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <label className="block mb-2 font-medium">Task Priority</label>
              <select
                name="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full shadow rounded-lg px-3 py-2"
              >
                <option value="low">low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="block mb-2 font-medium">Due Date</label>
              <DatePicker
                selected={date}
                onChange={(d) => setDate(d)}
                showTimeSelect
                dateFormat="yyyy-MM-dd HH:mm:ss"
                className="w-full shadow rounded-lg px-3 py-2"
              />
            </div>
          </div>

          {/* Assign To */}
          <label className="block mb-2 font-medium">Assign To</label>
          <select
            name="assignedUser"
            value={assignedUser}
            onChange={(e) => setAssignedUser(e.target.value)}
            className="w-full shadow rounded-lg px-3 py-2 mb-4"
          >
            <option value="">Select user</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.fullname}
              </option>
            ))}
          </select>

          {/* Description */}
          <label className="block mb-2 font-medium">Task Description</label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task details"
            className="w-full shadow rounded-lg px-3 py-2 mb-4 h-24 resize-none"
          ></textarea>

          {/* File Upload */}
          <label className="block mb-2 font-medium">Attach File</label>
          <input
            type="file"
            name="file"
            onChange={handleFileChange}
            className="w-full shadow rounded-lg px-3 py-2 mb-4"
          />
          {file && (
            <p className="text-sm text-gray-600 mb-4">
              Selected file: {file.name}
            </p>
          )}

          {/* Error */}
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-1/2 bg-[#3755db] text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
