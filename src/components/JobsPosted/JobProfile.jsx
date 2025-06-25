import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { FaMapMarkerAlt, FaUsers, FaCode, FaInfoCircle, FaUserShield } from "react-icons/fa";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { RiseLoader } from "react-spinners";


const JobProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    shift: "",
    workersRequired: "",
    workers: [],
    invitedWorkers: [],
    jobStatus: false,
    userCode: "",
    createdAt: "",
  });
  const [loading, setLoading] = useState(true); // Loading state


  // Fetch job details from backend
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(
          `https://api.thequackapp.com/api/jobs/jobs/${id}`
        );
        const {
          title,
          description,
          location,
          date,
          shift,
          workersRequired,
          workers,
          invitedWorkers,
          jobStatus,
          userCode,
          createdAt,
        } = response.data;
        setJobData({
          title,
          description,
          location,
          date,
          shift,
          workersRequired,
          workers,
          invitedWorkers,
          jobStatus,
          userCode,
          createdAt,
        });
      } catch (error) {
        console.error("Error fetching job:", error);
      }
      finally{
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) return (
    <div className="mt-96 items-center justify-center text-center">
          <RiseLoader
            color="white"
            size="25"
            speedMultiplier={1}
          />
    </div>
  )

  return (
    <div className="min-h-[90vh] p-6 flex justify-center items-center">
      <div className="w-full h-full bg-black bg-opacity-30 rounded-lg shadow-lg p-8 text-white backdrop-blur-md space-y-8">
        <h2 className="text-4xl font-bold text-start mb-8 text-gray-300">
          {jobData.title}
        </h2>

        {/* Main Job Info */}
        <div className="bg-[#22254b] p-6 rounded-md space-y-6">
          <h3 className="text-3xl font-bold text-cyan-300 flex items-center gap-2">
            <FaInfoCircle className="text-gray-400" /> Job Details
          </h3>
          <p className="text-gray-400">{jobData.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-[#2477ff]" />
              <span className="font-semibold text-gray-400">Location:</span>
              <span className="text-[#2477ff]">{jobData.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaUserShield className="text-[#2477ff]" />
              <span className="font-semibold text-gray-400">Shift:</span>
              <span className="text-[#2477ff]">{jobData.shift}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaUsers className="text-[#2477ff]" />
              <span className="font-semibold text-gray-400">
                Workers Required:
              </span>
              <span className="text-[#2477ff]">
                {jobData.workersRequired}
              </span>
            </div>
            <div className="flex items-center gap-2">
            <BiSolidMessageSquareDetail className="text-[#2477ff]" />
              <span className="font-semibold text-gray-400">
                Job Status:
              </span>
            <span
              className={`font-semibold ${
                jobData.jobStatus
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {jobData.jobStatus ? "Completed" : "Incomplete"}
            </span>
          </div>
          </div>
          
        </div>

        {/* Workers Information */}
        <div className="bg-[#22254b] p-6 rounded-md">
          <h3 className="text-3xl font-bold text-cyan-300 mb-4 flex items-center gap-2">
            <FaUsers className="text-gray-400" /> Workers Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Assigned Workers */}
            <div className="bg-[#333867] p-4 rounded-md shadow hover:shadow-lg transition-shadow">
              <h4 className="text-xl font-semibold text-cyan-300 mb-2">
                Assigned Workers ({jobData.workers.length})
              </h4>
              {jobData.workers.map((worker) => (
                <div
                  key={worker._id}
                  className="bg-[#484e84] p-2 rounded-md mb-2 space-y-2"
                >
                  <p className="text-white font-semibold">{worker.name}</p>
                  <p className="text-gray-300 text-sm">{worker.email}</p>
                </div>
              ))}
              {jobData.workers.length === 0 && (
                <p className="text-gray-400">No workers assigned.</p>
              )}
            </div>

            {/* Invited Workers */}
            <div className="bg-[#333867] p-4 rounded-md shadow hover:shadow-lg transition-shadow">
              <h4 className="text-xl font-semibold text-cyan-300 mb-2">
                Invited Workers ({jobData.invitedWorkers.length})
              </h4>
              {jobData.invitedWorkers.map((worker) => (
                <div
                  key={worker._id}
                  className="bg-[#484e84] p-2 rounded-md mb-2 space-y-2"
                >
                  <p className="text-white font-semibold">{worker.name}</p>
                  <p className="text-gray-300 text-sm">{worker.email}</p>
                </div>
              ))}
              {jobData.invitedWorkers.length === 0 && (
                <p className="text-gray-400">No workers invited.</p>
              )}
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-[#22254b] p-6 rounded-md">
          <h3 className="text-3xl font-bold text-cyan-300 mb-4 flex items-center gap-2">
            <FaCode className="text-gray-400" /> Additional Information
          </h3>
          <div className="space-y-4">
          <p>
            <span className="font-semibold text-gray-400">User Code:</span>{" "}
            <span className="text-[#2477ff]">{jobData.userCode}</span>
          </p>
          <p>
            <span className="font-semibold text-gray-400">Posted On:</span>{" "}
            <span className="text-[#2477ff]">
              {moment(jobData.createdAt).format("MMMM Do YYYY, h:mm A")}
            </span>
          </p>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center mt-10">
          <button
            onClick={() => navigate("/jobs-posted")}
            className="bg-[#484e84] text-white rounded-md px-6 py-3 transition hover:bg-[#5a63a3] shadow-md hover:shadow-lg"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobProfile;
