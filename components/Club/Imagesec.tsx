"use client";

import React from "react";
import Image from "next/image";
import Heading from "@/components/Heading";
import { motion } from "framer-motion";

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

const MEMBERSHIPS = [
  {
    title: "PLATINUM",
    tagline: "domestic",
    cardBg: "bg-gradient-to-br from-[#0B2545] via-[#091F3A] to-[#041226] text-white",
  },
  {
    title: "DIAMOND",
    tagline: "worldwide",
    cardBg: "bg-gradient-to-br from-[#7F1D1D] via-[#6B1717] to-[#450A0A] text-white",
  },
  {
    title: "IMPERIAL",
    tagline: "lifetime",
    cardBg: "bg-gradient-to-br from-[#064E3B] via-[#043E2F] to-[#022C22] text-white",
  }
];

export default function Imagesec() {
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
            <h1 className="text-4xl sm:text-5xl md:text-[5rem] md:leading-tight font-[Vera] tracking-[0.1em] sm:tracking-[0.2em] text-neutral-900 uppercase drop-shadow-sm my-1 text-center">
              The Luxe Club
            </h1>
            <span className="text-[10px] sm:text-xs md:text-base font-[Vera] tracking-[0.2em] sm:tracking-[0.4em] text-neutral-500 uppercase mt-1 text-center">
              privileged access
            </span>
            <div className="w-20 md:w-28 h-[2px] bg-[#B38E46]/60 mt-5"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mx-auto px-4 drop-shadow-xl z-20">
            {MEMBERSHIPS.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="flex flex-col text-left group"
              >
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
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Subtle overlay gradient */}
        <div className="absolute inset-0 pointer-events-none bg-linear-to-b from-white/40 via-transparent to-neutral-100/80" />
      </main>
    </>
  );
}
