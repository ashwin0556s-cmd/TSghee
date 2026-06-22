export type ProductVariant = {
  label: string;
  price: number;
};

export type Product = {
  slug: string;
  name: string;
  category: string;
  image: string;
  shortDescription: string;
  description: string;
  variants: ProductVariant[];
  highlight?: string;
};

export const products: Product[] = [
  {
    slug: "ghee",
    name: "Ghee",
    category: "Ghee & Oils",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=1200&q=85",
    shortDescription: "Aromatic traditional ghee with a rich golden finish.",
    description:
      "Premium ghee prepared for everyday cooking, sweets and festive recipes. Smooth aroma, deep flavor and a clean traditional finish.",
    variants: [
      { label: "250 ml jar", price: 220 },
      { label: "500 ml jar", price: 430 },
      { label: "1 L bottle", price: 840 },
      { label: "2 L tin can", price: 1650 },
    ],
    highlight: "Traditional favorite",
  },
  {
    slug: "butter",
    name: "Butter",
    category: "Spreads & Butter",
    image: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=1200&q=85",
    shortDescription: "Fresh, creamy butter for cooking and breakfast.",
    description:
      "Creamy butter with a smooth texture, ideal for toast, baking, cooking and home recipes that need a fresh dairy touch.",
    variants: [
      { label: "100 g pack", price: 70 },
      { label: "250 g pack", price: 165 },
      { label: "500 g pack", price: 320 },
    ],
  },
  {
    slug: "paneer",
    name: "Paneer",
    category: "Cheese & Dairy",
    image: "https://images.unsplash.com/photo-1631452180539-96aca7d48617?auto=format&fit=crop&w=1200&q=85",
    shortDescription: "Soft paneer for gravies, starters and family meals.",
    description:
      "Soft and fresh paneer prepared for curries, tikkas, snacks and restaurant-style dishes at home.",
    variants: [
      { label: "200 g pack", price: 110 },
      { label: "500 g pack", price: 260 },
      { label: "1 kg pack", price: 500 },
    ],
  },
  {
    slug: "curd",
    name: "Curd",
    category: "Yogurt & Cultured",
    image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1200&q=85",
    shortDescription: "Thick farm-style curd for daily meals.",
    description:
      "Thick, fresh curd with a clean taste, made for daily lunch, dinner and traditional South Indian dishes.",
    variants: [
      { label: "500 ml cup", price: 45 },
      { label: "1 L tub", price: 85 },
      { label: "2 L family pack", price: 165 },
    ],
  },
  {
    slug: "milk",
    name: "Milk",
    category: "Milk & Dairy Drinks",
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=1200&q=85",
    shortDescription: "Fresh milk with door delivery available.",
    description:
      "Fresh milk supplied for homes with convenient door delivery. Suitable for coffee, tea, cooking and daily family use.",
    variants: [
      { label: "500 ml pouch", price: 32 },
      { label: "1 L pouch", price: 62 },
      { label: "Monthly door delivery", price: 1800 },
    ],
    highlight: "Home delivery",
  },
  {
    slug: "cheese",
    name: "Cheese",
    category: "Cheese & Dairy",
    image: "https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&w=1200&q=85",
    shortDescription: "Rich dairy cheese for snacks and cooking.",
    description:
      "Fresh dairy cheese for sandwiches, snacks, cooking and family recipes. Easy to use and full of dairy richness.",
    variants: [
      { label: "200 g block", price: 150 },
      { label: "500 g block", price: 360 },
      { label: "1 kg block", price: 700 },
    ],
  },
  {
    slug: "palkova-with-sugar",
    name: "Palkova With Sugar",
    category: "Sweets & Specials",
    image: "https://images.unsplash.com/photo-1605197181726-e3bd08490ba1?auto=format&fit=crop&w=1200&q=85",
    shortDescription: "Traditional sweet palkova for retail and wholesale.",
    description:
      "Classic sweet palkova prepared for gifting, functions, family occasions and wholesale orders.",
    variants: [
      { label: "250 g box", price: 170 },
      { label: "500 g box", price: 330 },
      { label: "1 kg box", price: 640 },
    ],
    highlight: "Retail & wholesale",
  },
  {
    slug: "palkova-without-sugar",
    name: "Palkova Without Sugar",
    category: "Sweets & Specials",
    image: "https://images.unsplash.com/photo-1605197181726-e3bd08490ba1?auto=format&fit=crop&w=1200&q=85",
    shortDescription: "Unsweetened palkova option for custom taste.",
    description:
      "A no-sugar palkova option for customers who prefer a less sweet traditional dairy sweet.",
    variants: [
      { label: "250 g box", price: 185 },
      { label: "500 g box", price: 360 },
      { label: "1 kg box", price: 700 },
    ],
  },
];

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}
