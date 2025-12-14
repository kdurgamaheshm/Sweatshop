import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { getSweetImage } from "../utils/sweetImages";

export default function SweetCard({ sweet, reload }: any) {
    const { user } = useAuth();

    const purchase = async () => {
        await api.post(`/sweets/${sweet._id}/purchase`);
        reload();
    };

    const restock = async () => {
        await api.post(`/sweets/${sweet._id}/restock`);
        reload();
    };

    const remove = async () => {
        await api.delete(`/sweets/${sweet._id}`);
        reload();
    };

    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
            {/* Image */}
            <div className="relative">
                <img
                    src={getSweetImage(sweet.name)}
                    alt={sweet.name}
                    className="h-44 w-full object-cover"
                />

                {/* Stock badge */}
                {sweet.quantity === 0 && (
                    <span className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
            Out of Stock
          </span>
                )}
            </div>

            {/* Content */}
            <div className="p-4">
                {/* Title */}
                <h3 className="text-lg font-semibold text-[#1f3b60]">
                    {sweet.name}
                </h3>
                <p className="text-sm text-gray-500 mt-0.5">
                    {sweet.category}
                </p>

                {/* Price & Quantity */}
                <div className="flex justify-between items-center mt-3">
          <span className="text-lg font-bold text-[#1f3b60]">
            ₹{sweet.price}
          </span>

                    <span
                        className={`text-sm font-medium px-2 py-1 rounded ${
                            sweet.quantity === 0
                                ? "bg-red-100 text-red-700"
                                : "bg-green-100 text-green-700"
                        }`}
                    >
            Qty: {sweet.quantity}
          </span>
                </div>

                {/* User Action */}
                <button
                    onClick={purchase}
                    disabled={sweet.quantity === 0}
                    className="w-full mt-4 px-4 py-2 rounded-md text-sm font-medium text-white
                     bg-[#4f9bd9] hover:bg-[#3b82c4] transition disabled:bg-gray-400"
                >
                    Purchase
                </button>

                {/* Admin Actions */}
                {user?.role === "ADMIN" && (
                    <div className="flex gap-2 mt-3">
                        <button
                            onClick={restock}
                            className="flex-1 px-3 py-2 rounded-md text-sm font-medium
                         bg-gray-100 hover:bg-gray-200 transition"
                        >
                            Restock
                        </button>

                        <button
                            onClick={remove}
                            className="flex-1 px-3 py-2 rounded-md text-sm font-medium
                         bg-red-600 text-white hover:bg-red-700 transition"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
