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
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-cyan-600 mb-2 block">
              Ecosystem
            </span>
            <h2 className="text-3xl md:text-4xl font-[Vera] text-neutral-900 tracking-tight">
              Our Travel &amp; Lifestyle Ecosystem
            </h2>
            <p className="text-neutral-500 text-sm mt-3">
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
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-xl bg-neutral-100 text-neutral-800">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-neutral-900 text-white">
                        {item.badge}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold font-[Vera] text-neutral-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-neutral-600 text-xs leading-relaxed font-light">
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
          className="bg-neutral-900 rounded-3xl p-8 md:p-14 text-white space-y-12 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.05),transparent_50%)] pointer-events-none" />

          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-amber-400 block">
              Membership
            </span>
            <h2 className="text-3xl md:text-5xl font-[Vera] tracking-tight">
              The Luxe Yatra Membership Plans
            </h2>
            <p className="text-neutral-300 text-sm md:text-base leading-relaxed font-light">
              Our membership model is designed for travellers who regularly choose premium hotels and experiences. Depending on the selected membership plan, members may receive access to exclusive hotel rates, special offers, travel benefits, vouchers and other privileges.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            {membershipPlans.map((plan, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className={`rounded-2xl p-8 flex flex-col justify-between border ${
                  plan.popular
                    ? "bg-white text-neutral-900 border-white shadow-2xl relative scale-105"
                    : "bg-neutral-800/80 text-white border-neutral-700 hover:border-neutral-600"
                } transition-all duration-300`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                      plan.popular ? "bg-amber-500 text-black" : "bg-neutral-700 text-neutral-300"
                    }`}>
                      {plan.badge}
                    </span>
                  </div>

                  <h3 className={`text-sm font-bold tracking-wider uppercase mb-4 ${plan.popular ? "text-neutral-800" : "text-neutral-400"}`}>
                    {plan.name}
                  </h3>

                  <div className="mb-6">
                    <span className="text-4xl font-extrabold font-[Vera]">{plan.price}</span>
                    <span className={`text-xs ml-2 ${plan.popular ? "text-neutral-500" : "text-neutral-400"}`}>{plan.period}</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2 text-xs">
                        <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${plan.popular ? "text-amber-600" : "text-amber-400"}`} />
                        <span className={plan.popular ? "text-neutral-700" : "text-neutral-300"}>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/luxeclub"
                  className={`w-full py-3 rounded-full text-xs font-bold transition-all text-center flex items-center justify-center gap-2 ${
                    plan.popular
                      ? "bg-black text-white hover:bg-neutral-800 shadow-md"
                      : "bg-white text-neutral-900 hover:bg-neutral-200"
                  }`}
                >
                  <span>Join Luxe Club</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-xs text-neutral-400 max-w-2xl mx-auto font-light">
            Benefits, availability, booking conditions and applicable charges are governed by the respective membership plan and terms &amp; conditions.
          </p>
        </motion.section>

        {/* 6. Our Hotel Network */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="bg-white rounded-3xl p-8 md:p-12 border border-neutral-200/80 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
        >
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-cyan-600 block">
              Global Access
            </span>
            <h2 className="text-3xl md:text-4xl font-[Vera] text-neutral-900 tracking-tight">
              Our Hotel Network
            </h2>
            <p className="text-neutral-600 text-base leading-relaxed font-light">
              The Luxe Yatra focuses on building access to a curated collection of premium and luxury hospitality options.
            </p>
            <p className="text-neutral-600 text-base leading-relaxed font-light">
              Our hotel directory can showcase <strong className="font-semibold text-neutral-900">100+ leading hotel brands</strong> and a wider selection of properties across India and international destinations.
            </p>
            <p className="text-neutral-600 text-base leading-relaxed font-light">
              The network is designed to give members greater choice when planning luxury stays and holidays.
            </p>
            <div className="pt-4">
              <Link
                href="/brands"
                className="inline-flex items-center gap-2 bg-neutral-900 text-white text-xs font-semibold px-6 py-3 rounded-full hover:bg-neutral-800 transition-colors shadow-sm"
              >
                <span>View Brand Portfolio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 bg-neutral-950 text-white rounded-2xl p-8 space-y-6 flex flex-col justify-center text-center border border-neutral-800">
            <Sparkles className="w-10 h-10 text-amber-400 mx-auto" />
            <div className="space-y-1">
              <span className="text-5xl font-extrabold font-[Vera] text-white">100+</span>
              <p className="text-xs uppercase tracking-widest text-neutral-400">Leading Hotel Brands</p>
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed font-light">
              Curated collections spanning Marriott, St. Regis, Ritz-Carlton, EDITION, Luxury Collection and many more.
            </p>
          </div>
        </motion.section>

        {/* 7. Why The Luxe Yatra */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-8"
        >
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-cyan-600 block">
              Advantages
            </span>
            <h2 className="text-3xl md:text-4xl font-[Vera] text-neutral-900 tracking-tight">
              Why The Luxe Yatra
            </h2>
            <p className="text-neutral-600 font-semibold text-base">
              One Membership. Multiple Travel Privileges.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {whyChooseUs.map((point, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="bg-white rounded-2xl p-6 border border-neutral-200/80 shadow-sm flex items-center gap-4 hover:border-neutral-300 transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <span className="text-sm font-semibold text-neutral-800">
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
          className="bg-white rounded-3xl p-8 md:p-12 border border-neutral-200/80 shadow-sm space-y-10"
        >
          <div className="max-w-3xl space-y-3">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-cyan-600 block">
              Commitment
            </span>
            <h2 className="text-3xl md:text-4xl font-[Vera] text-neutral-900 tracking-tight">
              Our Service Promise
            </h2>
            <p className="text-neutral-600 text-base leading-relaxed font-light">
              At The Luxe Yatra, we believe premium membership is not simply about access — it is about the quality of the experience. Our service approach is built around:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {servicePillars.map((pillar, idx) => {
              const PillarIcon = pillar.icon;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="bg-neutral-50 rounded-2xl p-6 border border-neutral-200/60 flex flex-col justify-between space-y-4 hover:bg-white hover:shadow-md transition-all"
                >
                  <div className="p-3 bg-white rounded-xl shadow-xs w-max text-neutral-900">
                    <PillarIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold font-[Vera] text-neutral-900 mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-neutral-600 text-xs leading-relaxed font-light">
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
          className="bg-neutral-100 rounded-3xl p-8 md:p-10 border border-neutral-200/80 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between"
        >
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2 text-neutral-900">
              <ShieldCheck className="w-5 h-5 text-cyan-700" />
              <h3 className="text-xl font-bold font-[Vera]">Trust &amp; Transparency</h3>
            </div>
            <p className="text-neutral-600 text-xs md:text-sm leading-relaxed font-light">
              The Luxe Yatra follows a transparent membership framework. Hotel bookings, complimentary benefits, vouchers, discounts and other services are subject to availability, blackout dates, advance booking requirements, partner policies and the applicable membership terms &amp; conditions. We encourage every prospective member to review membership details prior to joining.
            </p>
          </div>

          <Link
            href="/luxeclub"
            className="bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold px-6 py-3 rounded-full transition-colors whitespace-nowrap shadow-sm"
          >
            Review Terms &amp; Join
          </Link>
        </motion.section>

      </div>
    </main>
  );
}
