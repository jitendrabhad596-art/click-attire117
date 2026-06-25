import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";

export function Splash() {
  const [gone, setGone] = useState(false);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.sessionStorage.getItem("ca_splash")) {
      setHide(true);
      return;
    }
    const t1 = setTimeout(() => setGone(true), 2200);
    const t2 = setTimeout(() => {
      setHide(true);
      window.sessionStorage.setItem("ca_splash", "1");
    }, 2800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (hide) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ivory transition-opacity duration-500"
      style={{ opacity: gone ? 0 : 1, pointerEvents: gone ? "none" : "auto" }}
    >
      <img src={logo} alt="Click Attire" className="h-40 w-40 animate-scale-in object-contain" />
      <p className="mt-4 font-sans text-sm font-light text-brown">Curating your wardrobe...</p>
      <div className="mt-6 h-[3px] w-48 overflow-hidden rounded-full bg-nude/40">
        <div className="h-full bg-brown" style={{ animation: "loadbar 2.2s ease forwards" }} />
      </div>
      <style>{`@keyframes loadbar { from { width: 0% } to { width: 100% } }`}</style>
    </div>
  );
}
