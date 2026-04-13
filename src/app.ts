import express from "express";
import cartRoutes from "./routes/cart.routes";
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());

// routes
app.use("/cart", cartRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});