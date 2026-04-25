import { Navigate, Outlet } from "react-router-dom";


type Role = "admin" | "labour" | "employee";


type Props = {
    allow: Role[];
    redirectTo?: string;
};


const RoleRoute = ({ allow, redirectTo = "/login" }: Props) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role") as Role | null;


    if (!token) return <Navigate to="/login" replace />;


    if (!role) return <Navigate to={redirectTo} replace />;


    if (!allow.includes(role)) {
        if (redirectTo) return <Navigate to={redirectTo} replace />;


        if (role === "labour") return <Navigate to="/labour-dashboard" replace />;
        if (role === "employee") return <Navigate to="/find-labour" replace />;
        if (role === "admin") return <Navigate to="/admin/dashboard" replace />;


        return <Navigate to="/" replace />;
    }


    return <Outlet />;
};


export default RoleRoute;