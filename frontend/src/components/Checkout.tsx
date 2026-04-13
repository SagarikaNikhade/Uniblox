import React, { useEffect, useState } from "react";
import { BASE_URL } from "../api";

const Checkout = ({ refreshCart }: any) => {
  const [couponCode, setCouponCode] = useState("");
  const [summary, setSummary] = useState<any>(null);
  const [message, setMessage] = useState("");
  const [coupons, setCoupons] = useState<any[]>([]);

  // 🔹 Fetch coupons
  useEffect(() => {
    fetch(`${BASE_URL}/admin/stats`)
      .then(res => res.json())
      .then(data => {
        const available = data.coupons.filter((c: any) => !c.isUsed);
        setCoupons(available);
      });
  }, []);

  // 🔹 Apply coupon
  const handleApplyCoupon = async () => {
    const res = await fetch(`${BASE_URL}/checkout/preview`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ couponCode })
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.message);
      setSummary(null);
      return;
    }

    setSummary(data);
    setMessage("Coupon applied ✅");
  };

  // 🔹 Checkout
  const handleCheckout = async () => {
    const res = await fetch(`${BASE_URL}/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ couponCode })
    });

    const data = await res.json();

    setMessage(
      data.coupon
        ? `🎉 Coupon earned: ${data.coupon.code}`
        : "Order placed successfully"
    );

    setCouponCode("");
    setSummary(null);
    refreshCart();
  };

  return (
    <div className="card">
      <h2>Checkout</h2>

      {/* 🔥 Coupon List (Flipkart Style) */}
      <div style={{ marginBottom: "10px" }}>
        <h4>Available Coupons</h4>

        {coupons.length === 0 ? (
          <p>No coupons available</p>
        ) : (
          coupons.map((c) => (
            <div
              key={c.code}
              style={{
                border: "1px dashed #2f80ed",
                padding: "8px",
                marginBottom: "5px",
                cursor: "pointer"
              }}
              onClick={() => setCouponCode(c.code)}
            >
              <strong>{c.code}</strong> - {c.discountPercent}% OFF
            </div>
          ))
        )}
      </div>

      {/* 🔹 Input */}
      <input
        placeholder="Enter Coupon Code"
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
      />

      {/* 🔥 Disable button logic */}
      <button
        onClick={handleApplyCoupon}
        disabled={!couponCode || coupons.length === 0}
      >
        Apply Coupon
      </button>

      {/* 🔥 Price Breakdown */}
      {summary && (
        <div style={{ marginTop: "15px" }}>
          <p>Total: ₹{summary.totalAmount}</p>
          <p>Discount: ₹{summary.discountApplied}</p>
          <h3>Final Amount: ₹{summary.finalAmount}</h3>
        </div>
      )}

      <button
        style={{ marginTop: "10px" }}
        onClick={handleCheckout}
      >
        Place Order
      </button>

      {message && <p style={{ marginTop: "10px" }}>{message}</p>}
    </div>
  );
};

export default Checkout;