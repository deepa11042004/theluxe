"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Search, X, MapPin, Star, Sparkles, CheckCircle2 } from "lucide-react";

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
    title: "The Leela Palace Trail",
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
    <section className="bg-white text-neutral-900 py-16 md:py-24 px-4 sm:px-8 lg:px-12 relative overflow-hidden w-full select-none">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* 1. CATEGORY NAVIGATION FILTER TABS */}
        <div className="flex flex-wrap gap-2.5 sm:gap-3 items-center justify-center mb-10 pb-6">
          {CATEGORIES.map((cat) => {
            const isSelected = cat === activeCategory;
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setSearchQuery("");
                }}
                className={`text-[11px] sm:text-xs font-[Vera] font-bold tracking-widest uppercase px-5 py-2.5 rounded-full border transition-all duration-300 active:scale-95 cursor-pointer
                  ${
                    isSelected
                      ? "bg-[#B38E46] text-white border-[#B38E46] shadow-md"
                      : "bg-transparent text-neutral-600 border-neutral-300 hover:text-neutral-900 hover:border-neutral-800"
                  }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* 2. SEARCH BAR */}
        <div className="max-w-md mx-auto mb-16 relative">
          <div className="relative flex items-center bg-neutral-50/80 border border-neutral-200 focus-within:border-[#B38E46] rounded-full px-5 py-3.5 transition-all duration-300 shadow-xs">
            <Search className="w-4 h-4 text-[#B38E46] mr-3 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search resorts by name, location, or experience..."
              className="bg-transparent text-xs sm:text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none w-full font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="p-1 hover:bg-neutral-200 rounded-full transition-colors shrink-0 cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5 text-neutral-500" />
              </button>
            )}
          </div>
        </div>

        {/* 3. RESORTS GRID CONTAINER */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 items-stretch"
        >
          <AnimatePresence mode="popLayout">
            {filteredResorts.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="col-span-full py-20 text-center flex flex-col items-center justify-center text-neutral-500"
              >
                <Search className="w-10 h-10 text-[#B38E46] mb-4 opacity-60" />
                <p className="text-xl font-[Vera] font-bold text-neutral-900 mb-2">No resorts match your search</p>
                <p className="text-sm text-neutral-400 font-light max-w-sm mx-auto leading-relaxed">
                  We couldn&apos;t find any properties matching &ldquo;{searchQuery}&rdquo;. Try checking for typos or clear your search filter.
                </p>
              </motion.div>
            )}

            {filteredResorts.map((resort) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.96, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ type: "spring", stiffness: 180, damping: 22 }}
                key={resort.id}
                className="flex flex-col justify-between items-start group cursor-pointer w-full bg-white rounded-3xl border border-neutral-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden"
              >
                {/* Media Image Area Container */}
                <div className="w-full relative aspect-4/3 rounded-t-3xl overflow-hidden bg-neutral-100">
                  <img
                    src={resort.image}
                    alt={resort.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Category Pill Tag */}
                  <span className="absolute top-4 left-4 text-[10px] font-[Vera] font-bold uppercase tracking-widest bg-[#B38E46] text-white px-3 py-1.5 rounded-full shadow-md z-10">
                    {resort.category.replace("&", "•")}
                  </span>

                  {/* Rating Tag */}
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 z-10 shadow-sm">
                    <Star className="w-3.5 h-3.5 fill-[#E5C158] text-[#E5C158]" />
                    <span>{resort.rating}</span>
                  </div>
                </div>

                {/* Content Block */}
                <div className="p-6 grow flex flex-col justify-between w-full">
                  <div>
                    {/* Location Badge */}
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-2 font-[Vera]">
                      <MapPin className="w-3.5 h-3.5 text-[#B38E46] shrink-0" />
                      <span>{resort.location}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-[Vera] font-bold tracking-tight text-neutral-900 mb-3 group-hover:text-[#B38E46] transition-colors leading-snug">
                      {resort.title}
                    </h3>

                    {/* Description */}
                    <p className="text-neutral-600 font-light text-sm leading-relaxed tracking-wide line-clamp-3 mb-4">
                      {resort.description}
                    </p>

                    {/* Amenities Checklist */}
                    <div className="flex flex-wrap gap-1.5 pt-2 mb-4">
                      {resort.amenities.map((amenity, aIdx) => (
                        <span
                          key={aIdx}
                          className="inline-flex items-center gap-1 text-[11px] font-medium text-neutral-700 bg-neutral-100 px-2.5 py-1 rounded-md"
                        >
                          <Sparkles className="w-3 h-3 text-[#B38E46]" />
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer Price & CTA */}
                  <div className="w-full pt-4 border-t border-neutral-100 flex items-center justify-between mt-2">
                    <div>
                      <span className="text-[10px] text-neutral-400 uppercase block tracking-wider font-medium">
                        Starting from
                      </span>
                      <span className="text-lg font-bold font-[Vera] text-neutral-900">
                        {resort.price}
                      </span>
                      <span className="text-xs text-neutral-500 font-light"> / night</span>
                    </div>

                    <Link
                      href={resort.href || "/contact"}
                      target={resort.href ? "_blank" : undefined}
                      rel={resort.href ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-1.5 text-xs font-[Vera] font-bold uppercase tracking-wider text-[#B38E46] group-hover:text-[#997734] transition-colors"
                    >
                      <span>Explore Resort</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
