"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export type BrandItem = {
  id: string;
  name: string;
  subtext?: string;
  logoImg?: string;
  website: string;
};

export type RegionCategory = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  brands: BrandItem[];
};

export const LUXURY_REGIONS: RegionCategory[] = [
  {
    id: "india",
    number: "01",
    title: "INDIA",
    subtitle: "INDIA'S FINEST LUXURY BRANDS",
    brands: [
      {
        id: "taj",
        name: "TAJ",
        logoImg: "indian hotels/taj.jpg",
        website: "https://www.tajhotels.com/",
      },
      {
        id: "oberoi",
        name: "Oberoi",
        subtext: "HOTELS & RESORTS",
        logoImg: "indian hotels/oberoi.jpg",
        website: "https://www.oberoihotels.com/",
      },
      {
        id: "the-leela",
        name: "THE LEELA",
        subtext: "PALACES HOTELS RESORTS",
        logoImg: "indian hotels/the leela.jpg",
        website: "https://www.theleela.com/",
      },
      {
        id: "raffles-india",
        name: "RAFFLES",
        subtext: "INDIA",
        logoImg: "indian hotels/raffels.jpg",
        website: "https://www.raffles.com/",
      },
      {
        id: "aman-india",
        name: "ĀMAN",
        subtext: "INDIA",
        logoImg: "indian hotels/Aman_Logo.jpg",
        website: "https://www.aman.com/",
      },
      {
        id: "sujan",
        name: "SUJÁN",
        subtext: "LUXURY",
        logoImg: "indian hotels/sujan-logo-main.gif",
        website: "https://thesujanlife.com/",
      },
      {
        id: "antara",
        name: "ANTARA",
        subtext: "CRUISES",
        logoImg: "indian hotels/antara.avif",
        website: "https://www.antaracruises.com/",
      },
      {
        id: "itc-hotels",
        name: "ITC HOTELS",
        subtext: "RESPONSIBLE LUXURY",
        logoImg: "indian hotels/ITC_Hotels_logo.svg.webp",
        website: "https://www.itchotels.com/",
      },
      {
        id: "oberoi-beach",
        name: "The Oberoi",
        subtext: "BEACH RESORTS",
        logoImg: "indian hotels/Gemini_Generated_Image_qsqmmqqsqmmqqsqm.png",
        website: "https://www.oberoihotels.com/",
      },
      {
        id: "ihcl-select",
        name: "IHCL",
        subtext: "SELECT",
        logoImg: "indian hotels/ihcl.jpg",
        website: "https://www.ihcltata.com/",
      },
      {
        id: "cgh-earth",
        name: "CGH EARTH",
        subtext: "EXPERIENCES",
        logoImg: "indian hotels/cgh.jpg",
        website: "https://www.cghearth.com/",
      },
      {
        id: "evolve-back",
        name: "EVOLVE BACK",
        logoImg: "indian hotels/evolve back.png",
        website: "https://www.evolveback.com/",
      },
      {
        id: "wildflower-hall",
        name: "WILDFLOWER HALL",
        subtext: "SHIMLA",
        logoImg: "indian hotels/Wildflower-Hall.png",
        website: "https://www.oberoihotels.com/hotels-in-shimla-wfh/",
      },
      {
        id: "postcard-hotels",
        name: "THE POSTCARD",
        subtext: "HOTELS",
        logoImg: "indian hotels/postcardLogo.jpg",
        website: "https://www.postcardresorts.com/",
      },
      {
        id: "taj-exotica",
        name: "TAJ EXOTICA",
        subtext: "RESORT & SPA",
        logoImg: "indian hotels/Gemini_Generated_Image_vdkti0vdkti0vdkt.png",
        website: "https://www.tajhotels.com/",
      },
    ],
  },
  {
    id: "asia",
    number: "02",
    title: "ASIA",
    subtitle: "ASIA'S FINEST LUXURY BRANDS",
    brands: [
      {
        id: "aman",
        name: "ĀMAN",
        subtext: "HOTELS AND RESORTS",
        logoImg: "asian hotels/Aman_Logo.jpg",
        website: "https://www.aman.com/",
      },
      {
        id: "capella",
        name: "CAPELLA",
        subtext: "HOTELS AND RESORTS",
        logoImg: "asian hotels/capela.png",
        website: "https://capellahotels.com/",
      },
      {
        id: "rosewood",
        name: "ROSEWOOD",
        subtext: "HOTELS & RESORTS",
        logoImg: "asian hotels/Rosewood_hotel_resorts_logo.jpg",
        website: "https://www.rosewoodhotels.com/",
      },
      {
        id: "bvlgari",
        name: "BVLGARI",
        subtext: "HOTELS & RESORTS",
        logoImg: "asian hotels/bvlgari-hotels-resorts.png",
        website: "https://www.bulgarihotels.com/",
      },
      {
        id: "six-senses",
        name: "SIX SENSES",
        subtext: "HOTELS RESORTS SPAS",
        logoImg: "asian hotels/six senses.jpg",
        website: "https://www.sixsenses.com/",
      },
      {
        id: "shangri-la",
        name: "SHANGRI-LA",
        subtext: "HOTELS AND RESORTS",
        logoImg: "asian hotels/shangri-la-hotels-vector-logo.png",
        website: "https://www.shangri-la.com/",
      },
      {
        id: "park-hyatt-asia",
        name: "PARK HYATT™",
        logoImg: "asian hotels/park hayat.jpg",
        website: "https://www.hyatt.com/brands/park-hyatt",
      },
      {
        id: "st-regis-asia",
        name: "ST REGIS",
        subtext: "HOTELS & RESORTS",
        logoImg: "asian hotels/st reggis.png",
        website: "https://st-regis.marriott.com/",
      },
      {
        id: "ritz-carlton-asia",
        name: "THE RITZ-CARLTON",
        subtext: "HOTELS & RESORTS",
        logoImg: "asian hotels/kisspng-ritz.jpg",
        website: "https://www.ritzcarlton.com/",
      },
      {
        id: "banyan-tree",
        name: "BANYAN TREE",
        subtext: "HOTELS & RESORTS",
        logoImg: "asian hotels/banyan tree.png",
        website: "https://www.banyantree.com/",
      },
      {
        id: "como",
        name: "COMO",
        subtext: "HOTELS AND RESORTS",
        logoImg: "asian hotels/como.png",
        website: "https://www.comohotels.com/",
      },
      {
        id: "alila",
        name: "Alila.",
        subtext: "HOTELS AND RESORTS",
        logoImg: "asian hotels/alila.png",
        website: "https://www.alilahotels.com/",
      },
      {
        id: "w-hotels-asia",
        name: "W HOTELS",
        logoImg: "asian hotels/28.png",
        website: "https://w-hotels.marriott.com/",
      },
      {
        id: "andaz",
        name: "Andaz",
        subtext: "HOTELS",
        logoImg: "asian hotels/andaz.png",
        website: "https://www.hyatt.com/brands/andaz",
      },
      {
        id: "one-hotels-asia",
        name: "1 HOTELS",
        logoImg: "asian hotels/1 hotels.jpg",
        website: "https://www.1hotels.com/",
      },
      {
        id: "soneva",
        name: "SONEVA",
        subtext: "HOTELS & RESORTS",
        logoImg: "asian hotels/soneva.webp",
        website: "https://soneva.com/",
      },
    ],
  },
  {
    id: "worldwide",
    number: "03",
    title: "WORLDWIDE",
    subtitle: "THE WORLD'S FINEST LUXURY BRANDS",
    brands: [
      {
        id: "four-seasons",
        name: "FOUR SEASONS",
        subtext: "HOTELS AND RESORTS",
        logoImg: "Worldwide/four-seasons-hotels-and-resorts-logo.png",
        website: "https://www.fourseasons.com/",
      },
      {
        id: "mandarin-oriental",
        name: "MANDARIN ORIENTAL",
        subtext: "THE HOTEL GROUP",
        logoImg: "Worldwide/Mandarin_Oriental_Hotel_Group-Logo.wine.png",
        website: "https://www.mandarinoriental.com/",
      },
      {
        id: "peninsula",
        name: "THE PENINSULA",
        subtext: "HOTELS",
        logoImg: "Worldwide/The-Peninsula-Logo.png",
        website: "https://www.peninsula.com/",
      },
      {
        id: "one-only",
        name: "One&Only",
        subtext: "RESORTS",
        logoImg: "Worldwide/one and only.jpg",
        website: "https://www.oneandonlyresorts.com/",
      },
      {
        id: "cheval-blanc",
        name: "Cheval Blanc",
        logoImg: "Worldwide/cheval blanc.jpg",
        website: "https://www.chevalblanc.com/",
      },
      {
        id: "belmond",
        name: "BELMOND",
        logoImg: "Worldwide/belmond.png",
        website: "https://www.belmond.com/",
      },
      {
        id: "fairmont",
        name: "Fairmont",
        subtext: "HOTELS & RESORTS",
        logoImg: "Worldwide/Fairmont_Logo.svg.webp",
        website: "https://www.fairmont.com/",
      },
      {
        id: "raffles-world",
        name: "RAFFLES",
        subtext: "HOTELS & RESORTS",
        logoImg: "Worldwide/Raffles_Hotels_and_Resorts_logo.svg.webp",
        website: "https://www.raffles.com/",
      },
      {
        id: "waldorf-astoria",
        name: "WALDORF ASTORIA",
        subtext: "HOTELS & RESORTS",
        logoImg: "Worldwide/Waldorf-Logo-Black_HR-1-1.webp",
        website: "https://www.hilton.com/en/waldorf-astoria/",
      },
      {
        id: "park-hyatt-world",
        name: "PARK HYATT™",
        logoImg: "Worldwide/park-hyatt-logo.originalimage.png",
        website: "https://www.hyatt.com/brands/park-hyatt",
      },
      {
        id: "conrad",
        name: "CONRAD",
        subtext: "HOTELS & RESORTS",
        logoImg: "Worldwide/Conrad_hotels_and_Resorts.jpg",
        website: "https://www.hilton.com/en/conrad/",
      },
      {
        id: "one-hotels-world",
        name: "1 HOTELS",
        logoImg: "Worldwide/1 hotels.jpg",
        website: "https://www.1hotels.com/",
      },
      {
        id: "edition-world",
        name: "EDITION",
        subtext: "HOTELS",
        logoImg: "Worldwide/10.png",
        website: "https://www.editionhotels.com/",
      },
      {
        id: "sls",
        name: "SLS",
        subtext: "HOTELS",
        logoImg: "Worldwide/sls hotels.webp",
        website: "https://www.slshotels.com/",
      },
      {
        id: "mondrian",
        name: "MONDRIAN",
        subtext: "HOTELS",
        logoImg: "Worldwide/mondrian.png",
        website: "https://book.ennismore.com/hotels/mondrian",
      },
      {
        id: "gleneagles",
        name: "GLENEAGLES",
        subtext: "TOWN & COUNTRY ESTATE",
        logoImg: "Worldwide/glaneadles.jpg",
        website: "https://gleneagles.com/",
      },
    ],
  },
];

