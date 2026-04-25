import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Phone, ArrowLeft } from "lucide-react";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", mobile: "" });
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const submit = async (e: any) => {
    e.preventDefault();

    const res = await fetch("http://localhost:4000/admin/verify-forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setMsg(data.message);
    setSuccess(data.success);

    if (data.success) {
      setTimeout(() => {
        navigate("/admin/reset-password-direct", {
          state: form,
        });
      }, 1200);
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
          Forgot Password
        </h2>

        <p className="text-gray-500 text-center mb-6 text-sm">
          Verify your details to reset password
        </p>

        <form onSubmit={submit} className="space-y-5">

          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              required
            />
          </div>

          <div className="relative">
            <Phone className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Mobile Number"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
              onChange={(e) =>
                setForm({ ...form, mobile: e.target.value })
              }
              required
            />
          </div>

          <button className="w-full bg-orange-500 text-white py-3 rounded-xl font-semibold hover:bg-orange-600 transition duration-300 shadow-md">
            Verify
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

export default ForgotPassword;