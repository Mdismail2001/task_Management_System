import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router";

const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [priority, setPriority] = useState("normal");
  const [file, setFile] = useState(null);
  const [assignedUser, setAssignedUser] = useState(""); // store user id
  const [users, setUsers] = useState([]); // list of users
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Fetch users when modal opens
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          "https://limegreen-wren-873008.hostingersite.com/api.php?endpoint=users",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        console.log("API raw response:", data);

        if (res.ok) {
          setUsers(data.data || []); // ✅ set actual user array
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

  const handleCreateTask = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("You must be logged in to create a task.");
        setLoading(false);
        return;
      }

      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("status", "pending");
      formData.append("assigned_to_user_id", assignedUser); // ✅ selected user id
      formData.append(
        "deadline",
        date.toISOString().slice(0, 19).replace("T", " ")
      );
      formData.append("priority", priority);

      if (file) formData.append("file", file);

      const res = await fetch(
        "https://limegreen-wren-873008.hostingersite.com/api.php?endpoint=tasks",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );

      const result = await res.json();
      console.log("Task API Response:", result);

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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
              showTimeSelect
              dateFormat="yyyy-MM-dd HH:mm:ss"
              className="w-full shadow rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Assign To */}
        <label className="block mb-2 font-medium">Assign To</label>
        <select
          value={assignedUser}
          onChange={(e) => setAssignedUser(e.target.value)}
          className="w-full shadow rounded-lg px-3 py-2 mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="">Select user</option>
          {users?.map((u) => (
            <option key={u.id} value={u.id}>
              {u.fullname} ({u.email})
            </option>
          ))}
        </select>

        {/* Description */}
        <label className="block mb-2 font-medium">Task Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
          <p className="text-sm text-gray-600 mb-4">
            Selected file: {file.name}
          </p>
        )}

        {/* Error */}
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        {/* Submit Button */}
        <button
          onClick={handleCreateTask}
          disabled={loading}
          className="w-1/2 bg-[#3755db] text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </div>
    </div>
  );
};

export default CreateTask;
