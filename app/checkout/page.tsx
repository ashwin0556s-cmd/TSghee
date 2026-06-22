import { Suspense } from "react";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

export const metadata = {
  title: "Checkout | TS Ghee Store",
  description: "Place a WhatsApp dairy order with TS Ghee Store.",
};

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="container-page py-16 text-leaf">Loading checkout...</div>}>
      <CheckoutForm />
    </Suspense>
  );
}
