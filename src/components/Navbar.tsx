import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, Heart, User, ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { Logo } from "./Logo";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop", mega: true },
  { label: "Collections", to: "/collections" },
  { label: "New Arrivals", to: "/shop" },
  { label: "Sale", to: "/shop" },
  { label: "Blog", to: "/blog" },
];

const megaCategories = ["Dresses", "Co-ord Sets", "Tops & Crop Tops", "Streetwear", "Korean", "Luxury Wear"];
const megaCollections = ["Luxury Collection", "Gen-Z Edit", "Korean Fashion", "Ethnic Fusion"];

export function Navbar({ overHero = false }: { overHero?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const { cartCount, wishlist, setCartOpen, setWishlistOpen, setSearchOpen } = useStore();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = !overHero || scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-[38px] z-40 transition-all duration-300",
        solid ? "bg-card text-foreground shadow-[0_1px_20px_rgba(17,17,17,0.08)]" : "bg-transparent text-white",
      )}
    >
      <nav className="mx-auto flex h-[68px] max-w-[1400px] items-center justify-between px-5 lg:px-10">
        {/* Left: mobile menu + logo */}
        <div className="flex items-center gap-3">
          <button className="lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Menu className="h-6 w-6" />
          </button>
          <Logo variant={solid ? "dark" : "light"} size={48} />
        </div>

        {/* Center: links */}
        <ul className="hidden items-center gap-7 lg:flex">
          {navLinks.map((l) => (
            <li
              key={l.label}
              className="relative"
              onMouseEnter={() => l.mega && setMegaOpen(true)}
              onMouseLeave={() => l.mega && setMegaOpen(false)}
            >
              <Link
                to={l.to}
                className="flex items-center gap-1 text-[13px] font-semibold uppercase tracking-[0.08em] transition-colors hover:text-brown"
              >
                {l.label}
                {l.mega && <ChevronDown className="h-3.5 w-3.5" />}
              </Link>
              {l.mega && megaOpen && (
                <div className="absolute left-1/2 top-full z-50 w-[680px] -translate-x-1/2 pt-5">
                  <div className="grid grid-cols-3 gap-8 rounded-md border border-border bg-card p-7 text-foreground shadow-2xl animate-fade-in">
                    <div>
                      <p className="mb-4 font-display text-sm font-bold text-brown">Categories</p>
                      <ul className="space-y-2.5">
                        {megaCategories.map((c) => (
                          <li key={c}>
                            <Link to="/shop" className="text-sm text-muted-foreground transition-colors hover:text-brown">
                              {c}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="mb-4 font-display text-sm font-bold text-brown">Collections</p>
                      <ul className="space-y-2.5">
                        {megaCollections.map((c) => (
                          <li key={c}>
                            <Link to="/collections" className="text-sm text-muted-foreground transition-colors hover:text-brown">
                              {c}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link to="/shop" className="group relative overflow-hidden rounded-md">
                      <img
                        src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=400&q=80"
                        alt="New in"
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute left-3 top-3 rounded-full bg-brown px-3 py-1 font-ui text-[10px] font-semibold text-primary-foreground">
                        NEW IN
                      </span>
                    </Link>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* Right: icons */}
        <div className="flex items-center gap-4 sm:gap-5">
          <button onClick={() => setSearchOpen(true)} aria-label="Search">
            <Search className="h-[22px] w-[22px] transition-colors hover:text-brown" />
          </button>
          <button onClick={() => setWishlistOpen(true)} aria-label="Wishlist" className="relative">
            <Heart className="h-[22px] w-[22px] transition-colors hover:text-brown" />
            {wishlist.length > 0 && <Badge n={wishlist.length} />}
          </button>
          <Link to="/dashboard" aria-label="Account" className="hidden sm:block">
            <User className="h-[22px] w-[22px] transition-colors hover:text-brown" />
          </Link>
          <button onClick={() => setCartOpen(true)} aria-label="Cart" className="relative">
            <ShoppingBag className="h-[22px] w-[22px] transition-colors hover:text-brown" />
            {cartCount > 0 && <Badge n={cartCount} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/50 animate-fade-in" onClick={() => setMobileOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-[82%] max-w-sm animate-slide-in-right bg-card p-6 text-foreground">
            <div className="flex items-center justify-between">
              <Logo variant="dark" size={56} />
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <X className="h-6 w-6" />
              </button>
            </div>
            <ul className="mt-8 space-y-1">
              {navLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    onClick={() => setMobileOpen(false)}
                    className="block border-b border-border py-3.5 font-display text-xl"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}

function Badge({ n }: { n: number }) {
  return (
    <span className="absolute -right-2 -top-2 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-brown px-1 font-ui text-[10px] font-semibold text-primary-foreground">
      {n}
    </span>
  );
}
