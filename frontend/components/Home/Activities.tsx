"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface ActivitiesProps {
  isSlider?: boolean;
}

const ALL_PILLARS = [
  {
    id: 1,
    title: "Curated Luxury Hotels",
    tag: "5-Star & Premium Collection",
    description:
      "Access to an extensive collection of 5-star, luxury and premium properties.",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Preferred Member Privileges",
    tag: "Exclusive Member Rates",
    description:
      "Exclusive rates, offers and benefits available to eligible members.",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Worldwide Travel Access",
    tag: "India & International Stays",
    description:
      "Discover exceptional stays and experiences across India and international destinations.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Personalised Concierge",
    tag: "Dedicated 24/7 Assistance",
    description:
      "Dedicated assistance for hotel bookings, travel planning and special requests.",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "Luxury Experiences",
    tag: "Wellness & Lifestyle",
    description:
      "Dining, cruises, wellness, lifestyle and handpicked travel experiences.",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    title: "One Membership. Endless Journeys.",
    tag: "Tailored Membership",
    description:
      "A premium travel membership designed around the way you love to travel.",
    image:
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80",
  },
];

// 6 Luxury-Focused Pillars data matching image 1, organized in 4 staggered columns matching image 3 layout
const PILLARS_COLUMNS = [
  // Column 1 (2 cards: medium aspect)
  [
    ALL_PILLARS[0],
    ALL_PILLARS[4],
  ],
  // Column 2 (1 tall portrait card)
  [
    ALL_PILLARS[1],
  ],
  // Column 3 (2 cards: medium aspect)
  [
    ALL_PILLARS[2],
    ALL_PILLARS[5],
  ],
  // Column 4 (1 tall portrait card)
  [
    ALL_PILLARS[3],
  ],
];

// Animation presets
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 18 },
  },
};

export default function Activities({ isSlider = false }: ActivitiesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) setItemsPerPage(4);
      else if (window.innerWidth >= 1024) setItemsPerPage(3);
      else if (window.innerWidth >= 640) setItemsPerPage(2);
      else setItemsPerPage(1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, ALL_PILLARS.length - itemsPerPage);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex >= maxIndex;

  const handlePrev = () => {
    if (!isFirst) setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (!isLast) setCurrentIndex((prev) => prev + 1);
  };

  return (
    <section className="bg-white text-black py-16 md:py-24 px-4 sm:px-6 lg:px-8 w-full overflow-hidden select-none">
      <div className="max-w-[1700px] mx-auto">
        {/* 1. Header Block */}
        <div className="text-center flex flex-col items-center mb-14 md:mb-20">
          <div className="text-sm tracking-[0.4em] text-black uppercase font-light mb-6">
            EXPLORE 200+ EXPERIENCES
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl tracking-tight text-neutral-900 mb-5 max-w-3xl font-serif">
            Good Reasons to Choose Us
          </h2>

          <p className="text-sm md:text-base max-w-2xl leading-relaxed text-neutral-600 font-light">
            We believe in responsible tourism and are committed to sustainable
            travel practices. Our partnerships with eco-friendly resorts ensure
            your luxury holiday positively impacts destinations.
          </p>
        </div>

        {isSlider ? (
          /* SINGLE ROW CAROUSEL / SLIDER LAYOUT */
          <div className="w-full relative flex flex-col items-center">
            {/* Track Viewport */}
            <div className="w-full overflow-hidden relative">
              <motion.div
                animate={{
                  x: `-${currentIndex * (100 / itemsPerPage)}%`,
                }}
                transition={{ type: "spring", stiffness: 140, damping: 20 }}
                className="flex items-stretch gap-6 w-full"
              >
                {ALL_PILLARS.map((pillar) => (
                  <div
                    key={pillar.id}
                    className="shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)] flex flex-col bg-white border border-neutral-200/80 shadow-xs hover:shadow-xl transition-all duration-400 overflow-hidden cursor-pointer group"
                  >
                    {/* Top Image Frame */}
                    <div className="relative w-full aspect-[4/3] overflow-hidden shrink-0 bg-neutral-100">
                      <Image
                        src={pillar.image}
                        alt={pillar.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </div>

                    {/* Bottom Content Box */}
                    <div className="p-5 sm:p-6 bg-white flex flex-col justify-between flex-1 text-left">
                      <div>
                        <h3
                          className="text-lg sm:text-xl font-medium text-neutral-900 leading-snug mb-1"
                          style={{ fontFamily: "var(--work-font), sans-serif" }}
                        >
                          {pillar.title}
                        </h3>
                        <p className="text-[10px] sm:text-xs font-semibold tracking-widest text-[#B38E46] uppercase mb-2">
                          {pillar.tag}
                        </p>
                        <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                          {pillar.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Carousel Control Arrows & Dots */}
            <div className="flex items-center justify-center gap-6 mt-10">
              <button
                onClick={handlePrev}
                disabled={isFirst}
                className="text-[#B38E46] hover:text-[#997734] transition-all hover:scale-110 disabled:opacity-30 cursor-pointer drop-shadow-md"
                aria-label="Previous cards"
              >
                <ChevronLeft className="w-10 h-10 md:w-12 md:h-12" strokeWidth={1.2} />
              </button>

              {/* Standardized Dot Indicators */}
              <div className="flex items-center justify-center gap-3">
                {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className="focus:outline-none cursor-pointer p-1"
                    aria-label={`Go to slide ${i + 1}`}
                  >
                    <div
                      className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                        i === currentIndex
                          ? "bg-black scale-125"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                    />
                  </button>
                ))}
              </div>

              <button
                onClick={handleNext}
                disabled={isLast}
                className="text-[#B38E46] hover:text-[#997734] transition-all hover:scale-110 disabled:opacity-30 cursor-pointer drop-shadow-md"
                aria-label="Next cards"
              >
                <ChevronRight className="w-10 h-10 md:w-12 md:h-12" strokeWidth={1.2} />
              </button>
            </div>
          </div>
        ) : (
          /* 2. Staggered 4-Column Bento Layout (Default Grid) */
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start"
          >
            {PILLARS_COLUMNS.map((column, colIdx) => (
              <div key={colIdx} className="flex flex-col gap-6 w-full">
                {column.map((pillar: any) => (
                  <motion.div
                    key={pillar.id}
                    variants={itemVariants}
                    whileHover={{ y: -4 }}
                    className="group flex flex-col bg-white rounded-none border border-neutral-200/80 shadow-xs hover:shadow-xl transition-all duration-400 overflow-hidden cursor-pointer"
                  >
                    {/* Top Image Frame */}
                    <div className={`relative w-full ${pillar.aspect || "aspect-[4/3]"} overflow-hidden shrink-0 bg-neutral-100`}>
                      <Image
                        src={pillar.image}
                        alt={pillar.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>

                    {/* Bottom Content Box */}
                    <div className="p-5 sm:p-6 bg-white flex flex-col justify-between flex-1">
                      <div>
                        <h3
                          className="text-lg sm:text-xl font-medium text-neutral-900 leading-snug mb-1"
                          style={{ fontFamily: "var(--work-font), sans-serif" }}
                        >
                          {pillar.title}
                        </h3>
                        <p className="text-[10px] sm:text-xs font-semibold tracking-widest text-[#B38E46] uppercase mb-2">
                          {pillar.tag}
                        </p>
                        <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                          {pillar.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
