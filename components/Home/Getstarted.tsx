"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  CalendarCheck,
  MapPinned,
  BadgeDollarSign,
  UserRound,
  ArrowRight,
} from "lucide-react";

const features = [
  {
    num: "01",
    icon: CalendarCheck,
    title: "Easy Booking Process",
  },
  {
    num: "02",
    icon: MapPinned,
    title: "Travel Arrangements",
  },
  {
    num: "03",
    icon: BadgeDollarSign,
    title: "Affordable Price",
  },
  {
    num: "04",
    icon: UserRound,
    title: "Private Guide",
  },
];

function FadeUp({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Getstarted() {
  return (
    <section 
      className="relative min-h-[75vh] w-full text-neutral-900 border-t border-neutral-200/60 overflow-hidden flex items-center justify-center py-20 bg-[#4dd0e1]"
    >
      {/* Vertical Pinstripe Lining Background Layer */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px)",
          backgroundSize: "6px 100%",
        }}
      />
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 flex flex-col items-center text-center">
        {/* Headline */}
        <FadeUp delay={0.15}>
          <h2
            className="text-neutral-900 leading-[1.15] mb-6 font-[Vera] text-center"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 3.8rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Get Started with{" "}
            <span className="text-[#B38E46] italic">
              The Luxe Yatra
            </span>
            <br />
            Worldwide Travel.
          </h2>
        </FadeUp>

        {/* Body */}
        <FadeUp delay={0.25}>
          <p
            className="text-neutral-600 font-light leading-relaxed mb-12 mx-auto text-center"
            style={{
              fontSize: "1rem",
              maxWidth: 580,
            }}
          >
            For people who want to explore and try new experiences of life by
            travelling — our company makes your journey more memorable,
            exciting, and deeply personal.
          </p>
        </FadeUp>

        {/* Feature list */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16 w-full max-w-3xl mx-auto">
          {features.map(({ num, icon: Icon, title }, i) => (
            <FadeUp key={num} delay={0.35 + i * 0.1}>
              <div className="flex flex-col items-center gap-4 text-center cursor-default group">
                <div className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 bg-neutral-100 border border-neutral-200 group-hover:border-[#B38E46] group-hover:text-[#B38E46] shadow-xs">
                  <Icon size={20} className="text-neutral-900 group-hover:text-[#B38E46] transition-colors" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="text-neutral-900 text-sm font-semibold tracking-wide leading-snug">
                    {title}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>

        {/* CTA row */}
        <FadeUp delay={0.8}>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <motion.button
              whileHover={{
                scale: 1.04,
              }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#B38E46] text-white font-semibold text-xs uppercase tracking-wider shadow-lg hover:bg-[#997734] transition-all duration-300 cursor-pointer"
            >
              Explore
              <ArrowRight size={15} strokeWidth={2} />
            </motion.button>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
