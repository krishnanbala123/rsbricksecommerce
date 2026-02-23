// import { NextResponse } from "next/server";
// import connectDB from "@/lib/mongodb";
// import User from "@/models/User";

// export async function GET(req) {
//   await connectDB();
//   const { searchParams } = new URL(req.url);
//   const uid = searchParams.get("uid");

//   const user = await User.findOne({ uid });
//   return NextResponse.json({ user });
// }

// export async function POST(req) {
//   try {
//     await connectDB();

//     const body = await req.json();

//     console.log("📥 API USERS BODY:", body);

//     const user = await User.findOneAndUpdate(
//       { uid: body.uid },
//       {
//         name: body.name || "",
//         email: body.email || "",
//         phone: body.phone || "",
//         photoURL: body.photoURL || "",
//         lastLogin: new Date(),
//       },
//       { upsert: true, new: true }
//     );

//     console.log("✅ USER SAVED:", user);

//     return NextResponse.json({ success: true, user });
//   } catch (err) {
//     console.error("❌ USERS API ERROR:", err);
//     return NextResponse.json(
//       { success: false, error: "User save failed" },
//       { status: 500 }
//     );
//   }
// }

// export async function PUT(req) {
//   await connectDB();
//   const body = await req.json();

//   const user = await User.findOneAndUpdate(
//     { uid: body.uid },
//     {
//       name: body.name,
//       phone: body.phone,
//       dob: body.dob,
//       address: body.address,
//       photoURL: body.photoURL,
//       lastLogin: new Date(),
//     },
//      { upsert: true, new: true }
//   );

//   return NextResponse.json({ success: true, user });
// }


import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

/* GET USER */
export async function GET(req) {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const uid = searchParams.get("uid");

  const user = await User.findOne({ uid });
  return NextResponse.json({ user });
}

/* LOGIN SAVE — CREATE ONLY */
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    let user = await User.findOne({ uid: body.uid });

    // 🟢 only first login create
    if (!user) {
      user = await User.create({
        uid: body.uid,
        name: body.name ?? "",
        email: body.email ?? "",
        photoURL: body.photoURL ?? "",
        lastLogin: new Date(),
      });
    } else {
      // 🔁 next login only lastLogin update
      await User.updateOne(
        { uid: body.uid },
        { $set: { lastLogin: new Date() } }
      );
    }

    return NextResponse.json({ success: true, user });

  } catch (err) {
    console.error("USERS POST ERROR:", err);
    return NextResponse.json({ error: "User save failed" }, { status: 500 });
  }
}