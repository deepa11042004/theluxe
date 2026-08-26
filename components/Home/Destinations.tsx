"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// --- Types ---
interface SlideData {
  id: number;
  country: string;
  title: string;
  imageUrl: string;
  type: string;
}

// --- Mock Data ---
const slides: SlideData[] = [
  {
    id: 1,
    country: "Japan",
    title: "In the heart of Honshu",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1661964177687-57387c2cbd14?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "Individual trip",
  },
  {
    id: 2,
    country: "Tibet & China",
    title: "The roof of the world with the Sky Train",
    imageUrl:
      "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=1200&q=80",
    type: "Individual trip",
  },
  {
    id: 3,
    country: "Costa Rica",
    title: "The wild south of Costa Rica",
    imageUrl:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80",
    type: "Individual trip",
  },
  {
    id: 4,
    country: "Mexico",
    title: "Treasures of Mexico",
    imageUrl:
      "https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "Individual trip",
  },
  {
    id: 5,
    country: "Egypt",
    title: "Eternity along the Nile",
    imageUrl:
      "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=1200&q=80",
    type: "Group trip",
  },
  {
    id: 6,
    country: "Morocco",
    title: "From Atlas to Sahara",
    imageUrl:
      "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=1200&q=80",
    type: "Individual trip",
  },
  {
    id: 7,
    country: "Cape Verde",
    title: "Fogo & Santiago",
    imageUrl:
      "https://images.unsplash.com/photo-1542856391-010fb87dcfed?auto=format&fit=crop&w=1200&q=80",
    type: "Individual trip",
  },
  {
    id: 8,
    country: "India",
    title: "Taj Mahal & the Golden Temple",
    imageUrl:
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80",
    type: "Individual trip",
  },
  {
    id: 9,
    country: "India",
    title: "Royal Rajasthan & Palaces",
    imageUrl:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
    type: "Individual trip",
  },
  {
    id: 10,
    country: "India",
    title: "Green hills & backwaters of Kerala",
    imageUrl:
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80",
    type: "Individual trip",
  },
  {
    id: 11,
    country: "India",
    title: "Along the holy Ganges in Varanasi",
    imageUrl:
      "https://images.unsplash.com/photo-1627938823193-fd13c1c867dd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    type: "Group trip",
  },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-play timer
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000); // 5s interval for calm pacing
    return () => clearInterval(timer);
  }, [currentIndex]);

  // Handle resize for responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); // initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  const prevSlide = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  return (
    <section className="bg-white text-black py-10 md:py-24 px-4 overflow-hidden w-full select-none">
      <div className="max-w-7xl mx-auto">
        {/* 1. Header Block */}
        <div className="text-center flex flex-col items-center mb-4 md:mb-8">
          <motion.div className="inline-flex items-center gap-2 bg-[#B38E46] border border-[#B38E46] backdrop-blur-md rounded-full px-4 py-1.5 text-xs text-white font-medium tracking-wider uppercase mb-3 md:mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Explore 200+ Destinations
          </motion.div>
          <h2 className="text-4xl md:text-8xl tracking-tight text-black mb-2 md:mb-4">
            Popular Destinations
          </h2>
          <p className="text-sm md:text-lg max-w-xl leading-relaxed">
            From pristine beaches to snow-capped mountains, find your perfect
            getaway.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full h-[380px] md:h-[450px] bg-white overflow-hidden flex items-center justify-center">
          {/* Carousel Track */}
          <div className="relative w-full h-full max-w-400 flex items-center justify-center">
            {slides.map((slide, index) => {
              // Calculate distance from current index for circular carousel logic
              let distance = index - currentIndex;
              if (distance < -slides.length / 2) distance += slides.length;
              if (distance > slides.length / 2) distance -= slides.length;

              // Determine styles based on distance
              // We use 'distance' to determine scale, x-position, and z-index
              const isActive = distance === 0;

              // Visual configuration
              let scale = 0.7;
              let xOffset = 0;
              let zIndex = 10;
              let opacity = 0.5;

              // Config for responsive look
              const cardWidth = isMobile ? 300 : 500;
              const baseOffset = isMobile ? 180 : 320;
              const stepOffset = isMobile ? 100 : 240;

              if (isActive) {
                scale = 1;
                xOffset = 0;
                zIndex = 50;
                opacity = 1;
              } else if (Math.abs(distance) === 1) {
                scale = 0.88;
                xOffset = distance > 0 ? baseOffset : -baseOffset; 
                zIndex = 40;
                opacity = 1; 
              } else if (Math.abs(distance) === 2) {
                scale = 0.78;
                xOffset = distance > 0 ? baseOffset + stepOffset : -(baseOffset + stepOffset);
                zIndex = 30;
                opacity = 1; 
              } else if (Math.abs(distance) === 3) {
                scale = 0.68;
                xOffset = distance > 0 ? baseOffset + stepOffset * 1.7 : -(baseOffset + stepOffset * 1.7);
                zIndex = 20;
                opacity = 0.8; 
              } else {
                scale = 0.6;
                xOffset = distance > 0 ? baseOffset + stepOffset * 2.5 : -(baseOffset + stepOffset * 2.5);
                zIndex = 10;
                opacity = 0;
              }

              return (
                <motion.div
                  key={slide.id}
                  className="absolute top-1/2 left-1/2 rounded-sm overflow-hidden cursor-pointer shadow-xl bg-white"
                  style={{
                    zIndex,
                    width: isMobile ? "280px" : "500px",
                    height: isMobile ? "350px" : "400px",
                    marginLeft: isMobile ? "-140px" : "-250px",
                    marginTop: isMobile ? "-175px" : "-200px",
                  }}
                  animate={{
                    x: xOffset,
                    scale,
                    opacity,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 20,
                    mass: 1,
                  }}
                  onClick={() => {
                    // Click side slides to navigate
                    if (distance === 1) nextSlide();
                    if (distance === -1) prevSlide();
                  }}
                >
                  {/* Image Container - Clean, no brightness filter */}
                  <div className="relative w-full h-full">
                    <Image
                      src={
                        slide.imageUrl.startsWith("http")
                          ? slide.imageUrl
                          : `https://picsum.photos/seed/${slide.id}/1200/900`
                      }
                      alt={slide.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Content Overlay - Only fully visible on active slide */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 text-center bg-black/10">
                    {/* Text Content */}
                    <div
                      className={`transition-all duration-500 transform ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                    >
                      <p className="font-[Vera] italic text-lg mb-2 drop-shadow-md">
                        {slide.country}
                      </p>
                      <h2 className="text-3xl md:text-4xl leading-tight uppercase max-w-[80%] mx-auto drop-shadow-md">
                        {slide.title}
                      </h2>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Navigation Controls - Placed cleanly below the carousel */}
        <div className="flex justify-center gap-3 mt-4 md:mt-6 z-10">
          <motion.button
            onClick={prevSlide}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 bg-[#B38E46] text-white rounded-full flex items-center justify-center hover:bg-[#997734] shadow-md transition-colors cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </motion.button>
          <motion.button
            onClick={nextSlide}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 bg-[#B38E46] text-white rounded-full flex items-center justify-center hover:bg-[#997734] shadow-md transition-colors cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Carousel;
