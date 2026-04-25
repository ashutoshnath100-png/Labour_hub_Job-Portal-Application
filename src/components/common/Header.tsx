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
      <header className="sticky top-0 z-50 bg-white shadow">
        <div className="flex justify-between items-center px-4 sm:px-8 h-16">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="LabourHub Logo"
              className="h-11 w-11 object-contain"
            />
            <span className="text-xl font-bold text-orange-500">
              Urban Force
            </span>
          </Link>

          <button className="sm:hidden text-2xl" onClick={() => setOpen(!open)}>
            {open ? "✕" : "☰"}
          </button>

          <nav className="hidden sm:flex gap-6 text-gray-600">
            <Link to="/" className="hover:text-orange-500">
              Home
            </Link>
            <Link to="/how-it-works" className="hover:text-orange-500">
              How It Works
            </Link>
            <Link to="/about-us" className="hover:text-orange-500">
              About
            </Link>

            {token && role !== "labour" && (
              <Link to="/find-labour" className="hover:text-orange-500">
                Find Labour
              </Link>
            )}
          </nav>

          <div className="hidden sm:flex gap-4">
            {!token ? (
              <>
                <Link
                  to="/login"
                  className="border px-4 py-1 rounded bg-slate-200 hover:bg-orange-500 hover:text-white"
                >
                  Sign In
                </Link>

                <Link
                  to="/home"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1 rounded"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={dashboardLink}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1 rounded"
                >
                  Dashboard
                </Link>

                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="border px-4 py-1 rounded bg-slate-200 hover:bg-red-500 hover:text-white"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>

        {open && (
          <div className="sm:hidden flex flex-col gap-4 px-4 pb-4 text-gray-600">
            <Link to="/" onClick={() => setOpen(false)}>
              Home
            </Link>
            <Link to="/how-it-works" onClick={() => setOpen(false)}>
              How It Works
            </Link>
            <Link to="/about-us" onClick={() => setOpen(false)}>
              About
            </Link>

            {token && role !== "labour" && (
              <Link to="/find-labour" onClick={() => setOpen(false)}>
                Find Labour
              </Link>
            )}

            {!token ? (
              <Link to="/login" onClick={() => setOpen(false)}>
                Sign In
              </Link>
            ) : (
              <>
                <Link to={dashboardLink} onClick={() => setOpen(false)}>
                  Dashboard
                </Link>

                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="text-left text-red-600"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        )}
      </header>

      {/* Logout Confirmation Modal */}

      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[320px] text-center">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to logout?
            </h2>

            <div className="flex justify-center gap-4">
              <button
                onClick={confirmLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
              >
                Yes
              </button>

              <button
                onClick={() => setShowLogoutModal(false)}
                className="bg-gray-300 hover:bg-gray-400 px-4 py-1 rounded"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;