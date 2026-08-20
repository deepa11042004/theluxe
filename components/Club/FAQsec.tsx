"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQ_DATA = [
  {
    question: "01. What is The Luxe Yatra?",
    answer: "The Luxe Yatra is a private travel and lifestyle club designed for travellers who value premium hospitality, curated experiences and exclusive travel privileges. Our membership brings luxury stays, travel services and lifestyle benefits together under one membership.",
  },
  {
    question: "02. Is The Luxe Yatra a timeshare?",
    answer: "No. The Luxe Yatra is not a timeshare. There is no property ownership, fixed accommodation allocation or traditional timeshare commitment. Our membership is designed to offer flexibility in choosing your destination, hotel and travel dates.",
  },
  {
    question: "03. How does The Luxe Yatra membership work?",
    answer: "Simply become a member, choose your destination and preferred travel dates, and share your requirements with our Member Services team. We will help you explore eligible properties and applicable member benefits before your booking is confirmed.",
  },
  {
    question: "04. What benefits do I receive as a member?",
    answer: "Depending on your selected membership plan, benefits may include access to preferred hotel rates, luxury hotel offers, complimentary Stay Vouchers, curated holidays and selected travel and lifestyle services.",
  },
  {
    question: "05. What kind of hotels can I access?",
    answer: "Members can access a portfolio of 10,000+ luxury hotels worldwide, across 100+ hotel brands and hospitality collections, subject to destination, availability and applicable membership benefits.",
  },
  {
    question: "06. Which hotel brands are available?",
    answer: "Our portfolio may include properties associated with leading hospitality brands and collections such as Marriott, JW Marriott, Sheraton, Westin, Le Méridien, Hilton, Conrad, Hyatt, Grand Hyatt, InterContinental, Crowne Plaza, Radisson, Radisson Blu, Novotel, Mercure, Pullman, Taj Hotels, ITC Hotels, The Oberoi, The Leela and many other premium properties.\n\nHotel availability, participation and applicable benefits vary by property, destination and travel dates.",
  },
  {
    question: "07. Do I receive complimentary hotel stays?",
    answer: "The Luxe Yatra does not provide complimentary hotel nights. However, eligible membership plans may include a complimentary Stay Voucher that can be redeemed against an eligible hotel booking.\n\nThe Stay Voucher is applicable when the member completes the minimum required stay of 2–3 nights, depending on the applicable voucher and property. Voucher value, validity, participating properties and redemption conditions apply.",
  },
  {
    question: "08. Is the Stay Voucher really complimentary?",
    answer: "Yes. The Stay Voucher is provided as a membership benefit at no additional cost, subject to its applicable terms and conditions.\n\nThe hotel booking remains subject to the applicable room rate, minimum-stay requirement, taxes, availability and other booking conditions.",
  },
  {
    question: "09. Can I choose my preferred hotel?",
    answer: "Yes. You can share your preferred hotel, destination, dates and room requirements with our Member Services team. We will check availability and applicable member benefits and, where required, suggest suitable alternatives.",
  },
  {
    question: "10. Can I use my membership for international travel?",
    answer: "Yes. Eligible membership plans can provide access to selected international destinations and luxury hotels worldwide.",
  },
  {
    question: "11. Are bookings subject to availability?",
    answer: "Yes. All bookings are subject to availability. Certain properties may also have blackout dates, peak-season restrictions, minimum-stay requirements or special event conditions.",
  },
  {
    question: "12. Can my family or guests use my membership?",
    answer: "Eligible family travel can be accommodated under the applicable membership terms. Guest booking privileges depend on the selected membership plan and its applicable conditions.",
  },
  {
    question: "13. What other travel services are available?",
    answer: "Depending on your requirements and membership plan, The Luxe Yatra may assist with flights, airport transfers, visa assistance, travel insurance, cruises, curated holidays, dining experiences and other lifestyle services.",
  },
  {
    question: "14. Will I know the applicable charges before booking?",
    answer: "Yes. Before confirming a booking, members will be informed of applicable room rates, taxes, minimum-stay requirements, Stay Voucher conditions and any additional charges, wherever applicable.",
  }
];

export default function FAQsec() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-neutral-50 text-neutral-900 py-24 px-6 w-full flex flex-col items-center">
      <div className="max-w-4xl mx-auto w-full">
        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-[Vera] tracking-tight text-center mb-16 text-neutral-900">
          Frequently Asked Questions
        </h2>

        {/* FAQ Accordion Container */}
        <div className="border border-neutral-200 rounded-2xl overflow-hidden bg-white shadow-sm">
          <div className="w-full">
            {FAQ_DATA.map((faq, idx) => (
              <div
                key={idx}
                className="border-b border-neutral-200 last:border-b-0"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-neutral-50 transition-colors"
                >
                  <span className="text-lg font-[Vera] font-semibold text-neutral-900 pr-4">
                    {faq.question}
                  </span>
                  <motion.span
                    animate={{ rotate: openIndex === idx ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-neutral-500 text-2xl font-light shrink-0 ml-4"
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
                      <div className="p-6 text-neutral-800 font-[Vera] font-medium text-sm xl:text-base leading-relaxed tracking-wide border-t border-neutral-100 whitespace-pre-line bg-white">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
