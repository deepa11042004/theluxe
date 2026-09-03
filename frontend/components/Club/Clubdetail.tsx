"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { ArrowLeft, ArrowRight, ShieldCheck, Check, X, ChevronLeft, ChevronRight, Hotel, Gift, Plane, Globe, Headphones } from "lucide-react";
import Image from "next/image";

const HotelIcon = () => (
  <svg width="32" height="32" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="10" width="24" height="24" rx="2" fill="#60A5FA"/>
    <path d="M18 10h10a2 2 0 0 1 2 2v22H18V10z" fill="#3B82F6"/>
    <path d="M4 12L18 4l14 8H4z" fill="#1D4ED8"/>
    <rect x="10" y="16" width="4" height="4" rx="1" fill="#DBEAFE"/>
    <rect x="10" y="22" width="4" height="4" rx="1" fill="#DBEAFE"/>
    <rect x="22" y="16" width="4" height="4" rx="1" fill="#BFDBFE"/>
    <rect x="22" y="22" width="4" height="4" rx="1" fill="#BFDBFE"/>
    <path d="M14 28h8v6h-8v-6z" fill="#1E3A8A"/>
  </svg>
);

const GiftIcon = () => (
  <svg width="32" height="32" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="16" width="24" height="18" rx="1" fill="#F87171"/>
    <path d="M18 16h12a1 1 0 0 1 1 1v17H18V16z" fill="#EF4444"/>
    <rect x="4" y="10" width="28" height="6" rx="1" fill="#FCA5A5"/>
    <path d="M18 10h13a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H18v-6z" fill="#F87171"/>
    <rect x="15" y="10" width="6" height="24" fill="#FCD34D"/>
    <path d="M18 10h3v24h-3V10z" fill="#FBBF24"/>
    <path d="M17 10C17 10 12 2 8 5c-3.12 2.34 2 5 9 5z" fill="#FBBF24"/>
    <path d="M19 10c0 0 5-8 9-5 3.12 2.34-2 5-9 5z" fill="#F59E0B"/>
  </svg>
);

const PlaneIcon = () => (
  <svg width="32" height="32" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="rotate(-45 18 18) translate(2, -2)">
      <path d="M18 4C18 4 15 4 15 8V24L18 32L21 24V8C21 4 18 4 18 4Z" fill="#E2E8F0"/>
      <path d="M18 4V32L21 24V8C21 4 18 4 18 4Z" fill="#CBD5E1"/>
      <path d="M15 16L4 20V22L15 20V16Z" fill="#94A3B8"/>
      <path d="M21 16L32 20V22L21 20V16Z" fill="#64748B"/>
      <path d="M15 26L10 30V32L15 30V26Z" fill="#94A3B8"/>
      <path d="M21 26L26 30V32L21 30V26Z" fill="#64748B"/>
      <path d="M17 7h2v3h-2V7z" fill="#38BDF8"/>
    </g>
  </svg>
);

const GlobeIcon = () => (
  <svg width="32" height="32" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="18" cy="18" r="14" fill="#38BDF8"/>
    <path d="M18 4a14 14 0 0 1 0 28V4z" fill="#0EA5E9"/>
    <path d="M10 12c2-4 6-2 8 0s-2 6-4 8-6-4-4-8z" fill="#4ADE80"/>
    <path d="M18 12c-2 2-2 6-4 8 2 2 6-2 4-8z" fill="#22C55E"/>
    <path d="M24 16c2-1 4 3 2 6s-5 4-6 2 2-7 4-8z" fill="#4ADE80"/>
    <path d="M24 16c-1 2-1 5-2 6 2 1 4-2 2-6z" fill="#22C55E"/>
    <path d="M12 24c2-1 5 1 4 4s-4 2-5 0 0-3 1-4z" fill="#4ADE80"/>
  </svg>
);

