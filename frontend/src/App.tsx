import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminPanel from "./pages/AdminPanel";
import { useAuth } from "./context/AuthContext";

export default function App() {
    const { user } = useAuth();

    return (
        <Routes>
            {/* Public routes */}
            {!user && (
                <>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="*" element={<Navigate to="/login" />} />
                </>
            )}

            {/* Protected routes */}
            {user && (
                <>
                    <Route path="/" element={<Dashboard />} />
                    {user.role === "ADMIN" && (
                        <Route path="/admin" element={<AdminPanel />} />
                    )}
                    <Route path="*" element={<Navigate to="/" />} />
                </>
            )}
        </Routes>
    );
}
