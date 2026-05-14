import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
type TabType = "dashboard" | "completed" | "pending" | "allRequests";


interface Job {
  id?: string;
  _id?: string;
  work: string;
  location: string;
  amount: number;
  month?: string;
}


interface LabourProfile {
  _id?: string;
  name?: string;
  role?: string;
  rating?: number;
  city?: string;
  profession?: string;
  available?: boolean;
  location?: string;
  skills?: string[];
  phone?: string;
}


interface StatProps {
  title: string;
  value: string;
  onClick?: () => void;
}


interface HireRequest {
  _id: string;
  status: "pending" | "accepted" | "rejected" | "timed_out";
  createdAt?: string;
  message?: string;


  employee?: {
    _id?: string;
    name?: string;
    email?: string;
    phone?: string;
    location?: string;
  };
}


const API_BASE = import.meta.env.VITE_API_URL;


const Stat: React.FC<StatProps> = ({ title, value, onClick }) => (
  <div
    onClick={onClick}
    className={`bg-white rounded-2xl shadow p-5 transition
    ${onClick ? "cursor-pointer hover:bg-orange-50 hover:shadow-lg" : ""}`}
  >
    <p className="text-gray-500 text-sm">{title}</p>
    <h3 className="text-2xl font-semibold mt-2">{value}</h3>
  </div>
);


const JobCard: React.FC<{ job: Job }> = ({ job }) => (
  <div className="border rounded-xl p-4 flex justify-between hover:shadow-md transition">
    <div>
      <p className="font-medium">{job.work}</p>
      <p className="text-sm text-gray-500">{job.location}</p>
    </div>
    <p className="font-semibold text-orange-600">₹{job.amount}</p>
  </div>
);


const HireRequestCard: React.FC<{
  req: HireRequest;
  onAccept: () => void;
  onReject: () => void;
  loading?: boolean;
}> = ({ req, onAccept, onReject, loading }) => {
  return (
    <div className="border rounded-xl p-4 hover:shadow-md transition bg-white">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-semibold text-gray-800">
            {req.employee?.name || "Unknown Employer"}
          </p>


          <p className="text-sm text-gray-500">
            {req.employee?.location || "-"}
            {req.employee?.phone ? ` • ${req.employee.phone}` : ""}
          </p>


          {req.message && (
            <p className="text-sm text-gray-700 mt-2">
              <span className="font-medium">Message:</span> {req.message}
            </p>
          )}


          {req.createdAt && (
            <p className="text-xs text-gray-400 mt-2">
              {new Date(req.createdAt).toLocaleString()}
            </p>
          )}
        </div>


        <div className="flex flex-col gap-2 min-w-[140px]">
          <button
            disabled={loading}
            onClick={onAccept}
            className="px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white text-sm font-semibold disabled:opacity-60"
          >
            {loading ? "..." : "Accept"}
          </button>


          <button
            disabled={loading}
            onClick={onReject}
            className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-semibold disabled:opacity-60"
          >
            {loading ? "..." : "Reject"}
          </button>
        </div>
      </div>
    </div>
  );
};


