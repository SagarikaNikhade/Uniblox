import { Request, Response } from "express";
import { cart } from "../../models/cart.store";
import { CartItem } from "../../models/cart.model";

// Add item to cart
export const addToCart = (req: Request, res: Response) => {
  try {
    const { productId, name, price, quantity } = req.body;

    console.log("hello")

    // validation
    if (!productId || !name || !price || !quantity) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const existingItem = cart.find(
      (item) => item.productId === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      const newItem: CartItem = {
        productId,
        name,
        price,
        quantity
      };
      cart.push(newItem);
    }

    console.log("cart", cart)

    return res.json({
      message: "Item added to cart",
      cart
    });

  } catch (error) {
    return res.status(500).json({
      message: "Internal server error"
    });
  }
};

// Get cart
export const getCart = (req: Request, res: Response) => {
  return res.json({ cart });
};