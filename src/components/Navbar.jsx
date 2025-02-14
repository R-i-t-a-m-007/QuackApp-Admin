import { FiUser, FiRefreshCcw } from "react-icons/fi";

function Navbar() {
  return (
    <nav className="top-0 left-0 w-full z-50 bg-[#3d4752] p-4 text-white flex items-center justify-between shadow-md">
      {/* Left Section: Logo (Hidden on Small Screens) */}
      <div className="flex items-center space-x-4 px-4">
        <img
          src="logonew.png"
          alt="Logo"
          className="w-10 h-10 md:w-12 md:h-12 hidden md:block"  // Hide on small screens
        />
      </div>

      {/* Center Section: Title (Move Above First Card) */}
      <div className="absolute lg:left-1/2 left-36 transform -translate-x-1/2 top-6">
        <span className="text-lg md:text-2xl font-semibold whitespace-nowrap">
          THE QUACK APP
        </span>
      </div>

      {/* Right Section: Update Button & User Info */}
      <div className="flex items-center space-x-4 px-4">
        <button className="flex items-center space-x-1 bg-[#536af8] hover:bg-[#4f64de] text-white font-semibold py-1 px-3 rounded">
          <FiRefreshCcw className="w-5 h-5" />
          <span>Update</span>
        </button>

        <div className="flex items-center space-x-2">
          <FiUser className="w-6 h-6" />
          <span className="whitespace-nowrap">Username</span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
