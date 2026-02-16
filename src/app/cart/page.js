
"use client";

import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";
import "./cart.css";

export default function CartPage() {
  const { cartItems, removeFromCart } = useCart();

  const handleRemove = (id) => {
    removeFromCart(id);
    toast.success("Item removed from cart",
       {
    className: `border-path-toast run-${Date.now()}`, // 👈 key trick
    duration: 4000,
  }
    );
  };

  if (!cartItems || cartItems.length === 0) {
    return <h2 style={{ padding: "40px" }}>Cart is empty</h2>;
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>My Cart</h1>

      {cartItems.map((item) => (
        <div key={item._id} style={{ marginBottom: "16px" }}>
          <h3>{item.name}</h3>
          <p>Price: ₹ {item.price}</p>
          <p>Qty: {item.quantity}</p>

          <button onClick={() => handleRemove(item._id)}>
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}