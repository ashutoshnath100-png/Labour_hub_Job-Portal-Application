import { useEffect, useState } from "react";

export default function ContactedWorkers() {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const run = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await fetch("http://localhost:4000/api/hire/employee/contacted", {
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
            <h1 className="text-2xl font-semibold mb-4">Workers Contacted</h1>

            {items.length === 0 ? (
                <div className="bg-white p-6 rounded-xl border">No contacted workers yet.</div>
            ) : (
                <div className="space-y-3">
                    {items.map((x) => (
                        <div key={x._id} className="bg-white p-4 rounded-xl border">
                            <div className="font-medium">
                                {x?.labour?.name || "Unknown Labour"}
                            </div>
                            <div className="text-sm text-gray-600">
                                {x?.labour?.location || "-"} • {x?.labour?.phone || "-"}
                            </div>
                            <div className="text-sm text-gray-600">
                                Status: <b>{x.status}</b>
                            </div>
                            <div className="text-xs text-gray-400">
                                {x.createdAt ? new Date(x.createdAt).toLocaleString() : "-"}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}