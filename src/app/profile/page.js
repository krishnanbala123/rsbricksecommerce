// "use client";

// import { useAuth } from "@/context/AuthContext";
// import { useWishlist } from "@/context/WishlistContext";
// import { updateProfile } from "firebase/auth";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast"; 
// import "./profile.css";

// export default function ProfilePage() {
//   const { user } = useAuth();
//   const { wishlist } = useWishlist();

//   const [tab, setTab] = useState("profile");
//   const [orders, setOrders] = useState([]);
//   const [editMode, setEditMode] = useState(false);

//   const [photo, setPhoto] = useState(null);
//   const [preview, setPreview] = useState("/avatar.png");

//   const [form, setForm] = useState({
//     name: "",
//     phone: "",
//     dob: "",
//     address: "",
//   });

//   /* ===============================
//      LOAD PROFILE (AUTH + DB)
//   =============================== */
//   useEffect(() => {
//     if (!user) return;

//     fetch(`/api/users?uid=${user.uid}`)
//       .then(async (res) => {
//         if (!res.ok) return null;
//         return res.json();
//       })
//       .then((data) => {
//         const dbUser = data?.user;

//         setForm({
//           name: user.displayName || dbUser?.name || "",
//           phone: dbUser?.phone || "",
//           dob: dbUser?.dob || "",
//           address: dbUser?.address || "",
//         });

//         setPreview(
//           user.photoURL || dbUser?.photoURL || "/avatar.png"
//         );
//       })
//       .catch(console.error);
//   }, [user]);

//   /* ===============================
//      LOAD ORDERS
//   =============================== */
//   useEffect(() => {
//     if (tab === "orders" && user?.uid) {
//       fetch("/api/my-orders", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ uid: user.uid }), // Firebase UID
//       })
//         .then(res => res.json())
//         .then(data => setOrders(data || []))
//         .catch(console.error);
//     }
//   }, [tab, user]);

//   console.log("orders",orders)
  

//   /* ===============================
//      SAVE PROFILE
//   =============================== */
//   const saveProfile = async () => {
//     let photoURL = preview;

//     if (photo) {
//       const fd = new FormData();
//       fd.append("file", photo);

//       const res = await fetch("/api/upload/profile-photo", {
//         method: "POST",
//         body: fd,
//       });

//       const data = await res.json();
//       photoURL = data.url;
//     }

//     await fetch("/api/profile/update", {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         uid: user.uid,
//         name: form.name,
//         phone: form.phone,
//         dob: form.dob,
//         address: form.address,
//         photoURL,
//       }),
//     });

//     await updateProfile(user, {
//       displayName: form.name,
//       photoURL,
//     });

//     setEditMode(false);
//     alert("Profile updated ✅");
//   };

//   if (!user) return null;

//   return (
//     <div className="profile-layout">
//       {/* SIDEBAR */}
//       <aside className="profile-sidebar">
//         <button
//           onClick={() => setTab("profile")}
//           className={tab === "profile" ? "active" : ""}
//         >
//           My Profile
//         </button>

//         <button
//           onClick={() => setTab("orders")}
//           className={tab === "orders" ? "active" : ""}
//         >
//           Orders
//         </button>

//         <button
//           onClick={() => setTab("wishlist")}
//           className={tab === "wishlist" ? "active" : ""}
//         >
//           Wishlist
//         </button>
//       </aside>

//       {/* CONTENT */}
//       <div className="profile-content">
//         {/* ================= PROFILE ================= */}
//         {tab === "profile" && (
//           <div className="profile-box">
//             {/* PROFILE IMAGE */}
//             {/* <img
//               src={preview}
//               className="profile-avatar"
//               onClick={() => {
//                 if (editMode) {
//                   document.getElementById("photoInput").click();
//                 }
//               }}
//               style={{
//                 cursor: editMode ? "pointer" : "default",
//               }}
//             /> */}

