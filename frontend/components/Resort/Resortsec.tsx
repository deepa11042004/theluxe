"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Search, X, MapPin, Star, Sparkles } from "lucide-react";

// Resort Filter Categories
const CATEGORIES = [
  "ALL RESORTS",
  "NATIONAL",
  "INTERNATIONAL",
  "HERITAGE & PALACE",
  "BEACH & ISLAND",
  "MOUNTAIN & WELLNESS",
  "WILDLIFE & SAFARI",
  "LUXURY CITY HOTELS",
  "BOUTIQUE & EXPERIENTIAL",
];

// Curated Luxury Resort Properties Data
const LUXURY_RESORTS = [
  {
    id: "static-1",
    title: "Taj Lake Palace",
    location: "Udaipur, Rajasthan, India",
    country: "India",
    description:
      "A floating white-marble palace in the middle of Lake Pichola offering unparalleled royal hospitality and romantic sunset views over the Aravalli hills.",
    image:
      "https://cdn.sanity.io/images/ocl5w36p/ihcl_prod/1c0c270e8d67352d82a51cc9a9c89c994bc882fe-1280x1760.jpg",
    href: "https://www.tajhotels.com/en-in/taj/taj-lake-palace-udaipur/",
    category: "HERITAGE & PALACE",
    luxuryCategory: "HERITAGE & PALACE",
    hotelType: "Palace Resort",
    isNational: true,
    isInternational: false,
    rating: 4.9,
    price: "₹48,500",
    amenities: ["Royal Butler Service", "Private Boat Transfer", "Jharokha Dining"],
  },
  {
    id: "static-2",
    title: "Ananda in the Himalayas",
    location: "Rishikesh, Uttarakhand, India",
    country: "India",
    description:
      "A world-renowned luxury wellness sanctuary set on a 100-acre palace estate overlooking the spiritual Ganges River valley.",
    image: "/Img/Untitled design (15).webp",
    href: "https://www.anandaspa.com/",
    category: "MOUNTAIN & WELLNESS",
    luxuryCategory: "MOUNTAIN & WELLNESS",
    hotelType: "Wellness Sanctuary",
    isNational: true,
    isInternational: false,
    rating: 4.95,
    price: "₹42,000",
    amenities: ["Ayurvedic Spa", "Yoga & Meditation", "Organic Gourmet"],
  },
  {
    id: "static-3",
    title: "The Oberoi Amarvilas",
    location: "Agra, Uttar Pradesh, India",
    country: "India",
    description:
      "Located just 600 meters from the Taj Mahal, every room and suite offers uninterrupted, breathtaking views of the monument of love.",
    image: "/Img/e3371e9e.avif",
    href: "https://www.oberoihotels.com/hotels-in-agra-amarvilas-resort/",
    category: "HERITAGE & PALACE",
    luxuryCategory: "HERITAGE & PALACE",
    hotelType: "Palace Resort",
    isNational: true,
    isInternational: false,
    rating: 4.98,
    price: "₹55,000",
    amenities: ["Taj Mahal Views", "Private Balconies", "Terrace Dining"],
  },
  {
    id: "static-4",
    title: "Soneva Fushi",
    location: "Baa Atoll, Maldives",
    country: "Maldives",
    description:
      "An idyllic island hideaway featuring spacious beachfront and overwater villas with private pools, glassblowing studio, and open-air cinema.",
    image: "/Img/soneva-fushi.jpg",
    href: "https://soneva.com/resorts/soneva-fushi/",
    category: "BEACH & ISLAND",
    luxuryCategory: "BEACH & ISLAND",
    hotelType: "Island Resort",
    isNational: false,
    isInternational: true,
    rating: 4.92,
    price: "₹1,15,000",
    amenities: ["Private Pool", "Barefoot Luxury", "Observatory"],
  },
  {
    id: "static-5",
    title: "Amanbagh Retreat",
    location: "Alwar, Rajasthan, India",
    country: "India",
    description:
      "A modern oasis carved out of pink sandstone, surrounded by mature palm groves and ancient ruined temples near Sariska National Park.",
    image:
      "https://www.aman.com/sites/default/files/2023-01/Amanbagh%2C%20India%20-%20Main%20Building%2C%20Pool%20View-3.jpg",
    href: "https://www.aman.com/resorts/amanbagh",
    category: "HERITAGE & PALACE",
    luxuryCategory: "HERITAGE & PALACE",
    hotelType: "Mughal Luxury Resort",
    isNational: true,
    isInternational: false,
    rating: 4.88,
    price: "₹62,000",
    amenities: ["Tiger Safaris", "Sandstone Pool Suites", "Heritage Walks"],
  },
  {
    id: "static-6",
    title: "The Leela Palace Kovalam",
    location: "Kovalam, Kerala, India",
    country: "India",
    description:
      "Perched high on a clifftop overlooking the Arabian Sea, blending authentic Malabar coastal luxury with world-class beach access.",
    image: "/Img/Intro_1035x600_5.webp",
    href: "https://www.theleela.com/the-leela-kovalam-a-raviz-hotel",
    category: "BEACH & ISLAND",
    luxuryCategory: "BEACH & ISLAND",
    hotelType: "Coastal Beach Resort",
    isNational: true,
    isInternational: false,
    rating: 4.9,
    price: "₹38,000",
    amenities: ["Cliff-Top Infinity Pool", "Ayurvedic Treatments", "Beach Club"],
  },
];

