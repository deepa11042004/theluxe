import React from "react";
import ResortSec from "@/components/Resort/Resortsec";
import Heading from "@/components/Heading";

export const metadata = {
  title: "India - Top 50 Luxury Hotels | The Luxe Yatra",
  description:
    "Discover India's Top 50 luxury hotels, palatial sanctuaries, and retreats.",
};

export default function NationalExperiencesPage() {
  return (
    <>
      <Heading
        title="India"
        subtitle="Top 50 Luxury Hotels & Sanctuaries Nestled Across India."
        align="center"
        bgImage="/Img/abhishek-r-sT9zI42WgAc-unsplash.jpg"
      />
      <ResortSec initialCategory="NATIONAL" />
    </>
  );
}
