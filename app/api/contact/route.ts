import { NextResponse } from "next/server";
import { insertContactMessage } from "@/lib/db";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const subject = String(body.subject ?? "").trim();
    const message = String(body.message ?? "").trim();

    if (!name || name.length > 255) {
      return NextResponse.json(
        { error: "Name is required (max 255 characters)." },
        { status: 400 }
      );
    }
    if (!email || !EMAIL_RE.test(email) || email.length > 255) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }
    if (!message || message.length < 10) {
      return NextResponse.json(
        { error: "Message must be at least 10 characters." },
        { status: 400 }
      );
    }
    if (message.length > 5000) {
      return NextResponse.json(
        { error: "Message must be under 5000 characters." },
        { status: 400 }
      );
    }
    if (subject.length > 500) {
      return NextResponse.json(
        { error: "Subject must be under 500 characters." },
        { status: 400 }
      );
    }

    const saved = await insertContactMessage({
      name,
      email,
      subject: subject || undefined,
      message,
    });

    return NextResponse.json({ success: true, id: saved.id }, { status: 201 });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
