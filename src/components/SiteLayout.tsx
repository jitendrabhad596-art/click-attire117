import type { ReactNode } from "react";
import { AnnouncementBar } from "./AnnouncementBar";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CartDrawer, WishlistDrawer } from "./Drawers";
import { SearchOverlay } from "./SearchOverlay";
import { Toaster } from "./Toaster";
import { FloatingButtons } from "./FloatingButtons";
import { MobileBottomNav } from "./MobileBottomNav";

export function SiteLayout({
  children,
  overHero = false,
}: {
  children: ReactNode;
  overHero?: boolean;
}) {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <Navbar overHero={overHero} />
      <main className={overHero ? "" : "pt-[106px]"}>{children}</main>
      <Footer />
      <div className="h-14 md:hidden" />
      <CartDrawer />
      <WishlistDrawer />
      <SearchOverlay />
      <Toaster />
      <FloatingButtons />
      <MobileBottomNav />
    </div>
  );
}
