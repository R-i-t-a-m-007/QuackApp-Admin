import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import moment from "moment";
import { RiseLoader } from "react-spinners";

const WorkerDetailTable = () => {
  const [workers, setWorkers] = useState([]);
  const [filtering, setFiltering] = useState("");
  const [editWorker, setEditWorker] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isUpdateSuccess, setIsUpdateSuccess] = useState(false); // Success state for update
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // Delete modal state
  const [workerToDelete, setWorkerToDelete] = useState(null); // Worker to delete
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false); // State for delete success modal
  const [loading, setLoading] = useState(true); // Loading state

  const navigate = useNavigate();

  // Fetch worker data from API
  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const response = await fetch(
          "https://api.thequackapp.com/api/workers/workers"
        );
        if (!response.ok) throw new Error("Failed to fetch data");
        const data = await response.json();
        setWorkers(data);
      } catch (error) {
        console.error("Error fetching workers:", error);
      }
      finally{
        setLoading(false);
      }
    };

    fetchWorkers();
  }, []);


  const handleSaveChanges = async () => {
    if (!editWorker || !editWorker._id) {
      console.log("No worker selected or worker ID is missing.");
      return;
    }

    try {
      const response = await fetch(
        `https://api.thequackapp.com/api/workers/update/${editWorker._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: editWorker.name,
            email: editWorker.email,
            phone: editWorker.phone,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to update worker");

      // Update worker list after successful edit
      setWorkers((prevWorkers) =>
        prevWorkers.map((w) => (w._id === editWorker._id ? editWorker : w))
      );

      setIsEditModalOpen(false);
      setIsUpdateSuccess(true); // Set success state to true when update is successful

      // Automatically close success modal after 2 seconds
      setTimeout(() => {
        setIsUpdateSuccess(false);
      }, 2000);

    } catch (error) {
      console.error("Error updating worker:", error);
    }
  };

  const handleDelete = async (workerId) => {
    try {
      // Perform DELETE request with workerId
      const response = await fetch(
        `https://api.thequackapp.com/api/workers/workers/${workerId}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) throw new Error("Failed to delete worker");

      // Update worker list after successful deletion
      setWorkers((prevWorkers) =>
        prevWorkers.filter((worker) => worker._id !== workerId)
      );
      setIsDeleteSuccess(true);
      setIsDeleteModalOpen(false); // Close the delete modal after successful delete
      setTimeout(() => setIsDeleteSuccess(false), 2000);
    } catch (error) {
      console.error("Error deleting worker:", error);
    }
  };

  const columns = useMemo(
    () => [
      { accessorKey: "name", header: "Name" },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ getValue }) => {
          const email = getValue();
          const truncatedEmail = email.length > 10 ? email.slice(0, email.length / 3) + "..." : email;
          return (
            <div
              className="relative group cursor-pointer"
              title={email} // Tooltip with full email
            >
              <span>{truncatedEmail}</span>
              <span className="absolute left-0 bg-gray-800 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {email}
              </span>
            </div>
          );
        },
      },
      { accessorKey: "phone", header: "Phone" },
      {
        accessorKey: "joiningDate",
        header: "Joining Date",
        cell: ({ getValue }) => moment(getValue()).format("YYYY-MM-DD"),
      },
      { accessorKey: "userCode", header: "Worker Code" },
      {
        accessorKey: "approved",
        header: "Approval Status",
        cell: ({ getValue }) => (
          <span
            className={`px-2 py-1 rounded text-white ${
              getValue() ? "bg-green-500" : "bg-yellow-500"
            }`}
          >
            {getValue() ? "Approved" : "Pending"}
          </span>
        ),
      },
      {
        header: "Availability Date",
        accessorKey: "availabilityDate",
        cell: ({ row }) =>
          row.original.availability?.length > 0 ? (
            <div className="flex flex-col items-center">
              {row.original.availability.map((entry, index) => (
                <div key={index}>
                  {new Date(entry.date).toLocaleDateString()}
                </div>
              ))}
            </div>
          ) : (
            "N/A"
          ),
      },
      {
        header: "Shift",
        accessorKey: "availabilityShift",
        cell: ({ row }) =>
          row.original.availability?.length > 0 ? (
            <div className="flex flex-col items-center">
              {row.original.availability.map((entry, index) => (
                <div key={index} className="text-white">
                  {entry.shift}
                </div>
              ))}
            </div>
          ) : (
            "N/A"
          ),
      },
      {
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex justify-center space-x-2">
            <button
              onClick={() => navigate(`/worker-profile/${row.original._id}`)}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
            >
              View
            </button>
            <button
              onClick={() => navigate(`/edit-worker/${row.original._id}`)}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
            >
              Edit
            </button>
            <button
              onClick={() => {
                setWorkerToDelete(row.original); // Set worker to delete
                setIsDeleteModalOpen(true); // Open delete confirmation modal
              }}
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

  const table = useReactTable({
    data: workers,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { globalFilter: filtering },
    onGlobalFilterChange: setFiltering,
  });

  if (loading) return (
    <div className="my-auto items-center justify-center text-center">
          <RiseLoader
            color="white"
            size="25"
            speedMultiplier={1}
          />
    </div>
  )


  return (
    <div className="bg-opacity-25 bg-black rounded-lg p-4 w-full min-h-[90vh] overflow-x-auto">
      <h2 className="text-base font-bold mb-4 text-white">Worker Table</h2>

      {/* Search Bar */}
      <input
        type="text"
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
        placeholder="Search by Name..."
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
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
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
                  Workers record empty
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

      {/* Edit Modal */}
      {isEditModalOpen && editWorker && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
            <h2 className="text-lg font-bold mb-3">Edit Worker</h2>
            <input
              type="text"
              value={editWorker.name}
              onChange={(e) =>
                setEditWorker({ ...editWorker, name: e.target.value })
              }
              className="w-full p-2 mb-3 border rounded"
              placeholder="Name"
            />
            <input
              type="email"
              value={editWorker.email}
              onChange={(e) =>
                setEditWorker({ ...editWorker, email: e.target.value })
              }
              className="w-full p-2 mb-3 border rounded"
              placeholder="Email"
            />
            <input
              type="text"
              value={editWorker.phone}
              onChange={(e) =>
                setEditWorker({ ...editWorker, phone: e.target.value })
              }
              className="w-full p-2 mb-3 border rounded"
              placeholder="Phone"
            />
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={handleSaveChanges}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {isUpdateSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-3">Success!</h2>
            <p className="text-lg text-green-600 mb-5">
              The worker details have been successfully updated.
            </p>
            <div className="flex justify-center">
              <span className="text-white text-lg font-semibold">✔️</span>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-3">
              Are you sure?
            </h2>
            <p className="text-lg text-gray-700 mb-5">
              Are you sure you want to delete this worker? This action cannot
              be undone.
            </p>
            <div className="flex justify-around">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (workerToDelete) {
                    handleDelete(workerToDelete._id); // Delete the worker
                  }
                }}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {isDeleteSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-green-500 p-6 rounded-lg text-white">
            <h3 className="text-xl">Worker deleted successfully!</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkerDetailTable;
