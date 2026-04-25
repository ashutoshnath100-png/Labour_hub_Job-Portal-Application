import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";


import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Home from "./pages/Home";
import Termsofservice from "./pages/Termsofservice";
import Dashboard from "./pages/Dashboard";
import HiredWorkers from "./pages/HiredWorkers";
import FindLabour from "./pages/FindLabour";
import Register from "./pages/LabourRegister";
import Login from "./Admin/Login";
import AdminDashboard from "./Admin/pages/AdminDashboard";
import UserManagement from "./Admin/pages/UserManagement";
import LabourVerification from "./Admin/pages/LabourVerification";
import Registeremp from "./pages/Registeremp";
import LabourDashboard from "./pages/LabourDashboard";
import WorkerDetail from "./pages/WorkerDetail";
import HelpCenter from "./pages/HelpCenter";
import Landing from "./pages/Landing";
import HowItWorks from "./pages/HowItWorks";
import AboutUs from "./pages/AboutUs";
import EditLabourDetails from "./pages/EditLabourDetails";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ForgotPassword from "./Admin/ForgotPassword";
import ResetPasswordDirect from "./Admin/ResetPasswordDirect";
import AdminProfile from "./Admin/pages/AdminProfile";
import ChangePassword from "./Admin/components/ChangePasswordModal";
import CompletedJobs from "./pages/CompletedJobs";
import RejectedWorkers from "./pages/RejectedWorkers";
import ContactedWorkers from "./pages/ContactedWorkers";
import UserProfile from "./Admin/pages/UserProfile";
import Reports from "./Admin/pages/Reports";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";


function App() {
  const location = useLocation();
  const navigate = useNavigate();


  const isAdminPage = location.pathname.startsWith("/admin");


  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");


    if (!token) return;


    if (location.pathname === "/login" || location.pathname === "/admin/login") {
      if (role === "admin") navigate("/admin/dashboard", { replace: true });
      else if (role === "labour") navigate("/labour-dashboard", { replace: true });
      else if (role === "employee") navigate("/find-labour", { replace: true });
    }
  }, [location.pathname, navigate]);


  return (
    <>
      {!isAdminPage && <Header />}


      <Routes>
        <Route path="/terms-of-service" element={<Termsofservice />} />
        <Route path="/" element={<Landing />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/find-labour" element={<FindLabour />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/employee/edit-profile" element={<EditProfile />} />
        <Route path="/hired-workers" element={<HiredWorkers />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/rejected-workers" element={<RejectedWorkers />} />
        <Route path="/completed-jobs" element={<CompletedJobs />} />
        <Route path="/contacted-workers" element={<ContactedWorkers />} />


        {/* Admin route */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/labours" element={<LabourVerification />} />
        <Route path="/admin/forget-password" element={<ForgotPassword />} />
        <Route path="/admin/reset-password-direct" element={<ResetPasswordDirect />} />
        <Route path="/admin/profile" element={<AdminProfile />} />
        <Route path="/admin/change-password" element={<ChangePassword />} />
        <Route path="/admin/users/:id" element={<UserProfile />} />
        <Route path="/admin/reports" element={<Reports />} />



        <Route path="/register/worker" element={<Register />} />
        <Route path="/register/employer" element={<Registeremp />} />
        <Route path="/labour-dashboard" element={<LabourDashboard />} />
        <Route path="/labour/edit-profile" element={<EditLabourDetails />} />
        <Route path="/help-center" element={<HelpCenter />} />
        <Route path="/worker/:id" element={<WorkerDetail />} />
      </Routes>


      {!isAdminPage && <Footer />}
    </>
  );
}


export default App;

