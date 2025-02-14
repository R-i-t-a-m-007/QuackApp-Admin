import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";

const sampleUsers = [
    {
        username: "johndoe",
        email: "johndoe@example.com",
        phone: "123-456-7890",
        address: "123 Street, City",
        postcode: "10001",
        package: "Basic",
        createdAt: "2024-02-10",
        otp: "123456",
        otpExpire: "2024-02-11",
        userCode: "U12345",
        image: "https://via.placeholder.com/40",
      },
      {
        username: "janedoe",
        email: "janedoe@example.com",
        phone: "987-654-3210",
        address: "456 Avenue, City",
        postcode: "20002",
        package: "Pro",
        createdAt: "2024-02-09",
        otp: "654321",
        otpExpire: "2024-02-12",
        userCode: "U67890",
        image: "https://via.placeholder.com/40",
      },
      {
        username: "johndoe",
        email: "johndoe@example.com",
        phone: "123-456-7890",
        address: "123 Street, City",
        postcode: "10001",
        package: "Basic",
        createdAt: "2024-02-10",
        otp: "123456",
        otpExpire: "2024-02-11",
        userCode: "U12345",
        image: "https://via.placeholder.com/40",
      },
      {
        username: "janedoe",
        email: "janedoe@example.com",
        phone: "987-654-3210",
        address: "456 Avenue, City",
        postcode: "20002",
        package: "Pro",
        createdAt: "2024-02-09",
        otp: "654321",
        otpExpire: "2024-02-12",
        userCode: "U67890",
        image: "https://via.placeholder.com/40",
      },
      {
        username: "johndoe",
        email: "johndoe@example.com",
        phone: "123-456-7890",
        address: "123 Street, City",
        postcode: "10001",
        package: "Basic",
        createdAt: "2024-02-10",
        otp: "123456",
        otpExpire: "2024-02-11",
        userCode: "U12345",
        image: "https://via.placeholder.com/40",
      },
      {
        username: "janedoe",
        email: "janedoe@example.com",
        phone: "987-654-3210",
        address: "456 Avenue, City",
        postcode: "20002",
        package: "Pro",
        createdAt: "2024-02-09",
        otp: "654321",
        otpExpire: "2024-02-12",
        userCode: "U67890",
        image: "https://via.placeholder.com/40",
      },
      {
        username: "johndoe",
        email: "johndoe@example.com",
        phone: "123-456-7890",
        address: "123 Street, City",
        postcode: "10001",
        package: "Basic",
        createdAt: "2024-02-10",
        otp: "123456",
        otpExpire: "2024-02-11",
        userCode: "U12345",
        image: "https://via.placeholder.com/40",
      },
      {
        username: "janedoe",
        email: "janedoe@example.com",
        phone: "987-654-3210",
        address: "456 Avenue, City",
        postcode: "20002",
        package: "Pro",
        createdAt: "2024-02-09",
        otp: "654321",
        otpExpire: "2024-02-12",
        userCode: "U67890",
        image: "https://via.placeholder.com/40",
      },
      {
        username: "johndoe",
        email: "johndoe@example.com",
        phone: "123-456-7890",
        address: "123 Street, City",
        postcode: "10001",
        package: "Basic",
        createdAt: "2024-02-10",
        otp: "123456",
        otpExpire: "2024-02-11",
        userCode: "U12345",
        image: "https://via.placeholder.com/40",
      },
      {
        username: "janedoe",
        email: "janedoe@example.com",
        phone: "987-654-3210",
        address: "456 Avenue, City",
        postcode: "20002",
        package: "Pro",
        createdAt: "2024-02-09",
        otp: "654321",
        otpExpire: "2024-02-12",
        userCode: "U67890",
        image: "https://via.placeholder.com/40",
      },
      {
        username: "johndoe",
        email: "johndoe@example.com",
        phone: "123-456-7890",
        address: "123 Street, City",
        postcode: "10001",
        package: "Basic",
        createdAt: "2024-02-10",
        otp: "123456",
        otpExpire: "2024-02-11",
        userCode: "U12345",
        image: "https://via.placeholder.com/40",
      },
      {
        username: "janedoe",
        email: "janedoe@example.com",
        phone: "987-654-3210",
        address: "456 Avenue, City",
        postcode: "20002",
        package: "Pro",
        createdAt: "2024-02-09",
        otp: "654321",
        otpExpire: "2024-02-12",
        userCode: "U67890",
        image: "https://via.placeholder.com/40",
      },
      {
        username: "johndoe",
        email: "johndoe@example.com",
        phone: "123-456-7890",
        address: "123 Street, City",
        postcode: "10001",
        package: "Basic",
        createdAt: "2024-02-10",
        otp: "123456",
        otpExpire: "2024-02-11",
        userCode: "U12345",
        image: "https://via.placeholder.com/40",
      },
      {
        username: "janedoe",
        email: "janedoe@example.com",
        phone: "987-654-3210",
        address: "456 Avenue, City",
        postcode: "20002",
        package: "Pro",
        createdAt: "2024-02-09",
        otp: "654321",
        otpExpire: "2024-02-12",
        userCode: "U67890",
        image: "https://via.placeholder.com/40",
      },
      {
        username: "johndoe",
        email: "johndoe@example.com",
        phone: "123-456-7890",
        address: "123 Street, City",
        postcode: "10001",
        package: "Basic",
        createdAt: "2024-02-10",
        otp: "123456",
        otpExpire: "2024-02-11",
        userCode: "U12345",
        image: "https://via.placeholder.com/40",
      },
      {
        username: "janedoe",
        email: "janedoe@example.com",
        phone: "987-654-3210",
        address: "456 Avenue, City",
        postcode: "20002",
        package: "Pro",
        createdAt: "2024-02-09",
        otp: "654321",
        otpExpire: "2024-02-12",
        userCode: "U67890",
        image: "https://via.placeholder.com/40",
      },
]

const UserDetailTable = () => {

  const data = useMemo(() => sampleUsers, []);

  const [filtering, setFiltering] = useState("");

  // Table Columns
  const columns = useMemo(
    () => [
      { accessorKey: "username", header: "Username" },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "phone", header: "Phone" },
      { accessorKey: "address", header: "Address" },
      { accessorKey: "postcode", header: "Postcode" },
      { accessorKey: "package", header: "Package" },
      { accessorKey: "createdAt", header: "Created At" },
      { accessorKey: "otp", header: "OTP" },
      { accessorKey: "otpExpire", header: "OTP Expire" },
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
              onClick={() => handleEdit(row.original)}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(row.original.username)}
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

  // Edit Handler
  const handleEdit = (user) => {
    alert(`Editing user: ${user.username}`);
  };

  // Delete Handler
  const handleDelete = () => {
    
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

  return (
    <div className="bg-[#36404a] shadow-lg rounded-lg p-4 w-full min-h-[90vh] overflow-x-auto">
      <h2 className="text-xl font-bold mb-4 text-white">User Table</h2>

      {/* Search Bar */}
      <input
        type="text"
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
        placeholder="Search by Username..."
        className="border p-2 rounded mb-3 w-full md:w-1/3 focus:ring text-gray-100 bg-[#2f3841] focus:ring-blue-300 outline-none"
      />

      <div className="overflow-auto">
        <table className="w-full border-collapse border border-gray-300 text-sm">
          <thead className="bg-[#36404a] text-gray-200">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
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
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border border-gray-300 hover:bg-gray-900 transition">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="p-2 border border-gray-500 text-center">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4 text-gray-100 text-sm">
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

export default UserDetailTable;