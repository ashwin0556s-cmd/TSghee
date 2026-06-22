"use client";

import { Plus, Trash2 } from "lucide-react";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function AdminProductForm() {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"enabled" | "disabled">("enabled");
  const [variants, setVariants] = useState([{ label: "", price: "" }]);
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  async function submitProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    const cleanVariants = variants
      .filter((variant) => variant.label.trim() && Number(variant.price) > 0)
      .map((variant) => ({ label: variant.label.trim(), price: Number(variant.price) }));

    if (!name.trim() || !image.trim() || !description.trim() || cleanVariants.length === 0) {
      setMessage("Please fill product name, image URL, description and at least one variant.");
      setSaving(false);
      return;
    }

    try {
      const response = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          name: name.trim(),
          slug: slugify(name),
          category: category.trim() || "Dairy",
          image: image.trim(),
          shortDescription: shortDescription.trim() || description.trim().slice(0, 96),
          description: description.trim(),
          status,
          variants: cleanVariants,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data?.error || "Could not add product.");
      }

      setName("");
      setCategory("");
      setImage("");
      setShortDescription("");
      setDescription("");
      setStatus("enabled");
      setVariants([{ label: "", price: "" }]);
      setMessage("Product added to Firestore. It will appear on the Products page.");
    } catch (error) {
      setMessage(typeof error === "string" ? error : "Could not add product. Check Firebase setup and admin session.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={submitProduct} className="rounded-[2rem] bg-white p-6 shadow-premium md:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-leaf">
          Product Name
          <input className="focus-ring min-h-12 rounded-2xl border border-primary/15 bg-cream px-4" value={name} onChange={(event) => setName(event.target.value)} />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-leaf">
          Category
          <input className="focus-ring min-h-12 rounded-2xl border border-primary/15 bg-cream px-4" value={category} onChange={(event) => setCategory(event.target.value)} placeholder="Dairy, Sweet, Milk" />
        </label>
      </div>

      <label className="mt-5 grid gap-2 text-sm font-semibold text-leaf">
        Product Image URL
        <input className="focus-ring min-h-12 rounded-2xl border border-primary/15 bg-cream px-4" value={image} onChange={(event) => setImage(event.target.value)} placeholder="https://..." />
        <span className="text-xs text-leaf/60">
          Use a publicly accessible HTTPS URL that points directly to an image file like .jpg, .png, or .webp. Example: https://example.com/product.jpg
        </span>
      </label>

      {image ? (
        <div className="mt-4 overflow-hidden rounded-3xl border border-primary/10 bg-cream">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt="Product preview" className="h-56 w-full object-cover" />
        </div>
      ) : null}

      <label className="mt-5 grid gap-2 text-sm font-semibold text-leaf">
        Short Description
        <input className="focus-ring min-h-12 rounded-2xl border border-primary/15 bg-cream px-4" value={shortDescription} onChange={(event) => setShortDescription(event.target.value)} />
      </label>

      <label className="mt-5 grid gap-2 text-sm font-semibold text-leaf">
        Full Description
        <textarea className="focus-ring min-h-32 rounded-2xl border border-primary/15 bg-cream px-4 py-3" value={description} onChange={(event) => setDescription(event.target.value)} />
      </label>

      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-sm font-bold text-leaf">Variants</p>
          <button
            type="button"
            className="focus-ring inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary"
            onClick={() => setVariants((items) => [...items, { label: "", price: "" }])}
          >
            <Plus size={16} /> Add Variant
          </button>
        </div>
        <div className="grid gap-3">
          {variants.map((variant, index) => (
            <div key={index} className="grid gap-3 rounded-3xl bg-cream p-4 sm:grid-cols-[1fr_160px_44px]">
              <input
                className="focus-ring min-h-11 rounded-2xl border border-primary/15 bg-white px-4"
                value={variant.label}
                onChange={(event) =>
                  setVariants((items) => items.map((item, itemIndex) => (itemIndex === index ? { ...item, label: event.target.value } : item)))
                }
                placeholder="250 ml, 1 kg, 2 L tin can"
              />
              <input
                className="focus-ring min-h-11 rounded-2xl border border-primary/15 bg-white px-4"
                value={variant.price}
                onChange={(event) =>
                  setVariants((items) => items.map((item, itemIndex) => (itemIndex === index ? { ...item, price: event.target.value } : item)))
                }
                placeholder="Price"
                inputMode="numeric"
              />
              <button
                type="button"
                className="focus-ring flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-leaf"
                onClick={() => setVariants((items) => items.filter((_, itemIndex) => itemIndex !== index))}
                aria-label="Remove variant"
              >
                <Trash2 size={17} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <label className="mt-5 grid gap-2 text-sm font-semibold text-leaf">
        Product Status
        <select className="focus-ring min-h-12 rounded-2xl border border-primary/15 bg-cream px-4" value={status} onChange={(event) => setStatus(event.target.value as "enabled" | "disabled")}>
          <option value="enabled">Enabled</option>
          <option value="disabled">Disabled</option>
        </select>
      </label>

      {message ? <p className="mt-5 rounded-2xl bg-primary/10 px-4 py-3 text-sm font-semibold text-primary">{message}</p> : null}

      <Button className="mt-6 w-full" disabled={saving}>
        {saving ? "Saving..." : "Add Product"}
      </Button>
    </form>
  );
}
