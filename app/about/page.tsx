"use client";

import React from "react";
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
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
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

  const ecosystemItems = [
    {
      title: "Hotels & Resorts",
      description: "Premium and luxury accommodation across domestic and international destinations.",
      icon: Hotel,
      badge: "Luxury Stays"
    },
    {
      title: "Bespoke Holidays",
      description: "Curated leisure journeys designed around individual travel preferences.",
      icon: Compass,
      badge: "Tailored Journeys"
    },
    {
      title: "Flights & Transfers",
      description: "Travel assistance for flights, airport transfers and related arrangements.",
      icon: Plane,
      badge: "Seamless Travel"
    },
    {
      title: "Visa & Travel Assistance",
      description: "Support with visa-related requirements and travel documentation.",
      icon: FileCheck,
      badge: "Full Support"
    },
    {
      title: "Cruises & Experiences",
      description: "Curated cruise holidays and premium destination experiences.",
      icon: Ship,
      badge: "Exclusive Voyages"
    },
    {
      title: "Destination Weddings & Celebrations",
      description: "Travel and hospitality assistance for weddings, celebrations and private events.",
      icon: HeartHandshake,
      badge: "Special Events"
    },
    {
      title: "Dining & Lifestyle Privileges",
      description: "Selected dining, entertainment, shopping and lifestyle benefits, subject to applicable offers and availability.",
      icon: Utensils,
      badge: "VIP Lifestyle"
    },
  ];

  const membershipPlans = [
    {
      name: "ONE YEAR — DOMESTIC",
      price: "₹12,999",
      period: "per year",
      badge: "Essential",
      popular: false,
      features: [
        "Domestic Hotel & Resort Access",
        "Personalised Travel Assistance",
        "Exclusive Member Discounts & Vouchers",
        "Standard Concierge Support"
      ]
    },
    {
      name: "ONE YEAR — WORLDWIDE",
      price: "₹19,999",
      period: "per year",
      badge: "Most Popular",
      popular: true,
      features: [
        "Global & Domestic Hotel Access",
        "Priority Travel & Flight Assistance",
        "Worldwide Member Rates & Privileges",
        "Bespoke Holiday Planning Support",
        "Dedicated Relationship Manager"
      ]
    },
    {
      name: "LIFETIME — WORLDWIDE",
      price: "₹49,999",
      period: "one-time payment",
      badge: "Ultimate Experience",
      popular: false,
      features: [
        "Unlimited Lifetime Global Access",
        "VIP Destination & Experience Bookings",
        "Maximum Savings & Luxury Upgrades",
        "Dedicated 24/7 Private Concierge",
        "Special Event & Wedding Hospitality Services"
      ]
    }
  ];

  const whyChooseUs = [
    "Premium hotel access",
    "Domestic & international travel options",
    "Curated holiday experiences",
    "Personalised travel assistance",
    "Exclusive member offers",
    "Multiple lifestyle benefits",
    "Professional service support",
    "Flexible travel planning"
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
    <main className="min-h-screen bg-[#F8F9FA] text-neutral-900 overflow-x-hidden">
      {/* 1. Header Banner */}
      <Heading
        title="About The Luxe Yatra"
        subtitle="A Private Travel & Lifestyle Club — Luxury Hotels • Bespoke Holidays • Exclusive Experiences"
        align="center"
        bgImage="/Img/wooden-bridge-koh-nangyuan-island-surat-thani-thailand_335224-1082.avif"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-20">

        {/* 2. Who We Are */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-neutral-200/80 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          
          <div className="flex flex-col lg:flex-row gap-12 items-center justify-between relative z-10">
            <motion.div variants={itemVariants} className="max-w-3xl flex-1">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#B38E46] mb-3 block">
              Who We Are
            </span>
            <h2 className="text-3xl md:text-5xl font-[Vera] text-neutral-900 tracking-tight leading-tight mb-6">
              Elevating How You Experience Luxury Travel
            </h2>
            <p className="text-neutral-600 text-base md:text-lg leading-relaxed mb-6 font-light">
              <strong className="font-semibold text-neutral-900">The Luxe Yatra</strong> is a premium travel and lifestyle membership company created for discerning travellers who value exceptional hospitality, personalised service and memorable experiences.
            </p>
            <p className="text-neutral-600 text-base md:text-lg leading-relaxed mb-6 font-light">
              Our platform brings together luxury hotel stays, curated holidays, travel assistance and lifestyle privileges through a single premium membership ecosystem.
            </p>
            <p className="text-neutral-600 text-base md:text-lg leading-relaxed font-light">
              We aim to make luxury travel more accessible, convenient and rewarding for individuals, families and corporate travellers.
            </p>
          </motion.div>
          
          <motion.div 
            variants={itemVariants} 
            className="flex-shrink-0 flex justify-center w-full lg:w-auto lg:pr-8"
          >
            <div className="relative w-56 h-56 md:w-72 md:h-72 drop-shadow-xl bg-white rounded-full flex items-center justify-center p-4">
              <Image 
                src="/Img/logo-emblem.png" 
                alt="The Luxe Yatra Logo" 
                fill 
                className="object-contain p-6"
              />
            </div>
          </motion.div>
        </div>
      </motion.section>
        {/* 3. Vision & Mission Grid */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Vision */}
          <motion.div
            variants={itemVariants}
            className="relative bg-gradient-to-br from-white via-white to-cyan-50/80 rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-cyan-100/50 flex flex-col justify-between hover:shadow-[0_12px_40px_rgba(6,182,212,0.12)] hover:-translate-y-1 transition-all duration-500 group overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none group-hover:bg-cyan-400/20 transition-colors duration-500" />
            
            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-50 to-cyan-100/50 text-cyan-600 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-cyan-500/20 transition-all duration-500 border border-cyan-200/50">
                <Eye className="w-7 h-7" />
              </div>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-cyan-600/80 mb-3 block">
                Our Vision
              </span>
              <h3 className="text-3xl font-[Vera] font-bold text-neutral-900 mb-6 leading-tight">
                Inspiring Luxury Exploration Worldwide
              </h3>
              <p className="text-neutral-700 font-[Vera] font-medium text-sm xl:text-base leading-relaxed tracking-wide">
                To establish The Luxe Yatra as a trusted and recognised name in premium travel membership, connecting members with exceptional hospitality and experiences across India and worldwide.
              </p>
            </div>
          </motion.div>
                 {/* Mission */}
          <motion.div
            variants={itemVariants}
            className="relative bg-gradient-to-br from-white via-white to-amber-50/80 rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-amber-100/50 flex flex-col justify-between hover:shadow-[0_12px_40px_rgba(245,158,11,0.12)] hover:-translate-y-1 transition-all duration-500 group overflow-hidden"
          >
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl -mr-20 -mb-20 pointer-events-none group-hover:bg-amber-400/20 transition-colors duration-500" />

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/50 text-amber-600 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-amber-500/20 transition-all duration-500 border border-amber-200/50">
                <Target className="w-7 h-7" />
              </div>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-amber-600/80 mb-3 block">
                Our Mission
              </span>
              <h3 className="text-3xl font-[Vera] font-bold text-neutral-900 mb-6 leading-tight">
                Seamless Premium Travel Deliverables
              </h3>
              <p className="text-neutral-700 font-[Vera] font-medium text-sm xl:text-base leading-relaxed tracking-wide mb-6">
                To deliver a seamless premium travel experience through:
              </p>
              <ul className="space-y-4">
                {[
                  "Curated luxury and premium hotel options",
                  "Exclusive member privileges",
                  "Personalised travel assistance",
                  "Bespoke holiday planning",
                  "Professional customer service",
                  "Transparent membership policies"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-neutral-700 font-[Vera] font-medium text-sm xl:text-base leading-relaxed tracking-wide">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.section>

        {/* 4. Travel & Lifestyle Ecosystem */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-8"
        >
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#B38E46] mb-4 block">
              Ecosystem
            </span>
            <h2 className="text-3xl md:text-5xl font-[Vera] text-neutral-900 tracking-tight leading-tight mb-4">
              Our Travel & Lifestyle Ecosystem
            </h2>
            <p className="text-neutral-600 font-[Vera] text-sm md:text-base leading-relaxed tracking-wide">
              Members can access a comprehensive range of travel and lifestyle services designed around your desires.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ecosystemItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative overflow-hidden bg-white rounded-3xl p-8 border border-[#B38E46]/30 shadow-[0_12px_40px_rgba(179,142,70,0.12)] flex flex-col justify-between"
                >
                  {/* Subtle hover gradient blob */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-[#B38E46]/10 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-8">
                      <div className="w-14 h-14 scale-110 rounded-2xl bg-[#B38E46]/5 text-[#B38E46] flex items-center justify-center border border-[#B38E46]/30">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="text-[9px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#B38E46] text-white shadow-sm">
                        {item.badge}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold font-[Vera] text-[#B38E46] mb-3">
                      {item.title}
                    </h3>
                    <p className="text-neutral-600 font-[Vera] text-sm leading-relaxed tracking-wide">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* 5. Membership Plans */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="relative bg-white rounded-3xl p-8 md:p-14 text-neutral-900 space-y-12 overflow-hidden shadow-sm border border-neutral-100"
        >
          {/* Vertical Pinstripe Lining Background Layer */}
          <div
            className="absolute inset-0 pointer-events-none z-0 opacity-100"
            style={{
              backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px)",
              backgroundSize: "8px 100%",
            }}
          />

          <div className="relative z-10 text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#B38E46] block">
              Membership
            </span>
            <h2 className="text-3xl md:text-5xl font-[Vera] tracking-tight text-neutral-900">
              The Luxe Yatra Membership Plans
            </h2>
            <p className="text-neutral-600 text-sm md:text-base leading-relaxed font-[Vera] font-medium tracking-wide">
              Our membership model is designed for travellers who regularly choose premium hotels and experiences. Depending on the selected membership plan, members may receive access to exclusive hotel rates, special offers, travel benefits, vouchers and other privileges.
            </p>
          </div>

          {/* Taj Epicure Style Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 items-start">
            {membershipPlans.map((plan, idx) => {
              const cardBg = idx === 0 
                ? "bg-gradient-to-br from-[#0B2545] via-[#091F3A] to-[#041226] text-white" 
                : idx === 1 
                ? "bg-gradient-to-br from-[#7F1D1D] via-[#6B1717] to-[#450A0A] text-white" 
                : "bg-gradient-to-br from-[#064E3B] via-[#043E2F] to-[#022C22] text-white";

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.15 }}
                  className="flex flex-col text-left group"
                >
                  {/* 1. PHYSICAL MEMBERSHIP CARD */}
                  <div
                    className={`relative w-full aspect-[1.55/1] rounded-[1.75rem] p-6 md:p-8 flex flex-col justify-between items-center text-center overflow-hidden shadow-2xl border border-white/10 group-hover:scale-[1.02] transition-transform duration-300 select-none ${cardBg}`}
                  >
                    {/* Watermark Mandala Pattern in Top Right */}
                    <div className="absolute -top-10 -right-10 pointer-events-none opacity-35">
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
                    </div>

                    <div />

                    {/* Center Branding */}
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="w-12 h-12 md:w-14 md:h-14 mx-auto mb-3 relative flex items-center justify-center rounded-full bg-white p-1 shadow-md border border-[#E5C158]/50">
                        <Image
                          src="/Img/logo-emblem.png"
                          alt="The Luxe Yatra Logo"
                          fill
                          className="object-contain p-0.5"
                        />
                      </div>
                      <h4 className="text-xl md:text-2xl font-[Vera] tracking-[0.2em] font-bold text-[#E5C158] uppercase drop-shadow-sm">
                        {plan.badge}
                      </h4>
                    </div>

                    {/* Bottom Right Script Tagline */}
                    <div className="w-full flex justify-end relative z-10">
                      <span className="font-[serif] italic text-xs md:text-sm text-[#E5C158]/90 tracking-widest lowercase">
                        {plan.name}
                      </span>
                    </div>
                  </div>

                  {/* 2. CARD DETAILS BELOW */}
                  <div className="mt-6 flex flex-col gap-1 px-1">
                    <h4 className="text-lg font-bold text-neutral-900 tracking-tight font-[Vera]">
                      Luxe {plan.badge.split(' ')[0]}
                    </h4>
                    <div className="flex items-baseline gap-1.5 mt-1">
                      <span className="text-2xl font-extrabold font-[Vera] text-neutral-900">
                        {plan.price}
                      </span>
                      <span className="text-xs text-neutral-600 font-medium">
                        {plan.period}
                      </span>
                    </div>
                  </div>

                  {/* 3. INCLUDED BENEFITS LIST BELOW CARD */}
                  <div className="mt-4 pt-4 border-t border-neutral-200 px-1">
                    <ul className="space-y-3">
                      {plan.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5 text-sm font-[Vera] font-medium text-neutral-700 tracking-wide leading-snug">
                          <CheckCircle2 className="w-4 h-4 text-[#B38E46] shrink-0 mt-[2px]" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <p className="relative z-10 text-center text-xs text-neutral-700 max-w-2xl mx-auto font-medium">
            Benefits, availability, booking conditions and applicable charges are governed by the respective membership plan and terms &amp; conditions.
          </p>
        </motion.section>

        {/* 6. Our Hotel Network */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="relative bg-white rounded-3xl p-8 md:p-14 border border-[#B38E46]/20 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-lg transition-shadow duration-500 grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-center overflow-hidden group"
        >
          {/* Subtle background glow */}
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#B38E46]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="lg:col-span-7 space-y-6 relative z-10">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#B38E46] block mb-3">
                Global Access
              </span>
              <h2 className="text-3xl md:text-5xl font-[Vera] font-bold text-neutral-900 tracking-tight leading-tight">
                Our Hotel Network
              </h2>
            </div>
            
            <div className="space-y-4">
              <p className="text-neutral-700 font-[Vera] font-medium text-sm md:text-base leading-relaxed tracking-wide">
                The Luxe Yatra focuses on building access to a curated collection of premium and luxury hospitality options.
              </p>
              <p className="text-neutral-700 font-[Vera] font-medium text-sm md:text-base leading-relaxed tracking-wide">
                Our hotel directory can showcase <strong className="font-bold text-[#B38E46]">100+ leading hotel brands</strong> and a wider selection of properties across India and international destinations.
              </p>
              <p className="text-neutral-700 font-[Vera] font-medium text-sm md:text-base leading-relaxed tracking-wide">
                The network is designed to give members greater choice when planning luxury stays and holidays.
              </p>
            </div>
            
            <div className="pt-4">
              <Link
                href="/brands"
                className="inline-flex items-center gap-3 bg-[#B38E46] text-white text-xs md:text-sm font-bold uppercase tracking-wider px-8 py-4 rounded-full hover:bg-[#997734] hover:shadow-[0_8px_20px_rgba(179,142,70,0.3)] transition-all duration-300 shadow-sm"
              >
                <span>View Brand Portfolio</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative w-full aspect-square md:aspect-[4/3] lg:aspect-square bg-gradient-to-br from-neutral-900 via-[#111] to-[#1a150b] text-white rounded-[2rem] p-10 flex flex-col justify-center items-center text-center border border-white/10 shadow-2xl overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
            {/* Inner background decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#B38E46]/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] opacity-20" style={{ backgroundSize: '16px 16px' }} />

            <div className="relative z-10 flex flex-col items-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4AF37]/20 to-transparent flex items-center justify-center border border-[#D4AF37]/30 mb-2">
                <Sparkles className="w-8 h-8 text-[#E5C158]" />
              </div>
              
              <div className="space-y-2">
                <span className="text-6xl md:text-7xl font-extrabold font-[Vera] bg-gradient-to-br from-[#E5C158] to-[#B38E46] text-transparent bg-clip-text drop-shadow-sm">
                  100+
                </span>
                <p className="text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-neutral-300 mt-2">
                  Leading Hotel Brands
                </p>
              </div>
              
              <div className="w-12 h-[1px] bg-[#B38E46]/40 mx-auto my-2" />
              
              <p className="text-xs md:text-sm text-neutral-400 font-[Vera] leading-relaxed font-light px-4">
                Curated collections spanning Marriott, St. Regis, Ritz-Carlton, EDITION, Luxury Collection and many more.
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-12"
        >
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#B38E46] block">
              Advantages
            </span>
            <h2 className="text-3xl md:text-5xl font-[Vera] font-bold text-neutral-900 tracking-tight leading-tight">
              Why The Luxe Yatra
            </h2>
            <p className="text-neutral-600 font-[Vera] text-sm md:text-base leading-relaxed tracking-wide font-medium">
              One Membership. Multiple Travel Privileges.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((point, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="relative bg-white rounded-[2rem] p-6 md:p-8 border border-[#B38E46]/30 shadow-[0_12px_40px_rgba(179,142,70,0.12)] flex items-start flex-col gap-5 overflow-hidden"
              >
                {/* Decorative blob */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#B38E46]/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none" />
                
                <div className="relative z-10 w-12 h-12 scale-110 rounded-2xl bg-[#B38E46]/5 text-[#B38E46] flex items-center justify-center shrink-0 border border-[#B38E46]/30">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                
                <span className="relative z-10 text-sm md:text-base font-[Vera] font-bold text-[#B38E46] leading-snug tracking-wide">
                  {point}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 8. Our Service Promise */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="relative bg-white rounded-[2.5rem] p-8 md:p-14 border border-[#B38E46]/20 shadow-[0_8px_30px_rgba(0,0,0,0.04)] space-y-12 overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#B38E46]/5 rounded-full blur-[100px] -mr-40 -mt-40 pointer-events-none" />

          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#B38E46] block">
              Commitment
            </span>
            <h2 className="text-3xl md:text-5xl font-[Vera] font-bold text-neutral-900 tracking-tight leading-tight">
              Our Service Promise
            </h2>
            <p className="text-neutral-600 text-sm md:text-base leading-relaxed font-[Vera] font-medium tracking-wide">
              At The Luxe Yatra, we believe premium membership is not simply about access — it is about the quality of the experience. Our service approach is built around:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {servicePillars.map((pillar, idx) => {
              const PillarIcon = pillar.icon;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="group relative bg-white rounded-[1.5rem] p-6 md:p-8 border border-neutral-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgba(179,142,70,0.12)] hover:border-[#B38E46]/30 hover:-translate-y-2 transition-all duration-500 flex flex-col justify-start space-y-6 overflow-hidden min-h-[280px]"
                >
                  {/* Decorative blob on hover */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#B38E46]/5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none group-hover:bg-[#B38E46]/10 transition-colors duration-500" />

                  <div className="relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br from-neutral-50 to-neutral-100 border border-neutral-200/50 text-neutral-400 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#B38E46]/5 group-hover:border-[#B38E46]/30 group-hover:text-[#B38E46] transition-all duration-500">
                    <PillarIcon className="w-6 h-6" />
                  </div>
                  <div className="relative z-10 flex flex-col gap-3">
                    <h3 className="text-lg font-bold font-[Vera] text-neutral-900 tracking-tight group-hover:text-[#B38E46] transition-colors duration-300">
                      {pillar.title}
                    </h3>
                    <p className="text-neutral-500 text-xs md:text-sm leading-relaxed font-[Vera] font-medium tracking-wide">
                      {pillar.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* 9. Trust & Transparency */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="relative bg-white rounded-[2rem] p-8 md:p-12 border border-[#B38E46]/20 shadow-[0_8px_30px_rgba(179,142,70,0.06)] flex flex-col md:flex-row gap-8 items-start md:items-center justify-between overflow-hidden"
        >
          {/* Decorative background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#B38E46]/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />

          <div className="space-y-4 max-w-3xl relative z-10">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-[#D4AF37]/10 to-transparent p-3 rounded-xl border border-[#D4AF37]/20 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-[#B38E46]" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold font-[Vera] text-neutral-900 tracking-tight">Trust &amp; Transparency</h3>
            </div>
            <p className="text-neutral-600 text-sm md:text-base leading-relaxed font-[Vera] font-medium tracking-wide">
              The Luxe Yatra follows a transparent membership framework. Hotel bookings, complimentary benefits, vouchers, discounts and other services are subject to availability, blackout dates, advance booking requirements, partner policies and the applicable membership terms &amp; conditions. We encourage every prospective member to review membership details prior to joining.
            </p>
          </div>

          <div className="relative z-10 shrink-0 mt-4 md:mt-0">
            <Link
              href="/luxeclub"
              className="inline-flex items-center gap-2 bg-[#B38E46] hover:bg-[#997734] active:scale-95 text-white font-bold text-xs md:text-sm uppercase tracking-wider px-8 py-4 rounded-full transition-all duration-300 shadow-[0_8px_20px_rgba(179,142,70,0.25)] hover:shadow-[0_12px_25px_rgba(179,142,70,0.35)] whitespace-nowrap"
            >
              <span>Review Terms &amp; Join</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </motion.section>

      </div>
    </main>
  );
}
