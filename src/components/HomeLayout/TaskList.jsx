import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider"; // Assuming you have this

const TaskList = () => {
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Utility: map API status -> label + colors
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

  useEffect(() => {
    if (!user) return;
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://limegreen-wren-873008.hostingersite.com/api.php?endpoint=tasks&assigned_to_user_id=${user.id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await res.json();
        // console.log(data);
        if (data?.data) {
          setTasks(data.data);
        } else {
          setTasks([]);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [user, token]);

  if (loading) return <p className="p-6">Loading tasks...</p>;

  return (
    <div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

              {/* Bottom Row: Priority */}
              <div className="flex justify-end text-sm font-medium text-gray-600">
                Priority:{" "}
                <span className="ml-1 text-[rgb(55,85,219)]">
                  {task.priority || "low"}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No tasks found.
          </p>
        )}
      </div>
    </div>
  );
};

export default TaskList;
