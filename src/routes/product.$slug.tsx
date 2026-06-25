import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Star, ChevronRight, Heart, Truck, ShieldCheck, ChevronDown, Plus, Minus } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { ProductCard } from "@/components/ProductCard";
import { getProduct, products, inr } from "@/data/products";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    return {
      meta: [
        { title: p ? `${p.name} | Click Attire` : "Product | Click Attire" },
        { name: "description", content: p?.description ?? "Shop premium women's fashion at Click Attire." },
        { property: "og:title", content: p?.name ?? "Click Attire" },
        { property: "og:image", content: p?.images[0] ?? "" },
        { property: "og:url", content: p ? `/product/${p.slug}` : "/" },
        { property: "og:type", content: "product" },
      ],
      links: p ? [{ rel: "canonical", href: `/product/${p.slug}` }] : [],
      scripts: p
        ? [{
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              name: p.name,
              image: p.images,
              brand: { "@type": "Brand", name: "Click Attire" },
              offers: { "@type": "Offer", price: String(p.price), priceCurrency: "INR", availability: "https://schema.org/InStock" },
              aggregateRating: { "@type": "AggregateRating", ratingValue: String(p.rating), reviewCount: p.reviews },
            }),
          }]
        : [],
    };
  },
  notFoundComponent: () => (
    <SiteLayout>
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <p className="font-display text-3xl">Product not found</p>
        <Link to="/shop" className="mt-4 rounded-[2px] bg-brown px-6 py-3 font-ui text-sm font-semibold text-primary-foreground">Back to Shop →</Link>
      </div>
    </SiteLayout>
  ),
  component: ProductPage,
});

const accordions = [
  { t: "Description", k: "desc" },
  { t: "Material & Care", k: "material" },
  { t: "Fit & Sizing", k: "fit" },
  { t: "Shipping & Returns", k: "ship" },
];

function ProductPage() {
  const { product } = Route.useLoaderData();
  const { addToCart, toggleWishlist, inWishlist } = useStore();
  const [activeImg, setActiveImg] = useState(0);
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0].name);
  const [qty, setQty] = useState(1);
  const [open, setOpen] = useState<string | null>("desc");
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  const related = products.filter((p) => p.id !== product.id).slice(0, 4);

  const accBody: Record<string, string> = {
    desc: product.description,
    material: "Premium fabric blend. Dry clean recommended. Do not bleach. Iron on low heat.",
    fit: "True to size with a relaxed drape. Model is 5'8\" wearing size S. Refer to the size guide for measurements.",
    ship: "Free shipping above ₹999. Dispatched within 24 hours. Easy 15-day returns on unworn items.",
  };

  return (
    <SiteLayout>
      <div className="mx-auto max-w-[1400px] px-5 py-8 lg:px-10">
        <div className="mb-6 flex items-center gap-1 text-[13px] text-muted-foreground">
          <Link to="/">Home</Link> <ChevronRight className="h-3.5 w-3.5" />
          <Link to="/shop">{product.category}</Link> <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid gap-10 lg:grid-cols-[55%_45%]">
          {/* Gallery */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-3">
              {product.images.map((img: string, i: number) => (
                <button key={i} onClick={() => setActiveImg(i)} className={cn("h-20 w-16 overflow-hidden rounded-[2px] border-2", activeImg === i ? "border-brown" : "border-transparent")}>
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
            <div className="flex-1 overflow-hidden rounded-md">
              <img src={product.images[activeImg]} alt={product.name} className="aspect-[4/5] w-full object-cover" />
            </div>
          </div>

          {/* Info */}
          <div>
            <p className="font-sans text-[11px] font-medium uppercase tracking-eyebrow text-brown">CLICK ATTIRE EXCLUSIVE</p>
            <h1 className="mt-2 font-display text-3xl font-bold lg:text-4xl">{product.name}</h1>
            <div className="mt-3 flex items-center gap-2 text-sm">
              <span className="flex items-center gap-1 text-gold"><Star className="h-4 w-4 fill-gold" /> {product.rating}</span>
              <span className="text-muted-foreground">({product.reviews} reviews)</span>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <span className="font-ui text-2xl font-semibold">{inr(product.price)}</span>
              <span className="text-muted-foreground line-through">{inr(product.mrp)}</span>
              <span className="font-ui font-semibold text-brown">{discount}% OFF</span>
            </div>
            <p className="mt-1 inline-block rounded-[2px] bg-success/15 px-2 py-1 font-ui text-[12px] font-semibold text-success">You save {inr(product.mrp - product.price)}!</p>

            <div className="no-scrollbar mt-5 flex gap-2 overflow-x-auto">
              {["10% off with CLICK10", "5% cashback on UPI", "No-cost EMI"].map((o) => (
                <span key={o} className="whitespace-nowrap rounded-full border border-blush-tan bg-ivory px-3 py-1.5 font-ui text-[12px] text-charcoal">{o}</span>
              ))}
            </div>

            {/* Size */}
            <div className="mt-7">
              <div className="flex items-center justify-between">
                <p className="font-ui text-sm font-semibold">Select Size</p>
                <button className="font-ui text-[12px] text-brown underline">Size Guide 📏</button>
              </div>
              <div className="mt-2.5 flex gap-2">
                {["XS", "S", "M", "L", "XL", "XXL"].map((s) => {
                  const oos = !product.sizes.includes(s);
                  return (
                    <button key={s} disabled={oos} onClick={() => setSize(s)} className={cn("grid h-11 w-11 place-items-center rounded-[2px] border font-ui text-sm", oos ? "cursor-not-allowed border-border text-muted-foreground/40 line-through" : size === s ? "border-brown bg-brown text-primary-foreground" : "border-border hover:border-brown")}>
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Color */}
            <div className="mt-6">
              <p className="font-ui text-sm font-semibold">Colour: <span className="font-normal text-muted-foreground">{color}</span></p>
              <div className="mt-2.5 flex gap-2.5">
                {product.colors.map((c: { name: string; hex: string }) => (
                  <button key={c.name} onClick={() => setColor(c.name)} title={c.name} className={cn("h-9 w-9 rounded-full border-2", color === c.name ? "border-brown" : "border-border")} style={{ backgroundColor: c.hex }} />
                ))}
              </div>
            </div>

            {/* Qty */}
            <div className="mt-6 flex items-center gap-3">
              <p className="font-ui text-sm font-semibold">Qty</p>
              <div className="flex items-center gap-3 rounded-[2px] border border-border">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2"><Minus className="h-3.5 w-3.5" /></button>
                <span className="font-ui">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-3 py-2"><Plus className="h-3.5 w-3.5" /></button>
              </div>
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button onClick={() => addToCart(product, size, qty)} className="flex-1 rounded-[2px] bg-ink py-4 font-ui text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-brown">
                Add to Cart 🛒
              </button>
              <button onClick={() => toggleWishlist(product)} className="flex flex-1 items-center justify-center gap-2 rounded-[2px] border-[1.5px] border-brown py-4 font-ui text-sm font-semibold text-brown transition-colors hover:bg-brown hover:text-primary-foreground">
                <Heart className={cn("h-4 w-4", inWishlist(product.id) && "fill-current")} /> Save to Wishlist
              </button>
            </div>

            <div className="mt-6 space-y-2 rounded-md border border-border p-4 text-sm">
              <p className="flex items-center gap-2"><Truck className="h-4 w-4 text-brown" /> Free delivery above ₹999 · Delivery by Mon, Jun 30</p>
              <p className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-brown" /> 15-day easy returns · 100% authentic</p>
            </div>

            <div className="mt-6 border-t border-border">
              {accordions.map((a) => (
                <div key={a.k} className="border-b border-border">
                  <button onClick={() => setOpen(open === a.k ? null : a.k)} className="flex w-full items-center justify-between py-4 font-ui text-sm font-semibold">
                    {a.t} <ChevronDown className={cn("h-4 w-4 transition-transform", open === a.k && "rotate-180")} />
                  </button>
                  {open === a.k && <p className="pb-4 text-sm leading-relaxed text-muted-foreground">{accBody[a.k]}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="mb-8 font-display text-3xl font-bold">You May Also Like</h2>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {related.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
