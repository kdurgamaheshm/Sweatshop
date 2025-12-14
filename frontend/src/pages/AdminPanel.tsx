import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import SweetModal from "../components/SweetModal";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import SweetCard from "../components/SweetCard";

export default function AdminPanel() {
    const { user } = useAuth();
    if (user?.role !== "ADMIN") return <Navigate to="/" replace />;

    const [sweets, setSweets] = useState([]);
    const [open, setOpen] = useState(false);

    const loadSweets = async () => {
        const res = await api.get("/sweets");
        setSweets(res.data);
    };

    useEffect(() => {
        loadSweets();
    }, []);

    return (
        <MainLayout>
            {/* Header */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-semibold text-[#1f3b60]">
                            Admin Dashboard
                        </h2>
                        <p className="text-sm text-gray-600 mt-1">
                            Inventory and sweet management
                        </p>
                    </div>

                    <button
                        className="px-5 py-2 rounded-md text-white bg-[#1f3b60] hover:bg-[#16304f] transition"
                        onClick={() => setOpen(true)}
                    >
                        + Add Sweet
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="bg-[#f4f6f9] rounded-lg p-5">
                {sweets.length === 0 ? (
                    <div className="text-center text-gray-500 py-12">
                        No sweets found. Start by adding a new sweet.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                        {sweets.map((s: any) => (
                            <SweetCard key={s._id} sweet={s} reload={loadSweets} />
                        ))}
                    </div>
                )}
            </div>

            {/* Modal */}
            {open && (
                <SweetModal
                    onClose={() => setOpen(false)}
                    reload={loadSweets}
                />
            )}
        </MainLayout>
    );
}
