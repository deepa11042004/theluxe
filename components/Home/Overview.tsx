"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

type SlideItem = {
  src: string;
  alt: string;
  caption: string;
};

const SECTION_1_IMAGES: SlideItem[] = [
  {
    src: "/Img/amsterdam-canal.jpg",
    alt: "Amsterdam Canal at Night",
    caption: "Romantic Canal Cities"
  },
  {
    src: "/Img/thailand-island.jpg",
    alt: "Thailand Island and Boat",
    caption: "Tropical Island Paradises"
  },
  {
    src: "/Img/woman-hand-holding-camera-standing-top-rock-nature-travel-concept_335224-887.avif",
    alt: "Travel Exploration & Photography",
    caption: "Mountain Peak Expeditions"
  },
  {
    src: "/Img/wooden-bridge-koh-nangyuan-island-surat-thani-thailand_335224-1082.avif",
    alt: "Koh Nang Yuan Island Wooden Bridge",
    caption: "Exotic Coastal Retreats"
  },
  {
    src: "/Img/beautiful-girl-standing-boat-looking-mountains-ratchaprapha-dam-khao-sok-national-park-surat-thani-province-thailand_335224-849.avif",
    alt: "Khao Sok National Park Boat View",
    caption: "Majestic Lake & Mountain Cruises"
  }
];

const SECTION_2_IMAGES: SlideItem[] = [
  {
    src: "/Img/360_F_315088533_706xMSeuNJK4lnrTDvqRbcurHHkIubmr.jpg",
    alt: "Luxury Resort Infinity Pool",
    caption: "Exclusive Resort Stays"
  },
  {
    src: "/Img/lisbon-8275994_640.jpg",
    alt: "Lisbon Cityscape & Architecture",
    caption: "Iconic Cultural Cities"
  },
  {
    src: "/Img/nature-1207955_640.jpg",
    alt: "Scenic Nature Landscapes",
    caption: "Breath-taking Landscapes"
  },
  {
    src: "/Img/photo-1619120238346-978e07731e77.avif",
    alt: "Exotic Destination Overlook",
    caption: "Unrivaled Perspectives"
  },
  {
    src: "/Img/winding-road-1556177_1280.jpg",
    alt: "Scenic Winding Road Drive",
    caption: "Unforgettable Road Journeys"
  }
];

const OVERVIEW_SECTIONS = [
  {
    tag: "Beautiful Places Await",
    headline: "Great Journeys, Fascinating Places",
    paragraphs: [
      "Travel isn’t always comfortable—sometimes it challenges you. But the journey ultimately changes you, leaving lasting marks on your memory, consciousness, and heart. You take something with you, and hopefully, leave something good behind.",
      "Our team of experienced experts meticulously designs each itinerary, ensuring a seamless, enriching experience. We offer tailor-made trips designed to cater precisely to your unique preferences and personal interests.",
    ],
    images: SECTION_1_IMAGES,
  },
  {
    tag: "Life is an extraordinary journey",
    headline: "Travel Is Your Ticket to Play in the Grandest Arenas",
    paragraphs: [
      "The Luxe Yatra Worldwide Travel offers a kaleidoscope of options, from exotic beach getaways to awe-inspiring cultural expeditions. Whether you seek serene tropical paradises or high-adrenaline exploration, we have your perfect itinerary.",
      "Immerse yourself completely in the heart and soul of your destination. Connect deeply with local communities, savor authentic traditional cuisines, and witness age-old traditions firsthand.",
    ],
    images: SECTION_2_IMAGES,
  },
];

function SlidingImageCarousel({ images }: { images: SlideItem[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 0,
    }),
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-full min-h-[380px] lg:min-h-[480px] rounded-2xl overflow-hidden shadow-2xl group border border-neutral-200/80">
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url("${images[currentIndex].src}")` }}
        >
          <Image
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            fill
            unoptimized
            priority
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover object-center brightness-[0.9] contrast-[1.02]"
          />
          {/* Subtle gradient vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
          
          {/* Caption Overlay */}
          <div className="absolute bottom-6 left-6 z-10">
            <span className="text-xs uppercase tracking-widest text-white/80 font-medium px-3 py-1 bg-black/40 backdrop-blur-md rounded-full border border-white/20">
              {images[currentIndex].caption}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Manual Navigation Controls */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/30 backdrop-blur-md border border-white/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white hover:text-black cursor-pointer shadow-lg"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/30 backdrop-blur-md border border-white/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white hover:text-black cursor-pointer shadow-lg"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > currentIndex ? 1 : -1);
              setCurrentIndex(idx);
            }}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              idx === currentIndex ? "w-6 bg-white" : "w-2 bg-white/40 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Overview() {
  return (
    <section className="bg-white text-black w-full overflow-hidden flex flex-col gap-24 py-16 lg:py-24">
      {OVERVIEW_SECTIONS.map((section, index) => {
        // True = Text Left, Image Right | False = Image Left, Text Right
        const isTextLeft = index % 2 === 0;

        return (
          <div
            key={index}
            className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 px-6 sm:px-12 lg:px-16 items-center"
          >
            {/* CONTENT SECTION */}
            <motion.div
              initial={{ opacity: 0, x: isTextLeft ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`lg:col-span-5 flex flex-col justify-center text-left z-10 ${
                !isTextLeft ? "lg:order-2" : ""
              }`}
            >
              {/* Micro-Header Tag */}
              <span className="text-[15px] md:text-lg font-[Vera] tracking-[0.3em] text-neutral-800 uppercase mb-5 block">
                {section.tag}
              </span>

              {/* Luxury Headline */}
              <h2 className="text-3xl sm:text-4xl xl:text-5xl font-[Vera] tracking-tight text-black mb-6 leading-[1.2]">
                {section.headline}
              </h2>

              {/* Core Description Copy */}
              <div className="space-y-5 text-neutral-800 font-medium text-sm xl:text-base leading-relaxed tracking-wide max-w-xl">
                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>
            </motion.div>

            {/* VISUAL MEDIA BLOCK - SLIDING MOTION CAROUSEL */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className={`lg:col-span-7 relative aspect-4/3 lg:aspect-square xl:aspect-4/3 w-full select-none ${
                !isTextLeft ? "lg:order-1" : ""
              }`}
            >
              <SlidingImageCarousel images={section.images} />
            </motion.div>
          </div>
        );
      })}
    </section>
  );
}


