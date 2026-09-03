"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

// Types

interface ItineraryItem {
  id: string;
  country: string;
  title: string;
  description: string;
  duration: string;
  image: string;
}

// Data

const itinerariesData: ItineraryItem[] = [
  {
    id: "1",
    country: "United Arab Emirates",
    title: "Dubai — Desert Dreams & City Glamour",
    description:
      "Explore Jumeirah Mosque, Gold Souk, Dubai Mall, Spice Souk, and the historic Bastakiya Square. Drive past Atlantis, The Palm, and end with an unforgettable desert safari experience.",
    duration: "5 Nights / 6 Days",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "2",
    country: "India",
    title: "Goa — Sun, Sand & Soul",
    description:
      "Goa offers much more than its famous party scene. Rich legacy, history, culture, and sun-soaked beaches make it a perfect destination for every kind of traveller seeking joy.",
    duration: "4 Nights / 5 Days",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "3",
    country: "Indonesia",
    title: "Bali — Enchanting Island of Gods",
    description:
      "Bali's enchanting beauty, rich culture, and serene beaches create an unforgettable experience. Whether you seek adventure or relaxation, Bali has it all for you.",
    duration: "6 Nights / 7 Days",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop",
  },
];

// Animation Variants

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

// Card Component
interface CardProps {
  item: ItineraryItem;
}

function ItineraryCard({ item }: CardProps) {
  return (
    <motion.article
      variants={fadeInUp}
      className="group relative h-[440px] w-full bg-black border-0 rounded-none overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer"
    >
      {/* ── Background Image stretched full card ── */}
      <Image
        src={item.image}
        alt={item.title}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Gradient Overlay only behind bottom text (Top 65% 100% clear without black shade) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.65) 35%, rgba(0,0,0,0) 65%)",
        }}
      />

      {/* ── Body Overlayed directly on Image ── */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end text-white z-10">
        {/* Country */}
        <div className="text-[10px] text-white/80 uppercase tracking-widest font-medium mb-1">
          {item.country}
        </div>

        {/* Title */}
        <h3 className="text-xl font-medium text-white leading-snug mb-2" style={{ color: "#ffffff", fontFamily: "var(--work-font), sans-serif" }}>
          {item.title}
        </h3>

        {/* Description */}
        <p className="leading-relaxed line-clamp-3 font-light mb-4" style={{ color: "rgba(255,255,255,0.9)", fontSize: "12.5px" }}>
          {item.description}
        </p>

        {/* Footer */}
        <div className="pt-4 border-t border-white/20 flex items-center justify-between">
          <div className="text-[11px] text-white/80 font-medium uppercase tracking-wider">
            {item.duration}
          </div>

          <Link
            href={`/itinerary/${item.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-white hover:text-[#B38E46] transition-colors duration-200 cursor-pointer uppercase tracking-widest"
          >
            <span>EXPLORE</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

// Main Section

export default function Itinerary() {
  return (
    <section className="bg-white py-24 border-t border-gray-100">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* ── Header ── */}
        <div className="text-center flex flex-col items-center mb-10 md:mb-14">
          <div className="text-sm tracking-[0.4em] text-black uppercase font-light mb-6">
            EXPERIENCE LUXURY, ADVENTURE & CULTURE
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif tracking-tight text-black mb-4">
            Exclusive Itinerary
          </h2>
          <p className="text-xs md:text-sm max-w-xl leading-relaxed text-neutral-600">
            Thoughtfully crafted travel plans designed for unforgettable memories and seamless journeys.
          </p>
        </div>

        {/* ── Cards Grid ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7"
        >
          {itinerariesData.map((item) => (
            <ItineraryCard
              key={item.id}
              item={item}
            />
          ))}
        </motion.div>

        {/* SEE MORE ITINERARIES Button */}
        <div className="flex justify-center mt-12">
          <Link href="/itinerary">
            <button className="border border-[#B38E46] text-[#B38E46] px-6 py-2.5 text-xs tracking-[0.25em] font-medium uppercase hover:bg-[#B38E46] hover:text-white transition-all duration-300 rounded-sm cursor-pointer">
              SEE MORE ITINERARIES
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
