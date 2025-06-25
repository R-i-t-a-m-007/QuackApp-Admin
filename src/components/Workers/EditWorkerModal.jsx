import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";

const EditWorkerModal = ({ worker, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: worker.name,
    email: worker.email,
    phone: worker.phone,
    joiningDate: worker.joiningDate,
    userCode: worker.userCode,
    approved: worker.approved,
    invitedJobs: worker.invitedJobs,
    image: worker.image,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `https://api.thequackapp.com/api/workers/update/${worker.id}`, // Replace with actual API URL
        formData
      );
      alert("Worker details updated successfully!");
      onSave(); // To refresh the table data or close the modal
      onClose(); // Close the modal
    } catch (error) {
      console.error("Error updating worker details:", error);
      alert("Failed to update worker details");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 md:w-1/2">
        <h2 className="text-xl font-bold mb-4">Edit Worker Details</h2>
        <form className="space-y-4">
          <div className="flex space-x-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="p-2 rounded w-1/3"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="p-2 rounded w-1/3"
            />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="p-2 rounded w-1/3"
            />
          </div>
          <div className="flex space-x-4">
            <input
              type="date"
              name="joiningDate"
              value={moment(formData.joiningDate).format("YYYY-MM-DD")}
              onChange={handleChange}
              className="p-2 rounded w-1/3"
            />
            <input
              type="text"
              name="userCode"
              value={formData.userCode}
              onChange={handleChange}
              placeholder="User Code"
              className="p-2 rounded w-1/3"
            />
            <input
              type="checkbox"
              name="approved"
              checked={formData.approved}
              onChange={(e) => handleChange({ target: { name: "approved", value: e.target.checked } })}
              className="p-2 rounded"
            />
            <span>Approved</span>
          </div>
          <div className="flex justify-between items-center mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditWorkerModal;
