import { useEffect, useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import TopBar from "../components/Topbar";
import { ChevronDown } from "lucide-react";

type Status = "pending" | "accepted" | "rejected";

const UserManagement = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchFromUrl = searchParams.get("search") || "";
  const statusFromUrl = searchParams.get("status") || "all";
  const roleFromUrl = searchParams.get("role") || "all";

  const [users, setUsers] = useState<any[]>([]);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const token = localStorage.getItem("token");

  const fetchUsers = useCallback(async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/admin/all-users`, {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          status: statusFromUrl !== "all" ? statusFromUrl : undefined,
          role: roleFromUrl !== "all" ? roleFromUrl : undefined,
          search: searchFromUrl || undefined,
        },
      });
      if (res.data.success) setUsers(res.data.users);
    } catch (error) {
      console.log("Fetch error", error);
    }
  }, [token, statusFromUrl, roleFromUrl, searchFromUrl]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const updateStatus = async (id: string, status: Status) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/admin/all-users/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers();
    } catch (error) {
      console.log("Update error", error);
    }
  };

  const handleStatusChange = (value: string) => {
    navigate(`/admin/users?status=${value}&role=${roleFromUrl}`);
    setOpenDropdown(null);
  };

  const handleRoleChange = (value: string) => {
    navigate(`/admin/users?status=${statusFromUrl}&role=${value}`);
    setOpenDropdown(null);
  };

  useEffect(() => {
    const close = () => setOpenDropdown(null);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, []);

  const CustomSelect = ({ label, value, options, onChange, id }: any) => {
    const isOpen = openDropdown === id;
    const selectedLabel = options.find((o: any) => o.val === value)?.label;

    return (
      <div className="relative w-full md:w-48" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={() => setOpenDropdown(isOpen ? null : id)}
          className="w-full bg-[#F3F0F2] border-b-2 border-blue-800 rounded-t-lg px-4 py-1 text-left flex flex-col transition-all hover:bg-gray-100"
        >
          <span className="text-[10px] uppercase font-bold text-blue-700 tracking-wider">
            {label}
          </span>
          <div className="flex justify-between items-center mt-0.5">
            <span className="text-gray-900 font-medium">{selectedLabel}</span>
            <ChevronDown size={18} className={`text-gray-800 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </div>
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-100 shadow-xl rounded-lg overflow-hidden py-1">
            {options.map((opt: any) => (
              <button
                key={opt.val}
                onClick={() => onChange(opt.val)}
                className={`w-full text-left px-4 py-3 text-sm transition-colors ${value === opt.val ? "text-blue-700 bg-blue-50 font-semibold" : "text-gray-700 hover:bg-gray-50"
                  }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
  <div className="min-h-screen bg-[#f5f7fb]">
    <TopBar />

    <div className="max-w-[1500px] mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            User Management
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            View, approve, block and manage all labour and employer accounts
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/labours")}
          className="group bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-6 py-3 rounded-2xl text-sm font-semibold shadow-lg shadow-indigo-200 transition-all duration-300"
        >
          <span className="flex items-center gap-2">
            Labour Verification
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white/90 backdrop-blur-xl border border-gray-100 rounded-3xl p-5 shadow-sm">
        <div className="flex flex-col md:flex-row items-center gap-5">
          {/* Search */}
          <div className="relative w-full md:w-[35%]">
            <input
              defaultValue={searchFromUrl}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  navigate(
                    `/admin/users?search=${
                      (e.target as HTMLInputElement).value
                    }&status=${statusFromUrl}&role=${roleFromUrl}`
                  );
                }
              }}
              placeholder="Search by name or email..."
              className="border border-gray-200 bg-gray-50 rounded-2xl px-5 py-3.5 w-full outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-300 transition-all text-sm"
            />

            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </div>
          </div>

          <CustomSelect
            id="status"
            label="Status"
            value={statusFromUrl}
            onChange={handleStatusChange}
            options={[
              { val: "all", label: "All Status" },
              { val: "pending", label: "Pending" },
              { val: "accepted", label: "Approved" },
              { val: "rejected", label: "Rejected" },
            ]}
          />

          <CustomSelect
            id="role"
            label="User type"
            value={roleFromUrl}
            onChange={handleRoleChange}
            options={[
              { val: "all", label: "All Types" },
              { val: "labour", label: "Labour" },
              { val: "employee", label: "Employer" },
            ]}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-[1100px] w-full text-sm border-collapse">
            {/* Table Head */}
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100/70 text-gray-600 border-b border-gray-200">
              <tr className="h-[60px]">
                <th className="px-6 text-left w-[20%] font-semibold tracking-wide">
                  User
                </th>

                <th className="px-6 text-center w-[20%] font-semibold tracking-wide">
                  Type
                </th>

                <th className="px-6 text-left w-[20%] font-semibold tracking-wide">
                  Contact
                </th>

                <th className="px-6 text-center w-[20%] font-semibold tracking-wide">
                  Status
                </th>

                <th className="px-6 text-center w-[20%] font-semibold tracking-wide">
                  Next Actions
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {users.map((u) => (
                <tr
                  key={u._id}
                  className="border-t border-gray-100 h-[78px] hover:bg-indigo-50/40 transition-all duration-200 cursor-pointer group"
                  onClick={() => navigate(`/admin/users/${u._id}`)}
                >
                  {/* User */}
                  <td className="px-6">
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 text-white flex items-center justify-center font-bold shadow-md shadow-indigo-100">
                        {u.name.charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <span className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                          {u.name}
                        </span>

                        <div className="text-[11px] text-gray-400 mt-1">
                          Registered{" "}
                          {new Date(u.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="px-6 text-center">
                    <span className="px-4 py-1.5 rounded-full text-[11px] uppercase font-bold tracking-wide bg-gray-100 text-gray-700 border border-gray-200">
                      {u.role}
                    </span>
                  </td>

                  {/* Contact */}
                  <td className="px-6 text-xs">
                    <div className="space-y-1">
                      <div className="font-medium text-gray-800">
                        {u.email}
                      </div>

                      <div className="text-gray-400">
                        {u.phone}
                      </div>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-3 text-center">
                    <span
                      className={`inline-flex items-center justify-center px-4 py-2 text-[11px] font-bold uppercase rounded-full shadow-sm transition-all duration-300
                        ${
                          u.status === "pending"
                            ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white"
                            : u.status === "accepted"
                            ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white"
                            : u.status === "rejected"
                            ? "bg-gradient-to-r from-red-500 to-rose-600 text-white"
                            : u.status === "timed_out"
                            ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white"
                            : "bg-gradient-to-r from-gray-400 to-gray-600 text-white"
                        }`}
                    >
                      {u.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td
                    className="px-6 py-3 text-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex justify-center">
                      {u.role === "employee" && (
                        <span className="inline-flex items-center px-4 py-2 text-xs font-semibold rounded-full text-emerald-700 bg-emerald-100 border border-emerald-200">
                          Active User
                        </span>
                      )}

                      {u.role === "labour" &&
                        u.status === "accepted" && (
                          <span className="inline-flex items-center px-4 py-2 text-xs font-semibold rounded-full text-emerald-700 bg-emerald-100 border border-emerald-200">
                            Active User
                          </span>
                        )}

                      {u.role === "labour" &&
                        u.status === "rejected" && (
                          <span className="inline-flex items-center px-4 py-2 text-xs font-semibold rounded-full text-emerald-700 bg-emerald-100 border border-emerald-200">
                            Active User
                          </span>
                        )}

                      {u.role === "labour" &&
                        u.status === "pending" && (
                          <span className="inline-flex items-center px-4 py-2 text-xs font-semibold rounded-full text-blue-700 bg-blue-100 border border-blue-200">
                            Awaiting
                          </span>
                        )}

                      {u.role === "labour" &&
                        u.status === "Unassigned" && (
                          <span className="inline-flex items-center px-4 py-2 text-xs font-semibold rounded-full text-gray-700 bg-gray-100 border border-gray-200">
                            Available
                          </span>
                        )}

                      {u.role === "labour" &&
                        u.status === "timed_out" &&
                        u.ignoredJobs === 1 && (
                          <span className="inline-flex items-center px-4 py-2 text-xs font-semibold rounded-full text-sky-700 bg-sky-100 border border-sky-200">
                            1 Missed Job
                          </span>
                        )}

                      {u.role === "labour" &&
                        u.status === "timed_out" &&
                        u.ignoredJobs === 2 && (
                          <span className="inline-flex items-center px-4 py-2 text-xs font-semibold rounded-full text-amber-700 bg-amber-100 border border-amber-200">
                            Reminder
                          </span>
                        )}

                      {u.role === "labour" &&
                        u.status === "timed_out" &&
                        u.ignoredJobs === 3 && (
                          <span className="inline-flex items-center px-4 py-2 text-xs font-semibold rounded-full text-orange-700 bg-orange-100 border border-orange-200">
                            Warning
                          </span>
                        )}

                      {u.role === "labour" &&
                        u.ignoredJobs >= 5 && (
                          <span className="inline-flex items-center px-4 py-2 text-xs font-semibold rounded-full text-red-700 bg-red-100 border border-red-200">
                            Block User
                          </span>
                        )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {users.length === 0 && (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">📭</div>

            <h3 className="text-lg font-semibold text-gray-700">
              No users found
            </h3>

            <p className="text-sm text-gray-400 mt-2">
              Try changing filters or search
            </p>
          </div>
        )}
      </div>
    </div>
  </div>
);
};

export default UserManagement;