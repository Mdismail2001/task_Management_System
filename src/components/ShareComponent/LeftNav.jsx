import React, { useContext } from "react";
import { FaTasks, FaCog, FaChartBar, FaUsers } from "react-icons/fa";
import { MdOutlineGridView } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const LeftNav = () => {
  const { user } = useContext(AuthContext);
  // console.log("LeftNav user:", user);

  if (!user) {
    //  Show a loading state
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500">Loading user...</p>
      </div>
    );
  }

  // Role-based routes
  const routes =
    user.role === "user"
      ? [
          { to: "/home/user", label: "Overview", icon: MdOutlineGridView, exact: true },
          { to: "/home/user/task", label: "Tasks", icon: FaTasks },
          { to: "/home/user/settings", label: "Settings", icon: FaCog },
        ]
      : [
          { to: "/home/admin", label: "Overview", icon: MdOutlineGridView, exact: true },
          { to: "/home/admin/all-task", label: "Tasks", icon: FaTasks },
          { to: "/home/admin/team", label: "Team", icon: FaUsers },
          { to: "/home/admin/report", label: "Report", icon: FaChartBar },
          { to: "/home/admin/settings", label: "Settings", icon: FaCog },
          ];

  return (
    <div className="grid grid-cols-12 bg-white shadow-lg">
      {/* Profile Section */}
      <div className="col-span-3 bg-[#3755db] h-screen flex justify-center">
        <div className="border-2 border-[#fabc37] items-center rounded-lg mt-20 p-1 inline-flex h-10 w-10">
          <img
            src="/src/assets/images/WhatsApp Image 2025-09-18 at 2.44.32 AM.jpeg"
            alt="Profile"
            className="w-7 h-7 object-cover rounded-sm"
          />
        </div>
      </div>

      {/* Navigation Section */}
      <div className="col-span-9 bg-white h-screen">
        <div className="flex-1 mt-20 ml-5">
          <h2 className="text-xl text-blue-900 font-bold py-2">My Space</h2>
          <p className="text-bold text-gray-500">
            Workspace: <span className="text-black">{user.role}</span> 
          </p>

          <ul className="space-y-6 py-10 text-xl relative">
            {routes.map((route) => {
              const Icon = route.icon;
              return (
                <li key={route.to}>
                  <NavLink
                    to={route.to}
                    end={route.exact}
                    className={({ isActive }) =>
                      `flex items-center gap-3 transition ${
                        isActive ? "text-[#3755db] font-bold" : "text-gray-500"
                      }`
                    }
                  >
                    <Icon className="size-5 text-[#3755db]" />
                    <span>{route.label}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LeftNav;
