import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAdminSessionCookieName, verifyAdminSessionToken } from "@/lib/auth";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(getAdminSessionCookieName())?.value;
  const adminId = verifyAdminSessionToken(token);
  return NextResponse.json({ authenticated: Boolean(adminId) });
}
