import { NextResponse } from "next/server";
import { sessionCookieOptions } from "@/lib/auth";

export async function POST() {
  const { name, ...options } = sessionCookieOptions();
  const response = NextResponse.json({ success: true });
  response.cookies.set(name, "", { ...options, maxAge: 0 });
  return response;
}
