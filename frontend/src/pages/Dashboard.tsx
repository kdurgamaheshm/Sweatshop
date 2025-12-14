import { useEffect, useState } from "react";
import api from "../api/axios";
import SweetCard from "../components/SweetCard";
import Filters from "../components/Filters";
import MainLayout from "../layouts/MainLayout";

export default function Dashboard() {
    const [sweets, setSweets] = useState([]);
    const [filters, setFilters] = useState({});

    const loadSweets = async () => {
        const res = await api.get("/sweets/search", { params: filters });
        setSweets(res.data);
    };

    useEffect(() => {
        loadSweets();
    }, [JSON.stringify(filters)]);

    return (
        <MainLayout>
            <Filters setFilters={setFilters} />

            {sweets.length === 0 && (
                <p className="text-center text-gray-500">No sweets available</p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {sweets.map((s: any) => (
                    <SweetCard key={s._id} sweet={s} reload={loadSweets} />
                ))}
            </div>
        </MainLayout>
    );
}
