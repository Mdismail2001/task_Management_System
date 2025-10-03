import React, { useState, useEffect, useContext } from "react";
import { X } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";

const ViewTask = () => {
  const [task, setTask] = useState(null);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  const { token } = useContext(AuthContext);

  // ✅ Fetch task details
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await fetch(
          `https://limegreen-wren-873008.hostingersite.com/api.php?endpoint=tasks&id=${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        if (data?.data) {
          setTask(data.data);
          setStatus(data.data.status || "pending"); // ✅ use correct backend value
        }
      } catch (err) {
        console.error("Error fetching task:", err);
      }
    };

    if (token) fetchTask();
  }, [id, token]);

  // ✅ Update task status only
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `https://limegreen-wren-873008.hostingersite.com/api.php?endpoint=tasks&id=${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status }), // send exact backend key
        }
      );

      console.log("Updating:", status);

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      // console.log("Task updated:", data);

      alert("✅ Task status updated successfully!");
      navigate(-1);
    } catch (err) {
      console.error("Error updating task:", err);
      alert("❌ Failed to update task");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative max-w-3xl w-full bg-white shadow-lg rounded-xl p-6">
        {/* Close */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        {/* Task Details */}
        {task ? (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">{task.title}</h2>
            <p className="text-gray-600 mb-2">{task.description}</p>
            <span className="text-sm text-gray-500 mb-2 block">
              Deadline: {task.deadline}
            </span>
            <span className="text-sm text-gray-500 block">
              Current Status:{" "}
              <span className="font-semibold capitalize">{task.status}</span>
            </span>
          </div>
        ) : (
          <p className="text-gray-500">Loading task details...</p>
        )}

        {/* Update Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Status Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Update Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <button
            type="submit"
            className="px-4 bg-[#3755db] text-white py-3 rounded-xl hover:bg-blue-600 transition"
          >
            Update Status
          </button>
        </form>
      </div>
    </div>
  );
};

export default ViewTask;
