"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Heart, ChevronRight, ChevronLeft } from "lucide-react";

const destinations = [
  {
    id: 1,
    name: "Lucknow",
    image:
      "https://images.unsplash.com/photo-1659202313780-1d8c8beea7d3?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    desc: "Experience the royal heritage, grand architecture, and exquisite culinary delights of the City of Nawabs. Immerse yourself in timeless luxury and authentic cultural traditions.",
    tags: "HERITAGE • CULTURE",
  },
  {
    id: 2,
    name: "Agra",
    image:
      "https://images.unsplash.com/photo-1724947053227-2335bf21d0ae?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    desc: "Witness the timeless beauty of the Taj Mahal, explore magnificent Mughal monuments, and indulge in luxury hospitality along the banks of the Yamuna River.",
    tags: "MONUMENT • HISTORY",
  },
  {
    id: 3,
    name: "Rishikesh",
    image:
      "https://images.unsplash.com/photo-1650341259809-9314b0de9268?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    desc: "Find peace and adventure in the Yoga Capital of the World along the sacred Ganges. Discover spiritual retreats, tranquil wellness spa centers, and serene riverfront stays.",
    tags: "WELLNESS • ADVENTURE",
  },
  {
    id: 4,
    name: "Jim Corbett",
    image:
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=600&q=85",
    desc: "Embark on thrilling wildlife safaris in India's oldest and most prestigious national park. Stay in luxury jungle lodges nestled in pristine wilderness and forest reserves.",
    tags: "WILDLIFE • NATURE",
  },
  {
    id: 5,
    name: "Nanital",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=85",
    desc: "Relax by the emerald lake surrounded by lush green hills in this charming hill station. Enjoy private boating, mountain views, and luxury lakeside retreats.",
    tags: "LAKES • MOUNTAINS",
  },
  {
    id: 6,
    name: "Bhimtal",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=85",
    desc: "Escape the crowds and enjoy serene boating, nature walks, and birdwatching in a tranquil setting. Experience secluded luxury amidst pristine lakes and pine forests.",
    tags: "SERENE • RETREAT",
  },
];

