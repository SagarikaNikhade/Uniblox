import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { cart, orders, coupons, stats } from "../store/store";

export const checkout = (req: Request, res: Response) => {
  try {
    const { couponCode } = req.body;

    if (cart.length === 0) {
      return res.status(400).json({
        message: "Cart is empty"
      });
    }

    // 1. Calculate total
    let totalAmount = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    let discountApplied = 0;

    // 2. Apply coupon
    if (couponCode) {
      const coupon = coupons.find(c => c.code === couponCode);

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
      items: [...cart],
      totalAmount,
      discountApplied,
      finalAmount
    };

    orders.push(newOrder);

    // 4. Update stats
    stats.totalItems += cart.reduce((sum, i) => sum + i.quantity, 0);
    stats.totalRevenue += finalAmount;
    stats.totalDiscount += discountApplied;

    // 5. Generate coupon (every 3rd order)
    if (orders.length % 3 === 0) {
      coupons.push({
        code: "SAVE10-" + orders.length,
        discountPercent: 10,
        isUsed: false
      });
    }

    // 6. Clear cart
    cart.length = 0;

    return res.json({
      message: "Order placed successfully",
      order: newOrder
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};