import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { useStore } from "@/lib/store";
import { products, inr } from "@/data/products";

const trending = ["Co-ord Sets", "Satin Dresses", "Korean Fits", "Cargo Pants", "Cashmere Knit"];

export function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useStore();
  const [q, setQ] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setSearchOpen]);

  if (!searchOpen) return null;

  const results = q
    ? products.filter((p) => (p.name + p.category + p.collection).toLowerCase().includes(q.toLowerCase()))
    : [];

  return (
    <div className="fixed inset-0 z-[80] flex justify-center bg-black/50 p-4 pt-[10vh] animate-fade-in" onClick={() => setSearchOpen(false)}>
      <div
        className="h-fit w-full max-w-2xl animate-scale-in rounded-lg bg-card p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search dresses, co-ords, collections..."
            className="flex-1 bg-transparent text-lg outline-none placeholder:text-muted-foreground"
          />
          <button onClick={() => setSearchOpen(false)} aria-label="Close search">
            <X className="h-5 w-5" />
          </button>
        </div>

        {!q && (
          <div className="pt-5">
            <p className="mb-3 font-ui text-xs font-semibold uppercase tracking-wide text-muted-foreground">Trending Searches</p>
            <div className="flex flex-wrap gap-2">
              {trending.map((t) => (
                <button
                  key={t}
                  onClick={() => setQ(t)}
                  className="rounded-full border border-border px-4 py-1.5 font-display text-sm italic transition-colors hover:border-brown hover:text-brown"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}

        {q && (
          <div className="max-h-[50vh] space-y-2 overflow-y-auto pt-4">
            {results.length === 0 ? (
              <p className="py-8 text-center text-muted-foreground">
                Nothing for "{q}" — try different keywords
              </p>
            ) : (
              results.map((p) => (
                <Link
                  key={p.id}
                  to="/product/$slug"
                  params={{ slug: p.slug }}
                  onClick={() => setSearchOpen(false)}
                  className="flex items-center gap-3 rounded-[2px] p-2 transition-colors hover:bg-muted"
                >
                  <img src={p.images[0]} alt={p.name} className="h-14 w-12 rounded-[2px] object-cover" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.category}</p>
                  </div>
                  <span className="font-ui text-sm font-semibold text-brown">{inr(p.price)}</span>
                </Link>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
