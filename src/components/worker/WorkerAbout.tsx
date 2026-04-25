import { Worker } from "../../data/worker";

type Props = {
    worker: Worker;
};

const WorkerAbout = ({ worker }: Props) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h3 className="text-xl font-semibold mb-3">About</h3>

            <p className="text-gray-600 mb-4">{worker.about}</p>

            <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <p className="text-gray-500">Experience</p>
                    <p>{worker.experience} years</p>
                </div>

                <div>
                    <p className="text-gray-500">Languages</p>
                    <p>{worker.languages.join(", ")}</p>
                </div>

                <div>
                    <p className="text-gray-500">Working Hours</p>
                    <p>{worker.workingHours}</p>
                </div>

                <div>
                    <p className="text-gray-500">Response Time</p>
                    <p>{worker.responseTime}</p>
                </div>
            </div>
        </div>
    );
};

export default WorkerAbout;