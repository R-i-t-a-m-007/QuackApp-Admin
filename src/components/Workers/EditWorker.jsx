import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { RiseLoader } from "react-spinners";


const EditWorker = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [worker, setWorker] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Fetch worker details and prefill the form
  useEffect(() => {
    const fetchWorker = async () => {
      try {
        const response = await axios.get(
          `https://api.thequackapp.com/api/workers/workers/${id}`
        );
        setWorker(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching worker details:", error);
        setError("Failed to load worker details");
        setLoading(false);
      }
    };

    fetchWorker();
  }, [id]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setWorker((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission (update worker)
  const handleUpdateWorker = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://api.thequackapp.com/api/workers/update/${id}`,
        worker
      );
      setShowModal(true); // Show success modal
      setTimeout(() => {
        setShowModal(false); // Hide modal after 3 seconds
        navigate("/workers");
      }, 3000);
    } catch (error) {
      console.error("Error updating worker:", error);
      setError("Failed to update worker details");
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
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="min-h-screen w-auto p-6">
      <div className="w-auto p-6 bg-opacity-25 bg-black rounded-lg shadow-lg mx-4">
        <h2 className="text-2xl font-bold text-white mb-6">Edit Worker</h2>
        <form onSubmit={handleUpdateWorker} className="space-y-4 w-full">
          <input
            type="text"
            name="name"
            value={worker.name}
            onChange={handleInputChange}
            placeholder="Name"
            className="w-full p-3 rounded bg-black bg-opacity-40 text-white"
          />
          <input
            type="email"
            name="email"
            value={worker.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="w-full p-3 rounded bg-black bg-opacity-40 text-white"
          />
          <input
            type="text"
            name="phone"
            value={worker.phone}
            onChange={handleInputChange}
            placeholder="Phone"
            className="w-full p-3 rounded bg-black bg-opacity-40 text-white"
          />
          <div className="flex justify-start space-x-4 mt-4">
            <button
              type="button"
              onClick={() => navigate("/workers")}
              className="bg-white text-gray-600 px-4 py-2 rounded transition"
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
            <p className="text-gray-700">Worker Updated Successfully</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditWorker;