export default function LabourDashboard() {
  const navigate = useNavigate();


  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [profile, setProfile] = useState<LabourProfile | null>(null);


  const [completedJobs, setCompletedJobs] = useState<Job[]>([]);
  const [available, setAvailable] = useState<boolean>(true);


  const [hireRequests, setHireRequests] = useState<HireRequest[]>([]);
  const [allRequests, setAllRequests] = useState<HireRequest[]>([]);
  const [hireActionLoadingId, setHireActionLoadingId] = useState<string | null>(
    null
  );
  const [showNotifications, setShowNotifications] = useState(false);

  const notificationCount = allRequests.filter(
    (req) => req.status === "pending" || req.status === "timed_out"
  ).length;

  const [earningsData, setEarningsData] = useState([
    { month: "Jan", earning: 0 },
    { month: "Feb", earning: 0 },
    { month: "Mar", earning: 0 },
    { month: "Apr", earning: 0 },
    { month: "May", earning: 0 },
    { month: "Jun", earning: 0 },
  ]);


  const [jobStats, setJobStats] = useState([
    { name: "Completed", value: 0 },
    { name: "Pending", value: 0 },
    { name: "Rejected", value: 0 },
  ]);


  const authHeader = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };


  const totalEarnings = useMemo(
    () => completedJobs.reduce((acc, job) => acc + (Number(job.amount) || 0), 0),
    [completedJobs]
  );
  const [hireStats, setHireStats] = useState({
    pending: 0,
    accepted: 0,
    rejected: 0,
    timed_out: 0,
    totalRequests: 0,
  });
  const fetchAll = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;


      const profileRes = await axios.get(`${API_BASE}/api/labour/profile`, {
        headers: authHeader(),
      });
      setProfile(profileRes.data);
      setAvailable(Boolean(profileRes.data?.available));


      const jobsRes = await axios.get(`${API_BASE}/api/labour/jobs`, {
        headers: authHeader(),
      });
      const completed: Job[] = jobsRes.data?.completedJobs || [];
      setCompletedJobs(completed);


      const hireRes = await axios.get(`${API_BASE}/api/hire/pending`, {
        headers: authHeader(),
      });
      const raw = hireRes.data;

      const pendingReqs: HireRequest[] = Array.isArray(raw)
        ? raw
        : raw?.requests || raw?.pendingRequests || [];

      setHireRequests(pendingReqs);
      const allRes = await axios.get(`${API_BASE}/api/hire/labour/requests`, {
        headers: authHeader(),
      });
      const allRaw = allRes.data;
      const allReqs: HireRequest[] = Array.isArray(allRaw)
        ? allRaw
        : allRaw?.requests || allRaw?.hireRequests || [];
      setAllRequests(allReqs);
      const statsRes = await axios.get(`${API_BASE}/api/hire/stats`, {
        headers: authHeader(),
      });
      const { pending, accepted, rejected, timed_out, totalRequests } = statsRes.data;

      setHireStats({
        pending: pending ?? 0,
        accepted: accepted ?? 0,
        rejected: rejected ?? 0,
        timed_out: timed_out ?? 0,
        totalRequests: totalRequests ?? 0,
      });
      setJobStats([
        { name: "Completed", value: completed.length },
        { name: "Pending", value: pending ?? 0 },
        { name: "Rejected", value: rejected ?? 0 },
        { name: "Timed Out", value: timed_out ?? 0 },
      ]);
      const monthlyEarnings = [
        { month: "Jan", earning: 0 },
        { month: "Feb", earning: 0 },
        { month: "Mar", earning: 0 },
        { month: "Apr", earning: 0 },
        { month: "May", earning: 0 },
        { month: "Jun", earning: 0 },
      ];


      completed.forEach((job) => {
        const month = job.month;
        if (!month) return;
        const idx = monthlyEarnings.findIndex((m) => m.month === month);
        if (idx >= 0) monthlyEarnings[idx].earning += Number(job.amount) || 0;
      });


      setEarningsData(monthlyEarnings);
    } catch (err) {
      console.error("Failed to fetch profile/jobs/requests:", err);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const toggleAvailability = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;


      await axios.patch(
        `${API_BASE}/api/labour/availability`,
        { available: !available },
        { headers: authHeader() }
      );


      setAvailable((prev) => !prev);
    } catch (err) {
      console.error("toggleAvailability error:", err);
      alert("Availability update failed");
    }
  };

  const updateHireStatus = async (requestId: string, status: "accepted" | "rejected") => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;


      setHireActionLoadingId(requestId);


      await axios.patch(
        `${API_BASE}/api/hire/${requestId}/status`,
        { status },
        { headers: authHeader() }
      );
      setHireRequests((prev) => prev.filter((r) => r._id !== requestId));
      setAllRequests((prev) =>
        prev.map((r) => (r._id === requestId ? { ...r, status } : r))
      );
      if (status === "accepted") {
        setAvailable(false);
      }
      await fetchAll();
    } catch (err) {
      console.error("updateHireStatus error:", err);
      alert("Request update failed (backend issue)");
    } finally {
      setHireActionLoadingId(null);
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-8">
      <div className="bg-white rounded-2xl shadow p-6 flex justify-between flex-wrap gap-6">
        <div className="flex gap-5">
          <div className="w-20 h-20 rounded-xl bg-orange-100 flex items-center justify-center text-3xl">
            👷
          </div>


          <div>
            <h2 className="text-2xl font-semibold">
              {profile?.name || "Loading..."}
            </h2>
            <p className="text-gray-500">
              {profile?.profession || ""} •{" "}
              {profile?.city || profile?.location || "-"}
            </p>
            <p className="text-gray-500">Mob: {profile?.phone || "-"}</p>
            <p className="text-yellow-500">⭐ {profile?.rating || 0} Rating</p>
          </div>
        </div>


        <div className="flex gap-4 items-center">
          <button
            onClick={toggleAvailability}
            className={`px-4 py-2 rounded-full text-sm font-medium
            ${available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
          >
            {available ? "Available for Work" : "Unavailable"}
          </button>


          <button
            onClick={() => navigate("/labour/edit-profile")}
            className="px-5 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
          >
            Edit Profile
          </button>
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="text-2xl relative"
            >
              🔔
              {notificationCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                  {notificationCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 bg-white border rounded-xl shadow-lg z-50">

                <div className="flex justify-between items-center p-3 border-b">
                  <h3 className="font-semibold">Notifications</h3>
                  <button
                    onClick={() => setShowNotifications(false)}
                    className="text-gray-500 hover:text-black text-lg"
                  >
                    ✖
                  </button>
                </div>

                <div className="p-3">
                  {allRequests.length === 0 ? (
                    <p className="text-sm text-gray-500">No notifications</p>
                  ) : (
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {allRequests.slice(0, 5).map((req) => (
                        <div key={req._id} className="border-b pb-2">
                          <p className="text-sm font-medium">
                            {req.employee?.name || "Employer"}
                          </p>
                          <p className="text-xs text-gray-500">
                            Status: {req.status === "timed_out" ? "Timed Out" : req.status}
                          </p>
                          {req.createdAt && (
                            <p className="text-xs text-gray-400">
                              {new Date(req.createdAt).toLocaleString()}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            )}
          </div>
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Stat
          title="Total Jobs"
          value={`${hireStats.totalRequests ?? 0}`}
          onClick={() => setActiveTab("allRequests")}
        />
        <Stat
          title="Completed Jobs"
          value={`${completedJobs.length ?? 0}`}
          onClick={() => setActiveTab("completed")}
        />
        <Stat
          title="Pending Requests"
          value={`${hireRequests.length ?? 0}`}
          onClick={() => setActiveTab("pending")}
        />
        <Stat title="Total Earnings" value={`₹${totalEarnings}`} />
      </div>
      {activeTab === "allRequests" && (
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex justify-between mb-6">
            <h3 className="font-semibold text-lg">All Requests (Pending/Accepted/Rejected)</h3>


            <button
              onClick={() => setActiveTab("dashboard")}
              className="text-orange-600 font-medium"
            >
              ← Back
            </button>
          </div>


          <div className="space-y-4">
            {allRequests.length === 0 ? (
              <p className="text-gray-500">No requests found.</p>
            ) : (
              allRequests.map((req) => (
                <div key={req._id} className="border rounded-xl p-4 bg-white">
                  <p className="font-semibold">{req.employee?.name || "Unknown Employer"}</p>
                  <p className="text-sm text-gray-500">
                    Status: <span className="font-medium">{req.status}</span>
                  </p>
                  {req.createdAt && (
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(req.createdAt).toLocaleString()}
                    </p>
                  )}
                  {req.message && (
                    <p className="text-sm mt-2">{req.message}</p>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      )}
      {activeTab === "dashboard" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="font-semibold mb-4">Monthly Earnings</h3>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={earningsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="earning"
                  stroke="#f97316"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>


          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="font-semibold mb-4">Job Status Overview</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={jobStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#fb923c" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}


      {activeTab === "completed" && (
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex justify-between mb-6">
            <h3 className="font-semibold text-lg">Completed Jobs History</h3>


            <button
              onClick={() => setActiveTab("dashboard")}
              className="text-orange-600 font-medium"
            >
              ← Back
            </button>
          </div>


          <div className="space-y-4">
            {completedJobs.length === 0 ? (
              <p className="text-gray-500">No completed jobs yet.</p>
            ) : (
              completedJobs.map((job) => (
                <JobCard
                  key={(job.id || job._id || Math.random()).toString()}
                  job={job}
                />
              ))
            )}
          </div>
        </div>
      )}


      {activeTab === "pending" && (
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex justify-between mb-6">
            <h3 className="font-semibold text-lg">Pending Hire Requests</h3>


            <button
              onClick={() => setActiveTab("dashboard")}
              className="text-orange-600 font-medium"
            >
              ← Back
            </button>
          </div>


          <div className="space-y-4">
            {hireRequests.length === 0 ? (
              <p className="text-gray-500">No pending requests right now.</p>
            ) : (
              hireRequests.map((req) => (
                <HireRequestCard
                  key={req._id}
                  req={req}
                  loading={hireActionLoadingId === req._id}
                  onAccept={() => updateHireStatus(req._id, "accepted")}
                  onReject={() => updateHireStatus(req._id, "rejected")}
                />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

