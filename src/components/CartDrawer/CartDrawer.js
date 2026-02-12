// "use client";

// import { useCart } from "@/context/CartContext";
// import { useRouter } from "next/navigation";
// import "./cartDrawer.css";

// export default function CartDrawer() {
//   const {
//     cartItems,
//     removeFromCart,
//     updateQuantity,
//     validateQuantity,
//     isCartOpen,
//     closeCart,
//   } = useCart();

//   const router = useRouter();

//   // ✅ CART GRAND TOTAL (ONLY VALID ITEMS >= 2000)
//   const cartTotal = cartItems.reduce((sum, item) => {
//     const qty = Number(item.quantity);
//     if (!qty || qty < 500) return sum; // ❌ ignore invalid
//     return sum + item.price * qty;
//   }, 0);

//   return (
//     <>
//       {isCartOpen && (
//         <div className="cart-overlay" onClick={closeCart}></div>
//       )}

//       <div className={`cart-drawer ${isCartOpen ? "open" : ""}`}>
//         {/* HEADER */}
//         <div className="cart-header">
//           <h3>My Cart</h3>
//           <button onClick={closeCart}>✕</button>
//         </div>

//         {/* EMPTY STATE */}
//         {cartItems.length === 0 ? (
//           <div className="cart-empty">
//             <h4>Your cart is empty</h4>
//             <p>Minimum order starts from 500 bricks</p>
//             <button
//               className="shop-btn"
//               onClick={() => {
//                 closeCart();
//                 router.push("/shop");
//               }}
//             >
//               Go to Shop
//             </button>
//           </div>
//         ) : (
//           <>
//             {/* CART ITEMS */}
//             <div className="cart-items">
//               {cartItems.map((item) => {
//                 const qty = Number(item.quantity);
//                 const isValid = qty >= 500;

//                 return (
//                   <div key={item._id} className="cart-item-ui">
//                     {/* IMAGE */}
//                     <div className="cart-image">
//                       <img
//                         src={item.image?.url || "/bricks/default.jpg"}
//                         alt={item.name}
//                       />
//                     </div>

//                     {/* CONTENT */}
//                     <div className="cart-content">
//                       {/* TOP */}
//                       <div className="cart-row top">
//                         <h4>{item.type || "Solid Brick"}</h4>
//                         <span className="price">₹ {item.price}</span>
//                       </div>

//                       {/* QUANTITY */}
//                       <div className="cart-row middle">
//                         <label>Quantity</label>

//                         <input
//                           type="number"
//                           min="500"
//                           step="200"
//                           value={item.quantity}
//                           placeholder="500"
//                           inputMode="numeric"
//                           onChange={(e) =>
//                             updateQuantity(item._id, e.target.value)
//                           }
//                           onBlur={() => validateQuantity(item._id)}
//                           className={!isValid ? "qty-error-input" : ""}
//                         />

//                         {/* underline */}
//                         <div className="qty-divider"></div>

//                         {/* error / info */}
//                         {!isValid ? (
//                           <div className="qty-error">
//                             Minimum order is 500 bricks
//                           </div>
//                         ) : (
//                           <div className="min-text">
//                             Minimum order: 500 bricks
//                           </div>
//                         )}
//                       </div>

//                       {/* ITEM TOTAL */}
//                       <div className="cart-row bottom">
//                         <span>Total</span>
//                         {isValid ? (
//                           <strong>₹ {item.price * qty}</strong>
//                         ) : (
//                           <span className="total-disabled">—</span>
//                         )}
//                       </div>
//                     </div>

//                     {/* REMOVE */}
//                     <button
//                       className="remove-btn"
//                       onClick={() => removeFromCart(item._id)}
//                     >
//                       ✕
//                     </button>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* CART GRAND TOTAL (ONLY IF VALID ITEMS EXIST) */}
//             {cartTotal > 0 && (
//               <div className="cart-grand-total">
//                 <span>Total Amount</span>
//                 <strong>₹ {cartTotal}</strong>
//               </div>
//             )}