//             <div className="profile-avatar-wrapper">
//   <img src={preview} className="profile-avatar" />

//   {editMode && (
//     <div
//       className="profile-avatar-camera"
//       onClick={() =>
//         document.getElementById("photoInput").click()
//       }
//     >
//       📷
//     </div>
//   )}
// </div>


//             {editMode && (
//               <input
//                 id="photoInput"
//                 type="file"
//                 hidden
//                 onChange={(e) => {
//                   const file = e.target.files[0];
//                   if (!file) return;
//                   setPhoto(file);
//                   setPreview(URL.createObjectURL(file));
//                 }}
//               />
//             )}

//             {/* VIEW MODE */}
//             {!editMode && (
//               <>
//                 <h2 className="profile-name">{form.name}</h2>
//                 <p className="profile-email">{user.email}</p>

//                 <div className="profile-details">
//                   <p>
//                     <strong>Phone:</strong>{" "}
//                     {form.phone || "Not provided"}
//                   </p>
//                   <p>
//                     <strong>Date of Birth:</strong>{" "}
//                     {form.dob || "Not provided"}
//                   </p>
//                   <p>
//                     <strong>Address:</strong>{" "}
//                     {form.address || "Not provided"}
//                   </p>
//                 </div>

//                 <button onClick={() => setEditMode(true)}>
//                   Edit Profile
//                 </button>
//               </>
//             )}

//             {/* EDIT MODE */}
//             {editMode && (
//               <>
//                 <input
//                   placeholder="Name"
//                   value={form.name}
//                   onChange={(e) =>
//                     setForm({ ...form, name: e.target.value })
//                   }
//                 />

//                 <input value={user.email} disabled />

//                 <input
//                   placeholder="Phone"
//                   value={form.phone}
//                   onChange={(e) =>
//                     setForm({ ...form, phone: e.target.value })
//                   }
//                 />

//                 <input
//                   type="date"
//                   value={form.dob}
//                   onChange={(e) =>
//                     setForm({ ...form, dob: e.target.value })
//                   }
//                 />

//                 <textarea
//                   placeholder="Address"
//                   value={form.address}
//                   onChange={(e) =>
//                     setForm({ ...form, address: e.target.value })
//                   }
//                 />

//                 <button onClick={saveProfile}>
//                   Save Changes
//                 </button>
//               </>
//             )}
//           </div>
//         )}

//         {/* ================= ORDERS ================= */}
//         {/* {tab === "orders" && (
//           <table className="orders-table">
//             <thead>
//               <tr>
//                 <th>ID</th>
//                 <th>Qty</th>
//                 <th>Total</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orders.map((o) => (
//                 <tr key={o._id}>
//                   <td>{o.orderId}</td>
//                   <td>{o.noOfBricks}</td>
//                   <td>₹{o.totalAmount}</td>
//                   <td>{o.paymentStatus}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )} */}

//         {/* {tab === "orders" && (
//   <table className="orders-table">
//     <thead>
//       <tr>
//         <th>Order ID</th>
//         <th>Qty</th>
//         <th>Total</th>
//         <th>Status</th>
//       </tr>
//     </thead>
//     <tbody>
//       {orders.length === 0 ? (
//         <tr>
//           <td colSpan="4">No orders found</td>
//         </tr>
//       ) : (
//         orders.map(o => (
//           <tr key={o._id}>
//             <td>{o._id.slice(-6)}</td>
//             <td>
//               {o.items.reduce((s,i)=>s+i.qty,0)}
//             </td>
//             <td>₹ {o.totalAmount}</td>
//             <td>{o.paymentStatus}</td>
//           </tr>
//         ))
//       )}
//     </tbody>
//   </table>
// )} */}

// {tab === "orders" && (
//   <table className="orders-table">
//     <thead>
//       <tr>
//         <th>Order ID</th>
//         <th>Type</th>
//         <th>Qty</th>
//         <th>Total</th>
//         <th>Status</th>
//       </tr>
//     </thead>

