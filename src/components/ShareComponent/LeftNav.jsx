import React, { useContext } from "react";
import { FaTasks,  FaCog, FaTachometerAlt, } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";

const LeftNav = () => {
  const {user} = useContext(AuthContext);
  console.log(user.role);
  return (
    <div className="grid grid-cols-12  bg-white shadow-lg ">
        
        <div className="col-span-2 bg-[rgb(55,85,219)] h-screen flex  justify-center">
          <div className="border-4 border-yellow-400 rounded-2xl mt-20 p-1 inline-flex h-14">
          <img 
            src="/src/assets/images/Rectangle 10.png" 
            alt="Profile" 
            className="w-10 h-10 object-cover  rounded-2xl "
          />
          </div>
        </div>

        <div className="col-span-10 bg-white h-screen">
            <div className="flex-1  mt-20 ml-5">
            <h2 className="text-lg font-semibold py-5" >{ user?.name}</h2>
              <ul className="space-y-4 py-10">
                <li className="flex items-center gap-3">
                  <FaTachometerAlt />
                  {user?.role === "user" ? (
                  <Link to="/home/user">Overview</Link>
                  ) : (
                  <Link to="/home/admin">Overview</Link>
                  )}               
                </li>

                <li className="flex items-center gap-3">
                  <FaTasks /> 
                  {user?.role === "user"? 
                  (<Link to ="/home/user/task">Tasks</Link>)
                  :(<Link to ="/home/admin/all-task" >Tasks</Link>)
                  }
                </li>

                <li className="flex items-center gap-3">
                  <FaCog />
                  {user?.role ==="user"? 
                  (<Link to="/home/user/settings" >Settings</Link>):
                  (<Link to="/home/admin/settings" >Settings</Link>)}
                   
                </li>
              </ul>
            </div>
        </div>

    </div>
  );
};

export default LeftNav;
