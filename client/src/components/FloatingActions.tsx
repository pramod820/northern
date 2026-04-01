/*
 * Design: Canopy & Craft — Premium Artisan Service
 * Floating Actions: Back-to-top button and floating phone CTA.
 * Appears after scrolling. Smooth animations.
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp, Phone } from "lucide-react";

export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Floating phone CTA — mobile only */}
      <a
        href="tel:0409331052"
        className="fixed bottom-6 right-6 z-40 lg:hidden w-14 h-14 bg-gold rounded-full flex items-center justify-center shadow-lg shadow-gold/30 hover:bg-gold-light transition-all duration-300"
        aria-label="Call us"
      >
        <Phone className="w-6 h-6 text-evergreen-dark" />
      </a>

      {/* Back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-6 left-6 z-40 w-12 h-12 bg-evergreen rounded-full flex items-center justify-center shadow-lg shadow-evergreen/30 hover:bg-evergreen-light transition-all duration-300"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5 text-cream" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
