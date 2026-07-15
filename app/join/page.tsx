import React from "react";
import Joinsec from "@/components/Join/Joinsec";
import Heading from "@/components/Heading";
import FAQsec from "@/components/Club/FAQsec";
import BannerForm from "@/components/Club/BannerForm";

function Join() {
  return (
    <>
      <Heading title="Join Club Elevate" className="" />
      <Joinsec />
      <FAQsec />
      <BannerForm />
    </>
  );
}

export default Join;
