import React, { useEffect, useState } from "react";
import { BASE_URL } from "../api";

type OrderItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
};

type Order = {
  id: string;
  items: OrderItem[];
  totalAmount: number;
  discountApplied: number;
  finalAmount: number;
};

const Admin = () => {
  const [stats, setStats] = useState<any>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [nth, setNth] = useState("");
  const [percent, setPercent] = useState("");
  const [activeTab, setActiveTab] = useState<"stats" | "coupons" | "orders">("stats");
  const [loading, setLoading] = useState(false);

  console.log("orders", orders);

  // 🔹 Fetch stats
  const fetchStats = async () => {
    try {
      const res = await fetch(`${BASE_URL}/admin/stats`);
      const data = await res.json();
      setStats(data);
    } catch {
      alert("Failed to load stats ❌");
    }
  };

  // 🔹 Fetch orders
  const fetchOrders = async () => {
    try {
      const res = await fetch(`${BASE_URL}/cart/orders`);
      const data = await res.json();

      // ✅ FIX: extract array properly
      setOrders(data.orders || []);
    } catch {
      alert("Failed to load orders ❌");
    }
  };

  useEffect(() => {
    fetchStats();
    fetchOrders();
  }, []);

  // 🔹 Update config
  const updateConfig = async () => {
    if (!nth || !percent || Number(nth) <= 0 || Number(percent) <= 0) {
      alert("Enter valid values ❌");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${BASE_URL}/admin/update-config`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nthOrder: Number(nth),
          discountPercent: Number(percent),
        }),
      });

      if (!res.ok) throw new Error();

      alert("Config Updated ✅");
      setNth("");
      setPercent("");
      fetchStats();
    } catch {
      alert("Failed to update config ❌");
    } finally {
      setLoading(false);
    }
  };

  const safeOrders = Array.isArray(orders) ? orders : [];

  return (
    <div className="card">
      <h2>Admin Panel</h2>

      {/* 🔥 Tabs */}
      <div className="tabs">
        <button
          className={activeTab === "stats" ? "active-tab" : ""}
          onClick={() => setActiveTab("stats")}
        >
          Stats
        </button>

        <button
          className={activeTab === "coupons" ? "active-tab" : ""}
          onClick={() => setActiveTab("coupons")}
        >
          Coupons
        </button>

        <button
          className={activeTab === "orders" ? "active-tab" : ""}
          onClick={() => setActiveTab("orders")}
        >
          Orders
        </button>
      </div>

      {/* Discount Config */}
      <h3>Discount Config</h3>

      {stats?.discountConfig && (
        <div style={{ marginBottom: "10px" }}>
          <p>
            <strong>Nth Order:</strong> {stats.discountConfig.nthOrder}
          </p>
          <p>
            <strong>Discount:</strong> {stats.discountConfig.discountPercent}%
          </p>
        </div>
      )}

      <input
        placeholder="Nth Order"
        value={nth}
        onChange={(e) => setNth(e.target.value)}
      />

      <input
        placeholder="Discount %"
        value={percent}
        onChange={(e) => setPercent(e.target.value)}
      />

      <button onClick={updateConfig} disabled={loading || !nth || !percent}>
        {loading ? "Updating..." : "Update Config"}
      </button>

      <hr style={{ margin: "20px 0" }} />

      {/* ================= STATS TAB ================= */}
      {activeTab === "stats" && stats && (
        <div>
          <h3>Stats</h3>
          <p>Total Orders: {stats.totalOrders}</p>
          <p>Total Items Sold: {stats.totalItemsSold}</p>
          <p>Total Revenue: ₹{stats.totalRevenue}</p>
          <p>Total Discount Given: ₹{stats.totalDiscountGiven}</p>
        </div>
      )}

      {/* ================= COUPONS TAB ================= */}
      {activeTab === "coupons" && stats && (
        <div>
          <h3>Coupons</h3>

          {stats.coupons?.length === 0 ? (
            <p>No coupons available</p>
          ) : (
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Discount %</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {stats.coupons?.map((c: any) => (
                  <tr key={c.code}>
                    <td>{c.code}</td>
                    <td>{c.discountPercent}</td>
                    <td>{c.isUsed ? "Used ❌" : "Active ✅"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* ================= ORDERS TAB ================= */}
      {activeTab === "orders" && (
        <div>
          <h3>Orders</h3>

          {orders.length === 0 ? (
            <p>No orders available</p>
          ) : (
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Total</th>
                  <th>Discount</th>
                  <th>Final</th>
                </tr>
              </thead>

              <tbody>
                {safeOrders.map((o) => (
                  <tr key={o.id}>
                    <td>{o.id}</td>
                    <td>₹{o.totalAmount}</td>
                    <td>₹{o.discountApplied}</td>
                    <td>₹{o.finalAmount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default Admin;