import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, ArrowLeft } from "lucide-react";

const AdminProfile = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/admin/login");
      return;
    }

    fetch("http://localhost:4000/admin/profile", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProfile({
            name: data.data.name,
            email: data.data.email,
            mobile: data.data.mobile,
          });
        } else {
          navigate("/admin/login");
        }
      })
      .catch(() => navigate("/admin/login"));
  }, [navigate]);

  const handleProfileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateProfile = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(
      "http://localhost:4000/admin/profile",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: profile.name,
          mobile: profile.mobile,
        }),
      }
    );

    const data = await res.json();

    if (data.success) {
      setSuccess(true);
      setMessage("Profile updated successfully");
    } else {
      setSuccess(false);
      setMessage(data.message);
    }

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#c7d5df] via-[#e8caa7] to-[#e6a1a9]">

      <div className="w-full max-w-md bg-white shadow-xl rounded-3xl p-8">

        <button
          onClick={() => navigate("/admin/dashboard")}
          className="flex items-center text-gray-600 mb-6 hover:text-orange-600 transition"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Dashboard
        </button>

        <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
          Admin Profile
        </h2>

        <p className="text-gray-500 text-center mb-6 text-sm">
          Manage your account details
        </p>

        <div className="space-y-5">

          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleProfileChange}
              placeholder="Full Name"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="email"
              value={profile.email}
              disabled
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-100 text-gray-500"
            />
          </div>

          <div className="relative">
            <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              name="mobile"
              value={profile.mobile}
              onChange={handleProfileChange}
              placeholder="Mobile Number"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            />
          </div>

          <button
            onClick={handleUpdateProfile}
            className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition duration-300 shadow-md"
          >
            Update Profile
          </button>

          {message && (
            <div
              className={`mt-4 p-3 rounded-xl text-sm text-center font-medium ${
                success
                  ? "bg-green-100 text-green-700 border border-green-300"
                  : "bg-red-100 text-red-700 border border-red-300"
              }`}
            >
              {message}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AdminProfile;