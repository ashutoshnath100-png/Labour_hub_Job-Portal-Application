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

    <div className="max-w-[1500px] mx-auto px-4 sm:px-6 py-6 space-y-6">

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        <div
          onClick={() => navigate("/admin/users")}
          className="group cursor-pointer transition-all duration-300 hover:-translate-y-1"
        >
          <div className="rounded-[28px] bg-white border border-[#ececec] shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden">

            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-br from-orange-50/40 to-transparent pointer-events-none"></div>

            <StatCard
              title="Total Users"
              value={totalUsers}
              badge="100%"
              icon="👤"
            />

          </div>
        </div>

        <div
          onClick={() => navigate("/admin/users?status=accepted&role=labour")}
          className="group cursor-pointer transition-all duration-300 hover:-translate-y-1"
        >
          <div className="rounded-[28px] bg-white border border-[#ececec] shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden">

            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-br from-blue-50/40 to-transparent pointer-events-none"></div>

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
        </div>

        <div
          onClick={() => navigate("/admin/users?role=employee")}
          className="group cursor-pointer transition-all duration-300 hover:-translate-y-1"
        >
          <div className="rounded-[28px] bg-white border border-[#ececec] shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden">

            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-br from-emerald-50/40 to-transparent pointer-events-none"></div>

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
        </div>

        <div
          onClick={() => navigate("/admin/users?status=pending")}
          className="group cursor-pointer transition-all duration-300 hover:-translate-y-1"
        >
          <div className="rounded-[28px] bg-white border border-[#ececec] shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden">

            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-br from-red-50/40 to-transparent pointer-events-none"></div>

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

      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        <div className="lg:col-span-3 rounded-[30px] border border-[#ececec] bg-white/90 backdrop-blur-xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)] transition-all duration-300">

          <StatusBarChart
            active={activeWorkers}
            pending={pendingApprovals}
            rejected={rejectedUsers}
          />

        </div>

        <div className="lg:col-span-2 w-full min-h-[350px] rounded-[30px] border border-[#ececec] bg-white/90 backdrop-blur-xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)] transition-all duration-300">

          <UserTypePieChart
            labour={labourCount}
            employers={employers}
          />

        </div>

      </div>

      {/* BOTTOM */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2 rounded-[30px] border border-[#ececec] bg-white/90 backdrop-blur-xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)] transition-all duration-300">

          <RecentRegistrations />

        </div>

        <div className="rounded-[30px] border border-[#ececec] bg-white/90 backdrop-blur-xl p-4 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)] transition-all duration-300">

          <SideCards pending={pendingApprovals} />

        </div>

      </div>

    </div>
  </div>
);
};

export default AdminDashboard;