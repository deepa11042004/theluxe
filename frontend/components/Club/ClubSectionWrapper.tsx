"use client";
import React, { useState } from "react";
import Imagesec from "./Imagesec";
import Clubdetail from "./Clubdetail";

export default function ClubSectionWrapper() {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  return (
    <>
      <Imagesec 
        activeIndex={activeIndex} 
        setActiveIndex={setActiveIndex} 
        isCompareOpen={isCompareOpen}
        onToggleCompare={() => setIsCompareOpen(!isCompareOpen)}
      />
      <Clubdetail activeIndex={activeIndex} isCompareOpen={isCompareOpen} />
    </>
  );
}
