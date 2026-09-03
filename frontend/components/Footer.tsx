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
      className="text-white pt-8 pb-5 px-6 sm:px-12 lg:px-16 w-full select-none border-t border-[#B38E46]/30 relative overflow-hidden bg-black"
      style={{
        fontFamily: "var(--work-font), sans-serif",
        backgroundImage: "url('/Img/footer.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <style>{`
        footer p {
          color: #ffffff !important;
        }
      `}</style>
      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        {/* BRANDING HEADER: LY EMBLEM + THE LUXE YATRA LOGO */}
        <div className="flex flex-col items-center justify-center text-center pb-5 border-b border-white/15">
          <Link href="/" className="flex flex-col items-center gap-2 group">
            {/* LY Emblem Logo */}
            <div className="relative h-10 w-10 sm:h-12 sm:w-12 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/Img/logo-emblem-v3.png"
                alt="LY Emblem"
                fill
                className="object-contain brightness-0 invert drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)]"
                priority
              />
            </div>

            {/* The Luxe Yatra Text Logo */}
            <div className="relative h-6 w-48 sm:h-7 sm:w-56">
              <Image
                src="/Img/logo-text-v3.png"
                alt="The Luxe Yatra"
                fill
                className="object-contain brightness-0 invert drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)]"
                priority
              />
            </div>
          </Link>
          <p className="mt-2 text-xs text-white max-w-md font-normal tracking-wide drop-shadow-xs">
            Curating extraordinary travel experiences and bespoke luxury stays around the globe.
          </p>
        </div>

        {/* MAIN DUMMY CONTENT GRID FOR FUTURE USE */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8">
          {/* DUMMY CONTACT / INFO BLOCK */}
          <div className="lg:col-span-2 flex flex-col gap-2">
            <h4 className="text-xs font-bold tracking-widest uppercase text-[#E6C687] drop-shadow-xs">
              Contact & Info Placeholder
            </h4>
            <p className="text-xs text-white leading-relaxed font-normal drop-shadow-xs">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. This is placeholder dummy text for company bio, address, or customer care details.
            </p>
            <div className="space-y-1 text-xs text-white pt-1 font-normal">
              <p className="text-white"><span className="font-semibold text-[#E6C687]">Phone:</span> +1 (800) 000-0000</p>
              <p className="text-white"><span className="font-semibold text-[#E6C687]">Email:</span> info@example.com</p>
              <p className="text-white"><span className="font-semibold text-[#E6C687]">Address:</span> 123 Luxury Way, Suite 100</p>
            </div>
          </div>

          {/* DUMMY NAVIGATION SECTIONS */}
          {DUMMY_FOOTER_SECTIONS.map((section, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <h4 className="text-xs font-bold tracking-widest uppercase text-[#E6C687] drop-shadow-xs">
                {section.title}
              </h4>
              <ul className="space-y-1">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <a
                      href={link.href}
                      className="text-xs text-white hover:text-[#E6C687] hover:underline transition-colors font-normal"
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
        <div className="border-t border-white/15 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-white font-normal">
          <p className="text-white">© {new Date().getFullYear()} The Luxe Yatra. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="text-white hover:underline hover:text-[#E6C687] transition-colors">Privacy Policy</a>
            <a href="#" className="text-white hover:underline hover:text-[#E6C687] transition-colors">Terms of Service</a>
            <a href="#" className="text-white hover:underline hover:text-[#E6C687] transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

