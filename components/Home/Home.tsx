"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import {
  MapPin,
  Calendar,
  Users,
  Search,
  Flame,
  Sparkles,
  Percent,
} from "lucide-react";

// Animation Variants for orchestrated fade-in
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-white text-black overflow-hidden flex flex-col">
      {/* 1. Background Image */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none bg-white">
        <Image
          src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=2000&q=80"
          alt="Luxury Vacation Background"
          fill
          priority
          quality={90}
          className="object-cover object-center opacity-80"
        />
        {/* Vignette & Bottom shading overlay */}
        <div className="absolute inset-0 bg-white/20" />
      </div>

      {/* 3. Hero Content Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 grow max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center pt-32 sm:pt-40 pb-8 sm:pb-12"
      >


        {/* Hero Headlines */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-6xl lg:text-8xl font-[Vera] tracking-tight text-black max-w-4xl leading-tight md:leading-tightest"
        >
          Discover Your Next <br className="hidden sm:block" />
          <span className="bg-linear-to-r from-cyan-500 via-cyan-700 to-cyan-500 bg-clip-text text-transparent">
            Dream Vacation
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-sm md:text-lg lg:text-xl text-black/80 max-w-2xl font-medium mt-3 sm:mt-4 mb-6 sm:mb-10 leading-relaxed px-2"
        >
          Explore luxury boutique resorts and tailored holiday experiences.
        </motion.p>



        {/* 5. Pill Filter Quick Shortcuts */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-6 sm:mt-8 px-2"
        >
          {[
            { icon: Flame, label: "Trending", color: "text-black" },
            { icon: Sparkles, label: "Luxury", color: "text-amber-600" },
            { icon: Percent, label: "Deals", color: "text-emerald-600" },
          ].map(({ icon: Icon, label, color }) => (
            <button
              key={label}
              className="flex items-center gap-1.5 sm:gap-2 bg-white/50 backdrop-blur-sm rounded-full px-3 py-1.5 sm:px-4 sm:py-1.5 text-[10px] sm:text-xs text-black hover:bg-white/80 transition border border-black/10 active:scale-[0.98]"
            >
              <Icon className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${color}`} />
              <span className="truncate font-medium">{label}</span>
            </button>
          ))}
        </motion.div>
      </motion.div>

      {/* Safe buffer for clean alignment spacing */}
      <div className="w-full h-4 sm:h-8 z-10 shrink-0" />
    </main>
  );
}
