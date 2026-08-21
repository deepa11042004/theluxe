"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Search, X } from "lucide-react";

// Types
export interface ExperienceItem {
  id: number;
  location: string;
  title: string;
  description: string;
  image: string;
  link: string;
  category: "national" | "international";
}

// Mock Data
const EXPERIENCES: ExperienceItem[] = [
  // National Experiences
  {
    id: 1,
    location: "Ranthambore, Rajasthan, India",
    title: "Aman-i-Khas",
    description:
      "Experience the raw wilderness of Ranthambore National Park in ultimate luxury, featuring air-conditioned tents and guided safari excursions.",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&auto=format&fit=crop&q=80",
    link: "https://www.aman.com/resorts/aman-i-khas",
    category: "national",
  },
  {
    id: 2,
    location: "Udaipur, Rajasthan, India",
    title: "Taj Lake Palace",
    description:
      "A majestic 18th-century palace floating on Lake Pichola, offering legendary hospitality and unparalleled romantic views of the City Palace.",
    image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=800&auto=format&fit=crop&q=80",
    link: "https://www.tajhotels.com/en-in/taj/taj-lake-palace-udaipur/",
    category: "national",
  },
  {
    id: 3,
    location: "Agra, Uttar Pradesh, India",
    title: "The Oberoi Amarvilas",
    description:
      "Wake up to breathtaking, uninterrupted views of the Taj Mahal from your private balcony, wrapped in Moorish and Mughal architectural luxury.",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&auto=format&fit=crop&q=80",
    link: "https://www.oberoihotels.com/hotels-in-agra-amarvilas-resort/",
    category: "national",
  },
  {
    id: 4,
    location: "Kabini, Karnataka, India",
    title: "Evolve Back",
    description:
      "Inspired by local Kuruba tribal design, this safari resort offers a sweeping view of the Kabini River and unparalleled wildlife sightings in the wild.",
    image: "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=800&auto=format&fit=crop&q=80",
    link: "https://www.evolveback.com/kabini/",
    category: "national",
  },
  {
    id: 5,
    location: "Kumarakom, Kerala, India",
    title: "Kumarakom Lake Resort",
    description:
      "Reconnect with nature along the pristine backwaters of Kerala, featuring luxury heritage villas reconstructed from traditional ancestral homes.",
    image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?w=800&auto=format&fit=crop&q=80",
    link: "https://www.kumarakomlakeresort.in/",
    category: "national",
  },
  {
    id: 6,
    location: "Shimla, Himachal Pradesh, India",
    title: "Wildflower Hall",
    description:
      "Located 8,250 feet above sea level in the Himalayas, experience pristine mountain air, pine forests, and an outdoor heated whirlpool with panoramic valley views.",
    image: "https://images.unsplash.com/photo-1486916856992-e4db22c8df33?w=800&auto=format&fit=crop&q=80",
    link: "https://www.oberoihotels.com/hotels-in-shimla-wfh/",
    category: "national",
  },

  // International Experiences
  {
    id: 7,
    location: "Noonu Atoll, Maldives",
    title: "Soneva Jani",
    description:
      "A sanctuary of overwater villas with retractable roofs to stargaze from bed and private water slides into the turquoise lagoon.",
    image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&auto=format&fit=crop&q=80",
    link: "https://soneva.com/resorts/soneva-jani/",
    category: "international",
  },
  {
    id: 8,
    location: "Canyon Point, Utah, USA",
    title: "Amangiri",
    description:
      "Tucked into a protected valley in the American Southwest, this modernist oasis blends seamlessly with the red-rock desert landscape.",
    image: "https://images.unsplash.com/photo-1486496146582-9ffcd0b2b2b7?w=800&auto=format&fit=crop&q=80",
    link: "https://www.aman.com/resorts/amangiri",
    category: "international",
  },
  {
    id: 9,
    location: "Lake Como, Italy",
    title: "Villa d'Este",
    description:
      "A legendary hotel of timeless elegance, surrounded by 25 acres of manicured gardens, overlooking the serene waters of Lake Como.",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop&q=80",
    link: "https://www.villadeste.com/",
    category: "international",
  },
  {
    id: 10,
    location: "Kyoto, Japan",
    title: "Hoshinoya Kyoto",
    description:
      "Accessible by a tranquil boat ride down the Oi River, this historic riverside ryokan offers a perfect blend of Japanese tradition and modern luxury.",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=800&auto=format&fit=crop&q=80",
    link: "https://hoshinoya.com/kyoto/en/",
    category: "international",
  },
  {
    id: 11,
    location: "Sabi Sand, South Africa",
    title: "Singita Boulders Lodge",
    description:
      "An organic masterpiece resting along the banks of the Sand River, providing front-row seats to frequent big game sightings in the bush.",
    image: "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?w=800&auto=format&fit=crop&q=80",
    link: "https://singita.com/lodge/singita-boulders-lodge/",
    category: "international",
  },
  {
    id: 12,
    location: "Santorini, Greece",
    title: "Canaves Oia Suites",
    description:
      "Carved into the volcanic cliffside, enjoy panoramic vistas of the Aegean Sea and the caldera from your private infinity plunge pool.",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&auto=format&fit=crop&q=80",
    link: "https://canaves.com/canaves-oia-suites/",
    category: "international",
  },
];

