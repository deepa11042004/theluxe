"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpLeft, ArrowUpRight } from "lucide-react";
import LuxeMembershipCard, { CardTier } from "./LuxeMembershipCard";

const CARDS: { id: string; tier: CardTier }[] = [
  { id: "1", tier: "signature" },
  { id: "2", tier: "diamond" },
  { id: "3", tier: "imperial" },
];

export default function CardOrbitCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextCard = () => {
    setActiveIndex((prev) => (prev + 1) % CARDS.length);
  };

  const prevCard = () => {
    setActiveIndex((prev) => (prev - 1 + CARDS.length) % CARDS.length);
  };

  const activeTierName = CARDS[activeIndex].tier.toUpperCase() + " MEMBERSHIP";

  return (
    <div className="relative w-full overflow-visible min-h-[700px] flex flex-col items-center pt-10">
      
      {/* Tier Name floating far to the right */}
      <div className="absolute right-4 md:right-12 top-10 z-20 text-right">
        <h2 className="text-xl md:text-3xl font-serif text-neutral-800 tracking-[0.2em]">{activeTierName}</h2>
      </div>

      {/* SVG Circle and Buttons */}
      <div className="relative w-full max-w-4xl aspect-square pointer-events-none mt-10">
        <svg
          viewBox="-100 -660 1200 1180"
          className="absolute inset-0 w-full h-full overflow-visible"
        >
          {/* Full Circular Line */}
          <circle
            cx="500"
            cy="-100"
            r="500"
            fill="none"
            stroke="#E5E5E5"
            strokeWidth="2"
          />
          
          {/* Left Button positioned on the circle line */}
          <foreignObject x="-30" y="-130" width="60" height="60" className="pointer-events-auto">
            <button
              onClick={prevCard}
              className="w-14 h-14 rounded-full bg-white shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-neutral-100 flex items-center justify-center hover:bg-neutral-50 transition-colors"
            >
              <ArrowUpLeft className="w-6 h-6 text-neutral-600" />
            </button>
          </foreignObject>

          {/* Right Button positioned on the circle line */}
          <foreignObject x="970" y="-130" width="60" height="60" className="pointer-events-auto">
            <button
              onClick={nextCard}
              className="w-14 h-14 rounded-full bg-white shadow-[0_4px_12px_rgba(0,0,0,0.1)] border border-neutral-100 flex items-center justify-center hover:bg-neutral-50 transition-colors"
            >
              <ArrowUpRight className="w-6 h-6 text-neutral-600" />
            </button>
          </foreignObject>
        </svg>

        {/* Middle Active Card */}
        <div className="absolute inset-0 flex items-start justify-center pointer-events-auto">
          <div className="w-[300px] sm:w-[450px] z-20 -mt-[160px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
              >
                <LuxeMembershipCard tier={CARDS[activeIndex].tier} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Pill bar below circle */}
      <div className="relative z-10 mt-auto mb-10 flex space-x-3 bg-white/80 backdrop-blur-md rounded-full px-6 py-3 shadow-sm border border-neutral-100">
        {CARDS.map((card, idx) => (
          <button
            key={card.id}
            onClick={() => setActiveIndex(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              activeIndex === idx ? "bg-neutral-800 w-8" : "bg-neutral-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
