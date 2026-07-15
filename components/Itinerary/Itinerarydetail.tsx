"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronDown,
  Calendar,
  Clock,
  MapPin,
  Users,
  ArrowRight,
  ArrowLeft,
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
      price: "$1,499",
      tag: item.badge.split(" ")[0] || "Tour",
      image: item.image,
    }));

  return (
    <main className="bg-white text-black min-h-screen w-full font-sans antialiased select-none pb-24">
      {/* Back to list navigation row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 mb-4 relative z-50">
        <Link
          href="/itinerary"
          className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-600 hover:text-black transition-colors duration-200 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Itineraries</span>
        </Link>
      </div>

      {/* 1. TOP CINEMATIC PICTURE COLLAGE */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-80 md:h-120">
          {/* Left Block Side Panel Elements */}
          <div className="hidden md:flex md:col-span-3 flex-col gap-4 h-full">
            <div className="relative flex-1 rounded-2xl overflow-hidden shadow-xs">
              <Image
                src={currentItinerary.images[0]}
                alt={`${currentItinerary.title} detail 1`}
                fill
                className="object-cover"
              />
            </div>
            <div className="relative flex-1 rounded-2xl overflow-hidden shadow-xs">
              <Image
                src={currentItinerary.images[1]}
                alt={`${currentItinerary.title} detail 2`}
                fill
                className="object-cover"
              />
            </div>
          </div>
          {/* Main Epic Center Image Block */}
          <div className="md:col-span-6 relative h-full rounded-2xl overflow-hidden shadow-xs">
            <Image
              src={currentItinerary.images[2]}
              alt={`${currentItinerary.title} showcase`}
              fill
              className="object-cover"
              priority
            />
          </div>
          {/* Right Block Side Panel Elements */}
          <div className="hidden md:flex md:col-span-3 flex-col gap-4 h-full">
            <div className="relative flex-1 rounded-2xl overflow-hidden shadow-xs">
              <Image
                src={currentItinerary.images[3]}
                alt={`${currentItinerary.title} detail 3`}
                fill
                className="object-cover"
              />
            </div>
            <div className="relative flex-1 rounded-2xl overflow-hidden shadow-xs">
              <Image
                src={currentItinerary.images[4]}
                alt={`${currentItinerary.title} detail 4`}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. TRIP HEADLINE & META METRICS ROW */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-16">
        <span className="text-xs font-bold text-neutral-400 tracking-[0.25em] uppercase block mb-3">
          {currentItinerary.country}
        </span>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-900 mb-6 leading-tight">
          {currentItinerary.title}
        </h1>

        {/* Informational Parameter Pills */}
        <div className="flex flex-wrap gap-y-4 gap-x-8 text-sm text-neutral-600 font-medium py-4 border-y border-neutral-100 mb-6">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-neutral-400" />
            <span>{currentItinerary.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-neutral-400" />
            <span>{currentItinerary.groupSize}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-neutral-400" />
            <span>
              {currentItinerary.flightsIncl ? "Flights Incl." : "Land Only"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-neutral-400" />
            <span>{currentItinerary.tourType}</span>
          </div>
        </div>
      </div>

      {/* 3. ITINERARY ACCORDION GRID CONTAINER */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-24">
        <h2 className="text-2xl font-bold text-neutral-900 mb-8 tracking-tight font-sans">
          Itinerary Schedule
        </h2>

        <div className="border border-neutral-200/70 rounded-2xl divide-y divide-neutral-100 overflow-hidden shadow-xs bg-white">
          {currentItinerary.days.map((item, index) => {
            const isOpen = openAccordion === index;
            return (
              <div key={index} className="w-full">
                <button
                  onClick={() => setOpenAccordion(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-neutral-50/60 transition duration-200 focus:outline-none"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold px-3 py-1 bg-neutral-100 text-neutral-700 rounded-md font-sans shrink-0">
                      {item.day}
                    </span>
                    <h3 className="text-base sm:text-lg font-semibold text-neutral-900 tracking-tight">
                      {item.title}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-400 transition-transform duration-300 shrink-0 ${
                      isOpen ? "rotate-180 text-neutral-900" : ""
                    }`}
                  />
                </button>

                {/* Smooth collapsing text container expansion */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen
                      ? "max-h-60 border-t border-neutral-50 bg-neutral-50/20"
                      : "max-h-0"
                  }`}
                >
                  <p className="p-6 text-sm sm:text-base text-neutral-600 font-light leading-relaxed tracking-wide">
                    {item.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. RECOMMENDED TRIPS SECTION (BOTTOM GRID) */}
      <div className="bg-[#FAF9F6] border-t border-neutral-100 py-20 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-neutral-900">
              Recommended for you
            </h2>
          </div>

          {/* Cards Frame Window */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-12">
            {recommendations.map((rec) => (
              <Link
                href={`/itinerary/${rec.id}`}
                key={rec.id}
                className="bg-white border border-neutral-200/50 rounded-2xl shadow-xs overflow-hidden flex flex-col justify-between group cursor-pointer hover:shadow-md transition-shadow duration-300"
              >
                <div>
                  {/* Dynamic Thumbnail Visual Image Element */}
                  <div className="relative aspect-16/10 w-full bg-neutral-100">
                    <Image
                      src={rec.image}
                      alt={rec.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                    <span className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-wider bg-white/95 text-neutral-800 px-2.5 py-1 rounded shadow-xs">
                      {rec.tag}
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
                      <span>{rec.duration}</span>
                      <span>•</span>
                      <span className="text-cyan-600 font-medium">
                        {rec.spots}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-neutral-900 leading-snug group-hover:text-neutral-700 transition-colors">
                      {rec.title}
                    </h3>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-neutral-50 flex items-center justify-between mt-4">
                  <div>
                    <span className="text-[10px] text-neutral-400 uppercase block tracking-wider font-medium">
                      Total from
                    </span>
                    <span className="text-xl font-bold text-neutral-900">
                      {rec.price}
                    </span>
                    <span className="text-xs text-neutral-500 font-light">
                      {" "}
                      /person
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center group-hover:bg-neutral-800 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/itinerary"
              className="inline-block bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-sm px-8 py-3 rounded-full transition duration-300 shadow-xs active:scale-95"
            >
              View all trips
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
