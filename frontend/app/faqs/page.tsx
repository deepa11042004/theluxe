import React from "react";
import Heading from "@/components/Heading";
import FAQsec from "@/components/Club/FAQsec";

export const metadata = {
  title: "Frequently Asked Questions - The Luxe Yatra",
  description: "Find answers to common questions about membership, bookings, itineraries, and concierge services.",
};

export default function FaqsPage() {
  return (
    <>
      <Heading
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about The Luxe Yatra memberships, stays, and privileges."
        align="center"
        bgClassName="bg-neutral-900 text-white"
      />
      <div className="py-8">
        <FAQsec />
      </div>
    </>
  );
}
