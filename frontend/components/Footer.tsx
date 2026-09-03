"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

// DUMMY CONTENT DATA FOR FUTURE CUSTOMIZATION
const DUMMY_FOOTER_SECTIONS = [
  {
    title: "Quick Links",
    links: [
      { label: "Dummy Link 01", href: "#" },
      { label: "Dummy Link 02", href: "#" },
      { label: "Dummy Link 03", href: "#" },
      { label: "Dummy Link 04", href: "#" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Service Placeholder 1", href: "#" },
      { label: "Service Placeholder 2", href: "#" },
      { label: "Service Placeholder 3", href: "#" },
      { label: "Service Placeholder 4", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Placeholder", href: "#" },
      { label: "Careers Placeholder", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      className="text-white pt-16 pb-8 px-6 sm:px-12 lg:px-16 w-full select-none border-t border-[#B38E46]/50 relative overflow-hidden bg-[#1A140A]"
      style={{
        fontFamily: "var(--work-font), sans-serif",
        backgroundImage:
          "linear-gradient(to bottom, rgba(18, 14, 7, 0.82), rgba(35, 26, 10, 0.90)), url('/Img/gold-texture.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* BRANDING HEADER: LY EMBLEM + THE LUXE YATRA LOGO */}
        <div className="flex flex-col items-center justify-center text-center pb-8 border-b border-white/15">
          <Link href="/" className="flex flex-col items-center gap-3 group">
            {/* LY Emblem Logo */}
            <div className="relative h-14 w-14 sm:h-16 sm:w-16 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/Img/logo-emblem-v3.png"
                alt="LY Emblem"
                fill
                className="object-contain brightness-0 invert drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
                priority
              />
            </div>

            {/* The Luxe Yatra Text Logo */}
            <div className="relative h-8 w-60 sm:h-10 sm:w-72">
              <Image
                src="/Img/logo-text-v3.png"
                alt="The Luxe Yatra"
                fill
                className="object-contain brightness-0 invert drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
                priority
              />
            </div>
          </Link>
          <p className="mt-4 text-xs sm:text-sm text-amber-100/90 max-w-md font-normal tracking-wide drop-shadow-xs">
            Curating extraordinary travel experiences and bespoke luxury stays around the globe.
          </p>
        </div>

        {/* MAIN DUMMY CONTENT GRID FOR FUTURE USE */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* DUMMY CONTACT / INFO BLOCK */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="text-sm font-bold tracking-widest uppercase text-[#E6C687] drop-shadow-xs">
              Contact & Info Placeholder
            </h4>
            <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-normal">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. This is placeholder dummy text for company bio, address, or customer care details.
            </p>
            <div className="space-y-1.5 text-xs text-neutral-200 pt-2 font-normal">
              <p><span className="font-semibold text-[#E6C687]">Phone:</span> +1 (800) 000-0000</p>
              <p><span className="font-semibold text-[#E6C687]">Email:</span> info@example.com</p>
              <p><span className="font-semibold text-[#E6C687]">Address:</span> 123 Luxury Way, Suite 100</p>
            </div>
          </div>

          {/* DUMMY NAVIGATION SECTIONS */}
          {DUMMY_FOOTER_SECTIONS.map((section, idx) => (
            <div key={idx} className="flex flex-col gap-3">
              <h4 className="text-sm font-bold tracking-widest uppercase text-[#E6C687] drop-shadow-xs">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <a
                      href={link.href}
                      className="text-xs sm:text-sm text-neutral-200 hover:text-[#E6C687] hover:underline transition-colors font-normal"
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
        <div className="border-t border-white/15 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-300 font-normal">
          <p>© {new Date().getFullYear()} The Luxe Yatra. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:underline hover:text-[#E6C687] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:underline hover:text-[#E6C687] transition-colors">Terms of Service</a>
            <a href="#" className="hover:underline hover:text-[#E6C687] transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

