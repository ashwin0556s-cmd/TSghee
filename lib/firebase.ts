import { getApps, initializeApp } from "firebase/app";
import type { Firestore } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  throw new Error("Missing Firebase configuration. Set NEXT_PUBLIC_FIREBASE_* environment variables.");
}

// Initialize Firebase app (safe to call multiple times - returns existing instance)
export const firebaseApp = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

// Lazy initialize Firestore database
// On server during build, this might be null, but it will be initialized on first use
let dbCache: Firestore | null = null;

export function getDb(): Firestore {
  if (!dbCache) {
    dbCache = getFirestore(firebaseApp);
  }
  return dbCache;
}

// For backward compatibility with existing code that imports db directly
// This will initialize on first import in browser/runtime
export const db = (() => {
  try {
    return getFirestore(firebaseApp);
  } catch {
    return null;
  }
})() as Firestore | null;
