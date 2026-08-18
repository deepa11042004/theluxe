"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ChevronDown, ArrowUpRight } from "lucide-react";
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
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isExperiencesOpen, setIsExperiencesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  // Scroll detection for header text contrast
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Focus the input automatically when search opens
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  if (pathname === "/login" || pathname === "/signup") {
    return null;
  }

  const isDarkPage =
    pathname === "/" || pathname === "/clubelevate" || pathname === "/join";

  return (
    <>
      <header className="fixed top-5 left-0 right-0 z-99 px-6 py-4 flex items-center justify-between max-w-7xl mx-auto w-full pointer-events-none">
        {/* 1. Brand Text - Outside the cylinder shape at current position (top left) */}
        <div className="flex items-center z-50 pointer-events-auto">
          <Link
            href="/"
            className="flex items-center group transition-transform duration-200 hover:scale-105"
          >
            <div className="relative h-6 w-44 md:w-52">
              <Image
                src={isDarkPage ? "/Img/logo-text-white.png" : "/Img/logo-text.png"}
                alt="The Luxe Yatra"
                fill
                className="object-contain object-left drop-shadow-sm"
                priority
              />
            </div>
          </Link>
        </div>

        {/* 2. Floating Capsule Navbar Container with Logo in the Middle */}
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="hidden lg:flex bg-white rounded-full px-4 xl:px-5 py-2 items-center shadow-lg border border-white/20 h-14 pointer-events-auto mx-auto shrink-0"
        >
          <AnimatePresence mode="wait">
            {!isSearchOpen ? (
              // NORMAL TABS STATE WITH LOGO IN THE MIDDLE
              <motion.nav
                key="nav-links"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2 xl:gap-3.5 text-xs xl:text-sm font-medium text-gray-700"
              >
                {/* Left Side Links */}
                <Link
                  href="/resorts"
                  className="hover:text-black transition-colors px-2 py-1 whitespace-nowrap"
                >
                  Resorts
                </Link>

                <Link
                  href="/itinerary"
                  className="hover:text-black transition-colors px-2 py-1 whitespace-nowrap"
                >
                  Itinerary
                </Link>

                {/* Experiences Dropdown */}
                <div className="relative group cursor-pointer flex items-center gap-1 hover:text-black transition-colors px-2 py-1 whitespace-nowrap">
                  <Link href="/experiences" className="flex items-center gap-1">
                    <span>Experiences</span>
                    <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
                  </Link>
                  {/* Dropdown Menu Container */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 ease-out z-50">
                    <div className="bg-white/95 backdrop-blur-md border border-neutral-100 rounded-2xl shadow-xl p-2 w-48 flex flex-col gap-1 text-gray-700">
                      <Link
                        href="/experiences"
                        className="px-4 py-2.5 rounded-xl hover:bg-neutral-50 hover:text-black transition-colors font-medium text-xs tracking-wider uppercase text-left"
                      >
                        All Experiences
                      </Link>
                      <Link
                        href="/national"
                        className="px-4 py-2.5 rounded-xl hover:bg-neutral-50 hover:text-black transition-colors font-medium text-xs tracking-wider uppercase text-left border-t border-neutral-100/50"
                      >
                        National
                      </Link>
                      <Link
                        href="/international"
                        className="px-4 py-2.5 rounded-xl hover:bg-neutral-50 hover:text-black transition-colors font-medium text-xs tracking-wider uppercase text-left"
                      >
                        International
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Logo in the Middle of Navbar */}
                <Link
                  href="/"
                  className="mx-3 xl:mx-4 flex items-center justify-center group relative z-50 shrink-0"
                  aria-label="The Luxe Yatra Home"
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.1)] border border-neutral-100/50 flex items-center justify-center h-20 w-20 md:h-22 md:w-22 transition-transform duration-300 group-hover:scale-105">
                    <div className="relative h-13 w-13 md:h-15 md:w-15">
                      <Image
                        src="/Img/logo-emblem.png"
                        alt="The Luxe Yatra Logo"
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                  </div>
                  {/* Invisible spacer to maintain gap in flex layout */}
                  <div className="w-14 md:w-16 h-1"></div>
                </Link>

                {/* Right Side Links */}
                <Link
                  href="/brands"
                  className="hover:text-black transition-colors px-2 py-1 whitespace-nowrap font-medium"
                >
                  Brands
                </Link>

                <Link
                  href="/clubelevate"
                  className="hover:text-black transition-colors px-2 py-1 font-semibold flex items-center gap-1 whitespace-nowrap"
                >
                  <span className="bg-black text-white h-4.5 w-4.5 flex justify-center items-center rounded-full text-[10px] tracking-wider">
                    C
                  </span>
                  Club Elevate
                </Link>

                <Link
                  href="/blogs"
                  className="hover:text-black transition-colors px-2 py-1 whitespace-nowrap"
                >
                  Blog
                </Link>

                <Link
                  href="/login"
                  className="hover:text-black transition-colors px-2 py-1 whitespace-nowrap"
                >
                  Member Login
                </Link>

                {/* Search Toggle Trigger */}
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-1.5 hover:bg-gray-100 rounded-full transition-colors ml-0.5 cursor-pointer"
                  aria-label="Open Search"
                >
                  <Search className="w-4 h-4 text-gray-600" />
                </button>
              </motion.nav>
            ) : (
              // SEARCH EXPANDED STATE
              <motion.div
                key="search-input"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center w-full px-3 min-w-[340px] md:min-w-[480px]"
              >
                <div className="p-2 bg-gray-100 rounded-full mr-3">
                  <Search className="w-5 h-5 text-gray-500" />
                </div>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Where would you like to go?"
                  className="w-full bg-transparent text-gray-800 focus:outline-none placeholder-gray-400 text-base"
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors ml-2 cursor-pointer"
                  aria-label="Close Search"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* 3. Action Button (Join Keystone / Agent Hub with Arrow) */}
        <div className="hidden lg:flex items-center gap-4 z-50 pointer-events-auto">
          <Link
            href="/join"
            className="bg-black hover:bg-white text-white hover:text-black rounded-full px-6 py-3 text-sm font-medium tracking-wide shadow-md transition-all flex items-center gap-2 group whitespace-nowrap"
          >
            <span>Join Club Elevate</span>
            <div className="bg-white p-0.5 rounded-full group-hover:bg-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
              <ArrowUpRight className="w-3 h-3 text-black group-hover:text-white" />
            </div>
          </Link>
        </div>

        {/* Mobile/Tablet Menu Button */}
        <div className="flex lg:hidden items-center z-50 pointer-events-auto">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="bg-white text-black px-6 py-2.5 rounded-full font-semibold shadow-md transition-all hover:bg-neutral-100 flex items-center justify-center text-sm font-sans cursor-pointer active:scale-95 border border-white/10"
          >
            Menu
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white/98 backdrop-blur-2xl z-100 flex flex-col justify-between p-6 md:p-12 pointer-events-auto"
          >
            {/* Top row */}
            <div className="flex items-center justify-between w-full max-w-7xl mx-auto">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-2"
              >
                <div className="text-black font-[Vera] text-2xl tracking-wide flex flex-col leading-none">
                  <span className="font-semibold">The Luxe Yatra</span>
                  <span className="text-[12px] tracking-[0.2em] font-medium text-neutral-550 uppercase">
                    WORLDWIDE TRAVELS
                  </span>
                </div>
              </Link>

              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-black/5 hover:bg-black/10 text-black border border-black/10 px-6 py-2.5 rounded-full font-semibold shadow-xs transition-all flex items-center justify-center text-sm font-sans cursor-pointer active:scale-95"
              >
                Close
              </button>
            </div>

            {/* Menu Items Container */}
            <div className="flex-1 flex flex-col justify-center max-w-xl mx-auto w-full py-8">
              {/* Search Bar */}
              <div className="relative mb-8 w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500" />
                <input
                  type="text"
                  placeholder="Where would you like to go?"
                  className="w-full bg-neutral-100/80 focus:bg-neutral-200/50 text-black rounded-full pl-12 pr-10 py-3.5 focus:outline-none focus:ring-1 focus:ring-black/10 placeholder-neutral-450 text-sm border border-neutral-200/70 transition-all font-sans"
                />
              </div>

              {/* Links List */}
              <motion.nav
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="flex flex-col gap-6 text-2xl font-medium text-neutral-700"
              >
                <motion.div variants={itemVariants}>
                  <Link
                    href="/resorts"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover:text-black transition-colors"
                  >
                    Resorts
                  </Link>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Link
                    href="/itinerary"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover:text-black transition-colors"
                  >
                    Itinerary
                  </Link>
                </motion.div>

                {/* Experiences Section with Accordion */}
                <motion.div
                  variants={itemVariants}
                  className="flex flex-col gap-2"
                >
                  <button
                    onClick={() => setIsExperiencesOpen(!isExperiencesOpen)}
                    className="flex items-center justify-between text-2xl font-medium text-neutral-700 hover:text-black transition-colors w-full text-left cursor-pointer"
                  >
                    <span>Experiences</span>
                    <ChevronDown
                      className={`w-5 h-5 text-neutral-500 transition-transform duration-300 ${
                        isExperiencesOpen ? "rotate-180 text-black" : ""
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
                        className="overflow-hidden flex flex-col gap-3 pl-4 border-l border-neutral-200 mt-2"
                      >
                        <Link
                          href="/experiences"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-lg text-neutral-500 hover:text-black transition-colors"
                        >
                          All Experiences
                        </Link>
                        <Link
                          href="/national"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-lg text-neutral-500 hover:text-black transition-colors"
                        >
                          National
                        </Link>
                        <Link
                          href="/international"
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="text-lg text-neutral-500 hover:text-black transition-colors"
                        >
                          International
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Link
                    href="/brands"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover:text-black transition-colors"
                  >
                    Brands
                  </Link>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Link
                    href="/clubelevate"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover:text-black transition-colors flex items-center gap-2"
                  >
                    <span className="bg-black text-white h-6 w-6 flex justify-center items-center rounded-full text-xs font-bold font-sans">
                      C
                    </span>
                    Club Elevate
                  </Link>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Link
                    href="/blogs"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover:text-black transition-colors"
                  >
                    Blog
                  </Link>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover:text-black transition-colors"
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
              className="w-full max-w-xl mx-auto flex justify-center"
            >
              <Link
                href="/join"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-black hover:bg-neutral-900 text-white rounded-full px-8 py-4 text-base font-semibold tracking-wide shadow-md transition-all flex items-center gap-2 group w-full justify-center"
              >
                <span>Join Club Elevate</span>
                <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
