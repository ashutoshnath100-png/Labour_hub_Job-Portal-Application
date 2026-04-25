import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Lock, ArrowLeft } from "lucide-react";

const ResetPasswordDirect = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [showNewPassword, setShowNewPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const submit = async (e: any) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMsg("Passwords do not match");
      setSuccess(false);
      return;
    }

    const res = await fetch("http://localhost:4000/admin/reset-password-direct", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...state, password, confirmPassword }),
    });

    const data = await res.json();
    setMsg(data.message);
    setSuccess(data.success);

    if (data.success) {
      setTimeout(() => navigate("/admin/login"), 1500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#c7d5df] via-[#e8caa7] to-[#e6a1a9]">

      <div className="w-full max-w-md bg-white shadow-xl rounded-3xl p-8">

        <button
          onClick={() => navigate("/admin/login")}
          className="flex items-center text-gray-600 mb-6 hover:text-orange-600 transition"
        >
          <ArrowLeft size={18} className="mr-2" />
          Back to Login
        </button>

        <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
          Set New Password
        </h2>

        <p className="text-gray-500 text-center mb-6 text-sm">
          Create a strong new password
        </p>

        <form onSubmit={submit} className="space-y-5">

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="password"
              placeholder="New Password"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition duration-300 shadow-md">
            Reset Password
          </button>

          {msg && (
            <div
              className={`mt-4 p-3 rounded-xl text-sm text-center font-medium ${
                success
                  ? "bg-green-100 text-green-700 border border-green-300"
                  : "bg-red-100 text-red-700 border border-red-300"
              }`}
            >
              {msg}
            </div>
          )}

        </form>

      </div>
    </div>
  );
};

export default ResetPasswordDirect;