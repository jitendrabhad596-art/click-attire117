export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  collection: string;
  price: number;
  mrp: number;
  rating: number;
  reviews: number;
  sold: number;
  images: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  badge?: "NEW" | "BESTSELLER" | "TRENDING";
  description: string;
};

const U = (id: string, w = 800) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export const products: Product[] = [
  {
    id: "1",
    slug: "ivory-satin-slip-dress",
    name: "Ivory Satin Slip Dress",
    category: "Dresses",
    collection: "Luxury",
    price: 1299,
    mrp: 1999,
    rating: 4.6,
    reviews: 128,
    sold: 2847,
    images: [U("1595777457583-95e059d581b8"), U("1539008835657-9e8e9680c956"), U("1572804013309-59a88b7e92f1")],
    colors: [{ name: "Ivory", hex: "#FAF8F5" }, { name: "Brown", hex: "#9B5A22" }],
    sizes: ["XS", "S", "M", "L", "XL"],
    badge: "NEW",
    description:
      "A liquid-smooth satin slip cut on the bias for an effortless drape. The kind of dress that whispers rather than shouts.",
  },
  {
    id: "2",
    slug: "tan-linen-coord-set",
    name: "Tan Linen Co-ord Set",
    category: "Co-ord Sets",
    collection: "Gen-Z",
    price: 1599,
    mrp: 2499,
    rating: 4.8,
    reviews: 214,
    sold: 3120,
    images: [U("1483985988355-763728e1935b"), U("1485968579580-b6d095142e6e"), U("1487412720507-e7ab37603c6f")],
    colors: [{ name: "Tan", hex: "#D8C4B2" }, { name: "Black", hex: "#111111" }],
    sizes: ["XS", "S", "M", "L"],
    badge: "BESTSELLER",
    description: "Matching relaxed blazer and trouser in breathable linen. Throw it on and look styled in seconds.",
  },
  {
    id: "3",
    slug: "korean-oversized-shirt",
    name: "Korean Oversized Shirt",
    category: "Korean",
    collection: "Korean",
    price: 999,
    mrp: 1599,
    rating: 4.5,
    reviews: 97,
    sold: 1840,
    images: [U("1490481651871-ab68de25d43d"), U("1434389677669-e08b4cac3105"), U("1496747611176-843222e1e57c")],
    colors: [{ name: "Cream", hex: "#FAF8F5" }, { name: "Sage", hex: "#A8C0A0" }],
    sizes: ["S", "M", "L", "XL"],
    badge: "TRENDING",
    description: "Drop-shoulder oversized fit inspired by Seoul street style. Tuck it, knot it, or let it flow.",
  },
  {
    id: "4",
    slug: "ribbed-crop-top",
    name: "Ribbed Knit Crop Top",
    category: "Tops",
    collection: "Gen-Z",
    price: 699,
    mrp: 1199,
    rating: 4.4,
    reviews: 156,
    sold: 4210,
    images: [U("1503342217505-b0a15ec3261c"), U("1496747611176-843222e1e57c"), U("1485462537746-965f33f7f6a7")],
    colors: [{ name: "Blush", hex: "#E8CFC5" }, { name: "Ivory", hex: "#FAF8F5" }],
    sizes: ["XS", "S", "M", "L"],
    badge: "BESTSELLER",
    description: "A second-skin ribbed crop with a sculpted neckline. Pairs with everything in your edit.",
  },
  {
    id: "5",
    slug: "black-evening-gown",
    name: "Midnight Evening Gown",
    category: "Dresses",
    collection: "Luxury",
    price: 2499,
    mrp: 3999,
    rating: 4.9,
    reviews: 64,
    sold: 920,
    images: [U("1566174053879-31528523f8ae"), U("1612722432474-b971cdcea546"), U("1539008835657-9e8e9680c956")],
    colors: [{ name: "Midnight", hex: "#111111" }],
    sizes: ["XS", "S", "M", "L", "XL"],
    badge: "NEW",
    description: "A floor-sweeping silhouette in fluid crepe. Limited edition, styled by our fashion editors.",
  },
  {
    id: "6",
    slug: "cargo-street-pants",
    name: "Utility Cargo Street Pants",
    category: "Streetwear",
    collection: "Gen-Z",
    price: 1199,
    mrp: 1899,
    rating: 4.3,
    reviews: 88,
    sold: 1560,
    images: [U("1517445312882-bc9910d016b7"), U("1485462537746-965f33f7f6a7"), U("1483985988355-763728e1935b")],
    colors: [{ name: "Olive", hex: "#4A6741" }, { name: "Sand", hex: "#D8C4B2" }],
    sizes: ["S", "M", "L", "XL"],
    badge: "TRENDING",
    description: "Relaxed cargo silhouette with cinched ankles. The streetwear staple that anchors every fit.",
  },
  {
    id: "7",
    slug: "floral-wrap-dress",
    name: "Floral Wrap Midi Dress",
    category: "Dresses",
    collection: "Gen-Z",
    price: 1399,
    mrp: 2199,
    rating: 4.7,
    reviews: 234,
    sold: 2980,
    images: [U("1572804013309-59a88b7e92f1"), U("1515372039744-b8f02a3ae446"), U("1496747611176-843222e1e57c")],
    colors: [{ name: "Terracotta", hex: "#C4654A" }, { name: "Sage", hex: "#A8C0A0" }],
    sizes: ["XS", "S", "M", "L", "XL"],
    badge: "BESTSELLER",
    description: "A flattering wrap silhouette in a painterly floral print. Day-to-night in one move.",
  },
  {
    id: "8",
    slug: "luxe-cashmere-knit",
    name: "Luxe Cashmere-Blend Knit",
    category: "Tops",
    collection: "Luxury",
    price: 1899,
    mrp: 2999,
    rating: 4.8,
    reviews: 72,
    sold: 1120,
    images: [U("1434389677669-e08b4cac3105"), U("1490481651871-ab68de25d43d"), U("1485968579580-b6d095142e6e")],
    colors: [{ name: "Camel", hex: "#C9A36A" }, { name: "Ivory", hex: "#FAF8F5" }],
    sizes: ["S", "M", "L"],
    badge: "NEW",
    description: "Featherlight cashmere-blend knit with a relaxed drape. Premium fabric, timeless silhouette.",
  },
];

export const categories = [
  "Dresses",
  "Co-ord Sets",
  "Tops",
  "Streetwear",
  "Korean",
  "Luxury",
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
