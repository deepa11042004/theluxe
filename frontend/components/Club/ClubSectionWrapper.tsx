"use client";
import React, { useState } from "react";
import Imagesec from "./Imagesec";
import Clubdetail from "./Clubdetail";

export default function ClubSectionWrapper() {
  const [activeIndex, setActiveIndex] = useState(1);

  return (
    <>
      <Imagesec activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
      <Clubdetail activeIndex={activeIndex} />
    </>
  );
}
