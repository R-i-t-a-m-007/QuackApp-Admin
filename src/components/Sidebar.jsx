import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu, FiX, FiHome, FiUser, FiUsers, FiBriefcase, FiSettings } from "react-icons/fi";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button (Opens Sidebar) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="md:hidden fixed top-3 left-5 z-50 bg-[#484e84] text-white p-2 rounded-md shadow-lg"
        >
          <FiMenu size={24} />
        </button>
      )}

      {/* Sidebar Container */}
      {/* Sidebar Container */}
        <aside
          className={`fixed inset-y-0 left-0 h-auto w-64 text-gray-100 p-2 transform transition-transform duration-300 ease-in-out z-50 ${
            isOpen ? "translate-x-0 bg-black bg-opacity-90" : "-translate-x-64"
          } md:translate-x-0 md:relative md:w-64 flex-shrink-0`}
        >

        {/* Close Button (Visible Inside Sidebar) */}
        {isOpen && (
          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-5 text-xl bg-[#484e84] text-white p-2 rounded-md shadow-lg"
          >
            <FiX size={28} />
          </button>
        )}

        <nav className="flex flex-col cursor-pointer space-y-2 text-[0.8rem]">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center space-x-3 font-normal transition-all duration-200 px-4 py-6 rounded-md ${
              isActive ? "bg-black bg-opacity-50 text-gray-100" : "text-gray-100"
            } hover:bg-black hover:bg-opacity-30`
          }
          onClick={() => setIsOpen(false)}
        >
          <FiHome size={20} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/user-management"
          className={({ isActive }) =>
            `flex items-center space-x-3 font-normal transition-all duration-200 px-4 py-6 rounded-md ${
              isActive ? "bg-black bg-opacity-50 text-gray-100" : "text-gray-100"
            } hover:bg-black hover:bg-opacity-30`
          }
          onClick={() => setIsOpen(false)}
        >
          <FiUser size={24} />
          <span>Users</span>
        </NavLink>

        <NavLink
          to="/workers"
          className={({ isActive }) =>
            `flex items-center space-x-3 font-normal transition-all duration-200 px-4 py-6 rounded-md ${
              isActive ? "bg-black bg-opacity-50 text-gray-100" : "text-gray-100"
            } hover:bg-black hover:bg-opacity-30`
          }
          onClick={() => setIsOpen(false)}
        >
          <FiUsers size={20} />
          <span>Workers</span>
        </NavLink>

        <NavLink
          to='/jobs-posted'
          className={({ isActive }) =>
            `flex items-center space-x-3 font-normal transition-all duration-200 px-4 py-6 rounded-md ${
              isActive ? "bg-black bg-opacity-50 text-gray-100" : "text-gray-100"
            } hover:bg-black hover:bg-opacity-30`
          }
          onClick={() => setIsOpen(false)}
        >
          <FiBriefcase size={20} />
          <span>Jobs Posted</span>
        </NavLink>

        <NavLink
          
          className={() =>
            `flex items-center space-x-3 font-normal transition-all duration-200 px-4 py-6 rounded-md hover:bg-black hover:bg-opacity-30`
          }
          
        >
          <FiSettings size={20} />
          <span>Settings</span>
        </NavLink>

        </nav>
      </aside>

      {/* Mobile Overlay (Click outside to close sidebar) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}

export default Sidebar;
