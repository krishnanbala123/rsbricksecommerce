import nodemailer from "nodemailer";

export async function GET() {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: "✅ Test Email",
      text: "This is a test email from local Next.js project.",
    });

    return Response.json({ success: true, message: "Email sent!" });

  } catch (error) {
    console.error(error);

    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}