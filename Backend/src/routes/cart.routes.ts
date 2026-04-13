import { Router } from "express";
import { addToCart, getCart, getOrders } from "../controllers/cart.controller";

const router = Router();

router.post("/add", addToCart);
router.get("/", getCart);
router.get("/orders", getOrders)

export default router;