import React from "react";

export default function ClubIntro() {
  return (
    <section className="bg-white w-full overflow-hidden select-none">
      <div className="relative pt-24 pb-12 px-6 max-w-7xl mx-auto text-center z-10">
        <div className="absolute top-0 left-0 w-44 h-44 opacity-20 pointer-events-none select-none">
          <svg
            viewBox="0 0 100 100"
            className="stroke-neutral-300 fill-none stroke-[0.5]"
          >
            <path d="M0,0 Q30,70 100,100 M0,20 Q40,80 100,120 M0,40 Q50,90 100,140" />
          </svg>
        </div>

        {/* Micro-Header Tag */}
        <div className="text-sm tracking-[0.4em] text-black uppercase font-light mb-6">
          LUXE CLUB
        </div>

        {/* Luxury Serif Headline matching About section */}
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif tracking-tight text-black mb-4">
          A World of Privileged Access
        </h2>
        <p className="text-xl sm:text-2xl md:text-3xl font-serif font-light text-black uppercase tracking-wider mb-6">
          DISCOVER A WORLD OF PRIVILEGES
        </p>

        {/* Small Golden Vertical Divider */}
        <div className="flex justify-center my-6">
          <div className="w-[1.5px] h-12 md:h-16 bg-[#E39F25]/80"></div>
        </div>

        <p className="text-black text-sm sm:text-base xl:text-lg leading-relaxed tracking-wide max-w-3xl mx-auto">
          Luxe Club unlocks privileged access to 140+ premium resorts,
          offering 7 nights/8 days holidays every year — filled with cherished
          family moments and thoughtfully crafted experiences.
        </p>
      </div>
    </section>
  );
}
