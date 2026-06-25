import { Check, Heart, Info } from "lucide-react";
import { useStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export function Toaster() {
  const { toasts } = useStore();
  return (
    <div className="fixed bottom-5 left-5 z-[90] flex flex-col gap-2.5">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cn(
            "flex items-center gap-2.5 rounded-[2px] border-l-4 bg-card px-4 py-3 font-ui text-sm font-medium shadow-[0_8px_30px_rgba(0,0,0,0.12)] animate-slide-in-right",
            t.type === "success" && "border-success",
            t.type === "wishlist" && "border-brown",
            t.type === "info" && "border-gold",
          )}
        >
          {t.type === "success" && <Check className="h-4 w-4 text-success" />}
          {t.type === "wishlist" && <Heart className="h-4 w-4 fill-brown text-brown" />}
          {t.type === "info" && <Info className="h-4 w-4 text-gold" />}
          {t.message}
        </div>
      ))}
    </div>
  );
}
