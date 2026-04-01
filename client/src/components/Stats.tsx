/*
 * Design: Canopy & Craft — Premium Artisan Service
 * Stats: Horizontal counter bar with animated numbers.
 * Evergreen background with gold numbers. Elegant and impactful.
 */

import { useState, useEffect, useCallback } from "react";
import { useInView } from "@/hooks/useInView";
import { motion } from "framer-motion";

interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
  inView: boolean;
}

function Counter({ end, suffix = "", duration = 2000, inView }: CounterProps) {
  const [count, setCount] = useState(0);

  const animate = useCallback(() => {
    const startTime = Date.now();
    const step = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration]);

  useEffect(() => {
    if (inView) animate();
  }, [inView, animate]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

const stats = [
  { value: 500, suffix: "+", label: "Trees Serviced" },
  { value: 100, suffix: "%", label: "Fully Insured" },
  { value: 24, suffix: "/7", label: "Emergency Response" },
  { value: 5, suffix: ".0", label: "Google Rating" },
];

export default function Stats() {
  const { ref, inView } = useInView({ threshold: 0.3 });

  return (
    <section className="bg-evergreen py-16 lg:py-20" ref={ref}>
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="font-display text-4xl lg:text-5xl font-bold text-gold mb-2">
                <Counter
                  end={stat.value}
                  suffix={stat.suffix}
                  inView={inView}
                />
              </div>
              <div className="font-body text-cream/70 text-sm uppercase tracking-[0.15em]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
