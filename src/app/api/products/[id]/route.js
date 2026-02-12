import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export async function GET(request, { params }) {
  try {
    await connectDB();

    // ✅ IMPORTANT FIX (params is Promise)
    const { id } = await params;

    console.log("✅ API PRODUCT ID:", id);

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("❌ PRODUCT DETAILS API ERROR:", error);
    return NextResponse.json(
      { error: "Invalid product id" },
      { status: 500 }
    );
  }
}
