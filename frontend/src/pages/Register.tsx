import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { Link , useNavigate } from "react-router-dom";

export default function Register() {
    const { register } = useAuth();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const submit = async () => {
        if (loading) return;

        try {
            setLoading(true);
            await register(form.name, form.email, form.password);
            navigator.login;
            toast.success("Registered successfully");
            navigate("/login");
        } catch {
            toast.error("Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f4f6f9] flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">

                {/* Top Accent */}
                <div className="h-2 bg-[#1f3b60]" />

                {/* Header */}
                <div className="px-6 pt-6 pb-4">
                    <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-2xl font-semibold text-[#1f3b60]">
                            Create account
                        </h2>
                    </div>

                    <p className="text-sm text-gray-500">
                        Register to start managing and purchasing sweets
                    </p>
                </div>

                {/* Form */}
                <div className="px-6 pb-6 space-y-5">
                    {/* Name */}
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            placeholder="Your name"
                            onChange={(e) =>
                                setForm({ ...form, name: e.target.value })
                            }
                            className="w-full border rounded-md px-3 py-2.5 text-sm
                         focus:outline-none focus:ring-2 focus:ring-[#4f9bd9]
                         focus:border-[#4f9bd9]"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                            Email address
                        </label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            onChange={(e) =>
                                setForm({ ...form, email: e.target.value })
                            }
                            className="w-full border rounded-md px-3 py-2.5 text-sm
                         focus:outline-none focus:ring-2 focus:ring-[#4f9bd9]
                         focus:border-[#4f9bd9]"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            onChange={(e) =>
                                setForm({ ...form, password: e.target.value })
                            }
                            className="w-full border rounded-md px-3 py-2.5 text-sm
                         focus:outline-none focus:ring-2 focus:ring-[#4f9bd9]
                         focus:border-[#4f9bd9]"
                        />
                    </div>

                    {/* Button */}
                    <button
                        onClick={submit}
                        disabled={loading}
                        className="w-full mt-2 py-2.5 rounded-md text-sm font-medium
                       text-white bg-[#1f3b60]
                       hover:bg-[#16304f]
                       disabled:bg-gray-400
                       active:scale-[0.99]
                       transition"
                    >
                        {loading ? "Creating account..." : "Register"}
                    </button>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-6 py-4 text-center border-t">
          <span className="text-sm text-gray-600">
            Already have an account?
          </span>{" "}
                    <Link
                        to="/login"
                        className="text-sm font-medium text-[#4f9bd9] hover:underline"
                    >
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
}
