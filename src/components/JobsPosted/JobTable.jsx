import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import axios from "axios";
import { RiseLoader } from "react-spinners";


const JobsTable = () => {
  const [jobs, setJobs] = useState([]);
  const [filtering, setFiltering] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteJobId, setDeleteJobId] = useState(null);
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  // Fetching data from Jobs API
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get("https://api.thequackapp.com/api/jobs/all-jobs");
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
      finally{
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const data = useMemo(() => jobs, [jobs]);

  // Table Columns
  const columns = useMemo(
    () => [
      { accessorKey: "title", header: "Title" },
      {
        accessorKey: "description",
        header: "Description",
        cell: ({ getValue }) => {
          const description = getValue();
          const truncatedDescription = description.length > 20
            ? description.slice(0, 20) + "..."
            : description;
          return (
            <div
              className="relative group cursor-pointer"
              title={description}
            >
              <span>{truncatedDescription}</span>
              <span className="absolute left-0 bg-gray-800 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {description}
              </span>
            </div>
          );
        },
      },
      { accessorKey: "location", header: "Location" },
      {
        accessorKey: "date",
        header: "Date",
        cell: ({ getValue }) => {
          const date = new Date(getValue());
          return date.toLocaleDateString("en-UK");
        },
      },
      { accessorKey: "shift", header: "Shift" },
      { accessorKey: "workersRequired", header: "Workers Required" },
      {
        accessorKey: "workers",
        header: "Workers Assigned",
        cell: ({ getValue }) => {
          const workersAssigned = getValue();
          if (workersAssigned.length === 0) return "None";
          return (
            <div className="space-y-1">
              {workersAssigned.map((worker) => (
                <span key={worker._id} className="block text-sm text-gray-100">
                  {worker.name}
                </span>
              ))}
            </div>
          );
        },
      },
      {
        accessorKey: "invitedWorkers",
        header: "Invited Workers",
        cell: ({ getValue }) => {
          const invitedWorkers = getValue();
          if (invitedWorkers.length === 0) return "None";
          return (
            <div className="space-y-1">
              {invitedWorkers.map((worker) => (
                <span key={worker._id} className="block text-sm text-gray-100">
                  {worker.name}
                </span>
              ))}
            </div>
          );
        },
      },
      {
        accessorKey: "jobStatus",
        header: "Status",
        cell: ({ getValue }) =>
          getValue() ? (
            <span className="text-green-500 font-bold">Complete</span>
          ) : (
            <span className="text-red-500 font-bold">Incomplete</span>
          ),
      },
      { accessorKey: "userCode", header: "User Code" },
      {
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex justify-center space-x-2">
            <button
              onClick={() => navigate(`/job-profile/${row.original._id}`)}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
            >
              View
            </button>
            <button
              onClick={() => navigate(`/edit-job/${row.original._id}`)}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
            >
              Edit
            </button>
            <button
              onClick={() => openDeleteModal(row.original._id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        ),
      },
    ],
    []
  );

  // Delete functions
  const openDeleteModal = (jobId) => {
    setDeleteJobId(jobId);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteJobId(null);
    setIsDeleteModalOpen(false);
  };

  const handleDelete = async () => {
    if (deleteJobId) {
      try {
        const response = await axios.delete(
          `https://api.thequackapp.com/api/jobs/job/${deleteJobId}`
        );
        if (response.status === 200) {
          setJobs((prevJobs) => prevJobs.filter((job) => job._id !== deleteJobId));
          setIsDeleteSuccess(true);
          setTimeout(() => setIsDeleteSuccess(false), 2000);
        }
      } catch (error) {
        console.error("Error deleting job:", error);
      }
    }
    closeDeleteModal();
  };

  // Create table instance
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { globalFilter: filtering },
    onGlobalFilterChange: setFiltering,
  });

  if (loading) return (
    <div className="my-auto items-center justify-center text-center relative">
          <RiseLoader
            color="white"
            size="25"
            speedMultiplier={1}
          />
    </div>
  )

  return (
    <div className="bg-opacity-25 bg-black rounded-lg p-4 w-full min-h-[90vh] overflow-x-auto">
      <h2 className="text-base font-bold mb-4 text-white">Jobs Table</h2>

      {/* Search Bar */}
      <input
        type="text"
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
        placeholder="Search by Job Title..."
        className="border p-2 text-sm rounded mb-3 w-full md:w-1/3 focus:ring text-gray-100 bg-[#141833] focus:ring-blue-300 outline-none"
      />

      <div className="overflow-auto">
        <table className="w-full text-xs">
          <thead className="text-gray-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="p-2 text-center cursor-pointer text-white rounded-md whitespace-nowrap"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getIsSorted() === "asc" ? " 🔼" : header.column.getIsSorted() === "desc" ? " 🔽" : " ↕"}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="text-gray-200">
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="odd:bg-gray-900">
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="p-2 text-[10px] text-center"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-4 text-base text-gray-300"
                >
                  Jobs record empty
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div>
          <span className="text-gray-200">
            {table.getRowModel().rows.length} Entries
          </span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-3 py-1 bg-[#484e84] rounded disabled:opacity-60 hover:bg-[#4f64de]"
          >
            Previous
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-3 py-1 bg-[#484e84] rounded disabled:opacity-60 hover:bg-[#4f64de]"
          >
            Next
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-3">Are you sure?</h2>
            <p className="text-lg text-gray-700 mb-5">
              Are you sure you want to delete this worker? This action cannot
              be undone.
            </p>
            <div className="flex justify-around">
              <button
                onClick={closeDeleteModal}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Notification */}
      {isDeleteSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-green-500 p-6 rounded-lg text-white">
            <h3 className="text-xl">User deleted successfully!</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobsTable;
