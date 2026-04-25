interface Props {
  labour: number;
  employers: number;
}

const UserTypePieChart = ({ labour, employers }: Props) => {
  const total = labour + employers;
  const employerPercent = total === 0 ? 0 : (employers / total) * 100;
  const employerDeg = (employerPercent / 100) * 360;

  return (
    <div className="group bg-white border border-gray-100 rounded-3xl p-8 shadow-xl shadow-gray-100/50 h-full flex flex-col transition-all duration-500 hover:shadow-2xl hover:shadow-gray-200/60">
      <h2 className="text-xs uppercase tracking-widest font-bold text-center mb-10 text-gray-500 group-hover:text-gray-800 transition-colors">
        User Distribution
      </h2>

      <div className="flex-1 flex items-center justify-around px-2">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-400 to-emerald-400 blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-700" />
          
          <div
            className="w-48 h-48 rounded-full shadow-[inset_0_2px_10px_rgba(0,0,0,0.1)] transition-all duration-700 ease-out group-hover:scale-105 group-hover:rotate-6 relative z-10 border-8 border-white"
            style={{
              background: `conic-gradient(
                #2563eb 0deg, 
                #60a5fa ${employerDeg}deg, 
                #059669 ${employerDeg}deg, 
                #34d399 360deg
              )`,
            }}
          >
            <div className="absolute inset-0 m-auto w-[65%] h-[65%] bg-white rounded-full shadow-inner flex flex-col items-center justify-center">
               <span className="text-[10px] font-bold text-gray-400 uppercase">Total</span>
               <span className="text-2xl font-black text-gray-800">{total}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="group/item cursor-pointer">
            <div className="flex items-center gap-4 mb-1">
              <div className="w-4 h-4 rounded-md bg-gradient-to-br from-blue-600 to-blue-400 shadow-lg shadow-blue-200 group-hover/item:scale-110 transition-transform" />
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Employers</p>
            </div>
            <div className="flex items-baseline gap-2 ml-8">
              <span className="text-2xl font-black text-gray-800">{employers}</span>
              <span className="text-xs font-bold text-blue-500">{employerPercent.toFixed(0)}%</span>
            </div>
          </div>

          <div className="group/item cursor-pointer">
            <div className="flex items-center gap-4 mb-1">
              <div className="w-4 h-4 rounded-md bg-gradient-to-br from-emerald-600 to-emerald-400 shadow-lg shadow-emerald-200 group-hover/item:scale-110 transition-transform" />
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Labour</p>
            </div>
            <div className="flex items-baseline gap-2 ml-8">
              <span className="text-2xl font-black text-gray-800">{labour}</span>
              <span className="text-xs font-bold text-emerald-500">{(100 - employerPercent).toFixed(0)}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTypePieChart;