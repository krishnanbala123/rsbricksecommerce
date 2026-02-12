
// import { NextResponse } from "next/server";
// import { connectDB } from "@/lib/mongodb";
// import Order from "@/models/Order";

// export async function POST(req) {
//   try {
//     await connectDB();

//     const body = await req.json();

//     const {
//       name,
//       phone,
//       deliveryAddress,
//       location,
//       type,
//       noOfBricks,
//       brickRate,
//       totalAmount,
//     } = body;

//     // ✅ BASIC VALIDATION
//     if (
//       !name ||
//       !phone ||
//       !deliveryAddress ||
//       !type ||
//       Number(noOfBricks) < 2000
//     ) {
//       return NextResponse.json(
//         {
//           success: false,
//           error: "Invalid order data",
//         },
//         { status: 400 }
//       );
//     }

//     const order = await Order.create({
//       orderId: "ORD-" + Date.now(),

//       name,
//       phone,
//       deliveryAddress,
//       location: location || { text: "" },

//       type,
//       noOfBricks: Number(noOfBricks),
//       brickRate: Number(brickRate),
//       totalAmount: Number(totalAmount),

//       paidAmount: 0,
//       remainingAmount: Number(totalAmount),
//       paymentStatus: "pending",
//       verified: false,
//       movedToHistory: false,
//     });

//     // ✅ ALWAYS RETURN success:true
//     return NextResponse.json(
//       {
//         success: true,
//         orderId: order.orderId,
//         order,
//       },
//       { status: 201 }
//     );
//   } catch (err) {
//     console.error("ORDER API ERROR:", err);

//     return NextResponse.json(
//       {
//         success: false,
//         error: "Internal server error",
//       },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      name,
      phone,
      deliveryAddress,
      location,
      items,
      totalAmount,
    } = body;

    // ✅ VALIDATION
    if (
      !name ||
      !phone ||
      !deliveryAddress ||
      !location?.lat ||
      !location?.lng ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return NextResponse.json(
        { success: false, error: "Invalid order data" },
        { status: 400 }
      );
    }

    // ✅ Validate brick quantity rule
    const totalBricks = items.reduce(
      (sum, item) => sum + Number(item.quantity),
      0
    );

    if (totalBricks < 500) {
      return NextResponse.json(
        { success: false, error: "Minimum order is 2000 bricks" },
        { status: 400 }
      );
    }

    const order = await Order.create({
      orderId: "ORD-" + Date.now(),
      name,
      phone,
      deliveryAddress,
      location,
      items,
      totalAmount,
      paidAmount: 0,
      remainingAmount: totalAmount,
      paymentStatus: "pending",
    });

    return NextResponse.json(
      { success: true, orderId: order.orderId, order },
      { status: 201 }
    );
  } catch (err) {
    console.error("ORDER API ERROR:", err);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

