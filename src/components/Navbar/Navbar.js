
// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { useState } from "react";
// import { useAuth } from "@/context/AuthContext";
// import { useCart } from "@/context/CartContext";
// import { useWishlist } from "@/context/WishlistContext"; // ✅ NEW
// import "./navbar.css";

// export default function Navbar() {
//   const { user, logout } = useAuth();
//   const { cartCount, openCart } = useCart();
//   const { wishlist } = useWishlist(); // ✅ NEW

//   const [menuOpen, setMenuOpen] = useState(false);
//   const [profileOpen, setProfileOpen] = useState(false);

//   return (
//     <header className="navbar">
//       <div className="navbar-inner">
//         {/* LEFT – LOGO */}
//         <div className="navbar-left">
//           <Link href="/">
//             <Image
//               src="/RS logo.png"
//               alt="Brand Logo"
//               width={140}
//               height={65}
//               priority
//             />
//           </Link>
//         </div>

//         {/* CENTER – LINKS */}
//         <nav className={`navbar-center ${menuOpen ? "active" : ""}`}>
//           <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
//           <Link href="/shop" onClick={() => setMenuOpen(false)}>Shop</Link>
//           <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
//         </nav>

//         {/* RIGHT – ICONS */}
//         <div className="navbar-right">

//           {/* ❤️ WISHLIST ICON */}
//           {/* <Link href="/wishlist" className="wishlist-icon">
//             🤍
//             {wishlist.length > 0 && (
//               <span className="wishlist-badge">
//                 {wishlist.length}
//               </span>
//             )}
//           </Link> */}

//           <Link href="/wishlist" className="nav-wishlist">
//   <svg
//     className="nav-heart"
//     viewBox="0 0 24 24"
//   >
//     <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41 1.01 4.22 2.09C11.09 5.01 12.76 4 14.5 4 17 4 19 6 19 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
//   </svg>

//   {wishlist.length > 0 && (
//     <span className="wishlist-dot">
//       {wishlist.length}
//     </span>
//   )}
// </Link>


//           {/* 🛒 CART ICON */}
//           {/* <button className="cart-icon" onClick={openCart}>
//             🛒
//             {cartCount > 0 && (
//               <span className="cart-badge">{cartCount}</span>
//             )}
//           </button> */}

//           <button className="cart-icon" onClick={openCart}>
//   <svg
//     className="nav-cart"
//     viewBox="0 0 24 24"
//   >
//     <path d="M3 3h2l2.4 12.4a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 2-1.6L22 6H6" />
//     <circle cx="9" cy="21" r="1.5" />
//     <circle cx="18" cy="21" r="1.5" />
//   </svg>

//   {cartCount > 0 && (
//     <span className="cart-badge">{cartCount}</span>
//   )}
// </button>

//           {/* 👤 PROFILE */}
//           {!user ? (
//             <Link href="/login">
//               <div className="profile-circle">👤</div>
//             </Link>
//           ) : (
//             <div className="profile-wrapper">
//               <div
//                 className="profile-circle"
//                 onClick={() => setProfileOpen(!profileOpen)}
//               >
//                 {user.photoURL ? (
//                   <img
//                     src={user.photoURL}
//                     alt="profile"
//                     referrerPolicy="no-referrer"
//                   />
//                 ) : (
//                   "👤"
//                 )}
//               </div>

//               {profileOpen && (
//                 <div className="profile-dropdown">
//                   <Link
//                     href="/profile"
//                     className="profile-link"
//                     onClick={() => setProfileOpen(false)}
//                   >
//                     My Profile
//                   </Link>

//                   {/* ❤️ MY WISHLIST (RESPONSIVE / PROFILE MENU) */}
//                   <Link
//                     href="/wishlist"
//                     className="profile-link"
//                     onClick={() => setProfileOpen(false)}
//                   >
//                     ❤️ My Wishlist
//                   </Link>

//                   <button onClick={logout}>Logout</button>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* ☰ TOGGLE – MOBILE */}
//           <button
//             className="nav-toggle"
//             onClick={() => setMenuOpen(!menuOpen)}
//             aria-label="Toggle Menu"
//           >
//             ☰
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// }


"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import "./navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cartCount, openCart } = useCart();
  const { wishlist } = useWishlist();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-inner">

        {/* LOGO */}
        <div className="navbar-left">
          <Link href="/shop">
            <img
              src="/rslogo.png"
              alt="Brand Logo"
              width={140}
              height={65}
            />
          </Link>
        </div>

        {/* LINKS */}
        <nav className={`navbar-center ${menuOpen ? "active" : ""}`}>
          <Link href="https://www.rsbricks.in/index.html" target="blank" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/shop" onClick={() => setMenuOpen(false)}>Shop</Link>
          <Link href="https://www.rsbricks.in/contact.html" target="blank" onClick={() => setMenuOpen(false)}>Contact</Link>
        </nav>

        {/* RIGHT ICONS */}
        <div className="navbar-right">

          {/* ❤️ WISHLIST */}
          <Link href="/wishlist" className="nav-wishlist">
            <svg className="nav-heart" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41 1.01 4.22 2.09C11.09 5.01 12.76 4 14.5 4 17 4 19 6 19 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>

            {/* ✅ LOGIN REQUIRED FOR COUNT */}
            {user && wishlist.length > 0 && (
              <span className="wishlist-dot">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* 🛒 CART */}
          <button className="cart-icon" onClick={openCart}>
            <svg className="nav-cart" viewBox="0 0 24 24">
              <path d="M3 3h2l2.4 12.4a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 2-1.6L22 6H6" />
              <circle cx="9" cy="21" r="1.5" />
              <circle cx="18" cy="21" r="1.5" />
            </svg>

            {/* ✅ LOGIN REQUIRED FOR COUNT */}
            {user && cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </button>

          {/* 👤 PROFILE */}
          {!user ? (
            <Link href="/login">
              <div className="profile-circle">👤</div>
            </Link>
          ) : (
            <div className="profile-wrapper">
              <div
                className="profile-circle"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="profile"
                    referrerPolicy="no-referrer"
                  />
                ) : "👤"}
              </div>

              {profileOpen && (
                <div className="profile-dropdown">
                  <Link
                    href="/profile"
                    className="profile-link"
                    onClick={() => setProfileOpen(false)}
                  >
                    My Profile
                  </Link>

                  {/* <Link
                    href="/wishlist"
                    className="profile-link"
                    onClick={() => setProfileOpen(false)}
                  >
                    ❤️ My Wishlist
                  </Link> */}

                  <button onClick={logout}>Logout</button>
                </div>
              )}
            </div>
          )}

          {/* ☰ MOBILE TOGGLE */}
          <button
            className="nav-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}
