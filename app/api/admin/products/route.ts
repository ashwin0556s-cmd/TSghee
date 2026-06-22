import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { collection, getDocs, query, where, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
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

export async function GET(request: Request) {
  const adminId = await checkAdminAuth();

  if (!adminId) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const listMode = searchParams.get("list");

  try {
    const db = getDatabase();
    const snapshot = await getDocs(collection(db, "adminProducts"));
    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (listMode) {
      return NextResponse.json({ products });
    }

    return NextResponse.json({ products });
  } catch {
    return NextResponse.json({ error: "Unable to fetch products." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const adminId = await checkAdminAuth();

  if (!adminId) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = await request.json();
  const { name, slug, category, image, shortDescription, description, status, variants } = body;

  if (!name || !slug || !image || !description || !Array.isArray(variants) || variants.length === 0) {
    return NextResponse.json({ error: "Missing required product fields." }, { status: 400 });
  }

  try {
    const db = getDatabase();
    const slugQuery = query(collection(db, "adminProducts"), where("slug", "==", slug));
    const existing = await getDocs(slugQuery);

    if (!existing.empty) {
      return NextResponse.json({ error: "A product with this slug already exists." }, { status: 409 });
    }

    const docRef = await addDoc(collection(db, "adminProducts"), {
      name,
      slug,
      category,
      image,
      shortDescription,
      description,
      status,
      variants,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    await logActivity("product_create", adminId, { productId: docRef.id, productName: name, slug });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Unable to save product." }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const adminId = await checkAdminAuth();

  if (!adminId) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = await request.json();
  const { id, name, slug, category, image, shortDescription, description, status, variants } = body;

  if (!id || !name || !slug || !image || !description || !Array.isArray(variants) || variants.length === 0) {
    return NextResponse.json({ error: "Missing required product fields." }, { status: 400 });
  }

  try {
    const db = getDatabase();
    const productRef = doc(db, "adminProducts", id);
    await updateDoc(productRef, {
      name,
      slug,
      category,
      image,
      shortDescription,
      description,
      status,
      variants,
      updatedAt: serverTimestamp(),
    });

    await logActivity("product_update", adminId, { productId: id, productName: name, slug });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Unable to update product." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const adminId = await checkAdminAuth();

  if (!adminId) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing product ID." }, { status: 400 });
  }

  try {
    const db = getDatabase();
    const productRef = doc(db, "adminProducts", id);
    await deleteDoc(productRef);

    await logActivity("product_delete", adminId, { productId: id });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Unable to delete product." }, { status: 500 });
  }
}
