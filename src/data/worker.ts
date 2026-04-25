export type WorkerStatus = "Available" | "Busy";

export interface Worker {
    _id?: string;
    name: string;
    skills: string[];
    location: string;
    price: number;
    rate_type:string;
    phone: string;
    rating?: number;
    available?: boolean;
    about: string;
    experience: number;
    languages: string[];
    workingHours: string;
    responseTime: string;
    reviews: {
        name: string;
        comment: string;
        rating: number;
    }[];
}
export const workers: Worker[] = [
    {
        _id: "1",
        name: "Rajesh Kumar",
        location: "Noida, UP",
        skills: ["Electrician", "Wiring", "AC Repair"],
        rating: 4.8,
        phone: "9876543210",
        price: 600,
        rate_type:"Per Day",
        available: true,
        experience: 6,
        languages: ["Hindi", "English"],
        workingHours: "9:00 AM - 6:00 PM",
        responseTime: "< 2 hour",
        about: "Experienced electrician with expertise in residential and commercial work.",
        reviews: [
            { name: "Amit Sharma", comment: "Very professional and punctual.", rating: 5 },
            { name: "Priya Singh", comment: "Good work and clean finishing.", rating: 4 }
        ]
    },
    {
        _id: "2",
        name: "Anil Mehta",
        location: "Jaipur, Rajasthan",
        skills: ["Wiring", "AC Repair"],
        rating: 4.5,
        price: 550,
        rate_type: "Per Day",
        phone: "9876543211",
        available: false,
        experience: 4,
        languages: ["Hindi", "English"],
        workingHours: "9:00 AM - 6:00 PM",
        responseTime: "< 1 hour",
        about: "Experienced electrician with expertise in residential and commercial work.",
        reviews: []
    }
];