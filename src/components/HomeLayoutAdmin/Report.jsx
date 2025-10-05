import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Download } from "lucide-react";

const projectData = [
  { name: "Frontend Development", completed: 12, pending: 3 },
  { name: "Backend Integration", completed: 9, pending: 5 },
  { name: "UI/UX Design", completed: 15, pending: 2 },
  { name: "Testing & QA", completed: 10, pending: 4 },
  { name: "Deployment", completed: 7, pending: 3 },
  { name: "Database Setup", completed: 8, pending: 1 },
  { name: "API Documentation", completed: 11, pending: 2 },
];

const Report = () => {
  return (
    <div className="min-h-screen bg-[#f6f8fc] px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Project Reports</h1>
          <p className="text-gray-500 text-sm mt-1">
            Visual overview of all ongoing projects and their progress
          </p>
        </div>
        <button className="flex items-center gap-2 bg-[#3755db] text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition mt-4 sm:mt-0">
          <Download size={18} /> Export Report
        </button>
      </div>

      {/* Chart Section */}
      <div className="bg-white p-10 rounded-2xl shadow-md mb-10">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Task Completion by Project
        </h2>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={projectData}
              margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              barGap={6}
            >
              <XAxis
                dataKey="name"
                tick={{ fill: "#555", fontSize: 12 }}
                angle={-20}
                textAnchor="end"
              />
              <YAxis tick={{ fill: "#555", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  borderRadius: "10px",
                  border: "1px solid #eee",
                }}
              />
              <Legend />
              <Bar
                dataKey="completed"
                fill="#4f46e5"
                name="Completed"
                radius={[6, 6, 0, 0]}
              />
              <Bar
                dataKey="pending"
                fill="#fbbf24"
                name="Pending"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Project Summary
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b text-gray-600 text-sm">
                <th className="pb-3 px-4">Project Name</th>
                <th className="pb-3 px-4 text-center">Completed</th>
                <th className="pb-3 px-4 text-center">Pending</th>
                <th className="pb-3 px-4 text-center">Progress</th>
              </tr>
            </thead>
            <tbody>
              {projectData.map((project, i) => {
                const total = project.completed + project.pending;
                const progress = ((project.completed / total) * 100).toFixed(1);
                return (
                  <tr
                    key={i}
                    className="border-b hover:bg-gray-50 transition text-sm"
                  >
                    <td className="py-3 px-4 font-medium text-gray-800">
                      {project.name}
                    </td>
                    <td className="py-3 px-4 text-green-600 text-center">
                      {project.completed}
                    </td>
                    <td className="py-3 px-4 text-yellow-600 text-center">
                      {project.pending}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex flex-col items-center">
                        <div className="w-32 bg-gray-200 rounded-full h-2 mb-1">
                          <div
                            className="bg-[#3755db] h-2 rounded-full transition-all"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500">
                          {progress}%
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Report;
