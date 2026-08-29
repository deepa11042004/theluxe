"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { CheckCircle2, ShieldCheck, Star, ChevronLeft, ChevronRight, Heart, Crown, Gem, Sparkles } from "lucide-react";

const GALLERY_IMAGES = [
  "Taj-ADDS-featured-image-1366x768.webp",
  "alex-muzenhardt-4MQ0T4zBIys-unsplash.jpg",
  "antonio-araujo-_Fa7cnjezGc-unsplash.jpg",
  "isaac-quesada-xc4oxgAbDmw-unsplash.jpg",
  "luigi-pozzoli-34Xicn82lY4-unsplash.jpg",
  "mustafa-fatemi-f_LVflLUkv4-unsplash.jpg",
  "reisetopia-3n7bxyRYQ24-unsplash.jpg",
  "zoshua-colah-2emvg3WMluM-unsplash.jpg",
  "zoshua-colah-JuI0xTZyKJ0-unsplash.jpg",
  "zoshua-colah-vG-HDgrepRg-unsplash.jpg"
];

// Benefit Data Types
const BENEFITS_CARDS = [
  {
    title: "7N/8D holidays every year",
    tags: "VACATION • LEISURE • FAMILY",
    image: "https://picsum.photos/seed/holiday1/600/400"
  },
  {
    title: "Large premium rooms",
    tags: "LUXURY • COMFORT • SPACE",
    image: "https://picsum.photos/seed/rooms/600/400"
  },
  {
    title: "Future-proof pricing",
    tags: "VALUE • INVESTMENT • SECURE",
    image: "https://picsum.photos/seed/pricing/600/400"
  },
  {
    title: "24/7 concierge support",
    tags: "SERVICE • ASSISTANCE • VIP",
    image: "https://picsum.photos/seed/concierge/600/400"
  },
  {
    title: "Access to international resorts",
    tags: "GLOBAL • TRAVEL • EXOTIC",
    image: "https://picsum.photos/seed/international/600/400"
  },
  {
    title: "Crafted experiences",
    tags: "MEMORIES • UNIQUE • CURATED",
    image: "https://picsum.photos/seed/experiences/600/400"
  },
  {
    title: "Complimentary breakfast",
    tags: "DINING • MORNING • DELIGHT",
    image: "https://picsum.photos/seed/breakfast/600/400"
  },
  {
    title: "Easy exit, no questions asked",
    tags: "FLEXIBILITY • TRUST • FREEDOM",
    image: "https://picsum.photos/seed/exit/600/400"
  }
];

// Membership Cards Data Types (Taj Epicure Inspired Luxury Membership Passes)
const MEMBERSHIPS = [
  {
    id: "signature",
    title: "LUXE SIGNATURE",
    cardHeaderTitle: "LUXE SIGNATURE",
    cardHeaderSub: "YOUR GATEWAY TO LUXURY STAYS",
    tagline: "domestic",
    image: "/Img/card-domestic.jpg",
    displayName: "Luxe Signature",
    price: "₹ 12,999",
    taxText: "ONE YEAR • INDIA",
    cardBg: "bg-gradient-to-br from-[#111111] via-[#0a0a0a] to-[#000000] text-white",
    watermarkColor: "#60A5FA",
    subtitle: "One full year of premium hotel privileges, exclusive rates and travel benefits across India.",
    benefits: [
      "5-Star & Premium Hotel Access",
      "Exclusive Member Rates & Privileges",
      "Unlimited Eligible Discount-Night Bookings*",
      "Complimentary Welcome Stay Benefit*",
      "Domestic Travel & Holiday Assistance",
      "Airport Transfer Assistance",
      "Dining & Lifestyle Privileges",
      "Exclusive Member-Only Offers",
      "Dedicated Booking Assistance",
    ],
  },
  {
    id: "diamond",
    title: "LUXE DIAMOND",
    cardHeaderTitle: "LUXE DIAMOND",
    cardHeaderSub: "YOUR PASSPORT TO WORLDWIDE LUXURY",
    isPopular: true,
    tagline: "worldwide",
    image: "/Img/card-worldwide.jpg",
    displayName: "Luxe Diamond",
    price: "₹ 19,999",
    taxText: "ONE YEAR • WORLDWIDE",
    cardBg: "bg-gradient-to-br from-[#0A1B36] via-[#08152B] to-[#040B17] text-white",
    watermarkColor: "#F87171",
    subtitle: "Your gateway to premium travel privileges across India and worldwide.",
    benefits: [
      "Everything in Luxe Signature",
      "Worldwide 5-Star & Luxury Hotel Access",
      "Exclusive International Hotel Rates & Privileges",
      "International Travel & Holiday Assistance",
      "Visa & Travel Insurance Assistance",
      "Cruise & Luxury Experience Assistance",
      "Airport Transfer Assistance",
      "International Dining & Lifestyle Privileges",
      "Exclusive Worldwide Member Offers",
      "Priority Booking & Travel Assistance",
    ],
  },
  {
    id: "imperial",
    title: "LUXE IMPERIAL",
    cardHeaderTitle: "LUXE IMPERIAL",
    cardHeaderSub: "LIFETIME ACCESS TO THE LUXE LIFESTYLE",
    tagline: "lifetime",
    image: "/Img/card-lifetime.jpg",
    displayName: "Luxe Imperial",
    price: "₹ 49,999",
    taxText: "LIFETIME MEMBERSHIP • WORLDWIDE",
    cardBg: "bg-gradient-to-br from-[#064E3B] via-[#043E2F] to-[#022C22] text-white",
    watermarkColor: "#34D399",
    subtitle: "Pay once and enjoy The Luxe Yatra lifestyle worldwide for a lifetime.",
    benefits: [
      "Lifetime Membership",
      "Worldwide 5-Star & Luxury Hotel Access",
      "Exclusive Hotel Rates & Premium Privileges",
      "Unlimited Eligible Discount-Night Bookings*",
      "Domestic & International Travel Assistance",
      "Visa & Travel Insurance Assistance",
      "Cruise & Luxury Experience Assistance",
      "Premium Dining & Lifestyle Privileges",
      "Exclusive Lifetime Member Offers",
      "Priority Booking & Concierge Assistance",
      "Family Travel Privileges",
    ],
  },
];

