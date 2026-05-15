import {
  AreaChart,
  Area,
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
    {
      name: "Approved",
      value: active,
      color: "#22c55e",
    },
    {
      name: "Pending",
      value: pending,
      color: "#f59e0b",
    },
    {
      name: "Rejected",
      value: rejected < 0 ? 0 : rejected,
      color: "#ef4444",
    },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm h-full flex flex-col">
      {/* Header */}
      <div className="mb-3">
        <h2 className="text-lg font-bold text-gray-800">
          Status Overview
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Application performance summary
        </p>
      </div>

      {/* Bigger Chart */}
      <div className="h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            {/* Grid */}
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e5e7eb"
            />

            {/* X Axis */}
            <XAxis
              dataKey="name"
              tick={{ fill: "#6b7280", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            {/* Y Axis */}
            <YAxis
              tick={{ fill: "#6b7280", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            {/* Tooltip */}
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            />

            {/* Legend */}
            <Legend />

            {/* Area */}
            <Area
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              fill="url(#colorValue)"
              strokeWidth={3}
              dot={{
                r: 5,
                strokeWidth: 2,
                fill: "#ffffff",
              }}
              activeDot={{
                r: 8,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Small Metrics */}
      <div className="grid grid-cols-3 gap-3 mt-2">
        {data.map((item) => (
          <div
            key={item.name}
            className="bg-gray-50 border border-gray-100 rounded-lg px-3 py-2"
          >
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />

              <p className="text-xs text-gray-500">{item.name}</p>
            </div>

            <h3 className="text-lg font-bold text-gray-800 mt-1">
              {item.value}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatusBarChart;