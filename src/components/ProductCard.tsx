import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Heart, Star } from "lucide-react";
import { useStore } from "@/lib/store";
import { inr, type Product } from "@/data/products";
import { cn } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, toggleWishlist, inWishlist } = useStore();
  const [size, setSize] = useState<string>(product.sizes[0]);
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);
  const saved = inWishlist(product.id);

  const badgeStyle =
    product.badge === "BESTSELLER"
      ? "bg-gold text-ink"
      : "bg-brown text-primary-foreground";

  return (
    <div className="group relative overflow-hidden rounded-[4px] bg-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
      <Link to="/product/$slug" params={{ slug: product.slug }} className="relative block overflow-hidden">
        <div className="aspect-[4/5] overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
          />
        </div>
        {product.badge && (
          <span className={cn("absolute left-3 top-3 rounded-[2px] px-2.5 py-1 font-ui text-[10px] font-semibold uppercase tracking-wide", badgeStyle)}>
            {product.badge}
          </span>
        )}
        <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 translate-y-4 rounded-full bg-card/95 px-4 py-1.5 font-ui text-[11px] font-medium text-ink opacity-0 shadow transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          Quick View
        </span>
      </Link>

      <button
        onClick={() => toggleWishlist(product)}
        aria-label="Save to wishlist"
        className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-card/90 shadow transition-colors hover:bg-card"
      >
        <Heart className={cn("h-[18px] w-[18px]", saved ? "fill-brown text-brown" : "text-ink")} />
      </button>

      <div className="p-4">
        <p className="font-sans text-[11px] uppercase tracking-wide text-brown">{product.category}</p>
        <Link to="/product/$slug" params={{ slug: product.slug }}>
          <h3 className="mt-1 line-clamp-2 font-sans text-sm font-semibold leading-snug text-foreground">{product.name}</h3>
        </Link>
        <div className="mt-1.5 flex items-center gap-1 text-[12px] text-muted-foreground">
          <Star className="h-3.5 w-3.5 fill-gold text-gold" />
          <span>{product.rating}</span>
          <span>&middot; {product.reviews} reviews</span>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <span className="font-ui text-[15px] font-semibold text-foreground">{inr(product.price)}</span>
          <span className="text-[12px] text-muted-foreground line-through">{inr(product.mrp)}</span>
          <span className="font-ui text-[12px] font-semibold text-brown">{discount}% OFF</span>
        </div>

        <div className="mt-3 flex gap-1.5">
          {product.sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={cn(
                "grid h-7 w-7 place-items-center rounded-[2px] border font-ui text-[11px] transition-colors",
                size === s ? "border-brown bg-brown text-primary-foreground" : "border-border text-muted-foreground hover:border-brown",
              )}
            >
              {s}
            </button>
          ))}
        </div>

        <button
          onClick={() => addToCart(product, size)}
          className="mt-3 w-full rounded-[2px] bg-ink py-2.5 font-ui text-[12px] font-semibold uppercase tracking-wide text-white transition-colors hover:bg-brown"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
