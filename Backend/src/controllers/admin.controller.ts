import { Request, Response } from "express";
import { readDB, writeDB } from "../utils/db";

export const generateCoupon = (req: Request, res: Response) => {
  const db = readDB();
  const { discountPercent } = req.body;

  if (!discountPercent) {
    return res.status(400).json({ message: "discountPercent required" });
  }

  const newCoupon = {
    code: "ADMIN-" + Date.now(),
    discountPercent,
    isUsed: false
  };

  db.coupons.push(newCoupon);
  writeDB(db);

  res.json({ coupon: newCoupon });
};

export const getStats = (req: Request, res: Response) => {
  const db = readDB();

  res.json({
    totalItemsSold: db.stats.totalItems,
    totalRevenue: db.stats.totalRevenue,
    totalDiscountGiven: db.stats.totalDiscount,
    totalOrders: db.orders.length,
    coupons: db.coupons
  });
};

export const updateDiscountConfig = (req: Request, res: Response) => {
  const db = readDB();
  const { nthOrder, discountPercent } = req.body;

  if (!nthOrder || !discountPercent) {
    return res.status(400).json({
      message: "nthOrder and discountPercent required"
    });
  }

  db.discountConfig = {
    nthOrder,
    discountPercent
  };

  writeDB(db);

  res.json({
    message: "Discount config updated",
    config: db.discountConfig
  });
};