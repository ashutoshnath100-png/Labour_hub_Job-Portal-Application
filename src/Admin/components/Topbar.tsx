import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [openProfile, setOpenProfile] = useState(false);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("admin-search", { detail: search })
    );
  }, [search]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <div className="bg-white border-b px-4 md:px-6 py-3 md:py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">

      <div className="flex items-center gap-3">
        <img
          src="/logo.png"
          alt="Urban Force"
          className="h-16 w-auto object-contain"
        />
        <h1 className="text-base md:text-lg font-semibold">
          Admin Dashboard
        </h1>
      </div>

      <div className="flex items-center justify-between md:justify-end gap-4">

        <div className="hidden md:flex items-center border rounded-lg px-3 py-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && search.trim() !== "") {
                navigate(`/admin/users?search=${search}`);
              }
            }}
            placeholder="Search Users......."
            className="outline-none text-sm w-48"
          />
        </div>

        <span className="text-lg cursor-pointer">🔔</span>

        <div className="relative">
          <div
            onClick={() => setOpenProfile(!openProfile)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center font-semibold">
              A
            </div>
            <span className="hidden md:block text-sm font-medium">
              Admin
            </span>
          </div>

          {openProfile && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md z-50">
              <button
                onClick={() => {
                  setOpenProfile(false);
                  navigate("/admin/profile");
                }}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                Profile
              </button>

              <button
                onClick={() => {
                  setOpenProfile(false);
                  navigate("/admin/change-password");
                }}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                Change Password
              </button>

              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TopBar;