import { useNavigate } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";


declare global {
  interface Window {
    google: any;
  }
}


const safeJson = async (res: Response) => {
  const text = await res.text();
  try {
    return { ok: true, data: JSON.parse(text) };
  } catch {
    return { ok: false, data: { message: text } };
  }
};


const Login = () => {
  const navigate = useNavigate();


  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [commonError, setCommonError] = useState("");
  const [loading, setLoading] = useState(false);
  


  const handleCredentialResponse = async (response: any) => {
    try {
      setCommonError("");
      setLoading(true);


      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/google-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: response.credential }),
      });


      const parsed = await safeJson(res);


      if (res.ok && parsed.ok && parsed.data?.success && parsed.data?.token) {
        localStorage.setItem("token", parsed.data.token);
        localStorage.setItem("role", "admin");
        window.dispatchEvent(new Event("auth-changed"));
        navigate("/admin/dashboard", { replace: true });
        return;
      }


      setCommonError(parsed.data?.message || "Google login failed");
    } catch (err) {
      console.error(err);
      setCommonError("Backend not running / CORS issue");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role) {
      if (role === "admin") navigate("/admin/dashboard", { replace: true });
      else if (role === "labour") navigate("/labour-dashboard", { replace: true });
      else if (role === "employee") navigate("/find-labour", { replace: true });
    }


    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });
    }
  }, [navigate]);


  const handleGoogleLogin = () => {
    if (!window.google) {
      setCommonError("Google SDK not loaded");
      return;
    }
    window.google.accounts.id.prompt();
  };


  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();


    setEmailError("");
    setPasswordError("");
    setCommonError("");
    setLoading(true);


    const identifier = form.email.trim();


    try {
      let res = await fetch(`${import.meta.env.VITE_API_URL}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: identifier, password: form.password }),
      });


      let parsed = await safeJson(res);


      if (res.ok && parsed.ok && parsed.data?.token) {
        localStorage.setItem("token", parsed.data.token);
        localStorage.setItem("userData", JSON.stringify(parsed.data));
        localStorage.setItem("role", "admin");
        window.dispatchEvent(new Event("auth-changed"));
        navigate("/admin/dashboard", { replace: true });
        return;
      }


      res = await fetch(`${import.meta.env.VITE_API_URL}/api/labour/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password: form.password }),
      });


      parsed = await safeJson(res);


      if (res.ok && parsed.ok && parsed.data?.token) {
        localStorage.setItem("token", parsed.data.token);
        localStorage.setItem("userData", JSON.stringify(parsed.data));
        localStorage.setItem("role", "labour");


        const labourId = parsed.data?.labour?._id;
        if (labourId) localStorage.setItem("userId", labourId);


        window.dispatchEvent(new Event("auth-changed"));
        navigate("/labour-dashboard", { replace: true });
        return;
      }


      res = await fetch(`${import.meta.env.VITE_API_URL}/api/employees/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: identifier,
          identifier: identifier,
          password: form.password,
        }),
      });


      parsed = await safeJson(res);


      if (res.ok && parsed.ok && parsed.data?.token) {
        localStorage.setItem("token", parsed.data.token);
        localStorage.setItem("userData", JSON.stringify(parsed.data));
        localStorage.setItem("role", "employee");


        const employeeId =
          parsed.data?.user?._id || parsed.data?.employee?._id;


        if (employeeId) localStorage.setItem("userId", employeeId);


        window.dispatchEvent(new Event("auth-changed"));
        navigate("/find-labour", { replace: true });
        return;
      }
      const msg = parsed.data?.message || "Invalid credentials";


      if (res.status === 400 || res.status === 404) setEmailError(msg);
      else if (res.status === 401) setPasswordError(msg);
      else setCommonError(msg);
    } catch (err) {
      console.error(err);
      setCommonError("Backend not running / CORS issue");
    } finally {
      setLoading(false);
    }
  };


 return (
  <div className="min-h-screen w-full bg-gradient-to-br from-[#c7e7ff] via-[#ffd6a5] to-[#ffb4c6] flex items-center justify-center px-4">

    <div className="relative bg-white/80 backdrop-blur-xl rounded-[32px] shadow-[0_20px_60px_rgba(0,0,0,0.12)] overflow-hidden w-full max-w-4xl min-h-[580px] border border-white/40">

      {/* LEFT SIDE */}
      <div className="hidden md:flex absolute left-0 top-0 h-full w-[48%] overflow-hidden bg-[#fb923c] rounded-r-[120px]">

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 opacity-95"></div>

        {/* Decorative Shapes */}
        <div className="absolute top-[-40px] left-[-40px] w-40 h-40 rounded-full border border-white/10"></div>
        <div className="absolute bottom-[-50px] right-[-50px] w-56 h-56 rounded-full border border-white/10"></div>

        <div className="relative z-10 flex flex-col justify-between h-full w-full px-10 py-12 text-white">

          {/* TOP LOGO */}
          <div>

            <div className="flex items-center gap-4">

              {/* Logo Box */}
              <div className="w-16 h-16 rounded-3xl bg-white/15 backdrop-blur-lg border border-white/20 shadow-xl flex items-center justify-center">
                <span className="text-3xl">⚒️</span>
              </div>

              <div>
                <h1 className="text-3xl font-black tracking-tight">
                  Labour Hub
                </h1>

                <p className="text-orange-100 text-xs tracking-widest uppercase mt-1">
                  Smart Job Platform
                </p>
              </div>

            </div>

            {/* Main Text */}
            <div className="mt-14">

              <h2 className="text-4xl font-black leading-tight">
                Find Jobs.
                <br />
                Hire Faster.
              </h2>

              <p className="mt-5 text-sm text-orange-100 leading-relaxed max-w-xs">
                A modern labour management platform helping employers and workers connect efficiently.
              </p>

            </div>

          </div>

          {/* Bottom Cards */}
          <div className="space-y-4">

            <div className="bg-white/10 border border-white/15 backdrop-blur-lg rounded-2xl px-5 py-4 shadow-lg hover:scale-[1.02] transition-all duration-300">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  ⚡
                </div>

                <div>
                  <h3 className="font-bold text-sm">
                    Quick Hiring
                  </h3>

                  <p className="text-[11px] text-orange-100 mt-1">
                    Instantly connect with workers.
                  </p>
                </div>

              </div>

            </div>

            <div className="bg-white/10 border border-white/15 backdrop-blur-lg rounded-2xl px-5 py-4 shadow-lg hover:scale-[1.02] transition-all duration-300">

              <div className="flex items-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                  🔒
                </div>

                <div>
                  <h3 className="font-bold text-sm">
                    Trusted Platform
                  </h3>

                  <p className="text-[11px] text-orange-100 mt-1">
                    Safe & verified employer accounts.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="relative md:absolute right-0 top-0 w-full md:w-[52%] h-full flex items-center justify-center px-6 md:px-12 py-10">

        <div className="w-full max-w-sm">

          {/* Mobile Logo */}
          <div className="md:hidden flex justify-center mb-6">

            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-orange-500 to-orange-400 flex items-center justify-center shadow-xl">
              <span className="text-3xl text-white">⚒️</span>
            </div>

          </div>

          {/* Heading */}
          <div className="text-center mb-8">

            <h2 className="text-3xl font-black text-gray-800">
              Welcome Back
            </h2>

            <p className="text-sm text-gray-500 mt-2">
              Login to continue
            </p>

          </div>

          {/* FORM */}
          <form onSubmit={handleLogin} className="space-y-5">

            {/* EMAIL */}
            <div>

              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Email or Phone
              </label>

              <div className="relative">

                <input
                  type="text"
                  placeholder="Enter email or phone"
                  value={form.email}
                  onChange={(e) => {
                    setForm({ ...form, email: e.target.value });
                    setEmailError("");
                    setCommonError("");
                  }}
                  className={`w-full bg-white/90 px-4 py-3 rounded-2xl outline-none border shadow-sm transition-all duration-300
                  ${emailError
                      ? "border-red-400 focus:ring-2 focus:ring-red-200"
                      : "border-gray-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                    }`}
                />

                <span className="absolute right-4 top-3 text-gray-500">
                  👤
                </span>

              </div>

              {emailError && (
                <p className="text-red-500 text-xs mt-2">
                  {emailError}
                </p>
              )}

            </div>

            {/* PASSWORD */}
            <div>

              <label className="text-sm font-semibold text-gray-700 mb-2 block">
                Password
              </label>

              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  autoComplete="new-password"
                  value={form.password}
                  onChange={(e) => {
                    setForm({ ...form, password: e.target.value });
                    setPasswordError("");
                    setCommonError("");
                  }}
                  className={`w-full bg-white/90 px-4 py-3 rounded-2xl outline-none border shadow-sm transition-all duration-300
                  ${passwordError
                      ? "border-red-400 focus:ring-2 focus:ring-red-200"
                      : "border-gray-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                    }`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3 text-sm font-semibold text-orange-500"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>

              </div>

              {passwordError && (
                <p className="text-red-500 text-xs mt-2">
                  {passwordError}
                </p>
              )}

            </div>

            {/* ERROR */}
            {commonError && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-500">
                {commonError}
              </div>
            )}

            {/* FORGOT */}
            <div className="flex justify-end">

              <button
                type="button"
                onClick={() => navigate("/admin/forget-password")}
                className="text-sm font-semibold text-orange-500 hover:underline"
              >
                Forgot Password?
              </button>

            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-400 text-white py-3 rounded-2xl font-bold shadow-lg hover:shadow-orange-200 hover:scale-[1.01] transition-all duration-300"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          {/* SOCIAL */}
          <div className="mt-6">

            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-[1px] bg-gray-200"></div>
              <span className="text-[10px] font-bold text-gray-400 tracking-widest">
                OR
              </span>
              <div className="flex-1 h-[1px] bg-gray-200"></div>
            </div>

            <div className="flex justify-center gap-4">

              <button
                onClick={handleGoogleLogin}
                className="w-11 h-11 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 font-bold"
              >
                G
              </button>

              <button className="w-11 h-11 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 font-bold">
                f
              </button>

              <button className="w-11 h-11 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 font-bold">
                Ø
              </button>

              <button className="w-11 h-11 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 font-bold">
                in
              </button>

            </div>

          </div>

          {/* REGISTER */}
          <div className="mt-6 text-center">

            <span className="text-sm text-gray-500">
              Don’t have an account?
            </span>

            <button
              type="button"
              onClick={() => navigate("/Home")}
              className="ml-2 text-orange-500 font-bold hover:underline"
            >
              Register
            </button>

          </div>

        </div>
      </div>
    </div>
  </div>
);

};


export default Login;