const BellIcon = () => (
  <svg width="32" height="32" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 28h24v4H6v-4z" fill="#475569"/>
    <path d="M18 28h12v4H18v-4z" fill="#334155"/>
    <path d="M8 28c0-5.52 4.48-14 10-14s10 8.48 10 14H8z" fill="#FBBF24"/>
    <path d="M18 14c5.52 0 10 8.48 10 14H18V14z" fill="#F59E0B"/>
    <path d="M16 10h4v4h-4v-4z" fill="#94A3B8"/>
    <path d="M18 10h2v4h-2v-4z" fill="#64748B"/>
    <path d="M15 8h6v2h-6V8z" fill="#CBD5E1"/>
  </svg>
);

// Modern Luxury Benefit Card Component
const BenefitCard = ({ title, icon, items, className = "" }: { title: string, icon: React.ReactNode, items: string[], className?: string }) => (
  <div className={`bg-white p-8 rounded-none border border-neutral-200/90 shadow-sm hover:shadow-xl hover:border-[#B38E46]/60 transition-all duration-300 group flex flex-col text-left ${className}`}>
    <div className="w-12 h-12 rounded-sm bg-[#B38E46]/10 border border-[#B38E46]/30 flex items-center justify-center text-[#B38E46] mb-6 group-hover:bg-[#B38E46] group-hover:text-white transition-colors duration-300">
      {icon}
    </div>
    <h4 className="text-xl font-[Vera] tracking-tight text-neutral-900 mb-5 font-bold">
      {title}
    </h4>
    <ul className="space-y-3 font-sans">
      {items.map((item, idx) => (
        <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-700 font-medium leading-relaxed">
          <Check className="w-4 h-4 text-[#B38E46] mt-0.5 shrink-0" strokeWidth={2.5} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

// Reconfigured Data Array
const CAROUSEL_PRIVILEGES = [
  {
    id: 1,
    title: "7N/8D a year, your way",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Future-proof pricing",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Spacious suites for stays",
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Unique family experiences",
    image:
      "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "140+ Premium Resorts Access",
    image:
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    title: "Complimentary fine dining",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 7,
    title: "Airport transfers & VIP services",
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 8,
    title: "Personalised holiday planning",
    image:
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 9,
    title: "Exclusive global events",
    image:
      "https://images.unsplash.com/photo-1549451371-64aa98a6f660?auto=format&fit=crop&w=800&q=80",
  },
];

const MEMBERSHIPS = [
  {
    id: "signature",
    title: "LUXE SIGNATURE",
    price: "₹ 12,999",
    duration: "ONE YEAR • DOMESTIC",
    subtitle: "One full year of premium hotel privileges, exclusive rates and travel benefits across India.",
    bgClass: "bg-gradient-to-b from-[#141414] via-[#0d0d0d] to-[#050505] text-white border-neutral-800 hover:border-[#B38E46]/60",
    badge: null,
    benefits: [
      "5-Star & Premium Hotel Access",
      "Exclusive Member Rates & Privileges",
      "Unlimited Eligible Discount-Night Bookings*",
      "Complimentary Welcome Stay Benefit*",
      "Domestic Travel & Holiday Assistance",
      "Airport Transfer Assistance",
      "Dining & Lifestyle Privileges",
      "Exclusive Member-Only Offers",
      "Dedicated Booking Assistance"
    ],
  },
  {
    id: "diamond",
    title: "LUXE DIAMOND",
    price: "₹ 19,999",
    duration: "ONE YEAR • WORLDWIDE",
    subtitle: "Your gateway to 5-star hotel privileges and premium travel benefits across India and worldwide.",
    bgClass: "bg-gradient-to-b from-[#0e1d35] via-[#091426] to-[#040914] text-white border-[#B38E46]/50 hover:border-[#B38E46] shadow-xl shadow-[#B38E46]/10",
    badge: "MOST POPULAR",
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
      "Priority Booking & Travel Assistance"
    ],
  },
  {
    id: "imperial",
    title: "LUXE IMPERIAL",
    price: "₹ 49,999",
    duration: "LIFETIME • WORLDWIDE",
    subtitle: "Pay once and enjoy The Luxe Yatra lifestyle and worldwide privileges for a lifetime.",
    bgClass: "bg-gradient-to-b from-[#0a2e29] via-[#061d19] to-[#020d0b] text-white border-emerald-900/60 hover:border-[#B38E46]/60",
    badge: "LIFETIME ACCESS",
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
      "Family Travel Privileges"
    ],
  },
];

export default function Membersec() {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [shiftCalc, setShiftCalc] = useState('calc(25% + 6px)');

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerPage(4);
        setShiftCalc(`calc(25% + 6px)`); // 100/4 + 24/4
      } else if (window.innerWidth >= 768) {
        setItemsPerPage(3);
        setShiftCalc(`calc(33.3333% + 8px)`); // 100/3 + 24/3
      } else if (window.innerWidth >= 640) {
        setItemsPerPage(2);
        setShiftCalc(`calc(50% + 12px)`); // 100/2 + 24/2
      } else {
        setItemsPerPage(1);
        setShiftCalc(`calc(100% + 24px)`); // 100/1 + 24/1
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalItems = CAROUSEL_PRIVILEGES.length;
  const maxIndex = Math.max(0, totalItems - itemsPerPage);

  const isFirstSlide = carouselIndex === 0;
  const isLastSlide = carouselIndex >= maxIndex;

  const handleNext = () => {
    if (!isLastSlide) setCarouselIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (!isFirstSlide) setCarouselIndex((prev) => prev - 1);
  };

  return (
    <section className="bg-white w-full overflow-hidden select-none border-t border-neutral-200/60">
      {/* SECTION 1: Luxe Club INFO */}
      <div className="relative pt-24 pb-16 px-6 max-w-7xl mx-auto text-center z-10">
        <div className="absolute top-0 left-0 w-44 h-44 opacity-20 pointer-events-none select-none">
          <svg
            viewBox="0 0 100 100"
            className="stroke-neutral-300 fill-none stroke-[0.5]"
          >
            <path d="M0,0 Q30,70 100,100 M0,20 Q40,80 100,120 M0,40 Q50,90 100,140" />
          </svg>
        </div>

        {/* Micro-Header Tag */}
        <div className="text-sm tracking-[0.4em] text-black uppercase font-light mb-6">
          LUXE CLUB
        </div>

        {/* Luxury Serif Headline matching About section */}
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif tracking-tight text-black mb-4">
          A World of Privileged Access
        </h2>
        <p className="text-xl sm:text-2xl md:text-3xl font-serif font-light text-black uppercase tracking-wider mb-6">
          DISCOVER A WORLD OF PRIVILEGES
        </p>

        {/* Small Golden Vertical Divider */}
        <div className="flex justify-center my-6">
          <div className="w-[1.5px] h-12 md:h-16 bg-[#B38E46]/80"></div>
        </div>

        <p className="text-black text-sm sm:text-base xl:text-lg leading-relaxed tracking-wide max-w-3xl mx-auto mb-16">
          Luxe Club unlocks privileged access to 140+ premium resorts,
          offering 7 nights/8 days holidays every year — filled with cherished
          family moments and thoughtfully crafted experiences.
        </p>

        {/* HORIZONTAL SLIDING PRIVILEGES CAROUSEL */}
        <div className="w-full relative flex flex-col items-center mt-4">
          {/* Small Golden Vertical Divider */}
          <div className="flex justify-center mb-6">
            <div className="w-[1.5px] h-12 md:h-16 bg-[#B38E46]/80"></div>
          </div>

          <h4 className="text-3xl md:text-5xl font-[Vera] tracking-tight text-black mb-10">
            Handpicked Privileges
          </h4>

          {/* Carousel Viewport:  */}
          <div className="w-full overflow-hidden relative">
            <motion.div
              animate={{
                x: `calc(-${carouselIndex} * ${shiftCalc})`,
              }}
              transition={{ type: "spring", stiffness: 140, damping: 20 }}
              className="flex items-stretch gap-6 w-full"
            >
              {CAROUSEL_PRIVILEGES.map((item) => (
                <div
                  key={item.id}
                  className="relative shrink-0 w-full sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] aspect-3/4 rounded-none overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-black cursor-pointer group"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Overlay Gradient for text readability */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0) 75%)",
                    }}
                  />

                  <div className="absolute inset-0 p-5 flex flex-col justify-end text-white z-10 text-left">
                    <span className="text-[10px] text-white/80 uppercase tracking-widest font-medium mb-1 font-[Vera]">
                      LUXE PRIVILEGE
                    </span>
                    <h5
                      className="text-base md:text-lg font-medium text-white leading-snug group-hover:text-[#B38E46] transition-colors duration-200"
                      style={{ color: "#ffffff", fontFamily: "var(--work-font), sans-serif" }}
                    >
                      {item.title}
                    </h5>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Carousel Control Arrows & Dots */}
          <div className="flex items-center justify-center gap-6 mt-10">
            <button
              onClick={handlePrev}
              disabled={isFirstSlide}
              className="text-[#B38E46] hover:text-[#997734] transition-all hover:scale-110 disabled:opacity-30 cursor-pointer drop-shadow-md"
              aria-label="Previous Privileges"
            >
              <ChevronLeft className="w-10 h-10 md:w-12 md:h-12" strokeWidth={1.2} />
            </button>

            {/* Standardized Dot Indicators */}
            <div className="flex items-center justify-center gap-3">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCarouselIndex(i)}
                  className="focus:outline-none cursor-pointer p-1"
                  aria-label={`Go to slide ${i + 1}`}
                >
                  <div
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      i === carouselIndex
                        ? "bg-black scale-125"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                </button>
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={isLastSlide}
              className="text-[#B38E46] hover:text-[#997734] transition-all hover:scale-110 disabled:opacity-30 cursor-pointer drop-shadow-md"
              aria-label="Next Privileges"
            >
              <ChevronRight className="w-10 h-10 md:w-12 md:h-12" strokeWidth={1.2} />
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 2: MEMBERSHIP PLANS */}
      <div className="bg-white text-black border-t border-neutral-200 py-20 md:py-24 px-6 w-full">
        <div className="max-w-7xl mx-auto text-center flex flex-col items-center">
          <div className="text-sm tracking-[0.4em] text-black uppercase font-light mb-6">
            EXPLORE MEMBERSHIPS
          </div>
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif tracking-tight text-black mb-4">
            Your Key to Unlock Privileged Experiences
          </h3>
          <p className="text-xs md:text-sm max-w-xl leading-relaxed text-neutral-600 mb-14">
            Select from Signature, Diamond, and Imperial cards and enter a world of seamless vacations.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-14">
            {MEMBERSHIPS.map((card, idx) => (
              <TiltCard key={idx} card={card} />
            ))}
          </div>


          {/* NEW SECTION: GENERAL BENEFITS */}
          <div className="text-center mt-20 pt-20 border-t border-neutral-200 max-w-5xl mx-auto flex flex-col items-center w-full">
            <div className="text-sm tracking-[0.4em] text-black uppercase font-light mb-6">
              EXCLUSIVE PRIVILEGES
            </div>
            <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif tracking-tight text-black mb-4">
              Member Benefits
            </h3>
            <p className="text-xs md:text-sm max-w-xl leading-relaxed text-neutral-600 mb-14">
              Unlock exclusive luxury hotel vouchers, dining privileges, and complete travel services designed around your lifestyle.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <BenefitCard
                title="Luxury Hotel Benefits"
                icon={<Hotel className="w-6 h-6" />}
                items={[
                  "Access to 10,000+ hotels & resorts",
                  "Premium 4★ & 5★ hotel offers",
                  "Exclusive member rates",
                  "Luxury hotel discounts",
                  "Special hotel packages & seasonal offers",
                  "Selected property upgrades & added privileges",
                ]}
              />

              <BenefitCard
                title="₹50,000 Welcome Benefits"
                icon={<Gift className="w-6 h-6" />}
                items={[
                  "Luxury hotel vouchers",
                  "Partner hotel vouchers",
                  "Dining & lifestyle vouchers",
                  "Special travel offers",
                ]}
              />

              <BenefitCard
                title="Complete Travel Benefits"
                icon={<Plane className="w-6 h-6" />}
                items={[
                  "Domestic & international flights",
                  "Holiday packages",
                  "Airport transfers",
                  "Visa assistance",
                  "Travel insurance assistance",
                  "Cruises & luxury experiences",
                ]}
              />

              <BenefitCard
                title="Bespoke Travel"
                icon={<Globe className="w-6 h-6" />}
                items={[
                  "Personalised holiday planning",
                  "International destinations",
                  "Family vacations",
                  "Honeymoon & romantic getaways",
                  "Destination weddings",
                  "Corporate & group travel",
                ]}
              />

              <BenefitCard
                title="Luxe Concierge"
                icon={<Headphones className="w-6 h-6" />}
                className="md:col-span-2 lg:col-span-1"
                items={[
                  "Dedicated booking assistance",
                  "Hotel & holiday recommendations",
                  "Special occasion arrangements",
                  "Priority travel assistance",
                ]}
              />
            </div>
            
            <div className="mt-16 text-center bg-gradient-to-br from-[#B38E46] to-[#B38E46] p-12 rounded-none relative overflow-hidden">
              <div 
                className="absolute inset-0 opacity-20 pointer-events-none" 
                style={{ 
                  backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)", 
                  backgroundSize: "24px 24px" 
                }} 
              />
              <div className="relative z-10">
                <h4 className="text-2xl md:text-4xl tracking-widest italic mb-6 text-white drop-shadow-md">
                  “One Membership. A World of Luxury Travel Privileges.”
                </h4>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 text-sm md:text-base font-semibold text-neutral-900">
                  <span>Membership ₹12,999/year</span>
                  <span className="hidden sm:block opacity-40 text-neutral-900">•</span>
                  <span>Regular Value ₹29,999</span>
                  <span className="hidden sm:block opacity-40 text-neutral-900">•</span>
                  <span>Welcome Benefits up to ₹50,000</span>
                  <span className="hidden sm:block opacity-40 text-neutral-900">•</span>
                  <span>10,000+ Hotels & Resorts Worldwide</span>
                </div>
              </div>
            </div>
          </div>

          {/* NEW SECTION: COMPARISON TABLE */}
          <div className="mt-24 max-w-6xl mx-auto pb-10 px-4 sm:px-6 w-full">
            <h3 className="text-3xl md:text-5xl font-[Vera] tracking-tight text-center text-black mb-12">
              Membership Comparison
            </h3>
            
            <div className="bg-white rounded-none shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-neutral-200 overflow-x-auto w-full">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-[rgb(25,25,112)] text-white text-sm uppercase tracking-wider font-[Vera]">
                    <th className="p-6 font-semibold w-1/4">Benefit</th>
                    <th className="p-6 text-center font-semibold w-1/4">Luxe Signature <span className="block text-xs text-indigo-200/70 mt-1 capitalize font-[Vera] font-medium tracking-normal">Domestic</span></th>
                    <th className="p-6 text-center font-semibold w-1/4">Diamond <span className="block text-xs text-indigo-200/70 mt-1 capitalize font-[Vera] font-medium tracking-normal">Worldwide</span></th>
                    <th className="p-6 text-center font-semibold w-1/4 text-[#B38E46]">Imperial <span className="block text-xs text-[#B38E46]/80 mt-1 capitalize font-[Vera] font-medium tracking-normal">Lifetime</span></th>
                  </tr>
                </thead>
                <tbody className="text-sm text-neutral-800 font-[Vera]">
                  <tr className="border-b border-neutral-100 hover:bg-neutral-50/50 transition-colors group">
                    <td className="p-6 font-semibold text-neutral-900">Membership Fee</td>
                    <td className="p-6 text-center text-black font-medium">₹12,999</td>
                    <td className="p-6 text-center text-black font-medium">₹19,999</td>
                    <td className="p-6 text-center font-bold text-[#B38E46] bg-amber-50/30 group-hover:bg-amber-50/60 transition-colors">₹49,999</td>
                  </tr>
                  <tr className="border-b border-neutral-100 hover:bg-neutral-50/50 transition-colors group">
                    <td className="p-6 font-semibold text-neutral-900">Validity</td>
                    <td className="p-6 text-center text-black font-medium">1 Year</td>
                    <td className="p-6 text-center text-black font-medium">1 Year</td>
                    <td className="p-6 text-center font-bold text-[#B38E46] bg-amber-50/30 group-hover:bg-amber-50/60 transition-colors">Lifetime</td>
                  </tr>
                  <tr className="border-b border-neutral-100 hover:bg-neutral-50/50 transition-colors group">
                    <td className="p-6 font-semibold text-neutral-900">Luxury Hotel Discounts</td>
                    <td className="p-6 text-center text-black font-medium">India</td>
                    <td className="p-6 text-center text-black font-medium">Worldwide</td>
                    <td className="p-6 text-center font-bold text-[#B38E46] bg-amber-50/30 group-hover:bg-amber-50/60 transition-colors">Worldwide</td>
                  </tr>
                  <tr className="border-b border-neutral-100 hover:bg-neutral-50/50 transition-colors group">
                    <td className="p-6 font-semibold text-neutral-900">5-Star & Luxury Hotels</td>
                    <td className="p-6"><Check className="w-5 h-5 mx-auto text-emerald-500" /></td>
                    <td className="p-6"><Check className="w-5 h-5 mx-auto text-emerald-500" /></td>
                    <td className="p-6 bg-amber-50/30 group-hover:bg-amber-50/60 transition-colors"><Check className="w-5 h-5 mx-auto text-[#B38E46]" strokeWidth={3} /></td>
                  </tr>
                  <tr className="border-b border-neutral-100 hover:bg-neutral-50/50 transition-colors group">
                    <td className="p-6 font-semibold text-neutral-900">Unlimited Discount Nights</td>
                    <td className="p-6"><Check className="w-5 h-5 mx-auto text-emerald-500" /></td>
                    <td className="p-6"><Check className="w-5 h-5 mx-auto text-emerald-500" /></td>
                    <td className="p-6 bg-amber-50/30 group-hover:bg-amber-50/60 transition-colors"><Check className="w-5 h-5 mx-auto text-[#B38E46]" strokeWidth={3} /></td>
                  </tr>
                  <tr className="border-b border-neutral-100 hover:bg-neutral-50/50 transition-colors group">
                    <td className="p-6 font-semibold text-neutral-900">Hotel Booking Assistance</td>
                    <td className="p-6"><Check className="w-5 h-5 mx-auto text-emerald-500" /></td>
                    <td className="p-6"><Check className="w-5 h-5 mx-auto text-emerald-500" /></td>
                    <td className="p-6 bg-amber-50/30 group-hover:bg-amber-50/60 transition-colors"><Check className="w-5 h-5 mx-auto text-[#B38E46]" strokeWidth={3} /></td>
                  </tr>
                  <tr className="border-b border-neutral-100 hover:bg-neutral-50/50 transition-colors group">
                    <td className="p-6 font-semibold text-neutral-900">Domestic Holidays</td>
                    <td className="p-6"><Check className="w-5 h-5 mx-auto text-emerald-500" /></td>
                    <td className="p-6"><Check className="w-5 h-5 mx-auto text-emerald-500" /></td>
                    <td className="p-6 bg-amber-50/30 group-hover:bg-amber-50/60 transition-colors"><Check className="w-5 h-5 mx-auto text-[#B38E46]" strokeWidth={3} /></td>
                  </tr>
                  <tr className="border-b border-neutral-100 hover:bg-neutral-50/50 transition-colors group">
                    <td className="p-6 font-semibold text-neutral-900">International Holidays</td>
                    <td className="p-6"><X className="w-5 h-5 mx-auto text-neutral-300" /></td>
                    <td className="p-6"><Check className="w-5 h-5 mx-auto text-emerald-500" /></td>
                    <td className="p-6 bg-amber-50/30 group-hover:bg-amber-50/60 transition-colors"><Check className="w-5 h-5 mx-auto text-[#B38E46]" strokeWidth={3} /></td>
                  </tr>
                  <tr className="border-b border-neutral-100 hover:bg-neutral-50/50 transition-colors group">
                    <td className="p-6 font-semibold text-neutral-900">Flights & Travel Assistance</td>
                    <td className="p-6"><Check className="w-5 h-5 mx-auto text-emerald-500" /></td>
                    <td className="p-6"><Check className="w-5 h-5 mx-auto text-emerald-500" /></td>
                    <td className="p-6 bg-amber-50/30 group-hover:bg-amber-50/60 transition-colors"><Check className="w-5 h-5 mx-auto text-[#B38E46]" strokeWidth={3} /></td>
                  </tr>
                  <tr className="border-b border-neutral-100 hover:bg-neutral-50/50 transition-colors group">
                    <td className="p-6 font-semibold text-neutral-900">Airport Transfers</td>
                    <td className="p-6 text-center text-black font-medium">Available</td>
                    <td className="p-6 text-center text-black font-medium">Available</td>
                    <td className="p-6 text-center font-bold text-[#B38E46] bg-amber-50/30 group-hover:bg-amber-50/60 transition-colors">Available</td>
                  </tr>
                  <tr className="border-b border-neutral-100 hover:bg-neutral-50/50 transition-colors group">
                    <td className="p-6 font-semibold text-neutral-900">Visa Assistance</td>
                    <td className="p-6 text-center text-black font-medium">Available</td>
                    <td className="p-6 text-center text-black font-medium">Available</td>
                    <td className="p-6 text-center font-bold text-[#B38E46] bg-amber-50/30 group-hover:bg-amber-50/60 transition-colors">Available</td>
                  </tr>
                  <tr className="border-b border-neutral-100 hover:bg-neutral-50/50 transition-colors group">
                    <td className="p-6 font-semibold text-neutral-900">Travel Insurance</td>
                    <td className="p-6 text-center text-black font-medium">Available</td>
                    <td className="p-6 text-center text-black font-medium">Available</td>
                    <td className="p-6 text-center font-bold text-[#B38E46] bg-amber-50/30 group-hover:bg-amber-50/60 transition-colors">Available</td>
                  </tr>
                  <tr className="border-b border-neutral-100 hover:bg-neutral-50/50 transition-colors group">
                    <td className="p-6 font-semibold text-neutral-900">Cruises & Experiences</td>
                    <td className="p-6 text-center text-black font-medium">Available</td>
                    <td className="p-6 text-center text-black font-medium">Available</td>
                    <td className="p-6 text-center font-bold text-[#B38E46] bg-amber-50/30 group-hover:bg-amber-50/60 transition-colors">Available</td>
                  </tr>
                  <tr className="border-b border-neutral-100 hover:bg-neutral-50/50 transition-colors group">
                    <td className="p-6 font-semibold text-neutral-900">Dining & Lifestyle Offers</td>
                    <td className="p-6 text-center text-black font-medium">Selected offers</td>
                    <td className="p-6 text-center text-black font-medium">More offers</td>
                    <td className="p-6 text-center font-bold text-[#B38E46] bg-amber-50/30 group-hover:bg-amber-50/60 transition-colors">Premium offers</td>
                  </tr>
                  <tr className="border-b border-neutral-100 hover:bg-neutral-50/50 transition-colors group">
                    <td className="p-6 font-semibold text-neutral-900">Exclusive Member Offers</td>
                    <td className="p-6"><Check className="w-5 h-5 mx-auto text-emerald-500" /></td>
                    <td className="p-6"><Check className="w-5 h-5 mx-auto text-emerald-500" /></td>
                    <td className="p-6 text-center font-bold text-[#B38E46] bg-amber-50/30 group-hover:bg-amber-50/60 transition-colors">⭐ Priority</td>
                  </tr>
                  <tr className="border-b border-neutral-100 hover:bg-neutral-50/50 transition-colors group">
                    <td className="p-6 font-semibold text-neutral-900">Membership Renewal</td>
                    <td className="p-6 text-center text-black font-medium">After 1 Year</td>
                    <td className="p-6 text-center text-black font-medium">After 1 Year</td>
                    <td className="p-6 text-center font-bold text-[#B38E46] bg-amber-50/30 group-hover:bg-amber-50/60 transition-colors">No annual renewal</td>
                  </tr>
                  <tr className="hover:bg-neutral-50/50 transition-colors group">
                    <td className="p-6 font-semibold text-neutral-900">Lifetime Member Privileges</td>
                    <td className="p-6"><X className="w-5 h-5 mx-auto text-neutral-300" /></td>
                    <td className="p-6"><X className="w-5 h-5 mx-auto text-neutral-300" /></td>
                    <td className="p-6 bg-amber-50/30 group-hover:bg-amber-50/60 transition-colors flex justify-center"><Check className="w-6 h-6 mx-auto text-[#B38E46]" strokeWidth={3} /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// SUB-COMPONENT: REUSABLE 3D MOUSE TILT CARD
