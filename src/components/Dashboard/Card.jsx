import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { PulseLoader } from "react-spinners";

const API_ENDPOINTS = {
  Users: "https://api.thequackapp.com/api/auth/users",
  Revenue: "https://api.thequackapp.com/api/auth/total-price",
  Companies: "https://api.thequackapp.com/api/companies/count",
  Workers: "https://api.thequackapp.com/api/workers/workers",
  "Jobs Posted": "https://api.thequackapp.com/api/jobs/total-count",
};

const Card = ({ title, icon: Icon }) => {
  const [value, setValue] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_ENDPOINTS[title]);
        let dataValue = 0;

        if (title === "Users") {
          dataValue = response.data.length;
        } else if (title === "Revenue") {
          dataValue = `£ ${response.data.totalPrice}`;
        } else if (title === "Companies") {
          dataValue = response.data.count;
        } else if (title === "Workers") {
          const approvedWorkers = response.data.filter(worker => worker.approved === true);
          dataValue = approvedWorkers.length;
        } else if (title === "Jobs Posted") {
          dataValue = response.data.totalJobs;
        }

        setValue(dataValue);
      } catch (error) {
        console.error(`Error fetching ${title} data:`, error);
        setValue("Error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [title]);

  return (
    <div className="bg-opacity-25 bg-black shadow-md rounded-lg py-6 px-4 text-center flex flex-col justify-center items-center space-y-1 hover:bg-black hover:bg-opacity-50">
      <div className="flex items-center space-x-2">
        {Icon && <Icon className="text-gray-400 text-xl" />}
        <h3 className="text-base font-light text-gray-400">{title}</h3>
      </div>
      <div className="flex items-center space-x-2">
        {loading ? (
          <PulseLoader color="white" size={8} speedMultiplier={0.6} />
        ) : (
          <p className="text-xl font-semibold text-gray-100">{value}</p>
        )}
      </div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.elementType,
};

export default Card;
