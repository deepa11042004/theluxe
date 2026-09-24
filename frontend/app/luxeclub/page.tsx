import React from "react";
import Heading from "@/components/Heading";
import ClubSectionWrapper from "@/components/Club/ClubSectionWrapper";
import Statssec from "@/components/Club/Statssec";
import BannerForm from "@/components/Club/BannerForm";
import FAQsec from "@/components/Club/FAQsec";
import ClubIntro from "@/components/Club/ClubIntro";

export const metadata = {
  title: "The Luxe Club - Privileged Access | The Luxe Yatra",
  description:
    "Discover exclusive privileges, bespoke global itineraries, and private members-only hospitality with The Luxe Club.",
};

function clubelevate() {
  return (
    <>
      <Heading
        title="The Luxe Club"
        subtitle="Privileged Access • Elite Hospitality • Bespoke Worldwide Privileges"
        align="center"
        bgVideo="/club video.mp4"
      />
      <ClubIntro />
      <ClubSectionWrapper />
      <Statssec />
      <FAQsec />
      <BannerForm />
    </>
  );
}

export default clubelevate;

