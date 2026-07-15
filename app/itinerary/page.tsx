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
      />
      <Itinerarysec />
    </>
  );
}

export default Itinerary;
