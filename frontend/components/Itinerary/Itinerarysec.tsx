/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  MapPin,
  Clock,
  Compass,
  Play,
  X,
  ArrowRight,
  Search,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";
import { itineraryData, ItineraryItem } from "./itineraryData";

// ─── Animation Variants 

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.94,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 220,
      damping: 22,
      mass: 0.8,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.88,
    y: -16,
    filter: "blur(6px)",
    transition: {
      duration: 0.22,
      ease: [0.4, 0, 1, 1],
    },
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

// ─── Card Component

interface CardProps {
  item: ItineraryItem;
  onPlay: (id: string) => void;
}

function ItineraryCard({ item, onPlay }: CardProps) {
  const targetId = item.slug || item.id;

  return (
    <motion.article
      layout
      layoutId={`card-${item.id}`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="group relative h-[480px] w-full bg-black border-0 rounded-none overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer"
    >
      {/* ── Background Image stretched full card ── */}
      <Image
        src={item.image}
        alt={item.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />

      {/* Gradient Overlay only behind bottom text */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.65) 45%, rgba(0,0,0,0) 75%)",
        }}
      />

      {/* Top Badges */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
        {item.badge && (
          <span className="bg-[#B38E46] text-white text-[10px] font-medium uppercase tracking-widest px-3 py-1.5 rounded-sm shadow-md">
            {item.badge}
          </span>
        )}
        {item.country && (
          <span className="bg-black/60 backdrop-blur-md text-white text-[10px] uppercase tracking-wider px-2.5 py-1 border border-white/20 rounded-sm">
            {item.country.split(",")[0]}
          </span>
        )}
      </div>

      {/* Video Play Button */}
      {item.youtubeId && (
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPlay(item.youtubeId!);
            }}
            aria-label={`Play video for ${item.title}`}
            className="pointer-events-auto w-12 h-12 rounded-full border border-white/40 bg-white/10 backdrop-blur-md
                       flex items-center justify-center cursor-pointer
                       hover:scale-110 hover:bg-white/20 active:scale-95
                       transition-all duration-300 shadow-lg"
          >
            <Play className="w-4 h-4 text-white fill-white ml-0.5" />
          </button>
        </div>
      )}

      {/* ── Body Overlayed directly on Image ── */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end text-white z-10">
        {/* Route if present */}
        {item.route && (
          <div className="text-[10px] text-[#E5C158] font-medium tracking-wider mb-1 flex items-center gap-1.5 line-clamp-1">
            <MapPin className="w-3 h-3 text-[#B38E46] shrink-0" />
            <span>{item.route}</span>
          </div>
        )}

        {/* Title */}
        <h3
          className="text-lg md:text-xl font-serif font-medium text-white leading-snug mb-2 group-hover:text-[#B38E46] transition-colors duration-200 line-clamp-2"
        >
          {item.title}
        </h3>

        {/* Description */}
        <p
          className="leading-relaxed line-clamp-2 font-light mb-4 text-white/80 text-xs"
        >
          {item.description}
        </p>

        {/* Footer */}
        <div className="pt-3 border-t border-white/20 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-white/60 uppercase tracking-wider font-light">
              {item.duration}
            </span>
            {item.startingPrice && (
              <span className="text-xs font-semibold text-white tracking-wide">
                From {item.startingPrice}
              </span>
            )}
          </div>

          <Link
            href={`/itinerary/${targetId}`}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-white group-hover:text-[#B38E46] transition-colors duration-200 cursor-pointer uppercase tracking-widest"
          >
            <span>EXPLORE</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Video Modal

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
          className="fixed inset-0 z-9999 flex items-center justify-center p-4 md:p-10 bg-black/85 backdrop-blur-md"
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
            <button
              onClick={onClose}
              aria-label="Close video"
              className="absolute top-3 right-3 z-50 w-9 h-9 rounded-full bg-black/60 border border-white/20
                         flex items-center justify-center text-white hover:bg-white/15 transition-colors duration-200"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="relative pt-[56.25%] w-full bg-neutral-950">
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

// ─── Main Page

export default function ItineraryPage() {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<
    "all" | "india" | "international"
  >("all");
  const [selectedDuration, setSelectedDuration] = useState<
    "all" | "short" | "long"
  >("all");
  const [itinerariesList, setItinerariesList] = useState<ItineraryItem[]>(itineraryData);

  React.useEffect(() => {
    async function fetchItineraries() {
      try {
        const res = await fetch("/api/v1/itineraries?limit=50");
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const dbItems: ItineraryItem[] = json.data.map((itin: any) => {
            const primaryImg =
              itin.hero_image ||
              itin.images?.find((img: any) => img.is_primary)?.image_url ||
              itin.images?.[0]?.image_url ||
              "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop";

            const durationStr =
              itin.duration || `${itin.nights || 1} Nights / ${itin.days || 1} Days`;
            const badgeStr = itin.duration
              ? `✈️ ${itin.duration.split("/")[0].trim()}`
              : `✈️ ${itin.nights || 1} Nights`;

            const priceStr = itin.price_from
              ? `₹${itin.price_from.toLocaleString("en-IN")}`
              : "₹1,45,000";

            return {
              id: itin.id,
              slug: itin.slug,
              country: itin.country || itin.region || "International",
              title: itin.title || itin.name,
              description: itin.short_description || itin.overview || "Exclusive luxury itinerary.",
              duration: durationStr,
              badge: badgeStr,
              image: primaryImg,
              youtubeId: "",
              route: itin.route || "",
              startingPrice: priceStr,
              tourType: itin.tour_type || itin.category || "Luxury Journey",
            };
          });

          setItinerariesList(dbItems);
        }
      } catch (err) {
        console.error("Failed to fetch public itineraries:", err);
      }
    }
    fetchItineraries();
  }, []);

  const filteredItineraries = itinerariesList.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());

    const isIndia = item.country.toLowerCase().includes("india");
    let matchesRegion = true;
    if (selectedRegion === "india") matchesRegion = isIndia;
    else if (selectedRegion === "international") matchesRegion = !isIndia;

    let matchesDuration = true;
    const nightsMatch = item.duration.match(/(\d+)\s+Nights/);
    const nights = nightsMatch ? parseInt(nightsMatch[1], 10) : 0;
    if (selectedDuration === "short") matchesDuration = nights <= 4;
    else if (selectedDuration === "long") matchesDuration = nights > 4;

    return matchesSearch && matchesRegion && matchesDuration;
  });

  const hasActiveFilters =
    searchQuery || selectedRegion !== "all" || selectedDuration !== "all";

  const handleReset = () => {
    setSearchQuery("");
    setSelectedRegion("all");
    setSelectedDuration("all");
  };

  return (
    <main className="min-h-screen bg-white text-neutral-900 pb-24">
      <section className="max-w-7xl mx-auto px-6 mt-12">
        {/* 1. FILTERING CATEGORY NAVIGATION ROW - REGIONS */}
        <div className="flex flex-wrap gap-3 items-center justify-center mb-6">
          {[
            { label: "ALL REGIONS", value: "all" },
            { label: "INDIA", value: "india" },
            { label: "INTERNATIONAL", value: "international" },
          ].map((region) => {
            const isSelected = selectedRegion === region.value;
            return (
              <button
                key={region.value}
                onClick={() => setSelectedRegion(region.value as any)}
                className={`text-xs tracking-[0.25em] font-medium uppercase px-6 py-2.5 rounded-sm border transition-all duration-300 active:scale-95 cursor-pointer
                  ${
                    isSelected
                      ? "bg-[#B38E46] text-white border-[#B38E46] shadow-sm"
                      : "bg-white text-[#B38E46] border-[#B38E46] hover:bg-[#B38E46] hover:text-white"
                  }`}
              >
                {region.label}
              </button>
            );
          })}
        </div>

        {/* 2. FILTERING CATEGORY NAVIGATION ROW - DURATIONS */}
        <div className="flex flex-wrap gap-3 items-center justify-center mb-12 pb-8">
          {[
            { label: "ANY DURATION", value: "all" },
            { label: "3-4 NIGHTS", value: "short" },
            { label: "5-6 NIGHTS", value: "long" },
          ].map((dur) => {
            const isSelected = selectedDuration === dur.value;
            return (
              <button
                key={dur.value}
                onClick={() => setSelectedDuration(dur.value as any)}
                className={`text-xs tracking-[0.25em] font-medium uppercase px-6 py-2.5 rounded-sm border transition-all duration-300 active:scale-95 cursor-pointer
                  ${
                    isSelected
                      ? "bg-[#B38E46] text-white border-[#B38E46] shadow-sm"
                      : "bg-white text-[#B38E46] border-[#B38E46] hover:bg-[#B38E46] hover:text-white"
                  }`}
              >
                {dur.label}
              </button>
            );
          })}
        </div>

        {/* 3. SEARCH BAR */}
        <div className="max-w-md mx-auto mb-10 relative">
          <div className="relative flex items-center bg-white border border-[#B38E46] rounded-sm px-5 py-3.5 transition-all duration-300 shadow-2xs">
            <Search className="w-4 h-4 text-[#B38E46] mr-3 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search itineraries..."
              className="bg-transparent text-xs sm:text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none w-full font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="p-1 hover:bg-neutral-100 rounded-full transition-colors shrink-0 cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5 text-neutral-600" />
              </button>
            )}
          </div>
        </div>

        {/* 4. RESET BUTTON */}
        {hasActiveFilters && (
          <div className="flex justify-center mb-8">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-6 py-2.5 border border-[#B38E46] bg-transparent text-[#B38E46] hover:bg-[#B38E46] hover:text-white rounded-sm text-xs font-medium tracking-[0.25em] uppercase transition-all duration-300 active:scale-95 shadow-xs cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Filters
            </button>
          </div>
        )}

        {/* 5. RESULT COUNT */}
        <div className="text-center text-xs text-neutral-400 font-medium mb-8">
          Showing {filteredItineraries.length} of {itineraryData.length} itineraries
        </div>

        {/* ── Cards Grid ── */}
        {/*
          Key insight: we do NOT use variants/staggerContainer on the grid wrapper,
          because AnimatePresence + individual card variants gives us full per-card
          enter/exit control. The grid wrapper only handles layout shifts.
        */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItineraries.map((item) => (
              <ItineraryCard
                key={item.id}
                item={item}
                onPlay={setActiveVideoId}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── Empty State ── */}
        <AnimatePresence>
          {filteredItineraries.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { type: "spring", stiffness: 200, damping: 22 },
              }}
              exit={{ opacity: 0, y: 16, transition: { duration: 0.2 } }}
              className="flex flex-col items-center justify-center text-center py-20 px-4 bg-white border border-neutral-200 rounded-3xl"
            >
              <Compass className="w-12 h-12 text-[#B38E46] mb-4 animate-bounce" />
              <h3 className="text-lg font-bold text-neutral-900 mb-1">
                No Itineraries Found
              </h3>
              <p className="text-sm max-w-sm mb-6">
                We couldn&apos;t find any itineraries matching your current
                search or filters.
              </p>
              <button
                onClick={handleReset}
                className="border border-[#B38E46] bg-transparent text-[#B38E46] hover:bg-[#B38E46] hover:text-white font-medium tracking-[0.25em] uppercase px-6 py-2.5 rounded-sm text-xs transition-all duration-300 shadow-xs cursor-pointer"
              >
                Clear All Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ── Video Modal ── */}
      <VideoModal
        videoId={activeVideoId}
        onClose={() => setActiveVideoId(null)}
      />
    </main>
  );
}
