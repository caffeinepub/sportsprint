import { Link } from "@tanstack/react-router";
import { Menu, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartCount } = useCart();

  const navLinks = [
    { to: "/", label: "HOME", exact: true },
    { to: "/clubs", label: "CLUB LOCKER ROOMS", exact: false },
    { to: "/stock", label: "STOCK SHOP", exact: false },
    { to: "/admin", label: "ADMIN", exact: false },
  ];

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo + Slogan */}
          <Link
            to="/"
            className="flex items-center gap-3 group"
            data-ocid="nav.link"
          >
            <img
              src="/assets/generated/clubkit-logo-transparent.dim_400x400.png"
              alt="Clubkit Co"
              className="h-20 w-auto"
            />
            <div className="flex flex-col leading-tight hidden sm:flex">
              <span className="text-xl font-black tracking-wide text-foreground uppercase">
                Clubkit Co
              </span>
              <span className="text-xs font-semibold tracking-widest text-amber-600 uppercase">
                Gear Up. Game On.
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-xs font-bold tracking-widest text-muted-foreground hover:text-primary transition-colors duration-200"
                activeProps={{
                  className: "text-xs font-bold tracking-widest text-primary",
                }}
                activeOptions={{ exact: link.exact }}
                data-ocid="nav.link"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <Link
              to="/basket"
              className="relative p-2 text-muted-foreground hover:text-primary transition-colors"
              aria-label="Cart"
              data-ocid="nav.link"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-primary text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </Link>
            <button
              type="button"
              className="md:hidden p-2 text-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav className="md:hidden bg-white border-t border-border">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="block px-6 py-3 text-xs font-bold tracking-widest uppercase text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
              onClick={() => setMobileOpen(false)}
              data-ocid="nav.link"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
