import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { ProductCard } from "@/components/ProductCard";
import { useStore } from "@/lib/store";
import { products, inr } from "@/data/products";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Your Cart | Click Attire" }] }),
  component: CartPage,
});

function CartPage() {
  const { cart, updateQty, removeFromCart, cartTotal, cartMrp } = useStore();
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState(false);
  const couponSave = applied ? 150 : 0;
  const discount = cartMrp - cartTotal;
  const total = cartTotal - couponSave;

  if (!cart.length) {
    return (
      <SiteLayout>
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
          <ShoppingBag className="h-12 w-12 text-nude" />
          <p className="font-display text-2xl">Your cart is empty — but it doesn't have to be ✦</p>
          <Link to="/shop" className="rounded-[2px] bg-brown px-7 py-3.5 font-ui text-sm font-semibold text-primary-foreground hover:bg-brown-dark">Discover something you'll love →</Link>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <div className="mx-auto max-w-[1400px] px-5 py-12 lg:px-10">
        <h1 className="mb-8 font-display text-4xl font-bold">Shopping Cart</h1>
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.product.id + item.size} className="flex gap-4 rounded-md border border-border bg-card p-4">
                <img src={item.product.images[0]} alt={item.product.name} className="h-28 w-24 rounded-[2px] object-cover" />
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-semibold">{item.product.name}</p>
                      <p className="text-sm text-muted-foreground">Size: {item.size}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.product.id, item.size)} aria-label="Remove"><Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" /></button>
                  </div>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-3 rounded-[2px] border border-border">
                      <button onClick={() => updateQty(item.product.id, item.size, item.qty - 1)} className="px-2.5 py-1.5"><Minus className="h-3.5 w-3.5" /></button>
                      <span className="font-ui text-sm">{item.qty}</span>
                      <button onClick={() => updateQty(item.product.id, item.size, item.qty + 1)} className="px-2.5 py-1.5"><Plus className="h-3.5 w-3.5" /></button>
                    </div>
                    <p className="font-ui font-semibold">{inr(item.product.price * item.qty)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="h-fit rounded-md border border-border bg-card p-6">
            <p className="mb-4 font-display text-xl">Order Summary</p>
            <div className="flex gap-2">
              <input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="Coupon code (CLICK10)" className="flex-1 rounded-[2px] border border-border bg-transparent px-3 py-2 text-sm outline-none" />
              <button onClick={() => setApplied(coupon.toUpperCase() === "CLICK10")} className="rounded-[2px] bg-ink px-4 font-ui text-sm font-semibold text-white">Apply</button>
            </div>
            {applied && <p className="mt-2 font-ui text-[12px] font-semibold text-success">CLICK10 applied — ₹150 saved!</p>}

            <div className="mt-5 space-y-2.5 text-sm">
              <Row label="MRP Total" value={inr(cartMrp)} />
              <Row label="Discount" value={`−${inr(discount)}`} brown />
              {applied && <Row label="Coupon Savings" value={`−${inr(couponSave)}`} brown />}
              <Row label="Delivery" value="FREE ✓" />
              <div className="border-t border-border pt-3">
                <Row label="Total" value={inr(total)} bold />
              </div>
            </div>
            <p className="mt-3 rounded-[2px] bg-blush-tan/50 px-3 py-2 text-center font-ui text-[12px] font-medium text-brown">
              You're saving {inr(discount + couponSave)} on this order 🎉
            </p>
            <Link to="/checkout" className="mt-4 block rounded-[2px] bg-brown py-4 text-center font-ui text-base font-bold uppercase tracking-wide text-primary-foreground hover:bg-brown-dark">
              Place Order →
            </Link>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="mb-6 font-display text-2xl font-bold">You Might Also Like</h2>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {products.slice(4, 8).map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}

function Row({ label, value, brown, bold }: { label: string; value: string; brown?: boolean; bold?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className={bold ? "font-ui font-bold" : "text-muted-foreground"}>{label}</span>
      <span className={`font-ui ${bold ? "text-lg font-bold" : "font-semibold"} ${brown ? "text-brown" : ""}`}>{value}</span>
    </div>
  );
}
