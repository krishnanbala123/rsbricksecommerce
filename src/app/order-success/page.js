"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import "./success.css";

export default function OrderSuccessPage() {
  const router = useRouter()

  return (
    <div className="order-success-page">
      <div className="success-card">
        {/* CHECK ICON */}
        <div className="success-icon">✓</div>

        <h2>Order Placed Successfully</h2>

        <p className="success-text">
          Thank you for your order. <br />
          Our team will contact you shortly.
        </p>

        {/* ACTIONS */}
        <div className="success-actions">
          <button onClick={() => router.push("/shop")}>
            Continue Shopping
          </button>

          <button
            className="secondary"
            onClick={() => router.push("/")}
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}
