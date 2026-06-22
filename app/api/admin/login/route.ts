import { NextResponse } from "next/server";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getDb } from "@/lib/firebase";
import { verifyPassword, createAdminSessionCookie } from "@/lib/auth";
import { logActivity } from "@/lib/activityLog";

function getDatabase() {
  const database = getDb();
  if (!database) {
    throw new Error("Firestore not initialized");
  }
  return database;
}

const DEFAULT_ADMIN_EMAIL = process.env.ADMIN_EMAIL?.trim().toLowerCase() ?? "admin@tsghee.local";
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD?.trim() ?? "Secret123!";

export async function POST(request: Request) {
  const body = await request.json();
  const email = String(body.email ?? "").trim().toLowerCase();
  const password = String(body.password ?? "").trim();

  if (!email || !password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  const db = getDatabase();
  const adminsRef = collection(db, "admins");
  const adminQuery = query(adminsRef, where("email", "==", email));
  const adminSnapshot = await getDocs(adminQuery);

  if (!adminSnapshot.empty) {
    const adminDoc = adminSnapshot.docs[0];
    const adminData = adminDoc.data() as { email?: string; passwordHash?: string };
    const passwordHash = adminData.passwordHash;

    if (passwordHash && verifyPassword(password, passwordHash)) {
      const cookie = createAdminSessionCookie(adminDoc.id);
      await logActivity("login", adminDoc.id, { email });
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
  }

  if (email === DEFAULT_ADMIN_EMAIL && password === DEFAULT_ADMIN_PASSWORD) {
    const cookie = createAdminSessionCookie("default-admin");
    await logActivity("login", "default-admin", { email });
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

  return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
}
