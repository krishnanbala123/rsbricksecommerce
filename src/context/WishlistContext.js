// // "use client";

// // import { createContext, useContext, useEffect, useState } from "react";

// // const WishlistContext = createContext(null);

// // export function WishlistProvider({ children }) {
// //   const [wishlist, setWishlist] = useState([]);
// //   const [loaded, setLoaded] = useState(false);

// //   // 🔥 LOAD FROM LOCAL STORAGE
// //   useEffect(() => {
// //     const stored = localStorage.getItem("wishlist");
// //     if (stored) {
// //       try {
// //         setWishlist(JSON.parse(stored));
// //       } catch {
// //         localStorage.removeItem("wishlist");
// //       }
// //     }
// //     setLoaded(true);
// //   }, []);

// //   // 🔥 SAVE TO LOCAL STORAGE
// //   useEffect(() => {
// //     if (!loaded) return;
// //     localStorage.setItem("wishlist", JSON.stringify(wishlist));
// //   }, [wishlist, loaded]);

// //   // TOGGLE WISHLIST
// //   const toggleWishlist = (product) => {
// //     setWishlist((prev) => {
// //       const exists = prev.find(
// //         (item) => item._id === product._id
// //       );

// //       if (exists) {
// //         return prev.filter(
// //           (item) => item._id !== product._id
// //         );
// //       }

// //       return [...prev, product];
// //     });
// //   };

// //   const removeFromWishlist = (id) => {
// //     setWishlist((prev) =>
// //       prev.filter((item) => item._id !== id)
// //     );
// //   };

// //   const isWishlisted = (id) =>
// //     wishlist.some((item) => item._id === id);

// //   return (
// //     <WishlistContext.Provider
// //       value={{
// //         wishlist,
// //         toggleWishlist,
// //         removeFromWishlist,
// //         isWishlisted,
// //       }}
// //     >
// //       {children}
// //     </WishlistContext.Provider>
// //   );
// // }

// // export function useWishlist() {
// //   return useContext(WishlistContext);
// // }
// "use client";

// import { createContext, useContext, useEffect, useState } from "react";
// import { useAuth } from "./AuthContext";

// const WishlistContext = createContext();

// export function WishlistProvider({ children }) {
//   const { user } = useAuth();
//   const [wishlist, setWishlist] = useState([]);

//   // 🔄 Load wishlist from DB
//   useEffect(() => {
//     if (!user) {
//       setWishlist([]);
//       return;
//     }

//     fetch(`/api/wishlist?userId=${user.uid}`)
//       .then(res => res.json())
//       .then(data => {
//         if (data.success) setWishlist(data.items);
//       });
//   }, [user]);

//   // ❤️ Toggle wishlist
//   const toggleWishlist = async (product) => {
//     if (!user) return alert("Please login");

//     const res = await fetch("/api/wishlist", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         userId: user.uid,
//         product,
//       }),
//     });

//     const data = await res.json();

//     if (data.added) {
//       setWishlist(prev => [...prev, product]);
//     }

//     if (data.removed) {
//       setWishlist(prev =>
//         prev.filter(item => item.productId !== product._id)
//       );
//     }
//   };

//   const isWishlisted = (id) =>
//     wishlist.some(item => item.productId === id);

//   return (
//     <WishlistContext.Provider
//       value={{ wishlist, toggleWishlist, isWishlisted }}
//     >
//       {children}
//     </WishlistContext.Provider>
//   );
// }

// export const useWishlist = () => useContext(WishlistContext);

"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);

  // 🔄 Load wishlist from DB
  useEffect(() => {
    if (!user) {
      setWishlist([]);
      return;
    }

    fetch(`/api/wishlist?userId=${user.uid}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setWishlist(data.items);
        }
      })
      .catch(console.error);
  }, [user]);

  // ❤️ Toggle wishlist (add / remove)
  const toggleWishlist = async (product) => {
    if (!user) return;

    const res = await fetch("/api/wishlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.uid,
        product,
      }),
    });

    const data = await res.json();

    // ➕ ADD
    if (data.added) {
      setWishlist((prev) => [
        ...prev,
        { ...product, productId: product._id },
      ]);
    }

    // ➖ REMOVE
    if (data.removed) {
      setWishlist((prev) =>
        prev.filter((item) => item.productId !== product._id)
      );
    }
  };

  // ❌ REMOVE (from wishlist page)
  const removeFromWishlist = async (productId) => {
    if (!user) return;

    await fetch("/api/wishlist", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user.uid,
        productId,
      }),
    });

    setWishlist((prev) =>
      prev.filter((item) => item.productId !== productId)
    );
  };

  // ✅ CHECK
  const isWishlisted = (id) =>
    wishlist.some((item) => item.productId === id);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        removeFromWishlist,
        isWishlisted,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
