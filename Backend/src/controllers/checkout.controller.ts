import { Request, Response } from "express";
import { readDB, writeDB } from "../utils/db";
import { v4 as uuidv4 } from "uuid";

export const checkout = (req: Request, res: Response) => {
  try {
    const db = readDB();
    const { couponCode } = req.body;

    if (db.cart.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // 1. Calculate total
    let totalAmount = db.cart.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0
    );

    let discountApplied = 0;

    // 2. Apply coupon
    if (couponCode) {
      const coupon = db.coupons.find((c: any) => c.code === couponCode);

      if (!coupon || coupon.isUsed) {
        return res.status(400).json({
          message: "Invalid or used coupon"
        });
      }

      discountApplied = (totalAmount * coupon.discountPercent) / 100;
      coupon.isUsed = true;
    }

    const finalAmount = totalAmount - discountApplied;

    // 3. Create order
    const newOrder = {
      id: uuidv4(),
      items: [...db.cart],
      totalAmount,
      discountApplied,
      finalAmount
    };

    db.orders.push(newOrder);

    // 4. Update stats
    db.stats.totalItems += db.cart.reduce(
      (sum: number, i: any) => sum + i.quantity,
      0
    );

    db.stats.totalRevenue += finalAmount;
    db.stats.totalDiscount += discountApplied;

    const { nthOrder, discountPercent } = db.discountConfig;
    let generatedCoupon = null;

    // 5. Generate coupon (every 3rd order)
    if (db.orders.length % nthOrder === 0) {
      generatedCoupon = {
        code: "SAVE10-" + db.orders.length,
        discountPercent: 10,
        isUsed: false
      };

      db.coupons.push(generatedCoupon);
    }

    // 6. Clear cart
    db.cart = [];

    writeDB(db);

    return res.json({
      message: "Order placed",
      order: newOrder,
      coupon: generatedCoupon 
    });

  } catch (error) {
    return res.status(500).json({ message: "Error" });
  }
};

export const previewCheckout = (req: Request, res: Response) => {
  const db = readDB();
  const { couponCode } = req.body;

  if (db.cart.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  let totalAmount = db.cart.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );

  let discountApplied = 0;

  if (couponCode) {
    const coupon = db.coupons.find(
      (c: any) => c.code.toLowerCase() === couponCode.toLowerCase()
    );

    if (!coupon || coupon.isUsed) {
      return res.status(400).json({
        message: "Invalid or used coupon"
      });
    }

    discountApplied = (totalAmount * coupon.discountPercent) / 100;
  }

  const finalAmount = totalAmount - discountApplied;

  return res.json({
    totalAmount,
    discountApplied,
    finalAmount
  });
};