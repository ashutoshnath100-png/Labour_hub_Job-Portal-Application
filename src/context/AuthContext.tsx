import React, { createContext, useContext, useEffect, useMemo, useState } from "react";


type Role = "admin" | "labour" | "employee" | null;


type AuthState = {
    token: string | null;
    role: Role;
};


type AuthContextType = AuthState & {
    login: (token: string, role: Exclude<Role, null>) => void;
    logout: () => void;
};


const AuthContext = createContext<AuthContextType | null>(null);


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
    const [role, setRole] = useState<Role>(localStorage.getItem("role") as Role);


    const login = (newToken: string, newRole: Exclude<Role, null>) => {
        localStorage.setItem("token", newToken);
        localStorage.setItem("role", newRole);
        setToken(newToken);
        setRole(newRole);
    };


    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setToken(null);
        setRole(null);
    };


    useEffect(() => {
        const onStorage = () => {
            setToken(localStorage.getItem("token"));
            setRole(localStorage.getItem("role") as Role);
        };
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);


    const value = useMemo(() => ({ token, role, login, logout }), [token, role]);


    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
};