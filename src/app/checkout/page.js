
"use client";

import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";   // ✅ ADD
import "./checkout.css";

// 🗺️ MAP (NO SSR)
const CheckoutMap = dynamic(
  () => import("@/components/map"),
  { ssr: false }
);

export default function CheckoutPage() {                                                                
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  console.log("user",user)
  const [orderPlaced, setOrderPlaced] = useState(false);

  // ✅ VALID ITEMS (>=500)
  const validItems = cartItems.filter(
    (item) => Number(item.quantity) >= 500
  );

  const grandTotal = validItems.reduce(
    (sum, item) => sum + item.price * Number(item.quantity),
    0
  );

  // 🔐 LOGIN GUARD
  useEffect(() => {
    if (!user) {
      router.push("/login?redirect=/checkout");
    }
  }, [user, router]);

  // 🛒 CART GUARD
  useEffect(() => {
    if (!orderPlaced && validItems.length === 0) {
      router.push("/shop");
    }
  }, [validItems, orderPlaced, router]);

  // 📋 FORM
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    lat: null,
    lng: null,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // 🔥 PLACE ORDER
  const handlePlaceOrder = async () => {
    if (
      !form.name ||
      !form.phone ||
      !form.address ||
      !form.lat ||
      !form.lng
    ) {
      toast.error("Please fill all details & select location",
        {
    className: `border-path-toast1 run-${Date.now()}`, // 👈 key trick
    duration: 4000,
  }
      );
      return;
    }

    setLoading(true);

    const payload = {
      name: form.name,
      phone: form.phone,
      email: user.email,
      deliveryAddress: form.address,
      location: {
        lat: form.lat,
        lng: form.lng,
      },
      items: validItems.map((item) => ({
        productId: item._id,
        type: item.type,
        quantity: Number(item.quantity),
        rate: Number(item.price),
        total: item.price * Number(item.quantity),
      })),
      totalAmount: Number(grandTotal),
    };

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.error || "Order failed",
          {
    className: `border-path-toast1 run-${Date.now()}`, // 👈 key trick
    duration: 4000,
  }
        );
        setLoading(false);
        return;
      }

      // ✅ SUCCESS
  //     toast.success("Order placed successfully",
  //       {
  //   className: `border-path-toast run-${Date.now()}`, // 👈 key trick
  //   duration: 4000,
  // }
  //     );
  //     setOrderPlaced(true);
  //     clearCart();

  //     setTimeout(() => {
  //       router.push("/order-success");
  //     }, 800);

  // ✅ SUCCESS
      toast.success("Order placed successfully", {
        className: `border-path-toast run-${Date.now()}`,
        duration: 4000,
      });

      // 🔔 CALL NOTIFY API
    const noti =  await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      setOrderPlaced(true);
      clearCart();

      setTimeout(() => {
        router.push("/order-success");
      }, 800);

    } catch (err) {
      console.error("PLACE ORDER ERROR:", err);
      toast.error("Server error. Try again ⚠️",
        {
    className: `border-path-toast1 run-${Date.now()}`, // 👈 key trick
    duration: 4000,
  }
      );
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      {/* HEADER */}
      <div className="checkout-header">
        <h2>Secure Checkout</h2>
        <p>Complete your brick order</p>
      </div>

      {/* LAYOUT */}
      <div className="checkout-layout">
        {/* LEFT */}
        <div className="checkout-panel slide-left">
          <h3>Customer Details</h3>

          <div className="field">
            <label>Name</label>
            <input name="name" value={form.name} onChange={handleChange} />
          </div>

          <div className="field">
            <label>Phone</label>
            <input name="phone" value={form.phone} onChange={handleChange} />
          </div>

          <div className="field">
            <label>Delivery Address</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
            />
          </div>

          <CheckoutMap
            value={form.lat && form.lng ? [form.lat, form.lng] : null}
            onChange={(latlng) =>
              setForm((prev) => ({
                ...prev,
                lat: latlng.lat,
                lng: latlng.lng,
              }))
            }
          />
        </div>

        {/* RIGHT */}
        <div className="checkout-panel slide-right">
          <h3>Order Summary</h3>

          {validItems.map((item) => (
            <div key={item._id} className="order-item">
              <div>
                <strong>{item.type}</strong>
                <span>
                  ₹ {item.price} × {item.quantity}
                </span>
              </div>
              <strong>
                ₹ {item.price * Number(item.quantity)}
              </strong>
            </div>
          ))}

          <div className="order-total">
            <span>Total Amount</span>
            <strong>₹ {grandTotal}</strong>
          </div>
        </div>
      </div>

      {/* ACTION */}
      <div className="checkout-action">
        <button disabled={loading} onClick={handlePlaceOrder}>
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </div>

      {/* LOADER */}
      {loading && (
        <div className="checkout-loader">
          <div className="spinner"></div>
          <p>Placing your order...</p>
        </div>
      )}
    </div>
  );
}
