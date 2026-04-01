/*
 * Design: Canopy & Craft — Premium Artisan Service
 * Reviews: Light background. Google 5-star rating prominently displayed.
 * Individual review cards with subtle styling. Elegant serif quotes.
 */

import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Vanessa Brooks",
    date: "November 2017",
    text: "Absolutely sensational work! The boys are just lovely, professional and very efficient.",
    rating: 5,
  },
  {
    name: "Suad Halilovic",
    date: "June 2019",
    text: "Had the roots removed from my backyard along the fence line because they were pushing the fence up — done dirt cheap. I also recommend him to my next door neighbour who was also very pleased.",
    rating: 5,
  },
  {
    name: "Kaye Weller",
    date: "November 2022",
    text: "Great team, great job. Highly recommend their services for anyone needing professional tree care.",
    rating: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-gold text-gold" />
      ))}
    </div>
  );
}

export default function Reviews() {
  const { ref, inView } = useInView({ threshold: 0.2 });

  return (
    <section id="reviews" className="py-24 lg:py-32 bg-white" ref={ref}>
      <div className="container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gold font-body font-semibold text-sm uppercase tracking-[0.25em]">
            Testimonials
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-evergreen-dark mt-4 mb-6">
            What Our <span className="text-gold italic">Clients Say</span>
          </h2>

          {/* Google rating */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-gold text-gold" />
              ))}
            </div>
            <span className="font-body font-bold text-charcoal text-lg">5.0</span>
            <span className="font-body text-charcoal-light text-sm">on Google Reviews</span>
          </div>
        </motion.div>

        {/* Reviews grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <motion.div
              key={review.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative bg-cream rounded-lg p-8 border border-border/50"
            >
              {/* Quote icon */}
              <Quote className="w-8 h-8 text-gold/20 mb-4" />

              {/* Rating */}
              <StarRating count={review.rating} />

              {/* Text */}
              <p className="font-body text-charcoal-light text-base leading-relaxed mt-4 mb-6 italic">
                "{review.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                <div className="w-10 h-10 rounded-full bg-evergreen flex items-center justify-center">
                  <span className="font-display text-sm font-bold text-gold">
                    {review.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <span className="block font-body font-semibold text-charcoal text-sm">
                    {review.name}
                  </span>
                  <span className="block font-body text-charcoal-light text-xs">
                    {review.date}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
