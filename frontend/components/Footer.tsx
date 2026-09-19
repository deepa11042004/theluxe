"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { FaInstagram, FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

// DUMMY CONTENT DATA FOR FUTURE CUSTOMIZATION
const DUMMY_FOOTER_SECTIONS = [
  {
    title: "Discover",
    links: [
      { label: "Destinations", href: "#" },
      { label: "Signature Itineraries", href: "#" },
      { label: "Luxe Club Membership", href: "#" },
      { label: "Curated Experiences", href: "#" },
    ],
  },
  {
    title: "Our Services",
    links: [
      { label: "Bespoke Journey Planning", href: "#" },
      { label: "Private Jet Charters", href: "#" },
      { label: "Exclusive Villa Rentals", href: "#" },
      { label: "24/7 Global Concierge", href: "#" },
    ],
  },
  {
    title: "About Us",
    links: [
      { label: "Our Story", href: "#" },
      { label: "Sustainability", href: "#" },
      { label: "Press & Media", href: "#" },
      { label: "Careers", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      className="text-white pt-10 pb-6 px-6 sm:px-12 lg:px-16 w-full select-none relative overflow-hidden bg-[#B38E46]"
      style={{
        fontFamily: "var(--work-font), sans-serif",
      }}
    >
      <style>{`
        footer, footer *, footer h4, footer p, footer a, footer span, footer li {
          color: #ffffff !important;
        }
      `}</style>
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        {/* BRANDING HEADER: LY EMBLEM + THE LUXE YATRA LOGO */}
        <div className="flex flex-col items-center justify-center text-center pb-5 border-b border-white/25">
          <Link href="/" className="flex flex-col items-center gap-3 group mb-4">
            {/* LY Emblem Logo */}
            <div className="relative h-16 w-16 sm:h-20 sm:w-20 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/Img/logo-emblem-v3.png"
                alt="LY Emblem"
                fill
                className="object-contain brightness-0 invert drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
                priority
              />
            </div>

            {/* The Luxe Yatra Text Logo */}
            <div className="relative h-8 w-64 sm:h-10 sm:w-72">
              <Image
                src="/Img/logo-text-v3.png"
                alt="The Luxe Yatra"
                fill
                className="object-contain brightness-0 invert drop-shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
                priority
              />
            </div>
          </Link>
        </div>

        {/* MAIN DUMMY CONTENT GRID FOR FUTURE USE */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">
          {/* DUMMY CONTACT / INFO BLOCK */}
          <div className="lg:col-span-2 flex flex-col gap-2">
            <h4 className="text-base sm:text-lg font-bold tracking-wider uppercase text-white mb-2">
              Contact Us
            </h4>
            <p className="text-[11px] text-white leading-relaxed font-normal">
              Experience the pinnacle of luxury travel. We curate bespoke journeys and exclusive stays tailored to your discerning tastes across the globe.
            </p>
            <div className="space-y-2 text-[11px] text-white pt-2 font-normal">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5" />
                <p>+1 (888) 555-LUXE</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5" />
                <p>concierge@theluxeyatra.com</p>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold uppercase tracking-wider text-[10px]">Corporate Office</p>
                  <p>293, Lane 2, Westend Marg, Saket, New Delhi – 110030</p>
                </div>
              </div>
            </div>

            {/* SOCIAL MEDIA */}
            <div className="flex items-center gap-4 pt-4">
              <a href="#" className="hover:opacity-80 transition-opacity"><FaInstagram className="w-4 h-4" /></a>
              <a href="#" className="hover:opacity-80 transition-opacity"><FaFacebookF className="w-4 h-4" /></a>
              <a href="#" className="hover:opacity-80 transition-opacity"><FaTwitter className="w-4 h-4" /></a>
              <a href="#" className="hover:opacity-80 transition-opacity"><FaLinkedinIn className="w-4 h-4" /></a>
            </div>
          </div>

          {/* DUMMY NAVIGATION SECTIONS */}
          {DUMMY_FOOTER_SECTIONS.map((section, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <h4 className="text-base sm:text-lg font-bold tracking-wider uppercase text-white mb-2">
                {section.title}
              </h4>
              <ul className="space-y-1.5">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <a
                      href={link.href}
                      className="text-[11px] text-white hover:underline transition-colors font-normal opacity-95 hover:opacity-100"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* BOTTOM COPYRIGHT & DUMMY LEGAL LINKS */}
        <div className="border-t border-white/25 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-white font-normal">
          <p>© {new Date().getFullYear()} The Luxe Yatra. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:underline transition-colors">Privacy Policy</a>
            <a href="#" className="hover:underline transition-colors">Terms of Service</a>
            <a href="#" className="hover:underline transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
