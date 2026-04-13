import React, { useState } from "react";
import { BASE_URL } from "../api";

const AddToCart = ({ refreshCart }: any) => {
  const [form, setForm] = useState({
    productId: "",
    name: "",
    price: "",
    quantity: ""
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await fetch(`${BASE_URL}/cart/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
        quantity: Number(form.quantity)
      })
    });

    setForm({ productId: "", name: "", price: "", quantity: "" });
    refreshCart();
  };

  return (
    <div className="card full-height">
      <h2>Add Item</h2>

      <input name="productId" placeholder="Product ID" value={form.productId} onChange={handleChange} />
      <input name="name" placeholder="Product Name" value={form.name} onChange={handleChange} />
      <input name="price" placeholder="Price" value={form.price} onChange={handleChange} />
      <input name="quantity" placeholder="Quantity" value={form.quantity} onChange={handleChange} />

      <button onClick={handleSubmit}>Add to Cart</button>
    </div>
  );
};

export default AddToCart;