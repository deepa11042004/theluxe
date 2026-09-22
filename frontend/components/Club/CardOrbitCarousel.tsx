"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpLeft, ArrowUpRight, ArrowRight } from "lucide-react";
import Image from "next/image";
import LuxeMembershipCard, { CardTier } from "./LuxeMembershipCard";

export interface MembershipCardItem {
  id: string;
  tier: CardTier;
  name: string;
  tierWord: string;
  price: string;
  period: string;
  image: string;
  description: string;
}

const MEMBERSHIP_CARDS: MembershipCardItem[] = [
  {
    id: "signature",
    tier: "signature",
    name: "SIGNATURE",
    tierWord: "SIGNATURE",
    price: "₹ 12,999",
    period: "Year",
    image: "/Img/card-signature.png",
    description: "One full year of premium hotel privileges, exclusive rates and travel benefits across India.",
  },
  {
    id: "diamond",
    tier: "diamond",
    name: "DIAMOND",
    tierWord: "DIAMOND",
    price: "₹ 19,999",
    period: "Year",
    image: "/Img/card-prestige.png",
    description: "Your gateway to 5-star hotel privileges and premium travel benefits across India and worldwide.",
  },
  {
    id: "imperial",
    tier: "imperial",
    name: "IMPERIAL",
    tierWord: "IMPERIAL",
    price: "₹ 49,999",
    period: "Lifetime",
    image: "/Img/card-black.png",
    description: "Pay once and enjoy The Luxe Yatra lifestyle and worldwide privileges for a lifetime.",
  },
];

