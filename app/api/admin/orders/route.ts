import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { collection, getDocs, query, orderBy, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { getDb } from "@/lib/firebase";
import { getAdminSessionCookieName, verifyAdminSessionToken } from "@/lib/auth";
import { logActivity } from "@/lib/activityLog";

function getDatabase() {
  const database = getDb();
  if (!database) {
    throw new Error("Firestore not initialized");
  }
  return database;
}

async function checkAdminAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get(getAdminSessionCookieName())?.value;
  const adminId = verifyAdminSessionToken(token);

  if (!adminId) {
    return null;
  }

  return adminId;
}

export async function GET() {
  const adminId = await checkAdminAuth();

  if (!adminId) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const db = getDatabase();
    const ordersQuery = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(ordersQuery);

    const orders = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ orders });
  } catch {
    return NextResponse.json({ error: "Unable to fetch orders." }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const adminId = await checkAdminAuth();

  if (!adminId) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = await request.json();
  const { id, status } = body;

  if (!id || !status) {
    return NextResponse.json({ error: "Missing order ID or status." }, { status: 400 });
  }

  try {
    const db = getDatabase();
    const orderRef = doc(db, "orders", id);
    await updateDoc(orderRef, {
      status,
      updatedAt: serverTimestamp(),
    });

    await logActivity("order_status_change", adminId, { orderId: id, newStatus: status });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Unable to update order." }, { status: 500 });
  }
}
