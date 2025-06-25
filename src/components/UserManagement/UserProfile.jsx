import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import ReactPaginate from "react-paginate";
import { RiseLoader } from "react-spinners";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";


const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    phone: "",
    package: "",
    createdAt: "",
    userCode: "",
    image: "",
    activities: [],
  });

  const [workers, setWorkers] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [companyWorkers, setCompanyWorkers] = useState({});
  const [expandedCompanyIds, setExpandedCompanyIds] = useState([]);

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const activitiesPerPage = 5;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `https://api.thequackapp.com/api/auth/users/${id}`
        );
        const {
          username,
          email,
          phone,
          package: userPackage,
          createdAt,
          userCode,
          image,
          activities,
        } = response.data;

        activities.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        setUserData({
          username,
          email,
          phone,
          package: userPackage,
          createdAt,
          userCode,
          image,
          activities,
        });

        if (userPackage === "Pro") {
          const companiesRes = await axios.get(
            `https://api.thequackapp.com/api/companies/by-user/${response.data._id}`
          );
          setCompanies(companiesRes.data);
        } else {
          const workersRes = await axios.get(
            `https://api.thequackapp.com/api/workers/by-user-code/${userCode}`
          );
          setWorkers(workersRes.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleCompanyToggle = async (companyCode) => {
    const isExpanded = expandedCompanyIds.includes(companyCode);
    if (isExpanded) {
      setExpandedCompanyIds(expandedCompanyIds.filter((code) => code !== companyCode));
    } else {
      setExpandedCompanyIds([...expandedCompanyIds, companyCode]);

      if (!companyWorkers[companyCode]) {
        try {
          const res = await axios.get(
            `https://api.thequackapp.com/api/workers/by-user-code/${companyCode}`
          );
          setCompanyWorkers((prev) => ({ ...prev, [companyCode]: res.data }));
        } catch (err) {
          console.error("Error fetching company workers:", err);
        }
      }
    }
  };

  const offset = currentPage * activitiesPerPage;
  const paginatedActivities = userData.activities.slice(offset, offset + activitiesPerPage);
  const pageCount = Math.ceil(userData.activities.length / activitiesPerPage);

  if (loading) {
    return (
      <div className="mt-96 flex items-center justify-center text-center">
        <RiseLoader color="white" size={25} speedMultiplier={1} />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 flex">
      <div className="w-full flex flex-col md:flex-row gap-6">
        {/* LEFT SIDE */}
        <div className="md:w-1/2 bg-black bg-opacity-25 rounded-lg shadow-lg p-8 text-white backdrop-blur-md hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-4xl font-bold text-center mb-6 text-cyan-400">User Profile</h2>
          <div className="flex justify-center mb-8">
            <div className="h-40 w-40 rounded-full overflow-hidden border-4 border-cyan-400 shadow-lg">
              <img
                src={
                  userData.image ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
                alt="Profile"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-lg px-4">
            <p><span className="font-semibold text-gray-400">Username:</span> <span className="text-cyan-300">{userData.username}</span></p>
            <p><span className="font-semibold text-gray-400">Email:</span> <span className="text-cyan-300">{userData.email}</span></p>
            <p><span className="font-semibold text-gray-400">Phone:</span> <span className="text-cyan-300">{userData.phone}</span></p>
            <p><span className="font-semibold text-gray-400">User Code:</span> <span className="text-cyan-300">{userData.userCode}</span></p>
            <p><span className="font-semibold text-gray-400">Package:</span> <span className="text-cyan-300">{userData.package || "None"}</span></p>
            <p><span className="font-semibold text-gray-400">Joined:</span> <span className="text-cyan-300">{moment(userData.createdAt).format("MMMM Do YYYY, h:mm A")}</span></p>
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => navigate("/user-management")}
              className="bg-cyan-600 text-white rounded-md px-6 py-3 transition hover:bg-cyan-700 shadow-md hover:shadow-lg"
            >
              Back to Users
            </button>
          </div>

          {/* Workers for Basic Users */}
          {userData.package !== "Pro" && (
            <div className="mt-10">
              <h3 className="text-2xl font-bold text-center text-cyan-400 mb-4">Workers Under This User</h3>
              {workers.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {workers.map((worker) => (
                    <div
                      key={worker._id}
                      className="flex items-center gap-4 p-4 bg-[#2c2f55] rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                      <img
                        src={worker.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                        alt="Worker"
                        className="w-16 h-16 rounded-full object-cover border-2 border-cyan-400"
                      />
                      <div>
                        <p className="text-cyan-300 font-semibold">{worker.name}</p>
                        <p className="text-gray-400 text-sm">{worker.email || "Worker"}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-cyan-300">No workers found for this user.</p>
              )}
            </div>
          )}

          {/* Companies & Workers Tree for Pro Users */}
          {userData.package === "Pro" && (
            <div className="mt-10">
              <h3 className="text-2xl font-bold text-center text-cyan-400 mb-4">Departments Under This User</h3>
              {companies.length > 0 ? (
                <div className="space-y-4">
                  {companies.map((company) => (
                    <div
                      key={company._id}
                      className="p-4 bg-[#2c2f55] rounded-lg shadow-md hover:shadow-lg transition-shadow"
                    >
                      <div
                        onClick={() => handleCompanyToggle(company.comp_code)}
                        className="flex items-center justify-between cursor-pointer"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-cyan-600 text-white font-bold text-xl">
                            {company.name?.charAt(0).toUpperCase() || "C"}
                          </div>
                          <div>
                            <p className="text-cyan-300 font-semibold">{company.name}</p>
                            <p className="text-gray-400 text-sm">{company.email}</p>
                          </div>
                        </div>
                        <div className="text-cyan-300 text-2xl">
                          {expandedCompanyIds.includes(company.comp_code) ? <IoIosArrowUp /> : <IoIosArrowDown />
                          }
                        </div>
                      </div>

                      {expandedCompanyIds.includes(company.comp_code) && (
                        <div className="mt-4 ml-4 border-l-2 border-cyan-500 pl-4">
                          <p className="text-cyan-400 font-bold mb-4">Workers under this Department :</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {companyWorkers[company.comp_code]?.map((worker) => (
                              <div
                                key={worker._id}
                                className="flex items-center gap-4 bg-[#1e1f3a] p-3 rounded-lg shadow"
                              >
                                <img
                                  src={worker.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                                  alt="Worker"
                                  className="w-10 h-10 rounded-full object-cover border-2 border-cyan-300"
                                />
                                <div>
                                  <p className="text-cyan-200">{worker.name}</p>
                                  <p className="text-gray-400 text-sm">{worker.email}</p>
                                  <p className={`text-sm font-semibold ${
                                      worker.approved ? "text-green-400" : "text-yellow-400"
                                    }`} ><span className="text-gray-200">Request :</span> {worker.approved ? "Approved" : "Pending"}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-cyan-300">No departments found for this user.</p>
              )}
            </div>
          )}
        </div>

        {/* RIGHT SIDE - Activities */}
        <div className="md:w-1/2 bg-black bg-opacity-25 rounded-lg shadow-lg p-8 text-white backdrop-blur-md hover:shadow-2xl transition-shadow duration-300">
          <h2 className="text-4xl font-bold text-center mb-6 text-cyan-400">Recent Activities</h2>
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
              pageClassName={
                "px-3 py-1 bg-[#2c2f55] text-cyan-300 rounded cursor-pointer hover:bg-cyan-600"
              }
              activeClassName={"bg-cyan-600 text-white"}
              previousClassName={
                "px-3 py-1 bg-gray-700 text-white rounded cursor-pointer hover:bg-cyan-600"
              }
              nextClassName={
                "px-3 py-1 bg-gray-700 text-white rounded cursor-pointer hover:bg-cyan-600"
              }
              disabledClassName={"opacity-50 cursor-not-allowed"}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
