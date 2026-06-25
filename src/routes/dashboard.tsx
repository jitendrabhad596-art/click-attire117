import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { User, Package, Heart, MapPin, RotateCcw, Gift, Share2 } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { ProductCard } from "@/components/ProductCard";
import { useStore } from "@/lib/store";
import { inr } from "@/data/products";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "My Account | Click Attire" }] }),
  component: Dashboard,
});

const nav = [
  { k: "profile", label: "Profile", icon: User },
  { k: "orders", label: "Orders", icon: Package },
  { k: "wishlist", label: "Wishlist", icon: Heart },
  { k: "addresses", label: "Addresses", icon: MapPin },
  { k: "returns", label: "Returns", icon: RotateCcw },
  { k: "rewards", label: "Rewards", icon: Gift },
  { k: "referrals", label: "Referrals", icon: Share2 },
];

const orders = [
  { id: "#CA928374", date: "24 Jun 2025", items: 2, total: 2898, status: "Shipped" },
  { id: "#CA918245", date: "12 Jun 2025", items: 1, total: 1299, status: "Delivered" },
  { id: "#CA901122", date: "02 Jun 2025", items: 3, total: 4197, status: "Delivered" },
];

function Dashboard() {
  const [tab, setTab] = useState("profile");
  const { wishlist } = useStore();

  return (
    <SiteLayout>
      <div className="mx-auto max-w-[1400px] px-5 py-12 lg:px-10">
        <h1 className="mb-8 font-display text-4xl font-bold">My Account</h1>
        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          <aside className="no-scrollbar flex gap-2 overflow-x-auto lg:flex-col">
            {nav.map((n) => (
              <button key={n.k} onClick={() => setTab(n.k)} className={cn("flex shrink-0 items-center gap-2.5 rounded-[2px] px-4 py-3 text-left font-ui text-sm font-medium", tab === n.k ? "bg-brown text-primary-foreground" : "hover:bg-muted")}>
                <n.icon className="h-4 w-4" /> {n.label}
              </button>
            ))}
          </aside>

          <div>
            {tab === "profile" && (
              <Card title="Profile Details">
                <div className="flex items-center gap-4">
                  <div className="grid h-20 w-20 place-items-center rounded-full bg-blush-tan font-display text-3xl font-bold text-brown">A</div>
                  <button className="rounded-[2px] border border-brown px-4 py-2 font-ui text-sm font-semibold text-brown">Upload Photo</button>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {["Full Name", "Email", "Phone", "Date of Birth"].map((f) => (
                    <div key={f}>
                      <label className="font-ui text-xs font-semibold text-muted-foreground">{f}</label>
                      <input className="mt-1 w-full rounded-[2px] border border-border bg-transparent px-3 py-2.5 text-sm outline-none focus:border-brown" defaultValue={f === "Email" ? "aanya@example.com" : f === "Full Name" ? "Aanya Sharma" : ""} />
                    </div>
                  ))}
                </div>
                <button className="mt-6 rounded-[2px] bg-ink px-6 py-3 font-ui text-sm font-semibold text-white hover:bg-brown">Save Changes</button>
              </Card>
            )}

            {tab === "orders" && (
              <Card title="My Orders">
                <div className="space-y-3">
                  {orders.map((o) => (
                    <div key={o.id} className="flex flex-wrap items-center justify-between gap-3 rounded-[2px] border border-border p-4">
                      <div>
                        <p className="font-ui font-semibold">{o.id}</p>
                        <p className="text-sm text-muted-foreground">{o.date} · {o.items} items · {inr(o.total)}</p>
                      </div>
                      <span className={cn("rounded-full px-3 py-1 font-ui text-[12px] font-semibold", o.status === "Delivered" ? "bg-success/15 text-success" : "bg-gold/20 text-brown")}>{o.status}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {tab === "wishlist" && (
              <Card title="My Wishlist">
                {wishlist.length ? (
                  <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
                    {wishlist.map((p) => <ProductCard key={p.id} product={p} />)}
                  </div>
                ) : <p className="text-muted-foreground">No saves yet. Start building your dream wardrobe.</p>}
              </Card>
            )}

            {tab === "addresses" && (
              <Card title="Saved Addresses">
                <div className="rounded-[2px] border border-border p-4">
                  <p className="font-ui font-semibold">Aanya Sharma <span className="ml-2 rounded-full bg-brown px-2 py-0.5 text-[10px] text-primary-foreground">DEFAULT</span></p>
                  <p className="mt-1 text-sm text-muted-foreground">42 Marine Drive, Mumbai, Maharashtra 400020 · +91 98765 43210</p>
                </div>
                <button className="mt-4 rounded-[2px] border border-brown px-4 py-2.5 font-ui text-sm font-semibold text-brown">+ Add New Address</button>
              </Card>
            )}

            {tab === "returns" && <Card title="Returns"><p className="text-muted-foreground">No active return requests. Items are returnable within 15 days of delivery.</p></Card>}

            {tab === "rewards" && (
              <Card title="Loyalty Rewards">
                <div className="flex items-center gap-6">
                  <div className="grid h-28 w-28 place-items-center rounded-full" style={{ background: "conic-gradient(var(--brown) 68%, var(--muted) 0)" }}>
                    <div className="grid h-20 w-20 place-items-center rounded-full bg-card text-center">
                      <span className="font-display text-2xl font-bold text-brown">680</span>
                    </div>
                  </div>
                  <div>
                    <p className="font-ui font-semibold">680 Click Points</p>
                    <p className="text-sm text-muted-foreground">320 points to your next ₹500 reward</p>
                  </div>
                </div>
              </Card>
            )}

            {tab === "referrals" && (
              <Card title="Refer & Earn">
                <p className="text-muted-foreground">Share your link — you both get ₹200 off.</p>
                <div className="mt-4 flex gap-2">
                  <input readOnly value="clickattire.com/r/AANYA200" className="flex-1 rounded-[2px] border border-border bg-ivory px-3 py-2.5 text-sm" />
                  <button className="rounded-[2px] bg-brown px-5 font-ui text-sm font-semibold text-primary-foreground">Copy</button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-md border border-border bg-card p-6 lg:p-8">
      <h2 className="mb-5 font-display text-2xl font-bold">{title}</h2>
      {children}
    </div>
  );
}
