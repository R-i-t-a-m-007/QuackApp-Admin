import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
// import Settings from './components/SettingsPage/Settings';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import UserManagement from './components/UserManagement/UserManagement';
import Workers from './components/Workers/Workers';
import JobsPosted from './components/JobsPosted/JobsPosted';
import EditUser from './components/UserManagement/EditUser';
import UserProfile from './components/UserManagement/UserProfile';
import EditWorker from './components/Workers/EditWorker';
import WorkerProfile from './components/Workers/WorkerProfile';
import Login from './components/Login'; 
import JobProfile from './components/JobsPosted/JobProfile';
import EditJob from './components/JobsPosted/EditJob';
import ProtectedRoute from './components/ProtectedRoute';
import ResetPassword from './components/ResetPassword';
import ResetWorkerPassword from './components/ResetWorkerPassword';
import ResetCompanyPassword from './components/ResetCompanyPassword';
import TermsAndConditions from './components/TermsAndConditions';
import AcceptTerm from './components/AcceptTerm';
import PrivacyPolicy from './components/PrivacyPolicy';
// import Register from './components/Register';

function App() {
  return (
    <Router basename="/app">
      <Routes>
        <Route path="/app" element={<Login />} />
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/reset-password/:token" element={<ResetPassword />} /> {/* Add the reset password route */}
        <Route path="/reset-password-worker/:token" element={<ResetWorkerPassword />} />
        <Route path="/reset-company-password/:token" element={<ResetCompanyPassword />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/terms-and-conditions/accept" element={<AcceptTerm />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route
          path="*"
          element={
            <ProtectedRoute>
            <div>
              <Navbar />
              <div className="flex">
                <Sidebar />
                <div className="ml-0 w-full p-0">
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/user-management" element={<UserManagement />} />
                    <Route path="/workers" element={<Workers />} />
                    <Route path="/jobs-posted" element={<JobsPosted />} />
                    {/* <Route path="/settings" element={<Settings />} /> */}
                    <Route path="/edit-user/:id" element={<EditUser />} />
                    <Route path="/user-profile/:id" element={<UserProfile />} />
                    <Route path="/edit-worker/:id" element={<EditWorker />} />
                    <Route path="/worker-profile/:id" element={<WorkerProfile />} />
                    <Route path="/job-profile/:id" element={<JobProfile />} />
                    <Route path="/edit-job/:id" element={<EditJob />} />
                    {/* <Route path="/settings" element={<Settings />} /> */}
                  </Routes>
                </div>
              </div>
            </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
