import { Worker } from "../../data/worker";


type Props = {
    worker: Worker;
};


const WorkerHeader = ({ worker }: Props) => {
    const isAvailable = worker.available;


    return (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">{worker.name}</h2>


                <span
                    className={`px-3 py-1 text-sm rounded-full font-medium ${isAvailable
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                        }`}
                >
                    {isAvailable ? "Available" : "Busy"}
                </span>
            </div>
            <p className="text-gray-500">{worker.location}</p>
            <p className="mt-1">⭐ {worker.rating}</p>
            <p className="mt-1 font-semibold">₹{worker.price} / day</p>

            <div className="flex gap-2 mt-3 flex-wrap">
                {Array.isArray(worker.skills) && worker.skills.map((skill, index) => (
                    <span
                        key={index}
                        className="bg-gray-100 px-3 py-1 rounded text-sm"
                    >
                        {skill}
                    </span>
                ))}
            </div>
            <div className="flex gap-4 mt-6">
                <a href={`tel:${worker.phone}`}><button
                    disabled={!isAvailable}
                    className={`px-5 py-2 rounded text-white ${isAvailable
                        ? "bg-orange-500 hover:bg-orange-600"
                        : "bg-gray-400 cursor-not-allowed"
                        }`}
                >
                    📞 Call Now
                </button>
                </a>
                <a href={`https://wa.me/${worker.phone}`}> <button
                    disabled={!isAvailable}
                    className={`border px-5 py-2 rounded ${isAvailable
                        ? "hover:bg-orange-500 hover:text-white"
                        : "text-gray-400 cursor-not-allowed"
                        }`}
                >
                    💬 WhatsApp
                </button>
                </a>

            </div>
        </div>
    );
};


export default WorkerHeader;

