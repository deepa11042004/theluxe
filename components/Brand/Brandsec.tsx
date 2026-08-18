"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ExternalLink } from "lucide-react";
import Image from "next/image";

export type BrandLogoItem = {
  id: string;
  name: string;
  category: "Luxury" | "Premium" | "Select";
  logoImg: string; // Original brand logo PNG filename in public/Img/brands/
  hoverBgColor: string;
  tagline: string;
  description: string;
  locationCount: number;
};

export const ALL_BRANDS: BrandLogoItem[] = [
  // ROW 1: LUXURY
  {
    id: "edition",
    name: "EDITION",
    category: "Luxury",
    logoImg: "edition.png",
    hoverBgColor: "bg-black",
    tagline: "High-Concept Design & Luxury Stays",
    description: "An unexpected and refreshing blend of high-concept design, luxury, and authentic personal service.",
    locationCount: 19,
  },
  {
    id: "ritz-carlton",
    name: "THE RITZ-CARLTON",
    category: "Luxury",
    logoImg: "ritz-carlton.png",
    hoverBgColor: "bg-[#002B49]",
    tagline: "Legendary Service & Refined Elegance",
    description: "Unforgettable experiences in the world's most vibrant cities and breathtaking resort destinations.",
    locationCount: 110,
  },
  {
    id: "luxury-collection",
    name: "THE LUXURY COLLECTION",
    category: "Luxury",
    logoImg: "luxury-collection.png",
    hoverBgColor: "bg-[#2A2421]",
    tagline: "Iconic, Authentic Destination Hotels",
    description: "A curated ensemble of world-renowned hotels and resorts offering unique, authentic experiences.",
    locationCount: 125,
  },
  {
    id: "st-regis",
    name: "ST. REGIS",
    category: "Luxury",
    logoImg: "st-regis.png",
    hoverBgColor: "bg-[#1E1B18]",
    tagline: "Timeless Elegance & Signature Butler Service",
    description: "Combining classic sophistication with a modern sensibility at the finest addresses worldwide.",
    locationCount: 60,
  },
  {
    id: "w-hotels",
    name: "W HOTELS",
    category: "Luxury",
    logoImg: "w-hotels.png",
    hoverBgColor: "bg-[#5B0E2D]",
    tagline: "Vibrant Luxury Lifestyle & Bold Design",
    description: "Redefining luxury lifestyle with bold design, iconic Whatever/Whenever service, and dynamic energy.",
    locationCount: 70,
  },
  {
    id: "jw-marriott",
    name: "JW MARRIOTT",
    category: "Luxury",
    logoImg: "jw-marriott.png",
    hoverBgColor: "bg-[#1A2530]",
    tagline: "Enriched Luxury & Mindful Well-Being",
    description: "Designed to let guests focus on feeling whole—present in mind, nourished in body, and revitalized in spirit.",
    locationCount: 105,
  },

  // ROW 2: PREMIUM
  {
    id: "marriott",
    name: "MARRIOTT HOTELS",
    category: "Premium",
    logoImg: "marriott.png",
    hoverBgColor: "bg-[#A8000B]",
    tagline: "Thoughtfully Designed Modern Hospitality",
    description: "Elevating the art of hospitality to ensure guests can travel brilliantly in top destinations worldwide.",
    locationCount: 600,
  },
  {
    id: "sheraton",
    name: "SHERATON",
    category: "Premium",
    logoImg: "sheraton.png",
    hoverBgColor: "bg-[#002B49]",
    tagline: "The World's Gathering Place",
    description: "Creating intuitive spaces where guests feel connected and inspired around the globe.",
    locationCount: 440,
  },
  {
    id: "marriott-vacation-club",
    name: "MARRIOTT VACATION CLUB",
    category: "Premium",
    logoImg: "marriott-vacation-club.png",
    hoverBgColor: "bg-[#003B71]",
    tagline: "Premium Vacation Ownership Resorts",
    description: "Delivering villa accommodations and exclusive resort experiences for ownership members worldwide.",
    locationCount: 90,
  },
  {
    id: "delta-hotels",
    name: "DELTA HOTELS",
    category: "Premium",
    logoImg: "delta-hotels.png",
    hoverBgColor: "bg-[#252525]",
    tagline: "Simple Made Perfect",
    description: "Focusing on the details that matter to deliver a seamless, full-service hotel experience.",
    locationCount: 115,
  },
  {
    id: "westin",
    name: "WESTIN",
    category: "Premium",
    logoImg: "westin.png",
    hoverBgColor: "bg-[#004B87]",
    tagline: "Empowering Well-Being On The Road",
    description: "Designed with signature wellness programs so guests can sleep, eat, move, and feel well.",
    locationCount: 235,
  },
  {
    id: "le-meridien",
    name: "LE MÉRIDIEN",
    category: "Premium",
    logoImg: "le-meridien.png",
    hoverBgColor: "bg-[#003B71]",
    tagline: "Glamorous European Travel & Chic Design",
    description: "Unlocking destination culture through timeless mid-century European design and chic dining.",
    locationCount: 115,
  },

  // ROW 3: SELECT & BOUTIQUE
  {
    id: "renaissance",
    name: "RENAISSANCE HOTELS",
    category: "Premium",
    logoImg: "renaissance.png",
    hoverBgColor: "bg-[#A8000B]",
    tagline: "Discover The Unexpected Local Style",
    description: "Inviting guests to discover unexpected local experiences through dedicated Navigators and design.",
    locationCount: 175,
  },
  {
    id: "autograph-collection",
    name: "AUTOGRAPH COLLECTION",
    category: "Premium",
    logoImg: "autograph-collection.png",
    hoverBgColor: "bg-[#2A2421]",
    tagline: "Exactly Like Nothing Else",
    description: "A handpicked selection of independent luxury boutique hotels defined by vision and craft.",
    locationCount: 290,
  },
  {
    id: "tribute-portfolio",
    name: "TRIBUTE PORTFOLIO",
    category: "Premium",
    logoImg: "tribute-portfolio.png",
    hoverBgColor: "bg-[#8A4B00]",
    tagline: "Characterful Independent Boutique Stays",
    description: "A global family of characterful boutique stays bound by a passion for captivating design.",
    locationCount: 100,
  },
  {
    id: "design-hotels",
    name: "DESIGN HOTELS",
    category: "Premium",
    logoImg: "design-hotels.png",
    hoverBgColor: "bg-black",
    tagline: "Architecture, Culture & Visionary Style",
    description: "A global community of visionary hospitality concepts rooted in genuine design and culture.",
    locationCount: 120,
  },
  {
    id: "gaylord-hotels",
    name: "GAYLORD HOTELS",
    category: "Premium",
    logoImg: "gaylord-hotels.png",
    hoverBgColor: "bg-[#003B71]",
    tagline: "Grand Resort Destinations & Conventions",
    description: "Magnificent resorts featuring glass atriums, fine dining, world-class spas, and entertainment.",
    locationCount: 6,
  },
  {
    id: "mgm-collection",
    name: "MGM COLLECTION",
    category: "Premium",
    logoImg: "mgm-collection.png",
    hoverBgColor: "bg-[#1E1E1E]",
    tagline: "World-Class Entertainment & Strip Resorts",
    description: "Unrivaled entertainment, iconic Las Vegas strip resorts, gaming, and dining destinations.",
    locationCount: 16,
  },

  // ROW 4: SELECT PORTFOLIO
  {
    id: "outdoor-collection",
    name: "OUTDOOR COLLECTION",
    category: "Select",
    logoImg: "outdoor-collection.png",
    hoverBgColor: "bg-[#2C3E2E]",
    tagline: "Immersive Nature & Glamping Retreats",
    description: "Exceptional outdoor and nature retreat experiences with full Marriott Bonvoy privileges.",
    locationCount: 15,
  },
  {
    id: "courtyard",
    name: "COURTYARD BY MARRIOTT",
    category: "Select",
    logoImg: "courtyard.png",
    hoverBgColor: "bg-[#004A7C]",
    tagline: "Empowering Passion-Driven Travel",
    description: "Thoughtfully crafted spaces for guests to stay connected, refreshed, and productive.",
    locationCount: 1280,
  },
  {
    id: "four-points",
    name: "FOUR POINTS BY SHERATON",
    category: "Select",
    logoImg: "four-points.png",
    hoverBgColor: "bg-[#002D58]",
    tagline: "Classic Comfort & Best Brews",
    description: "Comfortable rooms, signature craft beer program, and reliable service for smart travelers.",
    locationCount: 300,
  },
  {
    id: "springhill-suites",
    name: "SPRINGHILL SUITES",
    category: "Select",
    logoImg: "springhill-suites.png",
    hoverBgColor: "bg-[#0B3C5D]",
    tagline: "Spacious Suites & West Elm Style",
    description: "All-suite hotel design offering stylish space, West Elm furnishings, and fresh breakfast.",
    locationCount: 520,
  },
  {
    id: "fairfield",
    name: "FAIRFIELD BY MARRIOTT",
    category: "Select",
    logoImg: "fairfield.png",
    hoverBgColor: "bg-[#16355C]",
    tagline: "Warm Hospitality & Comforting Simplicity",
    description: "Delivering calm, intuitive comfort with signature Fairfield Guarantee for effortless travel.",
    locationCount: 1250,
  },
  {
    id: "ac-hotels",
    name: "AC HOTELS",
    category: "Select",
    logoImg: "ac-hotels.png",
    hoverBgColor: "bg-[#252525]",
    tagline: "European-Inspired Minimal Design",
    description: "Harnessing Spanish heritage and modern European design to refine the essential hotel experience.",
    locationCount: 225,
  },

  // ROW 5: EXTENDED & LIFESTYLE
  {
    id: "citizenm",
    name: "CITIZENM",
    category: "Select",
    logoImg: "citizenm.png",
    hoverBgColor: "bg-black",
    tagline: "Affordable Luxury & Tech Urban Stays",
    description: "Modern, tech-savvy boutique hotel stays in major global cities.",
    locationCount: 35,
  },
  {
    id: "aloft",
    name: "ALOFT HOTELS",
    category: "Select",
    logoImg: "aloft.png",
    hoverBgColor: "bg-[#8A1C5A]",
    tagline: "Tech-Forward & Live Music Culture",
    description: "Different by design: open spaces, vibrant W XYZ bar, and tech-savvy amenities for global travelers.",
    locationCount: 230,
  },
  {
    id: "moxy",
    name: "MOXY HOTELS",
    category: "Select",
    logoImg: "moxy.png",
    hoverBgColor: "bg-[#E60067]",
    tagline: "Playful, Energetic Boutique Vibe",
    description: "Self-service grab-and-go food, lively bar check-in with a cocktail, and fun social spaces.",
    locationCount: 130,
  },
  {
    id: "protea-hotels",
    name: "PROTEA HOTELS",
    category: "Select",
    logoImg: "protea-hotels.png",
    hoverBgColor: "bg-[#004B87]",
    tagline: "African Hospitality Heritage",
    description: "Leading hotel brand in Africa offering warm local hospitality and modern comforts.",
    locationCount: 80,
  },
  {
    id: "city-express",
    name: "CITY EXPRESS",
    category: "Select",
    logoImg: "city-express.png",
    hoverBgColor: "bg-[#F37023]",
    tagline: "Smart Urban Accommodation",
    description: "Modern, essential urban hotel accommodation designed for business and leisure travel.",
    locationCount: 150,
  },
  {
    id: "four-points-flex",
    name: "FOUR POINTS FLEX",
    category: "Select",
    logoImg: "four-points-flex.png",
    hoverBgColor: "bg-[#002D58]",
    tagline: "Flexible Modern Value Stays",
    description: "Smart, flexible hospitality focused on quality fundamentals and great value.",
    locationCount: 40,
  },

  // ROW 6: EXTENDED STAYS & RESIDENCES
  {
    id: "series",
    name: "SERIES BY MARRIOTT",
    category: "Select",
    logoImg: "series.png",
    hoverBgColor: "bg-[#333333]",
    tagline: "Curated Regional Boutique Hospitality",
    description: "Regional boutique collections offering distinct local character with trusted Marriott standards.",
    locationCount: 25,
  },
  {
    id: "residence-inn",
    name: "RESIDENCE INN",
    category: "Select",
    logoImg: "residence-inn.png",
    hoverBgColor: "bg-[#004A7C]",
    tagline: "Extended Stay Comfort & Full Kitchens",
    description: "Spacious suites with full kitchens and free hot breakfast for long-term travel comfort.",
    locationCount: 880,
  },
  {
    id: "towneplace-suites",
    name: "TOWNEPLACE SUITES",
    category: "Select",
    logoImg: "towneplace-suites.png",
    hoverBgColor: "bg-[#C41230]",
    tagline: "All-Suite Extended Travel Stays",
    description: "Simple, friendly extended-stay hotel with Weber grills, full kitchens, and cozy suites.",
    locationCount: 470,
  },
  {
    id: "element",
    name: "ELEMENT HOTELS",
    category: "Select",
    logoImg: "element.png",
    hoverBgColor: "bg-[#386641]",
    tagline: "Eco-Conscious Extended Stay Stays",
    description: "Sustainably built extended stay hotels featuring eco-friendly design, natural light, and bike rentals.",
    locationCount: 100,
  },
  {
    id: "studiores",
    name: "STUDIORES",
    category: "Select",
    logoImg: "studiores.png",
    hoverBgColor: "bg-[#1F3A60]",
    tagline: "Smart Midscale Extended Stay",
    description: "Affordable, comfortable long-term stays engineered for modern extended travelers.",
    locationCount: 20,
  },
  {
    id: "marriott-executive-apartments",
    name: "EXECUTIVE APARTMENTS",
    category: "Select",
    logoImg: "marriott-executive-apartments.png",
    hoverBgColor: "bg-[#A8000B]",
    tagline: "Luxury Serviced Corporate Apartments",
    description: "Five-star serviced apartments for international corporate executives and luxury long stays.",
    locationCount: 35,
  },

  // ROW 7: PREMIUM RESIDENCES & VILLAS
  {
    id: "homes-villas",
    name: "HOMES & VILLAS",
    category: "Luxury",
    logoImg: "homes-villas.png",
    hoverBgColor: "bg-[#121212]",
    tagline: "Curated Private Home & Villa Rentals",
    description: "A curated collection of luxury private home and villa rentals backed by Marriott Bonvoy.",
    locationCount: 1400,
  },
  {
    id: "apartments",
    name: "APARTMENTS BY MARRIOTT",
    category: "Premium",
    logoImg: "apartments.png",
    hoverBgColor: "bg-[#1E293B]",
    tagline: "Premium Serviced Residences",
    description: "Independent premium apartment stays offering spacious living for long or short stays.",
    locationCount: 25,
  },
];

