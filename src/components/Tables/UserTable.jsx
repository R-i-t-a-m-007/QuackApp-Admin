import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";

const UserTable = () => {
  const [users, setUsers] = useState([]); // Store fetched users
  const [filtering, setFiltering] = useState("");
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate();

  // Fetch users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://api.thequackapp.com/api/auth/users");
        const data = await response.json();
        setUsers(data); // Update state with fetched users
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const columns = useMemo(
    () => [
      { header: "Username", accessorKey: "username" },
      { header: "Phone", accessorKey: "phone" },
      { header: "Package", accessorKey: "package" },
      {
        header: "Created At",
        accessorKey: "createdAt",
        cell: ({ getValue }) => {
          const date = new Date(getValue());
          return date.toLocaleDateString("en-UK"); // Format as MM/DD/YYYY
        },
      },
      { header: "User Code", accessorKey: "userCode" },
    ],
    []
  );

  const table = useReactTable({
    data: users, // Use fetched data
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { globalFilter: filtering },
    onGlobalFilterChange: setFiltering,
  });

  if (loading) return <p className="text-gray-200">Loading users...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="bg-opacity-25 bg-black rounded-lg p-4 w-full overflow-auto h-fit md:min-h-[90vh]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-bold text-gray-200">User Table</h2>
        <button
          onClick={() => navigate("/user-management")}
          className="px-3 py-1 bg-[#484e84] text-white rounded-md hover:bg-[#4f64de] transition"
        >
          See More...
        </button>
      </div>

      {/* Search Bar */}
      <input
        type="text"
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
        placeholder="Search by Name..."
        className="border p-2 rounded mb-3 w-full md:w-1/3 focus:ring text-gray-100 bg-[#141833] focus:ring-blue-300 outline-none"
      />

      <div className="overflow-auto">
        <table className="w-full border-none text-[10px] ">
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
                    {header.column.getIsSorted() === "asc"
                      ? " 🔼"
                      : header.column.getIsSorted() === "desc"
                      ? " 🔽"
                      : " ↕"}
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
                    <td key={cell.id} className="p-2 text-[10px] text-center">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
                  Users record empty
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4 text-gray-100 text-sm">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-3 py-1 bg-[#484e84] rounded disabled:opacity-60 hover:bg-[#4f64de]"
        >
          Previous
        </button>
        <span className="text-gray-100">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-3 py-1 bg-[#484e84] rounded disabled:opacity-60 hover:bg-[#4f64de]"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserTable;
