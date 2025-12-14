import { createContext, useContext, useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";
import api from "../api/axios";

interface User {
    role: "USER" | "ADMIN";
    exp: number;
}

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        const decoded: User = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) logout();
        else setUser(decoded);
    }, []);

    const login = async (email: string, password: string) => {
        const res = await api.post("/auth/login", { email, password });
        localStorage.setItem("token", res.data.token);
        setUser(jwtDecode(res.data.token));
    };

    const register = (name: string, email: string, password: string) =>
        api.post("/auth/register", { name, email, password });

    const logout = () => {
        localStorage.clear();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
