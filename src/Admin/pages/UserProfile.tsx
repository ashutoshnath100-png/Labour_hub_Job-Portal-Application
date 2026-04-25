import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import TopBar from "../components/Topbar";

const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `http://localhost:4000/admin/user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        setUser(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  const updateStatus = async (status: string) => {
    await axios.put(
      `http://localhost:4000/admin/all-users/${id}/status`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    fetchUser();
  };


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f9fafb] to-[#eef2ff] transition-all duration-500">
      <TopBar />

      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">

        <button
          onClick={() => navigate(-1)}
          className="text-indigo-600 hover:underline"
        >
          ← Back
        </button>

        <div className="bg-white rounded-3xl shadow-lg p-8 flex flex-col md:flex-row items-center gap-8 transition-all duration-500">

          <div className="relative">
            <div className="w-28 h-28 rounded-full  bg-orange-400 text-white flex items-center justify-center text-4xl font-bold shadow-xl overflow-hidden">
              {user.photo ? (
                <img
                  src={user.photo}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                user.name?.charAt(0)
              )}
            </div>

          </div>

          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-800">
              {user.name}
            </h1>
            <p className="text-gray-500 mt-1">{user.email}</p>

            <span
              className={`inline-block mt-3 px-4 py-1 text-xs font-semibold rounded-full text-white ${user.status === "pending"
                ? "bg-gradient-to-r from-indigo-500 to-blue-500"
                : user.status === "accepted"
                  ? "bg-gradient-to-r from-emerald-500 to-green-600"
                  : user.status === "rejected"
                    ? "bg-gradient-to-r from-red-500 to-rose-600"
                    : user.status === "timed_out"
                      ? "bg-gradient-to-r from-orange-500 to-amber-500"
                      : user.status === "blocked"
                        ? "bg-gradient-to-r from-gray-700 to-gray-900"
                        : "bg-gray-400"
                }`}
            >
              {user.status === "timed_out"
                ? "Auto Reject (No Action)"
                : user.status}
            </span>
          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-white rounded-2xl shadow p-6 transition-all duration-300 hover:shadow-md">
            <h2 className="font-semibold text-gray-700 mb-4">
              Personal Information
            </h2>
            <div className="space-y-2 text-sm">
              <p><strong>Role:</strong> {user.role}</p>
              <p>
                <strong>Phone:</strong>{" "}
                {user.phone || user.mobile || user.phoneNumber || "N/A"}
              </p>
              <p><strong>Registered:</strong> {new Date(user.createdAt).toLocaleString()}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 transition-all duration-300 hover:shadow-sm">
            <h2 className="text-sm font-semibold text-gray-700 mb-5">
              Document Preview
            </h2>

            {user.document ? (
              <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between bg-gray-50">

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-md bg-blue-100 text-blue-600 text-sm font-semibold">
                    PDF
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      Uploaded Document
                    </p>
                    <p className="text-xs text-gray-500">
                      Click to preview or download
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <a
                    href={user.document}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    View
                  </a>

                  <a
                    href={user.document}
                    download
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    Download
                  </a>
                </div>

              </div>
            ) : (
              <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center">
                <p className="text-sm text-gray-400">
                  No document uploaded
                </p>
              </div>
            )}
          </div>

        </div>

        <div className="bg-white rounded-2xl shadow p-6 transition-all duration-300 hover:shadow-md">
          <h2 className="font-semibold text-gray-700 mb-6">
            Activity Timeline
          </h2>

          <div className="space-y-4 text-sm">
            <div className="flex gap-3">
              <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></div>
              <p>User registered on {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>

            <div className="flex gap-3">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
              <p>
                Status: {user.status === "timed_out"
                  ? "Auto Reject (No Action)"
                  : user.status}
              </p>
            </div>
          </div>
        </div>



      </div>
    </div>
  );
};

export default UserProfile;