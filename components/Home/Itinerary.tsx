"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { MapPin, Clock, Compass, Play, X, ArrowRight } from "lucide-react";
import Link from "next/link";

// Types

interface ItineraryItem {
  id: string;
  country: string;
  title: string;
  description: string;
  duration: string;
  badge: string;
  image: string;
  youtubeId: string;
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
    badge: "✈️ 5 Nights",
    image:
      "https://images.unsplash.com/photo-1739900292622-a7f860175aad?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHViYWl8ZW58MHx8MHx8fDA%3D",
    youtubeId: "Hs4arPj29_I",
  },
  {
    id: "2",
    country: "India",
    title: "Goa — Sun, Sand & Soul",
    description:
      "Goa offers much more than its famous party scene. Rich legacy, history, culture, and sun-soaked beaches make it a perfect destination for every kind of traveller seeking joy.",
    duration: "4 Nights / 5 Days",
    badge: "🏝️ 4 Nights",
    image:
      "https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z29hfGVufDB8fDB8fHww",
    youtubeId: "BoFGjD9Bv-k",
  },
  {
    id: "3",
    country: "Indonesia",
    title: "Bali — Enchanting Island of Gods",
    description:
      "Bali's enchanting beauty, rich culture, and serene beaches create an unforgettable experience. Whether you seek adventure or relaxation, Bali has it all for you.",
    duration: "6 Nights / 7 Days",
    badge: "🌺 6 Nights",
    image:
      "https://plus.unsplash.com/premium_photo-1677829177642-30def98b0963?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFsaXxlbnwwfHwwfHx8MA%3D%3D",
    youtubeId: "BFS9n4B_2xA",
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

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", damping: 28, stiffness: 320 },
  },
  exit: {
    opacity: 0,
    scale: 0.94,
    y: 16,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

// Card Component
interface CardProps {
  item: ItineraryItem;
  onPlay: (id: string) => void;
}

function ItineraryCard({ item, onPlay }: CardProps) {
  return (
    <motion.article
      variants={fadeInUp}
      className="group flex flex-col h-full bg-white border border-gray-300 rounded-3xl overflow-hidden
                 hover:border-gray-400 hover:shadow-xl hover:shadow-black/5 transition-all duration-300"
    >
      {/* ── Image ── */}
      <div className="relative h-64 w-full overflow-hidden shrink-0">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-black/55 via-transparent to-black/20 pointer-events-none" />

        {/* Badge */}
        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-full tracking-wide shadow-sm">
          {item.badge}
        </span>

        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={() => onPlay(item.youtubeId)}
            aria-label={`Play video for ${item.title}`}
            className="w-12 h-12 rounded-full border border-white/50 bg-white/15 backdrop-blur-sm
                       flex items-center justify-center cursor-pointer
                       group-hover:bg-black/80 group-hover:border-white/20
                       transition-all duration-300 shadow-md"
          >
            <Play className="w-4 h-4 text-white fill-white ml-0.5" />
          </button>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="p-6 flex flex-col flex-1 gap-3">
        {/* Country */}
        <div className="flex items-center gap-1.5 text-gray-400 text-xs font-semibold uppercase tracking-widest">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span>{item.country}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-900 leading-snug tracking-tight line-clamp-2 group-hover:text-black transition-colors duration-200">
          {item.title}
        </h3>

        {/* Description */}
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-3 flex-1">
          {item.description}
        </p>

        {/* Footer */}
        <div className="pt-4 mt-auto border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-gray-400 text-xs font-medium">
            <Clock className="w-3.5 h-3.5 shrink-0" />
            <span>{item.duration}</span>
          </div>

          <Link
            href={`/itinerary/${item.id}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-gray-700
                          border border-gray-200 px-4 py-1.5 rounded-full
                          group-hover:bg-black group-hover:text-white group-hover:border-black
                          transition-all duration-300 cursor-pointer select-none"
          >
            Explore
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

// Video Modal

interface VideoModalProps {
  videoId: string | null;
  onClose: () => void;
}

function VideoModal({ videoId, onClose }: VideoModalProps) {
  return (
    <AnimatePresence>
      {videoId && (
        <motion.div
          key="overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-9999 flex items-center justify-center p-4 md:p-10 bg-black/80 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            key="modal"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              onClick={onClose}
              aria-label="Close video"
              className="absolute top-3 right-3 z-50 w-9 h-9 rounded-full bg-black/60 border border-white/20
                         flex items-center justify-center text-white hover:bg-white/15 transition-colors duration-200"
            >
              <X className="w-4 h-4" />
            </button>

            {/* 16:9 iframe */}
            <div className="relative pt-[56.25%] w-full bg-neutral-900">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Main Section

export default function Itinerary() {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);

  return (
    <>
      <section className="bg-white py-24 border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* ── Header ── */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-gray-100">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Micro-Header Tag */}
              <span className="text-[10px] md:text-sm font-[Vera] tracking-[0.3em] text-neutral-800 uppercase mb-6 block">
                Experience Luxury, Adventure & Culture
              </span>
              <h2 className="text-4xl md:text-5xl font-[Vera] text-gray-900 tracking-tight uppercase leading-none">
                Exclusive Itinerary
              </h2>
            </motion.div>

            <Link href="/itinerary">
              <motion.button
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 bg-gray-900 hover:bg-black text-white
                           font-semibold px-6 py-3.5 rounded-full text-sm
                           shadow-md shadow-black/10 transition-colors duration-200 self-start md:self-auto"
              >
                <Compass className="w-4 h-4" />
                See More Itineraries
              </motion.button>
            </Link>
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
                onPlay={setActiveVideoId}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Video Modal (portal-like, outside section) ── */}
      <VideoModal
        videoId={activeVideoId}
        onClose={() => setActiveVideoId(null)}
      />
    </>
  );
}
