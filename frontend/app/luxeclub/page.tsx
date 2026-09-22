import React from "react";
import Heading from "@/components/Heading";
import Imagesec from "@/components/Club/Imagesec";
import Clubdetail from "@/components/Club/Clubdetail";
import Statssec from "@/components/Club/Statssec";
import BannerForm from "@/components/Club/BannerForm";
import FAQsec from "@/components/Club/FAQsec";

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
        bgImage="/Img/header 2/5c716b4078feb1e772b398f47f86da64ae5c54a3-3840x1860.avif"
      />
      <Imagesec />
      <Clubdetail />
      <Statssec />
      <FAQsec />
      <BannerForm />
    </>
  );
}

export default clubelevate;

