"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const STATS = [
  {
    value: "10,000+",
    title: "FIVE-STAR HOTELS",
    description: "A world of exceptional stays across India and worldwide.",
  },
  {
    value: "100+",
    title: "LUXURY HOTEL BRANDS",
    description: "Renowned hospitality, thoughtfully curated.",
  },
  {
    value: "UP TO 40%",
    title: "MEMBER RATES",
    description: "Exclusive savings on eligible stays.",
  },
  {
    value: "24/7",
    title: "CONCIERGE SERVICE",
    description: "Personalised assistance, whenever you travel.",
  },
];

export default function Statssec() {
  return (
    <section className="bg-white pb-24 px-6 sm:px-12 w-full overflow-hidden select-none">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading & Sub-headline styled exactly like Image 2 */}
        <div className="text-center mb-14 md:mb-16 flex flex-col items-center">
          <div className="text-sm tracking-[0.4em] text-black uppercase font-light mb-6">
            EXCEPTIONAL STAYS. EXTRAORDINARY EXPERIENCES.
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif tracking-tight text-black mb-4">
            A More Privileged Way to Travel
          </h2>
          <p className="text-xs md:text-sm max-w-xl leading-relaxed text-neutral-600">
            A world of exceptional stays, luxury hotel brands, and exclusive member savings across India and worldwide.
          </p>
        </div>

        {/* Stats Grid: Matches the 4-column wide minimal footprint layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 items-stretch">
          {STATS.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="relative bg-white rounded-3xl p-8 min-h-[260px] border border-[#B38E46]/60 shadow-[0_4px_24px_rgba(212,175,55,0.06)] group flex flex-col justify-between items-start text-left hover:border-[#B38E46] hover:shadow-lg transition-all"
            >
              {/* High Contrast Value + Title */}
              <div className="flex flex-col gap-2 mt-2">
                <div className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-black leading-none tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-bold tracking-[0.15em] text-[#B38E46] uppercase font-sans mt-2">
                  {stat.title}
                </div>
              </div>

              {/* Lower Description block sitting at bottom of card */}
              <div className="text-neutral-700 font-sans text-xs sm:text-sm font-normal leading-relaxed tracking-wide mt-6">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
