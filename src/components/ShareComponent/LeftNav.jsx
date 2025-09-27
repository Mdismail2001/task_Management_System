import React from "react";
import { FaTasks, FaUserCircle, FaCog, FaTachometerAlt } from "react-icons/fa";

const LeftNav = () => {
  return (
    <div className="grid grid-cols-12">
        
        <div className="col-span-4 bg-[rgb(55,85,219)] h-screen flex  justify-center">
          <FaUserCircle size={50} className="text-6xl mb- mt-20 " />
        </div>

        <div className="col-span-8 bg-white h-screen">
            <div className="flex-1  mt-20 ml-5">
            <h2 className="text-lg font-semibold py-5" >John Doe</h2>
            <ul className="space-y-4 py-10 ">
                <li className="flex">
                <FaTachometerAlt /> Overview
                </li>
                <li className="flex">
                <FaTasks /> Tasks
                </li>
                <li className="flex">
                <FaCog /> Settings
                </li>
            </ul>
            </div>
        </div>

    </div>
  );
};

export default LeftNav;
