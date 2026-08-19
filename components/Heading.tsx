// components/Heading.tsx
import React from "react";
import Image from "next/image";

type HeadingProps = {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string; // Optional: for additional custom styling
  bgImage?: string; // Optional: background image URL
};

const Heading: React.FC<HeadingProps> = ({
  title,
  subtitle,
  align = "center",
  className = "",
  bgImage,
}) => {
  const alignmentClass = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  }[align];

  const textColor = "text-black";
  const subtitleColor = bgImage ? "text-black font-bold" : "text-neutral-600";

  return (
    <div 
      className={`relative w-full pt-36 pb-16 px-6 sm:px-12 lg:px-16 bg-cover bg-center ${!bgImage ? 'bg-white' : 'overflow-hidden'}`}
      style={bgImage ? { backgroundImage: `url("${bgImage}")` } : undefined}
    >
      {bgImage && (
        <>
          <Image
            src={bgImage}
            alt="Heading Background"
            fill
            unoptimized
            className="object-cover object-center z-0"
            priority
          />
          <div className="absolute inset-0 bg-white/30 z-0" />
        </>
      )}
      <div className={`relative z-10 max-w-7xl mx-auto flex flex-col mb-8 ${alignmentClass} ${className}`}>
        <h2 className={`text-3xl md:text-8xl font-[Vera] tracking-tight mb-4 ${textColor}`}>
          {title}
        </h2>
        {subtitle && (
          <p 
            className={`text-sm md:text-base max-w-2xl mx-auto leading-relaxed ${subtitleColor}`}
            style={bgImage ? { WebkitTextStroke: "0.5px black" } : undefined}
          >
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default Heading;
