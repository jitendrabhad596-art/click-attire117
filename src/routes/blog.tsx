import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Style Journal | Click Attire" },
      { name: "description", content: "Style tips, trend reports and brand stories from the Click Attire fashion editors." },
      { property: "og:title", content: "Style Journal | Click Attire" },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: Blog,
});

const posts = [
  { title: "5 Ways to Style a Satin Slip Dress", cat: "Style Tips", read: "4 min", img: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=700&q=80" },
  { title: "The Korean Fashion Trends Defining 2025", cat: "Trend Reports", read: "6 min", img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=700&q=80" },
  { title: "Co-ord Sets: The Effortless Power Move", cat: "How-to Style", read: "3 min", img: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=700&q=80" },
  { title: "Inside the Click Attire Luxury Atelier", cat: "Brand Stories", read: "5 min", img: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=700&q=80" },
  { title: "Streetwear, But Make It Editorial", cat: "Style Tips", read: "4 min", img: "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=700&q=80" },
  { title: "Building a Capsule Wardrobe That Lasts", cat: "How-to Style", read: "7 min", img: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=700&q=80" },
];

function Blog() {
  const ref = useReveal<HTMLDivElement>();
  const [feature, ...rest] = posts;
  return (
    <SiteLayout>
      <div ref={ref} className="mx-auto max-w-[1400px] px-5 py-12 lg:px-10">
        <div className="mb-10 text-center">
          <p className="mb-2 font-sans text-[11px] font-medium uppercase tracking-eyebrow text-brown">THE EDIT</p>
          <h1 className="font-display text-4xl font-bold lg:text-5xl">Style Journal</h1>
        </div>

        <Link to="/blog" className="reveal group mb-12 grid overflow-hidden rounded-md border border-border lg:grid-cols-2">
          <div className="aspect-[16/10] overflow-hidden lg:aspect-auto">
            <img src={feature.img} alt={feature.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          </div>
          <div className="flex flex-col justify-center bg-card p-8 lg:p-12">
            <span className="font-ui text-[12px] font-semibold uppercase tracking-wide text-brown">{feature.cat} · {feature.read} read</span>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight">{feature.title}</h2>
            <p className="mt-4 text-muted-foreground">The editors break down the season's most versatile silhouette and how to make it your own — day to night.</p>
            <span className="mt-5 font-ui text-sm font-semibold text-brown">Read Article →</span>
          </div>
        </Link>

        <div className="reveal grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((p) => (
            <Link key={p.title} to="/blog" className="group overflow-hidden rounded-md border border-border bg-card">
              <div className="aspect-[16/10] overflow-hidden">
                <img src={p.img} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <span className="font-ui text-[11px] font-semibold uppercase tracking-wide text-brown">{p.cat} · {p.read}</span>
                <h3 className="mt-2 font-display text-xl font-bold leading-snug">{p.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </SiteLayout>
  );
}
