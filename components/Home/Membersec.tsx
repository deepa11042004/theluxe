"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { CheckCircle2, ShieldCheck, Star, ChevronLeft, ChevronRight } from "lucide-react";

// Benefit Data Types
const BENEFITS = [
  "7N/8D holidays every year",
  "Large premium rooms",
  "Future-proof pricing",
  "24/7 concierge support",
  "Access to international resorts",
  "Crafted experiences",
  "Complimentary breakfast",
  "Easy exit, no questions asked",
];

// Membership Cards Data Types (Taj Epicure Inspired Luxury Membership Passes)
const MEMBERSHIPS = [
  {
    id: "signature",
    title: "SIGNATURE",
    tagline: "domestic",
    image: "/Img/card-domestic.jpg",
    displayName: "Luxe Signature",
    price: "₹ 12,999",
    taxText: "plus taxes",
    cardBg: "bg-gradient-to-br from-[#0B2545] via-[#091F3A] to-[#041226] text-white",
    watermarkColor: "#60A5FA",
    subtitle: "7N/8D domestic holidays every year across 46 weeks",
    benefits: [
      "7N/8D domestic holidays every year across 46 weeks",
      "Complimentary breakfast for 2 per room per night, up to 10 years",
      "Priority access to signature domestic resorts",
      "Dedicated member concierge support",
    ],
  },
  {
    id: "diamond",
    title: "DIAMOND",
    tagline: "worldwide",
    image: "/Img/card-worldwide.jpg",
    displayName: "Luxe Diamond",
    price: "₹ 19,999",
    taxText: "plus taxes",
    cardBg: "bg-gradient-to-br from-[#7F1D1D] via-[#6B1717] to-[#450A0A] text-white",
    watermarkColor: "#F87171",
    subtitle: "7N/8D worldwide holidays every year across 52 weeks",
    benefits: [
      "7N/8D worldwide holidays every year across 52 weeks",
      "Complimentary breakfast for 2 per room per night, up to 10 years",
      "Priority access to global signature experiences",
      "Access to 140+ international & domestic resorts",
    ],
  },
  {
    id: "imperial",
    title: "IMPERIAL",
    tagline: "lifetime",
    image: "/Img/card-lifetime.jpg",
    displayName: "Luxe Imperial",
    price: "₹ 49,999",
    taxText: "one-time lifetime",
    cardBg: "bg-gradient-to-br from-[#064E3B] via-[#043E2F] to-[#022C22] text-white",
    watermarkColor: "#34D399",
    subtitle: "Lifetime unlimited global access & VIP privileges",
    benefits: [
      "Lifetime unlimited global & domestic access",
      "Complimentary breakfast for 2 per room per night, up to 10 years",
      "Maximum savings, VIP upgrades & dedicated concierge",
      "Access to all 140+ luxury hotel & resort networks",
    ],
  },
];

function MandalaPattern() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="w-72 h-72 stroke-[#E5C158]/70 fill-none stroke-[1.2] pointer-events-none"
    >
      <circle cx="100" cy="100" r="85" />
      <circle cx="100" cy="100" r="65" />
      <circle cx="100" cy="100" r="45" />
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
        <g key={deg} transform={`rotate(${deg} 100 100)`}>
          <ellipse cx="100" cy="55" rx="14" ry="32" />
          <polygon points="100,15 108,35 100,55 92,35" />
        </g>
      ))}
    </svg>
  );
}

