import React from "react";
import Heading from "@/components/Heading";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export const metadata = {
  title: "Contact Us - The Luxe Yatra",
  description: "Get in touch with The Luxe Yatra concierge team for bespoke luxury travel, inquiries, and support.",
};

export default function ContactPage() {
  return (
    <>
      <Heading
        title="Contact Us"
        subtitle="Reach out to our global concierge team to curate your next extraordinary journey."
        align="center"
        bgImage="/Img/nature-photographer-29ezCWtMtnM-unsplash.jpg"
      />
      <section className="py-20 px-6 sm:px-12 lg:px-16 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="flex flex-col gap-8 bg-neutral-900 text-white p-8 sm:p-12 rounded-2xl shadow-xl border border-neutral-800">
            <div>
              <h2 className="text-3xl font-[Vera] tracking-wide mb-3 text-[#B38E46]">Get In Touch</h2>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Whether you are planning a bespoke holiday, exploring membership options, or seeking assistance with an existing booking, our dedicated travel advisors are at your service.
              </p>
            </div>

            <div className="space-y-6 pt-4 text-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#B38E46]/20 text-[#B38E46] rounded-lg shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Telephone Concierge</h4>
                  <p className="text-neutral-400 mt-1">+1 (888) 555-LUXE (5893)</p>
                  <p className="text-neutral-500 text-xs mt-0.5">24/7 Global Member Helpline</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#B38E46]/20 text-[#B38E46] rounded-lg shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Email Desk</h4>
                  <p className="text-neutral-400 mt-1">concierge@theluxeyatra.com</p>
                  <p className="text-neutral-500 text-xs mt-0.5">Response within 2 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#B38E46]/20 text-[#B38E46] rounded-lg shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Corporate Office</h4>
                  <p className="text-neutral-400 mt-1 leading-relaxed">
                    293, Lane 2, Westend Marg,<br />
                    Saket, New Delhi – 110030
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#B38E46]/20 text-[#B38E46] rounded-lg shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">Office Hours</h4>
                  <p className="text-neutral-400 mt-1">Monday – Saturday: 9:00 AM – 8:00 PM IST</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 sm:p-12 rounded-2xl shadow-lg border border-neutral-200 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-[Vera] tracking-wide mb-3 text-neutral-900">Send A Message</h2>
              <p className="text-neutral-600 text-sm mb-8">
                Fill in the details below and a luxury travel specialist will get back to you shortly.
              </p>

              <form className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-[#B38E46]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="yourname@domain.com"
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-[#B38E46]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-[#B38E46]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-2">
                    Subject / Topic
                  </label>
                  <select className="w-full px-4 py-3 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-[#B38E46] bg-white">
                    <option>Bespoke Holiday Booking</option>
                    <option>Luxe Club Membership Inquiry</option>
                    <option>Customer Support / General Inquiry</option>
                    <option>Corporate & Brand Partnership</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-2">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your travel plans or inquiry..."
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:border-[#B38E46]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#B38E46] hover:bg-[#9a7837] text-white font-semibold text-sm uppercase tracking-wider rounded-lg transition-colors shadow-md"
                >
                  Submit Inquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
