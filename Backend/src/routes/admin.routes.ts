import { Router } from "express";
import { generateCoupon, getStats, updateDiscountConfig } from "../controllers/admin.controller";

const router = Router();

router.post("/generate-coupon", generateCoupon);
router.get("/stats", getStats);
router.post("/update-config", updateDiscountConfig);

export default router;