import { NextResponse } from "next/server";
import { clearAdminSessionCookie } from "@/lib/auth";

export async function POST() {
  const cookie = clearAdminSessionCookie();
  const response = NextResponse.json({ success: true });
  response.cookies.set(cookie.name, cookie.value, {
    httpOnly: cookie.httpOnly,
    secure: cookie.secure,
    path: cookie.path,
    sameSite: cookie.sameSite,
    maxAge: cookie.maxAge,
  });
  return response;
}
