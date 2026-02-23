// "use client";

// import { createContext, useContext, useEffect, useState } from "react";
// import { auth } from "@/lib/firebase";
// import { onAuthStateChanged, signOut } from "firebase/auth";

// const AuthContext = createContext(null);

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//       setLoading(false);
//     });
//     return () => unsub();
//   }, []);

//   const logout = async () => {
//     await signOut(auth);
//   };
  

//   return (
//     <AuthContext.Provider value={{ user, logout }}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);


// "use client";

// import { createContext, useContext, useEffect, useState } from "react";
// import { auth } from "@/lib/firebase";
// import { onAuthStateChanged, signOut } from "firebase/auth";

// const AuthContext = createContext(null);

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsub = onAuthStateChanged(auth, async (currentUser) => {
//       setUser(currentUser);
//       setLoading(false);

//       // 🔥 USER LOGIN → SAVE / UPDATE IN DB
//       if (currentUser) {
//         try {
//           console.log("🔥 LOGIN USER:", currentUser.uid);

//           const res = await fetch("/api/users", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//               uid: currentUser.uid,
//               name: currentUser.displayName || "",
//               email: currentUser.email || "",
//               phone: currentUser.phoneNumber || "",
//               photoURL: currentUser.photoURL || "",
//             }),
//           });

//           const data = await res.json();
//           console.log("✅ USER DB RESPONSE:", data);
//         } catch (err) {
//           console.error("❌ USER DB SAVE ERROR:", err);
//         }
//       }
//     });

//     return () => unsub();
//   }, []);

//   const logout = async () => {
//     await signOut(auth);
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, logout }}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);


"use client";

import { createContext, useContext, useEffect, useState, useRef } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔒 prevent multiple DB calls
  const hasSavedUser = useRef(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      // ✅ USER LOGIN → SAVE TO DB (ONLY ONCE)
      if (currentUser && !hasSavedUser.current) {
        hasSavedUser.current = true;

        try {
          console.log("🔥 LOGIN USER:", currentUser.uid);

          const res = await fetch("/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              uid: currentUser.uid,
              name: currentUser.displayName || "",
              email: currentUser.email || "",
              // phone: currentUser.phoneNumber || "",
              photoURL: currentUser.photoURL || "",
            }),
          });

          const data = await res.json();
          console.log("✅ USER DB RESPONSE:", data);
        } catch (err) {
          console.error("❌ USER DB SAVE ERROR:", err);
        }
      }

      // ❌ LOGOUT CASE → reset ref
      if (!currentUser) {
        hasSavedUser.current = false;
      }
    });

    return () => unsub();
  }, []);

  // 🔥 LOGOUT (FULL CLEAN)
  const logout = async () => {
    try {
      await signOut(auth);
    } finally {
      // 🧹 clear all user data
      localStorage.removeItem("cart");
      // localStorage.removeItem("wishlist");

      setUser(null);

      // 🔄 hard refresh to reset all contexts
      window.location.href = "/";
    }
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
