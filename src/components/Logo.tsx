import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";
import logoWhite from "@/assets/logo-white.png";
import { cn } from "@/lib/utils";

export function Logo({
  variant = "dark",
  className,
  size = 44,
}: {
  variant?: "dark" | "light";
  className?: string;
  size?: number;
}) {
  return (
    <Link to="/" className={cn("inline-flex items-center", className)} aria-label="Click Attire home">
      <img
        src={variant === "light" ? logoWhite : logo}
        alt="Click Attire"
        width={size}
        height={size}
        style={{ height: size, width: size }}
        className="object-contain"
      />
    </Link>
  );
}
