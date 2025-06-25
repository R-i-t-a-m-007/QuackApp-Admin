import { FiUser } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import { FaPowerOff } from "react-icons/fa6";


function Navbar() {
  const navigate = useNavigate(); // Hook for navigation

  const handleLogout = () => {
    // Remove token from local storage
    localStorage.removeItem("adminToken");

    // Redirect to login page
    navigate("/app");
  };

  return (
    <nav className="top-0 left-0 w-full z-50 p-4 text-white flex items-center justify-between shadow-md">
      {/* Left Section: Logo */}
      <div className="flex items-center space-x-4 px-4">
        <NavLink to='/dashboard'>
          <img
            src="/app/logonew.png"
            alt="Logo"
            className="w-10 h-10 md:w-12 md:h-12 hidden md:block"
          />
        </NavLink>
      </div>

      {/* Center Section: Title */}
      <div className="absolute lg:left-1/2 left-36 transform -translate-x-1/2 top-6">
        <span className="text-lg md:text-2xl font-semibold whitespace-nowrap">
          THE QUACK APP
        </span>
      </div>

      {/* Right Section: Update Button & User Info */}
      <div className="flex items-center space-x-4 px-4">
        <button
          className="flex items-center space-x-2 bg-[#484e84] hover:bg-[#4f64de] text-white font-semibold py-1 px-3 rounded"
          onClick={handleLogout} // Call logout function
        >
          <FaPowerOff size={20} />
          <span>Logout</span>
        </button>

        <div className="flex items-center space-x-2 cursor-pointer">
          <FiUser size={20} />
          <span className="whitespace-nowrap">Admin</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
