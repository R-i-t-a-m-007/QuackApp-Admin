import Card from "./Card";
import UsersTable from "../Tables/UserTable";
import WorkersTable from "../Tables/WorkersTable";

function Home() {
  const data = [
    { title: "Users", value: 250 },
    { title: "Revenue", value: "$12,450" },
    { title: "Companies", value: 56 },
    { title: "Workers", value: 5000 },
    { title: "Jobs Posted", value: 200 },
  ];

  const usersData = [
    { username: "JohnDoe", email: "john@example.com", phone: "123456789", address: "123 Street", package: "Pro", createdAt: "2024-02-13", userCode: "U123" },
    { username: "JaneSmith", email: "jane@example.com", phone: "987654321", address: "456 Avenue", package: "Basic", createdAt: "2024-02-12", userCode: "U456" },
  ];

  const workersData = [
    { name: "Mike Ross", email: "mike@example.com", phone: "111222333", role: "Developer", department: "IT", joiningDate: "2023-05-10", userCode: "W001", approved: true },
    { name: "Rachel Zane", email: "rachel@example.com", phone: "444555666", role: "Designer", department: "Creative", joiningDate: "2023-07-20", userCode: "W002", approved: false },
  ];

  return (
    <div className="p-6 bg-[#2f3841] min-h-screen">
      {/* Cards Section */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {data.map((item, index) => (
          <Card key={index} title={item.title} value={item.value} />
        ))}
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UsersTable data={usersData} />
        <WorkersTable data={workersData} />
      </div>
    </div>
  );
}

export default Home;
