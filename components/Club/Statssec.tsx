"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

const STATS = [
  {
    value: "30+",
    description: "Years of Club Elevate, delivering timeless family holidays",
    isAccent: false,
  },
  {
    value: "3 lakh+",
    description: "Member Community ensuring one crore+ happy holidays",
    isAccent: true, // Triggers the solid orange circle icon badge from your screenshot
  },
  {
    value: "5,000+",
    description: "Resorts globally, providing access to premium destinations",
    isAccent: false,
  },
  {
    value: "1 Cr+",
    description: "Happy holidays and premium memories created worldwide",
    isAccent: false,
  },
];

export default function Statssec() {
  return (
    <section className="bg-white pb-24 px-6 sm:px-12 w-full overflow-hidden select-none">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading: Centered Serif Font matching your screenshot */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-[Vera] text-black font-normal tracking-wide">
            Success stories that inspire
          </h2>
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
              className="relative bg-white rounded-4xl p-8 md:p-8 min-h-70 border border-black/50 shadow-xs group flex flex-col justify-between items-start text-left"
            >
              {/* Dynamic Icon Badge Area (Top Right Position) */}
              <div className="absolute top-6 right-6">
                {stat.isAccent ? (
                  // Solid Orange Circle Icon Frame Variant
                  <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-white shadow-sm shadow-orange-500/20 group-hover:scale-105 transition-transform duration-300">
                    <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                  </div>
                ) : (
                  // Minimal/Neutral Floating Icon Variant
                  <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-500 border border-neutral-200/40 group-hover:bg-neutral-900 group-hover:text-white group-hover:border-transparent transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4 stroke-2" />
                  </div>
                )}
              </div>

              {/* High Contrast Structural Number Display */}
              <div className="text-5xl sm:text-6xl lg:text-7xl font-serif font-normal text-black leading-none mt-4 tracking-tight">
                {stat.value}
              </div>

              {/* Lower Minimal Description block sitting at bottom of card */}
              <div className="text-neutral-500 font-sans text-xs sm:text-sm font-medium leading-relaxed tracking-wide max-w-[90%] mt-8">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