//     <tbody>
//       {orders.length === 0 ? (
//         <tr>
//           <td colSpan="5">No orders found</td>
//         </tr>
//       ) : (
//         orders.map((o) => {
//           const totalQty = o.items?.reduce(
//             (sum, i) => sum + (i.quantity || 0),
//             0
//           );

//           const types = [
//             ...new Set(o.items?.map(i => i.type))
//           ].join(", ");

//           return (
//             <tr key={o._id}>
//               <td>{o._id.slice(-6)}</td>
//               <td>{types}</td>
//               <td>{totalQty}</td>
//               <td>₹ {o.totalAmount}</td>
//               <td>{o.paymentStatus}</td>
//             </tr>
//           );
//         })
//       )}
//     </tbody>
//   </table>
// )}



//         {/* ================= WISHLIST ================= */}
//         {/* {tab === "wishlist" && (
//           <div className="wishlist-grid">
//             {wishlist.map((p) => (
//               <div key={p._id} className="wishlist-card">
//                 <img src={p.image?.url} />
//                 <h4>{p.name}</h4>
//                 <p>₹ {p.price}</p>
//               </div>
//             ))}
//           </div>
//         )} */}

//         {tab === "wishlist" && (
//   <div className="wishlist-grid">
//     {wishlist.length === 0 ? (
//       <p>No wishlist items</p>
//     ) : (
//       wishlist.map((p) => (
//         <div key={p._id} className="wishlist-card">
          
//           {/* ❌ REMOVE ICON */}
//           {/* <button
//             className="wishlist-remove"
//             onClick={() => removeFromWishlist(p._id)}
//           >
//             ✕
//           </button> */}

//           <img src={p.image?.url || "/no-image.png"} />
//           <h4>{p.name}</h4>
//           <h3>{p.type}</h3>
//           <p>₹ {p.price}</p>
//         </div>
//       ))
//     )}
//   </div>
// )}


//       </div>
//     </div>
//   );
// }



"use client";