function isResortInIndia(country?: string, location?: string): boolean {
  const c = (country || "").trim().toLowerCase();
  const loc = (location || "").trim().toLowerCase();

  if (c === "india" || loc.includes("india")) return true;

  const indianKeywords = [
    "rajasthan", "kerala", "uttarakhand", "uttar pradesh", "delhi", "new delhi",
    "maharashtra", "karnataka", "tamil nadu", "telangana", "goa", "gujarat",
    "madhya pradesh", "himachal pradesh", "jammu", "kashmir", "chandigarh",
    "udaipur", "jaipur", "jodhpur", "agra", "ranthambore", "rishikesh",
    "mumbai", "bengaluru", "chennai", "hyderabad", "varanasi", "kovalam",
    "kumarakom", "alwar", "jaisalmer", "jawai", "kabini", "coorg", "hampi",
    "shimla", "dehradun", "kumaon", "gulmarg", "gir", "bandhavgarh"
  ];

  return indianKeywords.some((k) => c.includes(k) || loc.includes(k));
}

const VALID_THEME_CATEGORIES = [
  "HERITAGE & PALACE",
  "BEACH & ISLAND",
  "MOUNTAIN & WELLNESS",
  "WILDLIFE & SAFARI",
  "LUXURY CITY HOTELS",
  "BOUTIQUE & EXPERIENTIAL",
];

