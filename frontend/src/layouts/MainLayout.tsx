import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen bg-[#f4f6f9]">
            {/* Header */}
            <header className="bg-[#1f3b60] text-white shadow">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    {/* Title */}
                    <div className="flex items-center gap-3">

                        <h1 className="text-lg font-semibold tracking-wide">
                            Sweet Shop
                        </h1>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center gap-4">
                        {user?.role === "ADMIN" && (
                            <>
                                <Link
                                    to="/"
                                    className="px-4 py-2 rounded-md text-sm font-medium hover:bg-white/10 transition"
                                >
                                    User View
                                </Link>

                                <Link
                                    to="/admin"
                                    className="px-4 py-2 rounded-md text-sm font-medium bg-white/10 hover:bg-white/20 transition"
                                >
                                    Admin Panel
                                </Link>
                            </>
                        )}

                        <button
                            onClick={logout}
                            className="px-4 py-2 rounded-md text-sm font-medium bg-red-600 hover:bg-red-700 transition"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Page Content */}
            <main className="max-w-7xl mx-auto p-6">{children}</main>
        </div>
    );
}