function MandalaPattern() {
  return (
    <svg
      viewBox="0 0 200 200"
      className="w-72 h-72 stroke-[#E5C158]/70 fill-none stroke-[1.2] pointer-events-none"
    >
      <circle cx="100" cy="100" r="85" />
      <circle cx="100" cy="100" r="65" />
      <circle cx="100" cy="100" r="45" />
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
        <g key={deg} transform={`rotate(${deg} 100 100)`}>
          <ellipse cx="100" cy="55" rx="14" ry="32" />
          <polygon points="100,15 108,35 100,55 92,35" />
        </g>
      ))}
    </svg>
  );
}

function LuxeLogoEmblem() {
  return (
    <div className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-3 relative flex items-center justify-center rounded-full bg-white p-1 shadow-md border border-[#E5C158]/50">
      <Image
        src="/Img/logo-emblem-v3.png"
        alt="Luxe Yatra Logo"
        fill
        className="object-contain p-0.5"
      />
    </div>
  );
}

export default function Membersec() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.85;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const [galleryIndex, setGalleryIndex] = useState(0);
  const maxGalleryIndex = Math.max(0, GALLERY_IMAGES.length - 2);

  const nextGallerySlide = useCallback(() => {
    setGalleryIndex((prev) => (prev >= maxGalleryIndex ? 0 : prev + 1));
  }, [maxGalleryIndex]);

  const prevGallerySlide = () => {
    setGalleryIndex((prev) => (prev <= 0 ? maxGalleryIndex : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextGallerySlide, 4000);
    return () => clearInterval(timer);
  }, [nextGallerySlide]);

  return (
    <section className="relative bg-white w-full overflow-hidden text-neutral-900 border-y border-neutral-200/60">

      {/* SECTION 1: Luxe Club INFO */}
      <div className="relative py-20 px-6 max-w-6xl mx-auto text-center z-10">
        {/* Subtle Decorative Abstract Lines Background */}
        <div className="absolute top-0 left-0 w-44 h-44 opacity-30 pointer-events-none select-none">
          <svg
            viewBox="0 0 100 100"
            className="stroke-neutral-300 fill-none stroke-[0.5]"
          >
            <path d="M0,0 Q30,70 100,100 M0,20 Q40,80 100,120 M0,40 Q50,90 100,140" />
          </svg>
        </div>

        {/* Central Brand Emblem */}
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#B38E46] shadow-md mb-6">
          <span className="text-white font-[Vera] text-xl tracking-wider font-bold">
            LC
          </span>
        </div>

        <h2 className="text-sm tracking-[0.3em] text-black uppercase mb-3">
          Luxe Club
        </h2>
        <h3 className="text-3xl md:text-5xl tracking-tight text-black mb-6">
          A World of Privileged Access
        </h3>

        <p className="text-sm md:text-base max-w-3xl mx-auto leading-relaxed mb-16">
          Luxe Club unlocks privileged access to 140+ premium Club Mahindra
          resorts, offering 7 nights/8 days holidays every year — filled with
          cherished family moments and thoughtfully crafted experiences across
          India and beyond. This membership programme is designed for modern
          families who seek simplicity, flexibility, and elevated holiday
          experiences.
        </p>

        {/* Open Grid Layout for Key Benefits */}
        <div className="max-w-6xl mx-auto mt-12 w-full">
          <h4 className="text-base tracking-[0.15em] text-[#B38E46] uppercase text-center mb-8 flex items-center justify-center gap-2">
            <Star className="w-4 h-4 fill-[#B38E46] text-[#B38E46]" /> Key Privileged Benefits
          </h4>
          <div className="columns-1 sm:columns-2 lg:columns-4 gap-6 text-left w-full space-y-6">
            {BENEFITS_CARDS.map((card, i) => {
              const aspectRatios = [
                "aspect-[4/5]",
                "aspect-[3/4]",
                "aspect-[4/3]",
                "aspect-[2/3]",
                "aspect-square",
                "aspect-[3/5]",
                "aspect-[4/3]",
                "aspect-[4/5]"
              ];
              
              return (
              <div
                key={i}
                className="break-inside-avoid bg-white border border-neutral-100 shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col mb-6"
              >
                {/* Image Section */}
                <div className={`relative w-full overflow-hidden ${aspectRatios[i % 8]}`}>
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    unoptimized
                  />
                </div>
                {/* Text Content */}
                <div className="p-5 flex-grow flex flex-col">
                  <h3 className="text-lg font-medium text-black mb-2 leading-snug">
                    {card.title}
                  </h3>
                  <div className="text-[10px] text-neutral-500 uppercase tracking-widest mt-auto">
                    {card.tags}
                  </div>
                </div>
              </div>
            )})}
          </div>
        </div>
      </div>

      {/* SECTION 1.5: GALLERY SLIDER (Hidden as requested) */}
      {/* 
      <div className="relative w-full max-w-[100vw] bg-white pt-8 pb-16 border-t border-neutral-200/60 overflow-hidden group/slider">
        ...
      </div> 
      */}


      {/* SECTION 2: MEMBERSHIP TYPES & CARDS (TAJ EPICURE STYLE) */}
      <div className="relative z-10 bg-white text-black py-12 md:py-16 px-6 w-full border-t border-neutral-200/60">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl md:text-5xl tracking-tight text-black mb-4 uppercase">
            CHOOSE YOUR MEMBERSHIP
          </h3>
          <p className="text-xs md:text-sm tracking-widest mb-8 md:mb-10 uppercase">
            EXCLUSIVE ACCESS. PRIVILEGED BENEFITS. EXTRAORDINARY JOURNEYS
          </p>

          {/* Taj Epicure Membership Card Grid */}
          <div ref={scrollRef} className="flex md:grid md:grid-cols-3 overflow-x-auto snap-x snap-mandatory gap-6 md:gap-8 items-start mb-6 md:mb-8 pb-4 md:pb-8 px-2 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {MEMBERSHIPS.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="flex flex-col text-left group w-[85vw] max-w-[340px] sm:max-w-none sm:w-[400px] md:w-auto shrink-0 snap-center bg-white border border-neutral-200/80 rounded-none p-5 md:p-6 shadow-xs hover:shadow-xl transition-all duration-300 h-full relative overflow-hidden"
              >
                {/* CORNER RIBBON FOR MOST POPULAR */}
                {card.isPopular && (
                  <div className="absolute top-0 right-0 w-28 h-28 overflow-hidden pointer-events-none z-20">
                    <div className="bg-gradient-to-r from-[#B38E46] via-[#F3E5AB] to-[#AA7C11] text-black font-black text-[9px] leading-tight uppercase tracking-wider py-1.5 w-[140px] text-center absolute top-[18px] -right-[36px] rotate-45 shadow-md border-y border-[#997734]/40 flex flex-col justify-center items-center">
                      <span>MOST</span>
                      <span>POPULAR</span>
                    </div>
                  </div>
                )}

                {/* 0. CARD HEADER TITLE & SUBTITLE (LUXURY DIVIDER STYLE WITH RELATIVE CARD BG & GEOMETRIC TEXTURE) */}
                <div className={`-mx-5 -mt-5 px-5 py-12 md:-mx-6 md:-mt-6 md:px-6 md:py-16 mb-5 text-center flex flex-col items-center justify-center min-h-[180px] md:min-h-[220px] border-b border-white/10 ${card.cardBg} shadow-inner relative overflow-hidden`}>
                  {/* Geometric Diamond Lattice Texture Background Overlay */}
                  <div className="absolute inset-0 pointer-events-none opacity-25 z-0 select-none">
                    <svg className="w-full h-full" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <pattern id={`diamond-texture-${card.id}`} width="28" height="28" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                          <rect x="0" y="0" width="28" height="28" fill="none" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="0.75" />
                          <rect x="7" y="7" width="14" height="14" fill="none" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="0.5" />
                        </pattern>
                      </defs>
                      <rect width="100%" height="100%" fill={`url(#diamond-texture-${card.id})`} />
                    </svg>
                  </div>

                  {/* Content (z-10 layer above texture) */}
                  <div className="relative z-10 flex flex-col items-center w-full">
                    <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-[#B38E46] tracking-[0.2em] uppercase font-[Vera]">
                      {card.cardHeaderTitle}
                    </h3>

                    {/* Golden Line with Icon Ornament */}
                    <div className="flex items-center justify-center gap-3 my-2 w-full max-w-[160px]">
                      <div className="h-[1px] bg-gradient-to-r from-transparent to-[#B38E46] flex-1"></div>
                      {card.id === "signature" && <Sparkles className="w-3.5 h-3.5 text-[#B38E46]" />}
                      {card.id === "diamond" && <Gem className="w-3.5 h-3.5 text-[#B38E46]" />}
                      {card.id === "imperial" && <Crown className="w-3.5 h-3.5 text-[#B38E46]" />}
                      <div className="h-[1px] bg-gradient-to-l from-transparent to-[#B38E46] flex-1"></div>
                    </div>

                    <p 
                      className="text-[9px] md:text-[10px] !text-white font-medium tracking-wider uppercase whitespace-nowrap opacity-100 drop-shadow-sm"
                      style={{ color: "#ffffff" }}
                    >
                      {card.cardHeaderSub}
                    </p>
                  </div>
                </div>



                {/* 2. PRICE DETAILS (CENTERED WITH BORDER) */}
                <div className="mt-6 flex flex-col items-center w-full">
                  <div className="flex flex-col items-center justify-center text-center border border-[#B38E46]/60 rounded-none py-4 w-full mx-4 shadow-sm bg-[#B38E46]/[0.03]">
                    <span className="text-3xl font-extrabold font-[Vera] text-neutral-900">
                      {card.price}
                    </span>
                  </div>
                  <span className="mt-3 text-[11px] text-neutral-500 font-medium uppercase tracking-widest text-center">
                    {card.taxText}
                  </span>
                  <div className="mt-4 w-3/4 max-w-[150px] h-[1px] bg-gradient-to-r from-transparent via-[#B38E46] to-transparent opacity-70"></div>
                </div>

                {/* 3. INCLUDED BENEFITS LIST INSIDE CARD */}
                <div className="mt-6 flex-grow">
                  <ul className="space-y-3">
                    {card.benefits.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5 text-xs md:text-sm font-[Vera] text-neutral-800 tracking-wide leading-snug">
                        <CheckCircle2 className="w-4 h-4 text-[#B38E46] shrink-0 mt-[2px]" />
                        <span className="font-[Vera]">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 4. ENROL BUTTON */}
                <div className="mt-6 w-full pt-4 border-t border-neutral-100/50">
                  <a
                    href="/luxeclub"
                    className="block w-full text-center bg-[#B38E46] hover:bg-[#997734] active:scale-95 text-white font-bold text-sm uppercase tracking-wider px-4 py-3.5 rounded-none transition duration-200 shadow-sm cursor-pointer"
                  >
                    ENROL NOW
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile Scroll Controls */}
          <div className="flex md:hidden justify-center items-center gap-4 mt-2 z-20 relative">
            <button onClick={() => scroll('left')} className="p-2 text-[#B38E46] active:scale-95 transition-transform" aria-label="Scroll left">
              <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />
            </button>
            <button onClick={() => scroll('right')} className="p-2 text-[#B38E46] active:scale-95 transition-transform" aria-label="Scroll right">
              <ChevronRight className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
