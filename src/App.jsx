import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';

import Settings from './components/SettingsPage/Settings';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';  // Import Sidebar component
import UserManagement from './components/UserManagement/UserManagement';
import Workers from './components/Workers/Workers';
import JobsPosted from './components/JobsPosted/JobsPosted';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div className="flex">
          <Sidebar />  {/* Sidebar is rendered outside Routes to stay on all pages */}
          <div className="ml-0 w-full p-0"> {/* Adjusted for sidebar width */}
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/user-management" element={<UserManagement />} />
              <Route path="/workers" element={<Workers />} />
              <Route path="/jobs-posted" element={<JobsPosted />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
