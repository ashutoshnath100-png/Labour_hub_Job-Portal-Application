interface Props {
  title: string;
  value: number | string;
  badge?: string;
  icon: string;
}

const StatCard = ({ title, value, badge, icon }: Props) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 flex justify-between items-center shadow-sm">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-medium text-gray-600">{title}</span>
          {badge && (
            <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">
              {badge}
            </span>
          )}
        </div>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
      <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-xl">
        {icon}
      </div>
    </div>
  );
};

export default StatCard;