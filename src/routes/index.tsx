import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Truck, RotateCcw, BadgeCheck, Gem, ArrowRight, Star } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { ProductCard } from "@/components/ProductCard";
import { useReveal } from "@/hooks/use-reveal";
import { products, inr } from "@/data/products";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Click Attire | Premium Women's Fashion" },
      { name: "description", content: "Curated luxury fashion for the woman who knows exactly who she is. Dresses, co-ord sets, Gen-Z & Korean styles. Free shipping above ₹999." },
      { property: "og:title", content: "Click Attire | Premium Women's Fashion" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const slides = [
  {
    eyebrow: "NEW SEASON 2025",
    title: "Dress Like",
    titleItalic: "You Mean It.",
    subtitle: "Curated luxury fashion for the woman who knows exactly who she is.",
    img: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1920&q=85",
  },
  {
    eyebrow: "THE GEN-Z EDIT",
    title: "The Gen-Z Edit",
    titleItalic: "Is Here.",
    subtitle: "Co-ords, crop tops, Korean fashion & streetwear that hits different.",
    img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1920&q=85",
  },
  {
    eyebrow: "EXCLUSIVE",
    title: "Luxury.",
    titleItalic: "Redefined.",
    subtitle: "Exquisite fabrics, timeless silhouettes, details that whisper.",
    img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1920&q=85",
  },
];

function Home() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <SiteLayout overHero>
      <div ref={ref}>
        <Hero />
        <TrustBar />
        <NewArrivals />
        <TrendingNow />
        <BestSellers />
        <LuxuryFeature />
        <GenZ />
        <ShopByCategory />
        <ShopByOccasion />
        <InfluencerPicks />
        <InstagramGallery />
        <Reviews />
        <Newsletter />
      </div>
    </SiteLayout>
  );
}

