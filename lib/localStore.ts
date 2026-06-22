import type { Product } from "@/data/products";

export type StoredOrder = {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  productName: string;
  variant: string;
  quantity: number;
  total: number;
  status: "Pending" | "Processing" | "Delivered" | "Cancelled";
  createdAt: string;
};

const PRODUCTS_KEY = "ts-ghee-admin-products";
const ORDERS_KEY = "ts-ghee-orders";

export function getAdminProducts(): Product[] {
  if (typeof window === "undefined") return [];

  try {
    return JSON.parse(window.localStorage.getItem(PRODUCTS_KEY) ?? "[]") as Product[];
  } catch {
    return [];
  }
}

export function saveAdminProducts(products: Product[]) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  } catch {
    // localStorage might not be available or be full
  }
}

export function getStoredOrders(): StoredOrder[] {
  if (typeof window === "undefined") return [];

  try {
    return JSON.parse(window.localStorage.getItem(ORDERS_KEY) ?? "[]") as StoredOrder[];
  } catch {
    return [];
  }
}

export function saveStoredOrder(order: StoredOrder) {
  if (typeof window === "undefined") return;

  try {
    const orders = getStoredOrders();
    window.localStorage.setItem(ORDERS_KEY, JSON.stringify([order, ...orders]));
  } catch {
    // localStorage might not be available or be full
  }
}
