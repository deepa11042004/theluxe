"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Calendar,
  Clock,
  MapPin,
  Users,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Plane,
  ShieldCheck,
  PhoneCall,
} from "lucide-react";
import { itineraryData } from "./itineraryData";

export default function ItineraryDetail({ id }: { id?: string }) {
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  // Find the requested itinerary or fall back to the first one (Dubai)
  const currentItinerary =
    itineraryData.find((item) => item.id === id) || itineraryData[0];

  // Dynamically select other itineraries as recommendations
  const recommendations = itineraryData
    .filter((item) => item.id !== currentItinerary.id)
    .slice(0, 3)
    .map((item) => ({
      id: item.id,
      title: item.title,
      duration: item.duration,
      spots: "Available",
      price: "₹1,24,999",
      tag: item.country,
      image: item.image,
    }));

  return (
    <main className="bg-white text-neutral-900 min-h-screen w-full font-sans antialiased select-none pb-24 overflow-x-hidden">
      {/* 1. TOP HEADER & BACK NAVIGATION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-36 mb-6">
        <Link
          href="/itinerary"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-neutral-500 hover:text-[#B38E46] transition-colors duration-200 cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to All Itineraries</span>
        </Link>
      </div>

      {/* 2. CINEMATIC PICTURE COLLAGE GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 h-auto md:h-[480px]">
          {/* Left Vertical Sub-Photos */}
          <div className="hidden md:flex md:col-span-3 flex-col gap-4 h-full">
            <div className="relative flex-1 rounded-2xl md:rounded-3xl overflow-hidden shadow-sm border border-neutral-200/80 group">
              <Image
                src={currentItinerary.images[0] || currentItinerary.image}
                alt={`${currentItinerary.title} detail 1`}
                fill
                sizes="25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="relative flex-1 rounded-2xl md:rounded-3xl overflow-hidden shadow-sm border border-neutral-200/80 group">
              <Image
                src={currentItinerary.images[1] || currentItinerary.image}
                alt={`${currentItinerary.title} detail 2`}
                fill
                sizes="25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Center Main Featured Image */}
          <div className="md:col-span-6 relative h-64 sm:h-80 md:h-full rounded-2xl md:rounded-3xl overflow-hidden shadow-lg border border-neutral-200/80 group">
            <Image
              src={currentItinerary.images[2] || currentItinerary.image}
              alt={`${currentItinerary.title} main showcase`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
            
            {/* Country Badge Overlay */}
            <div className="absolute bottom-6 left-6 z-10 flex items-center gap-2">
              <span className="text-xs font-[Vera] tracking-[0.25em] text-white uppercase px-4 py-1.5 bg-black/40 backdrop-blur-md rounded-full border border-white/20">
                {currentItinerary.country}
              </span>
            </div>
          </div>

          {/* Right Vertical Sub-Photos */}
          <div className="hidden md:flex md:col-span-3 flex-col gap-4 h-full">
            <div className="relative flex-1 rounded-2xl md:rounded-3xl overflow-hidden shadow-sm border border-neutral-200/80 group">
              <Image
                src={currentItinerary.images[3] || currentItinerary.image}
                alt={`${currentItinerary.title} detail 3`}
                fill
                sizes="25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="relative flex-1 rounded-2xl md:rounded-3xl overflow-hidden shadow-sm border border-neutral-200/80 group">
              <Image
                src={currentItinerary.images[4] || currentItinerary.image}
                alt={`${currentItinerary.title} detail 4`}
                fill
                sizes="25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 3. HEADLINE & PARAMETER INFO BLOCK */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-3xl">
          <span className="text-xs font-[Vera] font-bold text-[#B38E46] tracking-[0.3em] uppercase block mb-3">
            Luxury Itinerary — {currentItinerary.country}
          </span>
          <h1 className="text-3xl sm:text-5xl font-[Vera] tracking-tight text-neutral-900 mb-6 leading-tight">
            {currentItinerary.title}
          </h1>

          {/* Parameter Info Chips */}
          <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-neutral-700 font-medium pt-2">
            <div className="flex items-center gap-2 px-4 py-2 bg-neutral-100/80 rounded-full border border-neutral-200/60">
              <Clock className="w-4 h-4 text-[#B38E46]" />
              <span>{currentItinerary.duration}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-neutral-100/80 rounded-full border border-neutral-200/60">
              <Users className="w-4 h-4 text-[#B38E46]" />
              <span>{currentItinerary.groupSize}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-neutral-100/80 rounded-full border border-neutral-200/60">
              <Plane className="w-4 h-4 text-[#B38E46]" />
              <span>
                {currentItinerary.flightsIncl ? "Flights Included" : "Land Package Only"}
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-neutral-100/80 rounded-full border border-neutral-200/60">
              <Sparkles className="w-4 h-4 text-[#B38E46]" />
              <span>{currentItinerary.tourType}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. MAIN CONTENT & STICKY SIDEBAR SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT MAIN COLUMN: OVERVIEW & DAY-BY-DAY SCHEDULE */}
          <div className="lg:col-span-8 space-y-12">
            {/* Overview Summary */}
            <div className="bg-neutral-50/70 rounded-3xl p-6 sm:p-8 border border-neutral-200/70 shadow-xs">
              <h2 className="text-xl font-[Vera] text-neutral-900 mb-4 tracking-wide uppercase">
                Journey Overview
              </h2>
              <p className="text-neutral-700 font-light text-base leading-relaxed tracking-wide">
                {currentItinerary.description}
              </p>

              {/* Highlights Pill Row */}
              <div className="mt-6 pt-6 border-t border-neutral-200/60 flex flex-wrap gap-2">
                {["Luxury Accommodations", "Private Transfers", "Bespoke Dining", "Guided Excursions"].map((highlight, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B38E46] bg-[#B38E46]/10 px-3.5 py-1.5 rounded-full border border-[#B38E46]/20 font-[Vera]"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B38E46]" />
                    {highlight}
                  </span>
                ))}
              </div>
            </div>

            {/* Day-by-Day Schedule Timeline */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-[Vera] text-neutral-900 mb-8 tracking-tight uppercase">
                Day-by-Day Itinerary
              </h2>

              <div className="space-y-4">
                {currentItinerary.days.map((item, index) => {
                  const isOpen = openAccordion === index;
                  return (
                    <motion.div
                      key={index}
                      initial={false}
                      className="border border-neutral-200/80 rounded-2xl overflow-hidden bg-white shadow-xs transition-all duration-300"
                    >
                      <button
                        onClick={() => setOpenAccordion(isOpen ? null : index)}
                        className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-neutral-50/70 transition duration-200 focus:outline-none cursor-pointer"
                      >
                        <div className="flex items-center gap-4 sm:gap-6">
                          <span className="text-xs font-[Vera] font-bold px-3.5 py-1.5 bg-[#B38E46] text-white rounded-lg shrink-0 tracking-widest uppercase">
                            {item.day}
                          </span>
                          <h3 className="text-base sm:text-lg font-[Vera] font-semibold text-neutral-900 tracking-tight">
                            {item.title}
                          </h3>
                        </div>
                        <div className={`w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180 bg-[#B38E46]/10 text-[#B38E46]" : "text-neutral-500"}`}>
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                          >
                            <div className="p-5 sm:p-6 pt-0 border-t border-neutral-100 bg-neutral-50/30">
                              <p className="text-sm sm:text-base text-neutral-700 font-light leading-relaxed tracking-wide pt-4">
                                {item.text}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR: STICKY LUXURY BOOKING & INQUIRY CARD */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/90 shadow-xl space-y-6 relative overflow-hidden">
              {/* Decorative Watermark Overlay */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#B38E46]/5 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-2">
                <span className="text-[10px] font-[Vera] font-bold text-[#B38E46] tracking-[0.25em] uppercase block">
                  Tailored Travel Package
                </span>
                <h3 className="text-2xl font-[Vera] text-neutral-900 tracking-tight">
                  Interested in this itinerary?
                </h3>
              </div>

              <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200/60 flex items-center justify-between">
                <div>
                  <span className="text-xs text-neutral-500 font-medium block">Starting from</span>
                  <span className="text-2xl font-bold font-[Vera] text-neutral-900">₹1,24,999</span>
                  <span className="text-xs text-neutral-500"> / person</span>
                </div>
                <span className="text-xs font-semibold text-[#B38E46] bg-[#B38E46]/10 px-3 py-1 rounded-full border border-[#B38E46]/20 font-[Vera]">
                  {currentItinerary.duration.split("/")[0]}
                </span>
              </div>

              {/* Inclusions List */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-[Vera] font-bold tracking-wider text-neutral-800 uppercase">
                  Package Inclusions
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-sm text-neutral-600 font-light">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#B38E46] shrink-0" />
                    <span>5-Star Luxury Accommodations</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#B38E46] shrink-0" />
                    <span>Private Chauffeur &amp; Airport Transfers</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#B38E46] shrink-0" />
                    <span>Dedicated Member Concierge 24/7</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#B38E46] shrink-0" />
                    <span>Customizable Travel Dates &amp; Upgrades</span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <Link
                  href="/contact"
                  className="w-full flex items-center justify-center gap-2 bg-[#B38E46] hover:bg-[#997734] text-white font-bold text-xs uppercase tracking-widest py-4 rounded-xl transition duration-200 shadow-md cursor-pointer active:scale-95"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Inquire About This Trip</span>
                </Link>

                <Link
                  href="/luxeclub"
                  className="w-full flex items-center justify-center gap-2 bg-neutral-900 hover:bg-black text-white font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl transition duration-200 cursor-pointer active:scale-95 border border-neutral-800"
                >
                  <ShieldCheck className="w-4 h-4 text-[#E5C158]" />
                  <span>Enrol via Luxe Club</span>
                </Link>
              </div>

              <p className="text-[11px] text-center text-neutral-400 font-light pt-2">
                No immediate payment required. Our travel concierges will reach out within 2 hours.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 5. RECOMMENDED TRIPS SECTION */}
      <div className="bg-neutral-50/80 border-t border-neutral-200/60 py-16 md:py-24 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-[Vera] font-bold text-[#B38E46] tracking-[0.3em] uppercase block mb-3">
              Curated Selection
            </span>
            <h2 className="text-3xl sm:text-4xl font-[Vera] tracking-tight text-neutral-900 uppercase">
              Recommended For You
            </h2>
          </div>

          {/* Cards Frame Window */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-12">
            {recommendations.map((rec) => (
              <Link
                href={`/itinerary/${rec.id}`}
                key={rec.id}
                className="bg-white border border-neutral-200/80 rounded-3xl shadow-sm overflow-hidden flex flex-col justify-between group cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div>
                  {/* Dynamic Thumbnail Visual Image Element */}
                  <div className="relative aspect-16/10 w-full bg-neutral-100 overflow-hidden">
                    <Image
                      src={rec.image}
                      alt={rec.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute top-4 left-4 text-[10px] font-[Vera] font-bold uppercase tracking-widest bg-[#B38E46] text-white px-3 py-1.5 rounded-full shadow-md">
                      {rec.tag}
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2">
                      <span>{rec.duration}</span>
                      <span>•</span>
                      <span className="text-[#B38E46] font-semibold">
                        {rec.spots}
                      </span>
                    </div>
                    <h3 className="text-lg font-[Vera] font-semibold text-neutral-900 leading-snug group-hover:text-[#B38E46] transition-colors">
                      {rec.title}
                    </h3>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-neutral-100 flex items-center justify-between mt-4">
                  <div>
                    <span className="text-[10px] text-neutral-400 uppercase block tracking-wider font-medium">
                      From
                    </span>
                    <span className="text-xl font-bold font-[Vera] text-neutral-900">
                      {rec.price}
                    </span>
                    <span className="text-xs text-neutral-500 font-light">
                      {" "}
                      /person
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#B38E46] text-white flex items-center justify-center group-hover:bg-[#997734] transition-colors shadow-md">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/itinerary"
              className="inline-flex items-center gap-2 bg-neutral-900 hover:bg-black text-white font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-full transition duration-300 shadow-md active:scale-95 cursor-pointer"
            >
              <span>View All Itineraries</span>
              <ArrowRight className="w-4 h-4 text-[#E5C158]" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
