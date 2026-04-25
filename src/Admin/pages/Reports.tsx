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
            `http://localhost:4000/admin/reports?days=${selectedDays}`,
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
            "http://localhost:4000/admin/reports/exports-csv",
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
            "http://localhost:4000/admin/reports/exports-pdf",
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

        <div className="min-h-screen bg-gray-50">

            <TopBar />

            <div className="max-w-[1400px] mx-auto p-8 space-y-8">

                <div className="flex items-center gap-4">

                    <button
                        onClick={() => navigate("/admin/dashboard")}
                        className="bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300"
                    >
                        ← Back
                    </button>

                    <h1 className="text-2xl font-bold">
                        Reports Dashboard
                    </h1>

                </div>

                <div className="grid grid-cols-4 gap-4">

                    {[
                        { label: "Today", value: "1" },
                        { label: "Last 7 Days", value: "7" },
                        { label: "Last 15 Days", value: "15" },
                        { label: "Last 30 Days", value: "30" }
                    ].map(card => (

                        <div
                            key={card.value}
                            onClick={() => setDays(card.value)}
                            className={`p-4 rounded-xl shadow cursor-pointer ${days === card.value
                                    ? "bg-indigo-600 text-white"
                                    : "bg-white hover:bg-indigo-100"
                                }`}
                        >

                            <p className="font-medium">{card.label}</p>

                        </div>

                    ))}

                </div>

                <div className="grid grid-cols-2 gap-8">

                    <div className="bg-white p-6 rounded-xl shadow h-[350px]">

                        <h2 className="mb-4 font-semibold">
                            Labour vs Employer
                        </h2>

                        <div className="h-[250px]">

                            <Bar
                                data={compareData}
                                options={{ maintainAspectRatio: false }}
                            />

                        </div>

                    </div>

                    <div className="bg-white p-6 rounded-xl shadow h-[350px]">

                        <h2 className="mb-4 font-semibold">
                            Growth Chart
                        </h2>

                        <div className="h-[250px]">

                            <Line
                                data={growthData}
                                options={{
                                    maintainAspectRatio: false,
                                    plugins: { legend: { display: false } },
                                    scales: { y: { beginAtZero: true } }
                                }}
                            />

                        </div>

                    </div>

                </div>

                <div className="bg-white p-6 rounded-xl shadow h-[420px]">

                    <h2 className="mb-4 font-semibold">
                        Monthly Registrations
                    </h2>

                    <div className="h-[320px]">

                        <Bar
                            data={monthlyChartData}
                            options={{
                                maintainAspectRatio: false,
                                plugins: { legend: { display: false } },
                                scales: { y: { beginAtZero: true } }
                            }}
                        />

                    </div>

                </div>

                <div className="flex gap-4">

                    <button
                        onClick={exportCSV}
                        className="bg-green-600 text-white px-6 py-2 rounded-lg"
                    >
                        Export CSV
                    </button>

                    <button
                        onClick={exportPDF}
                        className="bg-red-600 text-white px-6 py-2 rounded-lg"
                    >
                        Export PDF
                    </button>

                </div>

            </div>

        </div>

    );

};

export default Reports;