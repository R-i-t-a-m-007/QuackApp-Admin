import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { RiseLoader } from "react-spinners";


const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    postcode: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state


  // Fetch user details and prefill the form
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `https://api.thequackapp.com/api/auth/users/${id}`
        );
        const { username, email, phone, address, postcode } = response.data;
        setFormData({ username, email, phone, address, postcode });
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally{
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission (update user)
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://api.thequackapp.com/api/auth/update/${id}`,
        formData
      );
      setShowModal(true); // Show success modal
      setTimeout(() => {
        setShowModal(false); // Hide modal after 3 seconds
        navigate("/user-management");
      }, 3000);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (loading) return (
    <div className="mt-96 items-center justify-center text-center relative">
          <RiseLoader
            color="white"
            size="25"
            speedMultiplier={1}
          />
    </div>
  )


  return (
    <div className="min-h-screen w-auto p-6">
      <div className="w-auto p-6 bg-opacity-25 bg-black rounded-lg shadow-lg mx-4">
        <h2 className="text-2xl font-bold text-white mb-6">Edit User</h2>
        <form onSubmit={handleUpdateUser} className="space-y-4 w-full">
          <div>
            <label className="block text-gray-300">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="border-none p-3 w-full rounded bg-black bg-opacity-40 text-white"
            />
          </div>
          <div>
            <label className="block text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="border-none p-3 w-full rounded bg-black bg-opacity-40 text-white"
            />
          </div>
          <div>
            <label className="block text-gray-300">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="border-none p-3 w-full rounded bg-black bg-opacity-40 text-white"
            />
          </div>
          <div className="flex justify-start space-x-4">
            <button
              type="button"
              onClick={() => navigate("/user-management")}
              className="bg-white text-gray-600 px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 transition"
            >
              Update
            </button>
          </div>
        </form>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-bold text-green-600 mb-4">Success!</h3>
            <p className="text-gray-700">User Updated Successfully</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditUser;
