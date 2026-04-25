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


      const res = await fetch("http://localhost:4000/admin/google-login", {
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
      let res = await fetch("http://localhost:4000/admin/login", {
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


      res = await fetch("http://localhost:4000/api/labour/login", {
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


      res = await fetch("http://localhost:4000/api/employees/login", {
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
      <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-[900px] h-auto md:h-[480px]">
        <div className="hidden md:block absolute left-0 top-0 h-full w-[55%] bg-[#fb923c] rounded-r-[180px]" />


        <div className="hidden md:flex absolute left-0 top-0 h-full w-[55%] items-center justify-center">
          <div className="text-center text-white px-12">
            <h2 className="text-3xl font-bold mb-4 mt-15">Hello, Welcome!</h2>
            <img
              src="/logo.png"
              alt="Urban Force"
              className="w-40 object-contain mx-auto -mt-5"
            />
            <h3 className="text-3xl font-semibold -mt-9">Urban Force</h3>
            <div className="mt-6 hidden lg:flex justify-center">
              <button
                type="button"
                onClick={() => navigate("/Home")}
                className="bg-orange-700 hover:bg-orange-600 text-white px-6 py-2 rounded-lg font-semibold">
                Register
              </button>
            </div>
          </div>
        </div>


        <div className="relative md:absolute right-0 top-0 w-full md:w-[45%] h-full flex flex-col justify-center px-6 md:px-14 py-10 md:py-0">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
            Login
          </h2>


          <form onSubmit={handleLogin}>
            <div className="mb-4 relative">
              <input
                type="text"
                placeholder="Email or Phone"
                value={form.email}
                onChange={(e) => {
                  setForm({ ...form, email: e.target.value });
                  setEmailError("");
                  setCommonError("");
                }}
                className={`w-full bg-gray-100 px-4 py-3 rounded-lg outline-none focus:ring-2 ${emailError ? "border border-red-500 focus:ring-red-200" : "focus:ring-gray-200"
                  }`}
              />
              {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
              <span className="absolute right-4 top-1/3 -translate-y-1/2 text-gray-500">
                👤
              </span>
            </div>


            <div className="mb-2 relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                data-lpignore="true"
                autoComplete="new-password"
                value={form.password}
                onChange={(e) => {
                  setForm({ ...form, password: e.target.value });
                  setPasswordError("");
                  setCommonError("");
                }}
                className={`w-full bg-gray-100 px-4 py-3 rounded-lg outline-none focus:ring-2 ${passwordError
                    ? "border border-red-500 focus:ring-red-200"
                    : "focus:ring-gray-200"
                  }`}
              />

              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 cursor-pointer text-sm text-gray-600"
              >
                {showPassword ? "Hide" : "Show"}
              </span>

              {passwordError && (
                <p className="text-red-500 text-sm mt-1">{passwordError}</p>
              )}
            </div>


            {commonError && <p className="text-red-500 text-sm mt-2">{commonError}</p>}


            <div
              className="text-center mt-2 text-sm text-gray-900 mb-6 cursor-pointer hover:font-bold"
              onClick={() => navigate("/admin/forget-password")}
            >
              Forgot Password?
            </div>


            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#fb923c] text-white py-3 rounded-lg font-semibold hover:font-bold transition disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>


          <div className="flex justify-center gap-4 mt-4">
            <div
              onClick={handleGoogleLogin}
              className="w-10 h-10 text-black font-bold flex items-center justify-center border rounded-lg cursor-pointer hover:bg-gray-100"
            >
              G
            </div>


            <div className="w-10 h-10 text-black font-bold flex items-center justify-center border rounded-lg cursor-pointer hover:bg-gray-100">
              f
            </div>


            <div className="w-10 h-10 text-black font-bold flex items-center justify-center border rounded-lg cursor-pointer hover:bg-gray-100">
              Ø
            </div>


            <div className="w-10 h-10 text-black font-bold flex items-center justify-center border rounded-lg cursor-pointer hover:bg-gray-100">
              in
            </div>
          </div>
          <div className="mt-4 flex lg:hidden justify-center">
            <button type="button"
              onClick={() => navigate("/Home")}
              className="text-orange-500 font-semibold hover:underline"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Login;