const BrandCard = ({ brand, onClick }: { brand: BrandLogoItem, onClick: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Extract hex color from the tailwind bg class (e.g. "bg-black" -> "#000000", "bg-[#002B49]" -> "#002B49")
  const hoverColor = brand.hoverBgColor === 'bg-black' ? '#000000' : brand.hoverBgColor.replace('bg-[', '').replace(']', '');

  // brightness(0) turns the logo pure black, invert(0.45) turns that black into a solid, sharp #737373 grey without making it translucent.
  const defaultFilter = 'brightness(0) invert(0.45)';
  // brightness(0) invert(1) turns any logo (whether originally black, red, or white) into pure white on hover.
  const hoverFilter = 'brightness(0) invert(1)';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ backgroundColor: isHovered ? hoverColor : '#FFFFFF' }}
      className="group relative rounded-2xl border border-neutral-200/80 shadow-xs hover:shadow-xl hover:border-neutral-900/30 transition-all duration-300 block h-36 text-center cursor-pointer overflow-hidden"
    >
      {/* Category Badge Pill on Hover */}
      <div className="absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-opacity z-30">
        <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full shadow-2xs backdrop-blur-md text-neutral-800 bg-white/90 border border-neutral-300/50">
          {brand.category}
        </span>
      </div>

      {/* Brand Logo Image Container */}
      <div className="absolute inset-0 p-5 z-20 transition-transform duration-300 select-none flex items-center justify-center">
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={`/Img/brands/${brand.logoImg}`}
            alt={`${brand.name} Logo`}
            fill
            unoptimized
            className="object-contain transition-all duration-300 group-hover:scale-105"
            style={{ filter: isHovered ? hoverFilter : defaultFilter }}
            priority
          />
        </div>
      </div>
    </motion.div>
  );
};

