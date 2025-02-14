import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import for navigation
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";

// Sample Data
const sampleWorkers = [
  { name: "John Smith", email: "john@company.com", phone: "1234567890", role: "Developer", joiningDate: "2023-01-15", availability: "Morning", userCode: "W123", approved: true },
  { name: "Jane Doe", email: "jane@company.com", phone: "9876543210", role: "Designer", joiningDate: "2022-07-20", availability: "Afternoon", userCode: "W124", approved: false },
  { name: "Alice Brown", email: "alice@company.com", phone: "5556667777", role: "HR Manager", joiningDate: "2021-10-10", availability: "Evening", userCode: "W125", approved: true },
  { name: "John Smith", email: "john@company.com", phone: "1234567890", role: "Developer", joiningDate: "2023-01-15", availability: "Morning", userCode: "W123", approved: true },
  { name: "Jane Doe", email: "jane@company.com", phone: "9876543210", role: "Designer", joiningDate: "2022-07-20", availability: "Afternoon", userCode: "W124", approved: false },
  { name: "Alice Brown", email: "alice@company.com", phone: "5556667777", role: "HR Manager", joiningDate: "2021-10-10", availability: "Evening", userCode: "W125", approved: true },
  { name: "John Smith", email: "john@company.com", phone: "1234567890", role: "Developer", joiningDate: "2023-01-15", availability: "Morning", userCode: "W123", approved: true },
  { name: "Jane Doe", email: "jane@company.com", phone: "9876543210", role: "Designer", joiningDate: "2022-07-20", availability: "Afternoon", userCode: "W124", approved: false },
  { name: "Alice Brown", email: "alice@company.com", phone: "5556667777", role: "HR Manager", joiningDate: "2021-10-10", availability: "Evening", userCode: "W125", approved: true },
  { name: "John Smith", email: "john@company.com", phone: "1234567890", role: "Developer", joiningDate: "2023-01-15", availability: "Morning", userCode: "W123", approved: true },
  { name: "Jane Doe", email: "jane@company.com", phone: "9876543210", role: "Designer", joiningDate: "2022-07-20", availability: "Afternoon", userCode: "W124", approved: false },
  { name: "Alice Brown", email: "alice@company.com", phone: "5556667777", role: "HR Manager", joiningDate: "2021-10-10", availability: "Evening", userCode: "W125", approved: true },
  { name: "John Smith", email: "john@company.com", phone: "1234567890", role: "Developer", joiningDate: "2023-01-15", availability: "Morning", userCode: "W123", approved: true },
  { name: "Jane Doe", email: "jane@company.com", phone: "9876543210", role: "Designer", joiningDate: "2022-07-20", availability: "Afternoon", userCode: "W124", approved: false },
  { name: "Alice Brown", email: "alice@company.com", phone: "5556667777", role: "HR Manager", joiningDate: "2021-10-10", availability: "Evening", userCode: "W125", approved: true },
  { name: "John Smith", email: "john@company.com", phone: "1234567890", role: "Developer", joiningDate: "2023-01-15", availability: "Morning", userCode: "W123", approved: true },
  { name: "Jane Doe", email: "jane@company.com", phone: "9876543210", role: "Designer", joiningDate: "2022-07-20", availability: "Afternoon", userCode: "W124", approved: false },
  { name: "Alice Brown", email: "alice@company.com", phone: "5556667777", role: "HR Manager", joiningDate: "2021-10-10", availability: "Evening", userCode: "W125", approved: true },
];

const WorkerTable = () => {
  const [filtering, setFiltering] = useState("");
  const navigate = useNavigate();

  const data = useMemo(() => sampleWorkers, []);
  const columns = useMemo(() => [
    { header: "Name", accessorKey: "name" },
    { header: "Email", accessorKey: "email" },
    { header: "Phone", accessorKey: "phone" },
    { header: "Joining Date", accessorKey: "joiningDate" },
    { header: "Availability", accessorKey: "availability" },
    { header: "User Code", accessorKey: "userCode" },
    { header: "Approved", accessorKey: "approved", cell: ({ getValue }) => (getValue() ? "✅ Yes" : "❌ No") },
  ], []);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { globalFilter: filtering },
    onGlobalFilterChange: setFiltering
  });

  return (
    <div className="bg-[#36404a] shadow-lg rounded-lg p-4 w-full overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-gray-200">Worker Table</h2>
        <button
          onClick={() => navigate("/workers")}
          className="px-4 py-2 bg-[#536af8] text-white rounded-md hover:bg-[#4f64de] transition"
        >
          See More...
        </button>
      </div>

      {/* Search Bar (Only filters by name) */}
      <input
        type="text"
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
        placeholder="Search by name..."
        className="border p-2 rounded mb-3 w-full md:w-1/3 focus:ring text-gray-100 bg-[#2f3841] focus:ring-blue-300 outline-none"
      />

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-sm">
        <thead className="bg-[#36404a] text-gray-200">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="p-2 border border-gray-500 text-center cursor-pointer bg-[#536af8] text-white rounded-md hover:bg-[#4f64de] transition"
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
            {table.getRowModel().rows.map(row => (
              <tr key={row.id} className="border border-gray-500 hover:bg-gray-900 transition">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="p-2 border border-gray-500 text-sm">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4 text-gray-100 text-s">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-3 py-1 bg-[#536af8] rounded disabled:opacity-60 hover:bg-[#4f64de]"
        >
          Previous
        </button>
        <span className="text-gray-100">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-3 py-1 bg-[#536af8] rounded disabled:opacity-60 hover:bg-[#4f64de]"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default WorkerTable;
