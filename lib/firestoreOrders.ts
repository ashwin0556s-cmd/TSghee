import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDb } from "@/lib/firebase";

export type OrderInput = {
  customerName: string;
  phone: string;
  address: string;
  productName: string;
  variant: string;
  quantity: number;
  total: number;
  status: "Pending" | "Processing" | "Delivered" | "Cancelled";
};

export async function addOrder(order: OrderInput) {
  const db = getDb();
  if (!db) {
    throw new Error("Firestore not initialized");
  }
  return addDoc(collection(db, "orders"), {
    ...order,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}
