import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Sprout } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/quiz", label: "Plant Quiz" },
  { to: "/guides", label: "Care Guides" },
];

export default function Navbar({ onCartOpen }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartCount } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-cream/80 backdrop-blur-lg border-b border-sage/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <Sprout className="w-6 h-6 text-forest group-hover:rotate-12 transition-transform duration-300" />
            <span className="font-heading text-xl font-bold text-forest tracking-tight">
              Green Thumb
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-forest text-cream shadow-md"
                      : "text-charcoal hover:bg-sage/10 hover:text-forest"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right section */}
          <div className="flex items-center gap-3">
            {/* Cart Button */}
            <button
              id="cart-toggle"
              onClick={onCartOpen}
              className="relative p-2 rounded-full hover:bg-sage/10 transition-colors duration-200"
              aria-label="Open shopping cart"
            >
              <svg
                className="w-6 h-6 text-forest"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-5 h-5 text-[10px] font-bold text-white bg-terracotta rounded-full animate-scale-in">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-sage/10 transition-colors"
              aria-label="Toggle navigation menu"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span
                  className={`block h-0.5 bg-forest rounded transition-all duration-300 ${
                    mobileOpen ? "rotate-45 translate-y-1.5" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 bg-forest rounded transition-all duration-300 ${
                    mobileOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 bg-forest rounded transition-all duration-300 ${
                    mobileOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="px-4 pb-4 space-y-1 bg-cream/95 backdrop-blur-lg">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-forest text-cream"
                    : "text-charcoal hover:bg-sage/10"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
