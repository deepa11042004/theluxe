"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const OVERVIEW_SECTIONS = [
  {
    tag: "Beautiful Places Await",
    headline: "Great Journeys, Fascinating Places",
    paragraphs: [
      "Travel isn’t always comfortable—sometimes it challenges you. But the journey ultimately changes you, leaving lasting marks on your memory, consciousness, and heart. You take something with you, and hopefully, leave something good behind.",
      "Our team of experienced experts meticulously designs each itinerary, ensuring a seamless, enriching experience. We offer tailor-made trips designed to cater precisely to your unique preferences and personal interests.",
    ],
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    alt: "Fascinating travel destination view",
  },
  {
    tag: "Life is an extraordinary journey",
    headline: "Travel Is Your Ticket to Play in the Grandest Arenas",
    paragraphs: [
      "The Luxe Yatra Worldwide Travel offers a kaleidoscope of options, from exotic beach getaways to awe-inspiring cultural expeditions. Whether you seek serene tropical paradises or high-adrenaline exploration, we have your perfect itinerary.",
      "Immerse yourself completely in the heart and soul of your destination. Connect deeply with local communities, savor authentic traditional cuisines, and witness age-old traditions firsthand.",
    ],
    image:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80",
    alt: "Authentic cultural experience travel illustration",
  },
];

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
              <span className="text-[15px] md:text-lg font-[Vans] tracking-[0.3em] text-neutral-800 uppercase mb-5 block">
                {section.tag}
              </span>

              {/* Luxury Headline */}
              <h2 className="text-3xl sm:text-4xl xl:text-5xl  font-[Vans] tracking-tight text-black mb-6 leading-[1.2]">
                {section.headline}
              </h2>

              {/* Core Description Copy */}
              <div className="space-y-5 text-neutral-800 font-medium text-sm xl:text-base leading-relaxed tracking-wide max-w-xl">
                {section.paragraphs.map((p, pIdx) => (
                  <p key={pIdx}>{p}</p>
                ))}
              </div>
            </motion.div>

            {/* VISUAL MEDIA BLOCK */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className={`lg:col-span-7 relative aspect-4/3 lg:aspect-square xl:aspect-4/3 w-full rounded-sm overflow-hidden select-none shadow-2xl ${
                !isTextLeft ? "lg:order-1" : ""
              }`}
            >
              <Image
                src={section.image}
                alt={section.alt}
                fill
                sizes="(max-w-1024px) 100vw, 55vw"
                priority={index === 0}
                className="object-cover object-center brightness-[0.85] contrast-[1.02]"
              />
            </motion.div>
          </div>
        );
      })}
    </section>
  );
}
