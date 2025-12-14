import { useState } from "react";
import api from "../api/axios";

export default function SweetModal({ onClose, reload }: any) {
    const [form, setForm] = useState({
        name: "",
        category: "",
        price: 0,
        quantity: 0,
    });

    const submit = async () => {
        if (!form.name.trim()) {
            alert("Name is required");
            return;
        }

        await api.post("/sweets", form);
        await reload();
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
            {/* Modal Card */}
            <div className="bg-white w-full max-w-md rounded-xl shadow-lg">
                {/* Header */}
                <div className="border-b px-6 py-4">
                    <h3 className="text-lg font-semibold text-[#1f3b60]">
                        Add New Sweet
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                        Enter sweet details to add it to inventory
                    </p>
                </div>

                {/* Body */}
                <div className="px-6 py-4 space-y-4">
                    {/* Name */}
                    <div className="flex flex-col">
                        <label className="text-xs text-gray-600 mb-1">
                            Sweet Name
                        </label>
                        <input
                            className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4f9bd9]"
                            placeholder="e.g. Badusha"
                            value={form.name}
                            onChange={(e) =>
                                setForm({ ...form, name: e.target.value })
                            }
                        />
                    </div>

                    {/* Category */}
                    <div className="flex flex-col">
                        <label className="text-xs text-gray-600 mb-1">
                            Category
                        </label>
                        <input
                            className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4f9bd9]"
                            placeholder="e.g. Traditional"
                            value={form.category}
                            onChange={(e) =>
                                setForm({ ...form, category: e.target.value })
                            }
                        />
                    </div>

                    {/* Price & Quantity */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="text-xs text-gray-600 mb-1">
                                Price (₹)
                            </label>
                            <input
                                type="number"
                                className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4f9bd9]"
                                placeholder="100"
                                value={form.price}
                                onChange={(e) =>
                                    setForm({ ...form, price: Number(e.target.value) })
                                }
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-xs text-gray-600 mb-1">
                                Quantity
                            </label>
                            <input
                                type="number"
                                className="border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#4f9bd9]"
                                placeholder="10"
                                value={form.quantity}
                                onChange={(e) =>
                                    setForm({ ...form, quantity: Number(e.target.value) })
                                }
                            />
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="border-t px-6 py-4 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-md text-sm font-medium bg-gray-100 hover:bg-gray-200 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={submit}
                        className="px-5 py-2 rounded-md text-sm font-medium text-white bg-[#1f3b60] hover:bg-[#16304f] transition"
                    >
                        Save Sweet
                    </button>
                </div>
            </div>
        </div>
    );
}
