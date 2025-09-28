import { useNavigate } from "react-router";
import Banner from "./Banner";
import TaskList from "./TaskList";

const MainContainer = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner Section */}
      <Banner />

      {/* Welcome Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Left Side - Text */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Let’s get you started 🚀
            </h1>
            <p className="text-gray-600 mb-6">
              Organize your tasks, track progress, and stay productive with your
              personal workspace.
            </p>
            <button onClick={()=> navigate('/home/user/task')} className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl shadow-md hover:scale-105 transition transform">
             Get Start 
            </button>
          </div>

          {/* Right Side - Image */}
          <div className="flex-1">
            <img
              src='/src/assets/images/Frame 23.png'
              alt="Workspace Illustration"
              className="w-full max-w-md mx-auto drop-shadow-lg rotate-180"
            />
          </div>
        </div>
      </div>

    </div>
  );
};

export default MainContainer;
