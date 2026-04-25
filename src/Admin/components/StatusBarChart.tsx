import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

interface Props {
  active: number;
  pending: number;
  rejected: number;
}

const StatusBarChart = ({ active, pending, rejected }: Props) => {
  const data = [
    { name: "Approved", value: active },
    { name: "Pending", value: pending },
    { name: "Rejected", value: rejected < 0 ? 0 : rejected },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm h-full flex flex-col">
      <h2 className="text-sm font-semibold text-gray-700 mb-4">
        Status Overview
      </h2>

      <div className="flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />

            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />

            <Tooltip />
            <Legend />

            <Line
              type="linear"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StatusBarChart;