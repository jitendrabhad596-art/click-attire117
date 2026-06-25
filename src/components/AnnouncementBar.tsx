import { useEffect, useState } from "react";
import { X } from "lucide-react";

const messages = [
  "\u2726 Free Shipping on Orders Above \u20B9999 \u2014 Shop Now",
  "\u2726 New Arrivals Every Monday \u2014 Be First, Shop Now",
  "\u2726 Use Code CLICK10 for 10% Off Your First Order",
  "\u2726 Easy 15-Day Returns | 100% Authentic Styles",
];

export function AnnouncementBar() {
  const [i, setI] = useState(0);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % messages.length), 4000);
    return () => clearInterval(t);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-x-0 top-0 z-50 flex h-[38px] items-center justify-center bg-brown px-10 text-primary-foreground">
      <button
        onClick={() => setOpen(false)}
        aria-label="Close announcement"
        className="absolute left-3 text-primary-foreground/60 transition-colors hover:text-primary-foreground"
      >
        <X className="h-4 w-4" />
      </button>
      <p key={i} className="animate-fade-in text-center text-[13px] font-medium tracking-wide">
        {messages[i]}
      </p>
      <a
        href="/shop"
        className="absolute right-4 hidden text-[13px] font-semibold text-gold transition-all hover:underline sm:block"
      >
        SHOP NOW &rarr;
      </a>
    </div>
  );
}
