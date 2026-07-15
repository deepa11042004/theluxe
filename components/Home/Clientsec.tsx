"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

// ─── Data ─────────────────────────────────────────────────────────────────────

const testimonials = [
  {
    id: 1,
    name: "Jenny Wilson",
    location: "New York, America",
    text: "I absolutely love this salon! From the warm welcome to the final look, everything was perfect. The staff really listened.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 2,
    name: "Esther Howard",
    location: "London, UK",
    text: "The service was exceptional. I felt like a queen for the day. Highly recommend booking an appointment here.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 3,
    name: "Wade Warren",
    location: "Paris, France",
    text: "Great atmosphere and professional staff. They knew exactly how to handle my hair type. I will be back.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 4,
    name: "Cameron Williamson",
    location: "Berlin, Germany",
    text: "A truly relaxing experience. The attention to detail is unmatched. Rare to find a place that cares this much.",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    id: 5,
    name: "Sarah Jenkins",
    location: "Tokyo, Japan",
    text: "Best haircut I've had in years. The stylist was patient and gave great advice for my hair texture.",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

// ─── Quote Icon ───────────────────────────────────────────────────────────────

function QuoteIcon({ size = 36, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 32" fill="none" className={className}>
      <path
        d="M0 32V19.556C0 8.741 6.222 2.37 18.667 0l1.777 3.556C14.37 5.037 11.11 8.296 10.222 13.333H17.78V32H0zm22.222 0V19.556C22.222 8.741 28.444 2.37 40.889 0l1.778 3.556c-6.074 1.481-9.334 4.74-10.222 9.777h7.555V32H22.222z"
        fill="currentColor"
      />
    </svg>
  );
}

// ─── Breakpoint hook ──────────────────────────────────────────────────────────

type Breakpoint = "mobile" | "tablet" | "desktop";

function useBreakpoint(): Breakpoint {
  const [bp, setBp] = useState<Breakpoint>("desktop");
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setBp("mobile");
      else if (w < 1024) setBp("tablet");
      else setBp("desktop");
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return bp;
}


const LAYOUT = {
  mobile:  { cardWidth: 300, cardHeight: 300, gapNear: 0,   gapFar: 0,   visibleSide: 0 },
  tablet:  { cardWidth: 300, cardHeight: 310, gapNear: 220, gapFar: 420, visibleSide: 2 },
  desktop: { cardWidth: 360, cardHeight: 320, gapNear: 280, gapFar: 520, visibleSide: 2 },
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function Clientsec() {
  const [active, setActive] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const total = testimonials.length;
  const bp = useBreakpoint();
  const layout = LAYOUT[bp];

  const go = useCallback(
    (dir: 1 | -1) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setActive((prev) => (prev + dir + total) % total);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating, total]
  );

  const next = useCallback(() => go(1), [go]);
  const prev = useCallback(() => go(-1), [go]);

  // Keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  // Track height: enough to contain tallest card
  const trackHeight = layout.cardHeight + 40;

  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center py-16 sm:py-20 px-4 overflow-hidden bg-white">

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-10 sm:mb-14 z-10 relative"
      >
        <p className="text-sm sm:text-lg tracking-[0.3em] uppercase mb-3 text-gray-400">
          Testimonials
        </p>
        <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-serif tracking-tight text-black">
          What Our Clients Say
        </h2>
      </motion.div>

      {/* Carousel */}
      <div
        className="relative w-full max-w-7xl flex items-center justify-center"
        style={{ height: trackHeight }}
      >
        {/* Prev arrow — desktop only (absolute, beside cards) */}
        <button
          onClick={prev}
          aria-label="Previous testimonial"
          className="hidden lg:flex absolute left-10 z-50 w-12 h-12 rounded-full bg-black text-white shadow-lg items-center justify-center hover:scale-110 hover:bg-neutral-900 transition-all duration-200 cursor-pointer"
        >
          <ChevronLeft size={18} className="text-white" strokeWidth={2} />
        </button>

        {/* Next arrow — desktop only (absolute, beside cards) */}
        <button
          onClick={next}
          aria-label="Next testimonial"
          className="hidden lg:flex absolute right-10 z-50 w-12 h-12 rounded-full bg-black text-white shadow-lg items-center justify-center hover:scale-110 hover:bg-neutral-900 transition-all duration-200 cursor-pointer"
        >
          <ChevronRight size={18} className="text-white" strokeWidth={2} />
        </button>

        {/* Cards track */}
        <div
          className="relative w-full h-full flex items-center justify-center"
          // Touch/swipe support
          onTouchStart={(e) => setDragStartX(e.touches[0].clientX)}
          onTouchEnd={(e) => {
            const delta = dragStartX - e.changedTouches[0].clientX;
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            if (Math.abs(delta) > 50) delta > 0 ? next() : prev();
          }}
        >
          {testimonials.map((item, index) => {
            // Circular distance from active
            let distance = index - active;
            if (distance < -total / 2) distance += total;
            if (distance > total / 2) distance -= total;

            const isActive = distance === 0;
            const absD = Math.abs(distance);

            // ── Compute per-breakpoint transform values ──
            let scale = 0.6;
            let xOffset = 0;
            let zIndex = 10;
            let opacity = 0;
            let blur = 0;

            if (bp === "mobile") {
              // Only show the active card; others slide off-screen
              if (isActive) { scale = 1; xOffset = 0; zIndex = 50; opacity = 1; }
              else { scale = 0.85; xOffset = distance * 400; zIndex = 10; opacity = 0; }
            } else if (bp === "tablet") {
              // Same as desktop — center + 2 neighbours each side, fully visible
              if (isActive) {
                scale = 1;    xOffset = 0;                               zIndex = 50; opacity = 1;   blur = 0;
              } else if (absD === 1) {
                scale = 0.85; xOffset = distance * layout.gapNear;       zIndex = 40; opacity = 1;   blur = 0;
              } else if (absD === 2) {
                scale = 0.75; xOffset = distance * layout.gapFar;        zIndex = 30; opacity = 0.7; blur = 2;
              } else {
                scale = 0.6;  xOffset = distance * (layout.gapFar + 200); zIndex = 10; opacity = 0;
              }
            } else {
              // Desktop: center + 2 on each side
              if (isActive) {
                scale = 1; xOffset = 0; zIndex = 50; opacity = 1; blur = 0;
              } else if (absD === 1) {
                scale = 0.85; xOffset = distance * layout.gapNear; zIndex = 40; opacity = 1; blur = 0;
              } else if (absD === 2) {
                scale = 0.75; xOffset = distance * layout.gapFar; zIndex = 30; opacity = 0.7; blur = 2;
              } else {
                scale = 0.6; xOffset = distance * (layout.gapFar + 200); zIndex = 10; opacity = 0;
              }
            }

            return (
              <motion.div
                key={item.id}
                className="absolute flex flex-col justify-between bg-black rounded-2xl p-6 sm:p-8 cursor-pointer select-none border border-neutral-800"
                style={{
                  width: layout.cardWidth,
                  minHeight: layout.cardHeight,
                  marginLeft: -(layout.cardWidth / 2),
                  marginTop: -(layout.cardHeight / 2),
                  top: "50%",
                  left: "50%",
                  zIndex,
                }}
                animate={{ x: xOffset, scale, opacity, filter: `blur(${blur}px)` }}
                transition={{ type: "spring", stiffness: 120, damping: 20, mass: 1.2 }}
                onClick={() => {
                  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                  if (!isActive && absD === 1) distance === 1 ? next() : prev();
                  if (!isActive && absD === 2) {
                    if (distance === 2) { next(); setTimeout(next, 120); }
                    else { prev(); setTimeout(prev, 120); }
                  }
                }}
              >
                <div>
                  <QuoteIcon
                    size={isActive ? 36 : 26}
                    className={isActive ? "text-white" : "text-neutral-700"}
                  />
                  <p
                    className={`mt-4 leading-relaxed ${
                      isActive ? "text-white text-sm sm:text-[15px]" : "text-neutral-400 text-xs sm:text-[13px]"
                    }`}
                  >
                    &quot;{item.text}&quot;
                  </p>
                </div>

                <div
                  className={`flex items-center gap-3 mt-5 pt-5 border-t ${
                    isActive ? "border-neutral-800" : "border-neutral-900"
                  }`}
                >
                  <Image
                    width={48}
                    height={48}
                    src={item.avatar}
                    alt={item.name}
                    className={`rounded-full object-cover ring-2 ring-offset-2 ring-offset-black shrink-0 ${
                      isActive ? "ring-white w-11 h-11 sm:w-12 sm:h-12" : "ring-transparent w-9 h-9 sm:w-10 sm:h-10"
                    }`}
                  />
                  <div>
                    <p className={`text-white ${isActive ? "font-bold text-sm sm:text-base" : "font-semibold text-xs sm:text-sm"}`}>
                      {item.name}
                    </p>
                    <p className="text-neutral-400 text-xs mt-0.5">{item.location}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Mobile & Tablet nav buttons — shown below cards */}
      <div className="flex lg:hidden items-center gap-4 mt-6">
        <button
          onClick={prev}
          aria-label="Previous testimonial"
          className="w-11 h-11 rounded-full bg-black text-white shadow-lg flex items-center justify-center hover:bg-neutral-800 active:scale-95 transition-all duration-200"
        >
          <ChevronLeft size={18} className="text-white" strokeWidth={2} />
        </button>
        <button
          onClick={next}
          aria-label="Next testimonial"
          className="w-11 h-11 rounded-full bg-black text-white shadow-lg flex items-center justify-center hover:bg-neutral-800 active:scale-95 transition-all duration-200"
        >
          <ChevronRight size={18} className="text-white" strokeWidth={2} />
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex items-center gap-2 mt-4 sm:mt-5">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => !isAnimating && setActive(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            className="focus:outline-none"
          >
            <motion.div
              animate={{
                width: i === active ? 24 : 8,
                backgroundColor: i === active ? "#000" : "#d1d5db",
              }}
              transition={{ duration: 0.3 }}
              className="h-2 rounded-full"
            />
          </button>
        ))}
      </div>
    </section>
  );
}