import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const AllTask = () => {
  const navigate = useNavigate();
  const { token, user } = useContext(AuthContext);
  const { searchQuery, selectedDate } = useOutletContext(); // ✅ get both

  const [activeTab, setActiveTab] = useState("All");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchTasks = async (pageNum = 1) => {
    if (!user?.id) return;
    setLoading(true);

    try {
      const res = await fetch(
        `https://limegreen-wren-873008.hostingersite.com/api.php?endpoint=tasks&created_by_user_id=${user.id}&page=${pageNum}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch tasks");

      const data = await res.json();
      const newTasks = data?.data || [];

      const normalizedTasks = newTasks.map((task) => ({
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

      if (pageNum === 1) setTasks(normalizedTasks);
      else setTasks((prev) => [...prev, ...normalizedTasks]);

      if (data?.pagination?.current_page >= data?.pagination?.total_pages)
        setHasMore(false);
      else setHasMore(true);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token && user) fetchTasks(1);
  }, [token, user]);

  // ✅ Format selected date (YYYY-MM-DD)
  const formatDate = (date) => {
    if (!date) return null;
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const selected = formatDate(selectedDate);

  // ✅ Apply both search and date filtering
  const filteredTasks = tasks.filter((task) => {
    const q = searchQuery.toLowerCase();

    const matchesSearch =
      task.title.toLowerCase().includes(q) ||
      task.description?.toLowerCase().includes(q) ||
      task.assigned_to?.fullname?.toLowerCase().includes(q);

    const matchesDate = selected
      ? task.deadline?.startsWith(selected)
      : true; // no date selected → show all

    return matchesSearch && matchesDate && (activeTab === "All" || task.status === activeTab);
  });

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

  const counts = {
    All: tasks.length,
    Pending: tasks.filter((t) => t.status === "Pending").length,
    "In Progress": tasks.filter((t) => t.status === "In Progress").length,
    Completed: tasks.filter((t) => t.status === "Completed").length,
  };

  return (
    <div className="px-6">
      {/* Header */}
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h1 className="text-3xl text-blue-900 font-bold">Tasks</h1>
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
      {loading && tasks.length === 0 ? (
        <p className="text-center text-gray-600">Loading tasks...</p>
      ) : filteredTasks.length === 0 ? (
        <p className="text-center text-gray-600">
          No tasks found for the selected date.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                onClick={() =>
                  navigate(`/home/admin/view/${task.id}`, { state: task })
                }
                className="bg-white rounded-lg p-4 shadow hover:shadow-lg transition flex flex-col justify-between cursor-pointer"
              >
                <div className="flex justify-between items-center mb-3">
                  <p className="font-semibold text-gray-800">Task id: {task.id}</p>
                  <span
                    className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusClasses(
                      task.status
                    )}`}
                  >
                    {task.status}
                  </span>
                </div>

                <div className="mb-4 flex-1">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {task.title}
                  </h2>
                </div>

                <div className="flex justify-between items-center mt-3">
                  <p className="text-sm text-gray-600">
                    Assigned: {" "}
                    <span className="font-medium text-gray-800">
                      {task.assigned_to?.fullname || "Unassigned"}
                    </span>
                  </p>
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

          {hasMore && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => {
                  const nextPage = page + 1;
                  setPage(nextPage);
                  fetchTasks(nextPage);
                }}
                disabled={loading}
                className="bg-[#3755db] text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
              >
                {loading ? "Loading..." : "See More"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllTask;
