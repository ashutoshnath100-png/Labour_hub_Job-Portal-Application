import StatCard from "../components/cards/StatCard";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [distance, setDistance] = useState(10);
    const [selectedSkill, setSelectedSkill] = useState("All");
    const [location, setLocation] = useState("");
    const navigate = useNavigate();
    const [showNotifications, setShowNotifications] = useState(false);
    const [stats, setStats] = useState({
        workersContacted: 0,
        rejected: 0,
        workersHired: 0,
        completedJobs: 0,
    });
    const notificationCount = (stats.rejected ?? 0) + (stats.completedJobs ?? 0);
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await fetch("http://localhost:4000/api/employees/dashboard", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!res.ok) {
                    const errText = await res.text();
                    console.log("Dashboard API error:", res.status, errText);
                    return;
                }

                const data = await res.json();
                setStats({
                    workersContacted: data.workersContacted ?? 0,
                    rejected: data.rejected ?? 0,
                    workersHired: data.workersHired ?? 0,
                    completedJobs: data.completedJobs ?? 0,
                });
            } catch (err) {
                console.error("fetchStats error:", err);
            }
        };

        fetchStats();
    }, []);
    return (
        <div className="bg-gray-50 p-8 min-h-screen">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Welcome back, Employer!</h2>

                <div className="flex items-center gap-4 relative">
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="text-2xl relative m-2"
                    >
                        🔔
                        {notificationCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                                {notificationCount}
                            </span>
                        )}
                    </button>

                    <button
                        onClick={() => navigate("/profile")}
                        className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
                    >
                        Profile
                    </button>

                    {showNotifications && (
                        <div className="absolute right-0 top-12 w-72 bg-white border rounded-xl shadow-lg z-50">

                            <div className="flex justify-between items-center p-3 border-b">
                                <h3 className="font-semibold">Notifications</h3>
                                <button
                                    onClick={() => setShowNotifications(false)}
                                    className="text-gray-500 hover:text-black text-lg"
                                >
                                    ✖
                                </button>
                            </div>

                            <div className="p-3 space-y-3 max-h-64 overflow-y-auto">

                                {stats.rejected > 0 && (
                                    <div className="border-b pb-2">
                                        <p className="text-sm font-medium">Rejected Requests</p>
                                        <p className="text-xs text-gray-500">
                                            {stats.rejected} request(s) were rejected
                                        </p>
                                    </div>
                                )}

                                {stats.completedJobs > 0 && (
                                    <div className="border-b pb-2">
                                        <p className="text-sm font-medium">Completed Jobs</p>
                                        <p className="text-xs text-gray-500">
                                            {stats.completedJobs} job(s) completed
                                        </p>
                                    </div>
                                )}

                                {notificationCount === 0 && (
                                    <p className="text-sm text-gray-500">No notifications</p>
                                )}

                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard value={stats.workersContacted} title="Workers Contacted" icon={<span className="text-xl">👥</span>} onClick={() => navigate("/contacted-workers")} />
                <StatCard value={stats.rejected} title="Rejected" icon={<span className="text-xl">🔍</span>} onClick={() => navigate("/rejected-workers")} />
                <StatCard value={stats.workersHired} title="Workers Hired" icon={<span className="text-xl">✅</span>} onClick={() => navigate("/hired-workers")} />
                <StatCard value={stats.completedJobs} title="Completed Jobs" icon={<span className="text-xl">🏁</span>} onClick={() => navigate("/completed-jobs")} />
            </div>

            <div className="mt-10 rounded-xl border bg-white p-6 shadow-md">
                <h2 className="text-lg font-semibold mb-4">Find Workers</h2>

                <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
                    <select
                        value={selectedSkill}
                        onChange={(e) => setSelectedSkill(e.target.value)}
                        className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                    >
                        <option value="All">All Skills</option>
                        <option value="Electrician">Electrician</option>
                        <option value="Plumber">Plumber</option>
                        <option value="Carpenter">Carpenter</option>
                    </select>

                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Enter area or locality"
                        className="w-full rounded-lg border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
                    />

                    <div>
                        <p className="mb-2 text-sm text-gray-500">Distance: {distance} km</p>
                        <input
                            type="range"
                            min="1"
                            max="50"
                            value={distance}
                            onChange={(e) => setDistance(Number(e.target.value))}
                            className="w-full accent-orange-500"
                        />
                    </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                    <button
                        onClick={() => navigate("/find-labour")}
                        className="flex-1 rounded-lg bg-orange-500 hover:bg-orange-600 active:scale-95 transition-all duration-200 text-white py-3"
                    >
                        Search Workers
                    </button>

                    <button className="rounded-lg border px-6 py-3 text-sm hover:bg-orange-500 bg-slate-200 hover:text-white transition">
                        More Filters
                    </button>
                </div>
            </div>

            <div className="mt-10">
                <h2 className="mb-4 text-lg font-semibold">Recent Searches</h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="rounded-xl border bg-white p-4 hover:shadow-lg hover:scale-105 transition cursor-pointer">
                        <p className="font-medium">Electrician</p>
                        <p className="text-sm text-gray-500">Noida</p>
                        <p className="mt-2 text-xs text-gray-400">2 hours ago</p>
                    </div>
                    <div className="rounded-xl border bg-white p-4 hover:shadow-lg hover:scale-105 transition cursor-pointer">
                        <p className="font-medium">Plumber</p>
                        <p className="text-sm text-gray-500">Delhi</p>
                        <p className="mt-2 text-xs text-gray-400">Yesterday</p>
                    </div>
                    <div className="rounded-xl border bg-white p-4 hover:shadow-lg hover:scale-105 transition cursor-pointer">
                        <p className="font-medium">Carpenter</p>
                        <p className="text-sm text-gray-500">Gurgaon</p>
                        <p className="mt-2 text-xs text-gray-400">2 days ago</p>
                    </div>
                </div>
            </div>

            <div className="mt-10 rounded-xl bg-gradient-to-r from-orange-50 to-orange-100 p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-orange-700">Hiring Tips</h2>
                <ul className="mt-4 space-y-3 text-sm text-orange-700">
                    <li className="flex items-start gap-2">
                        <span className="mt-1 h-2 w-2 rounded-full bg-orange-500"></span>
                        Check worker ratings and reviews
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="mt-1 h-2 w-2 rounded-full bg-orange-500"></span>
                        Clearly discuss work scope and payment
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="mt-1 h-2 w-2 rounded-full bg-orange-500"></span>
                        Confirm availability before hiring
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="mt-1 h-2 w-2 rounded-full bg-orange-500"></span>
                        Compare multiple workers before finalizing
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;