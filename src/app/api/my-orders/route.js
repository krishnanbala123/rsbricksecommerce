import connectDB from "@/lib/mongodb";
import Order from "../../../models/Order";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectDB();
    const { email } = await req.json();

    const orders = await Order.find({
      email: email   // 🔥 IMPORTANT (see note below)
    }).sort({ createdAt: -1 });

    return NextResponse.json(orders);
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
