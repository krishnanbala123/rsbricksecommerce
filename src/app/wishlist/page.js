
"use client";

import { useState } from "react";
import { useWishlist } from "@/context/WishlistContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";   // ✅ ADD
import "./wishlist.css";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const router = useRouter();

  const [removingId, setRemovingId] = useState(null);

  const handleRemove = async (productId) => {
    setRemovingId(productId);

    try {
      await removeFromWishlist(productId);

      toast.success("Removed from wishlist", {
        className: `border-path-toast run-${Date.now()}`,
        duration: 4000,
      });

    } catch (err) {
      console.error("Remove failed", err);

      toast.error("Failed to remove item", {
        className: `border-path-toast1 run-${Date.now()}`,
        duration: 4000,
      });

    } finally {
      setRemovingId(null);
    }
  };

  return (
    <div className="wishlist-page">
      <h2 className="wishlist-title">❤️ My Wishlist</h2>

      {wishlist.length === 0 ? (
        <div className="wishlist-empty">
          <p>No items in your wishlist</p>
          <button onClick={() => router.push("/shop")}>
            Go to Shop
          </button>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlist.map((item) => (
            <div key={item.productId} className="wishlist-card">

              <button
                className="remove-btn"
                onClick={() => handleRemove(item.productId)}
                disabled={removingId === item.productId}
                title="Remove"
              >
                {removingId === item.productId ? "..." : "✕"}
              </button>

              <img
                src={item.image?.url || "/no-image.png"}
                alt={item.name}
              />

              <div className="wishlist-info">
                <h4>{item.name}</h4>
                <p className="type">{item.type}</p>
                <strong>₹ {item.price}</strong>
              </div>

              <button
                className="view-btn"
                onClick={() =>
                  router.push(`/product/${item.productId}`)
                }
              >
                View Product
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
