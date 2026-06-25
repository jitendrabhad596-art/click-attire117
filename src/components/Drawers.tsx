import { Link } from "@tanstack/react-router";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useStore } from "@/lib/store";
import { inr } from "@/data/products";
import { Logo } from "./Logo";

export function CartDrawer() {
  const { cart, cartOpen, setCartOpen, updateQty, removeFromCart, cartTotal, cartMrp } = useStore();
  const savings = cartMrp - cartTotal;

  return (
    <Drawer open={cartOpen} side="right" onClose={() => setCartOpen(false)}>
      <div className="flex items-center justify-between border-b border-border p-5">
        <div className="flex items-center gap-2">
          <Logo variant="dark" size={28} />
          <h2 className="font-display text-lg">Your Cart ({cart.length})</h2>
        </div>
        <button onClick={() => setCartOpen(false)} aria-label="Close cart">
          <X className="h-5 w-5" />
        </button>
      </div>

      {cart.length === 0 ? (
        <Empty
          icon={<ShoppingBag className="h-10 w-10 text-nude" />}
          title="Your cart is empty \u2014 but it doesn't have to be \u2726"
          cta="Discover something you'll love"
          onClose={() => setCartOpen(false)}
        />
      ) : (
        <>
          <div className="flex-1 space-y-4 overflow-y-auto p-5">
            {cart.map((item) => (
              <div key={item.product.id + item.size} className="flex gap-3">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="h-24 w-20 rounded-[2px] object-cover"
                />
                <div className="flex flex-1 flex-col">
                  <p className="text-sm font-semibold leading-tight">{item.product.name}</p>
                  <p className="text-xs text-muted-foreground">Size: {item.size}</p>
                  <p className="font-ui text-sm font-semibold text-brown">{inr(item.product.price)}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-2 rounded-[2px] border border-border">
                      <button onClick={() => updateQty(item.product.id, item.size, item.qty - 1)} className="px-2 py-1" aria-label="Decrease">
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="font-ui text-sm">{item.qty}</span>
                      <button onClick={() => updateQty(item.product.id, item.size, item.qty + 1)} className="px-2 py-1" aria-label="Increase">
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <button onClick={() => removeFromCart(item.product.id, item.size)} aria-label="Remove">
                      <Trash2 className="h-4 w-4 text-muted-foreground transition-colors hover:text-destructive" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border p-5">
            {savings > 0 && (
              <div className="mb-3 rounded-[2px] bg-blush-tan/50 px-3 py-2 text-center font-ui text-[12px] font-medium text-brown">
                You're saving {inr(savings)} on this order 🎉
              </div>
            )}
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-ui font-semibold">{inr(cartTotal)}</span>
            </div>
            <p className="mt-1 text-[12px] text-muted-foreground">
              {cartTotal >= 999 ? "Free shipping unlocked \u2713" : `Add ${inr(999 - cartTotal)} for free shipping`}
            </p>
            <Link
              to="/checkout"
              onClick={() => setCartOpen(false)}
              className="mt-4 block rounded-[2px] bg-brown py-3.5 text-center font-ui text-sm font-semibold uppercase tracking-wide text-primary-foreground transition-colors hover:bg-brown-dark"
            >
              Proceed to Checkout &rarr;
            </Link>
            <button onClick={() => setCartOpen(false)} className="mt-3 w-full text-center text-[13px] text-muted-foreground hover:text-brown">
              &larr; Continue Shopping
            </button>
          </div>
        </>
      )}
    </Drawer>
  );
}

export function WishlistDrawer() {
  const { wishlist, wishlistOpen, setWishlistOpen, addToCart, toggleWishlist } = useStore();
  return (
    <Drawer open={wishlistOpen} side="left" onClose={() => setWishlistOpen(false)}>
      <div className="flex items-center justify-between border-b border-border p-5">
        <h2 className="font-display text-lg">Wishlist ({wishlist.length})</h2>
        <button onClick={() => setWishlistOpen(false)} aria-label="Close wishlist">
          <X className="h-5 w-5" />
        </button>
      </div>
      {wishlist.length === 0 ? (
        <Empty title="No saves yet. Start building your dream wardrobe." cta="Browse the edit" onClose={() => setWishlistOpen(false)} />
      ) : (
        <div className="flex-1 space-y-4 overflow-y-auto p-5">
          {wishlist.map((p) => (
            <div key={p.id} className="flex gap-3">
              <img src={p.images[0]} alt={p.name} className="h-24 w-20 rounded-[2px] object-cover" />
              <div className="flex flex-1 flex-col">
                <p className="text-sm font-semibold leading-tight">{p.name}</p>
                <p className="font-ui text-sm font-semibold text-brown">{inr(p.price)}</p>
                <div className="mt-auto flex gap-2">
                  <button
                    onClick={() => {
                      addToCart(p, p.sizes[0]);
                      toggleWishlist(p);
                    }}
                    className="rounded-[2px] bg-ink px-3 py-1.5 font-ui text-[11px] font-semibold uppercase text-white hover:bg-brown"
                  >
                    Move to Cart
                  </button>
                  <button onClick={() => toggleWishlist(p)} aria-label="Remove">
                    <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Drawer>
  );
}

function Drawer({
  open,
  side,
  onClose,
  children,
}: {
  open: boolean;
  side: "left" | "right";
  onClose: () => void;
  children: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[70]">
      <div className="absolute inset-0 bg-black/50 animate-fade-in" onClick={onClose} />
      <div
        className={`absolute top-0 flex h-full w-[92%] max-w-[420px] flex-col bg-card ${
          side === "right" ? "right-0 animate-slide-in-right" : "left-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function Empty({
  icon,
  title,
  cta,
  onClose,
}: {
  icon?: React.ReactNode;
  title: string;
  cta: string;
  onClose: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
      {icon}
      <p className="font-display text-lg text-foreground">{title}</p>
      <Link
        to="/shop"
        onClick={onClose}
        className="rounded-[2px] bg-brown px-6 py-3 font-ui text-sm font-semibold uppercase tracking-wide text-primary-foreground hover:bg-brown-dark"
      >
        {cta} &rarr;
      </Link>
    </div>
  );
}