const BrandCard = ({ brand, regionId }: { brand: BrandItem; regionId?: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.a
      href={brand.website}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative bg-white rounded-none border border-neutral-200/90 shadow-2xs hover:shadow-lg hover:border-[#B38E46] transition-all duration-300 flex flex-col items-center justify-center p-4 min-h-[110px] text-center overflow-hidden"
    >
      {brand.logoImg ? (
        <div className="relative w-full h-14 flex items-center justify-center">
          <Image
            src={`/Img/brands/${brand.logoImg}`}
            alt={`${brand.name} Logo`}
            fill
            unoptimized
            className="object-contain transition-all duration-300"
            style={{
              filter: brand.id === "capella" 
                ? (isHovered ? "none" : "grayscale(100%) opacity(75%)")
                : brand.id.includes("w-hotels")
                ? (isHovered ? "brightness(1.5) contrast(3) grayscale(100%)" : "grayscale(100%) opacity(75%) brightness(1.5) contrast(3)")
                : (isHovered ? "contrast(1.2)" : "grayscale(100%) opacity(75%) contrast(1.2)"),
              mixBlendMode: brand.id === "capella" ? "normal" : "multiply",
              transform: (regionId === "asia" && ["rosewood", "bvlgari", "shangri-la"].includes(brand.id))
                ? `scale(${isHovered ? 1.85 : 1.8})`
                : (regionId === "asia" && brand.id !== "como" && brand.id !== "w-hotels-asia")
                ? `scale(${isHovered ? 1.4 : 1.35})`
                : (regionId === "worldwide" && ["four-seasons", "mandarin-oriental", "peninsula", "cheval-blanc", "belmond", "waldorf-astoria", "park-hyatt-world", "sls", "mondrian", "gleneagles"].includes(brand.id))
                ? `scale(${isHovered ? 1.85 : 1.8})`
                : (regionId === "worldwide" && !["one-only", "fairmont", "raffles-world", "conrad", "edition-world"].includes(brand.id))
                ? `scale(${isHovered ? 1.45 : 1.4})`
                : `scale(${isHovered ? 1.05 : 1})`,
            }}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
          />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <span
            className="text-lg sm:text-xl font-serif tracking-widest text-neutral-900 group-hover:text-[#B38E46] transition-colors"
            style={{ fontFamily: "var(--work-font), sans-serif" }}
          >
            {brand.name}
          </span>
          {brand.subtext && (
            <span className="text-[9px] sm:text-[10px] font-light tracking-[0.2em] text-neutral-500 uppercase mt-0.5">
              {brand.subtext}
            </span>
          )}
        </div>
      )}
    </motion.a>
  );
};

export default function Brandsec() {
  return (
    <section className="min-h-screen bg-[#F8F9FA] text-neutral-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Collection Section Title Header matching Image 2 */}
        <div className="text-center mb-16 flex flex-col items-center">
          <div className="text-sm tracking-[0.4em] text-black uppercase font-light mb-6">
            EXCLUSIVE HOSPITALITY PORTFOLIO
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif tracking-tight text-black max-w-6xl mx-auto leading-[1.1]">
            The World&apos;s Most Exceptional Luxury Hospitality Collection
          </h2>
        </div>

        {/* 3 Regional Hospitality Charts with Horizontal Blue Header (matching request) */}
        <div className="space-y-12">
          {LUXURY_REGIONS.map((region) => (
            <motion.div
              key={region.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-none border border-neutral-200/90 shadow-sm overflow-hidden"
            >
              {/* Horizontal Header Banner (using exact review card color rgb(25,25,112)) */}
              <div className="bg-[rgb(25,25,112)] text-white py-4 sm:py-5 px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-[#B38E46]/30">
                {/* Left Side: Number & Region Name */}
                <div className="flex items-center gap-4">
                  <span
                    className="text-2xl sm:text-3xl font-light text-[#B38E46] tracking-[0.2em]"
                    style={{ fontFamily: "var(--work-font), sans-serif" }}
                  >
                    {region.number}
                  </span>
                  <span className="h-5 w-[1px] bg-[#B38E46]/40 hidden sm:block"></span>
                  <h3
                    className="text-lg sm:text-xl text-white uppercase font-light tracking-[0.35em]"
                    style={{ fontFamily: "var(--work-font), sans-serif" }}
                  >
                    {region.title}
                  </h3>
                </div>

                {/* Right Side: Subtitle Tagline */}
                <div
                  className="text-xs sm:text-sm tracking-[0.35em] font-light text-[#B38E46] uppercase text-center sm:text-right"
                  style={{ fontFamily: "var(--work-font), sans-serif" }}
                >
                  {region.subtitle}
                </div>
              </div>

              {/* Brand Grid Container */}
              <div className="p-4 sm:p-6 bg-[#FAFAFA]">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                  {region.brands.map((brand) => (
                    <BrandCard key={brand.id} brand={brand} regionId={region.id} />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Indigo Vertical Line below last chart */}
        <div className="flex justify-center mt-12 md:mt-16 mb-4">
          <div className="w-[1.5px] h-32 md:h-48 bg-[rgb(25,25,112)]"></div>
        </div>
      </div>
    </section>
  );
}
