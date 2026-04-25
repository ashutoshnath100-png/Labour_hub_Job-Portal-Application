
export interface RecentUser {
  name: string;
  role: string;
  status: "pending" | "approved" | "blocked";
}

export const recentRegistrations: RecentUser[] = [
  {
    name: "Rajesh Kumar",
    role: "Labour • 2 hours ago",
    status: "pending",
  },
  {
    name: "Priya Sharma",
    role: "Employer • 4 hours ago",
    status: "approved",
  },
  {
    name: "Amit Singh",
    role: "Labour • 5 hours ago",
    status: "pending",
  },
  {
    name: "Rohit Yadav",
    role: "Employer • 1 day ago",
    status: "approved",
  },
  {
    name: "Vikram Patel",
    role: "Labour • 2 days ago",
    status: "blocked",
  },
];