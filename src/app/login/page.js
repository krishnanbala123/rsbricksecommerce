
// "use client";

// import { useState } from "react";
// import { auth, googleProvider } from "@/lib/firebase";
// import { signInWithPopup } from "firebase/auth";
// import { useRouter, useSearchParams } from "next/navigation";
// import toast from "react-hot-toast";   // ✅ ADD
// import "./login.css";

// export default function LoginPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   // 🔁 redirect after login
//   const redirectTo = searchParams.get("redirect") || "/";

//   const [loading, setLoading] = useState(false);

//   const signInWithGoogle = async () => {
//     setLoading(true);

//     try {
//       await signInWithPopup(auth, googleProvider);

//       // ✅ SUCCESS
//       toast.success("Logged in successfully",
//               {
//     className: `border-path-toast run-${Date.now()}`, // 👈 key trick
//     duration: 4000,
//   }
//       );

//       setTimeout(() => {
//         router.push(redirectTo);
//       }, 700);

//     } catch (err) {
//       if (err.code === "auth/popup-closed-by-user") {
//         setLoading(false);
//         return; // silent cancel
//       }

//       console.error(err);
//       toast.error("Google sign-in failed ",
//               {
//     className: `border-path-toast1 run-${Date.now()}`, // 👈 key trick
//     duration: 4000,
//   }
//       );
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-box">
//         <h2>Sign in</h2>

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
import toast from "react-hot-toast";
import "./login.css";

export default function LoginPage() {

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";

  const [loading, setLoading] = useState(false);

  const signInWithGoogle = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);

      toast.success("Logged in successfully",
        {
    className: `border-path-toast run-${Date.now()}`, // 👈 key trick
    duration: 4000,
  }
      );
      setTimeout(() => router.push(redirectTo), 700);

    } catch (err) {
      if (err.code === "auth/popup-closed-by-user") {
        setLoading(false);
        return;
      }
      toast.error("Google sign-in failed",
        {
    className: `border-path-toast run-${Date.now()}`, // 👈 key trick
    duration: 4000,
  }
      );
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      {/* LEFT PANEL */}
      <div className="login-left">
        <div className="login-left-inner">

          <div className="circle-image">
            <img src="/rs_logo.jpeg" alt="workers" />
          </div>

          <h1>Welcome to RSBricks👋</h1>
          <p>Strong foundations start here.  
            Premium quality bricks manufactured and supplied directly from our yard.</p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="login-right">
        <div className="login-card">

          <h2>Login</h2>
          <p className="sub">Continue with your Google account</p>

          <button
            className="google-btn"
            onClick={signInWithGoogle}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Continue with Google"}
          </button>

        </div>
      </div>

    </div>
  );
}
