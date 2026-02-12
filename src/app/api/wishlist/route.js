import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Wishlist from "@/models/Wishlist";

// 🔹 GET wishlist
export async function GET(req) {
  await connectDB();

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ success: false });
  }

  const items = await Wishlist.find({ userId });

  return NextResponse.json({
    success: true,
    items,
  });
}

// 🔹 TOGGLE wishlist (ADD / REMOVE)
export async function POST(req) {
  await connectDB();

  const { userId, product } = await req.json();

  const exists = await Wishlist.findOne({
    userId,
    productId: product._id,
  });

  // ➖ REMOVE (toggle off)
  if (exists) {
    await Wishlist.deleteOne({ _id: exists._id });

    return NextResponse.json({
      success: true,
      removed: true,
    });
  }

  // ➕ ADD
  await Wishlist.create({
    userId,
    productId: product._id,
    name: product.name,
    price: product.price,
    image: product.image,
    type: product.type,
  });

  return NextResponse.json({
    success: true,
    added: true,
  });
}

// ❌ REMOVE (from wishlist page ❌ button)
export async function DELETE(req) {
  await connectDB();

  const { userId, productId } = await req.json();

  if (!userId || !productId) {
    return NextResponse.json({ success: false });
  }

  await Wishlist.deleteOne({
    userId,
    productId,
  });

  return NextResponse.json({
    success: true,
  });
}
