"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const leftImages = [
  {
    src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
    alt: "Beach sunrise experience",
  },
  {
    src: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=80",
    alt: "Serene lake boat travel",
  },
  {
    src: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=600&q=80",
    alt: "Maldives overwater villa",
  },
  {
    src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
    alt: "Luxury resort infinity pool",
  },
  {
    src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80",
    alt: "Tropical island coastline",
  },
];

const rightImages = [
  {
    src: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=600&q=80",
    alt: "Tropical travel coastline",
  },
  {
    src: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80",
    alt: "Santorini Greece view",
  },
  {
    src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
    alt: "Luxury hotel lounge",
  },
  {
    src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80",
    alt: "Overwater luxury bungalow",
  },
  {
    src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80",
    alt: "Boutique resort suite",
  },
];

export default function About() {
  return (
    <section className="bg-white text-black min-h-screen w-full overflow-hidden flex items-center py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* TOP CINEMATIC PICTURE COLLAGE WITH DATA IN CENTER */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch h-[550px] md:h-[620px] lg:h-[680px]">
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
            className="col-span-12 md:col-span-6 flex flex-col justify-center items-center text-center p-6 md:p-10 rounded-3xl bg-white/80 backdrop-blur-md border border-neutral-200 shadow-xl z-10 h-full overflow-y-auto"
          >
            {/* Micro-Header Tag */}
            <span className="text-[13px] md:text-sm font-[Vera] tracking-[0.3em] text-neutral-500 uppercase mb-4 block">
              About The Luxe Yatra Worldwide Travel
            </span>

            {/* Luxury High-Contrast Headline */}
            <h2 className="text-3xl sm:text-4xl xl:text-5xl font-[Vera] tracking-normal text-black mb-6 leading-[1.2] max-w-lg">
              We&apos;re Dedicated To Making Your Travel Simple &amp; Fun
            </h2>

            {/* Multi-Paragraph Content Block */}
            <div className="space-y-5 text-neutral-700 font-light text-sm xl:text-base leading-relaxed tracking-wide max-w-md">
              <p>
                A holiday is more than just sightseeing. It&apos;s about
                enjoying exclusive experiences, unique accommodations across
                different terrains, and unparalleled privileges. That&apos;s
                what being a The Luxe Yatra member is all about.
              </p>

              <p>
                We believe travel has a way of turning things around—bringing
                back inspiration and reminding us to appreciate the finer
                things. Let us inspire you to start living the life you were
                meant to live.
              </p>

              <p className="font-semibold text-black/90 mt-5 text-xs tracking-wider uppercase border-t border-black/10 pt-5">
                The Luxe Yatra Worldwide Travel
                <span className="block text-[10px] text-neutral-500 font-normal mt-1 normal-case">
                  ( A Division of The Luxe Yatra Hotels and Resorts Pvt Ltd )
                </span>
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

