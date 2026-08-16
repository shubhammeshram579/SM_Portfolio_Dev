import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import ContactModel from "@/models/Contact";
import { sendContactEmail } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 });
    }

    await dbConnect();
    await ContactModel.create({ name, email, message });

    // Try sending email (non-blocking failure)
    try {
      await sendContactEmail({ name, email, message });
    } catch (emailErr) {
      console.error("Email send failed:", emailErr);
    }

    return NextResponse.json({ success: true, message: "Message received!" });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();
    const contacts = await ContactModel.find({}).sort({ created_at: -1 }).lean();
    return NextResponse.json({ contacts });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 });
  }
}
