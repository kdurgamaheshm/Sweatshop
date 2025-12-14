import Sweet from "../models/Sweet";

export const createSweet = async (data: any) => {
    return await Sweet.create(data);
};

export const getAllSweets = async () => {
    return await Sweet.find();
};

export const searchSweetsService = async (filters: any) => {
    const query: any = {};

    if (filters.name) {
        query.name = { $regex: filters.name, $options: "i" };
    }

    if (filters.category) {
        query.category = filters.category;
    }

    if (filters.minPrice || filters.maxPrice) {
        query.price = {
            $gte: filters.minPrice || 0,
            $lte: filters.maxPrice || Number.MAX_VALUE
        };
    }

    return await Sweet.find(query);
};

export const updateSweetService = async (id: string, data: any) => {
    return await Sweet.findByIdAndUpdate(id, data, { new: true });
};

export const deleteSweetService = async (id: string) => {
    return await Sweet.findByIdAndDelete(id);
};

export const purchaseSweetService = async (id: string) => {
    const sweet = await Sweet.findById(id);
    if (!sweet) throw new Error("Sweet not found");
    if (sweet.quantity <= 0) throw new Error("Out of stock");

    sweet.quantity -= 1;
    await sweet.save();
    return sweet;
};

export const restockSweetService = async (id: string) => {
    const sweet = await Sweet.findById(id);
    if (!sweet) throw new Error("Sweet not found");

    sweet.quantity += 1;
    await sweet.save();
    return sweet;
};
