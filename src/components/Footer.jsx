import { Link } from "react-router-dom";
import { Sprout, MapPin, Mail, Phone, Heart } from "lucide-react";

const quickLinks = [
  { to: "/shop", label: "Shop All Plants" },
  { to: "/quiz", label: "Plant Finder Quiz" },
  { to: "/guides", label: "Care Guides" },
];

export default function Footer() {
  return (
    <footer className="bg-forest text-cream/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sprout className="w-6 h-6 text-sage-light" />
              <span className="font-heading text-xl font-bold tracking-tight">
                Green Thumb
              </span>
            </div>
            <p className="text-cream/60 text-sm leading-relaxed max-w-xs">
              Curated indoor plants for every space, skill level, and lifestyle.
              Bringing nature home since 2020.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wider mb-4 text-sage-light">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-cream/60 text-sm hover:text-terracotta-light transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-heading font-semibold text-sm uppercase tracking-wider mb-4 text-sage-light">
              Get In Touch
            </h3>
            <ul className="space-y-2.5 text-cream/60 text-sm">
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-sage-light shrink-0" /> Iberya , Tanger , Maroc
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sage-light shrink-0" /> GreenThumb@greenthumb.shop
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sage-light shrink-0" /> +212 6 00 00 00 00
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-cream/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-cream/40 text-xs">
          <p>© {new Date().getFullYear()} Green Thumb Boutique. All rights reserved.</p>
          <p className="flex items-center gap-1">
          </p>
        </div>
      </div>
    </footer>
  );
}
