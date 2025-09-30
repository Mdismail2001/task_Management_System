import React from 'react';
import { Outlet } from 'react-router';
import LeftNav from '../ShareComponent/LeftNav';
import RightNav from '../ShareComponent/RightNav';
import Navbar from '../ShareComponent/Navbar';

const Root = () => {
  return (
    <div className="grid grid-cols-12 h-screen">
      {/* Left nav */}
      <section className="col-span-2 sticky top-0 h-screen overflow-y-auto">
        <LeftNav />
      </section>   

      {/* Main content */}
      <main className="col-span-8 h-screen overflow-y-auto bg-[#f5f7fc]">
        {/* Sticky Navbar */}
        <header className="sticky top-0 z-50 bg-[#f5f7fc] ">
          <Navbar />
        </header>

        {/* Page content */}
        <div className="p-4">
          <Outlet />
        </div>
      </main>

      {/* Right nav */}
      <section className="col-span-2 sticky top-0 h-screen overflow-y-auto">
        <RightNav />
      </section>
    </div>
  );
};

export default Root;
