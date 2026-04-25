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
  pending: "bg-blue-600",
  approved: "bg-green-600",
  blocked: "bg-red-600",
};

const RecentRegistrations = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchRecentUsers = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:4000/admin/recent-users", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const data = await res.json();
      if (data.success) {
        setUsers(data.data)
      }
    };

    fetchRecentUsers();
  }, []);

  const formatTime = (dateString: string) => {
    const now = new Date();
    const created = new Date(dateString);
    const diff = Math.floor((now.getTime() - created.getTime()) / 1000 / 60 / 60);
    if (diff < 1) {
      return "Just now";
    } else if (diff < 24) {
      return `${diff} hours ago`;
    } else {
      return `${Math.floor(diff / 24)} days ago`;
    }
  }
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      <div className="flex justify-between mb-4">
        <h2 className="font-semibold">Recent Registrations</h2>
        <span
          onClick={() => navigate("/admin/users")}
          className="text-sm text-gray-500 cursor-pointer hover:font-medium"
        >
          View All ›
        </span>
      </div>

      <div className="space-y-3">
        {users.map((item) => (
          <div
            key={item._id}
            onClick={() => navigate(`/admin/users/${item._id}`)}
            className="flex justify-between bg-gray-50 items-center border border-gray-200 rounded-xl p-5 shadow-sm cursor-pointer hover:bg-gray-100 transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center font-bold text-orange-600">
                {item.name.charAt(0).toUpperCase()}
              </div>

              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-xs text-gray-500">
                  {item.role} • {formatTime(item.createdAt)}
                </p>
              </div>
            </div>

            <span
              className={`text-white text-xs px-4 py-1.5 rounded-full ${statusStyle[item.status]
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