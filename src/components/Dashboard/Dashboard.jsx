import { FiUsers, FiBriefcase, FiUserCheck, FiClipboard } from "react-icons/fi";
import { FaPoundSign } from "react-icons/fa";
import Card from "./Card";
import UsersTable from "../Tables/UserTable";
import WorkersTable from "../Tables/WorkersTable";

function Home() {
  const data = [
    { title: "Users", icon: FiUsers },
    { title: "Revenue", icon: FaPoundSign },
    { title: "Companies", icon: FiBriefcase },
    { title: "Workers", icon: FiUserCheck },
    { title: "Jobs Posted", icon: FiClipboard },
  ];

  return (
    <div className="p-4 min-h-screen">
      {/* Cards Section */}
      <div className="flex flex-wrap justify-center sm:grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {data.map((item, index) => (
          <Card key={index} title={item.title} icon={item.icon} />
        ))}
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UsersTable />
        <WorkersTable />
      </div>
    </div>
  );
}

export default Home;
