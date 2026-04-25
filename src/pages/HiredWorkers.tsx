import { useEffect, useState } from "react";

const API_BASE = "http://localhost:4000";

type Labour = {
    _id: string;
    name?: string;
    phone?: string;
    location?: string;
    profession?: string;
    rating?: number;
    available?: boolean;
};

type HiredItem = {
    _id: string;
    createdAt?: string;
    updatedAt?: string;
    status: "accepted";
    labour?: Labour;
};

export default function HiredWorkers() {
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState<HiredItem[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const run = async () => {
            try {
                setLoading(true);
                setError("");

                const token = localStorage.getItem("token");
                const role = localStorage.getItem("role");

                if (!token || role !== "employee") {
                    setError("Please login as employee");
                    setLoading(false);
                    return;
                }

                const res = await fetch(`${API_BASE}/api/hire/employee/hired`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const data = await res.json().catch(() => ({}));

                if (!res.ok) {
                    setError(data?.message || "Failed to load hired workers");
                    setLoading(false);
                    return;
                }

                setItems(data?.hired || []);
            } catch (e) {
                setError("Server error / backend not running");
            } finally {
                setLoading(false);
            }
        };

        run();
    }, []);

    if (loading) return <div className="p-6">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h2 className="text-2xl font-semibold mb-4">Workers Hired</h2>

            {error && <p className="text-red-600 mb-4">{error}</p>}

            {!error && items.length === 0 && (
                <p className="text-gray-600">No hired workers yet.</p>
            )}

            <div className="space-y-3">
                {items.map((x) => (
                    <div key={x._id} className="bg-white border rounded-xl p-4 shadow-sm">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p className="font-semibold">{x.labour?.name || "Unknown Worker"}</p>
                                <p className="text-sm text-gray-600">
                                    {x.labour?.profession || "-"} • {x.labour?.location || "-"}
                                </p>
                                <p className="text-sm text-gray-600">
                                    {x.labour?.phone ? `📞 ${x.labour.phone}` : ""}
                                </p>
                                <p className="text-xs text-gray-400 mt-2">
                                    Accepted: {x.updatedAt ? new Date(x.updatedAt).toLocaleString() : "-"}
                                </p>
                            </div>

                            <span
                                className={`text-xs px-3 py-1 rounded-full ${x.labour?.available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                    }`}
                            >
                                {x.labour?.available ? "Available" : "Busy"}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}