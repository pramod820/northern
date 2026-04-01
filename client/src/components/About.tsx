/*
 * Design: Canopy & Craft — Premium Artisan Service
 * About: Asymmetric layout with image on one side, text on the other.
 * Warm cream background. Elegant serif headings. Generous whitespace.
 */

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { Shield, Award, Leaf } from "lucide-react";

const ABOUT_IMG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663363127258/m9iU4vZSM2PNEEHBcZHpH5/about-section-G977ihfTZdkiMKrsyA9MtV.webp";

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.2 });

  return (
    <section id="about" className="py-24 lg:py-32 bg-cream" ref={ref}>
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={ABOUT_IMG}
                alt="Careful tree pruning with professional tools"
                className="w-full h-[500px] lg:h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-evergreen/20 to-transparent" />
            </div>
            {/* Floating stat card */}
            <div className="absolute -bottom-6 -right-4 lg:-right-8 bg-evergreen text-cream p-6 rounded-lg shadow-2xl shadow-evergreen/30">
              <div className="text-center">
                <span className="block font-display text-4xl font-bold text-gold">100%</span>
                <span className="block font-body text-sm mt-1 text-cream/80">Fully Insured</span>
              </div>
            </div>
            {/* Decorative border */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-gold/40 rounded-tl-lg" />
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-gold font-body font-semibold text-sm uppercase tracking-[0.25em]">
              About Our Company
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-semibold text-evergreen-dark mt-6 mb-8 leading-[1.2] tracking-[-0.01em]">
              Tree Removal &<br />
              <span className="text-gold italic">Arborist Services</span>
            </h2>

            <p className="font-body text-charcoal-light text-lg leading-relaxed mb-8">
              At Northern Tree Solutions, we provide a full range of arborist and tree
              services for properties across Melbourne's north. From tree removal and
              land clearing to tree pruning and shaping, we can handle any job safely
              and efficiently.
            </p>

            <p className="font-body text-charcoal-light text-base leading-relaxed mb-10">
              Professional tree maintenance is essential for keeping your property safe,
              your garden looking great and ensuring your trees are healthy and happy.
              Our expert arborists understand the needs of each and every tree. We
              carefully balance the wellbeing of the vegetation with the need for safety
              on your property.
            </p>

            {/* Key points */}
            <div className="grid sm:grid-cols-3 gap-6 mb-8">
              {[
                { icon: Shield, label: "Fully Insured" },
                { icon: Award, label: "Qualified Arborists" },
                { icon: Leaf, label: "Australian Owned" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                  <span className="font-body font-semibold text-sm text-charcoal">{label}</span>
                </div>
              ))}
            </div>

            <a
              href="#services"
              className="inline-flex items-center gap-2 font-body font-semibold text-evergreen hover:text-gold transition-colors duration-300 group"
            >
              Explore Our Services
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                &rarr;
              </span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
