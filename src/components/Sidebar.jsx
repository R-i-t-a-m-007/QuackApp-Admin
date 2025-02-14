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
          className="md:hidden fixed top-3 left-5 z-50 bg-[#536af8] text-white p-2 rounded-md shadow-lg"
        >
          <FiMenu size={24} />
        </button>
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 h-auto w-64 bg-[#2f3841] text-gray-100 p-6 transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-64"
        } md:translate-x-0 md:relative md:flex md:w-64`}
      >
        {/* Close Button (Visible Inside Sidebar) */}
        {isOpen && (
          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-5 text-xl bg-[#536af8] text-white p-2 rounded-md shadow-lg"
          >
            <FiX size={28} />
          </button>
        )}

        <nav className="flex flex-col space-y-6 text-lg">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center space-x-3 font-semibold transition-all duration-200 ${
                isActive ? "text-[#536af8]" : "text-gray-100"
              } hover:text-[#536af8]`
            }
            onClick={() => setIsOpen(false)}
          >
            <FiHome size={20} />
            <span>DASHBOARD</span>
          </NavLink>
          <NavLink
            to="/user-management"
            className={({ isActive }) =>
              `flex items-center space-x-3 font-semibold transition-all duration-200 ${
                isActive ? "text-[#536af8]" : "text-gray-100"
              } hover:text-[#536af8]`
            }
            onClick={() => setIsOpen(false)}
          >
            <FiUser size={24} />
            <span>USER MANAGEMENT</span>
          </NavLink>
          <NavLink
            to="/workers"
            className={({ isActive }) =>
              `flex items-center space-x-3 font-semibold transition-all duration-200 ${
                isActive ? "text-[#536af8]" : "text-gray-100"
              } hover:text-[#536af8]`
            }
            onClick={() => setIsOpen(false)}
          >
            <FiUsers size={20} />
            <span>WORKERS</span>
          </NavLink>
          <NavLink
            to="/jobs-posted"
            className={({ isActive }) =>
              `flex items-center space-x-3 font-semibold transition-all duration-200 ${
                isActive ? "text-[#536af8]" : "text-gray-100"
              } hover:text-[#536af8]`
            }
            onClick={() => setIsOpen(false)}
          >
            <FiBriefcase size={20} />
            <span>JOBS POSTED</span>
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `flex items-center space-x-3 font-semibold transition-all duration-200 ${
                isActive ? "text-[#536af8]" : "text-gray-100"
              } hover:text-[#536af8]`
            }
            onClick={() => setIsOpen(false)}
          >
            <FiSettings size={20} />
            <span>SETTINGS</span>
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
