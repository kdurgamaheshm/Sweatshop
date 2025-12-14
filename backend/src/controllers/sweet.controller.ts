import {
    createSweet,
    getAllSweets,
    searchSweetsService,
    updateSweetService,
    deleteSweetService,
    purchaseSweetService,
    restockSweetService
} from "../services/sweet.service";
import { sweetSchema } from "../utils/validator";

/**
 * ADMIN: Add new sweet
 */
export const addSweet = async (req: any, res: any) => {
    const { error } = sweetSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.message });
    }

    const sweet = await createSweet(req.body);
    res.status(201).json(sweet);
};

/**
 * USER / ADMIN: Get all sweets
 */
export const getSweets = async (_: any, res: any) => {
    const sweets = await getAllSweets();
    res.status(200).json(sweets);
};

/**
 * USER / ADMIN: Search sweets
 */
export const searchSweets = async (req: any, res: any) => {
    const filters = {
        name: req.query.name || undefined,
        category: req.query.category || undefined,
        minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
        maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
    };

    const sweets = await searchSweetsService(filters);
    res.status(200).json(sweets);
};

/**
 * ADMIN: Update sweet
 */
export const updateSweet = async (req: any, res: any) => {
    const { error } = sweetSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.message });
    }

    const sweet = await updateSweetService(req.params.id, req.body);
    if (!sweet) {
        return res.status(404).json({ message: "Sweet not found" });
    }

    res.status(200).json(sweet);
};

/**
 * ADMIN: Delete sweet
 */
export const deleteSweet = async (req: any, res: any) => {
    const deleted = await deleteSweetService(req.params.id);
    if (!deleted) {
        return res.status(404).json({ message: "Sweet not found" });
    }

    res.status(200).json({ message: "Sweet deleted successfully" });
};

/**
 * USER / ADMIN: Purchase sweet
 */
export const purchaseSweet = async (req: any, res: any) => {
    try {
        const sweet = await purchaseSweetService(req.params.id);
        res.status(200).json(sweet);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

/**
 * ADMIN: Restock sweet
 */
export const restockSweet = async (req: any, res: any) => {
    try {
        const sweet = await restockSweetService(req.params.id);
        res.status(200).json(sweet);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};
