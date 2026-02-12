// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useCart } from "@/context/CartContext";

// export default function OrdersPage() {
//   const router = useRouter();
//   const { clearCart } = useCart();

//   /* ================= STATES ================= */
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [deliveryAddress, setDeliveryAddress] = useState("");
//   const [locationText, setLocationText] = useState("");
//   const [type, setType] = useState("");
//   const [noOfBricks, setNoOfBricks] = useState("");
//   const [brickRate, setBrickRate] = useState("");
//   const [paidAmount, setPaidAmount] = useState("");
//   const [showSummary, setShowSummary] = useState(false);
//   const [loading, setLoading] = useState(false);

//   /* ================= CALCULATIONS ================= */
//   const totalAmount =
//     Number(brickRate || 0) * Number(noOfBricks || 0);

//   const remainingAmount =
//     totalAmount - Number(paidAmount || 0);

//   /* ================= SHOW SUMMARY ================= */
//   const handleShowSummary = () => {
//     if (
//       !name ||
//       !phone ||
//       !deliveryAddress ||
//       !locationText ||
//       !type ||
//       !noOfBricks ||
//       !brickRate
//     ) {
//       alert("Please fill all required details");
//       return;
//     }

//     if (remainingAmount < 0) {
//       alert("Paid amount cannot be more than total amount");
//       return;
//     }

//     setShowSummary(true);
//   };

//   /* ================= PLACE ORDER ================= */
//   const placeOrder = async () => {
//     try {
//       setLoading(true);

//       const res = await fetch("/api/orders", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name,
//           phone,
//           deliveryAddress,

//           location: {
//             text: locationText,
//           },

//           type,
//           noOfBricks: Number(noOfBricks),
//           brickRate: Number(brickRate),

//           totalAmount,
//           paidAmount: Number(paidAmount || 0),
//           remainingAmount,

//           paymentStatus:
//             Number(paidAmount) >= totalAmount
//               ? "completed"
//               : "pending",
//         }),
//       });

//       if (!res.ok) throw new Error("Order failed");

//       clearCart();
//       router.push("/order-success");
//     } catch (err) {
//       alert("Order failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* ================= UI ================= */
//   return (
//     <div style={styles.page}>
//       <h1>Place Order</h1>

//       <div style={styles.container}>
//         {/* ================= CUSTOMER DETAILS ================= */}
//         <div style={styles.left}>
//           <h3>Customer Details</h3>

//           <input
//             style={styles.input}
//             placeholder="Customer Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />

//           <input
//             style={styles.input}
//             placeholder="Phone Number"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//           />

//           <textarea
//             style={styles.textarea}
//             placeholder="Delivery Address"
//             value={deliveryAddress}
//             onChange={(e) =>
//               setDeliveryAddress(e.target.value)
//             }
//           />

//           <input
//             style={styles.input}
//             placeholder="Location"
//             value={locationText}
//             onChange={(e) => setLocationText(e.target.value)}
//           />

//           <input
//             style={styles.input}
//             placeholder="Brick Type (e.g. Cement Bricks)"
//             value={type}
//             onChange={(e) => setType(e.target.value)}
//           />

//           <input
//             style={styles.input}
//             type="number"
//             placeholder="No of Bricks"
//             value={noOfBricks}
//             onChange={(e) => setNoOfBricks(e.target.value)}
//           />

//           <input
//             style={styles.input}
//             type="number"
//             placeholder="Rate per Brick"
//             value={brickRate}
//             onChange={(e) => setBrickRate(e.target.value)}
//           />

//           {/* <input
//             style={styles.input}
//             type="number"
//             placeholder="Paid Amount (Advance)"
//             value={paidAmount}
//             onChange={(e) => setPaidAmount(e.target.value)}
//           /> */}

//           {!showSummary && (
//             <button
//               style={styles.nextBtn}
//               onClick={handleShowSummary}
//             >
//               View Order Summary
//             </button>
//           )}
//         </div>

//         {/* ================= ORDER SUMMARY ================= */}
//         {showSummary && (
//           <div style={styles.right}>
//             <h3>Order Summary</h3>

