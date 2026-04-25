import { useNavigate } from "react-router-dom";

interface Props {
  pending: number;
}

const SideCards = ({ pending }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-4">
        <h2 className="font-semibold">Quick Access</h2>

        <div
          onClick={() => navigate("/admin/users")}
          className="bg-[#FFEFD8] p-4 rounded-xl flex items-center justify-between cursor-pointer hover:shadow-md transition"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-200 rounded-lg flex items-center justify-center">
              👤
            </div>
            <div>
              <p className="text-sm font-medium">User Management</p>
              <p className="text-xs text-gray-500">Manage platform users</p>
            </div>
          </div>
          <span className="bg-indigo-600 text-white text-xs px-3 py-1 rounded-full">
            {pending} pending
          </span>
        </div>

        <div
          onClick={() => navigate("/admin/reports")}
          className="bg-[#FFEFD8] p-4 rounded-xl flex items-center justify-between cursor-pointer hover:shadow-md transition"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-200 rounded-lg flex items-center justify-center">
              📊
            </div>
            <div>
              <p className="text-sm font-medium">Reports</p>
              <p className="text-xs text-gray-500">System reports & analytics</p>
            </div>
          </div>
          <span className="bg-indigo-600 text-white text-sm px-4 py-1 rounded-full">
            View
          </span>
        </div>

        <div
          onClick={() => navigate("/admin/labours")}
          className="bg-[#FFEFD8] p-4 rounded-xl flex items-center justify-between cursor-pointer hover:shadow-md transition"
        >
          <div className="flex items-center gap-3">
            <div className="bg-[#F3D6B7] p-2 rounded-lg">
              🛂
            </div>

            <div>
              <p className="font-medium text-gray-800">
                Labour Verification
              </p>

              <p className="text-sm text-gray-500">
                Verify labour documents
              </p>
            </div>
          </div>

          <button className="bg-indigo-600 text-white text-sm px-4 py-1 rounded-full">
            View
          </button>
        </div>
      </div>

      <div className="bg-[#E6FBEA] rounded-2xl p-6">
        <h2 className="font-semibold mb-2">✅ Platform Status</h2>
        <ul className="text-sm space-y-1">
          <li>All systems operational</li>
          <li>Database: Healthy</li>
          <li>API: 99.9% uptime</li>
        </ul>
      </div>
    </div>
  );
};

export default SideCards;