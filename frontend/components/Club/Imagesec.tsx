"use client";

import React, { useState } from "react";
import Image from "next/image";
import Heading from "@/components/Heading";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
        alt="Luxe Yatra Emblem"
        fill
        className="object-contain p-0.5"
      />
    </div>
  );
}

const MEMBERSHIPS = [
  {
    title: "LUXE SIGNATURE",
    tagline: "domestic",
    image: "/Img/card-domestic.jpg",
  },
  {
    title: "LUXE DIAMOND",
    tagline: "worldwide",
    image: "/Img/card-worldwide.jpg",
  },
  {
    title: "LUXE IMPERIAL",
    tagline: "lifetime",
    image: "/Img/card-lifetime.jpg",
  }
];

export default function Imagesec() {
  const [activeIndex, setActiveIndex] = useState(1);

  const getPosition = (idx: number) => {
    if (idx === activeIndex) return 'center';
    if (idx === (activeIndex - 1 + MEMBERSHIPS.length) % MEMBERSHIPS.length) return 'left';
    if (idx === (activeIndex + 1) % MEMBERSHIPS.length) return 'right';
    return 'hidden';
  };

  return (
    <>
      <main className="flex relative min-h-screen w-full flex-col items-center overflow-hidden select-none pb-12 md:pb-24"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #ffffff, #ffffff 20px, #f9f9f9 20px, #f9f9f9 40px)'
        }}
      >
        <div className="relative z-10 w-full max-w-6xl px-8 flex flex-col items-center pt-32 pb-12">
          <div className="text-center mb-16 flex flex-col items-center gap-2 z-10 relative">
            <span className="text-base md:text-xl font-serif italic text-[#B38E46] tracking-[0.3em] lowercase">
              launching
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-[5rem] md:leading-tight tracking-[0.1em] sm:tracking-[0.2em] text-neutral-900 uppercase drop-shadow-sm my-1 text-center">
              The Luxe Club
            </h1>
            <span className="text-[10px] sm:text-xs md:text-base font-[Vera] tracking-[0.2em] sm:tracking-[0.4em] text-black uppercase mt-1 text-center">
              privileged access
            </span>
            <div className="w-20 md:w-28 h-[2px] bg-[#B38E46]/60 mt-5"></div>
          </div>
          <div className="relative flex justify-center items-center w-full max-w-6xl mx-auto drop-shadow-xl z-20 pb-12 md:pb-8 md:grid md:grid-cols-3 md:gap-6 md:px-4">
            {MEMBERSHIPS.map((card, idx) => {
              const position = getPosition(idx);
              let mobileClasses = "";
              if (position === 'left') {
                mobileClasses = "absolute left-[-2%] sm:left-[5%] md:left-auto z-0 scale-[0.9] md:scale-100 opacity-100 origin-left md:origin-center cursor-pointer md:cursor-default";
              } else if (position === 'center') {
                mobileClasses = "relative z-10 scale-[1.05] md:scale-100 shadow-[0_20px_50px_rgba(0,0,0,0.5)] md:shadow-none";
              } else if (position === 'right') {
                mobileClasses = "absolute right-[-2%] sm:right-[5%] md:right-auto z-0 scale-[0.9] md:scale-100 opacity-100 origin-right md:origin-center cursor-pointer md:cursor-default";
              }

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  onClick={() => {
                    if (position === 'left') setActiveIndex((activeIndex - 1 + MEMBERSHIPS.length) % MEMBERSHIPS.length);
                    if (position === 'right') setActiveIndex((activeIndex + 1) % MEMBERSHIPS.length);
                  }}
                  className={`flex flex-col text-left group w-[65vw] sm:w-[350px] md:w-auto shrink-0 md:static transition-all duration-700 ${mobileClasses}`}
                >
                  <div className="relative w-full aspect-[1.55/1] rounded-[1rem] md:rounded-[1.75rem] overflow-hidden shadow-2xl border border-[#B38E46]/30 md:border-white/10 group-hover:scale-[1.02] transition-transform duration-300 select-none">
                    <Image
                      src={card.image}
                      alt={`${card.title} Membership Card`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          {/* Mobile Scroll Controls */}
          <div className="flex md:hidden justify-center items-center gap-4 mt-8 z-20 relative">
            <button onClick={() => setActiveIndex((activeIndex - 1 + MEMBERSHIPS.length) % MEMBERSHIPS.length)} className="p-3 rounded-full bg-white border border-[#B38E46]/30 shadow-sm text-[#B38E46] active:scale-95 transition-transform" aria-label="Scroll left">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={() => setActiveIndex((activeIndex + 1) % MEMBERSHIPS.length)} className="p-3 rounded-full bg-white border border-[#B38E46]/30 shadow-sm text-[#B38E46] active:scale-95 transition-transform" aria-label="Scroll right">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* Subtle overlay gradient */}
        <div className="absolute inset-0 pointer-events-none bg-linear-to-b from-white/40 via-transparent to-neutral-100/80" />
      </main>
    </>
  );
}
