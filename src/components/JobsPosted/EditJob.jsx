import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { RiseLoader } from "react-spinners";


const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState({
    title: "",
    description: "",
    location: "",
    workersRequired: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Fetch job details and prefill the form
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(
          `https://api.thequackapp.com/api/jobs/jobs/${id}`
        );
        setJob(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching job details:", error);
        setError("Failed to load job details");
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setJob((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission (update job)
  const handleUpdateJob = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://api.thequackapp.com/api/jobs/update/${id}`,
        job
      );
      setShowModal(true); // Show success modal
      setTimeout(() => {
        setShowModal(false); // Hide modal after 3 seconds
        navigate("/jobs-posted");
      }, 3000);
    } catch (error) {
      console.error("Error updating job:", error);
      setError("Failed to update job details");
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
        <h2 className="text-2xl font-bold text-white mb-6">Edit Job</h2>
        <form onSubmit={handleUpdateJob} className="space-y-4 w-full">
          <input
            type="text"
            name="title"
            value={job.title}
            onChange={handleInputChange}
            placeholder="Title"
            className="w-full p-2 rounded bg-[#141833] text-gray-100"
          />
          <textarea
            name="description"
            value={job.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="w-full p-2 rounded bg-[#141833] text-gray-100"
          />
          <input
            type="text"
            name="location"
            value={job.location}
            onChange={handleInputChange}
            placeholder="Location"
            className="w-full p-2 rounded bg-[#141833] text-gray-100"
          />
          <input
            type="number"
            name="workersRequired"
            value={job.workersRequired}
            onChange={handleInputChange}
            placeholder="Workers Required"
            className="w-full p-2 rounded bg-[#141833] text-gray-100"
          />

          <div className="flex justify-start space-x-4 mt-4">
            <button
              type="button"
              onClick={() => navigate("/jobs")}
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
            <p className="text-gray-700">Job Updated Successfully</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditJob;
