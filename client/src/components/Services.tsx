/*
 * Design: Canopy & Craft — Premium Artisan Service
 * Services: Dark evergreen background section. 3x3 grid of service cards.
 * Each card has an icon, number, title, and brief description.
 * Hover reveals a gold accent line. Staggered entrance animation.
 */

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import {
  TreePine,
  Scissors,
  Axe,
  CircleDot,
  Shrub,
  FileText,
  AlertTriangle,
  Mountain,
  Leaf,
} from "lucide-react";

const services = [
  {
    icon: TreePine,
    title: "Tree Removal",
    description:
      "Safe and efficient removal of trees of all sizes, from small garden trees to large, hazardous specimens.",
  },
  {
    icon: Scissors,
    title: "Tree Pruning",
    description:
      "Expert pruning to promote healthy growth, improve appearance, and reduce risk from overhanging branches.",
  },
  {
    icon: Axe,
    title: "Tree Lopping",
    description:
      "Professional lopping services to manage tree size and shape while maintaining the health of your trees.",
  },
  {
    icon: CircleDot,
    title: "Stump Grinding",
    description:
      "Complete stump removal using specialised grinding equipment, leaving your property clean and level.",
  },
  {
    icon: Shrub,
    title: "Hedging",
    description:
      "Precision hedge trimming and shaping to keep your property boundaries neat, tidy, and well-maintained.",
  },
  {
    icon: FileText,
    title: "Arborist Reports",
    description:
      "Comprehensive arborist assessments and reports for council applications, insurance, and property management.",
  },
  {
    icon: AlertTriangle,
    title: "24/7 Emergency",
    description:
      "Round-the-clock emergency response for storm damage, fallen trees, and urgent hazard removal.",
  },
  {
    icon: Mountain,
    title: "Land Clearing",
    description:
      "Efficient clearing of vegetation and trees for development, farming, or fire prevention purposes.",
  },
  {
    icon: Leaf,
    title: "Bush Mulching",
    description:
      "Sustainable mulching of cleared vegetation, turning green waste into useful mulch for your property.",
  },
];

const SERVICES_BG =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663363127258/m9iU4vZSM2PNEEHBcZHpH5/services-bg-37dmvSftysVfiH4bBASJ29.webp";

export default function Services() {
  const { ref, inView } = useInView({ threshold: 0.1 });

  return (
    <section id="services" className="relative py-24 lg:py-32 overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={SERVICES_BG}
          alt=""
          className="w-full h-full object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-evergreen-dark/92" />
      </div>

      <div className="container relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gold font-body font-semibold text-sm uppercase tracking-[0.25em]">
            What We Do
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-semibold text-white mt-6 mb-8 tracking-[-0.01em]">
            Our <span className="text-gold italic">Services</span>
          </h2>
          <p className="font-body text-cream/70 text-lg max-w-2xl mx-auto">
            From routine maintenance to emergency response, we offer a comprehensive
            range of professional tree care services.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8 hover:bg-white/10 transition-all duration-500 hover:border-gold/30"
              >
                {/* Number */}
                <span className="absolute top-6 right-6 font-display text-5xl font-bold text-white/5 group-hover:text-gold/10 transition-colors duration-500">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center mb-5 group-hover:bg-gold/20 transition-colors duration-500">
                  <Icon className="w-6 h-6 text-gold" />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-semibold text-white mb-4 tracking-[-0.005em]">
                  {service.title}
                </h3>
                <p className="font-body text-cream/60 text-sm leading-relaxed">
                  {service.description}
                </p>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-gold group-hover:w-full transition-all duration-500" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