function determineResortCategory(hotel: any, loc: string): string {
  const lux = (hotel.luxury_category || hotel.category || "").trim().toUpperCase();
  if (VALID_THEME_CATEGORIES.includes(lux)) {
    return lux;
  }

  if (lux.includes("ISLAND") || lux.includes("BEACH") || lux.includes("PRIVATE ISLAND")) {
    return "BEACH & ISLAND";
  }
  if (lux.includes("PALACE") || lux.includes("HERITAGE") || lux.includes("CULTURAL")) {
    return "HERITAGE & PALACE";
  }
  if (lux.includes("CITY") || lux.includes("ICONIC CITY")) {
    return "LUXURY CITY HOTELS";
  }
  if (lux.includes("WILDERNESS") || lux.includes("SAFARI") || lux.includes("NATURE") || lux.includes("JUNGLE")) {
    return "WILDLIFE & SAFARI";
  }
  if (lux.includes("WELLNESS") || lux.includes("ALPINE") || lux.includes("SKI") || lux.includes("MOUNTAIN")) {
    return "MOUNTAIN & WELLNESS";
  }
  if (lux.includes("ULTRA LUXURY") || lux.includes("BESPOKE") || lux.includes("BOUTIQUE")) {
    return "BOUTIQUE & EXPERIENTIAL";
  }

  const type = (hotel.hotel_type || "").toLowerCase();
  const name = (hotel.name || hotel.title || "").toLowerCase();
  const city = (hotel.city || loc || "").toLowerCase();

  // 1. Beach & Island
  if (
    type.includes("beach") ||
    type.includes("coastal") ||
    type.includes("backwater") ||
    type.includes("island") ||
    city.includes("goa") ||
    city.includes("kovalam") ||
    city.includes("kumarakom") ||
    city.includes("cuelim") ||
    city.includes("maldives") ||
    city.includes("bora bora") ||
    city.includes("phuket") ||
    city.includes("los cabos") ||
    city.includes("riviera maya") ||
    name.includes("maldives") ||
    name.includes("soneva")
  ) {
    return "BEACH & ISLAND";
  }

  // 2. Wildlife & Safari
  if (
    type.includes("tented camp") ||
    type.includes("safari") ||
    type.includes("jungle") ||
    type.includes("wilderness") ||
    type.includes("lodge") ||
    name.includes("vanyavilas") ||
    name.includes("jawai") ||
    name.includes("kabini") ||
    name.includes("gir") ||
    name.includes("bandhavgarh") ||
    name.includes("singita") ||
    city.includes("ranthambore") ||
    city.includes("gir") ||
    city.includes("kruger") ||
    city.includes("sabi sand")
  ) {
    return "WILDLIFE & SAFARI";
  }

  // 3. Mountain & Wellness
  if (
    type.includes("wellness") ||
    type.includes("mountain") ||
    type.includes("ski") ||
    type.includes("plantation") ||
    name.includes("ananda") ||
    name.includes("khyber") ||
    name.includes("tamara") ||
    name.includes("kumaon") ||
    name.includes("chedi") ||
    name.includes("badrutt") ||
    city.includes("rishikesh") ||
    city.includes("dehradun") ||
    city.includes("shimla") ||
    city.includes("kumaon") ||
    city.includes("gulmarg") ||
    city.includes("coorg") ||
    city.includes("andermatt") ||
    city.includes("st. moritz")
  ) {
    return "MOUNTAIN & WELLNESS";
  }

  // 4. Heritage & Palace
  if (
    type.includes("palace") ||
    type.includes("fort") ||
    type.includes("haveli") ||
    type.includes("heritage") ||
    type.includes("fortress") ||
    name.includes("palace") ||
    name.includes("fort") ||
    name.includes("haveli") ||
    name.includes("udaivilas") ||
    name.includes("amarvilas") ||
    name.includes("rajvilas") ||
    name.includes("samode") ||
    name.includes("devigarh") ||
    name.includes("maurya") ||
    name.includes("suryagarh") ||
    name.includes("mansour") ||
    name.includes("sacher") ||
    name.includes("savoy") ||
    name.includes("cipriani") ||
    name.includes("monasterio") ||
    name.includes("angkor") ||
    name.includes("amangalla") ||
    city.includes("udaipur") ||
    city.includes("jaipur") ||
    city.includes("jodhpur") ||
    city.includes("jaisalmer") ||
    city.includes("agra") ||
    city.includes("alwar") ||
    city.includes("marrakech") ||
    city.includes("vienna") ||
    city.includes("venice") ||
    city.includes("cusco") ||
    city.includes("galle") ||
    city.includes("siem reap")
  ) {
    return "HERITAGE & PALACE";
  }

  // 5. Luxury City Hotels
  if (
    type.includes("city") ||
    type.includes("urban") ||
    type.includes("business") ||
    type.includes("high-rise") ||
    type.includes("contemporary") ||
    city.includes("mumbai") ||
    city.includes("new delhi") ||
    city.includes("bengaluru") ||
    city.includes("chennai") ||
    city.includes("hyderabad") ||
    city.includes("chandigarh") ||
    city.includes("hong kong") ||
    city.includes("new york") ||
    city.includes("paris") ||
    city.includes("singapore") ||
    city.includes("tokyo") ||
    city.includes("dubai") ||
    city.includes("london") ||
    city.includes("bangkok") ||
    city.includes("rome") ||
    city.includes("sydney")
  ) {
    return "LUXURY CITY HOTELS";
  }

  // 6. Boutique & Experiential
  return "BOUTIQUE & EXPERIENTIAL";
}

