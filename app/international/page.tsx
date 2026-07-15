import React from "react";
import Experiencesec from "@/components/Experience/Experiencesec";
import Heading from "@/components/Heading";

export const metadata = {
  title: "International Experiences - The Luxe Yatra Worldwide Travels",
  description:
    "Embark on extraordinary global adventures and luxury international escapes.",
};

export default function InternationalExperiencesPage() {
  return (
    <>
      <Heading
        title="International"
        subtitle="Embark on an extraordinary journey to the world's most breathtaking global destinations."
        align="center"
      />
      <Experiencesec type="international" />
    </>
  );
}
