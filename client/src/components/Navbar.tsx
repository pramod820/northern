/*
 * Design: Canopy & Craft — Premium Artisan Service
 * Navbar: Transparent on hero, solid on scroll. Elegant serif logo, understated nav links.
 * Gold accent on CTA. Sticky with backdrop blur.
 */

import { useState, useEffect } from "react";
import { Phone, Mail, Menu, X, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Why Us", href: "#why-us" },
    { label: "Reviews", href: "#reviews" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      {/* Top bar */}
      <div className="bg-evergreen text-cream/90 text-sm hidden lg:block">
        <div className="container flex justify-between items-center py-2">
          <div className="flex items-center gap-6">
            <a
              href="mailto:deanhibbert21@gmail.com"
              className="flex items-center gap-2 hover:text-gold transition-colors duration-300"
            >
              <Mail className="w-3.5 h-3.5" />
              deanhibbert21@gmail.com
            </a>
            <span className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5" />
              Mon – Sun: 9:00 AM – 5:00 PM
            </span>
          </div>
          <a
            href="tel:0409331052"
            className="flex items-center gap-2 font-semibold hover:text-gold transition-colors duration-300"
          >
            <Phone className="w-3.5 h-3.5" />
            0409 331 052
          </a>
        </div>
      </div>

      {/* Main navbar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg shadow-black/5"
            : "bg-white/80 backdrop-blur-sm"
        }`}
      >
        <div className="container flex items-center justify-between py-4">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-evergreen flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-gold" fill="currentColor">
                <path d="M12 2L8 8h3v4H8l4 6 4-6h-3V8h3L12 2zM7 18h10v2H7v-2z" />
              </svg>
            </div>
            <div>
              <span className="font-display text-xl font-bold text-evergreen tracking-tight leading-none">
                Northern Tree
              </span>
              <span className="block text-xs font-body font-semibold text-gold uppercase tracking-[0.2em] leading-tight">
                Solutions
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-charcoal/80 font-body font-medium text-sm tracking-wide hover:text-evergreen transition-colors duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:0409331052"
              className="flex items-center gap-2 bg-evergreen text-cream px-6 py-2.5 rounded font-body font-semibold text-sm hover:bg-evergreen-light transition-all duration-300 shadow-md shadow-evergreen/20"
            >
              <Phone className="w-4 h-4" />
              Get a Free Quote
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 text-evergreen"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-border overflow-hidden"
            >
              <div className="container py-6 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-charcoal font-body font-medium text-base py-2 border-b border-border/50 hover:text-evergreen transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="tel:0409331052"
                  className="flex items-center justify-center gap-2 bg-evergreen text-cream px-6 py-3 rounded font-body font-semibold text-base mt-2"
                >
                  <Phone className="w-4 h-4" />
                  0409 331 052
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
