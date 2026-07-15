"use client";

import React from "react";
import Image from "next/image";
import Heading from "@/components/Heading";

export default function Imagesec() {
  return (
    <>
      {/* MOBILE HEADING */}
      <div className="block md:hidden">
        <Heading
          title="Club Elevate"
          subtitle="A World of Privileged Access"
        />
      </div>

      {/* DESKTOP BACKGROUND IMAGE */}
      <main className="hidden md:flex relative min-h-screen w-full bg-black text-white flex-col justify-between overflow-hidden select-none">
        {/* BACKGROUND IMAGE */}
        <div className="absolute inset-0 w-full h-full z-0 select-none pointer-events-none">
          <Image
            src="/Img/clubelevate.png"
            alt="Club Elevate"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </main>
    </>
  );
}
