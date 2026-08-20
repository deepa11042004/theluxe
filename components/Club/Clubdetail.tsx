"use client";

import React, { useState, useRef } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import Image from "next/image";

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
];

const MEMBERSHIPS = [
  {
    title: "PLATINUM",
    subtitle: "One Year Domestic — ₹12,999 gives you one full year of luxury hotel privileges across India.",
    bgClass: "bg-[#EAE6DD] text-neutral-900 border-[#DCD7CD]",
    lineColor: "rgba(0,0,0,0.05)",
    bulletColor: "bg-[#B38E46]",
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
    subtitle: "One Year Worldwide — For just ₹7,000 more, move to a worldwide luxury travel membership.",
    bgClass: "bg-black text-white border-neutral-800",
    lineColor: "rgba(255,255,255,0.08)",
    bulletColor: "bg-[#B38E46]",
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
    bgClass: "bg-[#165B54] text-white border-[#1B6B63]",
    lineColor: "rgba(255,255,255,0.08)",
    bulletColor: "bg-[#B38E46]",
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
  const itemsPerPage = 4;
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
    <section className="bg-black w-full overflow-hidden select-none">
      {/* SECTION 1: Luxe Club INFO */}
      <div className="relative pt-24 pb-16 px-6 max-w-7xl mx-auto text-center z-10">
        <div className="absolute top-0 left-0 w-44 h-44 opacity-20 pointer-events-none select-none">
          <svg
            viewBox="0 0 100 100"
            className="stroke-neutral-700 fill-none stroke-[0.5]"
          >
            <path d="M0,0 Q30,70 100,100 M0,20 Q40,80 100,120 M0,40 Q50,90 100,140" />
          </svg>
        </div>

        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-linear-to-tr from-neutral-900 to-neutral-800 border border-neutral-700/60 shadow-xl mb-6">
          <span className="text-white font-[Vera] text-xl tracking-wider">
            CE
          </span>
        </div>

        <h2 className="text-lg font-[Vera] tracking-[0.3em] text-white uppercase mb-3">
          Luxe Club
        </h2>
        <h3 className="text-3xl md:text-5xl font-[Vera] tracking-tight text-white mb-6">
          A World of Privileged Access
        </h3>

        <p className="text-neutral-300 font-medium text-sm md:text-base max-w-3xl mx-auto leading-relaxed mb-16">
          Luxe Club unlocks privileged access to 140+ premium resorts,
          offering 7 nights/8 days holidays every year — filled with cherished
          family moments and thoughtfully crafted experiences.
        </p>

        {/* HORIZONTAL SLIDING PRIVILEGES CAROUSEL */}
        <div className="w-full relative flex flex-col items-center mt-4">
          <h4 className="text-3xl font-[Vera] tracking-wider text-white font-medium mb-10">
            Handpicked Privileges
          </h4>

          {/* Carousel Viewport:  */}
          <div className="w-full overflow-hidden relative">
            <motion.div
              animate={{
                x: `-${carouselIndex * (100 / itemsPerPage)}%`,
              }}
              transition={{ type: "spring", stiffness: 140, damping: 20 }}
              className="flex items-stretch gap-6 w-full"
            >
              {CAROUSEL_PRIVILEGES.map((item) => (
                <div
                  key={item.id}
                  className="relative shrink-0 w-[calc(100%-48px)] sm:w-[calc(50%-36px)] md:w-[calc(33.333%-32px)] lg:w-[calc(25%-18px)] aspect-3/4 rounded-2xl overflow-hidden shadow-xl bg-neutral-900 border border-neutral-800/40 cursor-pointer group"
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

                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md px-4 py-3.5 rounded-xl border border-white/20 text-center shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
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

          <button className="border-2 border-neutral-900 hover:bg-neutral-900 hover:text-white text-neutral-900 font-medium text-sm rounded-full px-10 py-3.5 transition duration-300 shadow-sm active:scale-95 mb-24">
            Know More
          </button>
          
          {/* NEW SECTION: GENERAL BENEFITS */}
          <div className="text-left mt-16 max-w-5xl mx-auto">
            <h3 className="text-3xl md:text-5xl font-[Vera] tracking-tight text-center text-black mb-16">
              MEMBER BENEFITS
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <div className="bg-neutral-50 p-8 rounded-3xl border border-neutral-200">
                <h4 className="text-xl font-bold font-sans mb-4 flex items-center gap-2"><span className="text-2xl">🏨</span> Luxury Hotel Benefits</h4>
                <ul className="space-y-2 text-sm text-neutral-700 font-medium">
                  <li>• Access to 10,000+ hotels & resorts</li>
                  <li>• Premium 4★ & 5★ hotel offers</li>
                  <li>• Exclusive member rates</li>
                  <li>• Luxury hotel discounts</li>
                  <li>• Special hotel packages & seasonal offers</li>
                  <li>• Selected property upgrades & added privileges</li>
                </ul>
              </div>

              <div className="bg-neutral-50 p-8 rounded-3xl border border-neutral-200">
                <h4 className="text-xl font-bold font-sans mb-4 flex items-center gap-2"><span className="text-2xl">🎁</span> ₹50,000 Welcome Benefits</h4>
                <ul className="space-y-2 text-sm text-neutral-700 font-medium">
                  <li>• Luxury hotel vouchers</li>
                  <li>• Partner hotel vouchers</li>
                  <li>• Dining & lifestyle vouchers</li>
                  <li>• Special travel offers</li>
                </ul>
              </div>

              <div className="bg-neutral-50 p-8 rounded-3xl border border-neutral-200">
                <h4 className="text-xl font-bold font-sans mb-4 flex items-center gap-2"><span className="text-2xl">✈️</span> Complete Travel Benefits</h4>
                <ul className="space-y-2 text-sm text-neutral-700 font-medium">
                  <li>• Domestic & international flights</li>
                  <li>• Holiday packages</li>
                  <li>• Airport transfers</li>
                  <li>• Visa assistance</li>
                  <li>• Travel insurance assistance</li>
                  <li>• Cruises & luxury experiences</li>
                </ul>
              </div>

              <div className="bg-neutral-50 p-8 rounded-3xl border border-neutral-200">
                <h4 className="text-xl font-bold font-sans mb-4 flex items-center gap-2"><span className="text-2xl">🌍</span> Bespoke Travel</h4>
                <ul className="space-y-2 text-sm text-neutral-700 font-medium">
                  <li>• Personalised holiday planning</li>
                  <li>• International destinations</li>
                  <li>• Family vacations</li>
                  <li>• Honeymoon & romantic getaways</li>
                  <li>• Destination weddings</li>
                  <li>• Corporate & group travel</li>
                </ul>
              </div>

              <div className="bg-neutral-50 p-8 rounded-3xl border border-neutral-200 md:col-span-2 lg:col-span-1">
                <h4 className="text-xl font-bold font-sans mb-4 flex items-center gap-2"><span className="text-2xl">🛎️</span> Luxe Concierge</h4>
                <ul className="space-y-2 text-sm text-neutral-700 font-medium">
                  <li>• Dedicated booking assistance</li>
                  <li>• Hotel & holiday recommendations</li>
                  <li>• Special occasion arrangements</li>
                  <li>• Priority travel assistance</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-16 text-center bg-black text-white p-12 rounded-3xl">
              <h4 className="text-2xl md:text-4xl font-[Vera] tracking-widest italic mb-6">
                “One Membership. A World of Luxury Travel Privileges.”
              </h4>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 text-sm md:text-base font-semibold text-[#D4AF37]">
                <span>Membership ₹12,999/year</span>
                <span className="hidden sm:block">•</span>
                <span>Regular Value ₹29,999</span>
                <span className="hidden sm:block">•</span>
                <span>Welcome Benefits up to ₹50,000</span>
                <span className="hidden sm:block">•</span>
                <span>10,000+ Hotels & Resorts Worldwide</span>
              </div>
            </div>
          </div>

          {/* NEW SECTION: COMPARISON TABLE */}
          <div className="mt-24 max-w-6xl mx-auto overflow-x-auto pb-10">
            <h3 className="text-3xl md:text-4xl font-[Vera] tracking-tight text-center text-black mb-10">
              Membership Comparison
            </h3>
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-neutral-900 text-white text-sm uppercase tracking-wider font-semibold">
                  <th className="p-5 rounded-tl-2xl">Benefit</th>
                  <th className="p-5 text-center">🏨 Platinum (Domestic)</th>
                  <th className="p-5 text-center">🌍 Diamond (Worldwide)</th>
                  <th className="p-5 text-center rounded-tr-2xl">👑 Imperial (Lifetime)</th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium text-neutral-800">
                <tr className="border-b border-neutral-200 hover:bg-neutral-50 transition-colors">
                  <td className="p-5 font-bold">Membership Fee</td>
                  <td className="p-5 text-center">₹12,999</td>
                  <td className="p-5 text-center">₹19,999</td>
                  <td className="p-5 text-center">₹49,999</td>
                </tr>
                <tr className="border-b border-neutral-200 hover:bg-neutral-50 transition-colors">
                  <td className="p-5 font-bold">Validity</td>
                  <td className="p-5 text-center">1 Year</td>
                  <td className="p-5 text-center">1 Year</td>
                  <td className="p-5 text-center">Lifetime</td>
                </tr>
                <tr className="border-b border-neutral-200 hover:bg-neutral-50 transition-colors">
                  <td className="p-5 font-bold">Luxury Hotel Discounts</td>
                  <td className="p-5 text-center">🇮🇳 India</td>
                  <td className="p-5 text-center">🌍 Worldwide</td>
                  <td className="p-5 text-center">🌍 Worldwide</td>
                </tr>
                <tr className="border-b border-neutral-200 hover:bg-neutral-50 transition-colors">
                  <td className="p-5 font-bold">5-Star & Luxury Hotels</td>
                  <td className="p-5 text-center text-green-600 text-lg">✅</td>
                  <td className="p-5 text-center text-green-600 text-lg">✅</td>
                  <td className="p-5 text-center text-green-600 text-lg">✅</td>
                </tr>
                <tr className="border-b border-neutral-200 hover:bg-neutral-50 transition-colors">
                  <td className="p-5 font-bold">Unlimited Discount Nights*</td>
                  <td className="p-5 text-center text-green-600 text-lg">✅</td>
                  <td className="p-5 text-center text-green-600 text-lg">✅</td>
                  <td className="p-5 text-center text-green-600 text-lg">✅</td>
                </tr>
                <tr className="border-b border-neutral-200 hover:bg-neutral-50 transition-colors">
                  <td className="p-5 font-bold">Hotel Booking Assistance</td>
                  <td className="p-5 text-center text-green-600 text-lg">✅</td>
                  <td className="p-5 text-center text-green-600 text-lg">✅</td>
                  <td className="p-5 text-center text-green-600 text-lg">✅</td>
                </tr>
                <tr className="border-b border-neutral-200 hover:bg-neutral-50 transition-colors">
                  <td className="p-5 font-bold">Domestic Holidays</td>
                  <td className="p-5 text-center text-green-600 text-lg">✅</td>
                  <td className="p-5 text-center text-green-600 text-lg">✅</td>
                  <td className="p-5 text-center text-green-600 text-lg">✅</td>
                </tr>
                <tr className="border-b border-neutral-200 hover:bg-neutral-50 transition-colors">
                  <td className="p-5 font-bold">International Holidays</td>
                  <td className="p-5 text-center text-red-500 text-lg">❌</td>
                  <td className="p-5 text-center text-green-600 text-lg">✅</td>
                  <td className="p-5 text-center text-green-600 text-lg">✅</td>
                </tr>
                <tr className="border-b border-neutral-200 hover:bg-neutral-50 transition-colors">
                  <td className="p-5 font-bold">Flights & Travel Assistance</td>
                  <td className="p-5 text-center text-green-600 text-lg">✅</td>
                  <td className="p-5 text-center text-green-600 text-lg">✅</td>
                  <td className="p-5 text-center text-green-600 text-lg">✅</td>
                </tr>
                <tr className="border-b border-neutral-200 hover:bg-neutral-50 transition-colors">
                  <td className="p-5 font-bold">Airport Transfers</td>
                  <td className="p-5 text-center">Available</td>
                  <td className="p-5 text-center">Available</td>
                  <td className="p-5 text-center">Available</td>
                </tr>
                <tr className="border-b border-neutral-200 hover:bg-neutral-50 transition-colors">
                  <td className="p-5 font-bold">Visa Assistance</td>
                  <td className="p-5 text-center">Available</td>
                  <td className="p-5 text-center">Available</td>
                  <td className="p-5 text-center">Available</td>
                </tr>
                <tr className="border-b border-neutral-200 hover:bg-neutral-50 transition-colors">
                  <td className="p-5 font-bold">Travel Insurance Assistance</td>
                  <td className="p-5 text-center">Available</td>
                  <td className="p-5 text-center">Available</td>
                  <td className="p-5 text-center">Available</td>
                </tr>
                <tr className="border-b border-neutral-200 hover:bg-neutral-50 transition-colors">
                  <td className="p-5 font-bold">Cruises & Experiences</td>
                  <td className="p-5 text-center">Available</td>
                  <td className="p-5 text-center">Available</td>
                  <td className="p-5 text-center">Available</td>
                </tr>
                <tr className="border-b border-neutral-200 hover:bg-neutral-50 transition-colors">
                  <td className="p-5 font-bold">Dining & Lifestyle Offers</td>
                  <td className="p-5 text-center">Selected offers</td>
                  <td className="p-5 text-center">More offers</td>
                  <td className="p-5 text-center">Premium offers</td>
                </tr>
                <tr className="border-b border-neutral-200 hover:bg-neutral-50 transition-colors">
                  <td className="p-5 font-bold">Exclusive Member Offers</td>
                  <td className="p-5 text-center text-green-600 text-lg">✅</td>
                  <td className="p-5 text-center text-green-600 text-lg">✅</td>
                  <td className="p-5 text-center text-amber-500 font-bold">⭐ Priority</td>
                </tr>
                <tr className="border-b border-neutral-200 hover:bg-neutral-50 transition-colors">
                  <td className="p-5 font-bold">Membership Renewal</td>
                  <td className="p-5 text-center">After 1 Year</td>
                  <td className="p-5 text-center">After 1 Year</td>
                  <td className="p-5 text-center font-bold">No annual renewal</td>
                </tr>
                <tr className="hover:bg-neutral-50 transition-colors">
                  <td className="p-5 font-bold rounded-bl-2xl">Lifetime Member Privileges</td>
                  <td className="p-5 text-center text-red-500 text-lg">❌</td>
                  <td className="p-5 text-center text-red-500 text-lg">❌</td>
                  <td className="p-5 text-center text-amber-500 font-bold text-lg rounded-br-2xl">👑 ✅</td>
                </tr>
              </tbody>
            </table>
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
