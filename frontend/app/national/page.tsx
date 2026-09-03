import React from "react";
import Experiencesec from "@/components/Experience/Experiencesec";
import Heading from "@/components/Heading";

export const metadata = {
  title: "National Experiences - The Luxe Yatra Worldwide Travels",
  description:
    "Discover premium luxury retreats and domestic travel experiences.",
};

export default function NationalExperiencesPage() {
  return (
    <>
      <Heading
        title="National"
        subtitle="Unveil exceptional domestic sanctuaries and cultural escapes nestled close to home."
        align="center"
        bgImage="/Img/abhishek-r-sT9zI42WgAc-unsplash.jpg"
      />
      <Experiencesec type="national" />
    </>
  );
}
