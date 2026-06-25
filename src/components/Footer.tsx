import { Link } from "@tanstack/react-router";
import { Instagram, Youtube } from "lucide-react";
import { Logo } from "./Logo";

const cols = [
  { title: "Shop", links: ["New Arrivals", "Trending", "Best Sellers", "Luxury Edit", "Gen-Z Edit", "Sale"] },
  { title: "Explore", links: ["About Us", "Blog", "Influencer Picks", "Sustainability", "Careers", "Press"] },
  { title: "Customer Care", links: ["Track My Order", "Returns & Refunds", "Size Guide", "FAQ", "Contact Us", "Loyalty Rewards"] },
  { title: "Brand", links: ["Instagram", "Pinterest", "YouTube", "WhatsApp"] },
];

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-[1400px] px-5 py-16 lg:px-10">
        <div className="flex flex-col items-start justify-between gap-8 border-b border-white/10 pb-10 lg:flex-row lg:items-center">
          <div className="flex items-center gap-4">
            <Logo variant="light" size={64} />
            <p className="font-display text-lg italic text-white/80">Your Style. Your Story. Your Click.</p>
          </div>
          <div className="flex gap-3">
            {[Instagram, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/20 transition-colors hover:bg-brown"
                aria-label="social"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 py-12 md:grid-cols-4">
          {cols.map((c) => (
            <div key={c.title}>
              <p className="mb-4 font-ui text-sm font-semibold">{c.title}</p>
              <ul className="space-y-3">
                {c.links.map((l) => (
                  <li key={l}>
                    <Link to="/shop" className="text-[13px] text-white/60 transition-colors hover:text-gold">
                      {l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#0A0A0A]">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 px-5 py-5 text-[12px] text-white/50 md:flex-row lg:px-10">
          <p>&copy; 2025 Click Attire. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/" className="hover:text-gold">Privacy Policy</Link>
            <Link to="/" className="hover:text-gold">Terms</Link>
            <Link to="/" className="hover:text-gold">Return Policy</Link>
            <Link to="/" className="hover:text-gold">Shipping</Link>
          </div>
          <p className="font-ui tracking-wide">UPI &middot; Visa &middot; Mastercard &middot; COD</p>
        </div>
      </div>
    </footer>
  );
}
