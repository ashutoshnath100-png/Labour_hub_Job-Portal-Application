import { Worker } from "../../data/worker";
import { useNavigate } from "react-router-dom";

type Props = {
    currentWorker: Worker;
    workers: Worker[];
};

const SimilarWorkers = ({ currentWorker, workers }: Props) => {
    const navigate = useNavigate();

    const similar = workers.filter(
        (w) =>
            w._id !== currentWorker._id &&
            w.skills.some((skill) =>
                currentWorker.skills.includes(skill)
            )
    ).slice(0, 3);

    if (similar.length === 0) return null;

    return (
        <div className="bg-white p-5 rounded-lg shadow mt-6">
            <h4 className="font-semibold mb-4">Similar Workers</h4>

            <div className="space-y-4">
                {similar.map((worker) => (
                    <div
                        key={worker._id}
                        onClick={() => navigate(`/worker/${worker._id}`)}
                        className="cursor-pointer border rounded p-3 hover:bg-gray-50 transition"
                    >
                        <p className="font-medium">{worker.name}</p>
                        <p className="text-sm text-gray-500">
                            ⭐ {worker.rating} • ₹{worker.price}/day
                        </p>
                        <p className="text-xs text-gray-400">
                            {worker.skills.join(", ")}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SimilarWorkers;