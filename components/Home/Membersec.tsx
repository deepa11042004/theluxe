"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { CheckCircle2, ShieldCheck, Star } from "lucide-react";

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
    id: "platinum",
    title: "PLATINUM",
    tagline: "domestic",
    displayName: "Luxe Platinum",
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
        src="/Img/logo-emblem.png"
        alt="The Luxe Yatra Logo"
        fill
        className="object-contain p-0.5"
      />
    </div>
  );
}

export default function Membersec() {
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

      {/* SECTION 1: Club Elevate INFO */}
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
            CE
          </span>
        </div>

        <h2 className="text-sm font-[Vera] tracking-[0.3em] text-neutral-500 uppercase mb-3">
          Club Elevate
        </h2>
        <h3 className="text-3xl md:text-5xl font-[Vera] tracking-tight text-black mb-6">
          A World of Privileged Access
        </h3>

        <p className="text-neutral-600 font-light text-sm md:text-base max-w-3xl mx-auto leading-relaxed mb-16">
          Club Elevate unlocks privileged access to 140+ premium Club Mahindra
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
      <div className="relative z-10 bg-white text-black py-20 px-6 w-full border-t border-neutral-200/60">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl md:text-5xl font-[Vera] tracking-tight text-black mb-4 uppercase">
            Membership Types
          </h3>
          <p className="text-neutral-500 text-xs md:text-sm font-medium tracking-widest mb-14 uppercase">
            Select your preferred membership tier below to enter a world of seamless vacations
          </p>

          {/* Taj Epicure Membership Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-14">
            {MEMBERSHIPS.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="flex flex-col text-left group"
              >
                {/* 1. PHYSICAL MEMBERSHIP CARD */}
                <div
                  className={`relative w-full aspect-[1.55/1] rounded-[1.75rem] p-6 md:p-8 flex flex-col justify-between items-center text-center overflow-hidden shadow-2xl border border-white/10 group-hover:scale-[1.02] transition-transform duration-300 select-none ${card.cardBg}`}
                >
                  {/* Watermark Mandala Pattern in Top Right */}
                  <div className="absolute -top-10 -right-10 pointer-events-none opacity-35">
                    <MandalaPattern />
                  </div>

                  <div />

                  {/* Center Branding */}
                  <div className="relative z-10 flex flex-col items-center">
                    <LuxeLogoEmblem />
                    <h4 className="text-2xl md:text-3xl font-[Vera] tracking-[0.25em] font-bold text-[#E5C158] uppercase drop-shadow-sm">
                      {card.title}
                    </h4>
                  </div>

                  {/* Bottom Right Script Tagline */}
                  <div className="w-full flex justify-end relative z-10">
                    <span className="font-[serif] italic text-lg md:text-xl text-[#E5C158]/90 tracking-widest lowercase">
                      {card.tagline}
                    </span>
                  </div>
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
                    href="/clubelevate"
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
        </div>
      </div>
    </section>
  );
}
