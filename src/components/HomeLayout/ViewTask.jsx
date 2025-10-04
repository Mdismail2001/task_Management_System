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
          setStatus(data.data.status || "pending");
        }
      } catch (err) {
        console.error("Error fetching task:", err);
      }
    };

    if (token) fetchTask();
  }, [id, token]);

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
          body: JSON.stringify({ status }),
        }
      );

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      alert("✅ Task status updated successfully!");
      navigate(-1);
    } catch (err) {
      console.error("Error updating task:", err);
      alert("❌ Failed to update task.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative max-w-lg w-full bg-white rounded-2xl shadow-2xl p-8 animate-fadeIn">
        {/* Close button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
        >
          <X size={22} />
        </button>

        {task ? (
          <>
            {/* Task Title */}
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2 text-center">
              {task.title}
            </h2>

            {/* Task Details */}
            <div className="bg-gray-50 p-4 rounded-xl mb-6 border border-gray-200">
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Task ID:</span> {task.id}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Priority:</span>{" "}
                <span className="text-[rgb(55,85,219)]">
                  {task.priority || "low"}
                </span>
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Deadline:</span>{" "}
                <span className="text-[rgb(55,85,219)]">
                  {task.deadline || "Not specified"}
                </span>
              </p>
              <div className="text-gray-700 mt-3">
                <span className="font-semibold">Description:</span>
                <p className="text-gray-600 mt-1 bg-white border border-gray-200 rounded-lg p-3">
                  {task.description || "No description provided."}
                </p>
              </div>
            </div>

            {/* Status Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Update Status
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-[rgb(55,85,219)] text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium shadow-md"
              >
                Update Task
              </button>
            </form>
          </>
        ) : (
          <p className="text-center text-gray-500 py-8">
            Loading task details...
          </p>
        )}
      </div>
    </div>
  );
};

export default ViewTask;
