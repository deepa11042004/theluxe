"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const FAQ_DATA = [
  {
    number: "01",
    question: "What is The Luxe Yatra?",
    answer: "The Luxe Yatra is a private travel and lifestyle club designed for travellers who value premium hospitality, curated experiences and exclusive travel privileges. Our membership brings luxury stays, travel services and lifestyle benefits together under one membership.",
  },
  {
    number: "02",
    question: "Is The Luxe Yatra a timeshare?",
    answer: "No. The Luxe Yatra is not a timeshare. There is no property ownership, fixed accommodation allocation or traditional timeshare commitment. Our membership is designed to offer flexibility in choosing your destination, hotel and travel dates.",
  },
  {
    number: "03",
    question: "How does The Luxe Yatra membership work?",
    answer: "Simply become a member, choose your destination and preferred travel dates, and share your requirements with our Member Services team. We will help you explore eligible properties and applicable member benefits before your booking is confirmed.",
  },
  {
    number: "04",
    question: "What benefits do I receive as a member?",
    answer: "Depending on your selected membership plan, benefits may include access to preferred hotel rates, luxury hotel offers, complimentary Stay Vouchers, curated holidays and selected travel and lifestyle services.",
  },
  {
    number: "05",
    question: "What kind of hotels can I access?",
    answer: "Members can access a portfolio of 10,000+ luxury hotels worldwide, across 100+ hotel brands and hospitality collections, subject to destination, availability and applicable membership benefits.",
  },
  {
    number: "06",
    question: "Which hotel brands are available?",
    answer: "Our portfolio may include properties associated with leading hospitality brands and collections such as Marriott, JW Marriott, Sheraton, Westin, Le Méridien, Hilton, Conrad, Hyatt, Grand Hyatt, InterContinental, Crowne Plaza, Radisson, Radisson Blu, Novotel, Mercure, Pullman, Taj Hotels, ITC Hotels, The Oberoi, The Leela and many other premium properties.\n\nHotel availability, participation and applicable benefits vary by property, destination and travel dates.",
  },
  {
    number: "07",
    question: "Do I receive complimentary hotel stays?",
    answer: "The Luxe Yatra does not provide complimentary hotel nights. However, eligible membership plans may include a complimentary Stay Voucher that can be redeemed against an eligible hotel booking.\n\nThe Stay Voucher is applicable when the member completes the minimum required stay of 2–3 nights, depending on the applicable voucher and property. Voucher value, validity, participating properties and redemption conditions apply.",
  },
  {
    number: "08",
    question: "Is the Stay Voucher really complimentary?",
    answer: "Yes. The Stay Voucher is provided as a membership benefit at no additional cost, subject to its applicable terms and conditions.\n\nThe hotel booking remains subject to the applicable room rate, minimum-stay requirement, taxes, availability and other booking conditions.",
  },
  {
    number: "09",
    question: "Can I choose my preferred hotel?",
    answer: "Yes. You can share your preferred hotel, destination, dates and room requirements with our Member Services team. We will check availability and applicable member benefits and, where required, suggest suitable alternatives.",
  },
  {
    number: "10",
    question: "Can I use my membership for international travel?",
    answer: "Yes. Eligible membership plans can provide access to selected international destinations and luxury hotels worldwide.",
  },
  {
    number: "11",
    question: "Are bookings subject to availability?",
    answer: "Yes. All bookings are subject to availability. Certain properties may also have blackout dates, peak-season restrictions, minimum-stay requirements or special event conditions.",
  },
  {
    number: "12",
    question: "Can my family or guests use my membership?",
    answer: "Eligible family travel can be accommodated under the applicable membership terms. Guest booking privileges depend on the selected membership plan and its applicable conditions.",
  },
  {
    number: "13",
    question: "What other travel services are available?",
    answer: "Depending on your requirements and membership plan, The Luxe Yatra may assist with flights, airport transfers, visa assistance, travel insurance, cruises, curated holidays, dining experiences and other lifestyle services.",
  },
  {
    number: "14",
    question: "Will I know the applicable charges before booking?",
    answer: "Yes. Before confirming a booking, members will be informed of applicable room rates, taxes, minimum-stay requirements, Stay Voucher conditions and any additional charges, wherever applicable.",
  }
];

export default function FAQsec() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-white text-neutral-900 border-t border-neutral-200 py-24 px-6 w-full flex flex-col items-center select-none">
      <div className="max-w-5xl mx-auto w-full flex flex-col items-center">
        {/* Section Header */}
        <div className="text-center flex flex-col items-center mb-14">
          <div className="text-sm tracking-[0.4em] text-black uppercase font-light mb-6">
            HELP & INFORMATION
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif tracking-tight text-black mb-4">
            Frequently Asked Questions
          </h2>
          <p className="font-[Vera] text-xs md:text-sm max-w-xl leading-relaxed text-neutral-600 tracking-wide">
            Find detailed answers regarding Luxe Club memberships, resort portfolios, vouchers, and travel privileges.
          </p>
        </div>

        {/* FAQ Accordion Container */}
        <div className="border border-neutral-200 rounded-none overflow-hidden bg-white shadow-sm w-full">
          {FAQ_DATA.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border-b border-neutral-200 last:border-b-0"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className={`w-full flex items-center justify-between p-6 md:p-7 text-left transition-colors group cursor-pointer ${
                    isOpen ? "bg-[rgb(25,25,112)] text-white" : "bg-white hover:bg-neutral-50/80 text-neutral-900"
                  }`}
                >
                  <div className="flex items-center gap-4 md:gap-6 pr-4">
                    <span className="text-xs md:text-sm font-[Vera] font-bold shrink-0 text-[#B38E46]">
                      {faq.number}.
                    </span>
                    <span
                      className={`text-base md:text-lg font-[Vera] font-semibold transition-colors ${
                        isOpen
                          ? "text-white font-bold"
                          : "text-neutral-900 group-hover:text-[#B38E46]"
                      }`}
                    >
                      {faq.question}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="shrink-0 ml-4 p-1 text-[#B38E46]"
                  >
                    <ChevronDown className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.75} />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 md:px-7 md:pb-7 pt-4 text-neutral-800 font-[Vera] font-medium text-xs md:text-sm xl:text-base leading-relaxed tracking-wide whitespace-pre-line border-t border-neutral-100 bg-neutral-50/40">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Indigo Vertical Divider below FAQ section */}
        <div className="flex justify-center mt-12 md:mt-16">
          <div className="w-[1.5px] h-12 md:h-16 bg-[rgb(25,25,112)]"></div>
        </div>
      </div>
    </section>
  );
}
