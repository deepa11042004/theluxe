"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Compass } from "lucide-react";

export default function Bannersec() {
  return (
    <section className="bg-black text-white min-h-screen w-full relative overflow-hidden flex items-center justify-center py-20 select-none">
      {/* BACKGROUND IMAGES */}

      {/* LEFT SIDE BACKGROUND GRAPHIC */}
      <div className="hidden lg:block absolute left-0 bottom-0 top-0 w-[45%] md:w-[40%] h-full pointer-events-none z-0 select-none opacity-50 mix-blend-screen">
        <Image
          src="/Img/splash-left.png"
          alt="Left thematic elements"
          fill
          sizes="40vw"
          className="object-cover"
        />
      </div>

      {/* RIGHT SIDE BACKGROUND GRAPHIC */}
      <div className="hidden lg:block absolute right-0 bottom-0 top-0 w-[45%] md:w-[40%] h-full pointer-events-none z-0 select-none opacity-50 mix-blend-screen">
        <Image
          src="/Img/splash-right.png"
          alt="Right thematic elements"
          fill
          sizes="40vw"
          className="object-cover"
        />
      </div>

      {/* CORE CONTENT BLOCK */}

      <div className="max-w-4xl mx-auto text-center px-6 md:px-12 z-10 relative flex flex-col items-center">
        {/* Animated Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileHover={{ rotate: 15, scale: 1.05 }}
          className="w-14 h-14 rounded-full bg-neutral-900 flex items-center justify-center text-white mb-6 border border-neutral-800 shadow-sm cursor-pointer"
        >
          <Compass className="w-7 h-7 stroke-[1.25] text-neutral-300" />
        </motion.div>

        {/* Micro Subheader */}
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[10px] md:text-lg font-[Vera] tracking-[0.4em] text-neutral-400 uppercase mb-4"
        >
          Your Dream Journey
        </motion.span>

        {/* Cinematic Main Title */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-8xl font-[Vera] text-white mb-8 tracking-wide leading-tighest max-w-3xl"
        >
          Prefer your own type of vacations
        </motion.h2>

        {/* Descriptive Body Copy */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-white text-sm sm:text-base md:text-lg font-medium tracking-wide max-w-2xl leading-relaxed mb-10"
        >
          Book a cruise, play hide &amp; seek with the sun at the seaside, get
          an experience of rough and tough adventures and feel the natural touch
          of wildlife. It&apos;s your holiday, make it a memorable and
          storyteller experience because your satisfaction matters.
        </motion.p>

        {/* Explore Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 bg-white text-black hover:bg-neutral-100 px-8 py-4 text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 rounded-full cursor-pointer"
          >
            Explore Vacations
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
