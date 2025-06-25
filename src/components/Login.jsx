import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  // Check if already logged in 
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    setError(""); // Clear error before attempting login

    try {
      const response = await fetch(
        "https://api.thequackapp.com/api/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email.toLowerCase(), password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Save token to local storage
        localStorage.setItem("adminToken", data.token);
        navigate("/dashboard");
      } else {
        setError(data.message || "Invalid email or password");
        setLoading(false); // Stop loading if login fails
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Something went wrong. Please try again.");
      setLoading(false); // Stop loading on error
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background:
          "radial-gradient(farthest-side ellipse at 10% 0, #333867 20%, #17193b)",
      }}
    >
      <div className="bg-[#141833] rounded-lg p-8 shadow-lg w-full max-w-md">
        <img src="/app/logonew.png" alt="logo" className="mx-auto w-24 h-24 mb-8" />
        <h2 className="text-2xl font-bold mb-6 text-white text-center">
          Admin Login
        </h2>

        {/* Error Message */}
        {error && (
          <div className="bg-red-600 text-white p-2 mb-4 rounded text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 rounded text-gray-100 bg-[#23274a] focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 rounded text-gray-100 bg-[#23274a] focus:outline-none focus:ring focus:ring-blue-500"
              placeholder="Enter password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#4f64de] hover:bg-[#3e50b3] text-white font-bold py-2 rounded-lg transition"
          >
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>

        
      </div>
    </div>
  );
};

export default Login;