//             <SummaryRow label="Name" value={name} />
//             <SummaryRow label="Phone" value={phone} />
//             <SummaryRow label="Address" value={deliveryAddress} />
//             <SummaryRow label="Location" value={locationText} />
//             <SummaryRow label="Brick Type" value={type} />
//             <SummaryRow label="No of Bricks" value={noOfBricks} />
//             <SummaryRow
//               label="Rate / Brick"
//               value={`₹ ${brickRate}`}
//             />
//             <SummaryRow
//               label="Total Amount"
//               value={`₹ ${totalAmount}`}
//             />
//             <SummaryRow
//               label="Paid Amount"
//               value={`₹ ${paidAmount || 0}`}
//             />

//             <hr />

//             <SummaryRow
//               label="Remaining Amount"
//               value={`₹ ${remainingAmount}`}
//               strong
//             />

//             <button
//               style={styles.placeBtn}
//               onClick={placeOrder}
//               disabled={loading}
//             >
//               {loading ? "Placing Order..." : "Confirm Order"}
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// /* ================= SUMMARY ROW ================= */
// function SummaryRow({ label, value, strong }) {
//   return (
//     <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontWeight: strong ? "600" : "400" }}>
//       <span>{label}</span>
//       <span>{value}</span>
//     </div>
//   );
// }

// /* ================= STYLES ================= */

// const styles = {
//   page: {
//     padding: "40px",
//     maxWidth: "1100px",
//     margin: "auto",
//   },
//   container: {
//     display: "grid",
//     gridTemplateColumns: "1fr 1fr",
//     gap: "30px",
//     marginTop: "20px",
//   },
//   left: {
//     border: "1px solid #eee",
//     padding: "20px",
//     borderRadius: "8px",
//   },
//   right: {
//     border: "1px solid #eee",
//     padding: "20px",
//     borderRadius: "8px",
//   },
//   input: {
//     width: "100%",
//     padding: "10px",
//     marginBottom: "10px",
//     border: "1px solid #ddd",
//   },
//   textarea: {
//     width: "100%",
//     padding: "10px",
//     minHeight: "70px",
//     marginBottom: "10px",
//     border: "1px solid #ddd",
//   },
//   nextBtn: {
//     width: "100%",
//     padding: "12px",
//     background: "#f5f5f5",
//     border: "1px solid #ccc",
//     cursor: "pointer",
//   },
//   placeBtn: {
//     width: "100%",
//     padding: "12px",
//     background: "#000",
//     color: "#fff",
//     border: "none",
//     cursor: "pointer",
//     marginTop: "15px",
//   },
// };



"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";   // ✅ ADD
import "./orders.css"

