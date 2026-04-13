import React, { useEffect, useState } from "react";
import AddToCart from "./components/AddToCart";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Admin from "./components/Admin";
import { BASE_URL } from "./api";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);
  const [activeTab, setActiveTab] = useState<"user" | "admin">("user");

  const fetchCart = async () => {
    const res = await fetch(`${BASE_URL}/cart`);
    const data = await res.json();
    setCart(data.cart);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div className="container">
      <h1>🛒 E-commerce Store</h1>

      {/* 🔥 Tabs */}
      <div className="tabs">
        <button
          className={activeTab === "user" ? "active-tab" : ""}
          onClick={() => setActiveTab("user")}
        >
          User
        </button>

        <button
          className={activeTab === "admin" ? "active-tab" : ""}
          onClick={() => setActiveTab("admin")}
        >
          Admin
        </button>
      </div>

      {/* 🔥 Tab Content */}
      {activeTab === "user" ? (
        <div className="main-layout">
          <div className="left">
            <AddToCart refreshCart={fetchCart} />
          </div>

          <div className="right">
            <Cart cart={cart} />
            <Checkout refreshCart={fetchCart} />
          </div>
        </div>
      ) : (
        <Admin />
      )}
    </div>
  );
}

export default App;