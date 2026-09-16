"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

// ─── Data ─────────────────────────────────────────────────────────────────────

const testimonials = [
  {
    id: 1,
    name: "Rajesh & Sunita Malhotra",
    location: "Mumbai, India",
    text: "The Luxe Club transformed our family vacation to Udaipur. From private sunset boat cruises on Lake Pichola to effortless resort check-ins, every detail was impeccably arranged. Truly world-class luxury service.",
    avatar: "/rajesh-sunita.jpg",
  },
  {
    id: 2,
    name: "Ananya Singhania",
    location: "New Delhi, India",
    text: "The personalized 24/7 concierge was exceptional during our stay in the Maldives. We felt completely pampered from arrival to departure. Highly recommend becoming a member for true peace of mind.",
    avatar: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 3,
    name: "Vikram Mehta",
    location: "Bengaluru, India",
    text: "Unrivalled access to India's finest heritage palaces and private luxury villas abroad. The bespoke itineraries crafted by the team made our 10th anniversary celebration unforgettable.",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 4,
    name: "Rohan & Priyamvada Kapoor",
    location: "Hyderabad, India",
    text: "A seamless luxury experience from start to finish. The attention to detail in room upgrades and curated local experiences was unmatched. Best travel membership for discerning travelers.",
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: 5,
    name: "Radhika Sharma",
    location: "Jaipur, India",
    text: "The most stress-free holiday booking experience I've had in years. Exclusive member benefits, private airport transfers, and top-tier hospitality made our family trip absolute perfection.",
    avatar: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=300&q=80",
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
  mobile:  { cardWidth: 280, cardHeight: 300, gapNear: 0,   visibleSide: 0 },
  tablet:  { cardWidth: 310, cardHeight: 310, gapNear: 360, visibleSide: 1 },
  desktop: { cardWidth: 360, cardHeight: 320, gapNear: 420, visibleSide: 1 },
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
    <section className="w-full min-h-screen flex flex-col items-center justify-center py-16 sm:py-20 px-4 overflow-hidden bg-white relative border-b border-neutral-200">
      {/* Header Block */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-10 sm:mb-14 z-10 relative"
      >
        <div className="text-sm tracking-[0.4em] text-black uppercase font-light mb-6">
          TESTIMONIALS
        </div>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif tracking-tight text-black">
          What Our Clients Say
        </h2>
      </motion.div>

      {/* Carousel */}
      <div
        className="relative w-full max-w-7xl flex items-center justify-center"
        style={{ height: trackHeight }}
      >
        {/* Prev Arrow — Positioned Outside Side Card */}
        <button
          onClick={prev}
          aria-label="Previous testimonial"
          className="flex absolute left-1 md:left-[calc(50%-560px)] lg:left-[calc(50%-600px)] xl:left-[calc(50%-630px)] top-1/2 -translate-y-1/2 z-50 text-black hover:text-neutral-700 transition-colors p-2 cursor-pointer"
        >
          <ChevronLeft className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16" strokeWidth={1.5} />
        </button>

        {/* Next Arrow — Positioned Outside Side Card */}
        <button
          onClick={next}
          aria-label="Next testimonial"
          className="flex absolute right-1 md:right-[calc(50%-560px)] lg:right-[calc(50%-600px)] xl:right-[calc(50%-630px)] top-1/2 -translate-y-1/2 z-50 text-black hover:text-neutral-700 transition-colors p-2 cursor-pointer"
        >
          <ChevronRight className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16" strokeWidth={1.5} />
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
            } else {
              // Tablet / Desktop: 3 cards (center + 1 on each side)
              if (isActive) {
                scale = 1; xOffset = 0; zIndex = 50; opacity = 1; blur = 0;
              } else if (absD === 1) {
                scale = 0.85; xOffset = distance * layout.gapNear; zIndex = 40; opacity = 1; blur = 0;
              } else {
                scale = 0.6; xOffset = distance * (layout.gapNear + 250); zIndex = 10; opacity = 0; blur = 2;
              }
            }

            return (
              <motion.div
                key={item.id}
                className="absolute flex flex-col justify-between bg-[rgb(25,25,112)] rounded-2xl p-6 sm:p-8 cursor-pointer select-none shadow-xl border-0 transition-colors duration-300"
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
                    size={isActive ? 36 : 28}
                    className="text-white"
                  />
                  <p
                    className="mt-4 leading-relaxed text-white text-sm sm:text-[15px] font-light"
                    style={{ color: "#ffffff" }}
                  >
                    &quot;{item.text}&quot;
                  </p>
                </div>

                <div className="flex items-center gap-3 mt-5 pt-5 border-t border-white/15">
                  <Image
                    width={48}
                    height={48}
                    src={item.avatar}
                    alt={item.name}
                    className={`rounded-full object-cover ring-2 ring-white shrink-0 ${
                      isActive ? "w-11 h-11 sm:w-12 sm:h-12" : "w-9 h-9 sm:w-10 sm:h-10 opacity-90"
                    }`}
                  />
                  <div>
                    <p
                      className="text-white font-bold text-sm sm:text-base"
                      style={{ color: "#ffffff" }}
                    >
                      {item.name}
                    </p>
                    <p
                      className="text-white/80 text-xs mt-0.5"
                      style={{ color: "rgba(255, 255, 255, 0.85)" }}
                    >
                      {item.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>



      {/* Circular Dot Indicators */}
      <div className="flex items-center justify-center gap-3 mt-10 md:mt-12">
        {testimonials.map((_, i) => (
          <button
            key={i}
            onClick={() => !isAnimating && setActive(i)}
            aria-label={`Go to testimonial ${i + 1}`}
            className="focus:outline-none cursor-pointer p-1"
          >
            <div
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                i === active
                  ? "bg-black scale-125"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}