import { CartItem } from "../models/cart.model";
import { Coupon } from "../models/coupon.model";
import { Order } from "../models/order.model";

export let cart: CartItem[] = [];

export let orders: Order[] = [];

export let coupons: Coupon[] = [];

export let stats = {
  totalItems: 0,
  totalRevenue: 0,
  totalDiscount: 0
};