import { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import moment from "moment"; // For date formatting

const sampleWorkers = [
  {
    name: "John Smith",
    email: "johnsmith@example.com",
    phone: "123-456-7890",
    role: "Software Engineer",
    department: "IT",
    address: "123 Tech Street, City",
    joiningDate: "2023-05-10T00:00:00.000Z",
    password: "hashedpassword",
    availability: [
      { date: "2024-02-15T00:00:00.000Z", shift: "Morning" },
      { date: "2024-02-16T00:00:00.000Z", shift: "Evening" },
    ],
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
    userCode: "W12345",
    approved: true,
    invitedJobs: ["65f1a0d5a2b4d12b3478e5c1", "65f1a0d5a2b4d12b3478e5c2"],
  },
  {
    name: "Jane Doe",
    email: "janedoe@example.com",
    phone: "987-654-3210",
    role: "Project Manager",
    department: "Management",
    address: "456 Business Ave, City",
    joiningDate: "2022-08-15T00:00:00.000Z",
    password: "hashedpassword",
    availability: [
      { date: "2024-02-14T00:00:00.000Z", shift: "Afternoon" },
    ],
    image: null, // No image provided
    userCode: "W67890",
    approved: false,
    invitedJobs: ["65f1a0d5a2b4d12b3478e5c3"],
  },
  {
    name: "John Smith",
    email: "johnsmith@example.com",
    phone: "123-456-7890",
    role: "Software Engineer",
    department: "IT",
    address: "123 Tech Street, City",
    joiningDate: "2023-05-10T00:00:00.000Z",
    password: "hashedpassword",
    availability: [
      { date: "2024-02-15T00:00:00.000Z", shift: "Morning" },
      { date: "2024-02-16T00:00:00.000Z", shift: "Evening" },
    ],
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
    userCode: "W12345",
    approved: true,
    invitedJobs: ["65f1a0d5a2b4d12b3478e5c1", "65f1a0d5a2b4d12b3478e5c2"],
  },
  {
    name: "Jane Doe",
    email: "janedoe@example.com",
    phone: "987-654-3210",
    role: "Project Manager",
    department: "Management",
    address: "456 Business Ave, City",
    joiningDate: "2022-08-15T00:00:00.000Z",
    password: "hashedpassword",
    availability: [
      { date: "2024-02-14T00:00:00.000Z", shift: "Afternoon" },
    ],
    image: null, // No image provided
    userCode: "W67890",
    approved: false,
    invitedJobs: ["65f1a0d5a2b4d12b3478e5c3"],
  },
  {
    name: "John Smith",
    email: "johnsmith@example.com",
    phone: "123-456-7890",
    role: "Software Engineer",
    department: "IT",
    address: "123 Tech Street, City",
    joiningDate: "2023-05-10T00:00:00.000Z",
    password: "hashedpassword",
    availability: [
      { date: "2024-02-15T00:00:00.000Z", shift: "Morning" },
      { date: "2024-02-16T00:00:00.000Z", shift: "Evening" },
    ],
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
    userCode: "W12345",
    approved: true,
    invitedJobs: ["65f1a0d5a2b4d12b3478e5c1", "65f1a0d5a2b4d12b3478e5c2"],
  },
  {
    name: "Jane Doe",
    email: "janedoe@example.com",
    phone: "987-654-3210",
    role: "Project Manager",
    department: "Management",
    address: "456 Business Ave, City",
    joiningDate: "2022-08-15T00:00:00.000Z",
    password: "hashedpassword",
    availability: [
      { date: "2024-02-14T00:00:00.000Z", shift: "Afternoon" },
    ],
    image: null, // No image provided
    userCode: "W67890",
    approved: false,
    invitedJobs: ["65f1a0d5a2b4d12b3478e5c3"],
  },
  {
    name: "John Smith",
    email: "johnsmith@example.com",
    phone: "123-456-7890",
    role: "Software Engineer",
    department: "IT",
    address: "123 Tech Street, City",
    joiningDate: "2023-05-10T00:00:00.000Z",
    password: "hashedpassword",
    availability: [
      { date: "2024-02-15T00:00:00.000Z", shift: "Morning" },
      { date: "2024-02-16T00:00:00.000Z", shift: "Evening" },
    ],
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
    userCode: "W12345",
    approved: true,
    invitedJobs: ["65f1a0d5a2b4d12b3478e5c1", "65f1a0d5a2b4d12b3478e5c2"],
  },
  {
    name: "Jane Doe",
    email: "janedoe@example.com",
    phone: "987-654-3210",
    role: "Project Manager",
    department: "Management",
    address: "456 Business Ave, City",
    joiningDate: "2022-08-15T00:00:00.000Z",
    password: "hashedpassword",
    availability: [
      { date: "2024-02-14T00:00:00.000Z", shift: "Afternoon" },
    ],
    image: null, // No image provided
    userCode: "W67890",
    approved: false,
    invitedJobs: ["65f1a0d5a2b4d12b3478e5c3"],
  },
  {
    name: "John Smith",
    email: "johnsmith@example.com",
    phone: "123-456-7890",
    role: "Software Engineer",
    department: "IT",
    address: "123 Tech Street, City",
    joiningDate: "2023-05-10T00:00:00.000Z",
    password: "hashedpassword",
    availability: [
      { date: "2024-02-15T00:00:00.000Z", shift: "Morning" },
      { date: "2024-02-16T00:00:00.000Z", shift: "Evening" },
    ],
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
    userCode: "W12345",
    approved: true,
    invitedJobs: ["65f1a0d5a2b4d12b3478e5c1", "65f1a0d5a2b4d12b3478e5c2"],
  },
  {
    name: "Jane Doe",
    email: "janedoe@example.com",
    phone: "987-654-3210",
    role: "Project Manager",
    department: "Management",
    address: "456 Business Ave, City",
    joiningDate: "2022-08-15T00:00:00.000Z",
    password: "hashedpassword",
    availability: [
      { date: "2024-02-14T00:00:00.000Z", shift: "Afternoon" },
    ],
    image: null, // No image provided
    userCode: "W67890",
    approved: false,
    invitedJobs: ["65f1a0d5a2b4d12b3478e5c3"],
  },
  {
    name: "John Smith",
    email: "johnsmith@example.com",
    phone: "123-456-7890",
    role: "Software Engineer",
    department: "IT",
    address: "123 Tech Street, City",
    joiningDate: "2023-05-10T00:00:00.000Z",
    password: "hashedpassword",
    availability: [
      { date: "2024-02-15T00:00:00.000Z", shift: "Morning" },
      { date: "2024-02-16T00:00:00.000Z", shift: "Evening" },
    ],
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
    userCode: "W12345",
    approved: true,
    invitedJobs: ["65f1a0d5a2b4d12b3478e5c1", "65f1a0d5a2b4d12b3478e5c2"],
  },
  {
    name: "Jane Doe",
    email: "janedoe@example.com",
    phone: "987-654-3210",
    role: "Project Manager",
    department: "Management",
    address: "456 Business Ave, City",
    joiningDate: "2022-08-15T00:00:00.000Z",
    password: "hashedpassword",
    availability: [
      { date: "2024-02-14T00:00:00.000Z", shift: "Afternoon" },
    ],
    image: null, // No image provided
    userCode: "W67890",
    approved: false,
    invitedJobs: ["65f1a0d5a2b4d12b3478e5c3"],
  },
  {
    name: "John Smith",
    email: "johnsmith@example.com",
    phone: "123-456-7890",
    role: "Software Engineer",
    department: "IT",
    address: "123 Tech Street, City",
    joiningDate: "2023-05-10T00:00:00.000Z",
    password: "hashedpassword",
    availability: [
      { date: "2024-02-15T00:00:00.000Z", shift: "Morning" },
      { date: "2024-02-16T00:00:00.000Z", shift: "Evening" },
    ],
    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
    userCode: "W12345",
    approved: true,
    invitedJobs: ["65f1a0d5a2b4d12b3478e5c1", "65f1a0d5a2b4d12b3478e5c2"],
  },
  {
    name: "Jane Doe",
    email: "janedoe@example.com",
    phone: "987-654-3210",
    role: "Project Manager",
    department: "Management",
    address: "456 Business Ave, City",
    joiningDate: "2022-08-15T00:00:00.000Z",
    password: "hashedpassword",
    availability: [
      { date: "2024-02-14T00:00:00.000Z", shift: "Afternoon" },
    ],
    image: null, // No image provided
    userCode: "W67890",
    approved: false,
    invitedJobs: ["65f1a0d5a2b4d12b3478e5c3"],
  },
];

const WorkerDetailTable = () => {
  const data = useMemo(() => sampleWorkers, []);

  const [filtering, setFiltering] = useState("");

  const columns = useMemo(
    () => [
      { accessorKey: "name", header: "Name" },
      { accessorKey: "email", header: "Email" },
      { accessorKey: "phone", header: "Phone" },
      { accessorKey: "role", header: "Role" },
      { accessorKey: "department", header: "Department" },
      { accessorKey: "address", header: "Address" },
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
        accessorKey: "invitedJobs",
        header: "Invited Jobs",
        cell: ({ getValue }) => getValue().length,
      },
      {
        accessorKey: "image",
        header: "Profile",
        cell: ({ getValue }) => (
          <img
            src={getValue() || "https://via.placeholder.com/40"}
            alt="Profile"
            className="h-10 w-10 rounded-full mx-auto"
          />
        ),
      },
      {
        accessorKey: "availabilityDate",
        header: "Availability Date",
        cell: ({ row }) =>
          row.original.availability
            .map((entry) => moment(entry.date).format("YYYY-MM-DD"))
            .join(", "),
      },
      {
        accessorKey: "availabilityShift",
        header: "Shift",
        cell: ({ row }) => row.original.availability.map((entry) => entry.shift).join(", "),
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
              onClick={() => handleDelete(row.original.name)}
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

  const handleEdit = (worker) => {
    alert(`Editing worker: ${worker.name}`);
  };

  const handleDelete = (name) => {
    alert(`Deleting worker: ${name}`);
  };

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
      <h2 className="text-xl font-bold mb-4 text-white">Worker Table</h2>

      {/* Search Bar */}
      <input
        type="text"
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
        placeholder="Search by Name..."
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

      {/* Pagination */}
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

export default WorkerDetailTable;
