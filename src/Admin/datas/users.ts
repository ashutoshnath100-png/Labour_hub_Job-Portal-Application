export interface User {
  name: string;
  email: string;
  phone: string;
  type: "Labour" | "Employer";
  skills?: string;
  status: "pending" | "approved" | "blocked";
  registeredAt: string;
}

export const users: User[] = [
  {
    name: "Rajesh Kumar",
    email: "rajesh.kumar@mail.com",
    phone: "+91 98765 43210",
    type: "Labour",
    skills: "Electrician",
    status: "pending",
    registeredAt: "2 hours ago",
  },
  {
    name: "Priya Sharma",
    email: "priya.sharma@mail.com",
    phone: "+91 98765 43211",
    type: "Employer",
    status: "approved",
    registeredAt: "4 hours ago",
  },
  {
    name: "Amit Singh",
    email: "amit.singh@mail.com",
    phone: "+91 98765 43212",
    type: "Labour",
    skills: "Plumber",
    status: "pending",
    registeredAt: "5 hours ago",
  },
  {
    name: "Rohit Yadav",
    email: "rohit.yadav@mail.com",
    phone: "+91 98765 43213",
    type: "Employer",
    status: "approved",
    registeredAt: "1 day ago",
  },
  {
    name: "Vikram Patel",
    email: "vikram.patel@mail.com",
    phone: "+91 98765 43214",
    type: "Labour",
    skills: "Welder",
    status: "blocked",
    registeredAt: "2 days ago",
  },
];