"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

type SlideItem = {
  src: string;
  alt: string;
  caption: string;
  title: string;
};

const SECTION_1_IMAGES: SlideItem[] = [
  {
    src: "/Img/international resorts/TheBrando.jpg",
    alt: "The Brando",
    title: "The Brando",
    caption: "Tetiaroa Atoll, French Polynesia"
  },
  {
    src: "/Img/international resorts/putri-wamoro-jungle-nihi-sumba.webp",
    alt: "Nihi Sumba",
    title: "Nihi Sumba",
    caption: "Wanokaka, Indonesia"
  },
  {
    src: "/Img/international resorts/UBU_614_original.jpg",
    alt: "Four Seasons Resort at Sayan",
    title: "Four Seasons Resort at Sayan",
    caption: "Ubud, Indonesia"
  },
  {
    src: "/Img/international resorts/udaipur villas.jpg",
    alt: "The Oberoi Udaivilas",
    title: "The Oberoi Udaivilas",
    caption: "Udaipur, India"
  },
  {
    src: "/Img/international resorts/soneva-fushi.jpg",
    alt: "Soneva Fushi",
    title: "Soneva Fushi",
    caption: "Baa Atoll, Maldives"
  },
  {
    src: "/Img/international resorts/SAN-exp-insider-hero-thumbnail-landscape.webp",
    alt: "Grace Hotel",
    title: "Grace Hotel",
    caption: "Imerovigli, Greece"
  },
  {
    src: "/Img/international resorts/RWCDB_DroneBorgo.jpg",
    alt: "Rosewood Castiglion del Bosco",
    title: "Rosewood Castiglion del Bosco",
    caption: "Montalcino, Italy"
  },
  {
    src: "/Img/international resorts/one-only-reethi-rah.jpg",
    alt: "One&Only Reethi Rah",
    title: "One&Only Reethi Rah",
    caption: "North Malé Atoll, Maldives"
  },
  {
    src: "/Img/international resorts/Six Senses Douro Valley Lamego Portugal.webp",
    alt: "Six Senses Douro Valley",
    title: "Six Senses Douro Valley",
    caption: "Lamego, Portugal"
  },
  {
    src: "/Img/international resorts/Royal Mansour Marrakech Morocco.webp",
    alt: "Royal Mansour",
    title: "Royal Mansour",
    caption: "Marrakech, Morocco"
  }
];

const SECTION_2_IMAGES: SlideItem[] = [
  {
    src: "/Img/national resorts/Ananda in the Himalayas Rishikesh.jpg",
    alt: "Ananda in the Himalayas",
    title: "Ananda in the Himalayas",
    caption: "Rishikesh"
  },
  {
    src: "/Img/national resorts/EVOLVE-BACK-COORG-RESORT.jpg",
    alt: "Evolve Back",
    title: "Evolve Back",
    caption: "Coorg"
  },
  {
    src: "/Img/national resorts/Kumarakom Lake Resort Kumarakom.jpg",
    alt: "Kumarakom Lake Resort",
    title: "Kumarakom Lake Resort",
    caption: "Kumarakom"
  },
  {
    src: "/Img/national resorts/Rambagh Palace Jaipur.avif",
    alt: "Rambagh Palace",
    title: "Rambagh Palace",
    caption: "Jaipur"
  },
  {
    src: "/Img/national resorts/Taj Exotica Resort & Spa Benaulim.avif",
    alt: "Taj Exotica Resort & Spa",
    title: "Taj Exotica Resort & Spa",
    caption: "Benaulim"
  },
  {
    src: "/Img/national resorts/Taj Falaknuma Palace Hyderabad, Telangana.avif",
    alt: "Taj Falaknuma Palace",
    title: "Taj Falaknuma Palace",
    caption: "Hyderabad"
  },
  {
    src: "/Img/national resorts/Taj Lake Palace.avif",
    alt: "Taj Lake Palace",
    title: "Taj Lake Palace",
    caption: "Udaipur"
  },
  {
    src: "/Img/national resorts/The Oberoi Amarvilas Agra.webp",
    alt: "The Oberoi Amarvilas",
    title: "The Oberoi Amarvilas",
    caption: "Agra"
  },
  {
    src: "/Img/national resorts/Umaid Bhawan Palace Jodhpur.avif",
    alt: "Umaid Bhawan Palace",
    title: "Umaid Bhawan Palace",
    caption: "Jodhpur"
  },
  {
    src: "/Img/national resorts/Wildflower Hall Shimla.jpg",
    alt: "Wildflower Hall",
    title: "Wildflower Hall",
    caption: "Shimla"
  }
];

