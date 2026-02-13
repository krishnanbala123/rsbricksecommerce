"use client";

import { useEffect, useState } from "react";
import ShopProductCard from "@/components/ShopProductCard/ShopProductCard";
import "./shop/shop.css";

export default function ShopPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="shop-page">
      <h1 className="shop-title">Shop</h1>

      <div className="shop-grid">
        {products.map((product) => (
          <ShopProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
