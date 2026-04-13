import React from "react";

const Cart = ({ cart }: any) => {
  const total = cart.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="card full-height">
      <h2>Cart</h2>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          <table className="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price (₹)</th>
                <th>Qty</th>
                <th>Total (₹)</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item: any) => (
                <tr key={item.productId}>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 style={{ marginTop: "10px" }}>
            Grand Total: ₹{total}
          </h3>
        </>
      )}
    </div>
  );
};

export default Cart;