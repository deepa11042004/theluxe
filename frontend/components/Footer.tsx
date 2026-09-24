"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { FaInstagram, FaFacebookF, FaWhatsapp } from "react-icons/fa";



export default function Footer() {
  return (
    <footer
      className="text-white pt-10 pb-6 px-6 sm:px-12 lg:px-16 w-full select-none relative overflow-hidden bg-[#E39F25]"
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
                <p>+91 8796605843</p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5" />
                <p>concierge@theluxeyatra.com</p>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold uppercase tracking-wider text-[10px]">Corporate Office</p>
                  <p>293, Lane 2, Westend Marg,<br />Saket, New Delhi – 110030</p>
                </div>
              </div>
            </div>


          </div>

          {/* NAVIGATION SECTIONS */}
          <div className="flex flex-col gap-2">
            <h4 className="text-base sm:text-lg font-bold tracking-wider uppercase text-white mb-2">
              Quick Links
            </h4>
            <ul className="space-y-1.5">
              <li><Link href="/" className="text-[11px] text-white hover:underline transition-colors font-normal opacity-95 hover:opacity-100">Home</Link></li>
              <li><Link href="/about" className="text-[11px] text-white hover:underline transition-colors font-normal opacity-95 hover:opacity-100">Why The Luxe Yatra</Link></li>
              <li><Link href="/luxeclub" className="text-[11px] text-white hover:underline transition-colors font-normal opacity-95 hover:opacity-100">Luxe Club</Link></li>
              <li><Link href="/brands" className="text-[11px] text-white hover:underline transition-colors font-normal opacity-95 hover:opacity-100">Luxury Hotels Brand</Link></li>
              <li><Link href="/join" className="text-[11px] text-white hover:underline transition-colors font-normal opacity-95 hover:opacity-100">How Membership Work</Link></li>
              <li><Link href="/faqs" className="text-[11px] text-white hover:underline transition-colors font-normal opacity-95 hover:opacity-100">FAQs</Link></li>
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="text-base sm:text-lg font-bold tracking-wider uppercase text-white mb-2">
              Support
            </h4>
            <ul className="space-y-1.5">
              <li><Link href="/contact" className="text-[11px] text-white hover:underline transition-colors font-normal opacity-95 hover:opacity-100">Customer Care</Link></li>
              <li><Link href="/experiences" className="text-[11px] text-white hover:underline transition-colors font-normal opacity-95 hover:opacity-100">Book A Holiday</Link></li>
              <li><Link href="/privacy-policy" className="text-[11px] text-white hover:underline transition-colors font-normal opacity-95 hover:opacity-100">Privacy Policy</Link></li>
              <li><Link href="/terms-and-conditions" className="text-[11px] text-white hover:underline transition-colors font-normal opacity-95 hover:opacity-100">Term & Conditions</Link></li>
              <li><Link href="/cancellation-policy" className="text-[11px] text-white hover:underline transition-colors font-normal opacity-95 hover:opacity-100">Cancellation & Refund Policy</Link></li>
              <li><Link href="/contact" className="text-[11px] text-white hover:underline transition-colors font-normal opacity-95 hover:opacity-100">Contact us</Link></li>
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="text-base sm:text-lg font-bold tracking-wider uppercase text-white mb-2">
              Follow us
            </h4>
            <div className="flex items-center gap-4 pt-1">
              <a href="https://wa.me/918796605843" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity"><FaWhatsapp className="w-5 h-5" /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity"><FaInstagram className="w-5 h-5" /></a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity"><FaFacebookF className="w-5 h-5" /></a>
            </div>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT & DUMMY LEGAL LINKS */}
        <div className="border-t border-white/25 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-white font-normal">
          <p>© {new Date().getFullYear()} The Luxe Yatra. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy-policy" className="hover:underline transition-colors">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:underline transition-colors">Terms of Service</Link>
            <Link href="/privacy-policy" className="hover:underline transition-colors">Cookie Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
