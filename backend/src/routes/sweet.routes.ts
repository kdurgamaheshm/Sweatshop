import { Router } from "express";
import {
    addSweet,
    getSweets,
    searchSweets,
    updateSweet,
    deleteSweet,
    purchaseSweet,
    restockSweet
} from "../controllers/sweet.controller";
import { auth } from "../middlewares/auth.middleware";
import { adminOnly } from "../middlewares/role.middleware";

const router = Router();

router.use(auth);
router.post("/",auth, adminOnly, addSweet);
router.get("/", getSweets);
router.get("/search", searchSweets);
router.put("/:id", adminOnly, updateSweet);
router.delete("/:id",auth, adminOnly, deleteSweet);
router.post("/:id/purchase", purchaseSweet);
router.post("/:id/restock", adminOnly, restockSweet);

export default router;
