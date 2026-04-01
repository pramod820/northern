/*
 * Design: Canopy & Craft — Premium Artisan Service
 * Footer: Dark evergreen background. Elegant layout with logo, links, services, and contact.
 * Gold accents. Subtle border separations.
 */

import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-evergreen-dark text-cream">
      <div className="container py-16 lg:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-gold" fill="currentColor">
                  <path d="M12 2L8 8h3v4H8l4 6 4-6h-3V8h3L12 2zM7 18h10v2H7v-2z" />
                </svg>
              </div>
              <div>
                <span className="font-display text-lg font-bold text-cream tracking-tight leading-none">
                  Northern Tree
                </span>
                <span className="block text-xs font-body font-semibold text-gold uppercase tracking-[0.2em] leading-tight">
                  Solutions
                </span>
              </div>
            </div>
            <p className="font-body text-cream/60 text-sm leading-relaxed">
              A qualified and fully insured team of professionals ready to cater for a
              wide range of tree care services across Melbourne's north.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display text-base font-semibold text-cream mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "#home" },
                { label: "About Us", href: "#about" },
                { label: "Our Services", href: "#services" },
                { label: "Why Choose Us", href: "#why-us" },
                { label: "Reviews", href: "#reviews" },
                { label: "Contact", href: "#contact" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="font-body text-cream/60 text-sm hover:text-gold transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-base font-semibold text-cream mb-6">
              Our Services
            </h4>
            <ul className="space-y-3">
              {[
                "Tree Removal",
                "Tree Pruning",
                "Tree Lopping",
                "Stump Grinding",
                "Hedging",
                "Arborist Reports",
                "Emergency Services",
                "Land Clearing",
                "Bush Mulching",
              ].map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="font-body text-cream/60 text-sm hover:text-gold transition-colors duration-300"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-base font-semibold text-cream mb-6">
              Contact Us
            </h4>
            <div className="space-y-4">
              <a
                href="tel:0409331052"
                className="flex items-center gap-3 font-body text-cream/60 text-sm hover:text-gold transition-colors duration-300"
              >
                <Phone className="w-4 h-4 text-gold flex-shrink-0" />
                0409 331 052
              </a>
              <a
                href="mailto:deanhibbert21@gmail.com"
                className="flex items-center gap-3 font-body text-cream/60 text-sm hover:text-gold transition-colors duration-300"
              >
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />
                deanhibbert21@gmail.com
              </a>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                <span className="font-body text-cream/60 text-sm">
                  285 Sunday Creek Rd,
                  <br />
                  Sunday Creek VIC 3658
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-cream/10">
        <div className="container py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-body text-cream/40 text-xs">
            &copy; {new Date().getFullYear()} Northern Tree Solutions. All Rights Reserved.
          </p>
          <p className="font-body text-cream/40 text-xs">
            Proudly Australian Owned & Operated
          </p>
        </div>
      </div>
    </footer>
  );
}
