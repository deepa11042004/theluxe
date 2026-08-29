"use client";

import React from "react";

const FOOTER_LINKS = [
  {
    title: "About Us",
    links: [
      "Awards",
      "Career",
      "Company Overview",
      "Leadership",
      "Corporate Sustainability & CSR",
    ],
  },
  {
    title: "Blog",
    links: [
      "Experiences",
      "Places to Visit",
      "Things to Do",
      "For Kids",
      "Member Reviews",
      "Travel Guide",
    ],
  },
  {
    title: "Media",
    links: [
      "Press Releases",
      "Media Contacts",
      "In The News",
      "Partner with us",
    ],
  },
  {
    title: "Important Links",
    links: ["Community", "Magicstream", "Membership Reviews", "Membership"],
  },
];

export default function Footer() {
  return (
    <footer
      className="bg-[#B38E46] text-black pt-16 pb-8 px-6 sm:px-12 lg:px-16 w-full select-none border-t border-[#B38E46]"
      style={{ fontFamily: "var(--work-font), sans-serif" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* 1. TOP MAIN ROW: CUSTOMER SUPPORT + NAV LINKS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-x-8 gap-y-14 mb-14">
          {/* CUSTOMER SUPPORT BLOCK */}
          <div className="lg:col-span-2 flex flex-col items-start text-left">
            <h4 className="text-sm md:text-base font-bold tracking-wider uppercase mb-5 text-white" style={{ color: "#ffffff" }}>
              Customer Support
            </h4>

            <div className="space-y-3.5 text-xs sm:text-sm text-white leading-relaxed tracking-wide" style={{ color: "#ffffff" }}>
              <p style={{ color: "#ffffff" }}>
                <span className="font-bold text-white" style={{ color: "#ffffff" }}>New Memberships</span> - 1800 209 2345
              </p>
              <p className="text-[11px] sm:text-xs -mt-1 pl-0 text-white/90 font-normal" style={{ color: "rgba(255, 255, 255, 0.9)" }}>
                Monday to Sunday - IST - 9:00 AM to 9:00 PM
              </p>

              <p className="pt-1" style={{ color: "#ffffff" }}>
                <span className="font-bold text-white" style={{ color: "#ffffff" }}>
                  Existing members - India
                </span>{" "}
                - 022 6489 8899
              </p>

              <p style={{ color: "#ffffff" }}>
                <span className="font-bold text-white" style={{ color: "#ffffff" }}>
                  Existing members - International
                </span>{" "}
                - 022 69779501
              </p>
              <p className="text-[11px] sm:text-xs -mt-1 pl-0 text-white/90 font-normal" style={{ color: "rgba(255, 255, 255, 0.9)" }}>
                Monday to Sunday - IST - 7:00 AM to 12:00 PM
              </p>

              <p className="pt-1" style={{ color: "#ffffff" }}>
                <span className="font-bold text-white" style={{ color: "#ffffff" }}>Member Enquiries</span> -{" "}
                <a
                  href="mailto:memberexperience@The Luxe Yatratravels.com"
                  className="hover:text-black hover:underline transition-colors text-white"
                  style={{ color: "#ffffff" }}
                >
                  memberexperience@The Luxe Yatratravels.com
                </a>
              </p>

              <p style={{ color: "#ffffff" }}>
                <span className="font-bold text-white" style={{ color: "#ffffff" }}>Franchisee Enquiries</span>{" "}
                -{" "}
                <a
                  href="mailto:business.partner@The Luxe Yatratravels.com"
                  className="hover:text-black hover:underline transition-colors text-white"
                  style={{ color: "#ffffff" }}
                >
                  business.partner@The Luxe Yatratravels.com
                </a>
              </p>
            </div>
          </div>

          {/* FOOTER NAV LINKS */}
          {FOOTER_LINKS.map((group, idx) => (
            <div key={idx} className="flex flex-col items-start text-left lg:col-span-1">
              <h4 className="text-sm md:text-base font-bold tracking-wider uppercase mb-4 text-white" style={{ color: "#ffffff" }}>
                {group.title}
              </h4>
              <ul className="space-y-2.5">
                {group.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <a
                      href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-xs sm:text-sm text-white hover:text-black transition-colors duration-200 block font-normal tracking-wide"
                      style={{ color: "#ffffff" }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 3. LOWER SECTION: COPYRIGHT */}
        <div className="border-t border-white/20 pt-8 w-full flex items-center justify-center">
          <p className="text-xs sm:text-sm tracking-wide text-center text-white font-normal" style={{ color: "#ffffff" }}>
            Copyright © 2026 The Luxe Yatra Travels. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
