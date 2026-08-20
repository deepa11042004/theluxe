"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X } from "lucide-react";
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
  website: string;
  // Some source logo PNGs are low-resolution and their wordmark text is illegible at display size.
  // "icon-text": show a cropped icon-only image plus the brand name rendered as live text.
  // "text": no usable icon in the source image; render the brand name as live text only.
  // undefined/"image": use logoImg as-is (default, most brands).
  logoMode?: "icon-text" | "text";
};

export const ALL_BRANDS: BrandLogoItem[] = [
  // ROW 1: LUXURY
  {
    id: "edition",
    name: "EDITION",
    category: "Luxury",
    logoImg: "10.png",
    hoverBgColor: "bg-black",
    tagline: "High-Concept Design & Luxury Stays",
    description: "An unexpected and refreshing blend of high-concept design, luxury, and authentic personal service.",
    locationCount: 19,
    website: "https://www.editionhotels.com/",
  },
  {
    id: "ritz-carlton",
    name: "THE RITZ-CARLTON",
    category: "Luxury",
    logoImg: "25.png",
    hoverBgColor: "bg-[#002B49]",
    tagline: "Legendary Service & Refined Elegance",
    description: "Unforgettable experiences in the world's most vibrant cities and breathtaking resort destinations.",
    locationCount: 110,
    website: "https://www.ritzcarlton.com/",
  },
  {
    id: "luxury-collection",
    name: "THE LUXURY COLLECTION",
    category: "Luxury",
    logoImg: "26.png",
    hoverBgColor: "bg-[#2A2421]",
    tagline: "Iconic, Authentic Destination Hotels",
    description: "A curated ensemble of world-renowned hotels and resorts offering unique, authentic experiences.",
    locationCount: 125,
    website: "https://the-luxury-collection.marriott.com/",
  },
  {
    id: "st-regis",
    name: "ST. REGIS",
    category: "Luxury",
    logoImg: "24.png",
    hoverBgColor: "bg-[#1E1B18]",
    tagline: "Timeless Elegance & Signature Butler Service",
    description: "Combining classic sophistication with a modern sensibility at the finest addresses worldwide.",
    locationCount: 60,
    website: "https://st-regis.marriott.com/",
  },
  {
    id: "w-hotels",
    name: "W HOTELS",
    category: "Luxury",
    logoImg: "28.png",
    hoverBgColor: "bg-[#5B0E2D]",
    tagline: "Vibrant Luxury Lifestyle & Bold Design",
    description: "Redefining luxury lifestyle with bold design, iconic Whatever/Whenever service, and dynamic energy.",
    locationCount: 70,
    website: "https://w-hotels.marriott.com/",
  },
  {
    id: "jw-marriott",
    name: "JW MARRIOTT",
    category: "Luxury",
    logoImg: "18.png",
    hoverBgColor: "bg-[#1A2530]",
    tagline: "Enriched Luxury & Mindful Well-Being",
    description: "Designed to let guests focus on feeling whole—present in mind, nourished in body, and revitalized in spirit.",
    locationCount: 105,
    website: "https://jw-marriott.marriott.com/",
  },

  // ROW 2: PREMIUM
  {
    id: "marriott",
    name: "MARRIOTT HOTELS",
    category: "Premium",
    logoImg: "22.png",
    hoverBgColor: "bg-[#A8000B]",
    tagline: "Thoughtfully Designed Modern Hospitality",
    description: "Elevating the art of hospitality to ensure guests can travel brilliantly in top destinations worldwide.",
    locationCount: 600,
    website: "https://marriott-hotels.marriott.com/",
  },
  {
    id: "sheraton",
    name: "SHERATON",
    category: "Premium",
    logoImg: "8.png",
    hoverBgColor: "bg-[#002B49]",
    tagline: "The World's Gathering Place",
    description: "Creating intuitive spaces where guests feel connected and inspired around the globe.",
    locationCount: 440,
    website: "https://sheraton.marriott.com/",
  },
  {
    id: "marriott-vacation-club",
    name: "MARRIOTT VACATION CLUB",
    category: "Premium",
    logoImg: "4.png",
    hoverBgColor: "bg-[#003B71]",
    tagline: "Premium Vacation Ownership Resorts",
    description: "Delivering villa accommodations and exclusive resort experiences for ownership members worldwide.",
    locationCount: 90,
    website: "https://www.marriottvacationclub.com/",
  },
  {
    id: "delta-hotels",
    name: "DELTA HOTELS",
    category: "Premium",
    logoImg: "19.png",
    hoverBgColor: "bg-[#252525]",
    tagline: "Simple Made Perfect",
    description: "Focusing on the details that matter to deliver a seamless, full-service hotel experience.",
    locationCount: 115,
    website: "https://delta-hotels.marriott.com/",
  },
  {
    id: "westin",
    name: "WESTIN",
    category: "Premium",
    logoImg: "14.png",
    hoverBgColor: "bg-[#004B87]",
    tagline: "Empowering Well-Being On The Road",
    description: "Designed with signature wellness programs so guests can sleep, eat, move, and feel well.",
    locationCount: 235,
    website: "https://westin.marriott.com/",
  },
  {
    id: "le-meridien",
    name: "LE MÉRIDIEN",
    category: "Premium",
    logoImg: "21.png",
    hoverBgColor: "bg-[#003B71]",
    tagline: "Glamorous European Travel & Chic Design",
    description: "Unlocking destination culture through timeless mid-century European design and chic dining.",
    locationCount: 115,
    website: "https://le-meridien.marriott.com/",
  },

  // ROW 3: SELECT & BOUTIQUE
  {
    id: "renaissance",
    name: "RENAISSANCE HOTELS",
    category: "Premium",
    logoImg: "1.png",
    hoverBgColor: "bg-[#A8000B]",
    tagline: "Discover The Unexpected Local Style",
    description: "Inviting guests to discover unexpected local experiences through dedicated Navigators and design.",
    locationCount: 175,
    website: "https://renaissance-hotels.marriott.com/",
  },
  {
    id: "autograph-collection",
    name: "AUTOGRAPH COLLECTION",
    category: "Premium",
    logoImg: "8.png",
    hoverBgColor: "bg-[#2A2421]",
    tagline: "Exactly Like Nothing Else",
    description: "A handpicked selection of independent luxury boutique hotels defined by vision and craft.",
    locationCount: 290,
    website: "https://autograph-hotels.marriott.com/",
  },
  {
    id: "tribute-portfolio",
    name: "TRIBUTE PORTFOLIO",
    category: "Premium",
    logoImg: "27.jpg",
    hoverBgColor: "bg-[#8A4B00]",
    tagline: "Characterful Independent Boutique Stays",
    description: "A global family of characterful boutique stays bound by a passion for captivating design.",
    locationCount: 100,
    website: "https://tribute-portfolio.marriott.com/",
  },
  {
    id: "design-hotels",
    name: "DESIGN HOTELS",
    category: "Premium",
    logoImg: "3.png",
    hoverBgColor: "bg-black",
    tagline: "Architecture, Culture & Visionary Style",
    description: "A global community of visionary hospitality concepts rooted in genuine design and culture.",
    locationCount: 120,
    website: "https://www.designhotels.com/",
  },
  {
    id: "gaylord-hotels",
    name: "GAYLORD HOTELS",
    category: "Premium",
    logoImg: "2.png",
    hoverBgColor: "bg-[#003B71]",
    tagline: "Grand Resort Destinations & Conventions",
    description: "Magnificent resorts featuring glass atriums, fine dining, world-class spas, and entertainment.",
    locationCount: 6,
    website: "https://gaylord-hotels.marriott.com/",
  },
  {
    id: "mgm-collection",
    name: "MGM COLLECTION",
    category: "Premium",
    logoImg: "5.png",
    hoverBgColor: "bg-[#1E1E1E]",
    tagline: "World-Class Entertainment & Strip Resorts",
    description: "Unrivaled entertainment, iconic Las Vegas strip resorts, gaming, and dining destinations.",
    locationCount: 16,
    website: "https://mgm-collection.marriott.com/",
  },

  // ROW 4: SELECT PORTFOLIO
  {
    id: "outdoor-collection",
    name: "OUTDOOR COLLECTION",
    category: "Select",
    logoImg: "23.png",
    hoverBgColor: "bg-[#2C3E2E]",
    tagline: "Immersive Nature & Glamping Retreats",
    description: "Exceptional outdoor and nature retreat experiences with full Marriott Bonvoy privileges.",
    locationCount: 15,
    website: "https://marriott.com/",
  },
  {
    id: "courtyard",
    name: "COURTYARD BY MARRIOTT",
    category: "Select",
    logoImg: "9.png",
    hoverBgColor: "bg-[#004A7C]",
    tagline: "Empowering Passion-Driven Travel",
    description: "Thoughtfully crafted spaces for guests to stay connected, refreshed, and productive.",
    locationCount: 1280,
    website: "https://courtyard.marriott.com/",
  },
  {
    id: "four-points",
    name: "FOUR POINTS BY SHERATON",
    category: "Select",
    logoImg: "6.png",
    hoverBgColor: "bg-[#002D58]",
    tagline: "Classic Comfort & Best Brews",
    description: "Comfortable rooms, signature craft beer program, and reliable service for smart travelers.",
    locationCount: 300,
    website: "https://four-points.marriott.com/",
  },
  {
    id: "springhill-suites",
    name: "SPRINGHILL SUITES",
    category: "Select",
    logoImg: "15.png",
    hoverBgColor: "bg-[#0B3C5D]",
    tagline: "Spacious Suites & West Elm Style",
    description: "All-suite hotel design offering stylish space, West Elm furnishings, and fresh breakfast.",
    locationCount: 520,
    website: "https://springhill-suites.marriott.com/",
  },
  {
    id: "fairfield",
    name: "FAIRFIELD BY MARRIOTT",
    category: "Select",
    logoImg: "12.png",
    hoverBgColor: "bg-[#16355C]",
    tagline: "Warm Hospitality & Comforting Simplicity",
    description: "Delivering calm, intuitive comfort with signature Fairfield Guarantee for effortless travel.",
    locationCount: 1250,
    website: "https://fairfield.marriott.com/",
  },
  {
    id: "ac-hotels",
    name: "AC HOTELS",
    category: "Select",
    logoImg: "36.jpg",
    hoverBgColor: "bg-[#252525]",
    tagline: "European-Inspired Minimal Design",
    description: "Harnessing Spanish heritage and modern European design to refine the essential hotel experience.",
    locationCount: 225,
    website: "https://ac-hotels.marriott.com/",
  },

  // ROW 5: EXTENDED & LIFESTYLE
  {
    id: "citizenm",
    name: "CITIZENM",
    category: "Select",
    logoImg: "16.png",
    hoverBgColor: "bg-black",
    tagline: "Affordable Luxury & Tech Urban Stays",
    description: "Modern, tech-savvy boutique hotel stays in major global cities.",
    locationCount: 35,
    website: "https://www.citizenm.com/",
  },
  {
    id: "aloft",
    name: "ALOFT HOTELS",
    category: "Select",
    logoImg: "7.png",
    hoverBgColor: "bg-[#8A1C5A]",
    tagline: "Tech-Forward & Live Music Culture",
    description: "Different by design: open spaces, vibrant W XYZ bar, and tech-savvy amenities for global travelers.",
    locationCount: 230,
    website: "https://aloft-hotels.marriott.com/",
  },
  {
    id: "moxy",
    name: "MOXY HOTELS",
    category: "Select",
    logoImg: "20.png",
    hoverBgColor: "bg-[#E60067]",
    tagline: "Playful, Energetic Boutique Vibe",
    description: "Self-service grab-and-go food, lively bar check-in with a cocktail, and fun social spaces.",
    locationCount: 130,
    website: "https://moxy-hotels.marriott.com/",
  },
  {
    id: "protea-hotels",
    name: "PROTEA HOTELS",
    category: "Select",
    logoImg: "35.png",
    hoverBgColor: "bg-[#004B87]",
    tagline: "African Hospitality Heritage",
    description: "Leading hotel brand in Africa offering warm local hospitality and modern comforts.",
    locationCount: 80,
    website: "https://protea-hotels.marriott.com/",
  },
  {
    id: "city-express",
    name: "CITY EXPRESS",
    category: "Select",
    logoImg: "29.png",
    hoverBgColor: "bg-[#F37023]",
    tagline: "Smart Urban Accommodation",
    description: "Modern, essential urban hotel accommodation designed for business and leisure travel.",
    locationCount: 150,
    website: "https://city-express.marriott.com/",
  },
  {
    id: "four-points-flex",
    name: "FOUR POINTS FLEX",
    category: "Select",
    logoImg: "29.png",
    hoverBgColor: "bg-[#002D58]",
    tagline: "Flexible Modern Value Stays",
    description: "Smart, flexible hospitality focused on quality fundamentals and great value.",
    locationCount: 40,
    website: "https://four-points-flex.marriott.com/",
  },

  // ROW 6: EXTENDED STAYS & RESIDENCES
  {
    id: "series",
    name: "SERIES BY MARRIOTT",
    category: "Select",
    logoImg: "32.png",
    hoverBgColor: "bg-[#333333]",
    tagline: "Curated Regional Boutique Hospitality",
    description: "Regional boutique collections offering distinct local character with trusted Marriott standards.",
    locationCount: 25,
    website: "https://marriott.com/",
  },
  {
    id: "residence-inn",
    name: "RESIDENCE INN",
    category: "Select",
    logoImg: "30.png",
    hoverBgColor: "bg-[#004A7C]",
    tagline: "Extended Stay Comfort & Full Kitchens",
    description: "Spacious suites with full kitchens and free hot breakfast for long-term travel comfort.",
    locationCount: 880,
    website: "https://residence-inn.marriott.com/",
  },
  {
    id: "towneplace-suites",
    name: "TOWNEPLACE SUITES",
    category: "Select",
    logoImg: "33.png",
    hoverBgColor: "bg-[#C41230]",
    tagline: "All-Suite Extended Travel Stays",
    description: "Simple, friendly extended-stay hotel with Weber grills, full kitchens, and cozy suites.",
    locationCount: 470,
    website: "https://towneplace-suites.marriott.com/",
  },
  {
    id: "element",
    name: "ELEMENT HOTELS",
    category: "Select",
    logoImg: "34.jpg",
    logoMode: "icon-text",
    hoverBgColor: "bg-[#386641]",
    tagline: "Eco-Conscious Extended Stay Stays",
    description: "Sustainably built extended stay hotels featuring eco-friendly design, natural light, and bike rentals.",
    locationCount: 100,
    website: "https://element-hotels.marriott.com/",
  },
  {
    id: "studiores",
    name: "STUDIORES",
    category: "Select",
    logoImg: "31.png",
    hoverBgColor: "bg-[#1F3A60]",
    tagline: "Smart Midscale Extended Stay",
    description: "Affordable, comfortable long-term stays engineered for modern extended travelers.",
    locationCount: 20,
    website: "https://studiores.marriott.com/",
  },
  {
    id: "marriott-executive-apartments",
    name: "EXECUTIVE APARTMENTS",
    category: "Select",
    logoImg: "11.png",
    hoverBgColor: "bg-[#A8000B]",
    tagline: "Luxury Serviced Corporate Apartments",
    description: "Five-star serviced apartments for international corporate executives and luxury long stays.",
    locationCount: 35,
    website: "https://marriott-executive-apartments.marriott.com/",
  },


];

