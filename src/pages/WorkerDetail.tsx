import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getLabourById, getLabours } from "../api/labourApi";
import type { Worker } from "../data/worker";
import axios from "axios";

import WorkerHeader from "../components/worker/WorkerHeader";
import WorkerAbout from "../components/worker/WorkerAbout";
import WorkerReviews from "../components/worker/WorkerReviews";
import SimilarWorkers from "../components/worker/SimilarWorkers";
import SafetyTips from "../components/worker/SafetyTips";
import WorkerContactCard from "../components/worker/WorkerContactCard";

const API_BASE = "http://localhost:4000";


const WorkerDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();


    const [canReview, setCanReview] = useState(false);
    const [worker, setWorker] = useState<Worker | null>(null);
    const [workers, setWorkers] = useState<Worker[]>([]);
    const [loading, setLoading] = useState(true);


    const [hireLoading, setHireLoading] = useState(false);
    const [hireError, setHireError] = useState("");
    const [hireSuccess, setHireSuccess] = useState("");


    const markBusy = async () => {
        if (!worker) return;


        try {
            await fetch(`${API_BASE}/api/labour/${worker._id}/availability`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ available: false }),
            });


            setWorker({ ...worker, available: false });
        } catch (e) {
            console.error("markBusy error:", e);
        }
    };


    const addReviewToWorker = (reviews: any[]) => {
        if (!worker) return;


        const avgRating =
            reviews.length > 0
                ? reviews.reduce((sum, r) => sum + Number(r.rating || 0), 0) /
                reviews.length
                : 0;


        setWorker({
            ...worker,
            reviews,
            rating: Number(avgRating.toFixed(1)),
        });
    };


    const handleHireRequest = async () => {
        if (!worker) return;


        setHireError("");
        setHireSuccess("");


        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");


        if (!token || role !== "employee") {
            navigate("/login");
            return;
        }


        try {
            setHireLoading(true);


            const res = await fetch(`${API_BASE}/api/hire/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    labourId: worker._id,
                    message: "I want to hire you",
                }),
            });


            const data = await res.json().catch(() => ({}));


            if (res.ok) {
                alert("Hire request sent!");
                setWorker((prev) => (prev ? { ...prev, alreadyRequested: true } as any : prev));
            } else if (res.status === 409) {
                setHireError(data.message || "Already requested. Wait for response.");
            } else {
                setHireError(data.message || "Hire request failed");
            }


            setHireSuccess("Hire request sent successfully");




        } catch (err) {
            console.error("Hire request error:", err);
            setHireError("Server error / Backend not running");
        } finally {
            setHireLoading(false);
        }
    };


    useEffect(() => {
        if (!id) return;


        const fetchData = async () => {
            try {
                setLoading(true);


                const workerData = await getLabourById(id);


                const calculatedRating =
                    workerData.reviews && workerData.reviews.length > 0
                        ? workerData.reviews.reduce((sum: number, r: any) => sum + Number(r.rating || 0), 0) /
                        workerData.reviews.length
                        : 0;


                const formattedWorker: Worker = {
                    _id: workerData._id,
                    name: workerData.name,
                    phone: workerData.phone || "N/A",
                    location: workerData.location,
                    price: Number(workerData.price) || 0,
                    rate_type: workerData.rate_type || "Per Day",
                    skills: workerData.skills?.length
                        ? workerData.skills
                        : workerData.skill
                            ? [workerData.skill]
                            : [],
                    rating: Number(calculatedRating.toFixed(1)),
                    experience: Number(workerData.experience ?? 0),
                    available: Boolean(workerData.available ?? true),
                    reviews: workerData.reviews || [],
                    languages: [],
                    workingHours: "9 AM - 6 PM",
                    responseTime: "1 hour",
                    about: workerData.about || "No description available",
                };


                const allWorkersRaw = await getLabours();


                const formattedWorkers: Worker[] = allWorkersRaw.map((w: any) => ({
                    _id: w._id,
                    name: w.name,
                    location: w.location,
                    price: Number(w.price) || 0,
                    rate_Type: w.rate_type || "Per Day",
                    skills: w.skills?.length ? w.skills : w.skill ? [w.skill] : [],
                    rating: Number(w.rating ?? 0),
                    experience: Number(w.experience ?? 0),
                    available: Boolean(w.available ?? true),
                    reviews: w.reviews || [],
                    languages: [],
                    phone: w.phone || "N/A",
                    workingHours: "9 AM - 6 PM",
                    responseTime: "1 hour",
                    about: w.about || "No description available",
                }));


                setWorker(formattedWorker);
                setWorkers(formattedWorkers);
            } catch (err) {
                console.error("Worker detail error:", err);
                setWorker(null);
            } finally {
                setLoading(false);
            }
        };


        fetchData();
    }, [id]);

    useEffect(() => {
        if (!id) return;

        const checkReview = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await axios.get(
                    `http://localhost:4000/api/reviews/can-review/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setCanReview(res.data.canReview);

            } catch (err) {
                console.log("Check review error:", err);
            }
        };

        checkReview();
    }, [id]);

    if (loading) return <p className="p-8">Loading...</p>;
    if (!worker) return <p className="p-8">Worker not found</p>;

    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <WorkerHeader worker={worker} />
                    <WorkerAbout worker={worker} />
                    <WorkerReviews
                        worker={worker}
                        onReviewAdded={addReviewToWorker}
                        canReview={canReview} />
                </div>
                <div>
                    <div className="bg-white rounded-xl shadow p-5 mb-4">
                        <h3 className="text-lg font-semibold mb-2">Hire this worker</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Request a job from this worker.
                        </p>
                        {worker.available === false && (
                            <p className="text-sm text-red-500 mb-3">
                                Worker is busy right now
                            </p>
                        )}


                        {hireError && <p className="text-sm text-red-500 mb-3">{hireError}</p>}
                        {hireSuccess && <p className="text-sm text-green-600 mb-3">{hireSuccess}</p>}
                        <button
                            type="button"
                            disabled={hireLoading || worker.available === false || (worker as any).alreadyRequested === true}
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleHireRequest();
                            }}
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg disabled:opacity-60"
                        >
                            {(worker as any).alreadyRequested
                                ? "Request Sent"
                                : worker.available === false
                                    ? "Worker Busy"
                                    : hireLoading
                                        ? "Sending..."
                                        : "Hire Me"}
                        </button>
                    </div>


                    <WorkerContactCard worker={worker} onMarkBusy={markBusy} onHire={handleHireRequest} />
                    <SimilarWorkers currentWorker={worker} workers={workers} />
                    <SafetyTips />
                </div>
            </div>
        </div>
    );
};


export default WorkerDetail;

