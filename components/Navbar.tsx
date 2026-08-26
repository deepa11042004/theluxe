"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 260,
      damping: 20,
    },
  },
} as const;

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isExperiencesOpen, setIsExperiencesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Scroll detection for glassy background and hiding text logo
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    handleScroll(); // Check on mount
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  if (pathname === "/login" || pathname === "/signup") {
    return null;
  }

  return (
    <>
      {/* 
        MAIN NAVBAR
        Transparent gradient top on mount, glassy background on scroll.
      */}
      <header
        className={`fixed top-0 left-0 right-0 z-[99] w-full transition-all duration-500 ease-in-out ${
          isScrolled
            ? "bg-black/30 backdrop-blur-lg py-3"
            : "bg-gradient-to-b from-black/60 to-transparent py-5 lg:py-7"
        }`}
      >
        <div className="max-w-[1800px] mx-auto px-5 md:px-8 xl:px-12 flex justify-between items-start w-full">
          {/* LEFT SIDE: Hamburger + Experiences */}
          <div className="flex items-center gap-6 xl:gap-10 flex-1 h-8 md:h-9 mt-1">
            {/* Hamburger Icon */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="flex flex-col justify-center gap-[5px] group cursor-pointer p-2 -ml-2"
              aria-label="Open Menu"
            >
              <span className="w-6 h-[1.5px] bg-white transition-all duration-300 group-hover:w-8 group-hover:bg-[#d4af37]"></span>
              <span className="w-5 h-[1.5px] bg-white transition-all duration-300 group-hover:w-8 group-hover:bg-[#d4af37]"></span>
            </button>

            {/* Experiences Dropdown (Desktop) */}
            <div className="relative group/experiences hidden lg:block cursor-pointer py-2">
              <div className="flex items-center gap-1.5 text-white text-[11px] xl:text-xs tracking-[0.2em] font-medium uppercase group-hover/experiences:text-[#d4af37] transition-colors">
                <ChevronDown className="w-3.5 h-3.5 group-hover/experiences:rotate-180 transition-transform duration-300" />
                EXPERIENCES
              </div>
              
              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 pt-4 opacity-0 pointer-events-none group-hover/experiences:opacity-100 group-hover/experiences:pointer-events-auto transition-all duration-300 ease-out z-50">
                <div className="bg-black/80 backdrop-blur-md border border-white/10 rounded-xl shadow-xl p-2 w-48 flex flex-col gap-1 text-white">
                  <Link
                    href="/national"
                    className="px-4 py-2.5 rounded-lg hover:bg-white/10 transition-colors font-medium text-[10px] tracking-widest uppercase text-left"
                  >
                    National
                  </Link>
                  <Link
                    href="/international"
                    className="px-4 py-2.5 rounded-lg hover:bg-white/10 transition-colors font-medium text-[10px] tracking-widest uppercase text-left border-t border-white/5"
                  >
                    International
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* CENTER LOGO */}
          <div className="flex-1 flex justify-center shrink-0">
            <Link href="/" className="flex flex-col items-center gap-1.5 group">
              {/* Emblem */}
              <motion.div
                layout
                className="relative h-8 w-8 md:h-9 md:w-9 transition-transform duration-500 group-hover:scale-105 mt-1"
              >
                <Image
                  src="/Img/logo-emblem-v3.png"
                  alt="Luxe Yatra Emblem"
                  fill
                  className="object-contain brightness-0 invert drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
                  priority
                />
              </motion.div>

              {/* Text Logo (Disappears on Scroll) */}
              <AnimatePresence>
                {!isScrolled && (
                  <motion.div
                    initial={{ opacity: 1, scale: 1, marginTop: 4 }}
                    animate={{ opacity: 1, scale: 1, marginTop: 4 }}
                    exit={{ opacity: 0, scale: 0.9, marginTop: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="relative h-8 w-60 md:h-10 md:w-72 origin-top"
                  >
                    <Image
                      src="/Img/logo-text-v3.png"
                      alt="The Luxe Yatra"
                      fill
                      className="object-contain object-top brightness-0 invert drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
                      priority
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </Link>
          </div>

          {/* RIGHT SIDE: Action Button */}
          <div className="flex-1 flex justify-end items-center h-8 md:h-9 mt-1">
            <Link
              href="/join"
              className="hidden md:inline-flex items-center justify-center border border-white hover:bg-white hover:text-black transition-all duration-300 px-6 py-2 xl:px-8 xl:py-2.5 text-[10px] xl:text-xs font-semibold tracking-[0.2em] uppercase text-white rounded-sm shadow-sm"
            >
              JOIN LUXE CLUB
            </Link>
          </div>
        </div>
      </header>

      {/* 
        FULL SCREEN MOBILE OVERLAY MENU 
        Contains all links (Itinerary, Brands, Luxe Club, Blogs, etc.)
      */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#B38E46]/90 backdrop-blur-xl z-[100] flex flex-col justify-between p-6 md:p-12 pointer-events-auto overflow-y-auto"
          >
            {/* Top row (Logo & Close button) */}
            <div className="flex items-center justify-between w-full max-w-[1800px] mx-auto">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex flex-col items-center gap-1.5 group active:scale-95 transition-transform"
              >
                <div className="relative h-10 w-10 md:h-12 md:w-12">
                  <Image
                    src="/Img/logo-emblem-v3.png"
                    alt="The Luxe Yatra Emblem"
                    fill
                    className="object-contain brightness-0 invert drop-shadow-md"
                    priority
                  />
                </div>
                <div className="relative h-8 w-64 md:h-10 md:w-72 mt-2">
                  <Image
                    src="/Img/logo-text-v3.png"
                    alt="The Luxe Yatra Text"
                    fill
                    className="object-contain brightness-0 invert drop-shadow-md"
                    priority
                  />
                </div>
              </Link>

              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white p-2 hover:text-[#d4af37] transition-colors flex items-center justify-center cursor-pointer active:scale-95"
                aria-label="Close menu"
              >
                <X className="w-8 h-8" strokeWidth={1.5} />
              </button>
            </div>

            {/* Menu Items Container */}
            <div className="flex-1 flex flex-col justify-center max-w-xl mx-auto w-full py-12">
              <motion.nav
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="flex flex-col gap-6 md:gap-8 text-lg md:text-xl font-light text-white tracking-[0.2em] uppercase text-center"
              >
                <motion.div variants={itemVariants}>
                  <Link
                    href="/resorts"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover:text-[#d4af37] transition-colors"
                  >
                    Resorts
                  </Link>
                </motion.div>

                {/* Experiences Section with Accordion */}
                <motion.div variants={itemVariants} className="flex flex-col items-center gap-3">
                  <button
                    onClick={() => setIsExperiencesOpen(!isExperiencesOpen)}
                    className="flex items-center justify-center gap-2 hover:text-[#d4af37] transition-colors cursor-pointer"
                  >
                    <span>Experiences</span>
                    <ChevronDown
                      className={`w-5 h-5 transition-transform duration-300 ${
                        isExperiencesOpen ? "rotate-180 text-[#d4af37]" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isExperiencesOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden flex flex-col items-center gap-4 mt-2"
                      >
                        <Link
                          href="/national"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-sm tracking-[0.2em] text-white/70 hover:text-white transition-colors"
                        >
                          National
                        </Link>
                        <Link
                          href="/international"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-sm tracking-[0.2em] text-white/70 hover:text-white transition-colors"
                        >
                          International
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Link
                    href="/itinerary"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover:text-[#d4af37] transition-colors"
                  >
                    Itinerary
                  </Link>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Link
                    href="/brands"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover:text-[#d4af37] transition-colors"
                  >
                    Brands
                  </Link>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Link
                    href="/luxeclub"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover:text-[#d4af37] transition-colors flex items-center justify-center gap-3"
                  >
                    <span className="bg-[#B38E46] text-white h-6 w-6 flex justify-center items-center rounded-full text-[10px] font-bold font-sans tracking-wider">
                      C
                    </span>
                    Luxe Club
                  </Link>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Link
                    href="/blogs"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover:text-[#d4af37] transition-colors"
                  >
                    Blogs
                  </Link>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Link
                    href="/about"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover:text-[#d4af37] transition-colors"
                  >
                    About
                  </Link>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover:text-[#d4af37] transition-colors text-sm mt-4 text-white/60"
                  >
                    Member Login
                  </Link>
                </motion.div>
              </motion.nav>
            </div>

            {/* Bottom Row - CTA */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="w-full flex justify-center"
            >
              <Link
                href="/join"
                onClick={() => setIsMobileMenuOpen(false)}
                className="border border-white hover:bg-white hover:text-black transition-all duration-300 px-10 py-3 text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-white rounded-sm"
              >
                JOIN LUXE CLUB
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
