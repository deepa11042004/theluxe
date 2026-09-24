"use client";

import React, { useState } from "react";
import Image from "next/image";

interface MembershipTier {
  id: string;
  title: string;
  price: string;
  image: string;
  themeColor: string;
}

const MEMBERSHIP_TIERS: MembershipTier[] = [
  {
    id: "luxe-signature",
    title: "LUXE SIGNATURE",
    price: "₹ 14,999/ Year",
    image: "/Img/luxe-signature.png",
    themeColor: "#4b0615",
  },
  {
    id: "luxe-prestige",
    title: "LUXE PRESTIGE",
    price: "₹ 24,999/ Year",
    image: "/Img/luxe-prestige.png",
    themeColor: "#051630",
  },
  {
    id: "luxe-black",
    title: "LUXE BLACK",
    price: "Limited Edition",
    image: "/Img/luxe-black.png",
    themeColor: "#111111",
  },
];

// Hyatt Dining Club custom curved arrow SVG
function HyattArrow({ color = "white", className = "w-5 h-4" }: { color?: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 28 18" fill="none">
      <path
        d="M27.6918 8.99999C22.6994 8.99999 18.6523 13.0294 18.6523 18"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M18.652 0C18.652 4.97056 22.6991 9 27.6914 9"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M27.6923 9L0 9"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Imagesec() {
  // Default to index 1 (SILVER) matching the reference image exactly
  const [activeIndex, setActiveIndex] = useState(1);

  const prevIndex = (activeIndex - 1 + MEMBERSHIP_TIERS.length) % MEMBERSHIP_TIERS.length;
  const nextIndex = (activeIndex + 1) % MEMBERSHIP_TIERS.length;

  const currentTier = MEMBERSHIP_TIERS[activeIndex];

  const handlePrev = () => {
    setActiveIndex(prevIndex);
  };

  const handleNext = () => {
    setActiveIndex(nextIndex);
  };

  return (
    <section className="relative w-full bg-white flex flex-col items-center justify-center overflow-hidden pt-12 sm:pt-16 md:pt-20 pb-16 md:pb-24 select-none">
      {/* Main Stage Container with Exact Proportions */}
      <div className="relative w-full max-w-[1040px] h-[500px] sm:h-[530px] md:h-[560px] mx-auto px-4">
        
        {/* SVG Continuous Path: Top Vertical Lines + Smooth Deep Circular Arc */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <svg
            viewBox="0 0 1000 500"
            className="w-full h-full"
            fill="none"
            preserveAspectRatio="none"
          >
            {/* Left Vertical Line Hanging to Card */}
            <line
              x1="181"
              y1="0"
              x2="181"
              y2="95"
              stroke="#101010"
              strokeWidth="1.5"
            />

            {/* Right Vertical Line Hanging to Card */}
            <line
              x1="819"
              y1="0"
              x2="819"
              y2="95"
              stroke="#101010"
              strokeWidth="1.5"
            />

            {/* Deep Circular Arc Connecting Cards (Passing behind center card) */}
            <path
              d="M 181 95 A 330 330 0 0 0 819 95"
              stroke="#101010"
              strokeWidth="1.5"
            />
          </svg>
        </div>

        {/* Left Circular Arrow Button (On Arc Between Left & Center Card) */}
        <button
          onClick={handlePrev}
          aria-label="Previous Membership Tier"
          className="absolute z-30 left-[23.3%] top-[43.5%] -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-[#cb5e51] hover:bg-[#b84d41] shadow-md flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        >
          {/* Arrow pointing up-left along arc trajectory (-125deg) */}
          <div className="-rotate-[125deg] flex items-center justify-center">
            <HyattArrow color="#ffffff" className="w-5 h-4 sm:w-6 sm:h-4.5" />
          </div>
        </button>

        {/* Right Circular Arrow Button (On Arc Between Center & Right Card) */}
        <button
          onClick={handleNext}
          aria-label="Next Membership Tier"
          className="absolute z-30 left-[76.7%] top-[43.5%] -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-full bg-[#cb5e51] hover:bg-[#b84d41] shadow-md flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        >
          {/* Arrow pointing up-right along arc trajectory (-45deg) */}
          <div className="-rotate-[45deg] flex items-center justify-center">
            <HyattArrow color="#ffffff" className="w-5 h-4 sm:w-6 sm:h-4.5" />
          </div>
        </button>

        {/* Right Typography (SILVER MEMBERSHIP) */}
        <div className="absolute left-[70%] md:left-[73%] top-[65%] -translate-y-1/2 text-left z-10 pointer-events-none">
          <h2 className="flex flex-col text-[#004564]">
            <span className="text-lg sm:text-xl md:text-[22px] font-sans font-normal tracking-[0.15em] uppercase leading-none">
              {currentTier.title}
            </span>
            <span className="text-lg sm:text-xl md:text-[22px] font-serif italic tracking-[0.05em] uppercase mt-2.5 leading-none">
              MEMBERSHIP
            </span>
          </h2>
        </div>

        {/* Left Side Card */}
        <div
          onClick={handlePrev}
          className="absolute left-[18.1%] top-[22%] -translate-x-1/2 -translate-y-1/2 w-[170px] sm:w-[200px] md:w-[230px] aspect-[1.65/1] z-10 cursor-pointer transition-all duration-700 ease-out hover:opacity-95"
          title={`Switch to ${MEMBERSHIP_TIERS[prevIndex].title}`}
        >
          <div className="relative w-full h-full">
            <Image
              src={MEMBERSHIP_TIERS[prevIndex].image}
              alt={`${MEMBERSHIP_TIERS[prevIndex].title} Membership Card`}
              fill
              sizes="(max-width: 768px) 225px, 255px"
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Right Side Card */}
        <div
          onClick={handleNext}
          className="absolute left-[81.9%] top-[22%] -translate-x-1/2 -translate-y-1/2 w-[170px] sm:w-[200px] md:w-[230px] aspect-[1.65/1] z-10 cursor-pointer transition-all duration-700 ease-out hover:opacity-95"
          title={`Switch to ${MEMBERSHIP_TIERS[nextIndex].title}`}
        >
          <div className="relative w-full h-full">
            <Image
              src={MEMBERSHIP_TIERS[nextIndex].image}
              alt={`${MEMBERSHIP_TIERS[nextIndex].title} Membership Card`}
              fill
              sizes="(max-width: 768px) 225px, 255px"
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Center Active Card (Front & Center, z-20) */}
        <div className="absolute left-1/2 top-[53%] -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[320px] md:w-[380px] aspect-[1.65/1] z-20 transition-all duration-700 ease-out pointer-events-auto">
          <div className="relative w-full h-full drop-shadow-[0px_15px_30px_rgba(0,0,0,0.3)]">
            <Image
              src={currentTier.image}
              alt={`${currentTier.title} Membership Card`}
              fill
              sizes="(max-width: 768px) 380px, 435px"
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* White Price Bubble / Disc (Behind Center Card, Sits Above & Inside Bottom Bar) */}
        <div className="absolute left-1/2 top-[88%] -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] sm:w-[135px] sm:h-[135px] md:w-[155px] md:h-[155px] bg-[#f8f8f8] md:bg-white rounded-full z-15 shadow-[0px_0px_40px_rgba(0,0,0,0.15)] flex items-center justify-center pointer-events-none">
          <span className="text-[#004564] font-semibold text-sm sm:text-base md:text-[17px] text-center px-2 tracking-tight leading-tight">
            {currentTier.price}
          </span>
        </div>

        {/* Bottom Pill Bar */}
        <div className="absolute left-1/2 top-[88%] -translate-x-1/2 -translate-y-1/2 w-[94%] max-w-[860px] h-[54px] md:h-[58px] z-10 flex rounded-l-[20px] rounded-r-[20px] overflow-hidden shadow-md">
          {/* Left Half: Compare All Tiers */}
          <div className="w-1/2 bg-[#004564] flex items-center justify-start pl-4 sm:pl-7 md:pl-10 text-white gap-3 cursor-pointer">
            {/* Toggle Switch */}
            <div className="w-12 h-6 md:w-13 md:h-7 bg-[#E5E5E5] rounded-full p-1 flex items-center shrink-0">
              <div className="w-4 h-4 md:w-5 md:h-5 bg-[#7E8B93] rounded-full shadow-sm"></div>
            </div>
            <span className="font-semibold text-xs sm:text-sm md:text-[14px] tracking-wider uppercase whitespace-nowrap">
              COMPARE ALL TIERS
            </span>
          </div>

          {/* Right Half: Buy Plan */}
          <div
            className="w-1/2 flex items-center justify-end pr-4 sm:pr-7 md:pr-10 text-white gap-2.5 sm:gap-3 cursor-pointer transition-colors duration-500"
            style={{ backgroundColor: currentTier.themeColor }}
          >
            <span className="font-semibold text-xs sm:text-sm md:text-[14px] tracking-wider uppercase whitespace-nowrap">
              BUY {currentTier.title} MEMBERSHIP
            </span>
            <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
              <HyattArrow color={currentTier.themeColor} className="w-3.5 h-3 md:w-4 md:h-3.5" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