function TiltCard({ card }: { card: (typeof MEMBERSHIPS)[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const element = cardRef.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;
    rotateX.set(-(mouseY / rect.height) * 10);
    rotateY.set((mouseX / rect.width) * 10);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const transform = useMotionTemplate`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform }}
      className={`relative rounded-none p-8 sm:p-9 border flex flex-col justify-between text-left transition-all duration-300 ease-out shadow-xl select-none overflow-hidden h-full min-h-[580px] group ${card.bgClass}`}
    >
      {/* Top Badge */}
      {card.badge && (
        <div className="absolute top-0 right-0 z-20">
          <span className="inline-block bg-[#B38E46] text-white text-[9px] font-[Vera] font-bold uppercase tracking-[0.25em] px-4 py-1.5 rounded-bl-sm shadow-md">
            {card.badge}
          </span>
        </div>
      )}

      {/* Card Content Top */}
      <div className="relative z-10">
        <h4 className="text-2xl sm:text-3xl font-[Vera] tracking-wider text-white mb-2">
          {card.title}
        </h4>

        {/* Price & Duration */}
        <div className="my-4 flex flex-col gap-1">
          <div className="text-3xl sm:text-4xl font-serif text-[#B38E46] font-medium tracking-tight">
            {card.price}
          </div>
          <div className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/80" style={{ color: "rgba(255, 255, 255, 0.8)" }}>
            {card.duration}
          </div>
        </div>

        <p className="text-xs sm:text-sm leading-relaxed font-light mb-6 border-b border-white/15 pb-6 text-white" style={{ color: "#ffffff" }}>
          {card.subtitle}
        </p>

        <h5 className="text-[10px] font-bold tracking-[0.25em] text-[#B38E46] uppercase mb-4 flex items-center gap-1.5 font-[Vera]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#B38E46]" /> Included Benefits:
        </h5>

        <ul className="space-y-3">
          {card.benefits.map((benefit, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-xs leading-relaxed text-white/90"
            >
              <Check className="w-3.5 h-3.5 text-[#B38E46] mt-0.5 shrink-0" strokeWidth={2.5} />
              <span className="font-light tracking-wide">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA Button Bottom */}
      <div className="relative z-10 mt-8 pt-6 border-t border-white/10">
        <a
          href="/join"
          className="w-full py-3.5 inline-flex items-center justify-center border border-[#B38E46] text-[#B38E46] hover:bg-[#B38E46] hover:text-white transition-all duration-300 text-xs tracking-[0.25em] uppercase font-medium rounded-sm shadow-sm cursor-pointer"
        >
          SELECT PLAN
        </a>
      </div>
    </motion.div>
  );
}
