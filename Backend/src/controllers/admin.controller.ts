import { Request, Response } from "express";
import { coupons, orders, stats } from "../store/store";

// 🔹 Generate Coupon Manually
export const generateCoupon = (req: Request, res: Response) => {
  try {
    const { discountPercent } = req.body;

    if (!discountPercent) {
      return res.status(400).json({
        message: "discountPercent is required"
      });
    }

    const newCoupon = {
      code: "ADMIN-" + Date.now(),
      discountPercent,
      isUsed: false
    };

    coupons.push(newCoupon);

    return res.json({
      message: "Coupon generated successfully",
      coupon: newCoupon
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};

// 🔹 Get Stats
export const getStats = (req: Request, res: Response) => {
  try {
    return res.json({
      totalItemsSold: stats.totalItems,
      totalRevenue: stats.totalRevenue,
      totalDiscountGiven: stats.totalDiscount,
      totalOrders: orders.length,
      coupons
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};