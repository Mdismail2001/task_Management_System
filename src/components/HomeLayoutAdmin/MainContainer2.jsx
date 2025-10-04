import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import {
  ClipboardList,
  CheckCircle,
  Clock,
  Users,
  BarChart3,
  PlusCircle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const MainContainer2 = () => {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    inProgress: 0,
  });
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch only current admin tasks for stats
  useEffect(() => {
    if (!user?.id || !token) return;

    const fetchTasks = async () => {
      try {
        const response = await fetch(
          `https://limegreen-wren-873008.hostingersite.com/api.php?endpoint=tasks&created_by_user_id=${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        if (data && Array.isArray(data.data)) {
          const tasks = data.data;
          const total = tasks.length;
          const completed = tasks.filter((t) => t.status === "completed").length;
          const pending = tasks.filter((t) => t.status === "pending").length;
          const inProgress = tasks.filter((t) => t.status === "in_progress").length;

          setStats({ total, completed, pending, inProgress });
        }
      } catch (err) {
        console.error("Error fetching admin tasks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [user, token]);

  // Fetch all users’ tasks for the activity feed
  useEffect(() => {
    if (!token) return;

    const fetchAllTasks = async () => {
      try {
        const response = await fetch(
          `https://limegreen-wren-873008.hostingersite.com/api.php?endpoint=tasks`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        if (data && Array.isArray(data.data)) {
          // Sort by latest created_at
          const sorted = [...data.data].sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );
          setActivities(sorted);
        }
      } catch (err) {
        console.error("Error fetching all tasks:", err);
      }
    };

    fetchAllTasks();
  }, [token]);

  const chartData = [
    { name: "Mon", completed: 8, pending: 3 },
    { name: "Tue", completed: 10, pending: 4 },
    { name: "Wed", completed: 6, pending: 2 },
    { name: "Thu", completed: 12, pending: 5 },
    { name: "Fri", completed: 9, pending: 3 },
    { name: "Sat", completed: 11, pending: 2 },
    { name: "Sun", completed: 5, pending: 1 },
  ];

  // ✅ Extract unique assigned users
  const uniqueUsers = [
    ...new Map(
      activities
        .filter((task) => task.assigned_to)
        .map((task) => [task.assigned_to.email, task.assigned_to])
    ).values(),
  ];

  return (
    <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
      {/* Header Section */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome back, {user?.username || "Admin"} 👋
          </h1>
          <p className="text-gray-500">
            Here's an overview of your task management system today.
          </p>
        </div>

        {/* Create Task Button */}
        <button
          onClick={() => navigate("/home/admin/create-task")}
          className="flex items-center gap-2 bg-[#3755db] text-white px-5 py-3 rounded-lg shadow hover:bg-blue-600 transition"
        >
          <PlusCircle size={18} />
          Create Task
        </button>
      </div>

      {/* Stats Cards */}
      {loading ? (
        <p className="text-gray-500 text-center py-10">Loading task data...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            {
              label: "Total Tasks",
              value: stats.total,
              icon: ClipboardList,
              color: "bg-blue-500",
            },
            {
              label: "Completed",
              value: stats.completed,
              icon: CheckCircle,
              color: "bg-green-500",
            },
            {
              label: "Pending",
              value: stats.pending,
              icon: Clock,
              color: "bg-yellow-500",
            },
            {
              label: "In Progress",
              value: stats.inProgress,
              icon: Users,
              color: "bg-purple-500",
            },
          ].map(({ label, value, icon: Icon, color }) => (
            <div
              key={label}
              className="bg-white rounded-2xl p-5 shadow hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{label}</p>
                  <h2 className="text-2xl font-bold text-gray-800">{value}</h2>
                </div>
                <div className={`p-3 rounded-full text-white ${color}`}>
                  <Icon size={20} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Charts and Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Weekly Task Overview
            </h2>
            <BarChart3 className="text-gray-400" size={20} />
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Bar dataKey="completed" fill="#22c55e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pending" fill="#facc15" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* ✅ Active Users Card */}
        <div className="bg-white rounded-2xl p-6 shadow">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Active Users
          </h2>

          {uniqueUsers.length === 0 ? (
            <p className="text-gray-500 text-sm text-center py-6">
              No assigned users yet.
            </p>
          ) : (
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {uniqueUsers.map((usr, index) => (
                <div
                  key={index}
                  className="flex flex-col bg-gray-50 border border-gray-100 p-3 rounded-xl hover:bg-gray-100 transition"
                >
                  <span className="font-semibold text-gray-800">
                    {usr.fullname}
                  </span>
                  <span className="text-sm text-gray-500">{usr.email}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainContainer2;
