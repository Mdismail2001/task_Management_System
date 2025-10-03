import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";

const AllTask = () => {
  const navigate = useNavigate();
  const { token, user } = useContext(AuthContext); // ✅ get logged-in user + token

  const [activeTab, setActiveTab] = useState("All");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch tasks from API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (!user?.id) return; // ✅ ensure admin id exists

        const res = await fetch(
          `https://limegreen-wren-873008.hostingersite.com/api.php?endpoint=tasks&created_by_user_id=${user.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch tasks");
        }

        const data = await res.json();

        // console.log(data)
        // ✅ normalize status
        const normalizedTasks = (data?.data || []).map((task) => ({
          ...task,
          status:
            task.status?.toLowerCase() === "pending"
              ? "Pending"
              : task.status?.toLowerCase() === "in_progress" ||
                task.status?.toLowerCase() === "in progress"
              ? "In Progress"
              : task.status?.toLowerCase() === "completed"
              ? "Completed"
              : task.status,
        }));

        setTasks(normalizedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token && user) {
      fetchTasks();
    }
  }, [token, user]);

  // badge color styles for status
  const getStatusClasses = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800 border border-yellow-300";
      case "In Progress":
        return "bg-blue-100 text-blue-800 border border-blue-300";
      case "Completed":
        return "bg-green-100 text-green-800 border border-green-300";
      default:
        return "bg-gray-100 text-gray-800 border border-gray-300";
    }
  };

  // badge color styles for priority
  const getPriorityClasses = (priority) => {
    switch ((priority || "").toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-700 border border-red-300";
      case "medium":
        return "bg-orange-100 text-orange-700 border border-orange-300";
      case "low":
        return "bg-green-100 text-green-700 border border-green-300";
      default:
        return "bg-gray-100 text-gray-700 border border-gray-300";
    }
  };

  // counts for tabs
  const counts = {
    All: tasks.length,
    Pending: tasks.filter((t) => t.status === "Pending").length,
    "In Progress": tasks.filter((t) => t.status === "In Progress").length,
    Completed: tasks.filter((t) => t.status === "Completed").length,
  };

  return (
    <div className="px-2">
      {/* Header */}
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h1 className="text-2xl text-blue-900 font-bold">Tasks</h1>
          <p className="text-gray-600">Your tasks in your space.</p>
        </div>
        <button
          onClick={() => navigate("/home/admin/create-task")}
          className="bg-[#3755db] text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Create Task
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-6">
        {["All", "Pending", "In Progress", "Completed"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 flex items-center justify-between px-8 py-3 border-b-2 transition ${
              activeTab === tab
                ? "border-[#3755db] text-[#3755db] font-semibold bg-blue-50"
                : "border-transparent text-gray-600 hover:bg-gray-50"
            }`}
          >
            <span>{tab}</span>
            <span
              className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-medium ${
                activeTab === tab
                  ? "bg-[#3755db] text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {counts[tab]}
            </span>
          </button>
        ))}
      </div>

      {/* Task Cards */}
      {loading ? (
        <p className="text-center text-gray-600">Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p className="text-center text-gray-600">No tasks found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks
            .filter((task) => activeTab === "All" || task.status === activeTab)
            .map((task) => (
              <div
                key={task.id}
                onClick={() =>
                  navigate(`/home/admin/view/${task.id}`, { state: task })
                }
                className="bg-white rounded-lg p-4 shadow hover:shadow-lg transition flex flex-col justify-between cursor-pointer"
              >
                {/* Header */}
                <div className="flex justify-between items-center mb-3">
                  <p className="font-semibold text-gray-800">#{task.id}</p>
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusClasses(
                      task.status
                    )}`}
                  >
                    {task.status}
                  </span>
                </div>

                {/* Body */}
                <div className="mb-4 flex-1">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {task.title}
                  </h2>
                  <p className="text-gray-600 text-sm">{task.description}</p>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center mt-3">
                  {/* ✅ Assigned To */}
                  <p className="text-sm text-gray-600">
                    Assigned:{" "}
                    <span className="font-medium text-gray-800">
                      {task.assigned_to?.fullname || "Unassigned"}
                    </span>
                  </p>

                  {/* ✅ Priority badge */}
                  {task.priority && (
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${getPriorityClasses(
                        task.priority
                      )}`}
                    >
                      {task.priority}
                    </span>
                  )}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default AllTask;
