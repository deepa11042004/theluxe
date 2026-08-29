"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Bannersec() {
  return (
    <section className="bg-black text-white min-h-screen w-full relative overflow-hidden flex items-center justify-center py-20 select-none">
      {/* FULL BACKGROUND IMAGE */}
      <div className="absolute inset-0 pointer-events-none z-0 select-none">
        <Image
          src="/Img/rashni-parichha-GEKOliyPWPY-unsplash.jpg"
          alt="Thematic background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* CORE CONTENT BLOCK */}

      <div className="max-w-4xl mx-auto text-center px-6 md:px-12 z-10 relative flex flex-col items-center">
        {/* Micro Subheader */}
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-[10px] md:text-lg font-[Vera] tracking-[0.4em] text-white uppercase mb-4"
        >
          Your Dream Journey
        </motion.span>

        {/* Cinematic Main Title */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-3xl sm:text-5xl md:text-8xl font-[Vera] text-white mb-8 tracking-wide leading-tight max-w-3xl break-words w-full px-2"
        >
          Prefer your own type of vacations
        </motion.h2>

        {/* Descriptive Body Copy */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-white text-sm sm:text-base md:text-lg font-medium tracking-wide max-w-2xl leading-relaxed mb-10"
          style={{ color: "#ffffff" }}
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
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="border border-white bg-transparent text-white px-8 py-3.5 text-xs tracking-[0.25em] font-medium uppercase hover:bg-white hover:text-black transition-colors cursor-pointer rounded-md"
          >
            EXPLORE VACATIONS
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