export default function Properties() {
  const [activeIndex, setActiveIndex] = useState(2);
  const [cardWidth, setCardWidth] = useState(340);
  const [destinationsList, setDestinationsList] = useState<any[]>(destinations);
  const gap = 24;

  useEffect(() => {
    async function fetchHotels() {
      try {
        const res = await fetch("/api/v1/hotels?featured=true&limit=20");
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const dbItems = json.data.map((hotel: any, idx: number) => {
            const primaryImg =
              hotel.images?.find((img: any) => img.is_primary)?.image_url ||
              hotel.images?.[0]?.image_url ||
              "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=85";

            return {
              id: hotel.id || idx + 1,
              name: hotel.name,
              image: primaryImg,
              desc: hotel.short_description || hotel.description || "Experience timeless luxury and authentic hospitality.",
              tags: `${(hotel.luxury_category || "LUXURY").toUpperCase()} • ${(hotel.city || hotel.country || "RESORT").toUpperCase()}`,
            };
          });

          setDestinationsList(dbItems);
        }
      } catch (err) {
        console.error("Failed to fetch properties:", err);
      }
    }
    fetchHotels();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardWidth(290);
      } else {
        setCardWidth(380);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const prev = () => setActiveIndex((i) => i - 1);
  const next = () => setActiveIndex((i) => i + 1);

  const currentRealIndex =
    ((activeIndex % destinationsList.length) + destinationsList.length) %
    destinationsList.length;

  return (
    <section className="w-full bg-white flex flex-col items-center py-10 md:py-16 overflow-hidden border-b border-neutral-200">
      <div className="w-full max-w-7xl mx-auto px-6 flex flex-col items-center relative">
        {/* Header */}
        <div className="text-center flex flex-col items-center mb-10 md:mb-12">
          <div className="text-sm tracking-[0.4em] text-black uppercase font-light mb-6">
            Explore 200+ Resorts
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif tracking-tight text-black mb-4">
            Popular Resorts
          </h2>
          <p className="text-xs md:text-sm max-w-xl leading-relaxed text-neutral-600">
            From oceanfront luxury villas to secluded mountain retreats, find
            your perfect resort getaway.
          </p>
        </div>

        {/* Carousel Container with Outer Framing */}
        <div className="relative w-full py-6">
          <div className="relative w-full h-[420px] md:h-[500px] flex items-center justify-center">
            {[-1, 0, 1].map((offset) => {
              const virtualIndex = activeIndex + offset;
              const destIndex =
                ((virtualIndex % destinationsList.length) + destinationsList.length) %
                destinationsList.length;
              const dest = destinationsList[destIndex];
              const isActive = offset === 0;

              return (
                <motion.div
                  key={virtualIndex}
                  className="absolute shrink-0 flex items-center justify-center h-full"
                  style={{
                    width: cardWidth,
                    left: "50%",
                    marginLeft: -cardWidth / 2,
                  }}
                  animate={{
                    x: offset * (cardWidth + gap),
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 28,
                  }}
                >
                  {isActive ? (
                    /* Active Card Container with Outer Black Frame & Padding */
                    <div className="relative border border-neutral-800 bg-white p-6 md:p-10 shadow-xl w-full h-full flex flex-col justify-center">
                      <div className="relative w-full h-full overflow-hidden rounded-none group cursor-pointer">
                        {/* Image */}
                        <img
                          src={dest.image}
                          alt={dest.name}
                          className="w-full h-full object-cover"
                        />

                        {/* Active Content */}
                        <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-col justify-end">
                          <h3
                            className="text-white text-2xl md:text-3xl font-light tracking-wide mb-1"
                            style={{
                              color: "#ffffff",
                              fontFamily: "var(--work-font), sans-serif",
                            }}
                          >
                            {dest.name}
                          </h3>

                          <div className="mt-2 flex items-center justify-between gap-4">
                            <p
                              className="leading-snug line-clamp-4 font-light"
                              style={{ color: "#ffffff", fontSize: "13.5px" }}
                            >
                              {dest.desc}
                            </p>
                            <div
                              onClick={() => setActiveIndex((prev) => prev + 1)}
                              className="w-9 h-9 shrink-0 bg-white rounded-full flex items-center justify-center shadow-md cursor-pointer hover:bg-neutral-100 transition-colors"
                            >
                              <ChevronRight
                                className="w-4 h-4 text-black"
                                strokeWidth={2}
                              />
                            </div>
                          </div>

                          <p
                            className="uppercase mt-3 font-medium"
                            style={{
                              color: "rgba(255, 255, 255, 0.9)",
                              fontSize: "11px",
                              letterSpacing: "0.2em",
                            }}
                          >
                            {dest.tags}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Non-Active Square Card */
                    <motion.div
                      className="relative w-[72%] md:w-[68%] aspect-square overflow-hidden rounded-none cursor-pointer group shadow-md"
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => setActiveIndex(virtualIndex)}
                    >
                      {/* Image */}
                      <img
                        src={dest.image}
                        alt={dest.name}
                        className="w-full h-full object-cover"
                      />

                      {/* Gradient Overlay */}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)",
                        }}
                      />

                      {/* Non-Active Content */}
                      <div className="absolute bottom-5 left-5 right-5 z-10">
                        <h3
                          className="text-white text-xl md:text-2xl font-light tracking-wide mb-1"
                          style={{
                            color: "#ffffff",
                            fontFamily: "var(--work-font), sans-serif",
                          }}
                        >
                          {dest.name}
                        </h3>
                        <p
                          className="uppercase"
                          style={{
                            color: "rgba(255, 255, 255, 0.8)",
                            fontSize: "8px",
                            letterSpacing: "0.25em",
                          }}
                        >
                          {dest.tags}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Embedded Navigation Arrows - Outside Side Cards */}
          <button
            onClick={prev}
            aria-label="Previous resort"
            className="absolute left-0 md:left-[calc(50%-560px)] lg:left-[calc(50%-600px)] top-1/2 -translate-y-1/2 text-[#B38E46] hover:text-[#997734] transition-all hover:scale-110 cursor-pointer z-30 drop-shadow-md"
          >
            <ChevronLeft className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" strokeWidth={1.2} />
          </button>
          <button
            onClick={next}
            aria-label="Next resort"
            className="absolute right-0 md:right-[calc(50%-560px)] lg:right-[calc(50%-600px)] top-1/2 -translate-y-1/2 text-[#B38E46] hover:text-[#997734] transition-all hover:scale-110 cursor-pointer z-30 drop-shadow-md"
          >
            <ChevronRight className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20" strokeWidth={1.2} />
          </button>
        </div>

        {/* Dot Indicators below carousel */}
        <div className="flex items-center justify-center gap-3 mt-8">
          {destinationsList.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                const diff = i - currentRealIndex;
                setActiveIndex((prev) => prev + diff);
              }}
              className="focus:outline-none cursor-pointer p-1"
              aria-label={`Go to slide ${i + 1}`}
            >
              <div
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  currentRealIndex === i
                    ? "bg-black scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            </button>
          ))}
        </div>

          {/* VIEW ALL Button */}
          <div className="flex justify-center mt-8">
            <Link href="/resorts">
              <button className="border border-[#B38E46] text-[#B38E46] px-6 py-2.5 text-xs tracking-[0.25em] font-medium uppercase hover:bg-[#B38E46] hover:text-white transition-all duration-300 rounded-sm cursor-pointer">
                VIEW ALL
              </button>
            </Link>
          </div>
        </div>
      </section>
    );
  }
