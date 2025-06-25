import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { RiseLoader } from "react-spinners";
import ReactPaginate from "react-paginate";

const WorkerProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workerData, setWorkerData] = useState({
    name: "",
    email: "",
    phone: "",
    joiningDate: "",
    availability: "",
    userCode: "",
    image: "",
    activities: [],
  });
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const activitiesPerPage = 5; // Set the number of activities per page

  // Fetch worker details
  useEffect(() => {
    const fetchWorker = async () => {
      try {
        const response = await axios.get(
          `https://api.thequackapp.com/api/workers/workers/${id}`
        );
        const {
          name,
          email,
          phone,
          joiningDate,
          availability,
          userCode,
          image,
          activities,
        } = response.data;

        activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        setWorkerData({
          name,
          email,
          phone,
          joiningDate,
          availability,
          userCode,
          image,
          activities,
        });
      } catch (error) {
        console.error("Error fetching worker:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorker();
  }, [id]);

  if (loading)
    return (
      <div className="mt-96 flex items-center justify-center text-center">
        <RiseLoader color="white" size="25" speedMultiplier={1} />
      </div>
    );

  // Pagination logic
  const offset = currentPage * activitiesPerPage;
  const paginatedActivities = workerData.activities.slice(offset, offset + activitiesPerPage);
  const pageCount = Math.ceil(workerData.activities.length / activitiesPerPage);

  return (
    <div className="min-h-screen p-6 flex">
      <div className="w-full flex flex-col md:flex-row gap-6">
        {/* Left Side: Profile Details */}
        <div className="md:w-1/2 bg-black bg-opacity-25 rounded-lg shadow-lg p-8 text-white backdrop-blur-md hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-4xl font-bold text-center mb-6 text-cyan-400">
            Worker Profile
          </h2>
          <div className="flex justify-center mb-8">
            <div className="h-40 w-40 rounded-full overflow-hidden border-4 border-cyan-400 shadow-lg">
              <img
                src={
                  workerData.image
                    ? workerData.image
                    : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg px-4">
            <p>
              <span className="font-semibold text-gray-400">Name:</span>{" "}
              <span className="text-cyan-300">{workerData.name}</span>
            </p>
            <p>
              <span className="font-semibold text-gray-400">Email:</span>{" "}
              <span className="text-cyan-300">{workerData.email}</span>
            </p>
            <p>
              <span className="font-semibold text-gray-400">Phone:</span>{" "}
              <span className="text-cyan-300">{workerData.phone}</span>
            </p>
            <p>
              <span className="font-semibold text-gray-400">User Code:</span>{" "}
              <span className="text-cyan-300">{workerData.userCode}</span>
            </p>
            <p>
              <span className="font-semibold text-gray-400">Joined:</span>{" "}
              <span className="text-cyan-300">
                {moment(workerData.joiningDate).format("MMMM Do YYYY, h:mm A")}
              </span>
            </p>
          </div>
          <div className="text-center mt-10">
            <button
              onClick={() => navigate("/workers")}
              className="bg-cyan-600 text-white rounded-md px-6 py-3 transition hover:bg-cyan-700 shadow-md hover:shadow-lg"
            >
              Back to Workers
            </button>
          </div>
        </div>

        {/* Right Side: Activities Section with Pagination */}
        <div className="md:w-1/2 bg-black bg-opacity-25 rounded-lg shadow-lg p-8 text-white backdrop-blur-md hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-4xl font-bold text-center mb-6 text-cyan-400">
            Recent Activities
          </h2>
          <div className="space-y-4">
            {paginatedActivities.length > 0 ? (
              paginatedActivities.map((activity, index) => (
                <div
                  key={index}
                  className="bg-[#2c2f55] rounded-md p-4 shadow hover:shadow-lg transition-shadow"
                >
                  <p className="text-cyan-300 font-semibold">
                    {activity.message} at {moment(activity.timestamp).format("h:mm A")}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-cyan-300">No recent activities found.</p>
            )}
          </div>

          {/* Pagination Controls */}
          {pageCount > 1 && (
            <ReactPaginate
              previousLabel={"← Previous"}
              nextLabel={"Next →"}
              breakLabel={"..."}
              pageCount={pageCount}
              marginPagesDisplayed={1}
              pageRangeDisplayed={2}
              onPageChange={({ selected }) => setCurrentPage(selected)}
              containerClassName={"flex justify-center items-center gap-2 mt-6"}
              pageClassName={"px-3 py-1 bg-[#2c2f55] text-cyan-300 rounded cursor-pointer hover:bg-cyan-600"}
              activeClassName={"bg-cyan-600 text-white"}
              previousClassName={"px-3 py-1 bg-gray-700 text-white rounded cursor-pointer hover:bg-cyan-600"}
              nextClassName={"px-3 py-1 bg-gray-700 text-white rounded cursor-pointer hover:bg-cyan-600"}
              disabledClassName={"opacity-50 cursor-not-allowed"}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkerProfile;
