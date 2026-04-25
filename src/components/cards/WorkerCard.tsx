import { useNavigate } from "react-router-dom";
type Props = {
    _id?: string;
    name: string;
    skills: string[];
    location: string;
    rating: number;
    available: boolean;
    price: number;
    rate_type: string;
};

const WorkerCard = ({ _id, name, price, rating, available, location, skills, rate_type }: Props) => {
    const navigate = useNavigate();
    return (
        <div
            onClick={() => navigate(`/worker/${_id}`)}
            className="bg-white p-5 rounded-xl border cursor-pointer
    hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
        >
            <div className="flex items-center justify-between">
                <h3 className="font-semibold">{name}</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                    {available ? "Available" : "Busy"}
                </span>
            </div>
            <p className="text-sm text-gray-500">⭐ {rating.toFixed(1)}</p>
            <p className="mt-2 text-lg font-normal  text-gray-800">₹{price} / {rate_type}</p>
            <p className="text-sm text-gray-500">{location}</p>
            <div className="flex items-center gap-2 mt-2">
                <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">{skills}</span>


            </div>
            <div className="flex gap-2 mt-4">
                <button 
                onClick={(e) =>{e.stopPropagation();}}
                className="bg-orange-500 hover:bg-orange-600 text-white px-3 py-1 rounded">
                    <a href="">Call Now</a>
                </button>
                <button className="border px-3 py-1 rounded hover:bg-orange-500 hover:text-white"><a href=""></a> WhatsApp</button>
            </div>

        </div>
    );
};

export default WorkerCard;