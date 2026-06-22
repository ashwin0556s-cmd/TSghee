"use client";

import { Plus, Trash2, X } from "lucide-react";
import { FormEvent, useState } from "react";
import type { Product } from "@/data/products";
import { Button } from "@/components/ui/Button";

type AdminProduct = Product & { id: string };

export function AdminProductEditModal({
  product,
  onClose,
  onSave,
}: {
  product: AdminProduct;
  onClose: () => void;
  onSave: () => void;
}) {
  const [name, setName] = useState(product.name);
  const [category, setCategory] = useState(product.category);
  const [image, setImage] = useState(product.image);
  const [shortDescription, setShortDescription] = useState(product.shortDescription);
  const [description, setDescription] = useState(product.description);
  const [variants, setVariants] = useState(product.variants);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage("");

    const cleanVariants = variants.filter((v) => v.label && v.price > 0);

    if (!name.trim() || !image.trim() || !description.trim() || cleanVariants.length === 0) {
      setMessage("Please fill all required fields.");
      setSaving(false);
      return;
    }

    try {
      const response = await fetch("/api/admin/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({
          id: product.id,
          name: name.trim(),
          slug: product.slug,
          category: category.trim() || "Dairy",
          image: image.trim(),
          shortDescription: shortDescription.trim() || description.trim().slice(0, 96),
          description: description.trim(),
          status: "enabled",
          variants: cleanVariants,
        }),
      });

      if (!response.ok) throw new Error("Failed to update product.");

      setMessage("Product updated successfully.");
      setTimeout(onSave, 800);
    } catch {
      setMessage("Unable to update product.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-xl md:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-leaf">Edit Product</h2>
          <button
            onClick={onClose}
            className="rounded-lg hover:bg-cream p-2"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold text-leaf">
              Product Name
              <input
                className="focus-ring min-h-11 rounded-2xl border border-primary/15 bg-cream px-4"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-leaf">
              Category
              <input
                className="focus-ring min-h-11 rounded-2xl border border-primary/15 bg-cream px-4"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </label>
          </div>

          <label className="grid gap-2 text-sm font-semibold text-leaf">
            Image URL
            <input
              className="focus-ring min-h-11 rounded-2xl border border-primary/15 bg-cream px-4"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </label>

          <label className="grid gap-2 text-sm font-semibold text-leaf">
            Short Description
            <input
              className="focus-ring min-h-11 rounded-2xl border border-primary/15 bg-cream px-4"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
            />
          </label>

          <label className="grid gap-2 text-sm font-semibold text-leaf">
            Full Description
            <textarea
              className="focus-ring min-h-24 rounded-2xl border border-primary/15 bg-cream px-4 py-3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>

          <div>
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-bold text-leaf">Variants</p>
              <button
                type="button"
                className="focus-ring inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary"
                onClick={() => setVariants([...variants, { label: "", price: 0 }])}
              >
                <Plus size={16} /> Add
              </button>
            </div>
            <div className="grid gap-2">
              {variants.map((variant, index) => (
                <div key={index} className="grid gap-2 rounded-2xl bg-cream p-3 sm:grid-cols-[1fr_120px_40px]">
                  <input
                    className="focus-ring min-h-10 rounded-lg border border-primary/15 bg-white px-3"
                    value={variant.label}
                    onChange={(e) =>
                      setVariants(
                        variants.map((v, i) => (i === index ? { ...v, label: e.target.value } : v))
                      )
                    }
                    placeholder="250 ml, 1 kg"
                  />
                  <input
                    className="focus-ring min-h-10 rounded-lg border border-primary/15 bg-white px-3"
                    type="number"
                    value={variant.price}
                    onChange={(e) =>
                      setVariants(
                        variants.map((v, i) => (i === index ? { ...v, price: Number(e.target.value) } : v))
                      )
                    }
                    placeholder="Price"
                  />
                  <button
                    type="button"
                    onClick={() => setVariants(variants.filter((_, i) => i !== index))}
                    className="flex items-center justify-center rounded-lg bg-white hover:bg-red-50"
                  >
                    <Trash2 size={16} className="text-red-600" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {message && <p className="rounded-lg bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">{message}</p>}

          <div className="flex gap-3 pt-4">
            <Button variant="ghost" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={saving} className="flex-1">
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
