import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

interface Sweet {
    _id: string;
    name: string;
    category: string;
    price: number;
    quantity: number;
}

interface Props {
    sweets: Sweet[];
    reload: () => void;
}

export default function SweetTable({ sweets, reload }: Props) {
    const { user } = useAuth();

    const purchaseSweet = async (id: string) => {
        await api.post(`/sweets/${id}/purchase`);
        reload();
    };

    const restockSweet = async (id: string) => {
        await api.post(`/sweets/${id}/restock`);
        reload();
    };

    const deleteSweet = async (id: string) => {
        await api.delete(`/sweets/${id}`);
        reload();
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 bg-white">
                <thead className="bg-gray-100">
                <tr>
                    <th className="border p-2 text-left">Name</th>
                    <th className="border p-2 text-left">Category</th>
                    <th className="border p-2 text-left">Price</th>
                    <th className="border p-2 text-left">Quantity</th>
                    <th className="border p-2 text-left">Actions</th>
                </tr>
                </thead>

                <tbody>
                {sweets.length === 0 && (
                    <tr>
                        <td colSpan={5} className="text-center p-4">
                            No sweets available
                        </td>
                    </tr>
                )}

                {sweets.map((sweet) => (
                    <tr key={sweet._id}>
                        <td className="border p-2">{sweet.name}</td>
                        <td className="border p-2">{sweet.category}</td>
                        <td className="border p-2">₹{sweet.price}</td>
                        <td className="border p-2">{sweet.quantity}</td>

                        <td className="border p-2 space-x-2">
                            <button
                                className="btn"
                                disabled={sweet.quantity === 0}
                                onClick={() => purchaseSweet(sweet._id)}
                            >
                                {sweet.quantity === 0 ? "Out of Stock" : "Purchase"}
                            </button>

                            {user?.role === "ADMIN" && (
                                <>
                                    <button
                                        className="btn"
                                        onClick={() => restockSweet(sweet._id)}
                                    >
                                        Restock
                                    </button>

                                    <button
                                        className="btn bg-red-600"
                                        onClick={() => deleteSweet(sweet._id)}
                                    >
                                        Delete
                                    </button>
                                </>
                            )}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
