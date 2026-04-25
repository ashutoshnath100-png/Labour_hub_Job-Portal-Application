import { useEffect, useState } from "react";

export default function RejectedWorkers() {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const run = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch("http://localhost:4000/api/hire/employee/rejected", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const data = await res.json().catch(() => ({}));
                setItems(data?.data || []);
            } finally {
                setLoading(false);
            }
        };
        run();
    }, []);

    if (loading) return <div className="p-6">Loading...</div>;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="text-2xl font-semibold mb-4">Rejected Requests</h1>

            {items.length === 0 ? (
                <div className="bg-white p-6 rounded-xl border">No rejected requests yet.</div>
            ) : (
                <div className="space-y-3">
                    {items.map((x) => (
                        <div key={x._id} className="bg-white p-4 rounded-xl border">
                            <div className="font-medium">
                                Labour: {x?.labour?.name || "Unknown Labour"}
                            </div>

                            <div className="text-sm text-gray-600">
                                Profession: {x?.labour?.profession || "-"}
                            </div>

                            <div className="text-sm text-gray-600">
                                Location: {x?.labour?.location || "-"}
                            </div>

                            <div className="text-sm text-gray-600">
                                Status: {x.status}
                            </div>

                            <div className="text-sm text-gray-600">
                                Date: {x.createdAt ? new Date(x.createdAt).toLocaleString() : "-"}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}