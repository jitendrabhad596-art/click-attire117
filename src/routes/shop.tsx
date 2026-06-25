import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SlidersHorizontal, ChevronRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { ProductCard } from "@/components/ProductCard";
import { useReveal } from "@/hooks/use-reveal";
import { products, categories } from "@/data/products";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop All | Click Attire" },
      { name: "description", content: "Explore every style at Click Attire — dresses, co-ord sets, tops, streetwear, Korean & luxury fashion." },
      { property: "og:title", content: "Shop All | Click Attire" },
      { property: "og:url", content: "/shop" },
    ],
    links: [{ rel: "canonical", href: "/shop" }],
  }),
  component: Shop,
});

const allSizes = ["XS", "S", "M", "L", "XL", "XXL"];
const sortOptions = ["Relevance", "Price: Low to High", "Price: High to Low", "Rating", "Newest"];

function Shop() {
  const ref = useReveal<HTMLDivElement>();
  const [selectedCats, setSelectedCats] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(4000);
  const [sizes, setSizes] = useState<string[]>([]);
  const [sort, setSort] = useState("Relevance");
  const [mobileFilters, setMobileFilters] = useState(false);

  const toggle = (arr: string[], v: string, set: (a: string[]) => void) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  let filtered = products.filter((p) => {
    if (selectedCats.length && !selectedCats.includes(p.category) && !selectedCats.includes(p.collection)) return false;
    if (p.price > maxPrice) return false;
    if (sizes.length && !sizes.some((s) => p.sizes.includes(s))) return false;
    return true;
  });

  if (sort === "Price: Low to High") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === "Price: High to Low") filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sort === "Rating") filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  const Filters = () => (
    <div className="space-y-7">
      <div>
        <p className="mb-3 font-ui text-sm font-semibold">Category</p>
        <div className="space-y-2">
          {categories.map((c) => (
            <label key={c} className="flex cursor-pointer items-center gap-2.5 text-sm text-charcoal">
              <input type="checkbox" checked={selectedCats.includes(c)} onChange={() => toggle(selectedCats, c, setSelectedCats)} className="accent-brown" />
              {c}
            </label>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-3 font-ui text-sm font-semibold">Price: up to ₹{maxPrice.toLocaleString("en-IN")}</p>
        <input type="range" min={500} max={4000} step={100} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-brown" />
      </div>
      <div>
        <p className="mb-3 font-ui text-sm font-semibold">Size</p>
        <div className="flex flex-wrap gap-2">
          {allSizes.map((s) => (
            <button key={s} onClick={() => toggle(sizes, s, setSizes)} className={`grid h-9 w-9 place-items-center rounded-[2px] border font-ui text-[12px] ${sizes.includes(s) ? "border-brown bg-brown text-primary-foreground" : "border-border hover:border-brown"}`}>
              {s}
            </button>
          ))}
        </div>
      </div>
      <button
        onClick={() => { setSelectedCats([]); setMaxPrice(4000); setSizes([]); setMobileFilters(false); }}
        className="w-full rounded-[2px] border border-brown py-2.5 font-ui text-sm font-semibold text-brown hover:bg-brown hover:text-primary-foreground"
      >
        Clear All
      </button>
    </div>
  );

  return (
    <SiteLayout>
      <div className="relative h-56 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=1600&q=80" alt="Shop" className="h-full w-full object-cover" />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
          <h1 className="font-display text-4xl font-bold text-white lg:text-5xl">Explore Every Style</h1>
          <div className="mt-2 flex items-center gap-1 text-sm text-white/80">
            <Link to="/">Home</Link> <ChevronRight className="h-3.5 w-3.5" /> <span>Shop</span>
          </div>
        </div>
      </div>

      <div ref={ref} className="mx-auto max-w-[1400px] px-5 py-10 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <aside className="hidden lg:block">
            <Filters />
          </aside>

          <div>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">Showing {filtered.length} products</p>
              <div className="flex items-center gap-3">
                <button onClick={() => setMobileFilters(true)} className="flex items-center gap-1.5 rounded-[2px] border border-border px-3 py-2 text-sm lg:hidden">
                  <SlidersHorizontal className="h-4 w-4" /> Filter
                </button>
                <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-[2px] border border-border bg-card px-3 py-2 text-sm outline-none">
                  {sortOptions.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
            </div>

            {filtered.length ? (
              <div className="reveal grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6">
                {filtered.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            ) : (
              <p className="py-20 text-center text-muted-foreground">No products match your filters.</p>
            )}
          </div>
        </div>
      </div>

      {mobileFilters && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileFilters(false)} />
          <div className="absolute bottom-0 max-h-[80vh] w-full overflow-y-auto rounded-t-2xl bg-card p-6">
            <div className="mb-5 flex items-center justify-between">
              <p className="font-display text-xl">Filters</p>
              <button onClick={() => setMobileFilters(false)} className="text-sm text-brown">Done</button>
            </div>
            <Filters />
          </div>
        </div>
      )}
    </SiteLayout>
  );
}
