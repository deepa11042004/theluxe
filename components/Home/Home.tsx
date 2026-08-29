"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const HERO_SLIDES = [
  "/Img/header 2/445a99f16f40b874cc5068c108eb7d3efd4fa931-3840x1860.avif",
  "/Img/header 2/4d462a421b67d073ef1d4078106ca83e9af224ca-3840x1860.avif",
  "/Img/header 2/4e2fe9454e29d2f75bfab08e9de77cb0bc8a20ae-2000x969.avif",
  "/Img/header 2/5c716b4078feb1e772b398f47f86da64ae5c54a3-3840x1860.avif",
  "/Img/header 2/7927e829f3d45717eac5abe9ae9eccac994a88ce-3840x1860.avif",
  "/Img/header 2/7fcd48dafbb85bea09f5acfb8311d784b09d070e-3841x1860.avif",
  "/Img/header 2/877bb3a6f86842b84f6eacaba06db3f751c6c6fb-3841x1860.avif",
  "/Img/header 2/a0b84b6b5a0b77021f49b1e81cf6864325436646-2880x1395.avif",
  "/Img/header 2/a3eff208889dfdf72b209b175ee730d732a92a43-3840x1860.avif",
  "/Img/header 2/dc19a1ab14ec796eee1a6784d8b968145cd6bb63-3840x1860.avif",
  "/Img/header 2/e2be19c1e420702c3f735d4cd31aae7d9303c7cf-3841x1860.avif",
  "/Img/header 2/eae5340e0b75390b80e23cb1c073764635f3d63d-3840x1860.avif",
  "/Img/header 2/f32290a51b43c82dc12551d6f25d2f6052c36f08-3840x1860.avif",
];

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
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <main className="relative min-h-screen w-full bg-white text-black overflow-hidden flex flex-col group">
      {/* 1. Background Image Slider */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none bg-white overflow-hidden">
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={slide}
              alt={`Luxury Resort Slide ${idx + 1}`}
              className="object-cover object-center w-full h-full"
            />
          </div>
        ))}
      </div>

      {/* 2. Slider Navigation Controls (Left/Right Buttons) */}
      <button
        onClick={handlePrev}
        className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 text-white/70 hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 cursor-pointer drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
        aria-label="Previous Hero Slide"
      >
        <ChevronLeft className="w-12 h-12 md:w-16 md:h-16" strokeWidth={1.5} />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 text-white/70 hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 cursor-pointer drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
        aria-label="Next Hero Slide"
      >
        <ChevronRight className="w-12 h-12 md:w-16 md:h-16" strokeWidth={1.5} />
      </button>

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
          className="text-5xl md:text-6xl lg:text-8xl font-[Vera] tracking-tight text-white max-w-4xl leading-tight md:leading-tightest drop-shadow-[0_4px_20px_rgba(0,0,0,0.85)]"
        >
          Discover Your Next <br className="hidden sm:block" />
          <span className="text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.85)]">
            Dream Vacation
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.div variants={itemVariants}>
          <p 
            className="inline-block bg-black/40 backdrop-blur-md rounded-sm text-[10px] md:text-[11px] px-8 py-4 md:px-12 md:py-4 mt-10 sm:mt-14 mb-8 sm:mb-12 tracking-[0.25em] uppercase font-medium shadow-lg border border-white/20"
            style={{ color: "white" }}
          >
            Explore luxury boutique resorts and tailored holiday experiences.
          </p>
        </motion.div>

        {/* Slider Indicator Dots */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-2 mt-10"
        >
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`rounded-full transition-all duration-500 cursor-pointer ${
                idx === currentSlide
                  ? "w-3 h-3 bg-[#B38E46] shadow-sm"
                  : "w-2 h-2 bg-black/30 hover:bg-black/60"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Safe buffer for clean alignment spacing */}
      <div className="w-full h-4 sm:h-8 z-10 shrink-0" />
    </main>
  );
}
