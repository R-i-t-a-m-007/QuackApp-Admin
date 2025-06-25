import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    try {
      const decoded = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
      const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds

      if (decoded.exp < currentTime) {
        console.log("Token expired. Logging out...");
        localStorage.removeItem("adminToken");
        setIsAuthenticated(false);
        return;
      }

      setIsAuthenticated(true); // Token is valid
    } catch (error) {
      console.log("Invalid token. Logging out...");
      localStorage.removeItem("adminToken");
      setIsAuthenticated(false);
    }
  }, []);

  if (isAuthenticated === null) {
    return <div className="text-white text-center">Loading...</div>;
  }

  if (isAuthenticated) {
    return children; // Render the protected component if authenticated
  } else {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          background:
            "radial-gradient(farthest-side ellipse at 10% 0, #333867 20%, #17193b)",
        }}
      >
        <div className="bg-[#141833] rounded-2xl p-8 shadow-lg w-full max-w-md text-center">
          <h2 className="text-2xl font-bold mb-6 text-white">Unauthorized</h2>
          <p className="text-gray-300 mb-4">Your session has expired. Please log in again.</p>
          <button
            onClick={() => navigate("/app")}
            className="bg-[#4f64de] hover:bg-[#3e50b3] text-white font-bold py-2 px-4 rounded-lg transition"
          >
            Go Back to Login
          </button>
        </div>
      </div>
    );
  }
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
