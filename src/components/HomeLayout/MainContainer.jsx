import Banner from "./Banner";
import TaskList from "./TaskList";

const MainContainer = () => {

  return (
    <div className=" min-h-screen">
      <div className="px-6 mt-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          👋 Hi, Username
        </h1>
        <p className="py-2">Welcome to our group</p>
      </div>

      <Banner />
      <TaskList />
    </div>
  );
};

export default MainContainer;
