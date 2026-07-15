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
    <main className="relative min-h-screen w-full bg-neutral-950 text-white overflow-hidden flex flex-col">
      {/* 1. Background Image */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <Image
          src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=2000&q=80"
          alt="Luxury Vacation Background"
          fill
          priority
          quality={90}
          className="object-cover object-center brightness-[0.35]"
        />
        {/* Vignette & Bottom shading overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-neutral-950/40 via-transparent to-neutral-950" />
      </div>

      {/* 3. Hero Content Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 grow max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center pt-20 sm:pt-28 pb-8 sm:pb-12"
      >
        {/* Micro-Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 bg-black/60 backdrop-blur-md rounded-full px-3 py-1.5 sm:px-4 sm:py-1.5 text-[10px] text-white font-medium tracking-wider uppercase mb-4 sm:mb-6 border border-white/10"
        >
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="truncate">Explore 200+ Destinations</span>
        </motion.div>

        {/* Hero Headlines */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-6xl lg:text-8xl font-[Vera] tracking-tight text-white max-w-4xl leading-tight md:leading-tightest"
        >
          Discover Your Next <br className="hidden sm:block" />
          <span className="bg-linear-to-r from-cyan-400 via-white to-cyan-500 bg-clip-text text-transparent">
            Dream Vacation
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-sm md:text-lg lg:text-xl text-white/90 max-w-2xl font-medium mt-3 sm:mt-4 mb-6 sm:mb-10 leading-relaxed px-2"
        >
          Explore luxury boutique resorts and tailored holiday experiences.
        </motion.p>

        {/* 4. Capsule Booking Bar */}
        <motion.div
          variants={itemVariants}
          className="w-full bg-black/70 backdrop-blur-md p-1.5 sm:p-2 rounded-2xl sm:rounded-full shadow-2xl flex flex-col gap-2 max-w-5xl mx-auto border border-white/10"
        >
          {/* Desktop Row - Hidden on Mobile */}
          <div className="hidden md:flex items-center justify-between gap-1">
            {/* Destination Field */}
            <div className="flex items-center gap-3 px-4 py-2.5 flex-1 hover:bg-white/5 rounded-full transition group cursor-pointer min-w-0">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-white/80 shrink-0 group-hover:scale-110 transition-transform" />
              <div className="text-left w-full min-w-0">
                <span className="block text-[9px] sm:text-[10px] text-white/60 uppercase tracking-widest font-semibold">
                  Destination
                </span>
                <input
                  type="text"
                  placeholder="Where to?"
                  className="bg-transparent text-sm text-white placeholder-white/50 focus:outline-none w-full font-medium truncate"
                />
              </div>
            </div>

            <div className="h-6 w-px bg-white/20" />

            {/* Check-In Field */}
            <div className="flex items-center gap-3 px-4 py-2.5 flex-1 hover:bg-white/5 rounded-full transition group cursor-pointer min-w-0">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white/80 shrink-0" />
              <div className="text-left w-full min-w-0">
                <span className="block text-[9px] sm:text-[10px] text-white/60 uppercase tracking-widest font-semibold">
                  Check-In
                </span>
                <input
                  type="date"
                  className="bg-transparent text-sm text-white placeholder-white/50 focus:outline-none w-full font-medium cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-70 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                />
              </div>
            </div>

            <div className="h-6 w-px bg-white/20" />

            {/* Check-Out Field */}
            <div className="flex items-center gap-3 px-4 py-2.5 flex-1 hover:bg-white/5 rounded-full transition group cursor-pointer min-w-0">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white/80 shrink-0" />
              <div className="text-left w-full min-w-0">
                <span className="block text-[9px] sm:text-[10px] text-white/60 uppercase tracking-widest font-semibold">
                  Check-Out
                </span>
                <input
                  type="date"
                  className="bg-transparent text-sm text-white placeholder-white/50 focus:outline-none w-full font-medium cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-70 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                />
              </div>
            </div>

            <div className="h-6 w-px bg-white/20" />

            {/* Travelers Field */}
            <div className="flex items-center gap-3 px-4 py-2.5 flex-1 hover:bg-white/5 rounded-full transition group cursor-pointer min-w-0">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-white/80 shrink-0" />
              <div className="text-left w-full min-w-0">
                <span className="block text-[9px] sm:text-[10px] text-white/60 uppercase tracking-widest font-semibold">
                  Travelers
                </span>
                <select className="bg-transparent text-sm text-white focus:outline-none w-full font-medium appearance-none cursor-pointer [&>option]:bg-neutral-900">
                  <option value="1">1 Adult</option>
                  <option value="2">2 Adults</option>
                  <option value="4">Family (4+)</option>
                </select>
              </div>
            </div>

            {/* Action CTA Button */}
            <button className="ml-2 bg-white text-black font-semibold rounded-full px-5 sm:px-6 py-2.5 sm:py-3 flex items-center justify-center gap-2 transition duration-200 whitespace-nowrap shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] group shrink-0">
              <Search className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="text-sm sm:text-base">Search</span>
            </button>
          </div>

          {/* Mobile Stack - Visible on Mobile */}
          <div className="flex flex-col gap-2 md:hidden">
            {/* Destination */}
            <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl active:bg-white/10 transition cursor-pointer">
              <MapPin className="w-5 h-5 text-white/80 shrink-0" />
              <div className="text-left w-full min-w-0">
                <span className="block text-[10px] text-white/60 uppercase tracking-widest font-semibold">
                  Destination
                </span>
                <input
                  type="text"
                  placeholder="Where to?"
                  className="bg-transparent text-base text-white placeholder-white/50 focus:outline-none w-full font-medium"
                />
              </div>
            </div>

            {/* Dates Row */}
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl active:bg-white/10 transition cursor-pointer">
                <Calendar className="w-5 h-5 text-white/80 shrink-0" />
                <div className="text-left w-full min-w-0">
                  <span className="block text-[10px] text-white/60 uppercase tracking-widest font-semibold">
                    Check-In
                  </span>
                  <input
                    type="date"
                    className="bg-transparent text-base text-white placeholder-white/50 focus:outline-none w-full font-medium cursor-pointer"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl active:bg-white/10 transition cursor-pointer">
                <Calendar className="w-5 h-5 text-white/80 shrink-0" />
                <div className="text-left w-full min-w-0">
                  <span className="block text-[10px] text-white/60 uppercase tracking-widest font-semibold">
                    Check-Out
                  </span>
                  <input
                    type="date"
                    className="bg-transparent text-base text-white placeholder-white/50 focus:outline-none w-full font-medium cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Travelers + CTA Row */}
            <div className="flex gap-2">
              <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl active:bg-white/10 transition cursor-pointer flex-1 min-w-0">
                <Users className="w-5 h-5 text-white/80 shrink-0" />
                <div className="text-left w-full min-w-0">
                  <span className="block text-[10px] text-white/60 uppercase tracking-widest font-semibold">
                    Travelers
                  </span>
                  <select className="bg-transparent text-base text-white focus:outline-none w-full font-medium appearance-none cursor-pointer [&>option]:bg-neutral-900">
                    <option value="1">1 Adult</option>
                    <option value="2">2 Adults</option>
                    <option value="4">Family (4+)</option>
                  </select>
                </div>
              </div>
              <button className="bg-white text-black font-semibold rounded-xl px-4 py-3 flex items-center justify-center gap-2 transition duration-200 shadow-lg active:scale-[0.98] shrink-0">
                <Search className="w-4 h-4" />
                <span className="text-sm">Go</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* 5. Pill Filter Quick Shortcuts */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-6 sm:mt-8 px-2"
        >
          {[
            { icon: Flame, label: "Trending", color: "text-white" },
            { icon: Sparkles, label: "Luxury", color: "text-amber-400" },
            { icon: Percent, label: "Deals", color: "text-emerald-400" },
          ].map(({ icon: Icon, label, color }) => (
            <button
              key={label}
              className="flex items-center gap-1.5 sm:gap-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1.5 sm:px-4 sm:py-1.5 text-[10px] sm:text-xs text-white hover:bg-black/70 transition border border-white/10 active:scale-[0.98]"
            >
              <Icon className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${color}`} />
              <span className="truncate">{label}</span>
            </button>
          ))}
        </motion.div>
      </motion.div>

      {/* Safe buffer for clean alignment spacing */}
      <div className="w-full h-4 sm:h-8 z-10 shrink-0" />
    </main>
  );
}
