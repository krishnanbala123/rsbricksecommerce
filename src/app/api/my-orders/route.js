import connectDB from "@/lib/mongodb";
import Order from "../../../models/Order";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const orders = await Order.find({ email })
      .sort({ createdAt: -1 });

    return NextResponse.json(orders);
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
