/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";

interface ItineraryItem {
  id: string;
  slug?: string;
  country: string;
  title: string;
  description: string;
  duration: string;
  image: string;
}

const fallbackItineraries: ItineraryItem[] = [
  {
    id: "europe-for-all-winter-highlights",
    country: "Europe (France, Belgium, Switzerland)",
    title: "Europe for All (Winter Edition)",
    description:
      "Experience the pinnacle of European winter elegance from Paris to Lucerne and Zurich with private scenic rail journeys.",
    duration: "7 Nights / 8 Days",
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "australian-highlights",
    country: "Australia",
    title: "Australian Highlights — Sydney & Melbourne",
    description:
      "Iconic Opera House harbor sails, Great Ocean Road scenic drives, and world-class Yarra Valley vineyard tours.",
    duration: "6 Nights / 7 Days",
    image:
      "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "japan-discovery-tokyo-kyoto-osaka",
    country: "Japan",
    title: "Japan Discovery — Tokyo, Kyoto & Osaka",
    description:
      "Shinkansen bullet trains, serene Arashiyama bamboo groves, golden temples, and neon-lit Dotonbori culinary walks.",
    duration: "6 Nights / 7 Days",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop",
  },
];

interface CardProps {
  item: ItineraryItem;
  index: number;
}

function ItineraryCard({ item, index }: CardProps) {
  const targetId = item.slug || item.id;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: index * 0.08 }}
      className="group relative h-[460px] w-full bg-black border-0 rounded-sm overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer"
    >
      {/* Background Image */}
      <Image
        src={item.image}
        alt={item.title}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
      />

      {/* Gradient Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.65) 40%, rgba(0,0,0,0) 75%)",
        }}
      />

      {/* Country Badge at Top */}
      <div className="absolute top-4 left-4 z-10">
        <span className="bg-black/60 backdrop-blur-md text-white text-[10px] uppercase tracking-wider px-3 py-1.5 border border-white/20 rounded-sm">
          {item.country}
        </span>
      </div>

      {/* Body Overlayed */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end text-white z-10">
        <div className="text-[10px] text-[#B38E46] uppercase tracking-widest font-medium mb-1.5 flex items-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-[#B38E46]" />
          <span>{item.duration}</span>
        </div>

        <h3 className="text-xl font-serif font-medium text-white leading-snug mb-2 group-hover:text-[#B38E46] transition-colors duration-200">
          {item.title}
        </h3>

        <p className="leading-relaxed line-clamp-2 font-light mb-4 text-white/80 text-xs">
          {item.description}
        </p>

        <div className="pt-4 border-t border-white/20 flex items-center justify-between">
          <div className="text-[11px] text-white/80 font-medium uppercase tracking-wider">
            {item.duration}
          </div>

          <Link
            href={`/itinerary/${targetId}`}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-white hover:text-[#B38E46] transition-colors duration-200 cursor-pointer uppercase tracking-widest"
          >
            <span>EXPLORE</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export default function Itinerary() {
  const [itinerariesList, setItinerariesList] = useState<ItineraryItem[]>(fallbackItineraries);

  useEffect(() => {
    async function fetchItineraries() {
      try {
        const res = await fetch("/api/v1/itineraries?limit=6");
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const dbItems: ItineraryItem[] = json.data.map((itin: any) => {
            const primaryImg =
              itin.hero_image ||
              itin.images?.find((img: any) => img.is_primary)?.image_url ||
              itin.images?.[0]?.image_url ||
              "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop";

            return {
              id: itin.id,
              slug: itin.slug,
              country: itin.country || itin.region || "International",
              title: itin.title || itin.name,
              description: itin.short_description || itin.overview || "Exclusive luxury travel itinerary.",
              duration: itin.duration || `${itin.nights || 1} Nights / ${itin.days || 1} Days`,
              image: primaryImg,
            };
          });

          setItinerariesList(dbItems);
        }
      } catch (err) {
        console.error("Failed to fetch homepage itineraries:", err);
      }
    }
    fetchItineraries();
  }, []);

  return (
    <section className="bg-white py-24 border-t border-gray-100">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center flex flex-col items-center mb-10 md:mb-14">
          <div className="text-xs tracking-[0.4em] text-[#B38E46] uppercase font-semibold mb-3">
            EXPERIENCE LUXURY, ADVENTURE &amp; CULTURE
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif tracking-tight text-black mb-4">
            Exclusive Itineraries
          </h2>
          <p className="text-xs md:text-sm max-w-xl leading-relaxed text-neutral-600">
            Thoughtfully curated luxury travel plans designed for unforgettable memories, seamless logistics, and VIP access.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {itinerariesList.map((item, index) => (
            <ItineraryCard
              key={item.slug || item.id}
              item={item}
              index={index}
            />
          ))}
        </div>

        {/* SEE MORE ITINERARIES Button */}
        <div className="flex justify-center mt-12">
          <Link
            href="/itinerary"
            className="border border-[#B38E46] text-[#B38E46] px-8 py-3 text-xs tracking-[0.25em] font-medium uppercase hover:bg-[#B38E46] hover:text-white transition-all duration-300 rounded-sm cursor-pointer shadow-2xs"
          >
            SEE ALL ITINERARIES
          </Link>
        </div>
      </div>
    </section>
  );
}
