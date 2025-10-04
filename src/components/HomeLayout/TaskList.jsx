import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";

const TaskList = () => {
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);

  // ✅ get both searchQuery & selectedDate from Root
  const { searchQuery, selectedDate } = useOutletContext();

  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const fetchTasks = async (pageNum = 1) => {
    if (!user) return;
    setLoading(true);

    try {
      const res = await fetch(
        `https://limegreen-wren-873008.hostingersite.com/api.php?endpoint=tasks&assigned_to_user_id=${user.id}&page=${pageNum}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      const newTasks = data?.data || [];

      if (newTasks.length === 0) setHasMore(false);
      else setTasks((prev) => [...prev, ...newTasks]);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchTasks(page);
  }, [user, page]);

  // ✅ Helper to format selected date (YYYY-MM-DD)
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
      task.description?.toLowerCase().includes(q);

    const matchesDate = selected
      ? task.deadline?.startsWith(selected)
      : true; // if no date selected → show all

    return matchesSearch && matchesDate;
  });

  return (
    <div className="p-6">
      {loading && tasks.length === 0 ? (
        <p className="text-center text-gray-500">Loading tasks...</p>
      ) : filteredTasks.length === 0 ? (
        <p className="text-center text-gray-500">
          No tasks found for the selected date or search term.
        </p>
      ) : (
        <>
          {/* ✅ Task Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map((task) => (
              <div
                key={task.id}
                onClick={() => navigate(`/home/user/task-view/${task.id}`)}
                className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between h-44 border border-gray-200 cursor-pointer hover:shadow-lg transition"
              >
                {/* Header Row */}
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span className="font-semibold">Task Id: {task.id}</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      task.status === "completed"
                        ? "bg-green-100 text-green-600"
                        : task.status === "in_progress"
                        ? "bg-blue-100 text-blue-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {task.status.replace("_", " ")}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-800 text-center flex-1 flex items-center">
                  Title: {task.title}
                </h3>

                {/* ✅ Priority and Due Date vertically aligned */}
                <div className="flex flex-col text-sm font-medium text-gray-600 mt-2 space-y-1">
                  <div>
                    <span className="font-semibold">Priority:</span>{" "}
                    <span className="text-[rgb(55,85,219)]">
                      {task.priority || "low"}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold">Due Date:</span>{" "}
                    <span className="text-[rgb(55,85,219)]">
                      {task.deadline || "Unknown"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ✅ Load More Button */}
          {hasMore && !loading && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setPage((prev) => prev + 1)}
                className="bg-[rgb(55,85,219)] text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Load More
              </button>
            </div>
          )}

          {loading && tasks.length > 0 && (
            <p className="text-center text-gray-500 mt-4">Loading more...</p>
          )}
        </>
      )}
    </div>
  );
};

export default TaskList;
