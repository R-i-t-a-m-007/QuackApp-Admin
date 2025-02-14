// src/components/Card.js
import PropTypes from "prop-types";
const Card = ({ title, value }) => {
  return (
    <div className="bg-[#36404a] hover:bg-[#46515d] shadow-md rounded-lg py-8 px-6 w-[180px] sm:w-[200px] md:w-[220px] lg:w-[340px] text-center flex flex-col justify-center items-center">
      <h3 className="text-xl font-semibold text-gray-400">{title}</h3>
      <p className="text-2xl font-bold text-gray-100">{value}</p>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired, // Title must be a string
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Value can be a string or a number
};

export default Card;
