"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
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
  MessageSquare,
  Star,
} from "lucide-react";
import { itineraryData } from "./itineraryData";

export default function ItineraryDetail({ id }: { id?: string }) {
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  // Find the requested itinerary or fall back to the first one
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
      country: item.country,
      price: "₹1,24,999",
      image: item.image,
      description: item.description,
    }));

  return (
    <main className="bg-[#F8F9FA] text-neutral-900 min-h-screen w-full font-sans antialiased select-none pb-24 overflow-x-hidden">
      
      {/* 1. TOP HEADER & BACK NAVIGATION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-36 mb-6">
        <Link
          href="/itinerary"
          className="inline-flex items-center gap-2.5 text-xs font-medium tracking-[0.25em] uppercase text-[#B38E46] hover:text-black transition-colors duration-300 cursor-pointer group px-4 py-2 bg-white/80 border border-[#B38E46]/30 rounded-sm shadow-2xs"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1.5" />
          <span>Back to All Itineraries</span>
        </Link>
      </div>

      {/* 2. ARCHITECTURAL PICTURE GALLERY GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 h-auto md:h-[480px]">
          
          {/* Left Vertical Sub-Photos */}
          <div className="hidden md:flex md:col-span-3 flex-col gap-3 sm:gap-4 h-full">
            <div className="relative flex-1 rounded-sm overflow-hidden border border-neutral-200/80 group cursor-pointer bg-black">
              <Image
                src={currentItinerary.images[0] || currentItinerary.image}
                alt={`${currentItinerary.title} detail 1`}
                fill
                sizes="25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
              />
            </div>
            <div className="relative flex-1 rounded-sm overflow-hidden border border-neutral-200/80 group cursor-pointer bg-black">
              <Image
                src={currentItinerary.images[1] || currentItinerary.image}
                alt={`${currentItinerary.title} detail 2`}
                fill
                sizes="25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
              />
            </div>
          </div>

          {/* Center Main Featured Image */}
          <div className="md:col-span-6 relative h-72 sm:h-96 md:h-full rounded-sm overflow-hidden border border-neutral-200/80 group cursor-pointer bg-black">
            <Image
              src={currentItinerary.images[2] || currentItinerary.image}
              alt={`${currentItinerary.title} main showcase`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
            
            {/* Country Badge & Rating Badge Overlay */}
            <div className="absolute bottom-6 left-6 right-6 z-10 flex items-center justify-between">
              <span className="bg-black/50 backdrop-blur-md text-white text-[10px] tracking-[0.25em] uppercase font-light px-3.5 py-1.5 border border-white/20 rounded-sm">
                {currentItinerary.country}
              </span>
              <div className="bg-black/50 backdrop-blur-md text-white text-xs font-light tracking-wider px-3 py-1 border border-white/20 rounded-sm flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 fill-[#E5C158] text-[#E5C158]" />
                <span>4.9</span>
              </div>
            </div>
          </div>

          {/* Right Vertical Sub-Photos */}
          <div className="hidden md:flex md:col-span-3 flex-col gap-3 sm:gap-4 h-full">
            <div className="relative flex-1 rounded-sm overflow-hidden border border-neutral-200/80 group cursor-pointer bg-black">
              <Image
                src={currentItinerary.images[3] || currentItinerary.image}
                alt={`${currentItinerary.title} detail 3`}
                fill
                sizes="25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
              />
            </div>
            <div className="relative flex-1 rounded-sm overflow-hidden border border-neutral-200/80 group cursor-pointer bg-black">
              <Image
                src={currentItinerary.images[4] || currentItinerary.image}
                alt={`${currentItinerary.title} detail 4`}
                fill
                sizes="25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
              />
            </div>
          </div>

        </div>
      </div>

      {/* 3. HEADLINE & PARAMETER INFO BLOCK */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-4xl">
          <div className="text-xs tracking-[0.4em] text-[#B38E46] uppercase font-medium mb-3">
            LUXURY ITINERARY • {currentItinerary.country.toUpperCase()}
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif tracking-tight text-neutral-900 mb-6 leading-[1.1]">
            {currentItinerary.title}
          </h1>

          {/* Parameter Info Chips with Rounded Borders */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs text-neutral-900 font-light tracking-wide uppercase pt-1">
            <div className="flex items-center gap-2 px-4 py-2 bg-white border border-[#B38E46]/40 rounded-sm shadow-2xs">
              <Clock className="w-3.5 h-3.5 text-[#B38E46]" />
              <span>{currentItinerary.duration}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white border border-[#B38E46]/40 rounded-sm shadow-2xs">
              <Users className="w-3.5 h-3.5 text-[#B38E46]" />
              <span>{currentItinerary.groupSize}</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white border border-[#B38E46]/40 rounded-sm shadow-2xs">
              <Plane className="w-3.5 h-3.5 text-[#B38E46]" />
              <span>
                {currentItinerary.flightsIncl ? "FLIGHTS INCLUDED" : "LAND PACKAGE ONLY"}
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white border border-[#B38E46]/40 rounded-sm shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#B38E46]" />
              <span>{currentItinerary.tourType}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. MAIN CONTENT & STICKY SIDEBAR SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* LEFT MAIN COLUMN: OVERVIEW & DAY-BY-DAY SCHEDULE */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Overview Summary */}
            <div className="bg-white rounded-sm p-6 sm:p-8 border border-neutral-200/90 shadow-2xs">
              <div className="text-xs tracking-[0.25em] font-medium text-[#B38E46] uppercase mb-2">
                JOURNEY OVERVIEW
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif tracking-tight text-neutral-900 mb-4 leading-snug">
                Curated Luxury Experience
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-neutral-600 font-light tracking-wide">
                {currentItinerary.description}
              </p>

              {/* Highlights Pill Row with Rounded Borders */}
              <div className="mt-8 pt-6 border-t border-neutral-100 flex flex-wrap gap-2">
                {[
                  "5-Star Luxury Accommodations",
                  "Private Chauffeur & Transfers",
                  "Bespoke Dining Experiences",
                  "Personal Concierge 24/7",
                ].map((highlight, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 text-[10px] tracking-wider uppercase font-light text-neutral-800 bg-[#F8F9FA] px-3.5 py-1.5 border border-[#B38E46]/30 rounded-sm"
                  >
                    <Sparkles className="w-3 h-3 text-[#B38E46]" />
                    {highlight}
                  </span>
                ))}
              </div>
            </div>

            {/* Day-by-Day Schedule Timeline */}
            <div>
              <div className="text-xs tracking-[0.25em] font-medium text-[#B38E46] uppercase mb-2">
                SCHEDULE TIMELINE
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif tracking-tight text-neutral-900 mb-8 leading-snug">
                Day-by-Day Itinerary
              </h2>

              <div className="space-y-4">
                {currentItinerary.days.map((item, index) => {
                  const isOpen = openAccordion === index;
                  return (
                    <motion.div
                      key={index}
                      initial={false}
                      className="border border-neutral-200 rounded-sm overflow-hidden bg-white shadow-2xs transition-all duration-300"
                    >
                      <button
                        onClick={() => setOpenAccordion(isOpen ? null : index)}
                        className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-[#F8F9FA] transition duration-200 focus:outline-none cursor-pointer"
                      >
                        <div className="flex items-center gap-4 sm:gap-6">
                          <span className="text-[10px] tracking-[0.2em] font-medium uppercase px-3 py-1.5 bg-[#B38E46] text-white shrink-0 rounded-sm">
                            {item.day}
                          </span>
                          <h3 className="text-base sm:text-lg font-serif tracking-tight text-neutral-900">
                            {item.title}
                          </h3>
                        </div>
                        <div
                          className={`w-8 h-8 rounded-sm border border-[#B38E46]/30 flex items-center justify-center transition-transform duration-300 shrink-0 ${
                            isOpen ? "rotate-180 bg-[#B38E46] text-white" : "text-[#B38E46] bg-white"
                          }`}
                        >
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
                            <div className="p-5 sm:p-6 pt-0 border-t border-neutral-100 bg-[#F8F9FA]/60">
                              <p className="text-xs sm:text-sm leading-relaxed text-neutral-600 font-light tracking-wide pt-4">
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
            <div className="bg-white border border-[#B38E46]/40 rounded-sm p-6 sm:p-8 shadow-xl space-y-6 relative overflow-hidden">
              
              {/* Gold Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#B38E46]" />

              <div className="space-y-2">
                <span className="text-[10px] font-medium tracking-[0.25em] uppercase text-[#B38E46] block">
                  TAILORED TRAVEL PACKAGE
                </span>
                <h3 className="text-2xl font-serif tracking-tight text-neutral-900">
                  Interested in this trip?
                </h3>
              </div>

              {/* Price Container */}
              <div className="p-4 bg-[#F8F9FA] border border-[#B38E46]/30 rounded-sm flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-neutral-500 uppercase tracking-wider block font-light">Starting from</span>
                  <span className="text-2xl font-bold text-neutral-900 tracking-tight">₹1,24,999</span>
                  <span className="text-xs text-neutral-500 font-light"> / person</span>
                </div>
                <span className="text-[10px] tracking-[0.2em] font-medium uppercase text-[#B38E46] bg-[#B38E46]/10 px-3 py-1.5 border border-[#B38E46]/30 rounded-sm">
                  {currentItinerary.duration.split("/")[0]}
                </span>
              </div>

              {/* Inclusions List */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-medium tracking-widest text-neutral-900 uppercase">
                  Package Inclusions
                </h4>
                <ul className="space-y-2.5 text-xs text-neutral-700 font-light tracking-wide">
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

              {/* Action Buttons with Rounded Borders */}
              <div className="space-y-3 pt-4 border-t border-neutral-100">
                <Link
                  href="/contact"
                  className="w-full flex items-center justify-center gap-2 border border-[#B38E46] bg-white text-[#B38E46] hover:bg-[#B38E46] hover:text-white transition-all duration-300 py-3.5 text-xs tracking-[0.25em] uppercase font-medium rounded-sm shadow-2xs cursor-pointer active:scale-95"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>INQUIRE ABOUT THIS TRIP</span>
                </Link>

                <Link
                  href="/luxeclub"
                  className="w-full flex items-center justify-center gap-2 border border-[#B38E46] bg-[#B38E46] hover:bg-[#997734] text-white transition-all duration-300 py-3.5 text-xs tracking-[0.25em] uppercase font-medium rounded-sm shadow-sm cursor-pointer active:scale-95"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-white" />
                  <span>ENROL VIA LUXE CLUB</span>
                </Link>

                <a
                  href="https://wa.me/919999999999?text=Hi%20Luxe%20Yatra,%20I'm%20interested%20in%20the%20itinerary%20package"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 border border-emerald-600 bg-emerald-600 hover:bg-emerald-700 text-white transition-all duration-300 py-3.5 text-xs tracking-[0.25em] uppercase font-medium rounded-sm shadow-sm cursor-pointer active:scale-95"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-white" />
                  <span>WHATSAPP CONCIERGE</span>
                </a>
              </div>

              <p className="text-[10px] text-center text-neutral-400 font-light pt-1">
                No immediate payment required. Our travel concierges will reach out within 2 hours.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* 5. RECOMMENDED TRIPS SECTION */}
      <div className="bg-white border-t border-neutral-200/60 py-16 md:py-24 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-14 flex flex-col items-center">
            <div className="text-xs tracking-[0.4em] text-[#B38E46] uppercase font-medium mb-3">
              CURATED SELECTION
            </div>
            <h2 className="text-3xl md:text-5xl font-serif tracking-tight text-neutral-900 leading-[1.1]">
              Recommended Luxury Itineraries
            </h2>
          </div>

          {/* Cards Grid Container */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-14">
            {recommendations.map((rec) => (
              <Link
                href={`/itinerary/${rec.id}`}
                key={rec.id}
                className="group relative h-[440px] w-full bg-black rounded-sm overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer"
              >
                {/* Background Image */}
                <Image
                  src={rec.image}
                  alt={rec.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover w-full h-full absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105 opacity-90"
                />

                {/* Dark Gradient Overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.65) 35%, rgba(0,0,0,0) 65%)",
                  }}
                />

                {/* Category Pill Tag at Top */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <span className="bg-black/50 backdrop-blur-md text-white text-[10px] tracking-[0.2em] uppercase font-light px-3 py-1.5 border border-white/20 rounded-sm">
                    {rec.country}
                  </span>
                  <div className="bg-black/50 backdrop-blur-md text-white text-xs font-light tracking-wider px-3 py-1 border border-white/20 flex items-center gap-1.5 rounded-sm">
                    <Star className="w-3.5 h-3.5 fill-[#E5C158] text-[#E5C158]" />
                    <span>4.9</span>
                  </div>
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white z-10">
                  <div className="text-[10px] text-white/80 uppercase tracking-[0.25em] font-medium mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#B38E46] shrink-0" />
                    <span>{rec.duration}</span>
                  </div>

                  <h3 className="text-xl font-serif tracking-tight text-white leading-snug mb-2 group-hover:text-[#B38E46] transition-colors">
                    {rec.title}
                  </h3>

                  <p className="leading-relaxed line-clamp-2 font-light mb-4 text-white/80 text-xs">
                    {rec.description}
                  </p>

                  <div className="pt-4 border-t border-white/20 flex items-center justify-between">
                    <div className="text-[11px] text-white/80 font-medium uppercase tracking-wider">
                      <span>From {rec.price}</span>
                      <span className="text-white/60 font-light text-[10px]"> / person</span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 text-xs font-medium text-white group-hover:text-[#B38E46] transition-colors duration-200 uppercase tracking-widest">
                      <span>EXPLORE</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/itinerary"
              className="inline-flex items-center gap-2 border border-[#B38E46] bg-white text-[#B38E46] hover:bg-[#B38E46] hover:text-white font-medium text-xs uppercase tracking-[0.25em] px-8 py-3.5 rounded-sm transition-all duration-300 shadow-2xs cursor-pointer active:scale-95"
            >
              <span>VIEW ALL ITINERARIES</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>

      {/* Indigo Vertical Line Accent at Bottom */}
      <div className="flex justify-center mt-16 md:mt-20">
        <div className="w-[1.5px] h-32 md:h-48 bg-[rgb(25,25,112)]"></div>
      </div>

    </main>
  );
}
