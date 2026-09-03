import React from "react";
import Itinerarysec from "@/components/Itinerary/Itinerarysec";
import Heading from "@/components/Heading";

function Itinerary() {
  return (
    <>
      <Heading
        title="Exclusive Itinerary"
        subtitle="Explore the world's most enchanting destinations with our curated collection of travel itineraries."
        align="center"
        bgImage="/Img/ricardo-gomez-angel-bIm4Bm4UZv0-unsplash.jpg"
      />
      <Itinerarysec />
    </>
  );
}

export default Itinerary;
