/*
 * Design: Ironbark - Premium Industrial Arborist Service
 * Hero: Full-bleed cinematic image with overlaid text. Elegant serif heading.
 * Parallax depth effect. Gold accent on CTA buttons.
 */

import { motion } from "framer-motion";
import { Phone, ChevronDown } from "lucide-react";

const HERO_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663363127258/m9iU4vZSM2PNEEHBcZHpH5/hero-banner-mZUHf9tXoaGkzrMd49jbFq.webp";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src={HERO_IMG}
          alt="Professional arborist team working on a eucalyptus tree at golden hour"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="container relative z-10 py-24 lg:py-32">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block text-gold font-body font-semibold text-xs uppercase tracking-[0.3em] mb-8">
              Melbourne&apos;s North &mdash; Trusted Since Day One
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold text-white leading-[1.15] mb-8 tracking-[-0.02em]"
          >
            We Prune, Remove
            <br />
            & Care For{" "}
            <span className="text-gold italic">Your Trees</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-white/80 font-body text-lg md:text-xl leading-relaxed mb-10 max-w-xl"
          >
            Professional arborist services for properties across Seymour, Kilmore,
            Lancefield, Macedon, Gisborne, and surrounding regions. Fully insured.
            Australian owned.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-evergreen-dark font-body font-semibold text-base px-8 py-4 rounded transition-all duration-300 shadow-lg shadow-gold/30 hover:shadow-xl hover:shadow-gold/40 hover:-translate-y-0.5"
            >
              Get a Free Quote
            </a>
            <a
              href="tel:0409331052"
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-body font-semibold text-base px-8 py-4 rounded hover:bg-white/20 transition-all duration-300"
            >
              <Phone className="w-4 h-4" />
              0409 331 052
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <a href="#about" className="flex flex-col items-center gap-2 text-white/60 hover:text-white/90 transition-colors">
          <span className="text-xs font-body uppercase tracking-[0.2em]">Discover</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}