const BrandCard = ({ brand }: { brand: BrandLogoItem }) => {
  const [isHovered, setIsHovered] = useState(false);

  // On default: use grayscale and opacity to make the logo grey without turning white backgrounds into grey boxes
  const defaultFilter = 'grayscale(100%) opacity(60%)';
  // On hover: remove filters to show the logo in its original native brand color
  const hoverFilter = 'none';

  // Fallback map for the 6 missing logos that couldn't be cropped from the reference screenshots
  const getLogoPath = (b: BrandLogoItem) => `/Img/brands/${b.logoImg}`;

  return (
    <motion.a
      href={brand.website}
      target="_blank"
      rel="noopener noreferrer"
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-2xl border border-neutral-200/80 bg-white shadow-sm hover:shadow-xl hover:border-neutral-300 transition-all duration-300 block h-28 text-center overflow-hidden"
    >


      {/* Brand Logo Rendering */}
      <div className="absolute inset-0 px-4 py-4 z-20 transition-transform duration-300 select-none flex items-center justify-center overflow-hidden">
        <div className="relative w-full h-full flex items-center justify-center">
          <Image
            src={getLogoPath(brand)}
            alt={`${brand.name} Logo`}
            fill
            unoptimized
            className="object-contain transition-all duration-300 group-hover:scale-110"
            style={{ 
              filter: isHovered ? hoverFilter : defaultFilter,
              mixBlendMode: 'multiply'
            }}
            priority
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      </div>
    </motion.a>
  );
};

export default function Brandsec() {
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

  const getLogoPath = (b: BrandLogoItem) => {
    if (b.id === 'towneplace-suites') return '/Img/brands/TownePlace_Suites_logo.svg.png';
    if (b.id === 'element') return '/Img/brands/series_by_marriott_Logo.png';
    if (b.id === 'homes-villas') return '/Img/brands/hvmi-social-logo.png';
    if (b.id === 'ac-hotels') return '/Img/brands/Logo_AC-Hotels-by-Marriott.jpg';
    return `/Img/brands/${b.logoImg}`;
  };

  return (
    <section className="min-h-screen bg-[#F5F5F7] text-neutral-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Exact Marriott 6-Column Grid Layout using ORIGINAL LOGO IMAGES */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          <AnimatePresence>
            {filteredBrands.map((brand) => (
              <BrandCard key={brand.id} brand={brand} />
            ))}
          </AnimatePresence>
        </div>

        {filteredBrands.length === 0 && (
          <div className="text-center py-20 text-neutral-500">
            <p className="text-sm font-medium">No brand found matching &quot;{searchQuery}&quot;.</p>
          </div>
        )}
      </div>

    </section>
  );
}
