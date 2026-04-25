import { Worker } from "../../data/worker";


type Props = {
    worker: Worker;
    onMarkBusy?: () => void;
    onHire?: () => void;
    hireLoading?: boolean;
};


const WorkerContactCard = ({ worker, onHire, hireLoading }: Props) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow sticky top-24">
            <p className="text-2xl font-semibold mb-1">₹{worker.price}</p>
            <p className="text-sm text-gray-500 mb-2">per day</p>


            <p
                className={`text-sm font-medium mb-4 ${worker.available ? "text-green-600" : "text-red-500"
                    }`}
            >
                {worker.available ? "🟢 Available" : "🔴 Busy"}
            </p>


            <a href={`tel:${worker.phone}`}>
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded mb-3">
                    📞 Call Now
                </button>
            </a>


            <div className="flex gap-3 mb-3">
                <a
                    href={`https://wa.me/91${worker.phone}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-1/2"
                >
                    <button className="w-full border py-2 rounded hover:bg-green-500 hover:text-white">
                        💬 WhatsApp
                    </button>
                </a>


                <button
                    type="button"
                    disabled={!onHire || hireLoading || worker.available === false}
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onHire?.();
                    }}
                    className="w-1/2 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg disabled:opacity-60"
                >
                    {hireLoading ? "Sending..." : "Hire Me"}
                </button>
            </div>


            <p className="text-xs text-gray-500 mt-4 text-center">
                Usually responds within {worker.responseTime}
            </p>
        </div>
    );
};


export default WorkerContactCard;

