"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Search, X, MapPin, Star, Sparkles } from "lucide-react";

// Resort Filter Categories
const CATEGORIES = [
  "ALL RESORTS",
  "HERITAGE & PALACE",
  "BEACH & ISLAND",
  "MOUNTAIN & WELLNESS",
  "WILDLIFE & SAFARI",
];

// Curated Luxury Resort Properties Data
const LUXURY_RESORTS = [
  {
    id: 1,
    title: "Taj Lake Palace",
    location: "Udaipur, Rajasthan, India",
    description:
      "A floating white-marble palace in the middle of Lake Pichola offering unparalleled royal hospitality and romantic sunset views over the Aravalli hills.",
    image:
      "https://cdn.sanity.io/images/ocl5w36p/ihcl_prod/1c0c270e8d67352d82a51cc9a9c89c994bc882fe-1280x1760.jpg",
    href: "https://www.tajhotels.com/en-in/taj/taj-lake-palace-udaipur/",
    category: "HERITAGE & PALACE",
    rating: 4.9,
    price: "₹48,500",
    amenities: ["Royal Butler Service", "Private Boat Transfer", "Jharokha Dining"],
  },
  {
    id: 2,
    title: "Ananda in the Himalayas",
    location: "Rishikesh, Uttarakhand, India",
    description:
      "A world-renowned luxury wellness sanctuary set on a 100-acre palace estate overlooking the spiritual Ganges River valley.",
    image: "/Img/Untitled design (15).webp",
    href: "https://www.anandaspa.com/",
    category: "MOUNTAIN & WELLNESS",
    rating: 4.95,
    price: "₹42,000",
    amenities: ["Ayurvedic Spa", "Yoga & Meditation", "Organic Gourmet"],
  },
  {
    id: 3,
    title: "The Oberoi Amarvilas",
    location: "Agra, Uttar Pradesh, India",
    description:
      "Located just 600 meters from the Taj Mahal, every room and suite offers uninterrupted, breathtaking views of the monument of love.",
    image: "/Img/e3371e9e.avif",
    href: "https://www.oberoihotels.com/hotels-in-agra-amarvilas-resort/",
    category: "HERITAGE & PALACE",
    rating: 4.98,
    price: "₹55,000",
    amenities: ["Taj Mahal Views", "Private Balconies", "Terrace Dining"],
  },
  {
    id: 4,
    title: "Soneva Fushi",
    location: "Baa Atoll, Maldives",
    description:
      "An idyllic island hideaway featuring spacious beachfront and overwater villas with private pools, glassblowing studio, and open-air cinema.",
    image: "/Img/soneva-fushi.jpg",
    href: "https://soneva.com/resorts/soneva-fushi/",
    category: "BEACH & ISLAND",
    rating: 4.92,
    price: "₹1,15,000",
    amenities: ["Private Pool", "Barefoot Luxury", "Observatory"],
  },
  {
    id: 5,
    title: "Amanbagh Retreat",
    location: "Alwar, Rajasthan, India",
    description:
      "A modern oasis carved out of pink sandstone, surrounded by mature palm groves and ancient ruined temples near Sariska National Park.",
    image:
      "https://www.aman.com/sites/default/files/2023-01/Amanbagh%2C%20India%20-%20Main%20Building%2C%20Pool%20View-3.jpg",
    href: "https://www.aman.com/resorts/amanbagh",
    category: "WILDLIFE & SAFARI",
    rating: 4.88,
    price: "₹62,000",
    amenities: ["Tiger Safaris", "Sandstone Pool Suites", "Heritage Walks"],
  },
  {
    id: 6,
    title: "The Leela Palace Kovalam",
    location: "Kovalam, Kerala, India",
    description:
      "Perched high on a clifftop overlooking the Arabian Sea, blending authentic Malabar coastal luxury with world-class beach access.",
    image: "/Img/Intro_1035x600_5.webp",
    href: "https://www.theleela.com/the-leela-kovalam-a-raviz-hotel",
    category: "BEACH & ISLAND",
    rating: 4.9,
    price: "₹38,000",
    amenities: ["Cliff-Top Infinity Pool", "Ayurvedic Treatments", "Beach Club"],
  },
];

