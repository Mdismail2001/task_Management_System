import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const EditTask = () => {
  const { id } = useParams(); // ✅ task id from url
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch single task
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await fetch(
          `https://limegreen-wren-873008.hostingersite.com/api.php?endpoint=tasks&id=${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        if (data?.data) setTask(data.data);
      } catch (error) {
        console.error("Error fetching task:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id, token]);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(
        `https://limegreen-wren-873008.hostingersite.com/api.php?endpoint=tasks&id=${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(task),
        }
      );
      console.log(task);

      if (!res.ok) throw new Error("Failed to update task");

      alert("✅ Task updated successfully!");
      navigate("/home/admin/all-task");
    } catch (error) {
      console.error("Update failed:", error);
      alert("❌ Failed to update task");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading task...</p>;
  if (!task) return <p className="text-center mt-10 text-red-500">Task not found</p>;

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <h1 className="text-2xl font-bold text-blue-900 mb-6">Edit Task #{id}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={task.title || ""}
            onChange={(e) => setTask({ ...task, title: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={task.description || ""}
            onChange={(e) => setTask({ ...task, description: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-blue-300"
            rows="4"
            required
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            value={task.status || ""}
            onChange={(e) => setTask({ ...task, status: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 mt-1 focus:ring focus:ring-blue-300"
          >
            {/* pending, in_progress, completed, cancelled */}
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Created Date</label>
            <input
              type="date"
              value={task.createdDate || ""}
              onChange={(e) => setTask({ ...task, createdDate: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Due Date</label>
            <input
              type="date"
              value={task.dueDate || ""}
              onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
              className="w-full border rounded-lg px-3 py-2 mt-1"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="px-4 py-2 bg-[#3755db] text-white rounded-lg hover:bg-blue-600"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTask;
