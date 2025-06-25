import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RiseLoader } from "react-spinners";

const Settings = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // Loading state

  const navigate = useNavigate();

  // Function to check token validity
  const checkTokenValidity = () => {
    const token = localStorage.getItem("adminToken");

    if (!token) return false; // No token found

    try {
      const decoded = JSON.parse(atob(token.split(".")[1])); // Decode JWT
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      return decoded.exp > currentTime; // Token is valid if exp > current time
    } catch (error) {
      return false; // If decoding fails, treat as invalid
    }
  };

  useEffect(() => {
    if (!checkTokenValidity()) {
      localStorage.removeItem("adminToken"); // Remove invalid token
      navigate("/"); // Redirect to login  
      return;
    }

    // Fetch the current admin details
    const fetchAdminDetails = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) {
          console.log("No token found, redirecting...");
          navigate("/"); 
          return;
        }
    
        const response = await fetch("https://api.thequackapp.com/api/admin/profile", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
    
        if (response.status === 401) {
          console.log("Token expired, logging out...");
          localStorage.removeItem("adminToken");
          navigate("/");
        } else {
          const data = await response.json();
          if (response.ok) {
            setName(data.name);
            setEmail(data.email);
          } else {
            setError("Failed to fetch profile details.");
          }
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Something went wrong while fetching profile details.");
      } finally {
        setLoading(false); // ✅ Make sure loading is set to false
      }
    };    
  
    fetchAdminDetails();
  }, [navigate]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    if (!checkTokenValidity()) {
      localStorage.removeItem("adminToken");
      navigate("/");
      return;
    }

    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(
        "https://api.thequackapp.com/api/admin/update-profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name, email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess("Profile updated successfully!");
        setPassword(""); // Clear password field after update
      } else {
        setError(data.message || "Failed to update profile.");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <RiseLoader color="white" size={25} speedMultiplier={1} />
      </div>
    );

  return (
    <div className="min-h-screen p-4 text-white w-auto">
      <div className="bg-black bg-opacity-25 rounded-lg p-6 shadow-lg">
        <h3 className="text-2xl mb-4">Profile Settings</h3>

        {error && (
          <div className="bg-red-600 text-white p-2 mb-4 rounded text-center">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-600 text-white p-2 mb-4 rounded text-center">
            {success}
          </div>
        )}

        <form onSubmit={handleUpdateProfile}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-none p-3 w-full rounded bg-black bg-opacity-40 text-white"
              placeholder="Enter name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-none p-3 w-full rounded bg-black bg-opacity-40 text-white"
              placeholder="Enter email"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-300 mb-2">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-none p-3 w-full rounded bg-black bg-opacity-40 text-white"
              placeholder="Enter new password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-auto bg-[#4f64de] hover:bg-[#3e50b3] text-white font-bold py-2 px-4 rounded-lg transition"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
