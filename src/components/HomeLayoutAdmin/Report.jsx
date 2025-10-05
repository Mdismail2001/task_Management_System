import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ClipboardList, CheckCircle, Clock, AlertTriangle } from "lucide-react";

const taskSummary = [
  { name: "Mon", completed: 12, pending: 5 },
  { name: "Tue", completed: 18, pending: 3 },
  { name: "Wed", completed: 14, pending: 6 },
  { name: "Thu", completed: 20, pending: 2 },
  { name: "Fri", completed: 16, pending: 4 },
  { name: "Sat", completed: 8, pending: 7 },
  { name: "Sun", completed: 10, pending: 5 },
];

const recentReports = [
  { id: 1, title: "Frontend Development", completed: 12, pending: 3, overdue: 1 },
  { id: 2, title: "Backend Integration", completed: 9, pending: 5, overdue: 0 },
  { id: 3, title: "UI/UX Design", completed: 15, pending: 2, overdue: 2 },
  { id: 4, title: "Testing & QA", completed: 10, pending: 4, overdue: 1 },
];

const Report = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Reports & Insights</h1>
        <button className="bg-[#3755db] text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
          Download Report
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10">
        <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-4">
          <ClipboardList className="text-blue-600" size={32} />
          <div>
            <p className="text-sm text-gray-500">Total Tasks</p>
            <h3 className="text-xl font-semibold text-gray-800">240</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-4">
          <CheckCircle className="text-green-600" size={32} />
          <div>
            <p className="text-sm text-gray-500">Completed</p>
            <h3 className="text-xl font-semibold text-gray-800">180</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-4">
          <Clock className="text-yellow-500" size={32} />
          <div>
            <p className="text-sm text-gray-500">In Progress</p>
            <h3 className="text-xl font-semibold text-gray-800">45</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-4">
          <AlertTriangle className="text-red-600" size={32} />
          <div>
            <p className="text-sm text-gray-500">Overdue</p>
            <h3 className="text-xl font-semibold text-gray-800">15</h3>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-md mb-10">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Weekly Task Overview</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={taskSummary}>
              <XAxis dataKey="name" stroke="#888" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="completed" fill="#3755db" radius={[6, 6, 0, 0]} />
              <Bar dataKey="pending" fill="#fbbf24" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Report Table */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Project Summary</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b text-gray-600">
              <th className="pb-3">Project</th>
              <th className="pb-3">Completed</th>
              <th className="pb-3">Pending</th>
              <th className="pb-3">Overdue</th>
            </tr>
          </thead>
          <tbody>
            {recentReports.map((report) => (
              <tr key={report.id} className="border-b hover:bg-gray-50 transition">
                <td className="py-3 font-medium text-gray-800">{report.title}</td>
                <td className="py-3 text-green-600">{report.completed}</td>
                <td className="py-3 text-yellow-600">{report.pending}</td>
                <td className="py-3 text-red-600">{report.overdue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Report;
