import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface FormType {
    name: string;
    phone: string;
    location: string;
    about: string;
}

export default function EditProfile() {
    const navigate = useNavigate();

    const [form, setForm] = useState<FormType>({
        name: "",
        phone: "",
        location: "",
        about: ""
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    alert("Login first");
                    navigate("/login");
                    return;
                }
                const res = await axios.get(
                    "http://localhost:4000/api/employees/profile",
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );

                const user = res.data?.user || res.data;

                setForm({
                    name: user?.name || "",
                    phone: user?.phone || "",
                    location: user?.location || "",
                    about: user?.about || ""
                });

            } catch (err) {
                console.error("Fetch error:", err);
                alert("Failed to load profile");
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);

            const token = localStorage.getItem("token");

            await axios.put(
                "http://localhost:4000/api/employees/profile",
                form,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            alert("Profile updated successfully");
            navigate("/profile");

        } catch (err: any) {
            console.error("Update error:", err);
            alert(
                err.response?.data?.message || err.message ||
                "Error updating profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-lg mx-auto bg-white rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>

            <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full border p-2 mb-3 rounded"
            />

            <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="w-full border p-2 mb-3 rounded"
            />

            <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Location"
                className="w-full border p-2 mb-3 rounded"
            />

            <textarea
                name="about"
                value={form.about}
                onChange={handleChange}
                placeholder="About"
                className="w-full border p-2 mb-3 rounded"
            />

            <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-orange-500 text-white px-4 py-2 rounded w-full hover:bg-orange-600 disabled:opacity-60"
            >
                {loading ? "Saving..." : "Save Changes"}
            </button>
        </div>
    );
}