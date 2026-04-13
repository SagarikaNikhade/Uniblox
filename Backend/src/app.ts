import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';

import cartRoutes from "./routes/cart.routes";
import checkoutRoutes from "./routes/checkout.routes";
import adminRoutes from "./routes/admin.routes";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(cors());

// routes
app.use("/cart", cartRoutes);
app.use("/checkout", checkoutRoutes);
app.use("/admin", adminRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});