import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";
import { updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";   // ✅ TOAST ADDED
import "./profile.css";

export default function ProfilePage() {
  const { user } = useAuth();
  const { wishlist } = useWishlist();

  const [tab, setTab] = useState("profile");
  const [orders, setOrders] = useState([]);
  const [editMode, setEditMode] = useState(false);

  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState("/avatar.png");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    dob: "",
    address: "",
  });

  /* ===============================
     LOAD PROFILE
  =============================== */
  useEffect(() => {
    if (!user) return;

    fetch(`/api/users?uid=${user.uid}`)
      .then(async (res) => {
        if (!res.ok) return null;
        return res.json();
      })
      .then((data) => {
        const dbUser = data?.user;

        setForm({
          name: user.displayName || dbUser?.name || "",
          phone: dbUser?.phone || "",
          dob: dbUser?.dob || "",
          address: dbUser?.address || "",
        });

        setPreview(
          user.photoURL || dbUser?.photoURL || "/avatar.png"
        );
      })
      .catch(console.error);
  }, [user]);

  /* ===============================
     LOAD ORDERS
  =============================== */
  useEffect(() => {
    if (tab === "orders" && user?.uid) {
      fetch("/api/my-orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ uid: user.uid }),
      })
        .then(res => res.json())
        .then(data => setOrders(data || []))
        .catch(console.error);
    }
  }, [tab, user]);

  /* ===============================
     SAVE PROFILE
  =============================== */
  const saveProfile = async () => {
    try {
      let photoURL = preview;

      if (photo) {
        const fd = new FormData();
        fd.append("file", photo);

        const res = await fetch("/api/upload/profile-photo", {
          method: "POST",
          body: fd,
        });

        const data = await res.json();
        photoURL = data.url;
      }

      await fetch("/api/profile/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: user.uid,
          name: form.name,
          phone: form.phone,
          dob: form.dob,
          address: form.address,
          photoURL,
        }),
      });

      await updateProfile(user, {
        displayName: form.name,
        photoURL,
      });

      setEditMode(false);

      toast.success("Profile updated successfully", {
        className: `border-path-toast run-${Date.now()}`,
        duration: 4000,
      });

    } catch (err) {
      console.error(err);
      toast.error("Profile update failed", {
        className: `border-path-toast1 run-${Date.now()}`,
        duration: 4000,
      });
    }
  };

  if (!user) return null;

  return (
    <div className="profile-layout">
      {/* SIDEBAR */}
      <aside className="profile-sidebar">
        <button
          onClick={() => setTab("profile")}
          className={tab === "profile" ? "active" : ""}
        >
          My Profile
        </button>

        <button
          onClick={() => setTab("orders")}
          className={tab === "orders" ? "active" : ""}
        >
          Orders
        </button>

        <button
          onClick={() => setTab("wishlist")}
          className={tab === "wishlist" ? "active" : ""}
        >
          Wishlist
        </button>
      </aside>

      {/* CONTENT */}
      <div className="profile-content">

        {/* ================= PROFILE ================= */}
        {tab === "profile" && (
          <div className="profile-box">

            <div className="profile-avatar-wrapper">
              <img src={preview} className="profile-avatar" />

              {editMode && (
                <div
                  className="profile-avatar-camera"
                  onClick={() =>
                    document.getElementById("photoInput").click()
                  }
                >
                  📷
                </div>
              )}
            </div>

            {editMode && (
              <input
                id="photoInput"
                type="file"
                hidden
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  setPhoto(file);
                  setPreview(URL.createObjectURL(file));
                }}
              />
            )}

            {!editMode && (
              <>
                <h2 className="profile-name">{form.name}</h2>
                <p className="profile-email">{user.email}</p>

                <div className="profile-details">
                  <p><strong>Phone:</strong> {form.phone || "Not provided"}</p>
                  <p><strong>Date of Birth:</strong> {form.dob || "Not provided"}</p>
                  <p><strong>Address:</strong> {form.address || "Not provided"}</p>
                </div>

                <button onClick={() => setEditMode(true)}>
                  Edit Profile
                </button>
              </>
            )}

            {editMode && (
              <>
                <input
                  placeholder="Name"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                />

                <input value={user.email} disabled />

                <input
                  placeholder="Phone"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                />

                <input
                  type="date"
                  value={form.dob}
                  onChange={(e) =>
                    setForm({ ...form, dob: e.target.value })
                  }
                />

                <textarea
                  placeholder="Address"
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                />

                <button onClick={saveProfile}>
                  Save Changes
                </button>
              </>
            )}
          </div>
        )}

        {/* ================= ORDERS ================= */}
        {tab === "orders" && (
          <div className="orders-wrapper">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Type</th>
                <th>Qty</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="5">No orders found</td>
                </tr>
              ) : (
                orders.map((o) => {
                  const totalQty = o.items?.reduce(
                    (sum, i) => sum + (i.quantity || 0),
                    0
                  );

                  const types = [
                    ...new Set(o.items?.map(i => i.type))
                  ].join(", ");

                  return (
                    <tr key={o._id}>
                      <td>{o._id.slice(-6)}</td>
                      <td>{types}</td>
                      <td>{totalQty}</td>
                      <td>₹ {o.totalAmount}</td>
                      <td>{o.paymentStatus}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
          </div>
        )}

        {/* ================= WISHLIST ================= */}
        {tab === "wishlist" && (
          <div className="wishlist-grid">
            {wishlist.length === 0 ? (
              <p>No wishlist items</p>
            ) : (
              wishlist.map((p) => (
                <div key={p._id} className="wishlist-card">
                  <img src={p.image?.url || "/no-image.png"} />
                  <h4>{p.name}</h4>
                  <h3>{p.type}</h3>
                  <p>₹ {p.price}</p>
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
}
