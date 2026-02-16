import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const data = await req.json();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Gmail App Password
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: `RS Bricks <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "🛒 New Order Received",
      text: `
New Order Placed!

Name: ${data.name}
Phone: ${data.phone}
Address: ${data.deliveryAddress}
Items:
${data.items.map(
  (item) => `- ${item.type} | Qty: ${item.quantity} | Rate: ₹${item.rate}`
).join("\n")}
Total Amount: ₹${data.totalAmount}
      `,
    });

    return Response.json({ success: true, mail: process.env.EMAIL_USER });
  } catch (error) {
    console.error("MAIL ERROR:", error);
    return Response.json({ success: false });
  }
}
