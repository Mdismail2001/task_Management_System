import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";

const TaskList = () => {
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);

  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const getStatusLabel = (status) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "in_progress":
        return "In Progress";
      default:
        return "Pending";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-600";
      case "in_progress":
        return "bg-blue-100 text-blue-600";
      default:
        return "bg-yellow-100 text-yellow-600";
    }
  };

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
      console.log(data);

      if (newTasks.length === 0) {
        setHasMore(false);
      } else {
        setTasks((prev) => [...prev, ...newTasks]);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchTasks(page);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, page]);

  if (loading && tasks.length === 0)
    return <p className="p-6">Loading tasks...</p>;

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => navigate(`/home/user/task-view/${task.id}`)}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between h-40 border border-gray-200 cursor-pointer hover:shadow-lg transition"
            >
              {/* Top Row: Task ID + Status */}
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span className="font-semibold">#{task.id}</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    task.status
                  )}`}
                >
                  {getStatusLabel(task.status)}
                </span>
              </div>

              {/* Middle: Task Title */}
              <h3 className="text-lg font-bold text-gray-800 text-center flex-1 flex items-center">
                {task.title}
              </h3>

              {/* Bottom Row: Priority (Left) + Assigned To (Right) */}
              <div className="flex justify-between items-center text-sm font-medium text-gray-600">
                <div>
                  Priority:{" "}
                  <span className="ml-1 text-[rgb(55,85,219)]">
                    {task.priority || "low"}
                  </span>
                </div>

                <div>
                  Assigned to:{" "}
                  <span className="text-[rgb(55,85,219)]">
                    {task.assigned_to?.fullname || "Unknown"}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No tasks found.
          </p>
        )}
      </div>

      {/* Load More Button */}
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
    </div>
  );
};

export default TaskList;
