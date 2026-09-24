import React from "react";
import Joinsec from "@/components/Join/Joinsec";
import Heading from "@/components/Heading";
import FAQsec from "@/components/Club/FAQsec";
import BannerForm from "@/components/Club/BannerForm";

function Join() {
  return (
    <>
      <Heading 
        title="Join Luxe Club" 
        subtitle="Privileged Access • Elite Hospitality • Bespoke Worldwide Privileges"
        align="center"
        bgImage="/images/join_bg.jpg"
      />
      <Joinsec />
      <FAQsec />
      <BannerForm />
    </>
  );
}

export default Join;
