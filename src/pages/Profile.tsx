import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface ProfileType {
    name?: string;
    email?: string;
    phone?: string;
    location?: string;
}
const API_URL = "http://localhost:4000/api/employees/profile";
export default function Profile() {
    const navigate = useNavigate();

    const [profile, setProfile] = useState<ProfileType>({
        name: "",
        email: "",
        phone: "",
        location: "",
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await axios.get(API_URL, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log("Profile data:", res.data);

                const user = res.data?.user || res.data;

                setProfile({
                    name: user?.name || "",
                    email: user?.email || "",
                    phone: user?.phone || "",
                    location: user?.location || "",
                });

            } catch (err) {
                console.error("Profile fetch error:", err);
            }
        };

        fetchProfile();
    }, []);
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">My Profile</h2>
                <button
                    onClick={() => navigate(-1)}
                    className="text-orange-500 font-medium"
                >
                    ← Back
                </button>
            </div>
            <div className="bg-white rounded-2xl shadow p-6 max-w-xl mx-auto">
                <div className="flex flex-col items-center mb-6">
                    <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center text-4xl">
                        👤
                    </div>
                    <h3 className="text-xl font-semibold mt-3">{profile.name||"no name"}</h3>
                    <p className="text-gray-500">{profile.location||"no location"}</p>
                </div>
                <div className="space-y-4">
                    <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">{profile.email||"no email"}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium">{profile.phone||"no phone"}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Location</p>
                        <p className="font-medium">{profile.location||"no location"}</p>
                    </div>
                </div>
                <div className="mt-6 flex gap-4">
                    <button
                        onClick={() => navigate("/employee/edit-profile")}
                        className="flex-1 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600"
                    >
                        Edit Profile
                    </button>

                    <button
                    onClick={() =>{
                        localStorage.removeItem("token");
                        localStorage.removeItem("role");
                        window.location.href = "/login";
                    }}
                        className="flex-1 border py-2 rounded-lg hover:bg-gray-100"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}