/*
 * Design: Canopy & Craft — Premium Artisan Service
 * Emergency CTA: Dramatic dark section with storm damage background.
 * Urgent but elegant. Gold CTA button. 24/7 emphasis.
 */

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { Phone, AlertTriangle } from "lucide-react";

const EMERGENCY_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663363127258/m9iU4vZSM2PNEEHBcZHpH5/emergency-cta-2rL83ECiqL2hS5RdqqihD6.webp";

export default function EmergencyCTA() {
  const { ref, inView } = useInView({ threshold: 0.3 });

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={EMERGENCY_IMG}
          alt="Emergency tree removal after storm damage"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center animate-pulse">
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            <span className="text-red-400 font-body font-semibold text-sm uppercase tracking-[0.2em]">
              24/7 Emergency Service
            </span>
          </div>

          <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            Storm Damage?{" "}
            <span className="text-gold italic">We're Here to Help.</span>
          </h2>

          <p className="font-body text-white/70 text-lg leading-relaxed mb-10 max-w-2xl">
            When disaster strikes, our emergency response team is available around the
            clock. We'll safely remove fallen trees and hazardous branches to protect
            your property and restore access.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="tel:0409331052"
              className="inline-flex items-center justify-center gap-3 bg-gold hover:bg-gold-light text-evergreen-dark font-body font-bold text-lg px-10 py-4 rounded transition-all duration-300 shadow-lg shadow-gold/30 hover:shadow-xl hover:shadow-gold/40"
            >
              <Phone className="w-5 h-5" />
              Call Now: 0409 331 052
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
