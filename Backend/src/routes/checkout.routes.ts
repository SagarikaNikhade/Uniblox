import { Router } from "express";
import { checkout, previewCheckout } from "../controllers/checkout.controller";

const router = Router();

router.post("/", checkout);
router.post("/preview", previewCheckout);

export default router;