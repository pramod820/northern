/*
 * Design: Canopy & Craft — Premium Artisan Service
 * Process: How We Work section. Clean white background.
 * Three-step horizontal timeline with connecting lines.
 */

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { Phone, ClipboardCheck, Hammer } from "lucide-react";

const steps = [
  {
    icon: Phone,
    step: "01",
    title: "Get in Touch",
    description:
      "Give us a call or fill out our contact form. We'll discuss your needs and arrange a convenient time to visit your property.",
  },
  {
    icon: ClipboardCheck,
    step: "02",
    title: "Free Assessment",
    description:
      "Our qualified arborist will visit your property, assess the work required, and provide a detailed, obligation-free quote.",
  },
  {
    icon: Hammer,
    step: "03",
    title: "Expert Execution",
    description:
      "Our experienced team carries out the work safely and efficiently, leaving your property clean and tidy when we're done.",
  },
];

export default function Process() {
  const { ref, inView } = useInView({ threshold: 0.2 });

  return (
    <section className="py-24 lg:py-32 bg-white" ref={ref}>
      <div className="container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gold font-body font-semibold text-sm uppercase tracking-[0.25em]">
            How It Works
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-evergreen-dark mt-4 mb-6">
            Our <span className="text-gold italic">Process</span>
          </h2>
          <p className="font-body text-charcoal-light text-lg max-w-2xl mx-auto">
            Getting professional tree care shouldn't be complicated. Here's how we
            make it easy for you.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-0 relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden lg:block absolute top-16 left-[16.67%] right-[16.67%] h-[2px] bg-border" />

          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative text-center px-8"
              >
                {/* Step circle */}
                <div className="relative z-10 w-32 h-32 mx-auto mb-8 rounded-full bg-cream flex flex-col items-center justify-center border-2 border-border">
                  <Icon className="w-8 h-8 text-evergreen mb-1" />
                  <span className="font-display text-xs font-bold text-gold uppercase tracking-wider">
                    Step {item.step}
                  </span>
                </div>

                <h3 className="font-display text-xl font-semibold text-charcoal mb-3">
                  {item.title}
                </h3>
                <p className="font-body text-charcoal-light text-sm leading-relaxed max-w-xs mx-auto">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
