import { ReactNode } from "react";

type Props = {
    title: string;
    value: string | number;
    icon: ReactNode;
    onClick?: () => void;
};

const StatCard = ({ title, value, icon, onClick }: Props) => {
    return (
        <div
            onClick={onClick}
            className={`flex items-center gap-4 bg-white p-6 rounded-xl border hover:shadow-md transition ${onClick ? "cursor-pointer hover:scale-105" : ""
                }`}
        >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                {icon}
            </div>

            <div>
                <p className="text-sm text-gray-500">{title}</p>
                <h2 className="text-2xl font-semibold">{value}</h2>
            </div>
        </div>
    );
};

export default StatCard;