function LuxeLogoEmblem() {
  return (
    <div className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-3 relative flex items-center justify-center rounded-full bg-white p-1 shadow-md border border-[#E5C158]/50">
      <Image
        src="/Img/logo-emblem-v3.png"
        alt="Luxe Yatra Logo"
        fill
        className="object-contain p-0.5"
      />
    </div>
  );
}

export default function Membersec() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.85;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-[#8ce6ff] w-full overflow-hidden text-neutral-900 border-t border-neutral-200/60">
      {/* Vertical Pinstripe Lining Background Layer with #94f7ff */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-100"
        style={{
          backgroundImage: "linear-gradient(to right, #94f7ff 1px, transparent 1px)",
          backgroundSize: "8px 100%",
        }}
      />

      {/* SECTION 1: Luxe Club INFO */}
      <div className="relative py-20 px-6 max-w-6xl mx-auto text-center z-10">
        {/* Subtle Decorative Abstract Lines Background */}
        <div className="absolute top-0 left-0 w-44 h-44 opacity-30 pointer-events-none select-none">
          <svg
            viewBox="0 0 100 100"
            className="stroke-neutral-300 fill-none stroke-[0.5]"
          >
            <path d="M0,0 Q30,70 100,100 M0,20 Q40,80 100,120 M0,40 Q50,90 100,140" />
          </svg>
        </div>

        {/* Central Brand Emblem */}
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white border border-neutral-200 shadow-md mb-6">
          <span className="text-black font-[Vera] text-xl tracking-wider font-bold">
            LC
          </span>
        </div>

        <h2 className="text-sm font-[Vera] tracking-[0.3em] text-neutral-500 uppercase mb-3">
          Luxe Club
        </h2>
        <h3 className="text-3xl md:text-5xl font-[Vera] tracking-tight text-black mb-6">
          A World of Privileged Access
        </h3>

        <p className="text-neutral-600 font-light text-sm md:text-base max-w-3xl mx-auto leading-relaxed mb-16">
          Luxe Club unlocks privileged access to 140+ premium Club Mahindra
          resorts, offering 7 nights/8 days holidays every year — filled with
          cherished family moments and thoughtfully crafted experiences across
          India and beyond. This membership programme is designed for modern
          families who seek simplicity, flexibility, and elevated holiday
          experiences.
        </p>

        {/* Open Grid Layout for Key Benefits */}
        <div className="max-w-4xl mx-auto">
          <h4 className="text-base font-[Vera] tracking-[0.15em] text-[#B38E46] uppercase text-center mb-8 flex items-center justify-center gap-2">
            <Star className="w-4 h-4 fill-[#B38E46] text-[#B38E46]" /> Key Privileged Benefits
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            {BENEFITS.map((benefit, i) => (
              <div
                key={i}
                className="flex items-center gap-3.5 px-5 py-3.5 bg-white rounded-xl border border-neutral-200/80 shadow-xs hover:border-[#B38E46]/50 transition duration-300"
              >
                <CheckCircle2 className="w-5 h-5 text-[#B38E46] shrink-0" />
                <span className="text-neutral-900 text-sm font-[Vera] font-light tracking-wide">
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 2: MEMBERSHIP TYPES & CARDS (TAJ EPICURE STYLE) */}
      <div className="relative z-10 bg-white text-black py-12 md:py-16 px-6 w-full border-t border-neutral-200/60">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl md:text-5xl font-[Vera] tracking-tight text-black mb-4 uppercase">
            Membership Types
          </h3>
          <p className="text-neutral-500 text-xs md:text-sm font-medium tracking-widest mb-8 md:mb-10 uppercase">
            Select your preferred membership tier below to enter a world of seamless vacations
          </p>

          {/* Taj Epicure Membership Card Grid */}
          <div ref={scrollRef} className="flex md:grid md:grid-cols-3 overflow-x-auto snap-x snap-mandatory gap-6 md:gap-8 items-start mb-6 md:mb-8 pb-4 md:pb-8 px-2 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {MEMBERSHIPS.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="flex flex-col text-left group w-[80vw] max-w-[320px] sm:max-w-none sm:w-[400px] md:w-auto shrink-0 snap-center"
              >
                {/* 1. PHYSICAL MEMBERSHIP CARD */}
                <div className="relative w-full aspect-[1.55/1] rounded-[1rem] md:rounded-[1.75rem] overflow-hidden shadow-2xl group-hover:scale-[1.02] transition-transform duration-300 select-none border border-neutral-200/50">
                  <Image
                    src={card.image}
                    alt={`${card.displayName} Membership Card`}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* 2. CARD DETAILS & ENROL BUTTON BELOW */}
                <div className="mt-5 flex items-start justify-between gap-4 px-1">
                  <div>
                    <h4 className="text-lg font-bold text-neutral-900 tracking-tight font-[Vera]">
                      {card.displayName}
                    </h4>
                    <div className="flex items-baseline gap-1.5 mt-1">
                      <span className="text-xl font-extrabold font-[Vera] text-neutral-900">
                        {card.price}
                      </span>
                      <span className="text-xs text-neutral-500 font-medium">
                        {card.taxText}
                      </span>
                    </div>
                  </div>

                  <a
                    href="/luxeclub"
                    className="bg-[#B38E46] hover:bg-[#997734] active:scale-95 text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-sm transition duration-200 shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    ENROL NOW
                  </a>
                </div>

                {/* 3. INCLUDED BENEFITS LIST BELOW CARD */}
                <div className="mt-4 pt-4 border-t border-neutral-100 px-1">
                  <ul className="space-y-3">
                    {card.benefits.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5 text-sm font-[Vera] font-light text-neutral-600 tracking-wide leading-snug">
                        <CheckCircle2 className="w-4 h-4 text-[#B38E46] shrink-0 mt-[2px]" />
                        <span className="font-[Vera] font-light">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Scroll Controls */}
          <div className="flex md:hidden justify-center items-center gap-4 mt-2 z-20 relative">
            <button onClick={() => scroll('left')} className="p-3 rounded-full bg-white border border-[#B38E46]/30 shadow-sm text-[#B38E46] active:scale-95 transition-transform" aria-label="Scroll left">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => scroll('right')} className="p-3 rounded-full bg-white border border-[#B38E46]/30 shadow-sm text-[#B38E46] active:scale-95 transition-transform" aria-label="Scroll right">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
