import { Router } from "express";
import { generateCoupon, getStats } from "../controllers/admin.controller";

const router = Router();

router.post("/generate-coupon", generateCoupon);
router.get("/stats", getStats);

export default router;