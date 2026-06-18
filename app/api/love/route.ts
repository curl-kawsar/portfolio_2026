import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getLoveCount, getVisitorLoved, toggleLove } from "@/lib/db";

const VISITOR_COOKIE = "visitor_id";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const visitorId = cookieStore.get(VISITOR_COOKIE)?.value;
    const [count, loved] = await Promise.all([
      getLoveCount(),
      visitorId ? getVisitorLoved(visitorId) : Promise.resolve(false),
    ]);

    return NextResponse.json({ count, loved });
  } catch (error) {
    console.error("Love GET error:", error);
    return NextResponse.json(
      { error: "Failed to load love count." },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    const cookieStore = await cookies();
    let visitorId = cookieStore.get(VISITOR_COOKIE)?.value;

    if (!visitorId) {
      visitorId = crypto.randomUUID();
    }

    const result = await toggleLove(visitorId);

    const response = NextResponse.json(result);
    response.cookies.set(VISITOR_COOKIE, visitorId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });

    return response;
  } catch (error) {
    console.error("Love POST error:", error);
    return NextResponse.json(
      { error: "Failed to record love." },
      { status: 500 }
    );
  }
}