function Hero() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);
  const s = slides[i];

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {slides.map((sl, idx) => (
        <img
          key={idx}
          src={sl.img}
          alt={sl.title}
          fetchPriority={idx === 0 ? "high" : "low"}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000"
          style={{ opacity: idx === i ? 1 : 0 }}
        />
      ))}
      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(17,17,17,0.6) 0%, rgba(17,17,17,0.2) 60%, transparent 100%)" }} />

      <div className="absolute bottom-[16%] left-0 w-full px-5 lg:px-16">
        <div key={i} className="max-w-[650px] animate-fade-in text-white">
          <p className="mb-4 font-sans text-[11px] font-medium uppercase tracking-eyebrow text-gold">{s.eyebrow}</p>
          <h1 className="font-display text-[44px] font-black leading-[1.02] lg:text-7xl">
            {s.title}
            <br />
            <span className="italic font-normal">{s.titleItalic}</span>
          </h1>
          <p className="mt-5 max-w-md font-sans text-base font-light text-white/85 lg:text-lg">{s.subtitle}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/shop" className="rounded-[2px] bg-brown px-9 py-4 font-ui text-[15px] font-semibold text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-brown-dark hover:shadow-xl">
              Shop New Arrivals &rarr;
            </Link>
            <Link to="/collections" className="rounded-[2px] border-[1.5px] border-white px-8 py-4 font-ui text-[15px] font-medium text-white transition-colors hover:bg-white hover:text-ink">
              Explore Collections
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Slide ${idx + 1}`}
            className={`h-2.5 rounded-full transition-all ${idx === i ? "w-7 bg-brown" : "w-2.5 bg-white/60"}`}
          />
        ))}
      </div>
    </section>
  );
}

function TrustBar() {
  const items = [
    { icon: Truck, t: "Free Shipping", s: "On orders above ₹999" },
    { icon: RotateCcw, t: "Easy Returns", s: "15-day hassle-free returns" },
    { icon: BadgeCheck, t: "100% Authentic", s: "Curated & quality-checked" },
    { icon: Gem, t: "Premium Quality", s: "Luxury fabrics & craftsmanship" },
  ];
  return (
    <section className="border-y border-blush-tan bg-ivory">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-6 px-5 py-7 lg:grid-cols-4 lg:px-10">
        {items.map((it) => (
          <div key={it.t} className="flex items-center justify-center gap-3 text-center sm:text-left">
            <it.icon className="h-5 w-5 shrink-0 text-brown" />
            <div>
              <p className="font-sans text-[13px] font-semibold text-foreground">{it.t}</p>
              <p className="font-sans text-[12px] text-muted-foreground">{it.s}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title, subtitle, gold }: { eyebrow: string; title: string; subtitle?: string; gold?: boolean }) {
  return (
    <div className="reveal mx-auto mb-10 max-w-xl text-center">
      <p className={`mb-3 font-sans text-[11px] font-medium uppercase tracking-eyebrow ${gold ? "text-gold" : "text-brown"}`}>{eyebrow}</p>
      <h2 className="font-display text-4xl font-bold text-foreground lg:text-5xl">{title}</h2>
      {subtitle && <p className="mt-3 font-sans text-base text-muted-foreground">{subtitle}</p>}
    </div>
  );
}

const tabs = ["All", "Dresses", "Co-ord Sets", "Tops", "Streetwear", "Korean"];

function NewArrivals() {
  const [tab, setTab] = useState("All");
  const list = tab === "All" ? products : products.filter((p) => p.category === tab || (tab === "Co-ord Sets" && p.category === "Co-ord Sets"));
  return (
    <section className="bg-card py-24">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <SectionHeader eyebrow="JUST DROPPED" title="New Arrivals" subtitle="Fresh styles added every week. Be the first to wear it." gold />
        <div className="reveal mb-10 flex flex-wrap justify-center gap-2.5">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-full px-6 py-2.5 font-ui text-[13px] font-medium transition-colors ${
                tab === t ? "bg-ink text-white" : "border border-blush-tan text-charcoal hover:bg-ivory"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="reveal grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {(list.length ? list : products).slice(0, 8).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="reveal mt-12 text-center">
          <Link to="/shop" className="inline-flex items-center gap-2 rounded-[2px] border-[1.5px] border-brown px-8 py-3.5 font-ui text-[15px] font-semibold text-brown transition-colors hover:bg-brown hover:text-primary-foreground">
            View All New Arrivals <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function TrendingNow() {
  const minis = products.slice(2, 6);
  return (
    <section className="bg-ivory py-24">
      <div className="mx-auto grid max-w-[1400px] gap-6 px-5 lg:grid-cols-[55%_45%] lg:px-10">
        <Link to="/shop" className="reveal group relative min-h-[420px] overflow-hidden rounded-md lg:min-h-[560px]">
          <img src={products[0].images[0]} alt="Trending" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <span className="absolute left-5 top-5 rounded-full bg-brown px-4 py-1.5 font-ui text-[12px] font-semibold text-primary-foreground">🔥 TRENDING</span>
          <div className="absolute bottom-7 left-7">
            <h2 className="font-display text-3xl font-bold italic text-white lg:text-4xl">The Edit Everyone<br />Is Talking About</h2>
          </div>
        </Link>
        <div className="reveal grid grid-cols-2 gap-4">
          {minis.map((p) => (
            <Link key={p.id} to="/product/$slug" params={{ slug: p.slug }} className="group overflow-hidden rounded-md bg-card">
              <div className="aspect-square overflow-hidden">
                <img src={p.images[0]} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-3">
                <p className="truncate text-sm font-semibold">{p.name}</p>
                <p className="font-ui text-sm font-semibold text-brown">{inr(p.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function BestSellers() {
  const list = [...products].sort((a, b) => b.sold - a.sold).slice(0, 4);
  return (
    <section className="bg-card py-24">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <SectionHeader eyebrow="🏆 COMMUNITY FAVOURITE" title="Best Sellers" subtitle="The pieces our girls keep coming back for." />
        <div className="reveal grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {list.map((p) => (
            <div key={p.id}>
              <ProductCard product={p} />
              <p className="mt-1.5 px-1 font-sans text-[12px] text-brown">{p.sold.toLocaleString("en-IN")} sold this month</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LuxuryFeature() {
  return (
    <section className="grid bg-ink lg:grid-cols-2">
      <div className="reveal min-h-[400px] overflow-hidden lg:min-h-[680px]">
        <img src="https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=85" alt="Luxury Collection" loading="lazy" className="h-full w-full object-cover" />
      </div>
      <div className="reveal flex flex-col justify-center px-8 py-16 lg:px-16">
        <p className="mb-3 font-sans text-[11px] font-medium uppercase tracking-eyebrow text-gold">EXCLUSIVE</p>
        <h2 className="font-display text-4xl font-bold text-white lg:text-5xl">The Luxury<br />Collection</h2>
        <p className="mt-5 max-w-md font-sans text-[17px] font-light text-white/75">
          Crafted for the woman who doesn't compromise. Exquisite fabrics, timeless silhouettes, and details that whisper rather than shout.
        </p>
        <ul className="mt-6 space-y-2.5">
          {["Premium Italian-inspired fabrics", "Limited edition drops", "Styled by professional fashion editors"].map((f) => (
            <li key={f} className="flex items-center gap-3 font-sans text-white/80">
              <span className="text-gold">✦</span> {f}
            </li>
          ))}
        </ul>
        <Link to="/collections" className="mt-8 w-fit rounded-[2px] bg-brown px-8 py-3.5 font-ui text-[15px] font-semibold text-primary-foreground transition-colors hover:bg-brown-dark">
          Explore Luxury
        </Link>
        <p className="mt-6 font-display text-2xl italic text-gold">From ₹2,499</p>
      </div>
    </section>
  );
}

const genzTiles = [
  { label: "Korean Fashion", img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80", tall: true },
  { label: "Street Style", img: "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=600&q=80" },
  { label: "Co-ord Sets", img: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=600&q=80" },
  { label: "Crop Tops", img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80" },
  { label: "Oversized Fits", img: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=600&q=80", tall: true },
];

function GenZ() {
  return (
    <section className="bg-soft-blush/30 py-24">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <SectionHeader eyebrow="MADE FOR THE BOLD" title="The Gen-Z Edit" subtitle="Co-ords, crop tops, Korean fashion & streetwear that hits different." />
        <div className="reveal grid auto-rows-[220px] grid-cols-2 gap-4 lg:grid-cols-3">
          {genzTiles.map((t) => (
            <Link key={t.label} to="/shop" className={`group relative overflow-hidden rounded-md ${t.tall ? "row-span-2" : ""}`}>
              <img src={t.img} alt={t.label} loading="lazy" className="h-full w-full object-cover brightness-95 transition-all duration-500 group-hover:scale-105 group-hover:brightness-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <span className="absolute bottom-4 left-4 font-display text-lg italic text-white">{t.label}</span>
              <span className="absolute bottom-4 right-4 translate-y-3 rounded-full bg-white/90 px-3 py-1 font-ui text-[11px] font-medium text-ink opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">Shop Now →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

const cats = [
  { name: "Dresses", img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=400&q=80" },
  { name: "Co-ord Sets", img: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=400&q=80" },
  { name: "Tops & Crop Tops", img: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80" },
  { name: "Streetwear", img: "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=400&q=80" },
  { name: "Korean Fashion", img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=400&q=80" },
  { name: "Luxury Wear", img: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=400&q=80" },
];

function ShopByCategory() {
  return (
    <section className="bg-card py-24">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <SectionHeader eyebrow="FIND YOUR FIT" title="Shop by Category" />
        <div className="reveal flex flex-wrap justify-center gap-x-8 gap-y-10">
          {cats.map((c) => (
            <Link key={c.name} to="/shop" className="group flex w-[130px] flex-col items-center text-center lg:w-[180px]">
              <div className="aspect-square w-full overflow-hidden rounded-full border-2 border-transparent transition-all duration-300 group-hover:scale-105 group-hover:border-brown group-hover:shadow-xl">
                <img src={c.img} alt={c.name} loading="lazy" className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0" />
              </div>
              <p className="mt-3 font-display text-sm font-semibold">{c.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

const occasions = [
  { name: "Date Night", img: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=500&q=80" },
  { name: "Office Ready", img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=500&q=80" },
  { name: "Wedding Guest", img: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=500&q=80" },
  { name: "Casual Chic", img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=500&q=80" },
  { name: "Festival Looks", img: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=500&q=80" },
  { name: "Party Night", img: "https://images.unsplash.com/photo-1612722432474-b971cdcea546?auto=format&fit=crop&w=500&q=80" },
];

function ShopByOccasion() {
  return (
    <section className="bg-ivory py-24">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <SectionHeader eyebrow="STYLED FOR THE MOMENT" title="Dress for Every Occasion" />
        <div className="no-scrollbar reveal flex snap-x gap-5 overflow-x-auto pb-4">
          {occasions.map((o) => (
            <Link key={o.name} to="/shop" className="group relative h-[400px] w-[300px] shrink-0 snap-start overflow-hidden rounded-md transition-transform duration-300 hover:-translate-y-1">
              <img src={o.img} alt={o.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5">
                <p className="font-display text-2xl font-bold text-white">{o.name}</p>
                <p className="mt-1 font-ui text-sm text-gold">Shop →</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

const influencers = [
  { user: "@aanya.styles", img: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=600&q=80", saves: "12k+ Saves" },
  { user: "@meher.wears", img: "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?auto=format&fit=crop&w=600&q=80", saves: "9k+ Saves" },
  { user: "@riya.thelook", img: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=600&q=80", saves: "15k+ Saves" },
];

function InfluencerPicks() {
  return (
    <section className="relative overflow-hidden bg-ink py-24">
      {[...Array(8)].map((_, idx) => (
        <span key={idx} className="pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-gold" style={{ left: `${10 + idx * 11}%`, bottom: 0, animation: `gold-dust ${4 + (idx % 4)}s ${idx * 0.6}s infinite ease-out` }} />
      ))}
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="reveal mx-auto mb-10 max-w-xl text-center">
          <p className="mb-3 font-sans text-[11px] font-medium uppercase tracking-eyebrow text-gold">INFLUENCER PICKS</p>
          <h2 className="font-display text-4xl font-bold italic text-white lg:text-5xl">As Seen On —</h2>
        </div>
        <div className="reveal grid gap-6 md:grid-cols-3">
          {influencers.map((inf) => (
            <div key={inf.user} className="group relative overflow-hidden rounded-md">
              <img src={inf.img} alt={inf.user} loading="lazy" className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <span className="absolute right-3 top-3 rounded-full bg-gold px-3 py-1 font-ui text-[11px] font-semibold text-ink">{inf.saves}</span>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5">
                <p className="font-ui text-sm font-medium text-white">{inf.user}</p>
                <Link to="/shop" className="mt-2 inline-block font-ui text-[13px] font-semibold text-gold">SHOP THIS LOOK →</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const feed = [
  "1595777457583-95e059d581b8", "1485968579580-b6d095142e6e", "1503342217505-b0a15ec3261c",
  "1517445312882-bc9910d016b7", "1490481651871-ab68de25d43d", "1566174053879-31528523f8ae",
];

function InstagramGallery() {
  return (
    <section className="bg-card py-24">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <SectionHeader eyebrow="@clickattire" title="The Click Attire Feed" />
        <div className="reveal grid grid-cols-3 gap-2 md:grid-cols-6">
          {feed.map((id) => (
            <a key={id} href="#" className="group relative aspect-square overflow-hidden rounded-[2px]">
              <img src={`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=300&q=80`} alt="Instagram" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 flex items-center justify-center bg-ink/40 opacity-0 transition-opacity group-hover:opacity-100">
                <Star className="h-6 w-6 fill-white text-white" />
              </div>
            </a>
          ))}
        </div>
        <div className="reveal mt-8 text-center">
          <a href="#" className="inline-flex items-center gap-2 rounded-[2px] border-[1.5px] border-brown px-7 py-3 font-ui text-[14px] font-semibold text-brown transition-colors hover:bg-brown hover:text-primary-foreground">
            Follow Us on Instagram ↗
          </a>
        </div>
      </div>
    </section>
  );
}

const reviews = [
  { name: "Priya S., Mumbai", text: "The satin slip dress is everything! Fabric quality feels so premium and the fit is perfect. Got so many compliments.", product: products[0] },
  { name: "Ananya R., Delhi", text: "Obsessed with the co-ord set. It's become my go-to office fit. Shipping was fast and the packaging felt luxurious.", product: products[1] },
  { name: "Kavya M., Bangalore", text: "Finally a brand that gets Korean fashion right in India. The oversized shirt is so versatile. Buying more!", product: products[2] },
];

function Reviews() {
  return (
    <section className="bg-ivory py-24">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
        <div className="reveal mx-auto mb-12 max-w-xl text-center">
          <h2 className="font-display text-4xl font-bold lg:text-5xl">What Our Girls Say</h2>
          <p className="mt-3 font-ui text-base font-medium text-brown">4.8 ★ | Trusted by 12,000+ Women</p>
        </div>
        <div className="reveal grid gap-6 md:grid-cols-3">
          {reviews.map((r) => (
            <div key={r.name} className="rounded-xl bg-card p-8 shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
              <div className="flex gap-0.5 text-gold">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-gold" />)}
              </div>
              <p className="mt-4 font-sans text-[15px] leading-relaxed text-charcoal">"{r.text}"</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-blush-tan font-display font-bold text-brown">{r.name[0]}</div>
                <div>
                  <p className="text-sm font-semibold">{r.name}</p>
                  <p className="text-[12px] text-success">Verified Buyer ✓</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 border-t border-border pt-4">
                <img src={r.product.images[0]} alt={r.product.name} className="h-10 w-9 rounded-[2px] object-cover" />
                <span className="text-[12px] text-muted-foreground">{r.product.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  const { toast } = useStore();
  const [done, setDone] = useState(false);
  return (
    <section className="grid lg:grid-cols-2">
      <div className="flex flex-col justify-center bg-brown px-8 py-16 text-primary-foreground lg:px-16">
        <h2 className="font-display text-4xl font-bold lg:text-5xl">Stay in the<br />Loop</h2>
        <p className="mt-4 max-w-md font-sans text-base font-light text-primary-foreground/80">
          Get early access to new drops, exclusive offers, and style edits made just for you.
        </p>
        <ul className="mt-6 space-y-2.5">
          {["Early access to new collections", "Members-only discount codes", "Weekly style inspiration"].map((p) => (
            <li key={p} className="flex items-center gap-3 font-sans text-primary-foreground/90"><span className="text-gold">✦</span> {p}</li>
          ))}
        </ul>
      </div>
      <div className="flex items-center justify-center bg-ivory px-8 py-16">
        {done ? (
          <div className="text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success/15 text-3xl text-success animate-scale-in">✓</div>
            <p className="mt-4 font-display text-2xl">Welcome to the family! ✦</p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setDone(true);
              toast("You're in! Check your inbox ✦", "success");
            }}
            className="w-full max-w-sm"
          >
            <input required placeholder="Your first name" className="mb-6 w-full border-b border-nude bg-transparent py-3 outline-none placeholder:text-muted-foreground focus:border-brown" />
            <input required type="email" placeholder="Your email" className="mb-8 w-full border-b border-nude bg-transparent py-3 outline-none placeholder:text-muted-foreground focus:border-brown" />
            <button className="w-full rounded-[2px] bg-ink py-4 font-ui text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-brown">
              Join the Click Attire Family
            </button>
            <p className="mt-3 text-center font-sans text-[11px] font-light text-muted-foreground">No spam. Unsubscribe anytime.</p>
          </form>
        )}
      </div>
    </section>
  );
}
