import React from 'react';
import Navbar from '../ShareComponent/Navbar';
import Banner from '../ShareComponent/Banner';

const MainContainer = () => {
  return (
    <div className="bg-[#f5f7fc] h-screen py-5">
      {/* Navbar */}
      <header>
        <Navbar />
      </header>

      {/* Main Content */}
      <div className="px-6 mt-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          👋 Hi, Username
        </h1>
        <p>Welcome to our group</p>
      </div>
      <Banner></Banner>
    </div>
  );
};

export default MainContainer;
