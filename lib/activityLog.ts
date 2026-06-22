import { collection, addDoc, serverTimestamp, Timestamp } from "firebase/firestore";
import { getDb } from "@/lib/firebase";

export type ActivityLog = {
  action: string; // 'login', 'logout', 'product_create', 'product_update', 'product_delete', 'order_status_change'
  adminId: string;
  details?: Record<string, unknown>;
  timestamp?: Timestamp;
};

export async function logActivity(action: string, adminId: string, details?: Record<string, unknown>) {
  try {
    const db = getDb();
    if (!db) {
      // Firestore not initialized (e.g., during build)
      return;
    }
    const activityLogsCollection = collection(db, "activity_logs");
    await addDoc(activityLogsCollection, {
      action,
      adminId,
      details: details || {},
      timestamp: serverTimestamp(),
    });
  } catch (error) {
    console.error("Failed to log activity:", error);
    // Don't throw - logging failures shouldn't break the app
  }
}
