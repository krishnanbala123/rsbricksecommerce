// "use client";

// import { useEffect, useState } from "react";
// import ShopProductCard from "@/components/ShopProductCard/ShopProductCard";
// import "./shop/shop.css";

// export default function ShopPage() {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     fetch("/api/products")
//       .then((res) => res.json())
//       .then((data) => setProducts(data));
//   }, []);

//   return (
//     <div className="shop-page">
//       <h1 className="shop-title">Shop</h1>

//       <div className="shop-grid">
//         {products.map((product) => (
//           <ShopProductCard key={product._id} product={product} />
//         ))}
//       </div>
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import ShopProductCard from "@/components/ShopProductCard/ShopProductCard";
import "../app/shop/shop.css";

export default function ShopPage() {

  const [products, setProducts] = useState(null);   // 🔥 null important
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadProducts = async () => {
      try {
        const res = await fetch("/api/products", {
          cache: "no-store", // prevent instant cache
        });

        const data = await res.json();

        // ensure skeleton first paint
        requestAnimationFrame(() => {
          setProducts(data);
          setLoading(false);
        });

      } catch (err) {
        console.error("Failed to load products", err);
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className="shop-page">
      <h1 className="shop-title">Shop</h1>

      <div className="shop-grid">

        {/* 🔥 SHOW EXACTLY 4 SKELETON CARDS */}
        {loading && Array.from({ length: 4 }).map((_, i) => (
          <ShopProductCard key={i} />
        ))}

        {/* 🔥 SHOW PRODUCTS */}
        {!loading && products?.map((product) => (
          <ShopProductCard key={product._id} product={product} />
        ))}

      </div>
    </div>
  );
}