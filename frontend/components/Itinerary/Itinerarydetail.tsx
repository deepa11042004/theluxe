/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
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
  XCircle,
  Sparkles,
  Plane,
  ShieldCheck,
  PhoneCall,
  MessageSquare,
  Star,
  Calendar,
  Compass,
  Utensils,
  Hotel as HotelIcon,
  Car,
  Sunrise,
  Sun,
  Moon,
  Info,
  HelpCircle,
  Crown,
  Gem,
  Award,
  Navigation,
} from "lucide-react";
import { itineraryData, DetailedItinerary } from "./itineraryData";

// Distinct, high-resolution luxury hero banner images accurately matching each destination (NOT duplicate of gallery images)
const ITINERARY_HERO_CONFIG: Record<
  string,
  { heroImage: string; heroTitle: string; heroSubtitle: string }
> = {
  "europe-for-all-winter-highlights": {
    heroImage:
      "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=2070&auto=format&fit=crop",
    heroTitle: "Europe",
    heroSubtitle:
      "EUROPE FOR ALL — 8 DAYS / 7 NIGHTS CURATED WINTER JOURNEY ACROSS PARIS, BRUSSELS, LUCERNE & ZURICH",
  },
  "australian-highlights": {
    heroImage:
      "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=2070&auto=format&fit=crop",
    heroTitle: "Australia",
    heroSubtitle:
      "AUSTRALIAN HIGHLIGHTS — 7 DAYS / 6 NIGHTS LUXURY VOYAGE ACROSS SYDNEY & MELBOURNE",
  },
  "japan-discovery-tokyo-kyoto-osaka": {
    heroImage: "/japan-hero.jpg",
    heroTitle: "Japan",
    heroSubtitle:
      "JAPAN DISCOVERY — 7 DAYS / 6 NIGHTS TIMELESS JOURNEY ACROSS TOKYO, KYOTO & OSAKA",
  },
  "vietnam-highlights": {
    heroImage: "/vietnam-hero.jpg",
    heroTitle: "Vietnam",
    heroSubtitle:
      "VIETNAM HIGHLIGHTS — 7 DAYS / 6 NIGHTS HERITAGE ADVENTURE ACROSS HANOI, HALONG BAY & HOI AN",
  },
  "new-zealand-scenic-escape": {
    heroImage: "/new-zealand-hero.jpg",
    heroTitle: "New Zealand",
    heroSubtitle:
      "NEW ZEALAND SCENIC ESCAPE — 8 DAYS / 7 NIGHTS ALPINE EXPEDITION ACROSS NORTH & SOUTH ISLANDS",
  },
  "antarctica-expedition-experience": {
    heroImage:
      "https://images.unsplash.com/photo-1739056656193-c864f688cde3?q=80&w=2070&auto=format&fit=crop",
    heroTitle: "Antarctica",
    heroSubtitle:
      "ANTARCTICA EXPEDITION — 10 DAYS / 9 NIGHTS POLAR CRUISE TO THE EDGE OF THE EARTH",
  },
  "bali-island-escape": {
    heroImage:
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=2070&auto=format&fit=crop",
    heroTitle: "Bali",
    heroSubtitle:
      "BALI ISLAND ESCAPE — 5 DAYS / 4 NIGHTS TROPICAL SANCTUARY ACROSS SEMINYAK, UBUD & ULUWATU",
  },
  "singapore-city-sentosa": {
    heroImage: "/singapore-hero.jpg",
    heroTitle: "Singapore",
    heroSubtitle:
      "SINGAPORE CITY & SENTOSA — 5 DAYS / 4 NIGHTS COSMOPOLITAN & ISLAND LUXURY EXPERIENCE",
  },
  "malaysia-kuala-lumpur-langkawi": {
    heroImage: "/malaysia-hero.jpg",
    heroTitle: "Malaysia",
    heroSubtitle:
      "MALAYSIA HIGHLIGHTS — 6 DAYS / 5 NIGHTS GLAMOUR & BEACH SANCTUARY ACROSS KUALA LUMPUR & LANGKAWI",
  },
  "china-highlights-beijing-shanghai": {
    heroImage: "/china-hero.jpg",
    heroTitle: "China",
    heroSubtitle:
      "CHINA HIGHLIGHTS — 7 DAYS / 6 NIGHTS IMPERIAL DYNASTIES & MODERN MARVELS IN BEIJING & SHANGHAI",
  },
  "1": {
    heroImage:
      "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=2070&auto=format&fit=crop",
    heroTitle: "Dubai",
    heroSubtitle:
      "DUBAI DESERT DREAMS & CITY GLAMOUR — 6 DAYS / 5 NIGHTS LUXURY ARABIAN ESCAPE",
  },
  "2": {
    heroImage:
      "https://images.unsplash.com/photo-1587922546307-776227941871?q=80&w=2070&auto=format&fit=crop",
    heroTitle: "Goa",
    heroSubtitle:
      "GOA SUN, SAND & SOUL — 5 DAYS / 4 NIGHTS COASTAL HERITAGE & BEACH RETREAT",
  },
  "3": {
    heroImage:
      "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?q=80&w=2070&auto=format&fit=crop",
    heroTitle: "Bali",
    heroSubtitle:
      "BALI ENCHANTING ISLAND OF GODS — 7 DAYS / 6 NIGHTS WELLNESS & TROPICAL ESCAPE",
  },
  "4": {
    heroImage:
      "https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?q=80&w=2070&auto=format&fit=crop",
    heroTitle: "Thailand",
    heroSubtitle:
      "THAILAND TROPICAL TEMPLES & TURQUOISE ISLANDS — 7 DAYS / 6 NIGHTS ISLAND HOPPING",
  },
  "5": {
    heroImage:
      "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=2070&auto=format&fit=crop",
    heroTitle: "Kashmir",
    heroSubtitle:
      "KASHMIR HEAVEN ON EARTH & ALPINE WONDERS — 6 DAYS / 5 NIGHTS SHIKARA & VALLEY RETREAT",
  },
  "6": {
    heroImage:
      "https://images.unsplash.com/photo-1597075687490-8f673c6c17f6?q=80&w=2070&auto=format&fit=crop",
    heroTitle: "Shimla",
    heroSubtitle:
      "SHIMLA THE REGAL QUEEN OF HILLS — 4 DAYS / 3 NIGHTS HIMALAYAN COLONIAL RETREAT",
  },
  "7": {
    heroImage:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop",
    heroTitle: "Nainital",
    heroSubtitle:
      "NAINITAL EMERALD LAKES & MISTY RIDGES — 4 DAYS / 3 NIGHTS TRANQUIL HILLSIDE RETREAT",
  },
};