const OVERVIEW_SECTIONS = [
  {
    tag: "WORLD'S TOP 10 RESORTS",
    headline: "Travel Better.\nLive More Luxuriously.",
    paragraphs: [
      "Discover thoughtfully curated journeys, exceptional stays, and exclusive privileges designed around the way you love to travel.",
      "From premium hotels and bespoke experiences to privileged member benefits, The Luxe Yatra brings a more refined way to explore the world.",
    ],
    ctaText: "Explore Luxe Experiences",
    ctaLink: "/experiences",
    images: SECTION_1_IMAGES,
  },
  {
    tag: "INDIA'S FINEST RETREATS",
    headline: "Discover India's\nMost Exceptional Stays",
    paragraphs: [
      "From royal palaces and serene retreats to beachfront escapes and tranquil resorts, discover a curated collection of India's finest stays and experiences.",
    ],
    ctaText: "Explore Luxe Experiences",
    ctaLink: "/national",
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
    <div className="relative w-full h-full min-h-[380px] lg:min-h-[480px] rounded-none overflow-hidden shadow-2xl group border border-neutral-200/80">
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Caption Overlay */}
          <div className="absolute bottom-6 left-6 z-10 flex flex-col gap-2">
            <h3 className="text-2xl text-white drop-shadow-lg font-medium">
              {images[currentIndex].title}
            </h3>
            <div>
              <span className="inline-block bg-black/40 backdrop-blur-md rounded-sm text-[10px] md:text-[11px] px-6 py-2.5 tracking-[0.25em] uppercase font-medium shadow-lg text-white">
                {images[currentIndex].caption}
              </span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Manual Navigation Controls */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 text-white/70 hover:text-white opacity-0 group-hover:opacity-100 transition-all hover:scale-110 cursor-pointer drop-shadow-md"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-10 h-10 md:w-12 md:h-12" strokeWidth={1.5} />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-white/70 hover:text-white opacity-0 group-hover:opacity-100 transition-all hover:scale-110 cursor-pointer drop-shadow-md"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-10 h-10 md:w-12 md:h-12" strokeWidth={1.5} />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-3">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > currentIndex ? 1 : -1);
              setCurrentIndex(idx);
            }}
            className="focus:outline-none cursor-pointer p-1"
            aria-label={`Go to slide ${idx + 1}`}
          >
            <div
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? "bg-white scale-125 shadow-sm"
                  : "bg-white/50 hover:bg-white/80"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Overview() {
  return (
    <section className="bg-white text-black w-full overflow-hidden flex flex-col gap-16 md:gap-24 py-10 md:py-16 lg:py-24 border-b border-neutral-200">
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
              <h2 className="text-3xl sm:text-4xl xl:text-5xl tracking-tight text-black mb-6 leading-[1.2] whitespace-pre-line">
                {section.headline}
              </h2>

              {/* Core Description Copy */}
              <div className="space-y-5 text-neutral-800 font-medium text-sm xl:text-base leading-relaxed tracking-wide max-w-xl">
                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>

              {/* Optional CTA Button */}
              {section.ctaText && (
                <div className="pt-6">
                  <a
                    href={section.ctaLink || "/experiences"}
                    className="inline-flex items-center justify-center bg-transparent border border-[#B38E46] text-[#B38E46] hover:bg-[#B38E46] hover:text-white active:scale-95 font-medium text-xs md:text-sm uppercase tracking-[0.25em] px-8 py-3.5 rounded-sm transition-all duration-300 shadow-xs cursor-pointer"
                  >
                    <span>{section.ctaText}</span>
                  </a>
                </div>
              )}
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


