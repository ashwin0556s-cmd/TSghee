import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAdminSessionCookieName, verifyAdminSessionToken } from "@/lib/auth";

export async function requireAdminAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get(getAdminSessionCookieName())?.value;
  const adminId = verifyAdminSessionToken(token);

  if (!adminId) {
    return NextResponse.json({ error: "Unauthorized. Admin session required." }, { status: 401 });
  }

  return adminId;
}
