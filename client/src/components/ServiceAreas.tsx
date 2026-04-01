/*
 * Design: Canopy & Craft — Premium Artisan Service
 * Service Areas: Elegant display of service locations. Tree canopy background.
 * Location tags in a flowing layout.
 */

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { MapPin } from "lucide-react";

const areas = [
  "Seymour",
  "Nagambie",
  "Wallan",
  "Kilmore",
  "Lancefield",
  "Romsey",
  "Macedon",
  "Gisborne",
  "Broadford",
  "Wandong",
  "Sunday Creek",
];

const CANOPY_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663363127258/m9iU4vZSM2PNEEHBcZHpH5/tree-canopy-j7C29LjWgQ7BreuL3Nr6Ty.webp";

export default function ServiceAreas() {
  const { ref, inView } = useInView({ threshold: 0.2 });

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={CANOPY_IMG}
          alt=""
          className="w-full h-full object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-evergreen-dark/90" />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-gold font-body font-semibold text-sm uppercase tracking-[0.25em]">
            Where We Work
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mt-4 mb-6">
            Service <span className="text-gold italic">Areas</span>
          </h2>
          <p className="font-body text-cream/70 text-lg max-w-2xl mx-auto">
            We provide tree removal and arborist solutions across a wide area north of
            Melbourne, covering the following regions and surrounds.
          </p>
        </motion.div>

        {/* Area tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto"
        >
          {areas.map((area, index) => (
            <motion.div
              key={area}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
              className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-5 py-2.5 hover:bg-gold/20 hover:border-gold/30 transition-all duration-300"
            >
              <MapPin className="w-3.5 h-3.5 text-gold" />
              <span className="font-body font-medium text-white text-sm">{area}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Address */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="font-body text-cream/50 text-sm">
            Based at 285 Sunday Creek Rd, Sunday Creek VIC 3658
          </p>
        </motion.div>
      </div>
    </section>
  );
}
