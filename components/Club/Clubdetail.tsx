"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { ArrowLeft, ArrowRight, ShieldCheck, Check, X } from "lucide-react";
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

// Radiant Card Component
const RadiantCard = ({ title, icon, children, className = "" }: { title: string, icon: React.ReactNode, children: React.ReactNode, className?: string }) => (
  <div className={`relative overflow-hidden bg-white p-8 rounded-3xl border border-neutral-100 shadow-[0_4px_24px_rgba(0,0,0,0.04)] group ${className}`}>
    
    {/* Gradient Base */}
    <div 
      className="absolute bottom-0 left-0 right-0 h-[70%] z-0 pointer-events-none transition-opacity duration-700 opacity-60 group-hover:opacity-100"
      style={{
        background: `
          radial-gradient(circle at 10% 100%, rgba(74, 222, 128, 0.6) 0%, transparent 60%),
          radial-gradient(circle at 50% 100%, rgba(250, 204, 21, 0.6) 0%, transparent 60%),
          radial-gradient(circle at 90% 100%, rgba(251, 146, 60, 0.6) 0%, transparent 60%)
        `
      }}
    />

    {/* Rays */}
    <div 
      className="absolute inset-0 z-0 pointer-events-none opacity-50"
      style={{
        background: 'repeating-conic-gradient(from 270deg at 50% 100%, transparent 0deg, transparent 1.5deg, white 1.6deg, white 2.1deg)',
        maskImage: 'linear-gradient(to top, black 10%, transparent 70%)',
        WebkitMaskImage: 'linear-gradient(to top, black 10%, transparent 70%)',
      }}
    />

    {/* Content */}
    <div className="relative z-10">
      <h4 className="text-xl font-bold font-sans tracking-tight text-neutral-900 mb-4 flex items-center gap-3">
        {icon && <span className="flex-shrink-0 drop-shadow-sm">{icon}</span>}
        {title}
      </h4>
      <div className="text-sm text-neutral-600 font-medium leading-relaxed">
        {children}
      </div>
    </div>
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
    title: "PLATINUM",
    subtitle: "One Year Domestic — ₹12,999 gives you one full year of luxury hotel privileges across India.",
    bgClass: "bg-gradient-to-br from-[#0B2545] via-[#091F3A] to-[#041226] text-white border-white/10",
    lineColor: "rgba(255,255,255,0.08)",
    bulletColor: "bg-[#D4AF37]",
    benefits: [
      "Domestic luxury hotel bookings",
      "Special member hotel rates/discounts",
      "Unlimited eligible discount-night bookings*",
      "Domestic travel assistance",
      "Airport transfer assistance",
      "Exclusive member offers",
      "Holiday and travel assistance",
      "Selected dining & lifestyle offers",
      "Dedicated booking assistance"
    ],
  },
  {
    title: "DIAMOND",
    subtitle: "One Year Worldwide — Pay ₹19,999 for a worldwide luxury travel membership.",
    bgClass: "bg-gradient-to-br from-[#7F1D1D] via-[#6B1717] to-[#450A0A] text-white border-white/10",
    lineColor: "rgba(255,255,255,0.08)",
    bulletColor: "bg-[#D4AF37]",
    benefits: [
      "Everything in Domestic Membership",
      "Worldwide luxury hotel access",
      "International 5-star hotel offers",
      "International holiday assistance",
      "Visa & Travel insurance assistance",
      "Cruise & luxury experience assistance",
      "Airport transfer assistance",
      "International dining/lifestyle offers where available",
      "Exclusive worldwide member offers"
    ],
  },
  {
    title: "IMPERIAL",
    subtitle: "Lifetime Membership — Pay ₹49,999 once and enjoy The Luxe Yatra lifestyle worldwide for a lifetime.",
    bgClass: "bg-gradient-to-br from-[#064E3B] via-[#043E2F] to-[#022C22] text-white border-white/10",
    lineColor: "rgba(255,255,255,0.08)",
    bulletColor: "bg-[#D4AF37]",
    benefits: [
      "Lifetime membership, no annual renewal",
      "Worldwide luxury hotel benefits & offers",
      "Unlimited eligible discount-night bookings*",
      "Domestic & international travel assistance",
      "Visa & Travel insurance assistance",
      "Cruise & luxury experiences",
      "Premium dining & lifestyle offers",
      "Exclusive lifetime-member offers",
      "Priority member assistance",
      "Family travel convenience"
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

        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-linear-to-tr from-neutral-900 to-neutral-800 border border-neutral-700/60 shadow-xl mb-6">
          <span className="text-white font-[Vera] text-xl tracking-wider">
            LC
          </span>
        </div>

        <h2 className="text-lg font-[Vera] tracking-[0.3em] text-neutral-500 uppercase mb-3">
          Luxe Club
        </h2>
        <h3 className="text-3xl md:text-5xl font-[Vera] tracking-tight text-neutral-900 mb-6">
          A World of Privileged Access
        </h3>

        <p className="text-neutral-600 font-medium text-sm md:text-base max-w-3xl mx-auto leading-relaxed mb-16">
          Luxe Club unlocks privileged access to 140+ premium resorts,
          offering 7 nights/8 days holidays every year — filled with cherished
          family moments and thoughtfully crafted experiences.
        </p>

        {/* HORIZONTAL SLIDING PRIVILEGES CAROUSEL */}
        <div className="w-full relative flex flex-col items-center mt-4">
          <h4 className="text-3xl font-[Vera] tracking-wider text-neutral-900 font-medium mb-10">
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
                  className="relative shrink-0 w-[calc(100%-48px)] sm:w-[calc(50%-36px)] md:w-[calc(33.333%-32px)] lg:w-[calc(25%-18px)] aspect-3/4 rounded-none overflow-hidden shadow-xl bg-neutral-900 cursor-pointer group"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover brightness-[0.75] contrast-[1.05] group-hover:scale-110 transition-transform duration-700 ease-out"
                  />

                  {/* Overlay Gradient for better text readability */}
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-60" />

                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md px-4 py-3.5 rounded-none text-center shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-neutral-900 text-xs sm:text-sm font-semibold tracking-tight font-sans block truncate">
                      {item.title}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Carousel Control Buttons */}
          <div className="flex items-center gap-3 mt-10">
            <button
              onClick={handlePrev}
              disabled={isFirstSlide}
              className={`p-3 border rounded-full transition-all bg-white active:scale-95 text-neutral-900
                ${isFirstSlide ? "border-neutral-800 bg-neutral-900/40 text-neutral-600 cursor-not-allowed active:scale-100" : "border-neutral-200 hover:bg-neutral-100"}`}
              aria-label="Previous Privileges"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              disabled={isLastSlide}
              className={`p-3 border rounded-full transition-all bg-white active:scale-95 text-neutral-900
                ${isLastSlide ? "border-neutral-800 bg-neutral-900/40 text-neutral-600 cursor-not-allowed active:scale-100" : "border-neutral-200 hover:bg-neutral-100"}`}
              aria-label="Next Privileges"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* SECTION 2: MEMBERSHIP PLANS */}
      <div className="bg-white text-black rounded-t-[2.5rem] py-24 px-6 w-full">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl md:text-6xl font-[Vera] tracking-tight text-black mb-5">
            Your Key to Unlock Privileged Experiences
          </h3>
          <p className="text-neutral-500 text-xs md:text-sm font-medium tracking-wide mb-14 uppercase">
            Select from <span className="text-black font-bold">Platinum</span>,{" "}
            <span className="text-neutral-900 font-bold">Diamond</span>, and{" "}
            <span className="text-[#165B54] font-bold">Imperial</span> Cards and
            enter a world of seamless vacations
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-14">
            {MEMBERSHIPS.map((card, idx) => (
              <TiltCard key={idx} card={card} />
            ))}
          </div>


          {/* NEW SECTION: GENERAL BENEFITS */}
          <div className="text-left mt-16 max-w-5xl mx-auto">
            <h3 className="text-3xl md:text-5xl font-[Vera] tracking-tight text-center text-black mb-16">
              MEMBER BENEFITS
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <RadiantCard title="Luxury Hotel Benefits" icon={<HotelIcon />}>
                <ul className="space-y-2">
                  <li>• Access to 10,000+ hotels & resorts</li>
                  <li>• Premium 4★ & 5★ hotel offers</li>
                  <li>• Exclusive member rates</li>
                  <li>• Luxury hotel discounts</li>
                  <li>• Special hotel packages & seasonal offers</li>
                  <li>• Selected property upgrades & added privileges</li>
                </ul>
              </RadiantCard>

              <RadiantCard title="₹50,000 Welcome Benefits" icon={<GiftIcon />}>
                <ul className="space-y-2">
                  <li>• Luxury hotel vouchers</li>
                  <li>• Partner hotel vouchers</li>
                  <li>• Dining & lifestyle vouchers</li>
                  <li>• Special travel offers</li>
                </ul>
              </RadiantCard>

              <RadiantCard title="Complete Travel Benefits" icon={<PlaneIcon />}>
                <ul className="space-y-2">
                  <li>• Domestic & international flights</li>
                  <li>• Holiday packages</li>
                  <li>• Airport transfers</li>
                  <li>• Visa assistance</li>
                  <li>• Travel insurance assistance</li>
                  <li>• Cruises & luxury experiences</li>
                </ul>
              </RadiantCard>

              <RadiantCard title="Bespoke Travel" icon={<GlobeIcon />}>
                <ul className="space-y-2">
                  <li>• Personalised holiday planning</li>
                  <li>• International destinations</li>
                  <li>• Family vacations</li>
                  <li>• Honeymoon & romantic getaways</li>
                  <li>• Destination weddings</li>
                  <li>• Corporate & group travel</li>
                </ul>
              </RadiantCard>

              <RadiantCard title="Luxe Concierge" icon={<BellIcon />} className="md:col-span-2 lg:col-span-1">
                <ul className="space-y-2">
                  <li>• Dedicated booking assistance</li>
                  <li>• Hotel & holiday recommendations</li>
                  <li>• Special occasion arrangements</li>
                  <li>• Priority travel assistance</li>
                </ul>
              </RadiantCard>
            </div>
            
            <div className="mt-16 text-center bg-gradient-to-br from-[#D4AF37] to-[#B38E46] p-12 rounded-none relative overflow-hidden">
              <div 
                className="absolute inset-0 opacity-20 pointer-events-none" 
                style={{ 
                  backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)", 
                  backgroundSize: "24px 24px" 
                }} 
              />
              <div className="relative z-10">
                <h4 className="text-2xl md:text-4xl font-[Vera] tracking-widest italic mb-6 text-white drop-shadow-md">
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
          <div className="mt-24 max-w-6xl mx-auto overflow-x-auto pb-10 px-4 sm:px-6">
            <h3 className="text-3xl md:text-4xl font-[Vera] tracking-tight text-center text-black mb-12">
              Membership Comparison
            </h3>
            
            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-neutral-100 overflow-hidden">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-neutral-900 text-white text-sm uppercase tracking-wider font-[Vera]">
                    <th className="p-6 font-semibold w-1/4">Benefit</th>
                    <th className="p-6 text-center font-semibold w-1/4">Platinum <span className="block text-xs text-neutral-400 mt-1 capitalize font-sans font-medium tracking-normal">Domestic</span></th>
                    <th className="p-6 text-center font-semibold w-1/4">Diamond <span className="block text-xs text-neutral-400 mt-1 capitalize font-sans font-medium tracking-normal">Worldwide</span></th>
                    <th className="p-6 text-center font-semibold w-1/4 bg-gradient-to-t from-[#B38E46]/20 to-transparent text-[#D4AF37]">Imperial <span className="block text-xs text-[#D4AF37]/70 mt-1 capitalize font-sans font-medium tracking-normal">Lifetime</span></th>
                  </tr>
                </thead>
                <tbody className="text-sm text-neutral-800 font-sans">
                  <tr className="border-b border-neutral-100 hover:bg-neutral-50/50 transition-colors group">
                    <td className="p-6 font-semibold text-neutral-900">Membership Fee</td>
                    <td className="p-6 text-center text-neutral-600 font-medium">₹12,999</td>
                    <td className="p-6 text-center text-neutral-600 font-medium">₹19,999</td>
                    <td className="p-6 text-center font-bold text-[#B38E46] bg-amber-50/30 group-hover:bg-amber-50/60 transition-colors">₹49,999</td>
                  </tr>
                  <tr className="border-b border-neutral-100 hover:bg-neutral-50/50 transition-colors group">
                    <td className="p-6 font-semibold text-neutral-900">Validity</td>
                    <td className="p-6 text-center text-neutral-600 font-medium">1 Year</td>
                    <td className="p-6 text-center text-neutral-600 font-medium">1 Year</td>
                    <td className="p-6 text-center font-bold text-[#B38E46] bg-amber-50/30 group-hover:bg-amber-50/60 transition-colors">Lifetime</td>
                  </tr>
                  <tr className="border-b border-neutral-100 hover:bg-neutral-50/50 transition-colors group">
                    <td className="p-6 font-semibold text-neutral-900">Luxury Hotel Discounts</td>
                    <td className="p-6 text-center text-neutral-600 font-medium">India</td>
                    <td className="p-6 text-center text-neutral-600 font-medium">Worldwide</td>
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
                    <td className="p-6 text-center text-neutral-600 font-medium">Available</td>
                    <td className="p-6 text-center text-neutral-600 font-medium">Available</td>
                    <td className="p-6 text-center font-bold text-[#B38E46] bg-amber-50/30 group-hover:bg-amber-50/60 transition-colors">Available</td>
                  </tr>
                  <tr className="border-b border-neutral-100 hover:bg-neutral-50/50 transition-colors group">
                    <td className="p-6 font-semibold text-neutral-900">Visa Assistance</td>
                    <td className="p-6 text-center text-neutral-600 font-medium">Available</td>
                    <td className="p-6 text-center text-neutral-600 font-medium">Available</td>
                    <td className="p-6 text-center font-bold text-[#B38E46] bg-amber-50/30 group-hover:bg-amber-50/60 transition-colors">Available</td>
                  </tr>
                  <tr className="border-b border-neutral-100 hover:bg-neutral-50/50 transition-colors group">
                    <td className="p-6 font-semibold text-neutral-900">Travel Insurance</td>
                    <td className="p-6 text-center text-neutral-600 font-medium">Available</td>
                    <td className="p-6 text-center text-neutral-600 font-medium">Available</td>
                    <td className="p-6 text-center font-bold text-[#B38E46] bg-amber-50/30 group-hover:bg-amber-50/60 transition-colors">Available</td>
                  </tr>
                  <tr className="border-b border-neutral-100 hover:bg-neutral-50/50 transition-colors group">
                    <td className="p-6 font-semibold text-neutral-900">Cruises & Experiences</td>
                    <td className="p-6 text-center text-neutral-600 font-medium">Available</td>
                    <td className="p-6 text-center text-neutral-600 font-medium">Available</td>
                    <td className="p-6 text-center font-bold text-[#B38E46] bg-amber-50/30 group-hover:bg-amber-50/60 transition-colors">Available</td>
                  </tr>
                  <tr className="border-b border-neutral-100 hover:bg-neutral-50/50 transition-colors group">
                    <td className="p-6 font-semibold text-neutral-900">Dining & Lifestyle Offers</td>
                    <td className="p-6 text-center text-neutral-600 font-medium">Selected offers</td>
                    <td className="p-6 text-center text-neutral-600 font-medium">More offers</td>
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
                    <td className="p-6 text-center text-neutral-600 font-medium">After 1 Year</td>
                    <td className="p-6 text-center text-neutral-600 font-medium">After 1 Year</td>
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
    rotateX.set(-(mouseY / rect.height) * 14);
    rotateY.set((mouseX / rect.width) * 14);
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
      className={`relative rounded-3xl p-8 border flex flex-col justify-between text-left transition-all duration-150 ease-out shadow-md select-none overflow-hidden h-full min-h-120 ${card.bgClass}`}
    >
      <div
        className="absolute top-0 right-0 w-60 h-40 pointer-events-none select-none opacity-40 z-0"
        style={{ color: card.lineColor }}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full stroke-current fill-none stroke-[0.75]"
        >
          <path d="M30,-20 Q80,20 130,40 M10,-20 Q70,30 130,60 M-10,-20 Q60,40 130,80 M-30,-20 Q50,50 130,100" />
        </svg>
      </div>

      <div className="relative z-10">
        <span className="text-xs uppercase font-semibold tracking-widest text-neutral-400 block mb-1">
          Key
        </span>
        <h4 className="text-3xl font-extrabold tracking-wide mb-4 font-sans">
          {card.title}
        </h4>
        <p className="text-sm opacity-80 leading-relaxed font-medium mb-6 border-b border-neutral-700/20 pb-6">
          {card.subtitle}
        </p>

        <h5 className="text-xs font-bold tracking-wider uppercase mb-4 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 opacity-70" /> Benefits:
        </h5>

        <ul className="space-y-3.5">
          {card.benefits.map((benefit, i) => (
            <li
              key={i}
              className="flex items-start gap-2.5 text-xs leading-relaxed"
            >
              <span
                className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${card.bulletColor}`}
              />
              <span className="text-sm font-medium opacity-90">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
