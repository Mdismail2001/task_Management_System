import React from "react";

const CreateTask = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Card container */}
      <div className="bg-white shadow-lg rounded-2xl flex flex-col md:flex-row w-[90%] max-w-5xl overflow-hidden">
        
        {/* Left Side - Full Image with Centered Text */}
        <div className="relative md:w-1/2 flex items-center justify-center">
          <img
            src="/src/assets/images/Frame 23.png"
            alt="workspace illustration"
            className="w-full h-full object-cover"
          />
          <h1 className="absolute text-3xl md:text-4xl font-bold text-white text-center drop-shadow-lg px-4">
            Your Environment <br /> Your Will
          </h1>
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800 text-center md:text-left">
            Create a Workspace
          </h2>
          <p className="text-sm text-gray-500 mt-2 text-center md:text-left">
            Fill in the details to set up your workspace and get started.
          </p>

          <form className="mt-6 space-y-4">
            {/* Workspace Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Workspace Title
              </label>
              <input
                type="text"
                placeholder="Enter workspace title"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[rgb(55,85,219)] focus:outline-none"
              />
            </div>

            {/* Workspace Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                placeholder="Enter workspace description"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[rgb(55,85,219)] focus:outline-none"
              ></textarea>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[rgb(55,85,219)] focus:outline-none">
                <option value="">Select category</option>
                <option value="personal">Personal</option>
                <option value="work">Work</option>
                <option value="study">Study</option>
              </select>
            </div>

            {/* Logo Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Workspace Logo (optional)
              </label>
              <input
                type="file"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-[rgb(55,85,219)] focus:outline-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-[rgb(55,85,219)] text-white py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              Next
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
