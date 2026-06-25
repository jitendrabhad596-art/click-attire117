import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/data/products";

export type CartItem = {
  product: Product;
  size: string;
  qty: number;
};

type Toast = { id: number; message: string; type: "success" | "wishlist" | "info" };

type StoreCtx = {
  cart: CartItem[];
  wishlist: Product[];
  cartOpen: boolean;
  wishlistOpen: boolean;
  searchOpen: boolean;
  setCartOpen: (v: boolean) => void;
  setWishlistOpen: (v: boolean) => void;
  setSearchOpen: (v: boolean) => void;
  addToCart: (product: Product, size: string, qty?: number) => void;
  removeFromCart: (id: string, size: string) => void;
  updateQty: (id: string, size: string, qty: number) => void;
  toggleWishlist: (product: Product) => void;
  inWishlist: (id: string) => boolean;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  cartMrp: number;
  toasts: Toast[];
  toast: (message: string, type?: Toast["type"]) => void;
};

const Ctx = createContext<StoreCtx | null>(null);

function load<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const v = window.localStorage.getItem(key);
    return v ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => load("ca_cart", []));
  const [wishlist, setWishlist] = useState<Product[]>(() => load("ca_wishlist", []));
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastId = useRef(0);

  useEffect(() => {
    window.localStorage.setItem("ca_cart", JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    window.localStorage.setItem("ca_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const toast = (message: string, type: Toast["type"] = "success") => {
    const id = ++toastId.current;
    setToasts((t) => [...t, { id, message, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
  };

  const addToCart = (product: Product, size: string, qty = 1) => {
    setCart((c) => {
      const idx = c.findIndex((i) => i.product.id === product.id && i.size === size);
      if (idx >= 0) {
        const next = [...c];
        next[idx] = { ...next[idx], qty: next[idx].qty + qty };
        return next;
      }
      return [...c, { product, size, qty }];
    });
    toast(`Added to cart \u2713`, "success");
    setCartOpen(true);
  };

  const removeFromCart = (id: string, size: string) =>
    setCart((c) => c.filter((i) => !(i.product.id === id && i.size === size)));

  const updateQty = (id: string, size: string, qty: number) =>
    setCart((c) =>
      c
        .map((i) => (i.product.id === id && i.size === size ? { ...i, qty } : i))
        .filter((i) => i.qty > 0),
    );

  const toggleWishlist = (product: Product) =>
    setWishlist((w) => {
      if (w.some((p) => p.id === product.id)) {
        toast("Removed from wishlist", "info");
        return w.filter((p) => p.id !== product.id);
      }
      toast("Saved to wishlist \u2665", "wishlist");
      return [...w, product];
    });

  const inWishlist = (id: string) => wishlist.some((p) => p.id === id);
  const clearCart = () => setCart([]);

  const cartCount = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart]);
  const cartTotal = useMemo(
    () => cart.reduce((s, i) => s + i.product.price * i.qty, 0),
    [cart],
  );
  const cartMrp = useMemo(
    () => cart.reduce((s, i) => s + i.product.mrp * i.qty, 0),
    [cart],
  );

  const value: StoreCtx = {
    cart,
    wishlist,
    cartOpen,
    wishlistOpen,
    searchOpen,
    setCartOpen,
    setWishlistOpen,
    setSearchOpen,
    addToCart,
    removeFromCart,
    updateQty,
    toggleWishlist,
    inWishlist,
    clearCart,
    cartCount,
    cartTotal,
    cartMrp,
    toasts,
    toast,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
