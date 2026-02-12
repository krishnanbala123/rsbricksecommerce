"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useAuth } from "@/context/AuthContext";
import "./productDetails.css";

function getThumbnailsByType(type, mainImage) {
  switch (type) {
    case "hand-made bricks":
      return [
        mainImage,
        "/products/handmade1.jpg",
        "/products/handmade2.jpg",
        "/products/handmade3.jpg",
      ];

    case "wire-cut bricks":
      return [
        mainImage,
        "/products/wirecut-1.jpg",
        "/products/wirecut-2.jpg",
        "/products/wirecut-3.jpg",
      ];

    case "machine-cut bricks":
      return [
        mainImage,
        "/products/machine-1.jpg",
        "/products/machine-2.jpg",
        "/products/machine-3.jpg",
      ];

    case "cement bricks":
      return [
        mainImage,
        "/products/cement-1.jpg",
        "/products/cement-2.jpg",
        "/products/cement-3.jpg",
      ];

    default:
      return [
        mainImage,
        "/products/sample-1.jpg",
        "/products/sample-2.jpg",
        "/products/sample-3.jpg",
      ];
  }
}


export default function ProductDetailsPage() {
  const { id } = useParams();
  const router = useRouter();

  const { addToCart, openCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);

        if (!res.ok) {
          throw new Error("Product not found");
        }

        const data = await res.json();

        setProduct(data);
        setActiveImage(data.image?.url || "/no-image.png");
        setLoading(false);
      } catch (err) {
        console.error(err);
        router.push("/shop");
      }
    };

    fetchProduct();
  }, [id, router]);

  if (loading) {
    return <div className="details-loading">Loading...</div>;
  }

  if (!product) return null;

  // 🔥 PUBLIC STATIC IMAGES (3 thumbnails)
//   const thumbnails = [
//     product.image?.url,
//     "/products/sample-1.jpg",
//     "/products/sample-2.jpg",
//     "/products/sample-3.jpg",
//   ];
const thumbnails = getThumbnailsByType(
  product.type,
  product.image?.url || "/no-image.png"
);

  // 🔐 LOGIN GUARD
  const requireLogin = (redirect) => {
    if (!user) {
      router.push(`/login?redirect=${redirect}`);
      return false;
    }
    return true;
  };

  return (
    <div className="product-details-page">
      <div className="details-container">

        {/* LEFT – IMAGES */}
        {/* <div className="details-left">
          <div className="main-image">
            <img src={activeImage} alt={product.name} />
          </div>

          <div className="thumb-row">
            {thumbnails.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="thumb"
                className={activeImage === img ? "active" : ""}
                onClick={() => setActiveImage(img)}
              />
            ))}
          </div>
        </div> */}
        {/* <div className="details-left">
  
  <div className="main-image">

 
  <button
    className="wishlist-btn"
    onClick={() => {
      if (!requireLogin(`/product/${id}`)) return;
      toggleWishlist(product);
    }}
  >
    <svg
      className={`heart-icon ${
        isWishlisted(product._id) ? "filled" : ""
      }`}
      viewBox="0 0 24 24"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36
      2 12.28 2 8.5 2 6 4 4 6.5 4
      c1.74 0 3.41 1.01 4.22 2.09
      C11.09 5.01 12.76 4 14.5 4
      17 4 19 6 19 8.5
      c0 3.78-3.4 6.86-8.55 11.54
      L12 21.35z" />
    </svg>
  </button>

  <img src={activeImage} alt={product.name} />
</div>


  <div className="thumb-row">
    {thumbnails.map((img, i) => (
      <img
        key={i}
        src={img}
        alt="thumb"
        className={activeImage === img ? "active" : ""}
        onClick={() => setActiveImage(img)}
      />
    ))}
  </div>
</div> */}

<div className="details-left">
  {/* <div className="main-image"> */}
  <div
  className="main-image zoom-container"
  onMouseMove={(e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    e.currentTarget.style.setProperty("--x", `${x}%`);
    e.currentTarget.style.setProperty("--y", `${y}%`);
  }}
>

    {/* ❤️ ONLY THIS WISHLIST */}
    <button
      className="wishlist-btn"
      onClick={() => {
        if (!requireLogin(`/product/${id}`)) return;
        toggleWishlist(product);
      }}
    >
      <svg
        className={`heart-icon ${
          isWishlisted(product._id) ? "filled" : ""
        }`}
        viewBox="0 0 24 24"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36
        2 12.28 2 8.5 2 6 4 4 6.5 4
        c1.74 0 3.41 1.01 4.22 2.09
        C11.09 5.01 12.76 4 14.5 4
        17 4 19 6 19 8.5
        c0 3.78-3.4 6.86-8.55 11.54
        L12 21.35z" />
      </svg>
    </button>

    <img src={activeImage} alt={product.name} />
  </div>

  <div className="thumb-row">
    {thumbnails.map((img, i) => (
      <img
        key={i}
        src={img}
        onClick={() => setActiveImage(img)}
        className={activeImage === img ? "active" : ""}
      />
    ))}
  </div>
</div>



        {/* RIGHT – DETAILS */}
        <div className="details-right">
          <h1 className="product-title">{product.name}</h1>

           {/* 2️⃣ STAR RATING (DEFAULT 5) */}
  <div className="rating-row">
    <div className="stars">
      ★★★★★
    </div>
    <span className="rating-text">(5.0)</span>
  </div>

       <p className="product-title1">₹ {product.price}</p>

          <h1 className="product-title">{product.type}</h1>

          <p className="long-desc">
            {product.longDescription}
          </p>

          <span className={`status ${product.status}`}>
            {product.status}
          </span>

          {/* ❤️ WISHLIST */}
      
          {/* 🛒 CART
          <button
            className="details-cart-btn"
            disabled={product.status !== "in-stock"}
            onClick={() => {
              if (!requireLogin(`/product/${id}`)) return;
              addToCart(product);
            }}
          >
            Add to Cart
          </button>

       
          <button
            className="details-buy-btn"
            disabled={product.status !== "in-stock"}
            onClick={() => {
              if (!requireLogin("/checkout")) return;
              addToCart(product);
              openCart();
            }}
          >
            Buy Now
          </button> */}

           <div className="details-actions">
  <button
    className="details-cart-btn"
    disabled={product.status !== "in-stock"}
    onClick={() => {
      if (!requireLogin(`/product/${id}`)) return;
      addToCart(product);
    }}
  >
    Add to Cart
  </button>

  <button
    className="details-buy-btn"
    disabled={product.status !== "in-stock"}
    onClick={() => {
      if (!requireLogin("/checkout")) return;
      addToCart(product);
      openCart();
    }}
  >
    Buy Now
  </button>
</div>


        </div>
      </div>
    </div>
  );
}