export default function ResortSec({ initialCategory = "ALL RESORTS" }: { initialCategory?: string }) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [resortsList, setResortsList] = useState<any[]>(LUXURY_RESORTS);

  React.useEffect(() => {
    async function fetchHotels() {
      try {
        const res = await fetch("/api/v1/hotels?limit=250&sort=rank");
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const dbHotels = json.data.map((hotel: any, idx: number) => {
            const loc = [hotel.city, hotel.state_province, hotel.country].filter(Boolean).join(", ");
            const primaryImg =
              hotel.images?.find((img: any) => img.is_primary)?.image_url ||
              hotel.images?.[0]?.image_url ||
              "/Img/soneva-fushi.jpg";

            let amenitiesArr: string[] = ["Royal Butler Service", "Private Chauffeur"];
            if (hotel.amenities) {
              if (typeof hotel.amenities === "string") {
                try {
                  amenitiesArr = hotel.amenities.startsWith("[")
                    ? JSON.parse(hotel.amenities)
                    : hotel.amenities.split(",").map((s: string) => s.trim()).filter(Boolean);
                } catch (e) {
                  amenitiesArr = hotel.amenities.split(",").map((s: string) => s.trim()).filter(Boolean);
                }
              } else if (Array.isArray(hotel.amenities)) {
                amenitiesArr = hotel.amenities;
              }
            }

            const isNational = hotel.is_india_top_50 === true || (hotel.is_international_top_50 !== true && isResortInIndia(hotel.country, loc));
            const isInternational = hotel.is_international_top_50 === true || !isNational;

            const displayCat = determineResortCategory(hotel, loc);

            // Clean price formatting
            let priceDisplay = "Member Rates";
            if (hotel.why_we_recommend && typeof hotel.why_we_recommend === "string") {
              if (hotel.why_we_recommend.length < 20 && (hotel.why_we_recommend.includes("₹") || hotel.why_we_recommend.includes("$") || /\d/.test(hotel.why_we_recommend))) {
                priceDisplay = hotel.why_we_recommend;
              }
            }

            return {
              id: hotel.id || `db-${idx}`,
              title: hotel.name,
              location: loc || "Luxury Destination",
              country: hotel.country || "Global Sanctuary",
              description: hotel.short_description || hotel.description || "Handpicked luxury sanctuary.",
              image: primaryImg,
              href: hotel.official_website || hotel.booking_url || `/resorts/${hotel.slug}`,
              category: displayCat,
              luxuryCategory: hotel.luxury_category || "",
              hotelType: hotel.hotel_type || "",
              isNational,
              isInternational,
              isIndiaTop50: hotel.is_india_top_50,
              isInternationalTop50: hotel.is_international_top_50,
              rank: hotel.top_hotel_rank || null,
              displayOrder: hotel.display_order || hotel.top_hotel_rank || idx + 1,
              rating: 4.9,
              price: priceDisplay,
              amenities: amenitiesArr.slice(0, 3),
            };
          });

          const dbTitles = new Set(dbHotels.map((h: any) => h.title.toLowerCase().trim()));
          const remainingStatic = LUXURY_RESORTS.filter(
            (r) => !dbTitles.has(r.title.toLowerCase().trim())
          );
          setResortsList([...dbHotels, ...remainingStatic]);
        }
      } catch (err) {
        console.error("Failed to fetch public hotels:", err);
      }
    }
    fetchHotels();
  }, []);

  // Filtering Logic
  const filteredResorts = resortsList.filter((resort) => {
    let matchesCategory = true;
    if (activeCategory !== "ALL RESORTS") {
      const isNational = resort.isNational ?? isResortInIndia(resort.country, resort.location);
      const isInternational = resort.isInternational ?? !isNational;

      if (activeCategory === "NATIONAL") {
        matchesCategory = isNational;
      } else if (activeCategory === "INTERNATIONAL") {
        matchesCategory = isInternational;
      } else {
        matchesCategory = resort.category === activeCategory;
      }
    }

    let matchesSearch = true;
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      matchesSearch =
        resort.title.toLowerCase().includes(query) ||
        resort.location.toLowerCase().includes(query) ||
        resort.description.toLowerCase().includes(query) ||
        (resort.amenities && resort.amenities.some((a: string) => a.toLowerCase().includes(query)));
    }

    return matchesCategory && matchesSearch;
  });

  // Sort by rank according to category
  filteredResorts.sort((a, b) => {
    if (activeCategory === "INTERNATIONAL") {
      return (a.rank || 999) - (b.rank || 999);
    }
    if (activeCategory === "NATIONAL") {
      return (a.rank || 999) - (b.rank || 999);
    }
    return (a.displayOrder || 999) - (b.displayOrder || 999);
  });

  return (
    <section className="bg-[#F8F9FA] text-neutral-900 py-16 md:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden w-full select-none">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header Matching Homepage Editorial Aesthetic */}
        <div className="text-center mb-14 flex flex-col items-center">
          <div className="text-sm tracking-[0.4em] text-black uppercase font-light mb-6">
            EXCLUSIVE RETREAT PORTFOLIO
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif tracking-tight text-black max-w-6xl mx-auto leading-[1.1]">
            Exceptional Luxury Resorts &amp; Sanctuaries
          </h2>
          <p className="text-xs md:text-sm max-w-xl leading-relaxed text-neutral-600 mt-6 font-light tracking-wide">
            Handpicked sanctuaries reflecting the very soul of their destination, from royal palaces to private island oases.
          </p>
        </div>

        {/* 1. CATEGORY NAVIGATION FILTER TABS */}
        <div className="flex flex-wrap gap-2.5 sm:gap-3 items-center justify-center mb-10 max-w-5xl mx-auto">
          {CATEGORIES.map((cat) => {
            const isSelected = cat === activeCategory;
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setSearchQuery("");
                }}
                className={`text-[10px] sm:text-xs tracking-[0.2em] font-medium uppercase px-5 sm:px-6 py-2.5 rounded-sm border transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? "bg-[#B38E46] text-white border-[#B38E46] shadow-sm"
                    : "bg-white text-[#B38E46] border-[#B38E46] hover:bg-[#B38E46] hover:text-white"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* 2. SEARCH BAR */}
        <div className="max-w-lg mx-auto mb-16 relative">
          <div className="relative flex items-center bg-white border border-[#B38E46] rounded-sm px-6 py-3 transition-all duration-300 shadow-2xs">
            <Search className="w-4 h-4 text-[#B38E46] mr-3 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search resorts by name, location, or experience..."
              className="bg-transparent text-xs sm:text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none w-full font-light tracking-wide"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="p-1 hover:bg-neutral-100 rounded-full transition-colors shrink-0 cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5 text-neutral-600" />
              </button>
            )}
          </div>
        </div>

        {/* 3. RESORTS GRID CONTAINER (Homepage Architectural Layout) */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
        >
          <AnimatePresence mode="popLayout">
            {filteredResorts.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="col-span-full py-20 text-center flex flex-col items-center justify-center text-black"
              >
                <Search className="w-10 h-10 text-[#B38E46] mb-4 opacity-60" />
                <p className="text-2xl font-serif mb-2">No resorts match your search</p>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto leading-relaxed font-light">
                  We couldn&apos;t find any properties matching &ldquo;{searchQuery}&rdquo;. Try checking for typos or clear your search filter.
                </p>
              </motion.div>
            )}

            {filteredResorts.map((resort) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.98, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97, y: 10 }}
                transition={{ duration: 0.4 }}
                key={resort.id}
                className="group relative h-[480px] w-full bg-black border-0 rounded-none overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer"
              >
                {/* Full Bleed Background Image stretched full card */}
                <img
                  src={resort.image}
                  alt={resort.title}
                  className="object-cover w-full h-full absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Gradient Overlay only behind bottom text (Top 65% 100% clear without black shade) */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.65) 35%, rgba(0,0,0,0) 65%)",
                  }}
                />

                {/* Category Pill Tag & Rank/Rating Tag at Top */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="bg-black/60 backdrop-blur-md text-white text-[10px] tracking-[0.2em] uppercase font-light px-3 py-1.5 border border-white/20">
                      {resort.category.replace("&", "•")}
                    </span>
                    {resort.rank && (
                      <span className="bg-[#B38E46] text-white text-[10px] font-medium tracking-wider px-2.5 py-1.5 shadow-sm">
                        #{resort.rank} {resort.isInternational ? "INTL" : "INDIA"}
                      </span>
                    )}
                  </div>

                  <div className="bg-black/60 backdrop-blur-md text-white text-xs font-light tracking-wider px-3 py-1 border border-white/20 flex items-center gap-1.5 shrink-0">
                    <Star className="w-3.5 h-3.5 fill-[#E5C158] text-[#E5C158]" />
                    <span>{resort.rating}</span>
                  </div>
                </div>

                {/* Content Layer Overlayed on Image */}
                <div className="absolute inset-0 p-6 sm:p-7 flex flex-col justify-end text-white z-10">
                  {/* Location Badge */}
                  <div className="text-[10px] text-white/80 uppercase tracking-[0.25em] font-medium mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#B38E46] shrink-0" />
                    <span>{resort.location}</span>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-xl sm:text-2xl font-medium text-white leading-snug mb-2"
                    style={{ color: "#ffffff", fontFamily: "var(--work-font), sans-serif" }}
                  >
                    {resort.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="leading-relaxed line-clamp-3 font-light mb-4"
                    style={{ color: "rgba(255, 255, 255, 0.88)", fontSize: "12.5px" }}
                  >
                    {resort.description}
                  </p>

                  {/* Amenities Checklist Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {resort.amenities.map((amenity: string, aIdx: number) => (
                      <span
                        key={aIdx}
                        className="inline-flex items-center gap-1 text-[9px] tracking-wider uppercase font-light text-white/90 bg-black/40 backdrop-blur-xs px-2.5 py-0.5 border border-white/15"
                      >
                        <Sparkles className="w-2.5 h-2.5 text-[#B38E46]" />
                        {amenity}
                      </span>
                    ))}
                  </div>

                  {/* Footer Price & EXPLORE Link */}
                  <div className="pt-4 border-t border-white/20 flex items-center justify-between">
                    <div className="text-[11px] text-white/80 font-medium uppercase tracking-wider">
                      <span>From {resort.price}</span>
                      <span className="text-white/60 font-light text-[10px]"> / night</span>
                    </div>

                    <Link
                      href={resort.href || "/contact"}
                      target={resort.href ? "_blank" : undefined}
                      rel={resort.href ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-white hover:text-[#B38E46] transition-colors duration-200 cursor-pointer uppercase tracking-widest"
                    >
                      <span>EXPLORE</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Indigo Vertical Line Accent at Bottom (Matching Brands Page / Homepage) */}
        <div className="flex justify-center mt-16 md:mt-20">
          <div className="w-[1.5px] h-32 md:h-48 bg-[rgb(25,25,112)]"></div>
        </div>
      </div>
    </section>
  );
}
