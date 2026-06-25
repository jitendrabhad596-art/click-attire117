import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Package, Truck, MapPin, ShoppingBag } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/track")({
  head: () => ({ meta: [{ title: "Track My Order | Click Attire" }] }),
  component: Track,
});

const stages = [
  { label: "Ordered", icon: ShoppingBag, time: "24 Jun, 10:24 AM" },
  { label: "Confirmed", icon: Check, time: "24 Jun, 10:30 AM" },
  { label: "Packed", icon: Package, time: "24 Jun, 4:15 PM" },
  { label: "Shipped", icon: Truck, time: "25 Jun, 9:00 AM" },
  { label: "Out for Delivery", icon: MapPin, time: "Expected 30 Jun" },
];

function Track() {
  const [tracking, setTracking] = useState(false);
  const current = 3;

  return (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-5 py-12 lg:px-10">
        <h1 className="mb-8 font-display text-4xl font-bold">Track My Order</h1>

        {!tracking ? (
          <form onSubmit={(e) => { e.preventDefault(); setTracking(true); }} className="space-y-4 rounded-md border border-border bg-card p-6">
            <input required placeholder="Order ID (e.g. #CA928374)" className="w-full rounded-[2px] border border-border bg-transparent px-3 py-2.5 text-sm outline-none focus:border-brown" />
            <input required placeholder="Phone Number" className="w-full rounded-[2px] border border-border bg-transparent px-3 py-2.5 text-sm outline-none focus:border-brown" />
            <button className="w-full rounded-[2px] bg-brown py-3.5 font-ui text-sm font-semibold uppercase tracking-wide text-primary-foreground hover:bg-brown-dark">Track Order</button>
          </form>
        ) : (
          <div className="rounded-md border border-border bg-card p-6 lg:p-8">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="font-ui font-semibold">Order #CA928374</p>
                <p className="text-sm text-muted-foreground">Estimated delivery: Mon, 30 Jun</p>
              </div>
              <span className="rounded-full bg-gold/20 px-3 py-1 font-ui text-[12px] font-semibold text-brown">In Transit</span>
            </div>

            <div className="relative ml-3 border-l-2 border-border">
              {stages.map((s, i) => {
                const done = i <= current;
                return (
                  <div key={s.label} className="relative pb-8 pl-8 last:pb-0">
                    <span className={cn("absolute -left-[15px] grid h-7 w-7 place-items-center rounded-full", done ? "bg-brown text-primary-foreground" : "bg-muted text-muted-foreground")}>
                      <s.icon className="h-3.5 w-3.5" />
                    </span>
                    <p className={cn("font-ui text-sm font-semibold", done ? "text-foreground" : "text-muted-foreground")}>{s.label}</p>
                    <p className="text-[12px] text-muted-foreground">{s.time}</p>
                  </div>
                );
              })}
            </div>

            <a href="#" className="mt-6 inline-block font-ui text-sm font-semibold text-brown">Need help? Chat on WhatsApp →</a>
          </div>
        )}
      </div>
    </SiteLayout>
  );
}
