// "use client";

// import { useSearchParams, useRouter } from "next/navigation";
// import { useEffect } from "react";
// import "./success.css";

// export default function OrderSuccessPage() {
//   const router = useRouter()

//   return (
//     <div className="order-success-page">
//       <div className="success-card">
//         {/* CHECK ICON */}
//         <div className="success-icon">✓</div>

//         <h2>Order Placed Successfully</h2>

//         <p className="success-text">
//           Thank you for your order. <br />
//           Our team will contact you shortly.
//         </p>

//         {/* ACTIONS */}
//         <div className="success-actions">
//           <button onClick={() => router.push("/shop")}>
//             Continue Shopping
//           </button>

//           <button
//             className="secondary"
//             onClick={() => router.push("/")}
//           >
//             Go to Home
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import { useRouter } from "next/navigation";
import "./success.css";

export default function OrderSuccessPage() {
  const router = useRouter();

  // temp order id (later backend la pass pannalam)
  const orderId = Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="order-success-page">

      <div className="success-card">

        {/* ICON */}
        <div className="success-icon-wrap">
          <div className="success-icon">✓</div>
        </div>

        <h2 className="title">Order Confirmed</h2>

        <p className="success-text">
          Thank you for choosing <strong>R.S Bricks</strong>.<br />
          Our team will contact you within <b>30 minutes</b>.
        </p>

        {/* ORDER ID */}
        <div className="order-id-box">
          <span>Your Order Number</span>
          <strong>#{orderId}</strong>
        </div>

        {/* INFO */}
        <div className="info-box">
          📞 Keep your phone reachable <br />
          🚚 Delivery arranged after confirmation call
        </div>

        {/* ACTION BUTTONS */}
        <div className="success-actions">
          <button className="primary" onClick={() => router.push("/shop")}>
            Continue Shopping
          </button>

          <button className="secondary" onClick={() => router.push("/")}>
            Go Home
          </button>
        </div>

      </div>
    </div>
  );
}
