"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const leftImages = [
  { src: "/Img/box/antonio-araujo-BNBxBNWupH0-unsplash.jpg", alt: "Gallery Image" },
  { src: "/Img/box/bao-menglong-ZHw4bVH97t0-unsplash.jpg", alt: "Gallery Image" },
  { src: "/Img/box/chesley-mccarty-IP8_8izFE4k-unsplash.jpg", alt: "Gallery Image" },
  { src: "/Img/box/christian-ventura-lWTm4EBGaGQ-unsplash.jpg", alt: "Gallery Image" },
  { src: "/Img/box/clay-banks-xvnPgm6lnAs-unsplash.jpg", alt: "Gallery Image" },
  { src: "/Img/box/dad-hotel-Y-bJWAjPzsY-unsplash.jpg", alt: "Gallery Image" },
  { src: "/Img/box/dad-hotel-zjDVpzqFIzc-unsplash.jpg", alt: "Gallery Image" },
  { src: "/Img/box/despina-galani-dmBzB_RF_nk-unsplash.jpg", alt: "Gallery Image" },
  { src: "/Img/box/dynamic-hong-kong-km5I2E-mJbo-unsplash.jpg", alt: "Gallery Image" },
  { src: "/Img/box/grace-anne-bobadilla-_PU-Jr2SUYc-unsplash.jpg", alt: "Gallery Image" },
  { src: "/Img/box/hans-sbg3FuIRQcs-unsplash.jpg", alt: "Gallery Image" },
  { src: "/Img/box/huy-phan-IZ8akRW_5BY-unsplash.jpg", alt: "Gallery Image" },
];

const rightImages = [
  { src: "/Img/box/jennifer-latuperisa-andresen-Cj7a21nHLyo-unsplash.jpg", alt: "Gallery Image" },
  { src: "/Img/box/khatshoot-uzojmJr2Brc-unsplash.jpg", alt: "Gallery Image" },
  { src: "/Img/box/max-61Cp_LP7bTU-unsplash.jpg", alt: "Gallery Image" },
  { src: "/Img/box/natacha-missakian-3gdMevwmb1U-unsplash.jpg", alt: "Gallery Image" },
  { src: "/Img/box/nerissa-j-5YaD_J20DWY-unsplash.jpg", alt: "Gallery Image" },
  { src: "/Img/box/nusrat-ali-9QhyuOeu3Ik-unsplash.jpg", alt: "Gallery Image" },
  { src: "/Img/box/olena-bohovyk-qv3VdC9vE_k-unsplash.jpg", alt: "Gallery Image" },
  { src: "/Img/box/reisetopia-aI6Su7Mu9Ro-unsplash.jpg", alt: "Gallery Image" },
  { src: "/Img/box/sergio-hernandez-trejo-cAAXqKf8uJw-unsplash.jpg", alt: "Gallery Image" },
  { src: "/Img/box/visualsofdana-T5pL6ciEn-I-unsplash.jpg", alt: "Gallery Image" },
  { src: "/Img/box/vivu-vietnam-rF8Ag1p8EYo-unsplash.jpg", alt: "Gallery Image" },
  { src: "/Img/box/vojtech-bruzek-Yrxr3bsPdS0-unsplash.jpg", alt: "Gallery Image" },
  { src: "/Img/box/yanhao-fang-zWLuDvEPbrM-unsplash.jpg", alt: "Gallery Image" },
];

export default function About() {
  return (
    <section className="bg-white text-black w-full overflow-hidden pt-16 lg:pt-20 pb-16 border-b border-neutral-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Main Editorial Content Block */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col justify-center items-center text-center pt-8 md:pt-16 pb-0 w-full"
        >
          {/* Micro-Header Tag */}
          <div className="text-sm tracking-[0.4em] text-black uppercase font-light mb-6">
            ABOUT THE LUXE YATRA WORLDWIDE TRAVEL
          </div>

          {/* Luxury Serif Headline matching other section headers */}
          <h2 className="text-4xl md:text-8xl font-serif tracking-tight text-black mb-4">
            Travel Beyond Ordinary
          </h2>
          <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-light text-black uppercase tracking-wider mb-6">
            DISCOVER A WORLD OF PRIVILEGES
          </p>

          {/* Small Golden Vertical Divider */}
          <div className="flex justify-center my-6">
            <div className="w-[1.5px] h-12 md:h-16 bg-[#B38E46]/80"></div>
          </div>

          {/* Multi-Paragraph Content Block */}
          <div className="space-y-6 md:space-y-8 text-black text-sm sm:text-base xl:text-lg leading-relaxed tracking-wide max-w-4xl w-full break-words">
            <p>
              A holiday is more than a destination. It is about exceptional stays,
              remarkable experiences and privileges designed around the way you love to travel.
            </p>

            <p>
              With The Luxe Yatra, members unlock a world of curated travel benefits,
              premium hospitality and memorable experiences across India and beyond.
            </p>

            <p className="font-semibold mt-8 text-xs sm:text-sm tracking-[0.2em] uppercase border-t border-black/10 pt-8 font-[Vera]">
              Travel beautifully. Stay exceptionally. Live the Luxe Yatra way.
            </p>


          </div>
        </motion.div>
      </div>
    </section>
  );
}

