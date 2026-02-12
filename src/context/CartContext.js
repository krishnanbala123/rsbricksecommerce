// "use client";

// import { createContext, useContext, useState, useEffect } from "react";

// const CartContext = createContext();

// export function CartProvider({ children }) {

//   // 🔹 LOAD CART FROM LOCALSTORAGE
//   const [cartItems, setCartItems] = useState(() => {
//     if (typeof window !== "undefined") {
//       const stored = localStorage.getItem("cart");
//       if (!stored) return [];

//       // restore quantity from savedQuantity only
//       return JSON.parse(stored).map((item) => ({
//         ...item,
//         quantity: item.savedQuantity ?? "",
//       }));
//     }
//     return [];
//   });

//   const [isCartOpen, setIsCartOpen] = useState(false);

//   /**
//    * 🔥 SAVE TO LOCALSTORAGE
//    * - ALWAYS save product
//    * - saveQuantity ONLY if >= 2000
//    */
//   useEffect(() => {
//     const dataForStorage = cartItems.map((item) => {
//       const qty = Number(item.quantity);

//       return {
//         ...item,
//         savedQuantity: qty >= 2000 ? qty : item.savedQuantity ?? null,
//       };
//     });

//     localStorage.setItem("cart", JSON.stringify(dataForStorage));
//   }, [cartItems]);

//   // ➕ ADD TO CART
//   const addToCart = (product) => {
//     setCartItems((prev) => {
//       const exists = prev.find((i) => i._id === product._id);
//       if (exists) return prev;

//       return [
//         ...prev,
//         {
//           ...product,
//           quantity: "",
//           savedQuantity: null,
//         },
//       ];
//     });
//   };

//   // ✏️ UPDATE QUANTITY (UI ONLY)
//   const updateQuantity = (id, value) => {
//     setCartItems((prev) =>
//       prev.map((item) =>
//         item._id === id
//           ? { ...item, quantity: value }
//           : item
//       )
//     );
//   };

//   // 🔒 VALIDATE ON BLUR
//   const validateQuantity = (id) => {
//     setCartItems((prev) =>
//       prev.map((item) => {
//         if (item._id !== id) return item;

//         const qty = Number(item.quantity);

//         // ❌ below 2000 → do NOT save
//         if (!qty || qty < 2000) {
//           return { ...item, quantity: "" };
//         }

//         // ✅ valid
//         return {
//           ...item,
//           quantity: qty,
//           savedQuantity: qty,
//         };
//       })
//     );
//   };

//   // ❌ REMOVE ITEM
//   const removeFromCart = (id) => {
//     setCartItems((prev) => prev.filter((i) => i._id !== id));
//   };

//   // DRAWER CONTROLS
//   const openCart = () => setIsCartOpen(true);
//   const closeCart = () => setIsCartOpen(false);

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         addToCart,
//         updateQuantity,
//         validateQuantity,
//         removeFromCart,
//         cartCount: cartItems.length,
//         isCartOpen,
//         openCart,
//         closeCart,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }

// export const useCart = () => useContext(CartContext);


"use client";

import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false); // 🔥 KEY FLAG

  /* =========================
     LOAD FROM LOCAL STORAGE
     ========================= */
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("cart");
      if (stored) {
        try {
          setCartItems(JSON.parse(stored));
        } catch {
          localStorage.removeItem("cart");
        }
      }
      setHydrated(true);
    }
  }, []);

  /* =========================
     SAVE TO LOCAL STORAGE
     (AFTER LOAD ONLY)
     ========================= */
  useEffect(() => {
    if (!hydrated) return;

    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems, hydrated]);

  /* =========================
     ADD TO CART
     ========================= */
  const addToCart = (product) => {
    setCartItems((prev) => {
      const exists = prev.find(
        (item) => item._id === product._id
      );

      if (exists) return prev;

      return [
        ...prev,
        {
          ...product,
          quantity: "", // ❌ no default 0 / 2000
        },
      ];
    });
  };

  /* =========================
     UPDATE QUANTITY
     ========================= */
  const updateQuantity = (id, value) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, quantity: value }
          : item
      )
    );
  };

  /* =========================
     VALIDATE QUANTITY
     ========================= */
  const validateQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item._id !== id) return item;

        const qty = Number(item.quantity);

        if (!qty || qty < 500) {
          return { ...item, quantity: "" };
        }

        return { ...item, quantity: qty };
      })
    );
  };

  /* =========================
     REMOVE ITEM
     ========================= */
  const removeFromCart = (id) => {
    setCartItems((prev) =>
      prev.filter((item) => item._id !== id)
    );
  };

  /* =========================
     CLEAR CART (CHECKOUT)
     ========================= */
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        validateQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        cartCount: cartItems.length,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }
  return ctx;
}
