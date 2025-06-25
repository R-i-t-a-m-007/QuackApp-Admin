import { useState } from "react";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://api.thequackapp.com/api/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, newPassword }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
      } else {
        setError(data.message || "Failed to reset password.");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      setError("An error occurred while resetting the password.");
    } finally {
      setLoading(false);
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
      <div className="bg-[#141833] rounded-lg p-8 shadow-lg w-full max-w-md text-center">
        {/* Logo */}
        <img src="/app/logonew.png" alt="logo" className="mx-auto w-24 h-24 mb-8" />


        <h2 className="text-2xl font-bold text-white mb-4">Reset Password</h2>

        {/* Success Message */}
        {success && (
          <div className="bg-green-600 text-white p-2 mb-4 rounded">
            Password has been reset successfully.
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-600 text-white p-2 mb-4 rounded">{error}</div>
        )}

        {/* Password Inputs */}
        {!success && (
          <>
            <div className="mb-4 text-left">
              <label className="block text-gray-300 mb-2">New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 rounded text-gray-100 bg-[#23274a] focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>
            <div className="mb-6 text-left">
              <label className="block text-gray-300 mb-2">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 rounded text-gray-100 bg-[#23274a] focus:outline-none focus:ring focus:ring-blue-500"
                required
              />
            </div>

            <button
              onClick={handleResetPassword}
              className="w-full bg-[#4f64de] hover:bg-[#3e50b3] text-white font-bold py-2 rounded-lg transition"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
