import { cookies } from "next/headers";
import { getGalleryLoveState, toggleGalleryLove } from "@/lib/db";

const VISITOR_COOKIE = "visitor_id";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const visitorId = cookieStore.get(VISITOR_COOKIE)?.value;
    const state = await getGalleryLoveState(visitorId);

    return Response.json(state);
  } catch (error) {
    console.error("Gallery love GET error:", error);
    return Response.json(
      { error: "Failed to load gallery loves." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const imageKey = String(body.image ?? "").trim();

    if (!imageKey) {
      return Response.json({ error: "Image key is required." }, { status: 400 });
    }

    const cookieStore = await cookies();
    let visitorId = cookieStore.get(VISITOR_COOKIE)?.value;

    if (!visitorId) {
      visitorId = crypto.randomUUID();
    }

    const result = await toggleGalleryLove(visitorId, imageKey);

    const response = Response.json({
      total: result.total,
      imageKey,
      image: result.image,
      alreadyLoved: result.alreadyLoved,
    });

    response.cookies.set(VISITOR_COOKIE, visitorId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });

    return response;
  } catch (error) {
    console.error("Gallery love POST error:", error);
    return Response.json(
      { error: "Failed to record gallery love." },
      { status: 500 }
    );
  }
}