export default function Brandsec() {
  const [selectedBrand, setSelectedBrand] = useState<BrandLogoItem | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"All" | "Luxury" | "Premium" | "Select">("All");

  const filteredBrands = ALL_BRANDS.filter((brand) => {
    const matchesCategory = selectedCategory === "All" || brand.category === selectedCategory;
    const matchesSearch =
      brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      brand.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      brand.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="min-h-screen bg-[#F5F5F7] text-neutral-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Filter and Search Header Bar matching Marriott UI */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 bg-white p-5 rounded-2xl border border-neutral-200/80 shadow-xs">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {(["All", "Luxury", "Premium", "Select"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-black text-white shadow-md scale-105"
                    : "bg-neutral-100 text-neutral-600 hover:text-black hover:bg-neutral-200"
                }`}
              >
                {cat === "All" ? "All Portfolios" : `${cat} Portfolio`}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search brand portfolio..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-50 border border-neutral-200 rounded-full pl-10 pr-8 py-2.5 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-black transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-neutral-400 hover:text-black cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Exact Marriott 6-Column Grid Layout using ORIGINAL LOGO IMAGES */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          <AnimatePresence>
            {filteredBrands.map((brand) => (
              <BrandCard key={brand.id} brand={brand} onClick={() => setSelectedBrand(brand)} />
            ))}
          </AnimatePresence>
        </div>

        {filteredBrands.length === 0 && (
          <div className="text-center py-20 text-neutral-500">
            <p className="text-sm font-medium">No brand found matching &quot;{searchQuery}&quot;.</p>
          </div>
        )}
      </div>

      {/* Brand Detail Modal */}
      <AnimatePresence>
        {selectedBrand && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedBrand(null)}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-100 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl max-w-md w-full p-6 text-neutral-900 relative shadow-2xl overflow-hidden border border-neutral-100"
            >
              <button
                onClick={() => setSelectedBrand(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-neutral-100 text-neutral-500 hover:text-black hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Original Logo in Modal Header */}
              <div className="bg-neutral-50 rounded-2xl p-6 mb-5 flex items-center justify-center border border-neutral-100 relative h-28">
                <Image
                  src={`/Img/brands/${selectedBrand.logoImg}`}
                  alt={`${selectedBrand.name} Logo`}
                  fill
                  unoptimized
                  className="object-contain p-4"
                />
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-neutral-900 text-white">
                  {selectedBrand.category} Portfolio
                </span>
                <span className="text-xs font-semibold text-neutral-500">
                  {selectedBrand.locationCount}+ Global Destinations
                </span>
              </div>

              <h3 className="text-xl font-[Vera] font-bold text-neutral-900 mb-1">
                {selectedBrand.name}
              </h3>

              <p className="text-xs font-semibold text-neutral-700 mb-3">
                &ldquo;{selectedBrand.tagline}&rdquo;
              </p>

              <p className="text-xs text-neutral-600 leading-relaxed mb-6">
                {selectedBrand.description}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-neutral-100">
                <a
                  href="/resorts"
                  className="bg-black hover:bg-neutral-800 text-white px-5 py-2.5 rounded-full font-semibold text-xs transition-all flex items-center gap-1.5"
                >
                  <span>Explore Resorts</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => setSelectedBrand(null)}
                  className="text-xs font-semibold text-neutral-500 hover:text-black transition-colors cursor-pointer px-4 py-2"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
