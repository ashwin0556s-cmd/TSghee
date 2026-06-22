import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { collection, getCountFromServer, query, where } from "firebase/firestore";
import { getDb } from "@/lib/firebase";
import { getAdminSessionCookieName, verifyAdminSessionToken } from "@/lib/auth";

function getDatabase() {
  const database = getDb();
  if (!database) {
    throw new Error("Firestore not initialized");
  }
  return database;
}

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(getAdminSessionCookieName())?.value;
  const adminId = verifyAdminSessionToken(token);

  if (!adminId) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const db = getDatabase();
    const productsQuery = query(collection(db, "adminProducts"), where("status", "==", "enabled"));
    const snapshot = await getCountFromServer(productsQuery);
    return NextResponse.json({ count: snapshot.data().count });
  } catch {
    return NextResponse.json({ error: "Unable to fetch product count." }, { status: 500 });
  }
}
