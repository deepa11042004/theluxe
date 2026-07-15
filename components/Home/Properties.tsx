"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

const destinations = [
  {
    id: 1,
    name: "Lucknow",
    image:
      "https://images.unsplash.com/photo-1659202313780-1d8c8beea7d3?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    name: "Agra",
    image:
      "https://images.unsplash.com/photo-1724947053227-2335bf21d0ae?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    name: "Rishikesh",
    image:
      "https://images.unsplash.com/photo-1650341259809-9314b0de9268?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    name: "Jim Corbett",
    image:
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=600&q=85",
  },
  {
    id: 5,
    name: "Nanital",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=85",
  },
  {
    id: 6,
    name: "Bhimtal",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=85",
  },
];

// Gap between cards in px — keep in sync with the gap-3 class (12px)
const GAP = 12;

function useVisibleCount() {
  const [count, setCount] = useState(4);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setCount(1);
      else if (w < 1024) setCount(2);
      else if (w < 1280) setCount(3);
      else setCount(4);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return count;
}

export default function Properties() {
  const [offset, setOffset] = useState(0);
  const visibleCount = useVisibleCount();
  const maxOffset = Math.max(0, destinations.length - visibleCount);

  // Clamp offset when screen resizes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOffset((o) => Math.min(o, maxOffset));
  }, [maxOffset]);

  const prev = () => setOffset((o) => Math.max(0, o - 1));
  const next = () => setOffset((o) => Math.min(maxOffset, o + 1));

  return (
    <section className="w-full min-h-screen bg-white flex items-center py-16 md:py-24">
      <div className="w-full max-w-7xl mx-auto px-6 flex flex-col items-center">
        {/* Header */}
        <div className="text-center flex flex-col items-center mb-10 md:mb-16">
          <div className="inline-flex items-center gap-2 bg-neutral-900 border border-neutral-800/80 rounded-full px-4 py-1.5 text-xs text-white font-medium tracking-wider uppercase mb-6">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Explore 200+ Resorts
          </div>
          <h2 className="text-4xl md:text-8xl font-serif tracking-tight text-black mb-4">
            Popular Resorts
          </h2>
          <p className="text-neutral-800 font-light text-sm md:text-lg max-w-xl leading-relaxed">
            From oceanfront luxury villas to secluded mountain retreats, find
            your perfect resort getaway.
          </p>
        </div>

        {/* Navigation + Cards */}
        <div className="w-full flex flex-col">
          {/* Arrows */}
          <div className="flex justify-end gap-3 mb-6">
            <motion.button
              onClick={prev}
              disabled={offset === 0}
              whileTap={offset > 0 ? { scale: 0.94 } : {}}
              className="w-12 h-12 rounded-full bg-black flex items-center justify-center hover:bg-neutral-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ArrowLeft size={18} strokeWidth={1.8} className="text-white" />
            </motion.button>
            <motion.button
              onClick={next}
              disabled={offset >= maxOffset}
              whileTap={offset < maxOffset ? { scale: 0.94 } : {}}
              className="w-12 h-12 rounded-full bg-black flex items-center justify-center hover:bg-neutral-800 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ArrowRight size={18} strokeWidth={1.8} className="text-white" />
            </motion.button>
          </div>

          {/* Track */}
          {/*
            KEY FIX:
            - Each card is sized as: (100% - gaps) / visibleCount
              → we use CSS calc so cards always fill the viewport exactly.
            - The strip translates by: offset * (cardWidth + gap)
              → expressed in CSS calc so it stays pixel-perfect at every breakpoint.
            - We use a CSS custom property --vc (visible count) to share the value
              cleanly between card sizing and strip translation.
          */}
          <div className="overflow-hidden w-full">
            <motion.div
              className="flex cursor-grab active:cursor-grabbing"
              style={{
                gap: GAP,
                // Translate left by exactly `offset` card-widths (including gaps)
                // cardWidth = (100% - gaps_between_visible) / visibleCount
                // translation = offset * (cardWidth + gap)
                //             = offset * ((100% - (visibleCount-1)*gap) / visibleCount + gap)
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={(_, info) => {
                if (info.offset.x < -50) next();
                else if (info.offset.x > 50) prev();
              }}
              animate={{
                // Each card occupies: (containerWidth - (visibleCount-1)*GAP) / visibleCount
                // We shift by offset multiples of (cardWidth + GAP)
                x: `calc(${offset} * -1 * ((100% - ${(visibleCount - 1) * GAP}px) / ${visibleCount} + ${GAP}px))`,
              }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 30,
                mass: 0.9,
              }}
            >
              {destinations.map((dest, i) => (
                <DestCard
                  key={dest.id}
                  dest={dest}
                  index={i}
                  visibleCount={visibleCount}
                />
              ))}
            </motion.div>
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxOffset + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setOffset(i)}
                className={`transition-all duration-300 rounded-full ${
                  offset === i
                    ? "w-6 h-2 bg-black"
                    : "w-2 h-2 bg-neutral-300 hover:bg-neutral-400"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DestCard({
  dest,
  index,
  visibleCount,
}: {
  dest: (typeof destinations)[0];
  index: number;
  visibleCount: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative shrink-0 overflow-hidden rounded-sm cursor-pointer"
      style={{
        // Each card fills exactly 1/visibleCount of the container, accounting for gaps
        width: `calc((100% - ${(visibleCount - 1) * GAP}px) / ${visibleCount})`,
        flex: `0 0 calc((100% - ${(visibleCount - 1) * GAP}px) / ${visibleCount})`,
        aspectRatio: "3 / 4.2",
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.07,
        duration: 0.55,
        ease: [0.16, 1, 0.3, 1],
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Image */}
      <motion.img
        src={dest.image}
        alt={dest.name}
        className="w-full h-full object-cover"
        animate={{ scale: hovered ? 1.07 : 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.18) 45%, transparent 100%)",
        }}
      />

      {/* Label */}
      <div className="absolute bottom-5 left-5 z-10">
        <p
          className="text-[10px] tracking-[0.22em] uppercase mb-1"
          style={{ color: "#c9a84c", fontWeight: 600 }}
        >
          Destination
        </p>
        <motion.p
          className="text-white uppercase"
          animate={{ y: hovered ? -3 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            fontFamily: "'Georgia', 'Times New Roman', serif",
            fontSize: "clamp(1.1rem, 2vw, 1.6rem)",
            fontWeight: 700,
            letterSpacing: "0.04em",
            textShadow: "0 2px 12px rgba(0,0,0,0.4)",
          }}
        >
          {dest.name}
        </motion.p>
      </div>

      {/* Hover shine */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              background:
                "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.07) 50%, transparent 70%)",
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
