"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Heading from "@/components/Heading";
import { motion } from "framer-motion";
import {
  Hotel,
  Compass,
  Plane,
  FileCheck,
  Ship,
  HeartHandshake,
  Utensils,
  CheckCircle2,
  ShieldCheck,
  Eye,
  Target,
  Sparkles,
  Crown,
  Award,
  Clock,
  Globe,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.85;
      scrollRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };



  const membershipPlans = [
    {
      name: "domestic",
      price: "₹12,999",
      period: "per year",
      badge: "Signature",
      popular: false,
      image: "/Img/card-domestic.jpg",
      features: [
        "5-Star & Premium Hotel Access",
        "Exclusive Member Rates & Privileges",
        "Unlimited Eligible Discount-Night Bookings*",
        "Complimentary Welcome Stay Benefit*",
        "Domestic Travel & Holiday Assistance",
        "Airport Transfer Assistance",
        "Dining & Lifestyle Privileges",
        "Exclusive Member-Only Offers",
        "Dedicated Booking Assistance"
      ]
    },
    {
      name: "worldwide",
      price: "₹19,999",
      period: "per year",
      badge: "Luxe Diamond",
      popular: true,
      image: "/Img/card-worldwide.jpg",
      features: [
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
      ]
    },
    {
      name: "lifetime",
      price: "₹49,999",
      period: "one-time payment",
      badge: "Luxe Imperial",
      popular: false,
      image: "/Img/card-lifetime.jpg",
      features: [
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
      ]
    }
  ];

  const whyChooseUs = [
    "Premium Hotel Access Across Destinations",
    "Domestic & International Travel Options",
    "Curated Luxury Holiday Experiences",
    "Personalised Concierge & Travel Assistance",
    "Exclusive Member Rates & Special Offers",
    "Comprehensive Lifestyle & Dining Benefits",
    "Professional & Reliable Service Support",
    "Flexible & Bespoke Travel Planning"
  ];

  const servicePillars = [
    {
      title: "Professionalism",
      description: "Every member interaction is handled with a service-first approach.",
      icon: Award
    },
    {
      title: "Transparency",
      description: "Membership benefits, booking conditions and applicable terms are communicated clearly.",
      icon: ShieldCheck
    },
    {
      title: "Choice",
      description: "Members can explore a broad range of destinations, hotels and travel experiences.",
      icon: Globe
    },
    {
      title: "Personalisation",
      description: "We aim to understand each member's travel preferences and assist accordingly.",
      icon: Crown
    },
    {
      title: "Reliability",
      description: "Our objective is to provide consistent assistance throughout the travel planning journey.",
      icon: Clock
    }
  ];

  return (
    <main className="min-h-screen bg-white text-neutral-900 overflow-x-hidden select-none">
      {/* 1. Header Banner */}
      <Heading
        title="About The Luxe Yatra"
        subtitle="A Private Travel & Lifestyle Club — Luxury Hotels • Bespoke Holidays • Exclusive Experiences"
        align="center"
        bgImage="/Img/wooden-bridge-koh-nangyuan-island-surat-thani-thailand_335224-1082.avif"
      />

      <div className="w-full">
        {/* 2. WHO WE ARE */}
        <section className="bg-white text-black py-20 md:py-24 px-6 sm:px-12 w-full border-t border-neutral-200">
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
            {/* Micro-Header Tag */}
            <div className="text-sm tracking-[0.4em] text-black uppercase font-light mb-6">
              WHO WE ARE
            </div>

            {/* Luxury Serif Headline matching Homepage */}
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif tracking-tight text-black mb-4 max-w-4xl">
              Elevating How You Experience Luxury Travel
            </h2>
            <p className="text-xl sm:text-2xl md:text-3xl font-serif font-light text-black uppercase tracking-wider mb-6">
              DISCOVER A WORLD OF PRIVILEGES
            </p>

            {/* Small Golden Vertical Divider */}
            <div className="flex justify-center my-6">
              <div className="w-[1.5px] h-12 md:h-16 bg-[#B38E46]/80"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center text-left w-full mt-4">
              <div className="lg:col-span-8 space-y-6">
                <p className="font-[Vera] text-base md:text-lg text-neutral-800 leading-relaxed tracking-wide">
                  <strong className="font-bold text-black">The Luxe Yatra</strong> is a premium travel and lifestyle membership company created for discerning travellers who value exceptional hospitality, personalised service, and memorable experiences.
                </p>
                <p className="font-[Vera] text-base md:text-lg text-neutral-700 leading-relaxed tracking-wide">
                  Our platform brings together luxury hotel stays, curated holidays, travel assistance, and lifestyle privileges through a single premium membership ecosystem designed to elevate every journey.
                </p>
                <p className="font-[Vera] text-base md:text-lg text-neutral-700 leading-relaxed tracking-wide">
                  We aim to make luxury travel more accessible, convenient, and rewarding for individuals, families, and corporate travellers across domestic and international destinations.
                </p>
              </div>

              <div className="lg:col-span-4 flex justify-center">
                <div className="relative w-60 h-60 md:w-72 md:h-72 flex items-center justify-center">
                  <Image
                    src="/Img/Gemini_Generated_Image_dk745jdk745jdk7-removebg-preview.png"
                    alt="The Luxe Yatra Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>



        {/* 7. WHY THE LUXE YATRA */}
        <section className="bg-white text-black py-20 md:py-24 px-4 sm:px-6 lg:px-8 w-full border-t border-neutral-200 overflow-hidden">
          <div className="max-w-[1700px] mx-auto flex flex-col items-center">
            <div className="text-center flex flex-col items-center mb-14 md:mb-20">
              <div className="text-sm tracking-[0.4em] text-black uppercase font-light mb-6">
                ADVANTAGES
              </div>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif tracking-tight text-black mb-4">
                Why The Luxe Yatra
              </h2>
              <p className="font-[Vera] text-xs md:text-sm max-w-xl leading-relaxed text-neutral-600 tracking-wide">
                One Membership. Multiple Travel & Lifestyle Privileges.
              </p>
            </div>

            {/* Staggered 4-Column Bento Layout displaying all 12 cards (matching Activities.tsx) */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start w-full"
            >
              {[
                // Column 1 (3 cards)
                [
                  {
                    id: 1,
                    title: "Hotels & Resorts",
                    tag: "LUXURY STAYS",
                    description: "Premium and luxury accommodation across domestic and international destinations.",
                    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
                    aspect: "aspect-[4/3]",
                  },
                  {
                    id: 2,
                    title: "Cruises & Experiences",
                    tag: "EXCLUSIVE VOYAGES",
                    description: "Curated cruise holidays and premium destination experiences.",
                    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
                    aspect: "aspect-square",
                  },
                  {
                    id: 3,
                    title: "Exclusive Member Rates",
                    tag: "PREFERENTIAL PRIVILEGES",
                    description: "Special member rates, seasonal offers, and complimentary room upgrade benefits.",
                    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80",
                    aspect: "aspect-square",
                  },
                ],
                // Column 2 (3 cards)
                [
                  {
                    id: 4,
                    title: "Bespoke Holidays",
                    tag: "TAILORED JOURNEYS",
                    description: "Curated leisure journeys designed around individual travel preferences.",
                    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
                    aspect: "aspect-[3/4]",
                  },
                  {
                    id: 5,
                    title: "Visa & Travel Assistance",
                    tag: "FULL SUPPORT",
                    description: "Support with visa-related requirements, travel insurance and documentation.",
                    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80",
                    aspect: "aspect-square",
                  },
                  {
                    id: 6,
                    title: "Destination Weddings & Celebrations",
                    tag: "SPECIAL EVENTS",
                    description: "Hospitality assistance for weddings, private celebrations and milestone events.",
                    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
                    aspect: "aspect-square",
                  },
                ],
                // Column 3 (3 cards)
                [
                  {
                    id: 7,
                    title: "Worldwide Travel Access",
                    tag: "INDIA & INTERNATIONAL STAYS",
                    description: "Discover exceptional stays and curated leisure journeys across domestic and global destinations.",
                    image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80",
                    aspect: "aspect-[4/3]",
                  },
                  {
                    id: 8,
                    title: "Flights & Transfers",
                    tag: "SEAMLESS TRAVEL",
                    description: "Travel assistance for flights, airport transfers and related arrangements.",
                    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80",
                    aspect: "aspect-square",
                  },
                  {
                    id: 9,
                    title: "Dining & Lifestyle Privileges",
                    tag: "VIP LIFESTYLE",
                    description: "Selected dining, entertainment, shopping and VIP lifestyle benefits.",
                    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
                    aspect: "aspect-square",
                  },
                ],
                // Column 4 (3 cards)
                [
                  {
                    id: 10,
                    title: "Personalised Concierge",
                    tag: "DEDICATED 24/7 ASSISTANCE",
                    description: "Dedicated assistance for hotel bookings, travel planning, and bespoke requests.",
                    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
                    aspect: "aspect-[3/4]",
                  },
                  {
                    id: 11,
                    title: "Comprehensive Lifestyle Benefits",
                    tag: "DINING & VIP ACCESS",
                    description: "Curated dining privileges, airport transfers, and private leisure access.",
                    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=80",
                    aspect: "aspect-square",
                  },
                  {
                    id: 12,
                    title: "Flexible & Bespoke Travel Planning",
                    tag: "CUSTOM ITINERARIES",
                    description: "Bespoke itineraries tailored carefully around your personal schedule and preferences.",
                    image: "https://images.unsplash.com/photo-1500835556837-99ac94a94552?auto=format&fit=crop&w=800&q=80",
                    aspect: "aspect-square",
                  },
                ],
              ].map((column, colIdx) => (
                <div key={colIdx} className="flex flex-col gap-6 w-full">
                  {column.map((item) => (
                    <motion.div
                      key={item.id}
                      variants={itemVariants}
                      whileHover={{ y: -4 }}
                      className="group flex flex-col bg-white rounded-none border border-neutral-200/80 shadow-xs hover:shadow-xl transition-all duration-400 overflow-hidden cursor-pointer"
                    >
                      {/* Top Image Frame */}
                      <div className={`relative w-full ${item.aspect} overflow-hidden shrink-0 bg-neutral-100`}>
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>

                      {/* Bottom Content Box */}
                      <div className="p-5 sm:p-6 bg-white flex flex-col justify-between flex-1">
                        <div>
                          <h3
                            className="text-lg sm:text-xl font-medium text-neutral-900 leading-snug mb-1"
                            style={{ fontFamily: "var(--work-font), sans-serif" }}
                          >
                            {item.title}
                          </h3>
                          <p className="text-[10px] sm:text-xs font-semibold tracking-widest text-[#B38E46] uppercase mb-2">
                            {item.tag}
                          </p>
                          <p className="font-[Vera] text-xs sm:text-sm text-neutral-600 font-light leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* 8. SERVICE PROMISE */}
        <section className="bg-white text-black py-20 md:py-24 px-6 sm:px-12 w-full border-t border-neutral-200">
          <div className="max-w-7xl mx-auto">
            <div className="text-center flex flex-col items-center mb-14">
              <div className="text-sm tracking-[0.4em] text-black uppercase font-light mb-6">
                COMMITMENT
              </div>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif tracking-tight text-black mb-4">
                Our Service Promise
              </h2>
              <p className="font-[Vera] text-xs md:text-sm max-w-xl leading-relaxed text-neutral-600 tracking-wide">
                At The Luxe Yatra, we believe premium membership is not simply about access — it is about the quality of the experience.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {servicePillars.map((pillar, idx) => {
                const PillarIcon = pillar.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    className="bg-white rounded-none p-6 md:p-8 border border-neutral-200/90 shadow-sm hover:shadow-xl hover:border-[#B38E46]/60 transition-all duration-300 flex flex-col justify-start space-y-5 group"
                  >
                    <div className="w-12 h-12 rounded-none bg-[#B38E46]/10 text-[#B38E46] flex items-center justify-center border border-[#B38E46]/30 group-hover:scale-110 transition-transform">
                      <PillarIcon className="w-6 h-6" />
                    </div>
                    <div className="flex flex-col gap-2.5">
                      <h3 className="text-base font-bold text-neutral-900 tracking-tight group-hover:text-[#B38E46] transition-colors">
                        {pillar.title}
                      </h3>
                      <p className="text-xs font-[Vera] leading-relaxed text-neutral-600 font-medium">
                        {pillar.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 9. TRUST & TRANSPARENCY */}
        <section className="bg-white text-black py-16 md:py-20 px-6 sm:px-12 w-full border-t border-neutral-200">
          <div className="max-w-7xl mx-auto">
            <div className="bg-[rgb(25,25,112)] text-white rounded-none p-8 md:p-12 flex flex-col md:flex-row gap-8 items-start md:items-center justify-between shadow-xl">
              <div className="space-y-4 max-w-3xl">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#B38E46]/20 border border-[#B38E46]/40 flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-[#B38E46]" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-serif text-white tracking-tight" style={{ color: "#ffffff" }}>Trust &amp; Transparency</h3>
                </div>
                <p className="text-xs md:text-sm leading-relaxed font-[Vera] text-white opacity-95 font-light" style={{ color: "#ffffff" }}>
                  The Luxe Yatra follows a transparent membership framework. Hotel bookings, complimentary benefits, vouchers, discounts and other services are subject to availability, blackout dates, advance booking requirements, partner policies and the applicable membership terms &amp; conditions. We encourage every prospective member to review membership details prior to joining.
                </p>
              </div>

              <div className="shrink-0 mt-4 md:mt-0">
                <Link
                  href="/luxeclub"
                  className="inline-flex items-center gap-2 border border-[#B38E46] text-white bg-[#B38E46] hover:bg-[#997734] font-medium text-xs tracking-[0.25em] uppercase px-8 py-3.5 rounded-sm transition-all duration-300 shadow-md cursor-pointer whitespace-nowrap"
                >
                  <span>Review Terms &amp; Join</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
