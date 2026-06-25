import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Logo } from "@/components/Logo";
import { useStore } from "@/lib/store";
import { inr } from "@/data/products";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout | Click Attire" }] }),
  component: Checkout,
});

const steps = ["Address", "Payment", "Confirm"];

function Checkout() {
  const { cart, cartTotal, clearCart } = useStore();
  const [step, setStep] = useState(0);
  const [placed, setPlaced] = useState(false);
  const [pay, setPay] = useState("UPI");

  if (placed) return <Success onShop={clearCart} />;

  return (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-5 py-12 lg:px-10">
        <div className="mb-10 flex items-center justify-center gap-2">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center">
              <div className={cn("flex items-center gap-2 rounded-full px-4 py-2 font-ui text-sm font-semibold", i <= step ? "bg-brown text-primary-foreground" : "bg-muted text-muted-foreground")}>
                <span className="grid h-5 w-5 place-items-center rounded-full bg-white/20 text-xs">{i + 1}</span> {s}
              </div>
              {i < steps.length - 1 && <div className={cn("h-0.5 w-8", i < step ? "bg-brown" : "bg-border")} />}
            </div>
          ))}
        </div>

        <div className="rounded-md border border-border bg-card p-6 lg:p-8">
          {step === 0 && (
            <div className="space-y-4">
              <h2 className="font-display text-2xl">Delivery Address</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input ph="Full Name" />
                <Input ph="Phone Number" />
              </div>
              <Input ph="Address Line" />
              <div className="grid gap-4 sm:grid-cols-3">
                <Input ph="City" />
                <Input ph="State" />
                <Input ph="Pincode" />
              </div>
              <div>
                <p className="mb-2 font-ui text-sm font-semibold">Delivery Speed</p>
                <div className="grid gap-2 sm:grid-cols-3">
                  {[["Standard", "FREE"], ["Express", "₹99"], ["Same Day", "₹199"]].map(([t, p]) => (
                    <label key={t} className="flex cursor-pointer items-center justify-between rounded-[2px] border border-border px-3 py-2.5 text-sm has-[:checked]:border-brown">
                      <span><input type="radio" name="speed" defaultChecked={t === "Standard"} className="mr-2 accent-brown" />{t}</span>
                      <span className="font-ui font-semibold text-brown">{p}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-3">
              <h2 className="font-display text-2xl">Payment Method</h2>
              {["UPI", "Credit/Debit Card", "Net Banking", "EMI Options", "Cash on Delivery", "Wallet"].map((m) => (
                <label key={m} className="flex cursor-pointer items-center gap-3 rounded-[2px] border border-border px-4 py-3.5 text-sm has-[:checked]:border-brown has-[:checked]:bg-ivory">
                  <input type="radio" name="pay" checked={pay === m} onChange={() => setPay(m)} className="accent-brown" /> {m}
                </label>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="font-display text-2xl">Review & Confirm</h2>
              <div className="rounded-[2px] bg-ivory p-4 text-sm">
                <p className="flex justify-between"><span className="text-muted-foreground">Items ({cart.length})</span><span className="font-ui font-semibold">{inr(cartTotal)}</span></p>
                <p className="flex justify-between"><span className="text-muted-foreground">Delivery</span><span className="font-ui font-semibold">FREE</span></p>
                <p className="flex justify-between"><span className="text-muted-foreground">Payment</span><span className="font-ui font-semibold">{pay}</span></p>
                <div className="mt-3 flex justify-between border-t border-border pt-3"><span className="font-ui font-bold">Total</span><span className="font-ui text-lg font-bold">{inr(cartTotal)}</span></div>
              </div>
            </div>
          )}

          <div className="mt-8 flex gap-3">
            {step > 0 && <button onClick={() => setStep(step - 1)} className="rounded-[2px] border border-border px-6 py-3 font-ui text-sm font-semibold">Back</button>}
            <button
              onClick={() => (step < 2 ? setStep(step + 1) : setPlaced(true))}
              className="flex-1 rounded-[2px] bg-brown py-3.5 font-ui text-sm font-bold uppercase tracking-wide text-primary-foreground hover:bg-brown-dark"
            >
              {step < 2 ? "Continue →" : `Place Order → ${inr(cartTotal)}`}
            </button>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}

function Input({ ph }: { ph: string }) {
  return <input placeholder={ph} className="w-full rounded-[2px] border border-border bg-transparent px-3 py-2.5 text-sm outline-none focus:border-brown" />;
}

function Success({ onShop }: { onShop: () => void }) {
  return (
    <SiteLayout>
      <div className="relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden px-5 text-center">
        {[...Array(30)].map((_, i) => (
          <span key={i} className="pointer-events-none absolute top-0 h-2 w-2 rounded-sm" style={{ left: `${(i * 3.3) % 100}%`, backgroundColor: i % 2 ? "#9B5A22" : "#C9A36A", animation: `confetti-fall ${2 + (i % 4) * 0.5}s ${(i % 6) * 0.2}s ease-in forwards` }} />
        ))}
        <Logo variant="dark" size={100} />
        <div className="mt-6 grid h-16 w-16 place-items-center rounded-full bg-success/15 text-success animate-scale-in"><Check className="h-8 w-8" /></div>
        <h1 className="mt-5 font-display text-4xl font-bold">Your order is confirmed! 🎉</h1>
        <p className="mt-2 font-ui text-muted-foreground">Order ID: <span className="font-semibold text-foreground">#CA928374</span></p>
        <p className="mt-1 text-sm text-muted-foreground">Estimated delivery: Mon, Jun 30</p>
        <div className="mt-7 flex gap-3">
          <Link to="/track" className="rounded-[2px] bg-brown px-6 py-3 font-ui text-sm font-semibold text-primary-foreground hover:bg-brown-dark">Track My Order</Link>
          <Link to="/shop" onClick={onShop} className="rounded-[2px] border border-brown px-6 py-3 font-ui text-sm font-semibold text-brown hover:bg-brown hover:text-primary-foreground">Continue Shopping</Link>
        </div>
      </div>
    </SiteLayout>
  );
}
