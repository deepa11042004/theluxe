"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

// Mock activities data with varying dimensions to create the staggered masonry layout
const ACTIVITY_COLUMNS = [
  [
    {
      id: 1,
      title: "Golfing Getaways",
      image:
        "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=800&q=80",
      aspect: "aspect-[3/4]",
    },
    {
      id: 2,
      title: "Surfing Adventures",
      image:
        "https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=800&q=80",
      aspect: "aspect-square",
    },
    {
      id: 3,
      title: "Hot Air Ballooning",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      aspect: "aspect-[3/4]",
    },
  ],
  [
    {
      id: 4,
      title: "Waterfall Ziplining",
      image:
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
      aspect: "aspect-[4/5]",
    },
    {
      id: 5,
      title: "Cliff Diving",
      image:
        "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=800&q=80",
      aspect: "aspect-[3/4]",
    },
    {
      id: 6,
      title: "Deep Sea Scuba",
      image:
        "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
      aspect: "aspect-square",
    },
  ],
  [
    {
      id: 7,
      title: "Forest Campfires",
      image:
        "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80",
      aspect: "aspect-square",
    },
    {
      id: 8,
      title: "Winter Tundra Treks",
      image:
        "https://images.unsplash.com/photo-1483168527879-c66136b56105?auto=format&fit=crop&w=800&q=80",
      aspect: "aspect-[4/5]",
    },
    {
      id: 9,
      title: "Alpine Cable Cars",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      aspect: "aspect-[3/4]",
    },
  ],
];

// Animation presets for standard scroll entries
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 18 },
  },
};

export default function Activities() {
  return (
    <section className="bg-white text-black py-24 px-4 sm:px-6 lg:px-8 w-full overflow-hidden select-none">
      <div className="max-w-7xl mx-auto">
        {/* 1. Header Block with dynamic details matching image text structure */}
        <div className="text-center flex flex-col items-center mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-neutral-900 backdrop-blur-md rounded-full px-4 py-1.5 text-xs text-white font-medium tracking-wider uppercase mb-5"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            Explore 200+ Experiences
          </motion.div>

          <h2 className="text-3xl md:text-8xl font-[Vera] tracking-tight text-neutral-900 mb-5 max-w-2xl">
            Good Reasons to Choose Us
          </h2>

          <p className="text-neutral-600 font-medium text-lg sm:text-sm md:text-base max-w-2xl leading-relaxed">
            We believe in responsible tourism and are committed to sustainable
            travel practices. Our partnerships with eco-friendly resorts ensure
            your luxury holiday positively impacts destinations.
          </p>
        </div>

        {/* 2. Staggered Bento Layout System */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start"
        >
          {ACTIVITY_COLUMNS.map((column, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-6 w-full">
              {column.map((activity) => (
                <motion.div
                  key={activity.id}
                  variants={itemVariants}
                  whileHover={{ y: -6 }}
                  className={`relative w-full ${activity.aspect} rounded-2xl overflow-hidden shadow-sm bg-neutral-200 group cursor-pointer`}
                >
                  {/* Activity Image Frame */}
                  <Image
                    src={activity.image}
                    alt={activity.title}
                    fill
                    sizes="(max-w-640px) 100vw, (max-w-1024px) 50vw, 33vw"
                    className="object-cover brightness-[0.93] group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />

                  {/* Clean Contextual Lower Title Mask overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <span className="text-white font-sans text-sm font-semibold tracking-wide uppercase">
                      {activity.title}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
