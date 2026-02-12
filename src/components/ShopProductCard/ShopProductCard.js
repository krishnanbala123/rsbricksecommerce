

// "use client";

// import { useCart } from "@/context/CartContext";
// import { useWishlist } from "@/context/WishlistContext";
// import "./shopProductCard.css";

// export default function ShopProductCard({ product }) {
//   const { addToCart, openCart } = useCart();
//     const { toggleWishlist, isWishlisted } = useWishlist();

//      const liked = isWishlisted(product._id);

//     // 🔥 BUY NOW HANDLER
//   const handleBuyNow = () => {
//     addToCart(product); // ✅ count increase + local save
//     openCart();         // ✅ drawer open
//   };

//   return (
//     <div className="shop-card">

//       {/* ❤️ HEART ICON */}
//    <button
//   className="wishlist-btn"
//   onClick={() => toggleWishlist(product)}
// >
//   <svg
//     className={`heart-icon ${liked ? "filled" : ""}`}
//     viewBox="0 0 24 24"
//   >
//     <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6 4 4 6.5 4c1.74 0 3.41 1.01 4.22 2.09C11.09 5.01 12.76 4 14.5 4 17 4 19 6 19 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
//   </svg>
// </button>


//       <img
//         src={product.image?.url || "/no-image.png"}
//         alt={product.name}
//       />

//       <div className="shop-card-body">
//         <h3>{product.name}</h3>

//         <p className="desc">{product.description}</p>

//         <p className="product-type">{product.type}</p>

//         <div className="price-row">
//           <span className="price">₹ {product.price}</span>
//           <span className={`status ${product.status}`}>
//             {product.status}
//           </span>
//         </div>

//         {/* 🔥 ACTION BUTTONS */}
//         <div className="action-row">
//           <button
//             className="add-cart-btn"
//             disabled={product.status !== "in-stock"}
//             onClick={() => addToCart(product)}
//           >
//             Add to Cart
//           </button>

//           <button
//             className="buy-btn"
//             disabled={product.status !== "in-stock"}
//             onClick={handleBuyNow}
//           >
//             Buy Now
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";

import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import "./shopProductCard.css";
import Image from "next/image";

export default function ShopProductCard({ product }) {
  const { addToCart, openCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { user } = useAuth();
  const router = useRouter();

  const liked = isWishlisted(product._id);

  // 🔐 LOGIN CHECK (only for cart / buy)
  const requireLogin = (redirectTo = "/shop") => {
    if (!user) {
      router.push(`/login?redirect=${redirectTo}`);
      return false;
    }
    return true;
  };

  // 🛒 ADD TO CART (LOGIN REQUIRED)
  const handleAddToCart = () => {
    if (!requireLogin("/shop")) return;
    addToCart(product);
  };

  // ⚡ BUY NOW (LOGIN REQUIRED)
  const handleBuyNow = () => {
    if (!requireLogin("/checkout")) return;
    addToCart(product);
    openCart();
  };

  // ❤️ WISHLIST (LOGIN NOT REQUIRED)
  // const handleWishlist = () => {
  //   toggleWishlist(product); // ✅ localStorage
  // };

    // ❤️ WISHLIST HANDLER (LOGIN REQUIRED)
  const handleWishlist = () => {
    if (!user) {
      router.push("/login");
      return;
    }
    toggleWishlist(product);

  };

   // 🔥 GO TO DETAILS PAGE
  const goToDetails = () => {
    router.push(`/product/${product._id}`);
  };

  return (
    <div className="shop-card">

      {/* ❤️ WISHLIST HEART */}
      <button
        className="wishlist-btn"
        onClick={handleWishlist}
        aria-label="Add to wishlist"
      >
        <svg
          className={`heart-icon ${liked ? "filled" : ""}`}
          viewBox="0 0 24 24"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                   2 6 4 4 6.5 4c1.74 0 3.41 1.01 4.22 2.09
                   C11.09 5.01 12.76 4 14.5 4
                   17 4 19 6 19 8.5
                   c0 3.78-3.4 6.86-8.55 11.54
                   L12 21.35z" />
        </svg>
      </button>

      {/* 🖼 PRODUCT IMAGE */}
      <Image
        src={product.image?.url || "/no-image.png"}
        alt={product.name}
        className="product-image"
        onClick={goToDetails}
      />

      <div className="shop-card-body">
        <h3>{product.name}</h3>

        <p className="desc">{product.shortDescription}</p>

        <p className="product-type">{product.type}</p>

        <div className="price-row">
          <span className="price">₹ {product.price}</span>
          <span className={`status ${product.status}`}>
            {product.status}
          </span>
        </div>

        {/* 🔥 ACTION BUTTONS */}
        <div className="action-row">
          <button
            className="add-cart-btn"
            disabled={product.status !== "in-stock"}
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>

          <button
            className="buy-btn"
            disabled={product.status !== "in-stock"}
            onClick={handleBuyNow}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
