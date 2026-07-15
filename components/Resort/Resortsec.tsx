"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Search, X } from "lucide-react";

// Filter Tags Categories matching the second screenshot structure
const CATEGORIES = [
  "ALL",
  "EXPERIENCE",
  "NATURE",
  "CULTURE",
  "HOSPITALITY",
  "TRAVEL TIPS",
];

// Mock Data
const RESORT_BLOGS = [
  {
    id: 1,
    title: "Safety in the state of Oaxaca : travel with peace of mind",
    description:
      "Everything you need to know about safety in Oaxaca. Cartel awareness and nightlife tips in Puerto Escondido for a serene journey with Nomádico.",
    image:
      "https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmFjYXRpb258ZW58MHx8MHx8fDA%3D",
    category: "TRAVEL TIPS",
  },
  {
    id: 2,
    title: "Playa Bacocho : the wild and preserved jewel of Puerto Escondido",
    description:
      "Discover Playa Bacocho with a sense of adventure. Between untouched nature and turtle releases, come recharge your batteries at Playa Bacocho, Oaxaca's haven of peace.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    category: "NATURE",
  },
  {
    id: 3,
    title: "The Treasure of Monte Albán : Mysteries of Tomb No. 7",
    description:
      "Discover Tomb No. 7 and the treasure of Monte Albán. Between gold and precious stones, explore the fascinating history of these ruins in the heart of Oaxaca.",
    image:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80",
    category: "CULTURE",
  },
  {
    id: 4,
    title: "Oaxacan Cuisine : A Journey Through Mole and Mezcal",
    description:
      "Dive into the rich flavors of Oaxaca. From complex mole sauces to artisanal mezcal tastings, discover why this region is considered the culinary capital of Mexico.",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80",
    category: "EXPERIENCE",
  },
  {
    id: 5,
    title: "Surfing in Mazunte : Waves for Every Level",
    description:
      "Catch the perfect wave in Mazunte. Whether you're a beginner looking for lessons or a pro seeking challenging breaks, the Pacific coast offers an unforgettable surfing experience.",
    image:
      "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=800&q=80",
    category: "EXPERIENCE",
  },
  {
    id: 6,
    title: "Yoga Retreats in Huatulco : Find Your Inner Peace",
    description:
      "Reconnect with yourself amidst the lush jungles and pristine beaches of Huatulco. Explore top yoga retreats that offer meditation, holistic healing, and serene ocean views.",
    image:
      "https://images.unsplash.com/photo-1475503572774-15a45e5d60b9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHZhY2F0aW9ufGVufDB8fDB8fHww",
    category: "HOSPITALITY",
  },
];

export default function ResortSec() {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Filtering Logic
  const filteredBlogs = RESORT_BLOGS.filter((blog) => {
    let matchesCategory = true;
    if (activeCategory === "ALL") matchesCategory = true;
    else matchesCategory = blog.category === activeCategory;

    let matchesSearch = true;
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      matchesSearch =
        blog.title.toLowerCase().includes(query) ||
        blog.description.toLowerCase().includes(query);
    }

    return matchesCategory && matchesSearch;
  });

  return (
    <section className="bg-white text-black py-24 px-6 sm:px-12 relative overflow-hidden w-full select-none">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* 1. FILTERING CATEGORY NAVIGATION ROW */}
        <div className="flex flex-wrap gap-3 items-center justify-center mb-16 border-b border-neutral-100 pb-8">
          {CATEGORIES.map((cat) => {
            const isSelected = cat === activeCategory;
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setSearchQuery(""); // Clear search when switching categories
                }}
                className={`text-xs font-medium tracking-widest uppercase px-5 py-2.5 rounded-full border transition-all duration-300 active:scale-95
                  ${
                    isSelected
                      ? "bg-black text-white border-black shadow-xs"
                      : "bg-transparent text-neutral-600 border-dashed border-neutral-400 hover:text-black hover:border-black"
                  }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* 2. SEARCH BAR */}
        <div className="max-w-md mx-auto mb-12 relative">
          <div className="relative flex items-center bg-neutral-50 border border-neutral-200 focus-within:border-neutral-900 rounded-full px-5 py-3 transition-all duration-300 shadow-xs">
            <Search className="w-4 h-4 text-neutral-400 mr-3 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search resorts..."
              className="bg-transparent text-sm text-neutral-950 placeholder-neutral-400 focus:outline-none w-full font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="p-1 hover:bg-neutral-200 rounded-full transition-colors shrink-0"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5 text-neutral-500" />
              </button>
            )}
          </div>
        </div>

        {/* 3. BLOG CARDS GRID WINDOW */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 items-stretch"
        >
          <AnimatePresence mode="popLayout">
            {filteredBlogs.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="col-span-full py-20 text-center flex flex-col items-center justify-center text-neutral-500"
              >
                <Search className="w-10 h-10 text-neutral-300 mb-4" />
                <p className="text-xl font-bold text-neutral-900 mb-2">No resorts found</p>
                <p className="text-sm text-neutral-400 font-light max-w-sm mx-auto leading-relaxed">
                  We couldn&apos;t find any results matching &ldquo;{searchQuery}&rdquo;. Try checking for typos or searching for a different keyword.
                </p>
              </motion.div>
            )}

            {filteredBlogs.map((blog) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.96, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ type: "spring", stiffness: 180, damping: 22 }}
                key={blog.id}
                className="flex flex-col justify-between items-start group cursor-pointer w-full bg-white rounded-3xl"
              >
                {/* Media Image Area Container */}
                <div className="w-full relative aspect-4/3 rounded-3xl overflow-hidden shadow-xs mb-6 bg-neutral-100">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    sizes="(max-w-768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out brightness-[0.96]"
                  />
                </div>

                {/* Title and Content Description Wrapper */}
                <div className="grow mb-6">
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight text-neutral-900 mb-3 group-hover:text-neutral-600 transition-colors leading-snug">
                    {blog.title}
                  </h3>
                  <p className="text-neutral-500 font-light text-sm leading-relaxed tracking-wide line-clamp-3">
                    {blog.description}
                  </p>
                </div>

                {/* 3. Footer Action Call (READ THE PAGE -> Style matching Screenshot 3) */}
                <div className="w-full pt-2 border-t border-transparent">
                  <div className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-neutral-900 border-b-2 border-dotted border-neutral-300 pb-1 group-hover:border-neutral-900 transition-colors">
                    <span>Read The Page</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
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