//             {/* CHECKOUT */}
//             <button
//               className="checkout-btn"
//               disabled={cartTotal === 0}
//               onClick={() => {
//                 closeCart();
//                 router.push("../checkout");
//               }}
//             >
//               Proceed to Checkout
//             </button>
//           </>
//         )}
//       </div>
//     </>
//   );
// }
"use client";

import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext"; // ✅ NEW
import { useRouter } from "next/navigation";
import "./cartDrawer.css";

export default function CartDrawer() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    validateQuantity,
    isCartOpen,
    closeCart,
  } = useCart();

  const { user } = useAuth(); // ✅ NEW
  const router = useRouter();

  // ✅ CART GRAND TOTAL (ONLY VALID ITEMS >= 500)
  const cartTotal = cartItems.reduce((sum, item) => {
    const qty = Number(item.quantity);
    if (!qty || qty < 500) return sum;
    return sum + item.price * qty;
  }, 0);

  // 🔐 CHECKOUT HANDLER (LOGIN REQUIRED)
  const handleCheckout = () => {
    closeCart();

    if (!user) {
      router.push("/login?redirect=/checkout");
      return;
    }

    router.push("/checkout");
  };

  return (
    <>
      {isCartOpen && (
        <div className="cart-overlay" onClick={closeCart}></div>
      )}

      <div className={`cart-drawer ${isCartOpen ? "open" : ""}`}>
        {/* HEADER */}
        <div className="cart-header">
          <h3>My Cart</h3>
          <button onClick={closeCart}>✕</button>
        </div>

        {/* EMPTY STATE */}
        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <h4>Your cart is empty</h4>
            <p>Minimum order starts from 500 bricks</p>
            <button
              className="shop-btn"
              onClick={() => {
                closeCart();
                router.push("/shop");
              }}
            >
              Go to Shop
            </button>
          </div>
        ) : (
          <>
            {/* CART ITEMS */}
            <div className="cart-items">
              {cartItems.map((item) => {
                const qty = Number(item.quantity);
                const isValid = qty >= 500;

                return (
                  <div key={item._id} className="cart-item-ui">
                    {/* IMAGE */}
                    <div className="cart-image">
                      <img
                        src={item.image?.url || "/bricks/default.jpg"}
                        alt={item.name}
                      />
                    </div>

                    {/* CONTENT */}
                    <div className="cart-content">
                      {/* TOP */}
                      <div className="cart-row top">
                        <h4>{item.type || "Solid Brick"}</h4>
                        <span className="price">₹ {item.price}</span>
                      </div>

                      {/* QUANTITY */}
                      <div className="cart-row middle">
                        <label>Quantity</label>

                        <input
                          type="number"
                          min="500"
                          step="200"
                          value={item.quantity}
                          placeholder="500"
                          inputMode="numeric"
                          onChange={(e) =>
                            updateQuantity(item._id, e.target.value)
                          }
                          onBlur={() => validateQuantity(item._id)}
                          className={!isValid ? "qty-error-input" : ""}
                        />

                        {/* underline */}
                        <div className="qty-divider"></div>

                        {/* error / info */}
                        {!isValid ? (
                          <div className="qty-error">
                            Minimum order is 500 bricks
                          </div>
                        ) : (
                          <div className="min-text">
                            Minimum order: 500 bricks
                          </div>
                        )}
                      </div>

                      {/* ITEM TOTAL */}
                      <div className="cart-row bottom">
                        <span>Total</span>
                        {isValid ? (
                          <strong>₹ {item.price * qty}</strong>
                        ) : (
                          <span className="total-disabled">—</span>
                        )}
                      </div>
                    </div>

                    {/* REMOVE */}
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item._id)}
                    >
                      ✕
                    </button>
                  </div>
                );
              })}
            </div>

            {/* CART GRAND TOTAL */}
            {cartTotal > 0 && (
              <div className="cart-grand-total">
                <span>Total Amount</span>
                <strong>₹ {cartTotal}</strong>
              </div>
            )}

            {/* CHECKOUT */}
            <button
              className="checkout-btn"
              disabled={cartTotal === 0}
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
          </>
        )}
      </div>
    </>
  );
}
