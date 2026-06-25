import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Our Collections | Click Attire" },
      { name: "description", content: "Curated worlds. Distinct aesthetics. Explore the Luxury, Gen-Z, Korean, Ethnic Fusion, Office and Party collections at Click Attire." },
      { property: "og:title", content: "Our Collections | Click Attire" },
      { property: "og:url", content: "/collections" },
    ],
    links: [{ rel: "canonical", href: "/collections" }],
  }),
  component: Collections,
});

const collections = [
  { name: "Luxury Collection", count: 24, img: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=900&q=80" },
  { name: "Gen-Z Edit", count: 38, img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80" },
  { name: "Korean Fashion", count: 19, img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80" },
  { name: "Ethnic Fusion", count: 27, img: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=80" },
  { name: "Office Wear", count: 31, img: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=900&q=80" },
  { name: "Party Edit", count: 22, img: "https://images.unsplash.com/photo-1612722432474-b971cdcea546?auto=format&fit=crop&w=900&q=80" },
];

function Collections() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <SiteLayout>
      <div className="relative h-72 overflow-hidden bg-ink">
        <img src="https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=1600&q=80" alt="Collections" className="h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <h1 className="font-display text-5xl font-black text-white lg:text-6xl">Our Collections</h1>
          <p className="mt-3 max-w-md font-sans text-white/85">Curated worlds. Distinct aesthetics. One destination.</p>
        </div>
      </div>
      <div ref={ref} className="mx-auto max-w-[1400px] px-5 py-16 lg:px-10">
        <div className="grid gap-6 md:grid-cols-2">
          {collections.map((c) => (
            <Link key={c.name} to="/shop" className="reveal group relative h-[440px] overflow-hidden rounded-md">
              <img src={c.img} alt={c.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute bottom-7 left-7">
                <h2 className="font-display text-3xl font-bold italic text-white">{c.name}</h2>
                <p className="mt-1 font-ui text-sm text-white/80">{c.count} pieces</p>
                <span className="mt-3 inline-block font-ui text-sm font-semibold text-gold">Explore →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}
