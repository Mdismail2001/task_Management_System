import React, { useState, useContext } from "react";
import { X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider"; // ✅ assuming you store token here

const DeleteTask = () => {
  const navigate = useNavigate();
  const { state: task } = useLocation(); // task comes from navigate
  const { token } = useContext(AuthContext); // ✅ get token from context
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!task) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
        <div className="bg-white p-6 rounded-2xl shadow-lg w-[90%] max-w-md relative">
          <p className="text-red-500">No task found</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const handleDelete = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://limegreen-wren-873008.hostingersite.com/api.php?endpoint=tasks&id=${task.id}`,
        {
          method: "DELETE", // ✅ real delete call
          headers: {
            "Authorization": `Bearer ${token}`, // pass token if API needs it
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      alert("Task deleted successfully ✅");
      navigate("/home/admin/all-task"); // go back after success
    } catch (err) {
      console.error("Error deleting task:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      {/* Modal */}
      <div className="bg-white p-6 rounded-2xl shadow-lg w-[90%] max-w-md relative">
        {/* Cross icon */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          <X size={20} />
        </button>

        <h1 className="text-xl font-semibold mb-4">Delete Task</h1>
        <p className="mb-6 text-gray-700">
          Are you sure you want to delete{" "}
          <span className="font-medium">{task.title}</span>? <br />
          Current status:{" "}
          <span className="italic text-gray-600">{task.status}</span>.
        </p>

        {error && (
          <p className="text-red-500 text-sm mb-3">⚠️ {error}</p>
        )}

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={handleDelete}
            disabled={loading}
            className={`px-4 py-2 rounded-lg text-white ${
              loading ? "bg-red-300" : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {loading ? "Deleting..." : "Yes, Delete"}
          </button>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTask;
