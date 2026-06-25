import { Link, useLocation } from "@tanstack/react-router";
import { Home, Search, Heart, ShoppingBag, User } from "lucide-react";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function MobileBottomNav() {
  const { setSearchOpen, setWishlistOpen, setCartOpen, cartCount, wishlist } = useStore();
  const { pathname } = useLocation();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 flex h-14 items-center justify-around border-t border-border bg-card md:hidden">
      <Link to="/" className={cn("flex flex-col items-center", pathname === "/" ? "text-brown" : "text-muted-foreground")}>
        <Home className="h-5 w-5" />
        <span className="mt-0.5 text-[10px]">Home</span>
      </Link>
      <button onClick={() => setSearchOpen(true)} className="flex flex-col items-center text-muted-foreground">
        <Search className="h-5 w-5" />
        <span className="mt-0.5 text-[10px]">Search</span>
      </button>
      <button onClick={() => setWishlistOpen(true)} className="relative flex flex-col items-center text-muted-foreground">
        <Heart className="h-5 w-5" />
        {wishlist.length > 0 && <Dot />}
        <span className="mt-0.5 text-[10px]">Wishlist</span>
      </button>
      <button onClick={() => setCartOpen(true)} className="relative flex flex-col items-center text-muted-foreground">
        <ShoppingBag className="h-5 w-5" />
        {cartCount > 0 && <Dot />}
        <span className="mt-0.5 text-[10px]">Cart</span>
      </button>
      <Link to="/dashboard" className={cn("flex flex-col items-center", pathname === "/dashboard" ? "text-brown" : "text-muted-foreground")}>
        <User className="h-5 w-5" />
        <span className="mt-0.5 text-[10px]">Account</span>
      </Link>
    </nav>
  );
}

function Dot() {
  return <span className="absolute right-2 top-0 h-2 w-2 rounded-full bg-brown" />;
}
