"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  return (
    <section className="bg-white text-black min-h-screen w-full overflow-hidden flex items-center py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* 1. TOP CINEMATIC PICTURE COLLAGE WITH DATA IN CENTER */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch min-h-125 md:h-137.5 lg:h-162.5">
          {/* Left Block Side Panel Elements */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="hidden md:flex md:col-span-3 flex-col gap-4 h-full"
          >
            <div className="relative flex-1 rounded-2xl overflow-hidden shadow-2xl border border-white/5 group">
              <Image
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
                alt="Beach sunrise experience"
                fill
                sizes="(max-w-768px) 100vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.8] contrast-[1.02]"
              />
            </div>
            <div className="relative flex-1 rounded-2xl overflow-hidden shadow-2xl border border-white/5 group">
              <Image
                src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=80"
                alt="Serene lake boat travel"
                fill
                sizes="(max-w-768px) 100vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.8] contrast-[1.02]"
              />
            </div>
          </motion.div>

          {/* Main Editorial Center Content Block */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="col-span-12 md:col-span-6 flex flex-col justify-center items-center text-center p-6 md:p-10 rounded-2xl bg-white/50 backdrop-blur-md border border-neutral-200 shadow-xl z-10 h-full"
          >
            {/* Micro-Header Tag */}
            <span className="text-[13px] md:text-sm font-[Vera] tracking-[0.3em] text-neutral-500 uppercase mb-6 block">
              About The Luxe Yatra Worldwide Travel
            </span>

            {/* Luxury High-Contrast Headline */}
            <h2 className="text-3xl sm:text-4xl xl:text-5xl font-[Vera] tracking-normal text-black mb-8 leading-[1.2] max-w-lg">
              We&apos;re Dedicated To Making Your Travel Simple &amp; Fun
            </h2>

            {/* Multi-Paragraph Content Block */}
            <div className="space-y-6 text-neutral-700 font-light text-sm xl:text-base leading-relaxed tracking-wide max-w-md">
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

              <p className="font-semibold text-black/90 mt-6 text-xs tracking-wider uppercase border-t border-black/10 pt-6">
                The Luxe Yatra Worldwide Travel
                <span className="block text-[10px] text-neutral-500 font-normal mt-1 normal-case">
                  ( A Division of The Luxe Yatra Hotels and Resorts Pvt Ltd )
                </span>
              </p>
            </div>
          </motion.div>

          {/* Right Block Side Panel Elements */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="hidden md:flex md:col-span-3 flex-col gap-4 h-full"
          >
            <div className="relative flex-1 rounded-2xl overflow-hidden shadow-2xl border border-white/5 group">
              <Image
                src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=600&q=80"
                alt="Tropical travel coastline"
                fill
                sizes="(max-w-768px) 100vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.8] contrast-[1.02]"
              />
            </div>
            <div className="relative flex-1 rounded-2xl overflow-hidden shadow-2xl border border-white/5 group">
              <Image
                src="https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80"
                alt="Thrilling adventure experience"
                fill
                sizes="(max-w-768px) 100vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.8] contrast-[1.02]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
