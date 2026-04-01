/*
 * Design: Canopy & Craft — Premium Artisan Service
 * Why Choose Us: Light cream background. Four feature cards in a 2x2 grid.
 * Large numbers, elegant descriptions. Subtle hover lift.
 */

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { Shield, Award, MapPin, DollarSign } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Professional Arborists",
    description:
      "Our team of qualified arborists possesses the expertise and experience to handle all your tree care needs, ensuring the health and safety of your trees.",
  },
  {
    icon: Shield,
    title: "Fully Insured",
    description:
      "For your peace of mind, we are fully insured against any unforeseen circumstances, guaranteeing coverage for both you and your property.",
  },
  {
    icon: MapPin,
    title: "Australian Owned & Operated",
    description:
      "We are a proudly Australian owned and operated business, committed to providing exceptional tree care services to our local communities.",
  },
  {
    icon: DollarSign,
    title: "Free Quotes",
    description:
      "Get in touch with us today to receive a free quote for our comprehensive tree care services. We'll assess your needs and provide a tailored solution that fits your budget.",
  },
];

export default function WhyChooseUs() {
  const { ref, inView } = useInView({ threshold: 0.2 });

  return (
    <section id="why-us" className="py-24 lg:py-32 bg-cream" ref={ref}>
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-16">
          {/* Left column — heading */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start"
          >
            <span className="text-gold font-body font-semibold text-sm uppercase tracking-[0.25em]">
              Why Choose Us
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-evergreen-dark mt-4 mb-6 leading-tight">
              The <span className="text-gold italic">Right Team</span> for the Job
            </h2>
            <p className="font-body text-charcoal-light text-base leading-relaxed mb-8">
              When it comes to tree removal, safety is the name of the game. Working
              with a professional, experienced and fully insured team of arborists will
              give you peace of mind knowing your property is in good hands.
            </p>
            <div className="hidden lg:block w-16 h-[2px] bg-gold" />
          </motion.div>

          {/* Right column — cards */}
          <div className="lg:col-span-8 grid sm:grid-cols-2 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  className="group bg-white rounded-lg p-8 shadow-sm hover:shadow-xl hover:shadow-evergreen/5 transition-all duration-500 hover:-translate-y-1 border border-border/50"
                >
                  <div className="w-14 h-14 rounded-full bg-evergreen/5 flex items-center justify-center mb-6 group-hover:bg-gold/10 transition-colors duration-500">
                    <Icon className="w-7 h-7 text-evergreen group-hover:text-gold transition-colors duration-500" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-charcoal mb-3">
                    {feature.title}
                  </h3>
                  <p className="font-body text-charcoal-light text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
