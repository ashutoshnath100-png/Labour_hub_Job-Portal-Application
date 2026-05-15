import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  _id: string;
  name: string;
  role: string;
  status: string;
  createdAt: string;
}

const statusStyle: Record<string, string> = {
  pending:
    "bg-gradient-to-r from-amber-500 to-yellow-400 text-white shadow-amber-200",
  approved:
    "bg-gradient-to-r from-emerald-600 to-green-400 text-white shadow-emerald-200",
  blocked:
    "bg-gradient-to-r from-red-600 to-rose-400 text-white shadow-red-200",
};

const RecentRegistrations = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchRecentUsers = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/admin/recent-users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (data.success) {
        setUsers(data.data);
      }
    };

    fetchRecentUsers();
  }, []);

  const formatTime = (dateString: string) => {
    const now = new Date();
    const created = new Date(dateString);

    const diff = Math.floor(
      (now.getTime() - created.getTime()) / 1000 / 60 / 60
    );

    if (diff < 1) {
      return "Just now";
    } else if (diff < 24) {
      return `${diff} hours ago`;
    } else {
      return `${Math.floor(diff / 24)} days ago`;
    }
  };

  return (
    <div className="relative overflow-hidden bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-500">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-52 h-52 bg-orange-100 rounded-full blur-3xl opacity-20" />

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Recent Registrations
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Latest users joined platform
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/users")}
          className="text-sm font-medium text-orange-500 hover:text-orange-600 transition-all"
        >
          View All →
        </button>
      </div>

      {/* Users */}
      <div className="relative z-10 space-y-4">
        {users.map((item, index) => (
          <div
            key={item._id}
            onClick={() => navigate(`/admin/users/${item._id}`)}
            className="group flex items-center justify-between bg-gradient-to-r from-gray-50 to-white border border-gray-100 rounded-2xl p-4 cursor-pointer hover:shadow-lg hover:border-orange-100 transition-all duration-300"
          >
            {/* Left */}
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="relative">
                <div className="absolute inset-0 bg-orange-200 rounded-2xl blur-md opacity-0 group-hover:opacity-40 transition-all duration-300" />

                <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-400 flex items-center justify-center text-white font-bold text-lg shadow-md">
                  {item.name.charAt(0).toUpperCase()}
                </div>
              </div>

              {/* User Info */}
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">
                    {item.name}
                  </p>

                  <span className="text-[10px] font-bold text-gray-400">
                    #{index + 1}
                  </span>
                </div>

                <p className="text-sm text-gray-500 mt-1">
                  {item.role} • {formatTime(item.createdAt)}
                </p>
              </div>
            </div>

            {/* Status */}
            <span
              className={`text-xs font-semibold px-4 py-2 rounded-full shadow-md capitalize transition-all duration-300 ${statusStyle[item.status]
                }`}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentRegistrations;