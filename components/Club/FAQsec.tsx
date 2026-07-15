"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQ_DATA = {
  "Club Elevate": [
    {
      question:
        "How do I know which Club Elevate Programme fits my family best?",
      answer:
        "Our team will help you choose based on your travel frequency, preferred seasons, and family size. EBONY offers year-round access, IVORY covers peak seasons, and JADE is ideal for off-peak travelers.",
    },
    {
      question:
        "What are the tenure options available in the Club Elevate Programme? Are they fixed, or can I upgrade or downgrade tenures?",
      answer:
        "Tenure options vary by plan. You can typically upgrade or downgrade during renewal periods, subject to availability and terms. Contact our membership desk for personalized guidance.",
    },
    {
      question: "What's the difference between JADE, IVORY, and EBONY Keys?",
      answer:
        "EBONY: 52 weeks/year access. IVORY: 46 weeks (excludes peak). JADE: 24 weeks (off-peak only). Each key unlocks different benefits and pricing tiers.",
    },
    {
      question: "Why should I become a Club Elevate member?",
      answer:
        "Enjoy guaranteed holidays every year, future-proof pricing, complimentary breakfasts, resort discounts, and exclusive experiences — all designed for seamless family getaways.",
    },
    {
      question: "Can I exit at any time?",
      answer:
        "Exit policies depend on your tenure and contract type. Early exits may incur fees. We recommend discussing your options with our customer success team before making changes.",
    },
  ],
  upgrade: [
    {
      question: "Can I upgrade from JADE to IVORY or EBONY?",
      answer:
        "Yes! Upgrades are possible during renewal cycles. You’ll pay the difference in membership cost and gain additional weeks/access.",
    },
    {
      question: "Is there a fee to upgrade?",
      answer:
        "Upgrading may involve a prorated fee based on remaining tenure and new plan value. No hidden charges — we’ll provide a clear breakdown.",
    },
  ],
  newMembership: [
    {
      question: "How do I start as a new member?",
      answer:
        "Fill out the inquiry form, speak with an advisor, select your Key type, complete documentation, and make payment. Your journey begins within 7–10 business days.",
    },
    {
      question: "Do I need to book immediately after joining?",
      answer:
        "No! You have up to 4 months to book your first holiday. Plan ahead and secure your favorite resorts early.",
    },
  ],
  bookingRules: [
    {
      question: "How far in advance can I book?",
      answer:
        "You can book up to 4 months in advance. Bookings are confirmed on a first-come, first-served basis.",
    },
    {
      question: "Can I cancel or modify my booking?",
      answer:
        "Modifications are allowed up to 30 days before check-in. Cancellations may incur fees depending on timing and season.",
    },
  ],
};

export default function FAQsec() {
  const [activeTab, setActiveTab] = useState<
    "Club Elevate" | "upgrade" | "newMembership" | "bookingRules"
  >("Club Elevate");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const tabs = [
    { id: "Club Elevate", label: "Club Elevate" },
    { id: "upgrade", label: "Upgrade" },
    { id: "newMembership", label: "New Membership" },
    { id: "bookingRules", label: "Booking Rules" },
  ];

  const currentFAQs = FAQ_DATA[activeTab];

  // 👇 FIXED HEIGHT SECTION — prevents layout jump
  return (
    <section className="bg-black text-white py-20 px-6 w-full min-h-200 flex flex-col items-center">
      <div className="max-w-4xl mx-auto w-full">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-[Vera] tracking-tight text-center mb-12">
          Got Any Questions?
        </h2>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-3 mb-10 justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                setActiveTab(tab.id as any);
                setOpenIndex(null);
              }}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${
                activeTab === tab.id
                  ? "bg-white text-black border-white"
                  : "bg-transparent text-neutral-400 border-neutral-700 hover:border-neutral-500 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* FAQ Accordion Container — NO fixed height here */}
        <div className="border border-neutral-800 rounded-2xl overflow-hidden bg-neutral-900/30">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              {currentFAQs.map((faq, idx) => (
                <div
                  key={idx}
                  className="border-b border-neutral-800 last:border-b-0"
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-neutral-800/50 transition-colors"
                  >
                    <span className="text-lg font-medium text-neutral-200 pr-4">
                      {faq.question}
                    </span>
                    <motion.span
                      animate={{ rotate: openIndex === idx ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-neutral-400 text-2xl font-light"
                    >
                      +
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {openIndex === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 text-neutral-400 text-base leading-relaxed border-t border-neutral-800/50">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
