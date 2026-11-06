"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

// Shared layout of the member sign-in, forgot-password and set-password pages.
export default function AuthShell({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row relative overflow-x-hidden font-sans">
      <Image
        src="https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=85"
        alt="Travel Destination Background"
        fill
        priority
        className="object-cover -z-10"
      />
      <div className="absolute inset-0 bg-black/35 -z-10" />

      <Link
        href="/"
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium transition-all group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        <span>Back to Home</span>
      </Link>

      <div className="flex-1 flex flex-col justify-center px-6 pt-28 pb-8 md:py-8 md:px-20 text-white z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="max-w-xl">
          <p className="text-xl md:text-2xl font-bold tracking-widest uppercase mb-4 md:mb-8">The Luxe Yatra TRAVELS</p>
          <h1 className="text-3xl md:text-6xl lg:text-7xl tracking-wide uppercase leading-[1.05] mb-4 md:mb-6">
            Explore <br />
            Horizons
          </h1>
          <p className="text-base md:text-2xl text-white/90 mb-2 md:mb-4 leading-snug">Where Your Dream Destinations Become Reality.</p>
          <p className="text-xs md:text-base text-white/70 max-w-md leading-relaxed">Embark on a journey where every corner of the world is within your reach.</p>
        </motion.div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-8 md:p-20 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl md:rounded-[2.5rem] border border-white/20 p-6 md:p-12 shadow-2xl flex flex-col"
        >
          <h2 className="text-white text-lg md:text-xl font-semibold tracking-wide uppercase">{title}</h2>
          {subtitle && <p className="text-white/75 text-sm mt-1.5 mb-6 leading-relaxed">{subtitle}</p>}
          {!subtitle && <div className="mb-6" />}
          {children}
        </motion.div>
      </div>
    </div>
  );
}

export const authInputClass =
  "w-full bg-white rounded-xl px-4 py-3.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm shadow-sm transition-all border border-transparent font-medium";

export const authButtonClass =
  "w-full mt-8 border border-[#E39F25] bg-[#E39F25] hover:bg-[#430021] active:scale-[0.98] text-white py-3.5 rounded-sm font-medium tracking-[0.25em] text-xs sm:text-sm transition-all uppercase shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed";
