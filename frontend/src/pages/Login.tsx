import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

export default function Login() {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const submit = async () => {
        try {
            await login(email, password);
            toast.success("Login successful");
        } catch {
            toast.error("Invalid credentials");
        }
    };

    return (
        <div className="min-h-screen bg-[#f4f6f9] flex items-center justify-center">
            <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl shadow-lg">
                {/* Header */}
                <div className="px-6 py-5 border-b">
                    <h2 className="text-xl font-semibold text-[#1f3b60]">
                        Sign in to Sweet Shop
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Manage and purchase sweets securely
                    </p>
                </div>

                {/* Form */}
                <div className="px-6 py-6 space-y-4">
                    {/* Email */}
                    <div className="flex flex-col">
                        <label className="text-xs text-gray-600 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4f9bd9]"
                            placeholder="you@example.com"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Password */}
                    <div className="flex flex-col">
                        <label className="text-xs text-gray-600 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4f9bd9]"
                            placeholder="••••••••"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {/* Login Button */}
                    <button
                        onClick={submit}
                        className="w-full mt-2 px-4 py-2 rounded-md text-sm font-medium
                       text-white bg-[#1f3b60] hover:bg-[#16304f] transition"
                    >
                        Sign In
                    </button>
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t text-center">
          <span className="text-sm text-gray-600">
            Don’t have an account?{" "}
          </span>
                    <Link
                        to="/register"
                        className="text-sm font-medium text-[#4f9bd9] hover:underline"
                    >
                        Register
                    </Link>
                </div>
            </div>
        </div>
    );
}
