
// "use client";

// import { useState } from "react";
// import { auth, googleProvider } from "@/lib/firebase";
// import { signInWithPopup } from "firebase/auth";
// import { useRouter, useSearchParams } from "next/navigation";
// import "./login.css";

// export default function LoginPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   // 🔁 redirect after login (default home)
//   const redirectTo = searchParams.get("redirect") || "/";

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const signInWithGoogle = async () => {
//     setError("");
//     setLoading(true);

//     try {
//       await signInWithPopup(auth, googleProvider);

//       // ✅ SUCCESS → GO BACK TO REQUESTED PAGE
//       router.push(redirectTo);
//     } catch (err) {
//       if (err.code === "auth/popup-closed-by-user") {
//         setLoading(false);
//         return; // ❌ ignore silently
//       }

//       console.error(err);
//       setError("Google sign-in failed. Try again.");
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-box">
//         <h2>Sign in</h2>

//         {error && <p className="auth-error">{error}</p>}

//         <button
//           className="google-btn"
//           onClick={signInWithGoogle}
//           disabled={loading}
//         >
//           {loading ? "Signing in..." : "Sign in with Google"}
//         </button>
//       </div>
//     </div>
//   );
// }


"use client";

import { useState } from "react";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";   // ✅ ADD
import "./login.css";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 🔁 redirect after login
  const redirectTo = searchParams.get("redirect") || "/";

  const [loading, setLoading] = useState(false);

  const signInWithGoogle = async () => {
    setLoading(true);

    try {
      await signInWithPopup(auth, googleProvider);

      // ✅ SUCCESS
      toast.success("Logged in successfully",
              {
    className: `border-path-toast run-${Date.now()}`, // 👈 key trick
    duration: 4000,
  }
      );

      setTimeout(() => {
        router.push(redirectTo);
      }, 700);

    } catch (err) {
      if (err.code === "auth/popup-closed-by-user") {
        setLoading(false);
        return; // silent cancel
      }

      console.error(err);
      toast.error("Google sign-in failed ",
              {
    className: `border-path-toast1 run-${Date.now()}`, // 👈 key trick
    duration: 4000,
  }
      );
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Sign in</h2>

        <button
          className="google-btn"
          onClick={signInWithGoogle}
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign in with Google"}
        </button>
      </div>
    </div>
  );
}
