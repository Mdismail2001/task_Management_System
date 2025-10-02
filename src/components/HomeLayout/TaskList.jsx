import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { ArrowRight } from "lucide-react";
import { AuthContext } from "../Provider/AuthProvider"; // Assuming you have this
// import Banner from "./Banner";

const TaskList = () => {
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext); // Get logged-in user info
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return; // If user not logged in, skip
    // console.log(user.id)
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://limegreen-wren-873008.hostingersite.com/api.php?endpoint=tasks&assigned_to_user_id=${user.id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // if your API uses token
            },
          }
        );
        const data = await res.json();
        console.log(data)
        if (data?.tasks) {
          setTasks(data.tasks); // Adjust this based on your API response
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
      {/* <Banner /> */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div
              key={task.id}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between h-40 border border-gray-200"
            >
              {/* Top Row: Task ID + Status */}
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span className="font-semibold">{task.id}</span>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    task.status === "Completed"
                      ? "bg-green-100 text-green-600"
                      : task.status === "In Progress"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {task.status}
                </span>
              </div>

              {/* Middle: Task Title */}
              <h3 className="text-lg font-bold text-gray-800 text-center flex-1 flex items-center">
                {task.title}
              </h3>

              {/* Bottom: View Task */}
              <button
                onClick={() => navigate(`/home/user/task-view/${task.id}`)} // Pass task id
                className="flex items-center gap-1 text-sm text-[rgb(55,85,219)] font-medium hover:underline self-start"
              >
                View Task
                <ArrowRight size={16} />
              </button>
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
