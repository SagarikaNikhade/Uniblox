import { Request, Response } from "express";
import { readDB, writeDB } from "../utils/db";

export const addToCart = (req: Request, res: Response) => {
  try {
    const db = readDB();

    const { productId, name, price, quantity } = req.body;

    if (!productId || !name || !price || !quantity) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingItem = db.cart.find(
      (item: any) => item.productId === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      db.cart.push({ productId, name, price, quantity });
    }

    writeDB(db);

    return res.json({
      message: "Item added",
      cart: db.cart
    });

  } catch (error) {
    return res.status(500).json({ message: "Error" });
  }
};

export const getCart = (req: Request, res: Response) => {
  const db = readDB();
  res.json({ cart: db.cart });
};

export const getOrders = (req: Request, res: Response) => {
  const db = readDB();
  res.json({ orders: db.orders });
};