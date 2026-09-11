import React from "react";
import ResortSec from "@/components/Resort/Resortsec";
import Heading from "@/components/Heading";

export const metadata = {
  title: "International - Top 50 Luxury Hotels | The Luxe Yatra",
  description:
    "Embark on extraordinary global adventures and Top 50 luxury international retreats.",
};

export default function InternationalExperiencesPage() {
  return (
    <>
      <Heading
        title="International"
        subtitle="Top 50 International Luxury Hotels & Breathtaking Global Destinations."
        align="center"
        bgImage="/Img/anthony-delanoix-QAwciFlS1g4-unsplash.jpg"
      />
      <ResortSec initialCategory="INTERNATIONAL" />
    </>
  );
}
