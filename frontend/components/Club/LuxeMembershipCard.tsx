"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export type CardTier = "signature" | "diamond" | "imperial";

interface LuxeMembershipCardProps {
  tier: CardTier | string;
  title?: string;
  membershipNo?: string;
  className?: string;
}

const TIER_CONFIG: Record<
  string,
  {
    title: string;
    membershipNo: string;
    bgStyle: string;
    glowStyle: string;
  }
> = {
  signature: {
    title: "LUXE SIGNATURE",
    membershipNo: "LY100001",
    bgStyle:
      "radial-gradient(ellipse 95% 75% at 50% 35%, #420314 0%, #250109 55%, #100004 100%)",
    glowStyle: "rgba(227, 63, 85, 0.12)",
  },
  domestic: {
    title: "LUXE SIGNATURE",
    membershipNo: "LY100001",
    bgStyle:
      "radial-gradient(ellipse 95% 75% at 50% 35%, #420314 0%, #250109 55%, #100004 100%)",
    glowStyle: "rgba(227, 63, 85, 0.12)",
  },
  diamond: {
    title: "LUXE PRESTIGE",
    membershipNo: "LY100002",
    bgStyle:
      "radial-gradient(ellipse 95% 75% at 50% 35%, #08224d 0%, #04132e 55%, #010714 100%)",
    glowStyle: "rgba(59, 130, 246, 0.12)",
  },
  worldwide: {
    title: "LUXE PRESTIGE",
    membershipNo: "LY100002",
    bgStyle:
      "radial-gradient(ellipse 95% 75% at 50% 35%, #08224d 0%, #04132e 55%, #010714 100%)",
    glowStyle: "rgba(59, 130, 246, 0.12)",
  },
  imperial: {
    title: "LUXE BLACK - LIMITED EDITION",
    membershipNo: "LY100003",
    bgStyle:
      "radial-gradient(ellipse 95% 75% at 50% 35%, #06311d 0%, #031b10 55%, #010d07 100%)",
    glowStyle: "rgba(16, 185, 129, 0.12)",
  },
  lifetime: {
    title: "LUXE BLACK - LIMITED EDITION",
    membershipNo: "LY100003",
    bgStyle:
      "radial-gradient(ellipse 95% 75% at 50% 35%, #06311d 0%, #031b10 55%, #010d07 100%)",
    glowStyle: "rgba(16, 185, 129, 0.12)",
  },
};

export default function LuxeMembershipCard({
  tier = "signature",
  title,
  membershipNo,
  className = "",
}: LuxeMembershipCardProps) {
  const normalizedTier = tier.toLowerCase();
  const config = TIER_CONFIG[normalizedTier] || TIER_CONFIG.signature;
  const displayTitle = title || config.title;
  const displayNo = membershipNo || config.membershipNo;

  return (
    <div
      className={`relative w-full aspect-[1.58/1] rounded-[1.25rem] sm:rounded-[1.5rem] md:rounded-[1.75rem] p-[2px] sm:p-[2.5px] md:p-[3px] transition-transform duration-500 shadow-xl ${className}`}
      style={{
        background:
          "linear-gradient(135deg, #ECC86A 0%, #FBE99C 25%, #9E7418 50%, #FFEAA0 75%, #A87A1E 100%)",
      }}
    >
      {/* Inner Card Container */}
      <div
        className="relative w-full h-full rounded-[1.12rem] sm:rounded-[1.35rem] md:rounded-[1.6rem] p-3.5 sm:p-4 md:p-5 flex flex-col justify-between overflow-hidden select-none"
        style={{
          background: config.bgStyle,
        }}
      >
        {/* Subtle Luxury Sheen Highlights */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay"
          style={{
            backgroundImage:
              "radial-gradient(circle at 50% 0%, rgba(255, 240, 180, 0.3) 0%, transparent 65%)",
          }}
        />

        {/* TOP & CENTER: Logo + Brand Name + Tagline */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center pt-1 sm:pt-1.5">
          {/* Circular LY Emblem */}
          <div className="relative w-9 h-9 sm:w-11 sm:h-11 md:w-13 md:h-13 lg:w-14 lg:h-14 mb-1 sm:mb-1.5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
            <Image
              src="/Img/logo-emblem-v3.png"
              alt="The Luxe Yatra Emblem"
              fill
              sizes="(max-width: 640px) 44px, (max-width: 768px) 52px, 64px"
              className="object-contain"
              priority
            />
          </div>

          {/* THE LUXE YATRA Wordmark (Single Line) */}
          <h3
            className="font-serif text-[11px] sm:text-xs md:text-sm lg:text-base xl:text-[1.15rem] tracking-[0.22em] sm:tracking-[0.25em] md:tracking-[0.28em] uppercase font-normal leading-tight whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
            style={{
              background:
                "linear-gradient(180deg, #FFF6D1 0%, #ECC86A 50%, #C29629 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            THE LUXE YATRA
          </h3>

          {/* Tagline: TRAVEL • LIFESTYLE • PRIVILEGES (Single Line) */}
          <p
            className="text-[6px] sm:text-[7px] md:text-[8px] lg:text-[9px] tracking-[0.25em] sm:tracking-[0.3em] md:tracking-[0.35em] uppercase font-light mt-0.5 sm:mt-1 whitespace-nowrap"
            style={{
              color: "#E8C76A",
            }}
          >
            TRAVEL &bull; LIFESTYLE &bull; PRIVILEGES
          </p>
        </div>

        {/* BOTTOM ROW: Tier Title (Left) + Membership No (Right) */}
        <div className="relative z-10 flex items-end justify-between w-full mt-auto pb-0.5 sm:pb-1 px-1">
          {/* Bottom Left: Tier Name */}
          <div className="flex flex-col text-left">
            <span
              className="font-serif text-[9px] sm:text-[11px] md:text-xs lg:text-sm xl:text-[0.95rem] tracking-[0.2em] sm:tracking-[0.24em] uppercase font-normal leading-none whitespace-nowrap"
              style={{
                background:
                  "linear-gradient(180deg, #FFF6D1 0%, #ECC86A 50%, #B88B22 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {displayTitle}
            </span>
          </div>

          {/* Bottom Right: Gold Divider + Membership No */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 md:gap-3">
            {/* Vertical Divider */}
            <div
              className="w-[1px] sm:w-[1.5px] h-5 sm:h-6 md:h-7 opacity-80"
              style={{
                background:
                  "linear-gradient(180deg, transparent 0%, #ECC86A 50%, transparent 100%)",
              }}
            />

            {/* Membership Label & Value */}
            <div className="flex flex-col text-left justify-center">
              <span
                className="text-[5px] sm:text-[6px] md:text-[7px] lg:text-[7.5px] tracking-[0.22em] uppercase font-medium leading-tight whitespace-nowrap"
                style={{
                  color: "#D8B452",
                }}
              >
                MEMBERSHIP NO.
              </span>
              <span
                className="font-serif text-[8px] sm:text-[9.5px] md:text-[11px] lg:text-xs tracking-[0.2em] font-normal leading-tight mt-0.5 whitespace-nowrap"
                style={{
                  color: "#FFF1B5",
                  textShadow: "0 1px 3px rgba(0,0,0,0.8)",
                }}
              >
                {displayNo}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
