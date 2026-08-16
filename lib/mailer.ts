import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.gmail.com",
  port: Number(process.env.EMAIL_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendContactEmail({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  await transporter.sendMail({
  from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`, // your email
  to: process.env.EMAIL_TO, // your inbox
  replyTo: email, // user's email (important 🔥)
  subject: `New message from ${name}`,
  html: `
    <div style="font-family:sans-serif;max-width:600px;margin:auto;">
      <h2 style="color:#00FF94;">New Contact Message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p style="background:#f5f5f5;padding:16px;border-radius:8px;">
        ${message}
      </p>
    </div>
  `,
});
}
