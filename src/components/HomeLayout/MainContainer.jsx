import React, { useState, useEffect } from "react";
import Navbar from "../ShareComponent/Navbar";
import Banner from "./Banner";
import TaskList from "./TaskList";

const MainContainer = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-[#f5f7fc] min-h-screen">
      {/* Navbar */}
      <header
        className={`sticky top-0 z-50 transition-colors duration-300 ${
          isScrolled ? "bg-white shadow-md" : "bg-[#f5f7fc]"
        }`}
      >
        {/* <Navbar /> */}
      </header>
      {/* user banner */}
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
