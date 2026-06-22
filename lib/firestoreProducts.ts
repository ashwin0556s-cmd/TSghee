import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import type { Product } from "@/data/products";
import { getDb } from "@/lib/firebase";

export type AdminProductInput = {
  name: string;
  slug: string;
  category: string;
  image: string;
  shortDescription: string;
  description: string;
  variants: { label: string; price: number }[];
  status: "enabled" | "disabled";
};

export async function addAdminProduct(product: AdminProductInput) {
  const db = getDb();
  if (!db) {
    throw new Error("Firestore not initialized");
  }
  const productsCollection = collection(db, "adminProducts");
  return addDoc(productsCollection, {
    ...product,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function getAdminProducts(): Promise<Product[]> {
  const db = getDb();
  if (!db) {
    throw new Error("Firestore not initialized");
  }
  const productsCollection = collection(db, "adminProducts");
  const snapshot = await getDocs(query(productsCollection, orderBy("createdAt", "desc")));

  return snapshot.docs
    .map((item) => {
      const data = item.data() as AdminProductInput;

      if (data.status !== "enabled") {
        return null;
      }

      return {
        slug: data.slug,
        name: data.name,
        image: data.image,
        shortDescription: data.shortDescription,
        description: data.description,
        variants: data.variants,
        category: data.category,
      } as Product | null;
    })
    .filter((product): product is Product => Boolean(product && product.name));
}

export async function getAdminProductBySlug(slug: string): Promise<Product | null> {
  const db = getDb();
  if (!db) {
    throw new Error("Firestore not initialized");
  }
  const productsCollection = collection(db, "adminProducts");
  const snapshot = await getDocs(query(productsCollection, where("slug", "==", slug)));
  const item = snapshot.docs[0];

  if (!item) return null;

  const data = item.data() as AdminProductInput;
  if (data.status === "disabled") return null;

  return {
    slug: data.slug,
    name: data.name,
    image: data.image,
    shortDescription: data.shortDescription,
    description: data.description,
    variants: data.variants,
    category: data.category,
  } as Product;
}

export async function getAdminProductById(id: string): Promise<Product | null> {
  const db = getDb();
  if (!db) {
    throw new Error("Firestore not initialized");
  }
  const snapshot = await getDoc(doc(db, "adminProducts", id));
  if (!snapshot.exists()) return null;

  const data = snapshot.data() as AdminProductInput;
  return {
    slug: data.slug,
    name: data.name,
    image: data.image,
    shortDescription: data.shortDescription,
    description: data.description,
    variants: data.variants,
    category: data.category,
  } as Product;
}
