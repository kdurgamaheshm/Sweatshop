import { useEffect, useState } from "react";
import api from "../api/axios";

export const useSweets = (filters: any) => {
    const [sweets, setSweets] = useState([]);

    const load = async () => {
        const res = await api.get("/sweets/search", { params: filters });
        setSweets(res.data);
    };

    useEffect(() => {
        load();
    }, [JSON.stringify(filters)]);

    return { sweets, reload: load };
};
