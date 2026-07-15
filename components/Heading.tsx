// components/Heading.tsx
import React from "react";

type HeadingProps = {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string; // Optional: for additional custom styling
};

const Heading: React.FC<HeadingProps> = ({
  title,
  subtitle,
  align = "center",
  className = "",
}) => {
  const alignmentClass = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  }[align];

  return (
    <div className="w-full bg-white pt-36 px-6 sm:px-12 lg:px-16">
      <div className={`max-w-7xl mx-auto flex flex-col mb-8 ${alignmentClass} ${className}`}>
        <h2 className="text-3xl md:text-8xl font-[Vera] tracking-tight text-black mb-4">
          {title}
        </h2>
        {subtitle && (
          <p className="text-neutral-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default Heading;

