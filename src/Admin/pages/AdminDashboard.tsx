import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import TopBar from "../components/Topbar";
import StatCard from "../components/StatCard";
import RecentRegistrations from "../components/RecentRegistrations";
import SideCards from "../components/Sidecards";
import StatusBarChart from "../components/StatusBarChart";
import UserTypePieChart from "../components/UserTypePieChart";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [totalUsers, setTotalUsers] = useState(0);
  const [activeWorkers, setActiveWorkers] = useState(0);
  const [pendingApprovals, setPendingApprovals] = useState(0);
  const [rejectedUsers, setRejectedUsers] = useState(0);
  const [employers, setEmployers] = useState(0);
  const [labourCount, setLabourCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchDashboard = useCallback(async () => {
    try {
      if (!token) {
        navigate("/admin/login");
        return;
      }

      const [statsRes, labourRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}/admin/dashboard-stats`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${import.meta.env.VITE_API_URL}/api/labour`),
      ]);

      if (!statsRes.ok || !labourRes.ok) {
        navigate("/admin/login");
        return;
      }

      const statsData = await statsRes.json();
      await labourRes.json();

      if (!statsData.success) {
        navigate("/admin/login");
        return;
      }

      const stats = statsData.data;

      setTotalUsers(stats.totalUsers || 0);
      setActiveWorkers(stats.activeWorkers || 0);
      setPendingApprovals(stats.pending || 0);
      setRejectedUsers(stats.rejected || 0);
      setEmployers(stats.employers || 0);
      setLabourCount(stats.labour || 0);

      setLoading(false);
    } catch {
      navigate("/admin/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF6F5]">
      <TopBar />

      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 py-6 space-y-8">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          <div onClick={() => navigate("/admin/users")} className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <StatCard title="Total Users" value={totalUsers} badge="100%" icon="👤" />
          </div>

          <div
            onClick={() => navigate("/admin/users?status=accepted&role=labour")}
            className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <StatCard
              title="Active Workers"
              value={activeWorkers}
              badge={
                labourCount > 0
                  ? `${Math.round((activeWorkers / labourCount) * 100)}%`
                  : "0%"
              }
              icon="👥"
            />
          </div>

          <div
            onClick={() => navigate("/admin/users?role=employee")}
            className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <StatCard
              title="Employers"
              value={employers}
              badge={
                totalUsers > 0
                  ? `${Math.round((employers / totalUsers) * 100)}%`
                  : "0%"
              }
              icon="💼"
            />
          </div>

          <div
            onClick={() => navigate("/admin/users?status=pending")}
            className="cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <StatCard
              title="Pending Approvals"
              value={pendingApprovals}
              badge={
                totalUsers > 0
                  ? `${Math.round((pendingApprovals / totalUsers) * 100)}%`
                  : "0%"
              }
              icon="⚠️"
            />
          </div>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          <div className="lg:col-span-3">
            <StatusBarChart
              active={activeWorkers}
              pending={pendingApprovals}
              rejected={rejectedUsers}
              // total={totalUsers}
            />
          </div>

          <div className="lg:col-span-2 w-full min-h-[350px]">
            <UserTypePieChart
              labour={labourCount}
              employers={employers}
            />
          </div>

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentRegistrations />
          </div>
          <SideCards pending = {pendingApprovals} />
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;