import React, { useEffect, useState } from "react";
import { BASE_URL } from "../api";

const Admin = () => {
  const [discount, setDiscount] = useState("");
  const [stats, setStats] = useState<any>(null);
  const [orders, setOrders] = useState<any>([]);
  const [nth, setNth] = useState("");
  const [percent, setPercent] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"stats" | "coupons" | "orders">("stats");

  // 🔹 Fetch stats
  const fetchStats = async () => {
    try {
      const res = await fetch(`${BASE_URL}/admin/stats`);
      const data = await res.json();
      setStats(data);
    } catch (err) {
      alert("Failed to load stats ❌");
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch(`${BASE_URL}/cart/orders`);
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      alert("Failed to load stats ❌");
    }
  };

  useEffect(() => {
    fetchStats();
    fetchOrders();
  }, []);

  // 🔹 Generate coupon manually
  const generateCoupon = async () => {
    if (!discount || Number(discount) <= 0) {
      alert("Enter valid discount ❌");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${BASE_URL}/admin/generate-coupon`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          discountPercent: Number(discount)
        })
      });

      const data = await res.json();

      if (!res.ok) throw new Error();

      alert(`Coupon Created: ${data?.coupon?.code}`);
      setDiscount("");
      fetchStats();
    } catch {
      alert("Failed to generate coupon ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Admin Panel</h2>

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

      {/* 🔥 Current Config */}
      {stats?.discountConfig && (
        <div style={{ marginBottom: "15px" }}>
          <p><strong>Current Nth Order:</strong> {stats.discountConfig.nthOrder}</p>
          <p><strong>Current Discount:</strong> {stats.discountConfig.discountPercent}%</p>
        </div>
      )}

      {/* 🔥 Generate Coupon */}
      <h3>Generate Coupon</h3>

      <input
        placeholder="Discount %"
        value={discount}
        onChange={(e) => setDiscount(e.target.value)}
      />

      <button
        onClick={generateCoupon}
        disabled={loading || !discount}
      >
        {loading ? "Processing..." : "Generate Coupon"}
      </button>

      {/* 🔥 Stats */}
     


      {/* 🔥 Stats Tab */}
{activeTab === "stats" && stats && (
  <div style={{ marginTop: "20px" }}>
    <h3>Stats</h3>

    <p>Total Orders: {stats.totalOrders}</p>
    <p>Total Items Sold: {stats.totalItemsSold}</p>
    <p>Total Revenue: ₹{stats.totalRevenue}</p>
    <p>Total Discount Given: ₹{stats.totalDiscountGiven}</p>
  </div>
)}

{/* 🔥 Coupons Tab */}
{activeTab === "coupons" && stats && (
  <div style={{ marginTop: "20px" }}>
    <h3>Coupons</h3>

    {stats.coupons.length === 0 ? (
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
          {stats.coupons.map((c: any) => (
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

{/* 🔥 Orders Tab */}
{activeTab === "orders" && (
  <div style={{ marginTop: "20px" }}>
    <h3>Orders</h3>

    {orders?.orders?.length === 0 ? (
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
          {orders?.orders?.map((o: any) => (
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