export default function ResortSec() {
  const [activeCategory, setActiveCategory] = useState("ALL RESORTS");
  const [searchQuery, setSearchQuery] = useState("");

  // Filtering Logic
  const filteredResorts = LUXURY_RESORTS.filter((resort) => {
    let matchesCategory = true;
    if (activeCategory !== "ALL RESORTS") {
      matchesCategory = resort.category === activeCategory;
    }

    let matchesSearch = true;
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      matchesSearch =
        resort.title.toLowerCase().includes(query) ||
        resort.location.toLowerCase().includes(query) ||
        resort.description.toLowerCase().includes(query);
    }

    return matchesCategory && matchesSearch;
  });

  return (
    <section className="bg-[#F8F9FA] text-neutral-900 py-16 md:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden w-full select-none">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header Matching Homepage Editorial Aesthetic */}
        <div className="text-center mb-14 flex flex-col items-center">
          <div className="text-sm tracking-[0.4em] text-black uppercase font-light mb-6">
            EXCLUSIVE RETREAT PORTFOLIO
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif tracking-tight text-black max-w-6xl mx-auto leading-[1.1]">
            Exceptional Luxury Resorts &amp; Sanctuaries
          </h2>
          <p className="text-xs md:text-sm max-w-xl leading-relaxed text-neutral-600 mt-6 font-light tracking-wide">
            Handpicked sanctuaries reflecting the very soul of their destination, from royal palaces to private island oases.
          </p>
        </div>

        {/* 1. CATEGORY NAVIGATION FILTER TABS */}
        <div className="flex flex-wrap gap-3 items-center justify-center mb-10">
          {CATEGORIES.map((cat) => {
            const isSelected = cat === activeCategory;
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setSearchQuery("");
                }}
                className={`text-xs tracking-[0.25em] font-medium uppercase px-7 py-2.5 rounded-sm border transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? "bg-[#B38E46] text-white border-[#B38E46] shadow-sm"
                    : "bg-white text-[#B38E46] border-[#B38E46] hover:bg-[#B38E46] hover:text-white"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* 2. SEARCH BAR */}
        <div className="max-w-lg mx-auto mb-16 relative">
          <div className="relative flex items-center bg-white border border-[#B38E46] rounded-sm px-6 py-3 transition-all duration-300 shadow-2xs">
            <Search className="w-4 h-4 text-[#B38E46] mr-3 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search resorts by name, location, or experience..."
              className="bg-transparent text-xs sm:text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none w-full font-light tracking-wide"
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

        {/* 3. RESORTS GRID CONTAINER (Homepage Architectural Layout) */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
        >
          <AnimatePresence mode="popLayout">
            {filteredResorts.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="col-span-full py-20 text-center flex flex-col items-center justify-center text-black"
              >
                <Search className="w-10 h-10 text-[#B38E46] mb-4 opacity-60" />
                <p className="text-2xl font-serif mb-2">No resorts match your search</p>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto leading-relaxed font-light">
                  We couldn&apos;t find any properties matching &ldquo;{searchQuery}&rdquo;. Try checking for typos or clear your search filter.
                </p>
              </motion.div>
            )}

            {filteredResorts.map((resort) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.98, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: 10 }}
                transition={{ duration: 0.4 }}
                key={resort.id}
                className="group relative h-[480px] w-full bg-black border-0 rounded-none overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer"
              >
                {/* Full Bleed Background Image stretched full card */}
                <img
                  src={resort.image}
                  alt={resort.title}
                  className="object-cover w-full h-full absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Gradient Overlay only behind bottom text (Top 65% 100% clear without black shade) */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.65) 35%, rgba(0,0,0,0) 65%)",
                  }}
                />

                {/* Category Pill Tag & Rating Tag at Top */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <span className="bg-black/50 backdrop-blur-md text-white text-[10px] tracking-[0.2em] uppercase font-light px-3 py-1.5 border border-white/20">
                    {resort.category.replace("&", "•")}
                  </span>

                  <div className="bg-black/50 backdrop-blur-md text-white text-xs font-light tracking-wider px-3 py-1 border border-white/20 flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 fill-[#E5C158] text-[#E5C158]" />
                    <span>{resort.rating}</span>
                  </div>
                </div>

                {/* Content Layer Overlayed on Image */}
                <div className="absolute inset-0 p-6 sm:p-7 flex flex-col justify-end text-white z-10">
                  {/* Location Badge */}
                  <div className="text-[10px] text-white/80 uppercase tracking-[0.25em] font-medium mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#B38E46] shrink-0" />
                    <span>{resort.location}</span>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-xl sm:text-2xl font-medium text-white leading-snug mb-2"
                    style={{ color: "#ffffff", fontFamily: "var(--work-font), sans-serif" }}
                  >
                    {resort.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="leading-relaxed line-clamp-3 font-light mb-4"
                    style={{ color: "rgba(255, 255, 255, 0.88)", fontSize: "12.5px" }}
                  >
                    {resort.description}
                  </p>

                  {/* Amenities Checklist Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {resort.amenities.map((amenity, aIdx) => (
                      <span
                        key={aIdx}
                        className="inline-flex items-center gap-1 text-[9px] tracking-wider uppercase font-light text-white/90 bg-black/40 backdrop-blur-xs px-2.5 py-0.5 border border-white/15"
                      >
                        <Sparkles className="w-2.5 h-2.5 text-[#B38E46]" />
                        {amenity}
                      </span>
                    ))}
                  </div>

                  {/* Footer Price & EXPLORE Link */}
                  <div className="pt-4 border-t border-white/20 flex items-center justify-between">
                    <div className="text-[11px] text-white/80 font-medium uppercase tracking-wider">
                      <span>From {resort.price}</span>
                      <span className="text-white/60 font-light text-[10px]"> / night</span>
                    </div>

                    <Link
                      href={resort.href || "/contact"}
                      target={resort.href ? "_blank" : undefined}
                      rel={resort.href ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-white hover:text-[#B38E46] transition-colors duration-200 cursor-pointer uppercase tracking-widest"
                    >
                      <span>EXPLORE</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Indigo Vertical Line Accent at Bottom (Matching Brands Page / Homepage) */}
        <div className="flex justify-center mt-16 md:mt-20">
          <div className="w-[1.5px] h-32 md:h-48 bg-[rgb(25,25,112)]"></div>
        </div>
      </div>
    </section>
  );
}
