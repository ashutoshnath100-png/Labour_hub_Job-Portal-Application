import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, ArrowLeft } from "lucide-react";

const ChangePassword = () => {
  const navigate = useNavigate();

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(
      "http://localhost:4000/admin/change-password",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      }
    );

    const data = await res.json();

    if (data.success) {
      setSuccess(true);
      setMessage("Password updated successfully");

      setTimeout(() => {
        localStorage.removeItem("token");
        navigate("/admin/login");
      }, 2000);
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
          Change Password
        </h2>

        <p className="text-gray-500 text-center mb-6 text-sm">
          Update your account password
        </p>

        <div className="space-y-5">

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="password"
              name="currentPassword"
              value={form.currentPassword}
              onChange={handleChange}
              placeholder="Current Password"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="password"
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              placeholder="New Password"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm New Password"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition duration-300 shadow-md"
          >
            Update Password
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

export default ChangePassword;