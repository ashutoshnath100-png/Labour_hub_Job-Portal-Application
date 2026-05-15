import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TopBar from "../components/Topbar";
import { Bar, Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const Reports = () => {

    const navigate = useNavigate();

    const [days, setDays] = useState("7");
    const [data, setData] = useState<any>(null);

    const fetchData = async (selectedDays: string) => {

        const token = localStorage.getItem("token");

        const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/admin/reports?days=${selectedDays}`,
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );

        if (res.data.success) {
            setData(res.data);
        }

    };

    useEffect(() => {
        fetchData(days);
    }, [days]);

    const exportCSV = async () => {

        const token = localStorage.getItem("token");

        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/admin/reports/exports-csv`,
            {
                headers: { Authorization: `Bearer ${token}` },
                responseType: "blob"
            }
        );

        const url = window.URL.createObjectURL(new Blob([response.data]));

        const link = document.createElement("a");

        link.href = url;
        link.setAttribute("download", "report.csv");

        document.body.appendChild(link);

        link.click();

    };

    const exportPDF = async () => {

        const token = localStorage.getItem("token");

        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/admin/reports/exports-pdf`,
            {
                headers: { Authorization: `Bearer ${token}` },
                responseType: "blob"
            }
        );

        const url = window.URL.createObjectURL(new Blob([response.data]));

        const link = document.createElement("a");

        link.href = url;
        link.setAttribute("download", "report.pdf");

        document.body.appendChild(link);

        link.click();

    };

    if (!data) return <div>Loading...</div>;

    const compareData = {
        labels: ["Labour", "Employer"],
        datasets: [
            {
                data: [data.labourCount, data.employerCount],
                backgroundColor: ["#3b82f6", "#10b981"],
                borderRadius: 6
            }
        ]
    };

    const growthData = {
        labels: data.dailyGrowth.map((d: any) => d.date),
        datasets: [
            {
                data: data.dailyGrowth.map((d: any) => d.count),
                borderColor: "#2563eb",
                backgroundColor: "rgba(37,99,235,0.2)",
                fill: true,
                tension: 0.4,
                pointRadius: 4
            }
        ]
    };

    const monthlyChartData = {
        labels: [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ],
        datasets: [
            {
                data: data.monthlyData,
                backgroundColor: [
                    "#3b82f6", "#10b981", "#f59e0b", "#ef4444",
                    "#6366f1", "#14b8a6", "#f97316", "#8b5cf6",
                    "#ec4899", "#0ea5e9", "#22c55e", "#eab308"
                ],
                borderRadius: 6
            }
        ]
    };

    return (
    <div className="min-h-screen bg-[#f4f7fb]">

        <TopBar />

        <div className="max-w-[1450px] mx-auto px-6 py-8 space-y-8">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                <div className="flex items-center gap-4">

                    <button
                        onClick={() => navigate("/admin/dashboard")}
                        className="w-11 h-11 rounded-2xl bg-white border border-gray-200 flex items-center justify-center shadow-sm hover:shadow-md hover:bg-indigo-50 transition-all duration-300"
                    >
                        ←
                    </button>

                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                            Reports Dashboard
                        </h1>

                        <p className="text-sm text-gray-500 mt-1">
                            Analytics, registrations and platform insights
                        </p>
                    </div>

                </div>

                {/* Export Buttons */}
                <div className="flex gap-3">

                    <button
                        onClick={exportCSV}
                        className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-3 rounded-2xl font-medium shadow-lg shadow-emerald-200 hover:scale-[1.02] transition-all duration-300"
                    >
                        Export CSV
                    </button>

                    <button
                        onClick={exportPDF}
                        className="bg-gradient-to-r from-red-500 to-rose-600 text-white px-6 py-3 rounded-2xl font-medium shadow-lg shadow-red-200 hover:scale-[1.02] transition-all duration-300"
                    >
                        Export PDF
                    </button>

                </div>

            </div>

            {/* Filter Tabs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                {[
                    { label: "Today", value: "1" },
                    { label: "Last 7 Days", value: "7" },
                    { label: "Last 15 Days", value: "15" },
                    { label: "Last 30 Days", value: "30" }
                ].map(card => (

                    <div
                        key={card.value}
                        onClick={() => setDays(card.value)}
                        className={`group relative overflow-hidden rounded-3xl p-5 cursor-pointer border transition-all duration-300
                            
                            ${days === card.value
                                ? "bg-gradient-to-br from-indigo-600 to-blue-600 border-indigo-500 text-white shadow-xl shadow-indigo-200"
                                : "bg-white border-gray-200 hover:border-indigo-200 hover:shadow-lg"
                            }
                        `}
                    >

                        {/* Glow */}
                        {days === card.value && (
                            <div className="absolute inset-0 bg-white/10 backdrop-blur-xl" />
                        )}

                        <div className="relative z-10">

                            <p className={`text-sm font-medium ${days === card.value
                                    ? "text-indigo-100"
                                    : "text-gray-500"
                                }`}>
                                Analytics
                            </p>

                            <h3 className="text-lg font-bold mt-1">
                                {card.label}
                            </h3>

                        </div>

                    </div>

                ))}

            </div>

            {/* Top Charts */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

                {/* Compare Chart */}
                <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300">

                    <div className="flex items-center justify-between mb-6">

                        <div>
                            <h2 className="text-xl font-bold text-gray-800">
                                Labour vs Employer
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                User comparison overview
                            </p>
                        </div>

                        <div className="w-11 h-11 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center text-lg">
                            📊
                        </div>

                    </div>

                    <div className="h-[280px]">

                        <Bar
                            data={compareData}
                            options={{
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: { display: false }
                                },
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        grid: {
                                            color: "#eef2ff"
                                        }
                                    },
                                    x: {
                                        grid: {
                                            display: false
                                        }
                                    }
                                }
                            }}
                        />

                    </div>

                </div>

                {/* Growth Chart */}
                <div className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300">

                    <div className="flex items-center justify-between mb-6">

                        <div>
                            <h2 className="text-xl font-bold text-gray-800">
                                Growth Analytics
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Daily registration growth
                            </p>
                        </div>

                        <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-lg">
                            📈
                        </div>

                    </div>

                    <div className="h-[280px]">

                        <Line
                            data={growthData}
                            options={{
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: { display: false }
                                },
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                        grid: {
                                            color: "#eef2ff"
                                        }
                                    },
                                    x: {
                                        grid: {
                                            display: false
                                        }
                                    }
                                }
                            }}
                        />

                    </div>

                </div>

            </div>

            {/* Monthly Chart */}
            <div className="bg-white border border-gray-100 rounded-3xl p-7 shadow-sm hover:shadow-xl transition-all duration-300">

                <div className="flex items-center justify-between mb-6">

                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                            Monthly Registrations
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            User registrations by month
                        </p>
                    </div>

                    <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center text-xl">
                        📅
                    </div>

                </div>

                <div className="h-[360px]">

                    <Bar
                        data={monthlyChartData}
                        options={{
                            maintainAspectRatio: false,
                            plugins: {
                                legend: { display: false }
                            },
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    grid: {
                                        color: "#eef2ff"
                                    }
                                },
                                x: {
                                    grid: {
                                        display: false
                                    }
                                }
                            }
                        }}
                    />

                </div>

            </div>

        </div>

    </div>
);

};

export default Reports;