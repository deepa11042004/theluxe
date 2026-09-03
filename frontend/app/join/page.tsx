import React from "react";
import Joinsec from "@/components/Join/Joinsec";
import Heading from "@/components/Heading";
import FAQsec from "@/components/Club/FAQsec";
import BannerForm from "@/components/Club/BannerForm";

function Join() {
  return (
    <>
      <div style={{ backgroundImage: 'repeating-linear-gradient(45deg, #ffffff, #ffffff 20px, #f9f9f9 20px, #f9f9f9 40px)' }}>
        <Heading title="Join Luxe Club" bgClassName="bg-transparent" />
      </div>
      <Joinsec />
      <FAQsec />
      <BannerForm />
    </>
  );
}

export default Join;
