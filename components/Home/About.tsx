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
    <section className="bg-white text-black min-h-fit md:min-h-screen w-full overflow-hidden flex items-center py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* TOP CINEMATIC PICTURE COLLAGE WITH DATA IN CENTER */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch h-auto md:h-[620px] lg:h-[680px]">
          {/* Left Vertical Marquee Slider Column */}
          <div className="hidden md:block md:col-span-3 h-full overflow-hidden relative rounded-3xl border border-neutral-100 bg-neutral-50 shadow-inner">
            {/* Top & Bottom Gradient Fades for Smooth Blend */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white via-white/80 to-transparent z-20" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent z-20" />

            <motion.div
              animate={{ y: ["0%", "-50%"] }}
              transition={{
                repeat: Infinity,
                duration: 25,
                ease: "linear",
              }}
              className="flex flex-col gap-4 p-3"
            >
              {[...leftImages, ...leftImages].map((img, idx) => (
                <div
                  key={idx}
                  className="relative h-60 w-full rounded-2xl overflow-hidden shadow-md border border-neutral-200/70 group shrink-0"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Main Editorial Center Content Block */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="col-span-1 md:col-span-6 flex flex-col justify-center items-center text-center p-6 md:p-10 rounded-3xl bg-white/80 backdrop-blur-md border border-neutral-200 shadow-xl z-10 h-auto md:h-full overflow-hidden md:overflow-y-auto"
          >
            {/* Micro-Header Tag */}
            <span className="text-[10px] md:text-sm font-[Vera] tracking-widest sm:tracking-[0.3em] text-neutral-500 uppercase mb-4 block break-words w-full">
              About The Luxe Yatra Worldwide Travel
            </span>

            {/* Luxury High-Contrast Headline */}
            <h2 className="text-2xl sm:text-4xl xl:text-5xl font-[Vera] tracking-normal text-black mb-6 leading-[1.25] max-w-lg break-words w-full">
              Travel Beyond Ordinary
              <span className="block text-xl sm:text-3xl xl:text-4xl text-neutral-700 font-normal mt-2">
                Discover a World of Privileges
              </span>
            </h2>

            {/* Multi-Paragraph Content Block */}
            <div className="space-y-4 md:space-y-5 text-neutral-700 font-light text-xs sm:text-sm xl:text-base leading-relaxed tracking-wide max-w-md w-full break-words">
              <p>
                A holiday is more than a destination. It is about exceptional stays,
                remarkable experiences and privileges designed around the way you love to travel.
              </p>

              <p>
                With The Luxe Yatra, members unlock a world of curated travel benefits,
                premium hospitality and memorable experiences across India and beyond.
              </p>

              <p className="font-semibold text-black/90 mt-5 text-xs sm:text-sm tracking-wider uppercase border-t border-black/10 pt-5 font-[Vera]">
                Travel beautifully. Stay exceptionally. Live the Luxe Yatra way.
              </p>
            </div>
          </motion.div>

          {/* Right Vertical Marquee Slider Column */}
          <div className="hidden md:block md:col-span-3 h-full overflow-hidden relative rounded-3xl border border-neutral-100 bg-neutral-50 shadow-inner">
            {/* Top & Bottom Gradient Fades for Smooth Blend */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white via-white/80 to-transparent z-20" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white via-white/80 to-transparent z-20" />

            <motion.div
              animate={{ y: ["-50%", "0%"] }}
              transition={{
                repeat: Infinity,
                duration: 25,
                ease: "linear",
              }}
              className="flex flex-col gap-4 p-3"
            >
              {[...rightImages, ...rightImages].map((img, idx) => (
                <div
                  key={idx}
                  className="relative h-60 w-full rounded-2xl overflow-hidden shadow-md border border-neutral-200/70 group shrink-0"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

