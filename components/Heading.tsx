// components/Heading.tsx
import React from "react";
import Image from "next/image";

type HeadingProps = {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string; // Optional: for additional custom styling
  bgImage?: string; // Optional: background image URL
  bgClassName?: string; // Optional: to override bg-white
};

const Heading: React.FC<HeadingProps> = ({
  title,
  subtitle,
  align = "center",
  className = "",
  bgImage,
  bgClassName,
}) => {
  const alignmentClass = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  }[align];

  if (bgImage) {
    return (
      <div className="relative w-full h-screen min-h-screen pt-32 pb-16 px-6 sm:px-12 lg:px-16 overflow-hidden flex flex-col justify-center items-center group">
        <Image
          src={bgImage}
          alt={title}
          fill
          unoptimized
          className="object-cover object-center z-0"
          priority
        />


        <div className={`relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center ${className}`}>
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-[Vera] tracking-tight text-white leading-tight md:leading-tightest drop-shadow-[0_4px_20px_rgba(0,0,0,0.85)]">
            {title}
          </h1>

          {subtitle && (
            <div className="mt-8 md:mt-10">
              <p className="inline-block bg-black/40 backdrop-blur-md rounded-sm text-[10px] md:text-[11px] px-8 py-4 md:px-12 md:py-4 tracking-[0.25em] uppercase font-medium shadow-lg border border-white/20 text-white">
                {subtitle}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full pt-36 pb-16 px-6 sm:px-12 lg:px-16 ${bgClassName || "bg-white"}`}>
      <div className={`relative z-10 max-w-7xl mx-auto flex flex-col mb-8 ${alignmentClass} ${className}`}>
        <h2 className="text-3xl md:text-8xl font-[Vera] tracking-tight mb-4 text-black">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm md:text-base max-w-2xl leading-relaxed text-neutral-600">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default Heading;
