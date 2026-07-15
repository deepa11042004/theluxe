import React from "react";
import Experiencesec from "@/components/Experience/Experiencesec";
import Heading from "@/components/Heading";

export const metadata = {
  title: "Experiences - The Luxe Yatra Worldwide Travels",
  description:
    "Explore curated national and international luxury experiences with The Luxe Yatra.",
};

export default function ExperiencesPage() {
  return (
    <>
      <Heading
        title="Experiences"
        subtitle="Discover curated journeys, luxury retreats, and unforgettable experiences across the globe."
        align="center"
      />
      <Experiencesec type="all" />
    </>
  );
}
