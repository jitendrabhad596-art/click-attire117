import { useEffect, useState } from "react";
import { ArrowUp, MessageCircle } from "lucide-react";

export function FloatingButtons() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed bottom-20 right-4 z-40 flex flex-col gap-3 md:bottom-6">
      <button className="group relative grid h-12 w-12 place-items-center rounded-full bg-brown text-primary-foreground shadow-lg" aria-label="Chat with us">
        <span className="absolute inset-0 animate-ping rounded-full bg-brown/40" />
        <MessageCircle className="relative h-5 w-5" />
      </button>
      {show && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="grid h-12 w-12 place-items-center rounded-full bg-ink text-white shadow-lg transition-transform hover:scale-110"
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
