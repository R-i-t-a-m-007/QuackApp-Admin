import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
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

const UserDetailTable = () => {
  const [users, setUsers] = useState([]);
  const [filtering, setFiltering] = useState("");
  const [isDeleteSuccess, setIsDeleteSuccess] = useState(false); // State for delete success modal
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();
  

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for delete confirmation modal
  const [deleteUserId, setDeleteUserId] = useState(null); // User ID for deletion

  // Fetching data from User API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://api.thequackapp.com/api/auth/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
      finally{
        setLoading(false);
      }
    };
  
    fetchUsers();
  }, []);
  
  const data = useMemo(() => users, [users]);

  // Table Columns
  const columns = useMemo(
    () => [
      { accessorKey: "username", header: "Username" },
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
      { accessorKey: "package", header: "Package" },
      {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ getValue }) => {
          const date = new Date(getValue());
          return date.toLocaleDateString("en-UK");
        },
      },
      { accessorKey: "userCode", header: "User Code" },
      {
        accessorKey: "image",
        header: "Profile",
        cell: ({ getValue }) => (
          <img src={getValue()} alt="Profile" className="h-10 w-10 rounded-full mx-auto" />
        ),
      },
      {
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex justify-center space-x-2">
          <button
                onClick={() => navigate(`/user-profile/${row.original._id}`)}
              className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
            >
              View
          </button>
          <button
            onClick={() => navigate(`/edit-user/${row.original._id}`)}
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
  

  // Open delete confirmation modal
  const openDeleteModal = (userId) => {
    setDeleteUserId(userId);
    setIsDeleteModalOpen(true);
  };

  // Close delete confirmation modal
  const closeDeleteModal = () => {
    setDeleteUserId(null);
    setIsDeleteModalOpen(false);0
  };
  // Delete Handler
  const handleDelete = async () => {
    if (deleteUserId) {
      try {
        const response = await axios.delete(`https://api.thequackapp.com/api/auth/usersadmin/${deleteUserId}`);
        
        if (response.status === 200) {
          setUsers((prevUsers) => prevUsers.filter((user) => user._id !== deleteUserId));
          setIsDeleteSuccess(true); // Show delete success modal
          setTimeout(() => setIsDeleteSuccess(false), 2000); // Hide modal after 2 seconds
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
    closeDeleteModal(); // Close modal after delete
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
      <h2 className="text-base font-bold mb-4 text-white">User Table</h2>

      {/* Search Bar */}
      <input
        type="text"
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
        placeholder="Search by Username..."
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
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center text-base py-4 text-gray-100">
                  Users record empty
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="odd:bg-gray-900">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-2 text-center">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>

      {/* Pagination */}
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
              Are you sure you want to delete this User? Workers under this User will be deleted too.
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

      {/* Delete Success Modal */}
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

export default UserDetailTable;