interface ExperiencesecProps {
  type?: "all" | "national" | "international";
}

export default function Experiencesec({ type = "all" }: ExperiencesecProps) {
  const [activeCategory, setActiveCategory] = useState<"ALL" | "NATIONAL" | "INTERNATIONAL">(
    type === "all" ? "ALL" : type === "national" ? "NATIONAL" : "INTERNATIONAL"
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Filtering Logic
  const filteredExperiences = EXPERIENCES.filter((exp) => {
    let matchesCategory = true;
    if (activeCategory === "ALL") matchesCategory = true;
    else if (activeCategory === "NATIONAL") matchesCategory = exp.category === "national";
    else if (activeCategory === "INTERNATIONAL") matchesCategory = exp.category === "international";

    let matchesSearch = true;
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      matchesSearch =
        exp.title.toLowerCase().includes(query) ||
        exp.location.toLowerCase().includes(query) ||
        exp.description.toLowerCase().includes(query);
    }

    return matchesCategory && matchesSearch;
  });

  return (
    <section className="bg-white text-black py-24 px-6 sm:px-12 relative overflow-hidden w-full select-none">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* 1. FILTERING CATEGORY NAVIGATION ROW (Only visible on main /experiences route) */}
        {type === "all" && (
          <div className="flex flex-wrap gap-3 items-center justify-center mb-16 border-b border-neutral-100 pb-8">
            {(["ALL", "NATIONAL", "INTERNATIONAL"] as const).map((cat) => {
              const isSelected = cat === activeCategory;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setSearchQuery(""); // Clear search when switching categories
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
        )}

        {/* 2. SEARCH BAR */}
        <div className="max-w-md mx-auto mb-12 relative">
          <div className="relative flex items-center bg-neutral-50/80 border border-neutral-200 focus-within:border-[#B38E46] rounded-full px-5 py-3.5 transition-all duration-300 shadow-xs">
            <Search className="w-4 h-4 text-[#B38E46] mr-3 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, location, or details..."
              className="bg-transparent text-xs sm:text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none w-full font-medium"
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

        {/* 3. CARDS GRID */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 items-stretch"
        >
          <AnimatePresence mode="popLayout">
            {filteredExperiences.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="col-span-full py-20 text-center flex flex-col items-center justify-center text-neutral-500"
              >
                <Search className="w-10 h-10 text-[#B38E46] mb-4 opacity-60" />
                <p className="text-xl font-[Vera] font-bold text-neutral-900 mb-2">No destinations found</p>
                <p className="text-sm text-neutral-400 font-light max-w-sm mx-auto leading-relaxed">
                  We couldn&apos;t find any results matching &ldquo;{searchQuery}&rdquo;. Try checking for typos or searching for a different keyword.
                </p>
              </motion.div>
            )}

            {filteredExperiences.map((exp) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.96, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ type: "spring", stiffness: 180, damping: 22 }}
                key={exp.id}
                className="flex flex-col justify-between items-start group cursor-pointer w-full bg-white rounded-3xl border border-neutral-200/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-500 overflow-hidden"
              >
                {/* Media Image Area Container */}
                <div className="w-full relative aspect-4/3 rounded-t-3xl overflow-hidden bg-neutral-100 shrink-0">
                  <Image
                    src={exp.image}
                    alt={`${exp.title} - ${exp.location}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Content Block */}
                <div className="p-6 grow flex flex-col justify-between w-full">
                  <div>
                    {/* Location Name */}
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#B38E46] uppercase tracking-widest mb-2 font-[Vera]">
                      <span>{exp.location}</span>
                    </div>
                    
                    {/* Property Name */}
                    <h3 className="text-xl font-[Vera] font-bold tracking-tight text-neutral-900 mb-3 group-hover:text-[#B38E46] transition-colors leading-snug">
                      {exp.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-neutral-500 font-light text-sm leading-relaxed tracking-wide line-clamp-3 mb-4">
                      {exp.description}
                    </p>
                  </div>

                  {/* 3. Footer Action Call ("Explore Now" matching Resortsec style) */}
                  <div className="w-full pt-4 border-t border-neutral-100 flex items-center justify-between mt-2">
                    <Link
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-[Vera] font-bold uppercase tracking-wider text-[#B38E46] group-hover:text-[#997734] transition-colors cursor-pointer"
                    >
                      <span>Explore Now</span>
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
