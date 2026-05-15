interface Props {
  labour: number;
  employers: number;
}

const UserTypePieChart = ({ labour, employers }: Props) => {
  const total = labour + employers;

  const employerPercent =
    total === 0 ? 0 : (employers / total) * 100;

  const employerDeg = (employerPercent / 100) * 360;

  return (
    <div className="relative overflow-hidden bg-white border border-gray-100 rounded-3xl p-7 h-full shadow-sm hover:shadow-xl transition-all duration-500 group">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-all duration-500" />

      <div className="absolute bottom-0 left-0 w-40 h-40 bg-emerald-100 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-all duration-500" />

      {/* Header */}
      <div className="relative z-10 mb-8">
        <h2 className="text-lg font-bold text-gray-800">
          User Distribution
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Employers vs Labour ratio
        </p>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-between gap-6 h-[220px]">
        {/* Chart */}
        <div className="relative flex items-center justify-center">
          {/* Outer Glow */}
          <div className="absolute w-56 h-56 rounded-full bg-gradient-to-br from-blue-200 to-emerald-200 blur-2xl opacity-30 animate-pulse" />

          {/* Pie Chart */}
          <div
            className="relative w-52 h-52 rounded-full transition-all duration-700 group-hover:scale-105 group-hover:rotate-3 shadow-2xl border-[10px] border-white"
            style={{
              background: `conic-gradient(
                #3b82f6 0deg,
                #60a5fa ${employerDeg}deg,
                #10b981 ${employerDeg}deg,
                #34d399 360deg
              )`,
            }}
          >
            {/* Inner Circle */}
            <div className="absolute inset-0 m-auto w-[68%] h-[68%] rounded-full bg-white shadow-inner flex flex-col items-center justify-center">
              <span className="text-[11px] uppercase tracking-widest text-gray-400 font-semibold">
                Total Users
              </span>

              <span className="text-4xl font-black text-gray-800 leading-none mt-1">
                {total}
              </span>

              <span className="text-xs text-gray-400 mt-1">
                Registered
              </span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-col gap-5 min-w-[160px]">
          {/* Employers */}
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 hover:bg-white hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 shadow-md shadow-blue-200" />

                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Employers
                </p>
              </div>

              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                {employerPercent.toFixed(0)}%
              </span>
            </div>

            <h3 className="text-3xl font-black text-gray-800">
              {employers}
            </h3>
          </div>

          {/* Labour */}
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 hover:bg-white hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-400 shadow-md shadow-emerald-200" />

                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Labour
                </p>
              </div>

              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                {(100 - employerPercent).toFixed(0)}%
              </span>
            </div>

            <h3 className="text-3xl font-black text-gray-800">
              {labour}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTypePieChart;