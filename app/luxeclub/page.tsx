import React from "react";
import Imagesec from "@/components/Club/Imagesec";
import Clubdetail from "@/components/Club/Clubdetail";
import Statssec from "@/components/Club/Statssec";
import BannerForm from "@/components/Club/BannerForm";
import KeyDetails from "@/components/Club/KeyDetails";
import FAQsec from "@/components/Club/FAQsec";
function clubelevate() {
  return (
    <>
      <Imagesec />
      <Clubdetail />
      <Statssec />
      <KeyDetails />
      <FAQsec />
      <BannerForm />
    </>
  );
}

export default clubelevate;
