"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { CheckCircle2, ShieldCheck, Star } from "lucide-react";

//  Benefit Data Types
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

// Membership Cards Data Types
const MEMBERSHIPS = [
  {
    title: "EBONY",
    subtitle: "Your year-round access to unforgettable family gateways",
    bgClass: "bg-black text-white border-neutral-800",
    lineColor: "#fff",
    benefits: [
      "7N/8D holidays every year across 52 weeks",
      "Complimentary breakfast for 2 per room per night, up to 10 years",
      "Priority access to signature experiences",
      "Access to international resorts",
    ],
  },
  {
    title: "IVORY",
    subtitle: "Experience destinations during the peak of their popularity",
    bgClass: "bg-[#EAE6DD] text-neutral-900 border-[#DCD7CD]",
    lineColor: "#000",
    benefits: [
      "7N/8D holidays every year across 46 weeks",
      "Complimentary breakfast for 2 per room per night, up to 10 years",
      "Priority access to signature experiences",
      "Access to international resorts",
    ],
  },
  {
    title: "JADE",
    subtitle: "Enjoy your favourite destinations during quieter seasons",
    bgClass: "bg-[#165B54] text-white border-[#1B6B63]",
    lineColor: "#fff",
    benefits: [
      "7N/8D holidays every year across 24 weeks",
      "Complimentary breakfast for 2 per room per night, up to 10 years",
      "Priority access to signature experiences",
      "Access to international resorts",
    ],
  },
];

export default function Membersec() {
  return (
    <section className="bg-black w-full overflow-hidden">
      {/* SECTION 1: Club Elevate INFO (BLACK, WHITE, & CYAN ACENTS) */}
      <div className="relative py-24 px-6 max-w-6xl mx-auto text-center z-10">
        {/* Subtle Decorative Abstract Lines Background */}
        <div className="absolute top-0 left-0 w-44 h-44 opacity-20 pointer-events-none select-none">
          <svg
            viewBox="0 0 100 100"
            className="stroke-neutral-700 fill-none stroke-[0.5]"
          >
            <path d="M0,0 Q30,70 100,100 M0,20 Q40,80 100,120 M0,40 Q50,90 100,140" />
          </svg>
        </div>

        {/* Central Brand Emblem */}
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-linear-to-tr from-neutral-900 to-neutral-800 border border-neutral-700/60 shadow-xl mb-6">
          <span className="text-white font-[Vera] text-xl tracking-wider">
            CE
          </span>
        </div>

        <h2 className="text-lg font-[Vera] tracking-[0.3em] text-white uppercase mb-3">
          Club Elevate
        </h2>
        <h3 className="text-3xl md:text-5xl font-[Vera] tracking-tight text-white mb-6">
          A World of Privileged Access
        </h3>

        <p className="text-neutral-300 font-medium text-sm md:text-base max-w-3xl mx-auto leading-relaxed mb-16">
          Club Elevate unlocks privileged access to 140+ premium Club Mahindra
          resorts, offering 7 nights/8 days holidays every year — filled with
          cherished family moments and thoughtfully crafted experiences across
          India and beyond. This membership programme is designed for modern
          families who seek simplicity, flexibility, and elevated holiday
          experiences.
        </p>

        {/* Open Grid Layout for Key Benefits (Box & Border Removed) */}
        <div className="max-w-4xl mx-auto">
          <h4 className="text-lg font-[Vera] tracking-[0.15em] text-cyan-400 uppercase text-center mb-8 flex items-center justify-center gap-2">
            <Star className="w-4 h-4 fill-cyan-400" /> Key Privileged Benefits
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            {BENEFITS.map((benefit, i) => (
              <div
                key={i}
                className="flex items-center gap-3.5 px-4 py-3 bg-neutral-900/40 rounded-xl border border-neutral-800/30 hover:border-cyan-500/30 transition duration-300"
              >
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0" />
                <span className="text-white text-sm font-medium tracking-wide">
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SECTION 2: MEMBERSHIP PLANS (3D TILT CARDS) */}
      <div className="bg-white text-black rounded-t-[2.5rem] py-24 px-6 w-full">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl md:text-6xl font-[Vera] tracking-tight text-black mb-5">
            Your Key to Unlock Privileged Experiences
          </h3>
          <p className="text-black text-xs md:text-lg font-medium tracking-wide mb-14 uppercase">
            Select from <span className="text-black font-bold">Ebony</span>,{" "}
            <span className="text-neutral-900 font-bold">Ivory</span>, and{" "}
            <span className="text-[#165B54] font-bold">Jade</span> Keys and
            enter a world of seamless vacations
          </p>

          {/* Cards Flex Grid Wrapper */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-14">
            {MEMBERSHIPS.map((card, idx) => (
              <TiltCard key={idx} card={card} />
            ))}
          </div>

          {/* Bottom Call To Action Button */}
          <button className="border-2 border-neutral-900 hover:bg-neutral-900 hover:text-white text-neutral-900 font-medium text-sm rounded-full px-10 py-3.5 transition duration-300 shadow-sm active:scale-95">
            Know More
          </button>
        </div>
      </div>
    </section>
  );
}

// SUB-COMPONENT: REUSABLE 3D MOUSE TILT CARD
function TiltCard({ card }: { card: (typeof MEMBERSHIPS)[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const element = cardRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    const rX = -(mouseY / height) * 16;
    const rY = (mouseX / width) * 16;

    rotateX.set(rX);
    rotateY.set(rY);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const transform = useMotionTemplate`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform }}
      className={`relative rounded-3xl p-8 border flex flex-col justify-between text-left transition-all duration-150 ease-out shadow-lg select-none overflow-hidden h-full min-h-115 ${card.bgClass}`}
    >
      {/* SVG Absolute Top-Right Background Grid Curve */}
      <div
        className="absolute top-0 right-0 w-60 h-40 pointer-events-none select-none opacity-40 z-0"
        style={{ color: card.lineColor }}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full stroke-current fill-none stroke-[0.75]"
        >
          <path d="M30,-20 Q80,20 130,40 M10,-20 Q70,30 130,60 M-10,-20 Q60,40 130,80 M-30,-20 Q50,50 130,100" />
        </svg>
      </div>

      <div className="relative z-10">
        <span className="text-xs uppercase font-semibold tracking-widest text-neutral-400 block mb-1">
          Key
        </span>
        <h4 className="text-3xl font-extrabold tracking-wide mb-4 font-sans">
          {card.title}
        </h4>
        <p className="text-sm opacity-80 leading-relaxed font-medium mb-6 border-b border-neutral-700/20 pb-6">
          {card.subtitle}
        </p>

        <h5 className="text-xs font-bold tracking-wider uppercase mb-4 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 opacity-70" /> Benefits:
        </h5>

        <ul className="space-y-3.5">
          {card.benefits.map((benefit, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 text-xs font-light leading-relaxed"
            >
              {/* Shifted item bullet indicator point to dynamic neutral/orange accents safely */}
              <span className="w-1.5 h-1.5 rounded-full bg-white mt-1.5 shrink-0" />
              <span className="text-sm font-medium">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
