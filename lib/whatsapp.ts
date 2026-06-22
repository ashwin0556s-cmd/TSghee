import { business } from "@/data/business";

type OrderPayload = {
  customerName: string;
  phone: string;
  address: string;
  productName: string;
  variant: string;
  quantity: number;
  total: number;
};

export function buildWhatsAppOrderUrl(order: OrderPayload) {
  const message = [
    "NEW ORDER",
    "",
    `Customer Name: ${order.customerName}`,
    `Phone: ${order.phone}`,
    `Address: ${order.address}`,
    "",
    "Products:",
    `${order.productName} - ${order.variant}`,
    `Quantity: ${order.quantity}`,
    `Total Amount: Rs. ${order.total}`,
    "",
    "Note: No platform charge or extra fee is collected. Customer pays only for the product.",
  ].join("\n");

  return `https://wa.me/91${business.whatsapp}?text=${encodeURIComponent(message)}`;
}
