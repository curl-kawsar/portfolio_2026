import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getGalleryLoveState, toggleGalleryLove } from "@/lib/db";

const VISITOR_COOKIE = "visitor_id";

const VISITOR_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 365,
};

async function resolveVisitorId() {
  const cookieStore = await cookies();
  let visitorId = cookieStore.get(VISITOR_COOKIE)?.value;
  const isNew = !visitorId;
  if (!visitorId) visitorId = crypto.randomUUID();
  return { visitorId, isNew };
}

function withVisitorCookie(
  response: NextResponse,
  visitorId: string,
  isNew: boolean
) {
  if (isNew) {
    response.cookies.set(VISITOR_COOKIE, visitorId, VISITOR_COOKIE_OPTIONS);
  }
  return response;
}

export async function GET() {
  try {
    const { visitorId, isNew } = await resolveVisitorId();
    const state = await getGalleryLoveState(visitorId);
    const response = NextResponse.json(state);
    return withVisitorCookie(response, visitorId, isNew);
  } catch (error) {
    console.error("Gallery love GET error:", error);
    return NextResponse.json(
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
      return NextResponse.json({ error: "Image key is required." }, { status: 400 });
    }

    const cookieStore = await cookies();
    let visitorId = cookieStore.get(VISITOR_COOKIE)?.value;
    if (!visitorId) visitorId = crypto.randomUUID();

    const result = await toggleGalleryLove(visitorId, imageKey);
    const state = await getGalleryLoveState(visitorId);

    const response = NextResponse.json({
      total: state.total,
      images: state.images,
      imageKey,
      image: state.images[imageKey] ?? result.image,
      alreadyLoved: result.alreadyLoved,
    });

    response.cookies.set(VISITOR_COOKIE, visitorId, VISITOR_COOKIE_OPTIONS);
    return response;
  } catch (error) {
    console.error("Gallery love POST error:", error);
    return NextResponse.json(
      { error: "Failed to record gallery love." },
      { status: 500 }
    );
  }
}