export default function OrdersPage() {
  const router = useRouter();
  const { clearCart } = useCart();

  /* ================= STATES ================= */
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [locationText, setLocationText] = useState("");
  const [type, setType] = useState("");
  const [noOfBricks, setNoOfBricks] = useState("");
  const [brickRate, setBrickRate] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [showSummary, setShowSummary] = useState(false);
  const [loading, setLoading] = useState(false);

  /* ================= CALCULATIONS ================= */
  const totalAmount =
    Number(brickRate || 0) * Number(noOfBricks || 0);

  const remainingAmount =
    totalAmount - Number(paidAmount || 0);

  /* ================= SHOW SUMMARY ================= */
  const handleShowSummary = () => {
    if (
      !name ||
      !phone ||
      !deliveryAddress ||
      !locationText ||
      !type ||
      !noOfBricks ||
      !brickRate
    ) {
      toast.error("Please fill all required details",
             {
    className: `border-path-toast1 run-${Date.now()}`, // 👈 key trick
    duration: 4000,
  }
      );
      return;
    }

    if (remainingAmount < 0) {
      toast.error("Paid amount cannot exceed total amount 💸",
             {
    className: `border-path-toast1 run-${Date.now()}`, // 👈 key trick
    duration: 4000,
  }
      );
      return;
    }

    toast.success("Order summary ready ✅",
           {
    className: `border-path-toast run-${Date.now()}`, // 👈 key trick
    duration: 4000,
  }
    );
    setShowSummary(true);
  };

  /* ================= PLACE ORDER ================= */
  const placeOrder = async () => {
    try {
      setLoading(true);
      toast.loading("Placing order...", { id: "place-order" });

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          deliveryAddress,
          location: { text: locationText },
          type,
          noOfBricks: Number(noOfBricks),
          brickRate: Number(brickRate),
          totalAmount,
          paidAmount: Number(paidAmount || 0),
          remainingAmount,
          paymentStatus:
            Number(paidAmount) >= totalAmount
              ? "completed"
              : "pending",
        }),
      });

      if (!res.ok) throw new Error("Order failed");

      // toast.success("Order placed successfully 🎉", {
      //   id: "place-order",
      // });

      clearCart();

      setTimeout(() => {
        router.push("/order-success");
      }, 700);

    } catch (err) {
      console.error(err);
      toast.error("Order failed. Please try again",
        {
    className: `border-path-toast1 run-${Date.now()}`, // 👈 key trick
    duration: 4000,
  }
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div style={styles.page}>
      <h1>Place Order</h1>

      <div style={styles.container}>
        {/* ================= CUSTOMER DETAILS ================= */}
        <div style={styles.left}>
          <h3>Customer Details</h3>

          <input
            style={styles.input}
            placeholder="Customer Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            style={styles.input}
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <textarea
            style={styles.textarea}
            placeholder="Delivery Address"
            value={deliveryAddress}
            onChange={(e) =>
              setDeliveryAddress(e.target.value)
            }
          />

          <input
            style={styles.input}
            placeholder="Location"
            value={locationText}
            onChange={(e) => setLocationText(e.target.value)}
          />

          <input
            style={styles.input}
            placeholder="Brick Type (e.g. Cement Bricks)"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />

          <input
            style={styles.input}
            type="number"
            placeholder="No of Bricks"
            value={noOfBricks}
            onChange={(e) => setNoOfBricks(e.target.value)}
          />

          <input
            style={styles.input}
            type="number"
            placeholder="Rate per Brick"
            value={brickRate}
            onChange={(e) => setBrickRate(e.target.value)}
          />

          {!showSummary && (
            <button
              style={styles.nextBtn}
              onClick={handleShowSummary}
            >
              View Order Summary
            </button>
          )}
        </div>

        {/* ================= ORDER SUMMARY ================= */}
        {showSummary && (
          <div style={styles.right}>
            <h3>Order Summary</h3>

            <SummaryRow label="Name" value={name} />
            <SummaryRow label="Phone" value={phone} />
            <SummaryRow label="Address" value={deliveryAddress} />
            <SummaryRow label="Location" value={locationText} />
            <SummaryRow label="Brick Type" value={type} />
            <SummaryRow label="No of Bricks" value={noOfBricks} />
            <SummaryRow
              label="Rate / Brick"
              value={`₹ ${brickRate}`}
            />
            <SummaryRow
              label="Total Amount"
              value={`₹ ${totalAmount}`}
            />
            <SummaryRow
              label="Paid Amount"
              value={`₹ ${paidAmount || 0}`}
            />

            <hr />

            <SummaryRow
              label="Remaining Amount"
              value={`₹ ${remainingAmount}`}
              strong
            />

            <button
              style={styles.placeBtn}
              onClick={placeOrder}
              disabled={loading}
            >
              {loading ? "Placing Order..." : "Confirm Order"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ================= SUMMARY ROW ================= */
function SummaryRow({ label, value, strong }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "8px",
        fontWeight: strong ? "600" : "400",
      }}
    >
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

/* ================= STYLES ================= */
const styles = {
  page: {
    padding: "40px",
    maxWidth: "1100px",
    margin: "auto",
  },
  container: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "30px",
    marginTop: "20px",
  },
  left: {
    border: "1px solid #eee",
    padding: "20px",
    borderRadius: "8px",
  },
  right: {
    border: "1px solid #eee",
    padding: "20px",
    borderRadius: "8px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ddd",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    minHeight: "70px",
    marginBottom: "10px",
    border: "1px solid #ddd",
  },
  nextBtn: {
    width: "100%",
    padding: "12px",
    background: "#f5f5f5",
    border: "1px solid #ccc",
    cursor: "pointer",
  },
  placeBtn: {
    width: "100%",
    padding: "12px",
    background: "#000",
    color: "#fff",
    border: "none",
    cursor: "pointer",
    marginTop: "15px",
  },
};


