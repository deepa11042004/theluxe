import React from "react";
import Heading from "@/components/Heading";
import Brandsec from "@/components/Brand/Brandsec";

export const metadata = {
  title: "Brands - The Luxe Yatra Worldwide Travels",
  description:
    "Explore our distinguished portfolio of luxury, premium, and select hotel and resort brands.",
};

export default function BrandsPage() {
  return (
    <main className="min-h-screen bg-[#F5F5F7]">
      <Heading
        title="Our Brand Portfolio"
        subtitle="Discover world-renowned luxury hotel brands, boutique retreats, and iconic resort destinations accessible with Club Elevate."
        align="center"
      />
      <Brandsec />
    </main>
  );
}
