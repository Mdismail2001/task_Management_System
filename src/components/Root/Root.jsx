import React from 'react';
import { Outlet } from 'react-router';
import LeftNav from '../ShareComponent/LeftNav';
import RightNav from '../ShareComponent/RightNav';
import Navbar from '../ShareComponent/Navbar';

const Root = () => {
  return (
    <div className="grid grid-cols-12 h-screen">
      {/* Left nav */}
      <section className="col-span-3 sticky top-0 h-screen overflow-y-auto">
        <LeftNav />
      </section>   
      {/* Main content */}
      <main className="col-span-6 h-screen overflow-y-auto">
        <Navbar></Navbar>
        <Outlet />
      </main>

      {/* Right nav */}
      <section className="col-span-3 sticky top-0 h-screen overflow-y-auto">
        <RightNav />
      </section>
    </div>
  );
};

export default Root;
