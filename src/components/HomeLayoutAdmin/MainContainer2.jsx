import React from 'react';
import { useNavigate } from 'react-router-dom';

const MainContainer2 = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen">
      {/* Top Left */}
      <div className="absolute top-6 left-6">
        <h1 className="text-2xl font-bold text-blue-900">Task</h1>
        <p className="text-gray-400">Your task overview</p>
      </div>

      {/* Center Content */}
      <div className="flex flex-col items-center justify-center h-full text-center">
        <img
          src="/src/assets/images/Group 41.png"
          alt="No Task"
          className="w-40 h-40 object-contain mb-6"
        />
        <h1 className="text-xl font-semibold text-gray-700">No Task Yet</h1>
        <p className="text-gray-500 mb-4">Create your first task to get started</p>
        <button
        onClick={() => navigate('/home/admin/create-task')}
        className="px-4 py-3 bg-[#3755db] text-white  rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Create Task
        </button>
      </div>
    </div>
  );
};

export default MainContainer2;
