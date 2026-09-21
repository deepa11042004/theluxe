"use client";

import React, { useState } from "react";
import Heading from "@/components/Heading";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Mail, Briefcase, Headphones, Globe, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    type: "General Enquiry",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#F8F9FA] text-neutral-900">
      {/* HERO HEADING */}
      <Heading
        title="Contact Us"
        subtitle="Connect with The Luxe Yatra concierge and corporate team."
        align="center"
        bgImage="/Img/nature-photographer-29ezCWtMtnM-unsplash.jpg"
      />

      {/* MAIN CONTAINER */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-12 max-w-7xl mx-auto">
        
        {/* BRAND TAGLINE BANNER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 flex flex-col items-center"
        >
          {/* LY Emblem */}
          <div className="relative h-16 w-16 mb-4">
            <Image
              src="/Img/logo-emblem-v3.png"
              alt="The Luxe Yatra Emblem"
              fill
              className="object-contain"
            />
          </div>

          <div className="text-xs sm:text-sm tracking-[0.4em] text-[#E39F25] uppercase font-bold mb-3">
            TRAVEL • LIFESTYLE • PRIVILEGES
          </div>

          <h2 className="text-3xl md:text-5xl font-serif text-black max-w-3xl leading-tight">
            Your journey, elevated.
          </h2>

          <div className="w-24 h-[2px] bg-[#E39F25] mt-6"></div>
        </motion.div>

        {/* 3 LUXURY CONTACT CARDS - BRANDS PAGE STYLE */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          
          {/* CARD 1: CORPORATE OFFICE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white border border-neutral-200/90 shadow-sm hover:shadow-xl hover:border-[#E39F25] transition-all duration-300 flex flex-col overflow-hidden group"
          >
            <div className="bg-[rgb(25,25,112)] text-white py-4 px-6 flex items-center justify-between border-b border-[#E39F25]/30">
              <span className="text-sm font-light text-[#E39F25] tracking-[0.2em]">01</span>
              <h3 className="text-sm sm:text-base text-white uppercase font-medium tracking-[0.25em]">
                Corporate Office
              </h3>
              <MapPin className="w-4 h-4 text-[#E39F25]" />
            </div>
            
            <div className="p-8 flex flex-col justify-between flex-grow bg-[#FAFAFA] text-center items-center">
              <div className="p-4 bg-[#E39F25]/15 rounded-full text-[#E39F25] mb-6 group-hover:scale-110 transition-transform">
                <MapPin className="w-6 h-6" />
              </div>
              <p className="text-xs tracking-[0.2em] font-semibold uppercase text-[#E39F25] mb-2">Location</p>
              <h4 className="font-serif text-lg font-bold text-neutral-900 mb-3">THE LUXE YATRA</h4>
              <p className="text-sm text-neutral-600 leading-relaxed font-normal max-w-xs">
                293, Lane 2, Westend Marg<br />
                Saket, New Delhi – 110030, India
              </p>
            </div>
          </motion.div>

          {/* CARD 2: CORPORATE ENQUIRIES */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white border border-neutral-200/90 shadow-sm hover:shadow-xl hover:border-[#E39F25] transition-all duration-300 flex flex-col overflow-hidden group"
          >
            <div className="bg-[rgb(25,25,112)] text-white py-4 px-6 flex items-center justify-between border-b border-[#E39F25]/30">
              <span className="text-sm font-light text-[#E39F25] tracking-[0.2em]">02</span>
              <h3 className="text-sm sm:text-base text-white uppercase font-medium tracking-[0.25em]">
                Corporate Enquiries
              </h3>
              <Briefcase className="w-4 h-4 text-[#E39F25]" />
            </div>

            <div className="p-8 flex flex-col justify-between flex-grow bg-[#FAFAFA] text-center items-center">
              <div className="p-4 bg-[#E39F25]/15 rounded-full text-[#E39F25] mb-6 group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <p className="text-xs tracking-[0.2em] font-semibold uppercase text-[#E39F25] mb-2">Partnerships</p>
              <p className="text-xs text-neutral-500 leading-relaxed mb-4 min-h-[36px]">
                For business partnerships, corporate communication and general enquiries
              </p>
              <a
                href="mailto:sales@theluxeyatra.com"
                className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 hover:text-[#E39F25] transition-colors border-b border-neutral-300 hover:border-[#E39F25] pb-1"
              >
                sales@theluxeyatra.com
              </a>
            </div>
          </motion.div>

          {/* CARD 3: MEMBERSHIP & CONCIERGE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white border border-neutral-200/90 shadow-sm hover:shadow-xl hover:border-[#E39F25] transition-all duration-300 flex flex-col overflow-hidden group"
          >
            <div className="bg-[rgb(25,25,112)] text-white py-4 px-6 flex items-center justify-between border-b border-[#E39F25]/30">
              <span className="text-sm font-light text-[#E39F25] tracking-[0.2em]">03</span>
              <h3 className="text-sm sm:text-base text-white uppercase font-medium tracking-[0.25em]">
                Membership Desk
              </h3>
              <Headphones className="w-4 h-4 text-[#E39F25]" />
            </div>

            <div className="p-8 flex flex-col justify-between flex-grow bg-[#FAFAFA] text-center items-center">
              <div className="p-4 bg-[#E39F25]/15 rounded-full text-[#E39F25] mb-6 group-hover:scale-110 transition-transform">
                <Headphones className="w-6 h-6" />
              </div>
              <p className="text-xs tracking-[0.2em] font-semibold uppercase text-[#E39F25] mb-2">24/7 Concierge</p>
              <p className="text-xs text-neutral-500 leading-relaxed mb-4 min-h-[36px]">
                For membership assistance, hotel bookings, travel privileges and member support
              </p>
              <a
                href="mailto:info@theluxeyatra.com"
                className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 hover:text-[#E39F25] transition-colors border-b border-neutral-300 hover:border-[#E39F25] pb-1"
              >
                info@theluxeyatra.com
              </a>
            </div>
          </motion.div>

        </div>

        {/* WEBSITE LINK & MESSAGE FORM CONTAINER */}
        <div className="bg-white border border-neutral-200/90 shadow-sm overflow-hidden mb-16">
          <div className="bg-[rgb(25,25,112)] text-white py-5 px-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#E39F25]/30">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-[#E39F25]" />
              <h3 className="text-lg text-white font-serif tracking-wider">
                OFFICIAL PORTAL
              </h3>
            </div>
            <a
              href="https://www.theluxeyatra.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm font-bold tracking-[0.25em] text-[#E39F25] uppercase hover:underline"
            >
              www.theluxeyatra.com
            </a>
          </div>

          <div className="p-8 sm:p-12 bg-[#FAFAFA]">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <h3 className="text-2xl sm:text-3xl font-serif text-neutral-900 mb-2">
                  Send A Direct Inquiry
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500">
                  Our concierge team responds to all member inquiries within two hours.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 bg-green-50 border border-green-200 rounded-lg text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-green-600 mx-auto" />
                  <h4 className="text-xl font-serif text-neutral-900">Inquiry Received</h4>
                  <p className="text-sm text-neutral-600">
                    Thank you for contacting The Luxe Yatra. A member of our concierge desk will be in touch with you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter your name"
                        className="w-full px-4 py-3 bg-white border border-neutral-300 text-sm focus:outline-none focus:border-[#E39F25]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="yourname@domain.com"
                        className="w-full px-4 py-3 bg-white border border-neutral-300 text-sm focus:outline-none focus:border-[#E39F25]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-2">
                        Contact Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 bg-white border border-neutral-300 text-sm focus:outline-none focus:border-[#E39F25]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-2">
                        Department / Inquiry Type
                      </label>
                      <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full px-4 py-3 bg-white border border-neutral-300 text-sm focus:outline-none focus:border-[#E39F25]"
                      >
                        <option value="General Enquiry">Corporate & General Enquiry (sales@theluxeyatra.com)</option>
                        <option value="Membership & Concierge">Membership & Concierge (info@theluxeyatra.com)</option>
                        <option value="Hotel Booking">Hotel & Resort Booking</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-2">
                      Message / Request Details *
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Specify your travel requirements, membership questions, or corporate inquiry..."
                      className="w-full px-4 py-3 bg-white border border-neutral-300 text-sm focus:outline-none focus:border-[#E39F25]"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#E39F25] hover:bg-[#430021] text-white font-semibold text-sm uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" /> Send Inquiry
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* BOTTOM INDIGO VERTICAL LINE - MATCHES BRANDS PAGE */}
        <div className="flex justify-center mt-12">
          <div className="w-[1.5px] h-24 bg-[rgb(25,25,112)]"></div>
        </div>

      </section>
    </main>
  );
}
