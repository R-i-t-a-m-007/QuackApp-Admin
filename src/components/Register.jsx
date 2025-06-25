import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://api.thequackapp.com/api/admin/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        setTimeout(() => navigate("/"), 2000); // Redirect to Login
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error(error);
      setError("Server Error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "radial-gradient(farthest-side ellipse at 10% 0, #333867 20%, #17193b)" }}>
      <div className="bg-[#141833] rounded-lg p-8 shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-white text-center">Admin Register</h2>

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

        <form onSubmit={handleRegister}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded text-gray-100 bg-[#23274a] focus:outline-none focus:ring focus:ring-blue-500"
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
            Register
          </button>
        </form>
        <p className="text-gray-300 mt-4 text-center">
          Already have an account?{" "}
          <Link to="/app" className="text-blue-400 hover:underline">Back to Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
