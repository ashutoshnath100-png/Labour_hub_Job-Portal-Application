import { Link, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token")
  );
  const [role, setRole] = useState<string | null>(() =>
    localStorage.getItem("role")
  );

  const navigate = useNavigate();

  const syncAuth = useCallback(() => {
    setToken(localStorage.getItem("token"));
    setRole(localStorage.getItem("role"));
  }, []);

  useEffect(() => {
    syncAuth();

    const onAuthChanged = () => {
      syncAuth();
    };
    window.addEventListener("auth-changed", onAuthChanged);

    const onStorage = (e: StorageEvent) => {
      if (e.key === "token" || e.key === "role") syncAuth();
    };
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("auth-changed", onAuthChanged);
      window.removeEventListener("storage", onStorage);
    };
  }, [syncAuth]);

  const confirmLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    window.dispatchEvent(new Event("auth-changed"));

    setToken(null);
    setRole(null);
    setOpen(false);
    setShowLogoutModal(false);

    navigate("/", { replace: true });
  };

  const dashboardLink =
    role === "labour"
      ? "/labour-dashboard"
      : role === "admin"
      ? "/admin/dashboard"
      : "/dashboard";

  return (
  <>
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/80 border-b border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">

      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-8 h-[74px]">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 group"
        >

          {/* Logo Box */}
          <div className="relative">

            <div className="absolute inset-0 bg-orange-400 blur-xl opacity-20 group-hover:opacity-40 transition-all duration-500" />

            <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-400 flex items-center justify-center shadow-[0_10px_25px_rgba(255,122,0,0.35)] group-hover:scale-105 transition-all duration-300">

              <span className="text-white font-black text-xl">
                W
              </span>

            </div>

          </div>

          {/* Brand */}
          <div className="flex flex-col leading-tight">

            <span className="text-2xl font-black tracking-tight text-gray-900">
              Workora
            </span>

            <span className="text-[11px] text-gray-400 font-medium tracking-wide uppercase">
              Smart Job Portal
            </span>

          </div>

        </Link>

        {/* Mobile Toggle */}
        <button
          className="sm:hidden text-2xl w-11 h-11 rounded-xl bg-gray-100 hover:bg-gray-200 transition-all duration-300"
          onClick={() => setOpen(!open)}
        >
          {open ? "✕" : "☰"}
        </button>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex items-center gap-8 text-[15px] font-medium text-gray-600">

          <Link
            to="/"
            className="hover:text-orange-500 transition-colors duration-300"
          >
            Home
          </Link>

          <Link
            to="/how-it-works"
            className="hover:text-orange-500 transition-colors duration-300"
          >
            How It Works
          </Link>

          <Link
            to="/about-us"
            className="hover:text-orange-500 transition-colors duration-300"
          >
            About
          </Link>

          {token && role !== "labour" && (
            <Link
              to="/find-labour"
              className="hover:text-orange-500 transition-colors duration-300"
            >
              Find Workers
            </Link>
          )}

        </nav>

        {/* Actions */}
        <div className="hidden sm:flex items-center gap-4">

          {!token ? (
            <>
              {/* Login */}
              <Link
                to="/login"
                className="px-5 py-2 rounded-2xl border border-gray-200 bg-white hover:bg-gray-100 text-gray-700 font-medium transition-all duration-300"
              >
                Sign In
              </Link>

              {/* CTA */}
              <Link
                to="/home"
                className="bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-500 hover:to-orange-600 text-white px-6 py-2 rounded-2xl font-semibold shadow-[0_10px_30px_rgba(255,122,0,0.30)] hover:scale-[1.02] transition-all duration-300"
              >
                Get Started
              </Link>
            </>
          ) : (
            <>
              {/* Dashboard */}
              <Link
                to={dashboardLink}
                className="bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-500 hover:to-orange-600 text-white px-6 py-2 rounded-2xl font-semibold shadow-[0_10px_30px_rgba(255,122,0,0.30)] hover:scale-[1.02] transition-all duration-300"
              >
                Dashboard
              </Link>

              {/* Logout */}
              <button
                onClick={() => setShowLogoutModal(true)}
                className="px-5 py-2 rounded-2xl border border-gray-200 bg-white hover:bg-red-500 hover:text-white text-gray-700 font-medium transition-all duration-300"
              >
                Logout
              </button>
            </>
          )}

        </div>

      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="sm:hidden border-t border-gray-100 bg-white/95 backdrop-blur-xl px-5 py-5 flex flex-col gap-5 text-gray-700 shadow-xl">

          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="hover:text-orange-500 transition-colors"
          >
            Home
          </Link>

          <Link
            to="/how-it-works"
            onClick={() => setOpen(false)}
            className="hover:text-orange-500 transition-colors"
          >
            How It Works
          </Link>

          <Link
            to="/about-us"
            onClick={() => setOpen(false)}
            className="hover:text-orange-500 transition-colors"
          >
            About
          </Link>

          {token && role !== "labour" && (
            <Link
              to="/find-labour"
              onClick={() => setOpen(false)}
              className="hover:text-orange-500 transition-colors"
            >
              Find Workers
            </Link>
          )}

          {!token ? (
            <>
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="text-gray-700"
              >
                Sign In
              </Link>

              <Link
                to="/home"
                onClick={() => setOpen(false)}
                className="bg-gradient-to-r from-orange-500 to-orange-400 text-white px-5 py-3 rounded-2xl font-semibold text-center"
              >
                Get Started
              </Link>
            </>
          ) : (
            <>
              <Link
                to={dashboardLink}
                onClick={() => setOpen(false)}
                className="bg-gradient-to-r from-orange-500 to-orange-400 text-white px-5 py-3 rounded-2xl font-semibold text-center"
              >
                Dashboard
              </Link>

              <button
                onClick={() => setShowLogoutModal(true)}
                className="text-left text-red-500 font-medium"
              >
                Logout
              </button>
            </>
          )}

        </div>
      )}
    </header>

    {/* Logout Modal */}
    {showLogoutModal && (
      <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">

        <div className="bg-white rounded-3xl shadow-2xl p-8 w-[340px] text-center border border-gray-100">

          <div className="w-16 h-16 mx-auto rounded-2xl bg-red-100 text-red-500 flex items-center justify-center text-2xl mb-5">
            ⎋
          </div>

          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Logout?
          </h2>

          <p className="text-sm text-gray-500 mb-6">
            Are you sure you want to logout from your account?
          </p>

          <div className="flex justify-center gap-4">

            <button
              onClick={confirmLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-2xl font-medium transition-all duration-300"
            >
              Yes, Logout
            </button>

            <button
              onClick={() => setShowLogoutModal(false)}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2 rounded-2xl font-medium transition-all duration-300"
            >
              Cancel
            </button>

          </div>

        </div>

      </div>
    )}
  </>
);
};

export default Header;