interface ItineraryDetailProps {
  id?: string;
}

export default function ItineraryDetail({ id }: ItineraryDetailProps) {
  const [currentItinerary, setCurrentItinerary] = useState<DetailedItinerary | null>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    async function loadItinerary() {
      setLoading(true);
      try {
        const targetId = id || "europe-for-all-winter-highlights";
        const res = await fetch(`/api/v1/itineraries/${targetId}`);
        const json = await res.json();

        if (json.success && json.data) {
          const d = json.data;

          // Process images
          const imageList: string[] = [];
          const isValidUrl = (url: any) => typeof url === "string" && url.trim().length > 0 && (url.startsWith("http") || url.startsWith("/"));

          if (isValidUrl(d.hero_image)) imageList.push(d.hero_image);
          if (Array.isArray(d.images)) {
            d.images.forEach((img: any) => {
              const url = typeof img === "string" ? img : img?.image_url;
              if (isValidUrl(url) && !imageList.includes(url)) {
                imageList.push(url);
              }
            });
          }
          if (Array.isArray(d.attractions)) {
            d.attractions.forEach((att: any) => {
              if (isValidUrl(att?.image_url) && !imageList.includes(att.image_url)) {
                imageList.push(att.image_url);
              }
            });
          }

          // Fallback fillers if fewer than 5 valid images
          const defaultImgs = [
            "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1528164344705-47542687990d?q=80&w=1200&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop",
          ];
          let fallbackIndex = 0;
          while (imageList.length < 8) {
            imageList.push(defaultImgs[fallbackIndex % defaultImgs.length]);
            fallbackIndex++;
          }

          // Process days
          const daysList = Array.isArray(d.days)
            ? d.days.map((dayItem: any, idx: number) => ({
                day: `Day ${dayItem.day_number || idx + 1}`,
                day_number: dayItem.day_number || idx + 1,
                title: dayItem.title,
                text: dayItem.description || "",
                location: dayItem.location || "",
                morning: dayItem.morning_activities || dayItem.morning_activity || "",
                afternoon: dayItem.afternoon_activities || dayItem.afternoon_activity || "",
                evening: dayItem.evening_activities || dayItem.evening_activity || "",
                meals: dayItem.meals || "",
                hotel: dayItem.hotel || "",
                transport: dayItem.transport || "",
                notes: dayItem.important_notes || "",
                image: dayItem.image_url || "",
              }))
            : [];

          const priceStr = d.price_from
            ? `₹${d.price_from.toLocaleString("en-IN")}`
            : d.price
            ? `₹${d.price.toLocaleString("en-IN")}`
            : "₹1,45,000";

          const mapped: DetailedItinerary = {
            id: d.id,
            slug: d.slug,
            country: d.country || d.region || "International",
            title: d.title || d.name,
            description: d.overview || d.short_description || "",
            overview: d.overview || d.short_description || "",
            duration: d.duration || `${d.nights || 1} Nights / ${d.daysCount || 1} Days`,
            badge: `✈️ ${(d.duration || "").split("/")[0]?.trim() || "Exclusive"}`,
            image: imageList[0],
            images: imageList,
            groupSize: "2 - 14 Travelers",
            flightsIncl: true,
            tourType: d.tour_type || d.category || "Luxury Journey",
            route: d.route || "",
            bestTime: d.best_time || "",
            recommendedFor: d.recommended_for || "",
            visaInfo: d.visa_info || "",
            bookingInfo: d.booking_info || "",
            startingPrice: priceStr,
            days: daysList,
            inclusions: d.inclusions || [],
            exclusions: d.exclusions || [],
            attractions: d.attractions || [],
            activities: d.activities || [],
            faqs: d.faqs || [],
          };

          setCurrentItinerary(mapped);
        } else {
          // Fallback to static data
          const fallback =
            itineraryData.find((item) => item.id === id || item.slug === id) ||
            itineraryData[0];
          setCurrentItinerary(fallback);
        }
      } catch (err) {
        console.error("Failed to load itinerary details:", err);
        const fallback =
          itineraryData.find((item) => item.id === id || item.slug === id) ||
          itineraryData[0];
        setCurrentItinerary(fallback);
      } finally {
        setLoading(false);
      }

      // Fetch dynamic recommendations
      try {
        const recRes = await fetch("/api/v1/itineraries?limit=6");
        const recJson = await recRes.json();
        if (recJson.success && Array.isArray(recJson.data)) {
          const filtered = recJson.data
            .filter((item: any) => item.id !== id && item.slug !== id)
            .slice(0, 3)
            .map((item: any) => ({
              id: item.slug || item.id,
              title: item.title,
              duration: item.duration || `${item.days || 1} Days`,
              country: item.country || item.region || "Luxury",
              price: item.price_from
                ? `₹${item.price_from.toLocaleString("en-IN")}`
                : "₹1,45,000",
              image:
                item.hero_image ||
                item.images?.[0]?.image_url ||
                "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop",
              description: item.overview || item.short_description || "",
            }));
          setRecommendations(filtered);
        }
      } catch (recErr) {
        console.error("Failed to load recommendations:", recErr);
      }
    }

    loadItinerary();
  }, [id]);

  if (loading) {
    return (
      <main className="bg-[#FAF9F5] min-h-screen w-full pt-32 pb-24 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-[#E39F25] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-medium uppercase tracking-[0.25em] text-[#E39F25]">
            Loading Curated Itinerary...
          </span>
        </div>
      </main>
    );
  }

  if (!currentItinerary) {
    return (
      <main className="bg-[#FAF9F5] min-h-screen w-full pt-32 pb-24 flex items-center justify-center">
        <div className="text-center p-8 bg-white border border-neutral-200 rounded-2xl max-w-md shadow-sm">
          <h2 className="text-2xl font-serif mb-3">Itinerary Not Found</h2>
          <p className="text-sm text-neutral-600 mb-6">
            The requested travel package could not be retrieved.
          </p>
          <Link
            href="/itinerary"
            className="inline-flex items-center gap-2 border border-[#E39F25] bg-[#E39F25] text-white px-6 py-2.5 text-xs tracking-widest uppercase rounded-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Itineraries
          </Link>
        </div>
      </main>
    );
  }

  // Derive distinct Hero Banner details based on itinerary slug or id
  const targetKey = currentItinerary.slug || currentItinerary.id || "";
  const heroConfig =
    ITINERARY_HERO_CONFIG[targetKey] ||
    ITINERARY_HERO_CONFIG[currentItinerary.id] || {
      heroImage:
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2070&auto=format&fit=crop",
      heroTitle: currentItinerary.country.split("(")[0].trim(),
      heroSubtitle: `${currentItinerary.title.toUpperCase()} — ${currentItinerary.duration.toUpperCase()}`,
    };

  // 5 distinct Bento gallery images (ensuring hero is not duplicated and URL is valid)
  const defaultBento = [
    "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1528164344705-47542687990d?q=80&w=1200&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop",
  ];

  const rawBento = currentItinerary.images
    .filter((img) => typeof img === "string" && img.trim().length > 0 && img.startsWith("http") && img !== heroConfig.heroImage);

  const bentoGallery = [...rawBento];
  let bIdx = 0;
  while (bentoGallery.length < 5) {
    if (!bentoGallery.includes(defaultBento[bIdx % defaultBento.length])) {
      bentoGallery.push(defaultBento[bIdx % defaultBento.length]);
    }
    bIdx++;
  }

  return (
    <main className="bg-[#F8F9FA] text-neutral-900 min-h-screen w-full font-sans antialiased pb-24 overflow-x-hidden selection:bg-[#E39F25]/20 selection:text-[#E39F25]">
      
      {/* 1. HERO BANNER SECTION (Preserved exact design matching /national full-screen hero) */}
      <div className="relative w-full h-screen min-h-screen pt-24 sm:pt-28 pb-6 sm:pb-8 px-6 sm:px-12 lg:px-16 overflow-hidden flex flex-col justify-center items-center group">
        <Image
          src={heroConfig.heroImage}
          alt={heroConfig.heroTitle}
          fill
          unoptimized
          className="object-cover object-center z-0"
          priority
        />
        {/* Clean crisp background without dark overlay */}

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] xl:text-[7.25rem] font-[Vera] tracking-tight text-white leading-tight drop-shadow-[0_4px_25px_rgba(0,0,0,0.85)]">
            {heroConfig.heroTitle}
          </h1>

          {heroConfig.heroSubtitle && (
            <div className="mt-8 sm:mt-12 md:mt-16 text-center max-w-4xl mx-auto">
              <p
                className="inline-block bg-black/45 backdrop-blur-md rounded-sm text-[10px] md:text-[11.5px] px-6 py-3.5 md:px-10 md:py-4 tracking-[0.18em] md:tracking-[0.25em] uppercase font-medium shadow-lg border border-white/25 text-white leading-relaxed"
                style={{ color: "#ffffff" }}
              >
                {heroConfig.heroSubtitle}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 2. TOP NAVIGATION & EDITORIAL BREADCRUMBS */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 md:pt-14 mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-neutral-200/80">
          <Link
            href="/itinerary"
            className="inline-flex items-center gap-2.5 text-xs font-medium tracking-[0.25em] uppercase text-[#E39F25] hover:bg-[#E39F25] hover:text-white transition-all duration-300 cursor-pointer group px-6 py-2.5 bg-white border border-[#E39F25] rounded-md shadow-2xs hover:shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>All Itineraries</span>
          </Link>

          {/* Breadcrumbs */}
          <div className="hidden sm:flex items-center gap-2 text-[11px] font-medium tracking-[0.2em] uppercase text-neutral-400">
            <Link href="/" className="hover:text-[#E39F25] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/itinerary" className="hover:text-[#E39F25] transition-colors">Itineraries</Link>
            <span>/</span>
            <span className="text-[#E39F25] font-semibold">{currentItinerary.country}</span>
          </div>
        </div>
      </div>

      {/* 3. ULTRA-LUXURY BENTO IMAGE GALLERY (Architectural Sharp Cards) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 h-auto md:h-[520px]">
          
          {/* Bento Tile 1: Primary Signature Feature (Spans 7 columns) */}
          <div className="md:col-span-7 relative h-80 sm:h-96 md:h-full rounded-none overflow-hidden border border-neutral-200/90 group cursor-pointer bg-neutral-950 shadow-xs hover:shadow-xl transition-all duration-500">
            <Image
              src={bentoGallery[0] || currentItinerary.image}
              alt={currentItinerary.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
            
            {/* Top Floating Badge */}
            <div className="absolute top-5 left-5 z-10">
              <span className="inline-flex items-center gap-1.5 bg-black/75 backdrop-blur-md text-white text-[10px] tracking-[0.25em] uppercase font-medium px-4 py-1.5 border border-[#E39F25]/50 rounded-none shadow-md">
                <Crown className="w-3 h-3 text-[#E39F25]" />
                Signature Showcase
              </span>
            </div>

            {/* Bottom Content Overlay */}
            <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-wrap items-end justify-between gap-3">
              <div>
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#E39F25] block mb-1 font-medium">
                  {currentItinerary.country}
                </span>
                <h2 className="text-xl md:text-3xl font-serif text-white font-medium drop-shadow-md leading-snug">
                  {currentItinerary.title}
                </h2>
              </div>
              <div className="bg-black/70 backdrop-blur-md text-white text-xs font-light tracking-wider px-3.5 py-1.5 border border-white/20 rounded-none flex items-center gap-1.5 shrink-0 shadow-md">
                <Star className="w-3.5 h-3.5 fill-[#E39F25] text-[#E39F25]" />
                <span>4.9 (120+ reviews)</span>
              </div>
            </div>
          </div>

          {/* Right Bento Grid (Spans 5 columns, split into 4 quadrants) */}
          <div className="md:col-span-5 grid grid-cols-2 gap-4 h-full">
            
            {/* Bento Tile 2: Landmark Sight */}
            <div className="relative h-44 sm:h-52 md:h-full rounded-none overflow-hidden border border-neutral-200/90 group cursor-pointer bg-neutral-950 shadow-xs hover:shadow-xl transition-all duration-500">
              <Image
                src={bentoGallery[1] || currentItinerary.image}
                alt="Landmark sight"
                fill
                sizes="25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent pointer-events-none" />
              <div className="absolute bottom-3.5 left-3.5 right-3.5 z-10">
                <span className="bg-black/75 backdrop-blur-md text-white text-[9px] tracking-[0.2em] uppercase px-3 py-1 border border-[#E39F25]/50 rounded-none inline-flex items-center gap-1 font-medium">
                  <Gem className="w-2.5 h-2.5 text-[#E39F25]" />
                  Landmark
                </span>
              </div>
            </div>

            {/* Bento Tile 3: Heritage Experience */}
            <div className="relative h-44 sm:h-52 md:h-full rounded-none overflow-hidden border border-neutral-200/90 group cursor-pointer bg-neutral-950 shadow-xs hover:shadow-xl transition-all duration-500">
              <Image
                src={bentoGallery[2] || currentItinerary.image}
                alt="Heritage experience"
                fill
                sizes="25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent pointer-events-none" />
              <div className="absolute bottom-3.5 left-3.5 right-3.5 z-10">
                <span className="bg-black/75 backdrop-blur-md text-white text-[9px] tracking-[0.2em] uppercase px-3 py-1 border border-[#E39F25]/50 rounded-none inline-flex items-center gap-1 font-medium">
                  <Sparkles className="w-2.5 h-2.5 text-[#E39F25]" />
                  Heritage
                </span>
              </div>
            </div>

            {/* Bento Tile 4: Scenic Panoramic View */}
            <div className="relative h-44 sm:h-52 md:h-full rounded-none overflow-hidden border border-neutral-200/90 group cursor-pointer bg-neutral-950 shadow-xs hover:shadow-xl transition-all duration-500">
              <Image
                src={bentoGallery[3] || currentItinerary.image}
                alt="Scenic viewpoint"
                fill
                sizes="25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent pointer-events-none" />
              <div className="absolute bottom-3.5 left-3.5 right-3.5 z-10">
                <span className="bg-black/75 backdrop-blur-md text-white text-[9px] tracking-[0.2em] uppercase px-3 py-1 border border-[#E39F25]/50 rounded-none inline-flex items-center gap-1 font-medium">
                  <Navigation className="w-2.5 h-2.5 text-[#E39F25]" />
                  Scenic Trail
                </span>
              </div>
            </div>

            {/* Bento Tile 5: Culinary & 5-Star Retreat */}
            <div className="relative h-44 sm:h-52 md:h-full rounded-none overflow-hidden border border-neutral-200/90 group cursor-pointer bg-neutral-950 shadow-xs hover:shadow-xl transition-all duration-500">
              <Image
                src={bentoGallery[4] || currentItinerary.image}
                alt="Culinary & Retreat"
                fill
                sizes="25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent pointer-events-none" />
              <div className="absolute bottom-3.5 left-3.5 right-3.5 z-10">
                <span className="bg-black/75 backdrop-blur-md text-white text-[9px] tracking-[0.2em] uppercase px-3 py-1 border border-[#E39F25]/50 rounded-none inline-flex items-center gap-1 font-medium">
                  <Award className="w-2.5 h-2.5 text-[#E39F25]" />
                  Fine Living
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 4. LUXURY BENTO PARAMETER METRICS STRIP (Sharp Clean Cards) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          
          <div className="bg-white rounded-none p-5 border border-neutral-200/90 shadow-2xs hover:border-[#E39F25] hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="w-8 h-8 rounded-none bg-[#E39F25]/10 border border-[#E39F25]/25 text-[#E39F25] group-hover:bg-[#E39F25] group-hover:text-white transition-colors flex items-center justify-center mb-3">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-neutral-400 uppercase tracking-[0.25em] block font-medium">
                DURATION
              </span>
              <span className="text-xs sm:text-sm font-serif font-medium text-neutral-900 mt-1 block line-clamp-1">
                {currentItinerary.duration}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-none p-5 border border-neutral-200/90 shadow-2xs hover:border-[#E39F25] hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="w-8 h-8 rounded-none bg-[#E39F25]/10 border border-[#E39F25]/25 text-[#E39F25] group-hover:bg-[#E39F25] group-hover:text-white transition-colors flex items-center justify-center mb-3">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-neutral-400 uppercase tracking-[0.25em] block font-medium">
                STYLE
              </span>
              <span className="text-xs sm:text-sm font-serif font-medium text-neutral-900 mt-1 block line-clamp-1">
                {currentItinerary.tourType}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-none p-5 border border-neutral-200/90 shadow-2xs hover:border-[#E39F25] hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="w-8 h-8 rounded-none bg-[#E39F25]/10 border border-[#E39F25]/25 text-[#E39F25] group-hover:bg-[#E39F25] group-hover:text-white transition-colors flex items-center justify-center mb-3">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-neutral-400 uppercase tracking-[0.25em] block font-medium">
                REGION / TRAIL
              </span>
              <span className="text-xs sm:text-sm font-serif font-medium text-neutral-900 mt-1 block line-clamp-1">
                {currentItinerary.route || currentItinerary.country}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-none p-5 border border-neutral-200/90 shadow-2xs hover:border-[#E39F25] hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="w-8 h-8 rounded-none bg-[#E39F25]/10 border border-[#E39F25]/25 text-[#E39F25] group-hover:bg-[#E39F25] group-hover:text-white transition-colors flex items-center justify-center mb-3">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-neutral-400 uppercase tracking-[0.25em] block font-medium">
                BEST SEASON
              </span>
              <span className="text-xs sm:text-sm font-serif font-medium text-neutral-900 mt-1 block line-clamp-1">
                {currentItinerary.bestTime || "All Year"}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-none p-5 border border-neutral-200/90 shadow-2xs hover:border-[#E39F25] hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="w-8 h-8 rounded-none bg-[#E39F25]/10 border border-[#E39F25]/25 text-[#E39F25] group-hover:bg-[#E39F25] group-hover:text-white transition-colors flex items-center justify-center mb-3">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-neutral-400 uppercase tracking-[0.25em] block font-medium">
                PARTY DYNAMICS
              </span>
              <span className="text-xs sm:text-sm font-serif font-medium text-neutral-900 mt-1 block line-clamp-1">
                {currentItinerary.groupSize}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-none p-5 border border-neutral-200/90 shadow-2xs hover:border-[#E39F25] hover:shadow-md transition-all flex flex-col justify-between group">
            <div className="w-8 h-8 rounded-none bg-[#E39F25]/10 border border-[#E39F25]/25 text-[#E39F25] group-hover:bg-[#E39F25] group-hover:text-white transition-colors flex items-center justify-center mb-3">
              <Plane className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] text-neutral-400 uppercase tracking-[0.25em] block font-medium">
                FLIGHTS &amp; LOGISTICS
              </span>
              <span className="text-xs sm:text-sm font-serif font-medium text-neutral-900 mt-1 block line-clamp-1">
                {currentItinerary.flightsIncl ? "Flights Included" : "Land Package"}
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* 5. MAIN EDITORIAL CONTENT & STICKY LUXURY SIDEBAR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: OVERVIEW, TIMELINE, LANDMARKS, INCLUSIONS, FAQ */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* 5.1 Journey Overview Card */}
            <div className="bg-white rounded-none p-7 sm:p-9 border border-neutral-200/90 shadow-sm relative overflow-hidden">
              <div className="flex items-center gap-2 text-xs tracking-[0.3em] font-semibold text-[#E39F25] uppercase mb-3">
                <Crown className="w-4 h-4" />
                <span>JOURNEY ESSENCE • {currentItinerary.country.toUpperCase()}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif tracking-tight text-neutral-900 mb-4 leading-snug">
                Curated Luxury Narrative
              </h3>
              <p className="text-sm md:text-base leading-relaxed text-neutral-700 font-light tracking-wide">
                {currentItinerary.description || currentItinerary.overview}
              </p>

              {/* Route Path Highlight Banner */}
              {currentItinerary.route && (
                <div className="mt-7 p-5 bg-[#FAFAFA] border-l-2 border-[#E39F25] rounded-none">
                  <div className="flex items-center gap-2 text-[11px] font-semibold text-[#E39F25] uppercase tracking-widest mb-1.5">
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Curated Travel Route</span>
                  </div>
                  <p className="text-sm md:text-base font-serif text-neutral-900">
                    {currentItinerary.route}
                  </p>
                </div>
              )}

              {/* Recommended For & Visa Pill Callouts */}
              {(currentItinerary.recommendedFor || currentItinerary.visaInfo) && (
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentItinerary.recommendedFor && (
                    <div className="p-4 bg-white border border-neutral-200/90 rounded-none flex items-start gap-3">
                      <div className="w-8 h-8 rounded-none bg-[#E39F25]/10 text-[#E39F25] flex items-center justify-center shrink-0 mt-0.5 border border-[#E39F25]/20">
                        <Compass className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-800 block mb-0.5">
                          Recommended For
                        </span>
                        <p className="text-xs text-neutral-600 font-light leading-relaxed">
                          {currentItinerary.recommendedFor}
                        </p>
                      </div>
                    </div>
                  )}
                  {currentItinerary.visaInfo && (
                    <div className="p-4 bg-white border border-neutral-200/90 rounded-none flex items-start gap-3">
                      <div className="w-8 h-8 rounded-none bg-[#E39F25]/10 text-[#E39F25] flex items-center justify-center shrink-0 mt-0.5 border border-[#E39F25]/20">
                        <Info className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-800 block mb-0.5">
                          Visa &amp; Entry
                        </span>
                        <p className="text-xs text-neutral-600 font-light leading-relaxed">
                          {currentItinerary.visaInfo}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* 4 Luxury Privilege Badges */}
              <div className="mt-8 pt-6 border-t border-neutral-100 grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { title: "5-Star Stays", icon: HotelIcon, desc: "Handpicked Luxury" },
                  { title: "Private Fleet", icon: Car, desc: "Chauffeured Transfers" },
                  { title: "Bespoke Dining", icon: Utensils, desc: "Gourmet Experiences" },
                  { title: "24/7 Concierge", icon: ShieldCheck, desc: "Dedicated Support" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-[#FAFAFA] rounded-none border border-neutral-200/70 flex flex-col items-center text-center group hover:bg-[#E39F25]/5 hover:border-[#E39F25] transition-all"
                  >
                    <item.icon className="w-4 h-4 text-[#E39F25] mb-1.5" />
                    <span className="text-[11px] font-medium text-neutral-900 block tracking-wide">
                      {item.title}
                    </span>
                    <span className="text-[10px] text-neutral-500 font-light">
                      {item.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 5.2 Day-by-Day Comprehensive Itinerary Timeline (Matching Brands Page Regional Header Style) */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs tracking-[0.35em] font-medium text-[#E39F25] uppercase">
                  SCHEDULE TIMELINE
                </div>
                <div className="text-xs text-neutral-400 font-light tracking-wider uppercase">
                  {currentItinerary.days.length} Days Total
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif tracking-tight text-neutral-900 mb-8 leading-snug">
                Day-by-Day Comprehensive Itinerary
              </h3>

              <div className="space-y-4">
                {currentItinerary.days.map((item, index) => {
                  const isOpen = openAccordion === index;
                  const dayNumFormatted = String(item.day_number || index + 1).padStart(2, "0");

                  return (
                    <motion.div
                      key={index}
                      initial={false}
                      className="border border-neutral-200/90 rounded-none overflow-hidden bg-white shadow-2xs hover:shadow-md transition-all duration-300"
                    >
                      {/* Accordion Header Banner (Styled like Brands Page Regional Header: rgb(25,25,112)) */}
                      <button
                        onClick={() => setOpenAccordion(isOpen ? null : index)}
                        className="w-full flex items-center justify-between p-4 sm:p-5 text-left bg-[rgb(25,25,112)] text-white hover:bg-[rgb(20,20,95)] transition duration-200 focus:outline-none cursor-pointer border-b border-[#E39F25]/30"
                      >
                        <div className="flex items-center gap-3 sm:gap-4">
                          {/* Gold Day Number */}
                          <span
                            className="text-xl sm:text-2xl font-light text-[#E39F25] tracking-[0.2em] shrink-0"
                            style={{ fontFamily: "var(--work-font), sans-serif" }}
                          >
                            {dayNumFormatted}
                          </span>
                          <span className="h-5 w-[1px] bg-[#E39F25]/40 hidden sm:block"></span>
                          <div>
                            <h4 className="text-sm sm:text-base font-serif tracking-wide text-white">
                              {item.title}
                            </h4>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          {item.location && (
                            <span
                              className="text-[10px] sm:text-xs tracking-[0.25em] font-medium text-[#E39F25] uppercase hidden md:inline-block"
                              style={{ fontFamily: "var(--work-font), sans-serif" }}
                            >
                              {item.location}
                            </span>
                          )}
                          <div
                            className={`w-7 h-7 rounded-sm border border-[#E39F25]/40 flex items-center justify-center transition-transform duration-300 shrink-0 ${
                              isOpen ? "rotate-180 bg-[#E39F25] text-white" : "text-[#E39F25] bg-black/30"
                            }`}
                          >
                            <ChevronDown className="w-3.5 h-3.5" />
                          </div>
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
                            <div className="p-6 sm:p-7 bg-[#FAFAFA] space-y-5 border-t border-neutral-100">
                              {/* Main Day Text Narrative */}
                              <p className="text-xs sm:text-sm leading-relaxed text-neutral-700 font-light tracking-wide">
                                {item.text}
                              </p>

                              {/* Time of Day Bento Cards */}
                              {(item.morning || item.afternoon || item.evening) && (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
                                  {item.morning && (
                                    <div className="bg-white p-4 border border-neutral-200/80 rounded-none shadow-2xs">
                                      <div className="flex items-center gap-1.5 text-[10px] font-semibold tracking-wider uppercase text-[#E39F25] mb-1.5">
                                        <Sunrise className="w-3.5 h-3.5" />
                                        <span>Morning</span>
                                      </div>
                                      <p className="text-xs text-neutral-600 font-light leading-relaxed">
                                        {item.morning}
                                      </p>
                                    </div>
                                  )}
                                  {item.afternoon && (
                                    <div className="bg-white p-4 border border-neutral-200/80 rounded-none shadow-2xs">
                                      <div className="flex items-center gap-1.5 text-[10px] font-semibold tracking-wider uppercase text-[#E39F25] mb-1.5">
                                        <Sun className="w-3.5 h-3.5" />
                                        <span>Afternoon</span>
                                      </div>
                                      <p className="text-xs text-neutral-600 font-light leading-relaxed">
                                        {item.afternoon}
                                      </p>
                                    </div>
                                  )}
                                  {item.evening && (
                                    <div className="bg-white p-4 border border-neutral-200/80 rounded-none shadow-2xs">
                                      <div className="flex items-center gap-1.5 text-[10px] font-semibold tracking-wider uppercase text-[#E39F25] mb-1.5">
                                        <Moon className="w-3.5 h-3.5" />
                                        <span>Evening</span>
                                      </div>
                                      <p className="text-xs text-neutral-600 font-light leading-relaxed">
                                        {item.evening}
                                      </p>
                                    </div>
                                  )}
                                </div>
                              )}

                              {/* Logistics Strip (Meals, Hotel, Transport) */}
                              <div className="pt-3 border-t border-neutral-200/60 flex flex-wrap gap-3 text-xs text-neutral-700">
                                {item.meals && (
                                  <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-none border border-neutral-200/80 shadow-2xs">
                                    <Utensils className="w-3.5 h-3.5 text-[#E39F25]" />
                                    <span className="font-semibold text-neutral-900">Meals:</span>
                                    <span className="font-light">{item.meals}</span>
                                  </div>
                                )}
                                {item.hotel && (
                                  <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-none border border-neutral-200/80 shadow-2xs">
                                    <HotelIcon className="w-3.5 h-3.5 text-[#E39F25]" />
                                    <span className="font-semibold text-neutral-900">Stay:</span>
                                    <span className="font-light">{item.hotel}</span>
                                  </div>
                                )}
                                {item.transport && (
                                  <div className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-none border border-neutral-200/80 shadow-2xs">
                                    <Car className="w-3.5 h-3.5 text-[#E39F25]" />
                                    <span className="font-semibold text-neutral-900">Transfer:</span>
                                    <span className="font-light">{item.transport}</span>
                                  </div>
                                )}
                              </div>

                              {item.notes && (
                                <div className="p-3.5 bg-white border-l-2 border-[#E39F25] border-y border-r border-neutral-200/80 rounded-none text-xs text-neutral-700 font-light flex items-start gap-2.5">
                                  <Info className="w-4 h-4 text-[#E39F25] shrink-0 mt-0.5" />
                                  <span>{item.notes}</span>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* 5.3 Featured Landmarks & Attractions */}
            {currentItinerary.attractions && currentItinerary.attractions.length > 0 && (
              <div>
                <div className="text-xs tracking-[0.35em] font-medium text-[#E39F25] uppercase mb-2">
                  DESTINATION HIGHLIGHTS
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif tracking-tight text-neutral-900 mb-6 leading-snug">
                  Must-Visit Sights &amp; Landmarks
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentItinerary.attractions.map((att, idx) => (
                    <div
                      key={idx}
                      className="bg-white border border-neutral-200/90 rounded-none overflow-hidden flex flex-col group shadow-2xs hover:shadow-xl hover:border-[#E39F25] transition-all duration-300"
                    >
                      {att.image_url && (
                        <div className="relative h-48 w-full bg-neutral-950 overflow-hidden">
                          <Image
                            src={att.image_url}
                            alt={att.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 30vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                          <div className="absolute top-3.5 left-3.5 z-10">
                            <span className="bg-black/75 backdrop-blur-md text-white text-[9px] tracking-widest uppercase px-3 py-1 border border-[#E39F25]/40 rounded-none font-medium">
                              Sight #{idx + 1}
                            </span>
                          </div>
                        </div>
                      )}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <h4 className="font-serif text-base font-semibold text-neutral-900 mb-1.5">
                          {att.name}
                        </h4>
                        <p className="text-xs text-neutral-600 font-light leading-relaxed">
                          {att.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5.4 Curated Experiences & Signature Moments */}
            {currentItinerary.activities && currentItinerary.activities.length > 0 && (
              <div>
                <div className="text-xs tracking-[0.35em] font-medium text-[#E39F25] uppercase mb-2">
                  BESPOKE EXPERIENCES
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif tracking-tight text-neutral-900 mb-6 leading-snug">
                  Curated Experiences Included
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentItinerary.activities.map((act, idx) => (
                    <div
                      key={idx}
                      className="bg-white border border-neutral-200/90 rounded-none overflow-hidden flex flex-col group shadow-2xs hover:shadow-xl hover:border-[#E39F25] transition-all duration-300"
                    >
                      {act.image_url && (
                        <div className="relative h-48 w-full bg-neutral-950 overflow-hidden">
                          <Image
                            src={act.image_url}
                            alt={act.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 30vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                          <div className="absolute top-3.5 left-3.5 z-10">
                            <span className="bg-black/75 backdrop-blur-md text-white text-[9px] tracking-widest uppercase px-3 py-1 border border-[#E39F25]/40 rounded-none font-medium">
                              Experience #{idx + 1}
                            </span>
                          </div>
                        </div>
                      )}
                      <div className="p-5 flex-1 flex flex-col justify-between">
                        <h4 className="font-serif text-base font-semibold text-neutral-900 mb-1.5">
                          {act.name}
                        </h4>
                        <p className="text-xs text-neutral-600 font-light leading-relaxed">
                          {act.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5.5 Inclusions & Exclusions */}
            <div>
              <div className="text-xs tracking-[0.35em] font-medium text-[#E39F25] uppercase mb-2">
                TRANSPARENCY &amp; VALUE
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif tracking-tight text-neutral-900 mb-6 leading-snug">
                What&apos;s Included &amp; Excluded
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Inclusions Card */}
                <div className="bg-white rounded-none border border-neutral-200/90 shadow-sm relative overflow-hidden">
                  <div className="bg-[rgb(25,25,112)] text-white py-3.5 px-5 flex items-center justify-between border-b border-[#E39F25]/30">
                    <span className="text-xs font-medium uppercase tracking-[0.25em] text-[#E39F25] flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#E39F25]" />
                      Package Inclusions
                    </span>
                  </div>
                  <ul className="p-6 space-y-3.5 text-xs text-neutral-700 font-light">
                    {currentItinerary.inclusions && currentItinerary.inclusions.length > 0 ? (
                      currentItinerary.inclusions.map((inc, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-[#E39F25] shrink-0 mt-0.5" />
                          <div>
                            <span className="font-medium text-neutral-900">{inc.title}</span>
                            {inc.description && (
                              <p className="text-[11px] text-neutral-500 mt-0.5">{inc.description}</p>
                            )}
                          </div>
                        </li>
                      ))
                    ) : (
                      <>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-[#E39F25] shrink-0 mt-0.5" />
                          <span>5-Star Luxury Accommodations with Breakfast</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-[#E39F25] shrink-0 mt-0.5" />
                          <span>Private Chauffeur Airport &amp; Inter-City Transfers</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-[#E39F25] shrink-0 mt-0.5" />
                          <span>VIP Fast-Track Entry to Listed Attractions</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-[#E39F25] shrink-0 mt-0.5" />
                          <span>24/7 Dedicated Member Concierge &amp; Host</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>

                {/* Exclusions Card */}
                <div className="bg-white rounded-none border border-neutral-200/90 shadow-sm relative overflow-hidden">
                  <div className="bg-neutral-900 text-white py-3.5 px-5 flex items-center justify-between border-b border-neutral-800">
                    <span className="text-xs font-medium uppercase tracking-[0.25em] text-neutral-300 flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-neutral-400" />
                      Package Exclusions
                    </span>
                  </div>
                  <ul className="p-6 space-y-3.5 text-xs text-neutral-600 font-light">
                    {currentItinerary.exclusions && currentItinerary.exclusions.length > 0 ? (
                      currentItinerary.exclusions.map((exc, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <XCircle className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-medium text-neutral-800">{exc.title}</span>
                            {exc.description && (
                              <p className="text-[11px] text-neutral-500 mt-0.5">{exc.description}</p>
                            )}
                          </div>
                        </li>
                      ))
                    ) : (
                      <>
                        <li className="flex items-start gap-3">
                          <XCircle className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                          <span>International Flights (unless explicitly requested)</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <XCircle className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                          <span>Personal Expenses, Spa Treatments &amp; Minibar</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <XCircle className="w-4 h-4 text-neutral-400 shrink-0 mt-0.5" />
                          <span>Visa Processing Fees &amp; Travel Insurance</span>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {/* 5.6 Frequently Asked Questions (FAQ) */}
            {currentItinerary.faqs && currentItinerary.faqs.length > 0 && (
              <div>
                <div className="text-xs tracking-[0.35em] font-medium text-[#E39F25] uppercase mb-2">
                  ESSENTIAL KNOWLEDGE
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif tracking-tight text-neutral-900 mb-6 leading-snug">
                  Frequently Asked Questions
                </h3>

                <div className="space-y-3.5">
                  {currentItinerary.faqs.map((faq, fIdx) => {
                    const isFaqOpen = openFaq === fIdx;
                    return (
                      <div
                        key={fIdx}
                        className="bg-white border border-neutral-200/90 rounded-none overflow-hidden shadow-2xs hover:border-[#E39F25]/60 transition-all"
                      >
                        <button
                          onClick={() => setOpenFaq(isFaqOpen ? null : fIdx)}
                          className="w-full flex items-center justify-between p-5 text-left hover:bg-[#FAFAFA] transition duration-200 cursor-pointer"
                        >
                          <span className="text-sm font-medium text-neutral-900 flex items-center gap-2.5">
                            <HelpCircle className="w-4 h-4 text-[#E39F25] shrink-0" />
                            {faq.question}
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 text-[#E39F25] transition-transform duration-300 ${
                              isFaqOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {isFaqOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                            >
                              <div className="p-5 pt-0 text-xs text-neutral-600 font-light leading-relaxed border-t border-neutral-100 bg-[#FAFAFA]">
                                {faq.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>

          {/* RIGHT SIDEBAR: STICKY LUXURY BOOKING & INQUIRY CARD */}
          <div className="lg:col-span-4 lg:sticky lg:top-28">
            <div className="bg-white border border-neutral-200/90 rounded-none shadow-xl overflow-hidden">
              
              {/* Luxury Header Banner in Midnight Navy & Gold */}
              <div className="bg-[rgb(25,25,112)] text-white p-6 sm:p-7 border-b border-[#E39F25]/30">
                <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-[#E39F25] block mb-2">
                  EXCLUSIVE LUXURY PACKAGE
                </span>
                <h3 className="text-2xl font-serif tracking-tight text-white">
                  Tailor This Itinerary
                </h3>
              </div>

              <div className="p-6 sm:p-7 space-y-6 bg-white">
                {/* Price Container */}
                <div className="p-4 sm:p-5 bg-[#FAFAFA] border border-neutral-200/80 rounded-none flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-neutral-400 uppercase tracking-widest block font-medium">
                      Starting from
                    </span>
                    <span className="text-2xl sm:text-3xl font-serif text-neutral-900 font-medium tracking-tight">
                      {currentItinerary.startingPrice || "₹1,45,000"}
                    </span>
                    <span className="text-xs text-neutral-500 font-light"> / person</span>
                  </div>
                  <span className="text-[10px] tracking-[0.2em] font-medium uppercase text-[#E39F25] bg-white px-3.5 py-1.5 border border-[#E39F25] rounded-sm">
                    {currentItinerary.duration.split("/")[0]}
                  </span>
                </div>

                {/* Inclusions List */}
                <div className="space-y-3 pt-1">
                  <h4 className="text-xs font-medium tracking-[0.25em] text-neutral-900 uppercase">
                    Included In Every Journey
                  </h4>
                  <ul className="space-y-2.5 text-xs text-neutral-600 font-light tracking-wide">
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#E39F25] shrink-0" />
                      <span>5-Star Handpicked Luxury Stays</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#E39F25] shrink-0" />
                      <span>Private Chauffeur &amp; Airport Transfers</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#E39F25] shrink-0" />
                      <span>Dedicated Member Concierge 24/7</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#E39F25] shrink-0" />
                      <span>Flexible Departure Dates &amp; Customizations</span>
                    </li>
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3 pt-3 border-t border-neutral-100">
                  <Link
                    href={`/contact?itinerary=${encodeURIComponent(currentItinerary.title)}`}
                    className="w-full flex items-center justify-center gap-2 border border-[#E39F25] bg-white text-[#E39F25] hover:bg-[#E39F25] hover:text-white transition-all duration-300 py-3.5 text-xs tracking-[0.25em] uppercase font-medium rounded-md shadow-2xs cursor-pointer active:scale-95 text-center"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>INQUIRE ABOUT THIS TRIP</span>
                  </Link>

                  <Link
                    href="/luxeclub"
                    className="w-full flex items-center justify-center gap-2 border border-[#E39F25] bg-[#E39F25] hover:bg-[#430021] text-white transition-all duration-300 py-3.5 text-xs tracking-[0.25em] uppercase font-medium rounded-md shadow-sm cursor-pointer active:scale-95 text-center"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-white" />
                    <span>ENROL VIA LUXE CLUB</span>
                  </Link>

                  <a
                    href={`https://wa.me/919999999999?text=${encodeURIComponent(
                      `Hello Luxe Concierge, I would like to inquire about the luxury itinerary: "${currentItinerary.title}" (${currentItinerary.duration})`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 border border-[rgb(25,25,112)] bg-[rgb(25,25,112)] hover:bg-neutral-900 text-white transition-all duration-300 py-3.5 text-xs tracking-[0.25em] uppercase font-medium rounded-md shadow-sm cursor-pointer active:scale-95 text-center"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-white" />
                    <span>WHATSAPP CONCIERGE</span>
                  </a>
                </div>

                <p className="text-[10px] text-center text-neutral-400 font-light pt-1 leading-relaxed">
                  No immediate deposit required. Our private luxury travel designers will connect with you within 2 business hours.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 6. RECOMMENDED TRIPS SECTION (Matching Homepage Itinerary Cards) */}
      <div className="bg-white border-t border-neutral-200/80 py-16 md:py-24 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-14 flex flex-col items-center">
            <div className="text-sm tracking-[0.4em] text-black uppercase font-light mb-4">
              CURATED SELECTION
            </div>
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif tracking-tight text-black">
              Recommended Luxury Itineraries
            </h3>
          </div>

          {/* Cards Grid Container matching Homepage Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-14">
            {recommendations.map((rec) => (
              <Link
                href={`/itinerary/${rec.id}`}
                key={rec.id}
                className="group relative h-[460px] w-full bg-black rounded-none overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer"
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
                      "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.65) 40%, rgba(0,0,0,0) 75%)",
                  }}
                />

                {/* Country Badge at Top */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <span className="bg-black/60 backdrop-blur-md text-white text-[10px] uppercase tracking-wider px-3 py-1.5 border border-white/20 rounded-none">
                    {rec.country}
                  </span>
                  <div className="bg-black/60 backdrop-blur-md text-white text-xs font-light tracking-wider px-3.5 py-1.5 border border-white/20 flex items-center gap-1.5 rounded-none">
                    <Star className="w-3.5 h-3.5 fill-[#E39F25] text-[#E39F25]" />
                    <span>4.9</span>
                  </div>
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white z-10">
                  <div className="text-[10px] text-[#E39F25] uppercase tracking-widest font-medium mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#E39F25]" />
                    <span>{rec.duration}</span>
                  </div>

                  <h4 className="text-xl font-serif tracking-tight text-white leading-snug mb-2 group-hover:text-[#E39F25] transition-colors">
                    {rec.title}
                  </h4>

                  <p className="leading-relaxed line-clamp-2 font-light mb-4 text-white/80 text-xs">
                    {rec.description}
                  </p>

                  <div className="pt-4 border-t border-white/20 flex items-center justify-between">
                    <div className="text-[11px] text-white/80 font-medium uppercase tracking-wider">
                      <span>From {rec.price}</span>
                      <span className="text-white/60 font-light text-[10px]"> / person</span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 text-xs font-medium text-white group-hover:text-[#E39F25] transition-colors duration-200 uppercase tracking-widest">
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
              className="inline-flex items-center gap-2 border border-[#E39F25] bg-white text-[#E39F25] hover:bg-[#E39F25] hover:text-white font-medium text-xs uppercase tracking-[0.25em] px-8 py-3.5 rounded-md transition-all duration-300 shadow-2xs cursor-pointer active:scale-95"
            >
              <span>VIEW ALL ITINERARIES</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>

      {/* Indigo Vertical Line Accent before footer (matching Brands Page) */}
      <div className="flex justify-center mt-16 md:mt-20">
        <div className="w-[1.5px] h-28 md:h-36 bg-[rgb(25,25,112)]"></div>
      </div>

    </main>
  );
}
