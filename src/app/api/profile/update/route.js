import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function PUT(req) {
  try {
    await connectDB();
    const body = await req.json();

    const user = await User.findOneAndUpdate(
      { uid: body.uid },
      {
        name: body.name,
        phone: body.phone,
        dob: body.dob,
        address: body.address,
        photoURL: body.photoURL,
      },
      { new: true, upsert: true }
    );

    return NextResponse.json({ success: true, user });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