// Single Card Display Component with Image + Fallback
function CardVisual({
  card,
  isCenter = false,
  className = "",
}: {
  card: MembershipCardItem;
  isCenter?: boolean;
  className?: string;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={`relative w-full aspect-[1.68/1] select-none rounded-[0.85rem] sm:rounded-[1.1rem] md:rounded-[1.35rem] transition-all duration-300 ${
        isCenter
          ? "drop-shadow-[0_20px_35px_rgba(0,0,0,0.32)] ring-1 ring-amber-400/30"
          : "drop-shadow-[0_8px_16px_rgba(0,0,0,0.18)] opacity-95 hover:opacity-100"
      } ${className}`}
    >
      {!imgError ? (
        <div className="relative w-full h-full rounded-[0.85rem] sm:rounded-[1.1rem] md:rounded-[1.35rem] overflow-hidden bg-neutral-900">
          <Image
            src={card.image}
            alt={`${card.name} Membership Card`}
            fill
            sizes={isCenter ? "(max-width: 768px) 300px, 380px" : "240px"}
            className="object-cover pointer-events-none"
            priority={isCenter}
            onError={() => setImgError(true)}
          />
          {/* Subtle luxury gloss sheen overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-transparent pointer-events-none" />
        </div>
      ) : (
        <LuxeMembershipCard tier={card.tier} />
      )}
    </div>
  );
}

export default function CardOrbitCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [compareActive, setCompareActive] = useState(false);

  const totalCards = MEMBERSHIP_CARDS.length;

  const nextCard = () => {
    setActiveIndex((prev) => (prev + 1) % totalCards);
  };

  const prevCard = () => {
    setActiveIndex((prev) => (prev - 1 + totalCards) % totalCards);
  };

  // Determine card indices: Left, Center, Right
  const centerCard = MEMBERSHIP_CARDS[activeIndex];
  const leftIndex = (activeIndex - 1 + totalCards) % totalCards;
  const rightIndex = (activeIndex + 1) % totalCards;

  const leftCard = MEMBERSHIP_CARDS[leftIndex];
  const rightCard = MEMBERSHIP_CARDS[rightIndex];

  // Handle smooth scroll to Comparison section
  const handleCompareClick = () => {
    setCompareActive(!compareActive);
    const elem = document.getElementById("membership-comparison");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto px-4 py-2 select-none overflow-visible flex flex-col items-center">
      {/* MAIN COMPACT STAGE (Exact Hyatt Dining Club Geometry) */}
      <div className="relative w-full h-[380px] sm:h-[420px] md:h-[450px] flex items-center justify-center overflow-visible">
        
        {/* Glowing circular aura backdrop behind center card extending down into bottom bar */}
        <div
          className="absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[380px] md:w-[440px] aspect-square rounded-full pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.95) 40%, rgba(254, 243, 199, 0.25) 60%, rgba(255, 255, 255, 0) 75%)",
            filter: "blur(18px)",
          }}
        />

        {/* SVG Orbital Track & Suspension Lines (Exact 1000 x 480 Coordinate Space) */}
        <svg
          viewBox="0 0 1000 480"
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
        >
          {/* Top Suspension Curve */}
          <path
            d="M 120, 18 Q 500, 38 880, 18"
            fill="none"
            stroke="#1E293B"
            strokeWidth="1.5"
            strokeOpacity="0.85"
          />

          {/* Left Vertical Suspension Drop Line (to top of left card) */}
          <line
            x1="190"
            y1="22"
            x2="190"
            y2="75"
            stroke="#1E293B"
            strokeWidth="1.5"
            strokeOpacity="0.85"
          />

          {/* Right Vertical Suspension Drop Line (to top of right card) */}
          <line
            x1="810"
            y1="22"
            x2="810"
            y2="75"
            stroke="#1E293B"
            strokeWidth="1.5"
            strokeOpacity="0.85"
          />

          {/* Left Arc: curves down through left button into behind center card */}
          <path
            d="M 190, 140 C 240, 140 270, 175 300, 215 C 330, 255 365, 275 420, 275"
            fill="none"
            stroke="#1E293B"
            strokeWidth="1.75"
            strokeOpacity="0.9"
          />

          {/* Right Arc: curves out from behind center card up through right button to right card */}
          <path
            d="M 580, 275 C 635, 275 670, 255 700, 215 C 730, 175 760, 140 810, 140"
            fill="none"
            stroke="#1E293B"
            strokeWidth="1.75"
            strokeOpacity="0.9"
          />

          {/* Right Continuation Arc: sweeps down and to the right beyond right card */}
          <path
            d="M 830, 160 C 870, 200 910, 235 970, 260"
            fill="none"
            stroke="#1E293B"
            strokeWidth="1.75"
            strokeOpacity="0.85"
          />
        </svg>

        {/* --- LEFT CARD (Flanking Silver/Inactive Tier) --- */}
        <div
          onClick={prevCard}
          className="absolute left-[5%] sm:left-[6%] md:left-[7%] top-[10%] sm:top-[11%] md:top-[12%] w-[160px] sm:w-[200px] md:w-[230px] z-10 cursor-pointer transform hover:scale-105 transition-transform duration-300 group"
          title={`Click to view ${leftCard.name}`}
        >
          <CardVisual card={leftCard} isCenter={false} />
        </div>

        {/* --- LEFT NAVIGATION ARROW BUTTON (Directly on Curved Line) --- */}
        <button
          onClick={prevCard}
          aria-label="Previous Membership Tier"
          className="absolute left-[29.5%] sm:left-[29.8%] md:left-[30%] top-[43%] sm:top-[44%] md:top-[44.5%] -translate-x-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#C25337] hover:bg-[#D45F42] active:scale-95 text-white shadow-[0_4px_12px_rgba(194,83,55,0.45)] border border-white/40 flex items-center justify-center transition-all duration-200 cursor-pointer"
        >
          <ArrowUpLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white" strokeWidth={2.2} />
        </button>

        {/* --- CENTER ACTIVE CARD (Gold/Featured Tier) --- */}
        <div className="absolute left-1/2 top-[55%] sm:top-[56%] md:top-[56%] -translate-x-1/2 -translate-y-1/2 w-[250px] sm:w-[310px] md:w-[360px] z-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={centerCard.id}
              initial={{ opacity: 0, scale: 0.94, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: -10 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="w-full"
            >
              <CardVisual card={centerCard} isCenter={true} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* --- RIGHT NAVIGATION ARROW BUTTON (Directly on Curved Line) --- */}
        <button
          onClick={nextCard}
          aria-label="Next Membership Tier"
          className="absolute left-[70.5%] sm:left-[70.2%] md:left-[70%] top-[43%] sm:top-[44%] md:top-[44.5%] -translate-x-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#C25337] hover:bg-[#D45F42] active:scale-95 text-white shadow-[0_4px_12px_rgba(194,83,55,0.45)] border border-white/40 flex items-center justify-center transition-all duration-200 cursor-pointer"
        >
          <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" strokeWidth={2.2} />
        </button>

        {/* --- RIGHT CARD (Flanking Platinum/Inactive Tier) --- */}
        <div
          onClick={nextCard}
          className="absolute right-[5%] sm:right-[6%] md:right-[7%] top-[10%] sm:top-[11%] md:top-[12%] w-[160px] sm:w-[200px] md:w-[230px] z-10 cursor-pointer transform hover:scale-105 transition-transform duration-300 group"
          title={`Click to view ${rightCard.name}`}
        >
          <CardVisual card={rightCard} isCenter={false} />
        </div>

        {/* --- TIER TITLE (Positioned to the right of Center Card, exactly as in Reference Image) --- */}
        <div className="hidden lg:flex flex-col items-start absolute left-[70%] xl:left-[71%] top-[56%] z-10 pointer-events-none text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={centerCard.id}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.22 }}
            >
              <h3 className="font-serif text-2xl xl:text-3xl font-medium tracking-[0.22em] text-[#0B2540] uppercase leading-tight">
                {centerCard.tierWord}
              </h3>
              <p className="font-serif italic text-2xl xl:text-3xl font-light tracking-[0.16em] text-[#0B2540] uppercase leading-tight mt-0.5">
                MEMBERSHIP
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* Medium & Mobile Title Display (Centered) */}
      <div className="lg:hidden flex flex-col items-center text-center my-2 z-10">
        <h3 className="font-serif text-xl sm:text-2xl font-medium tracking-[0.2em] text-[#0B2540] uppercase">
          {centerCard.tierWord}
        </h3>
        <p className="font-serif italic text-lg sm:text-xl font-light tracking-[0.14em] text-[#0B2540] uppercase">
          MEMBERSHIP
        </p>
      </div>

      {/* BOTTOM FLOATING ACTION / PILL BAR (Directly under Center Card, matching Reference Image) */}
      <div className="relative z-20 w-full max-w-4xl px-2 sm:px-4 mt-1 sm:mt-2">
        <div className="w-full bg-[#0A2540] rounded-xl sm:rounded-2xl shadow-xl overflow-hidden flex flex-col sm:flex-row items-center justify-between">
          
          {/* LEFT SEGMENT: Compare All Tiers with Toggle Switch */}
          <button
            onClick={handleCompareClick}
            className="flex items-center gap-3.5 px-5 sm:px-6 py-3.5 sm:py-4 text-left w-full sm:w-auto hover:bg-white/5 transition-colors cursor-pointer group"
          >
            {/* Pill Toggle Switch */}
            <div
              className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 flex items-center ${
                compareActive ? "bg-[#E39F25]" : "bg-white/30 group-hover:bg-white/40"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ${
                  compareActive ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </div>

            <span className="text-white text-xs sm:text-sm font-bold tracking-[0.16em] uppercase font-sans whitespace-nowrap">
              COMPARE ALL TIERS
            </span>
          </button>

          {/* CENTER SEGMENT: White Circular/Pill Cutout displaying the Active Tier Price */}
          <div className="bg-white px-6 sm:px-10 py-2.5 sm:py-3.5 flex items-center justify-center whitespace-nowrap min-w-[190px] border-y sm:border-y-0 sm:border-x border-neutral-100 shadow-sm">
            <AnimatePresence mode="wait">
              <motion.span
                key={centerCard.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18 }}
                className="text-base sm:text-lg md:text-xl font-serif font-bold text-[#0A2540] tracking-tight"
              >
                {centerCard.price} / {centerCard.period}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* RIGHT SEGMENT: Buy Membership CTA Button */}
          <a
            href={`/join?plan=${centerCard.id}`}
            className="w-full sm:w-auto flex items-center justify-between sm:justify-center gap-3 bg-[#D98A1D] hover:bg-[#C77C12] text-white px-6 sm:px-8 py-3.5 sm:py-4 transition-all duration-300 group cursor-pointer"
          >
            <span className="text-white text-xs sm:text-sm font-bold tracking-[0.16em] uppercase font-sans whitespace-nowrap">
              BUY {centerCard.tierWord} MEMBERSHIP
            </span>
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white flex items-center justify-center text-[#D98A1D] shadow-sm shrink-0 group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D98A1D]" strokeWidth={2.5} />
            </div>
          </a>

        </div>
      </div>

    </div>
  );
}
