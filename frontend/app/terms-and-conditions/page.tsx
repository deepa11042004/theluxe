import React from "react";
import Heading from "@/components/Heading";

export const metadata = {
  title: "Terms & Conditions - The Luxe Yatra",
  description: "Read the full terms and conditions governing membership, bookings, and services with The Luxe Yatra.",
};

export default function TermsPage() {
  return (
    <>
      <Heading
        title="Terms & Conditions"
        subtitle="Welcome to The Luxe Yatra. Please review our terms governing membership, bookings, and services."
        align="center"
        bgClassName="bg-neutral-900 text-white"
      />
      <section className="py-16 px-6 sm:px-12 lg:px-16 max-w-5xl mx-auto text-neutral-800 leading-relaxed space-y-8">
        <div className="p-6 bg-neutral-50 rounded-xl border border-neutral-200">
          <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-medium">
            Welcome to The Luxe Yatra. These Terms & Conditions govern your use of our website and the services, offers, and membership information provided through it. By accessing or using this website, you agree to these Terms.
          </p>
        </div>

        <div className="space-y-8 pt-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-[Vera] text-[#E39F25] mb-3">1. Website Information</h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              The information provided on this website is for general information and promotional purposes. Hotel availability, rates, offers, benefits, destinations, photographs, and other details may change without prior notice.
            </p>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-[Vera] text-[#E39F25] mb-3">2. Membership</h2>
            <p className="text-sm text-neutral-600 leading-relaxed mb-2">
              The Luxe Yatra offers travel and lifestyle membership plans that provide access to applicable hotel discounts, travel privileges, concierge assistance, offers, and other benefits according to the selected membership plan.
            </p>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Membership is a discount and privileges programme and is not a timeshare or ownership arrangement.
            </p>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-[Vera] text-[#E39F25] mb-3">3. Membership Benefits</h2>
            <p className="text-sm text-neutral-600 leading-relaxed mb-2">
              Membership benefits vary according to the plan selected and may be subject to availability, hotel policies, blackout dates, minimum booking requirements, validity periods, and other applicable conditions.
            </p>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Membership does not guarantee availability at any particular hotel, room category, destination, date, or rate.
            </p>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-[Vera] text-[#E39F25] mb-3">4. Bookings</h2>
            <p className="text-sm text-neutral-600 leading-relaxed mb-2">
              All hotel and travel bookings are subject to availability and the terms of the relevant hotel, travel provider, booking rate, and service.
            </p>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Rates, taxes, cancellation policies, minimum-stay requirements, and other booking conditions may vary.
            </p>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-[Vera] text-[#E39F25] mb-3">5. Vouchers and Certificates</h2>
            <p className="text-sm text-neutral-600 leading-relaxed mb-2">
              Where stay privilege certificates or gift certificates are provided, they are subject to the conditions communicated with the applicable membership plan.
            </p>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Certificates may have a minimum booking requirement, validity period, and other restrictions. They are not redeemable for cash unless expressly stated otherwise.
            </p>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-[Vera] text-[#E39F25] mb-3">6. Payments</h2>
            <p className="text-sm text-neutral-600 leading-relaxed mb-2">
              All membership and booking payments must be made through the payment methods made available by The Luxe Yatra.
            </p>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Applicable taxes, charges, or fees may apply.
            </p>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-[Vera] text-[#E39F25] mb-3">7. Cancellation and Refunds</h2>
            <p className="text-sm text-neutral-600 leading-relaxed mb-2">
              Membership cancellation and refunds are governed by the applicable Cancellation & Refund Policy.
            </p>
            <p className="text-sm text-neutral-600 leading-relaxed mb-2">
              Unless otherwise stated or required by applicable law, membership fees are non-refundable and non-cancellable for personal reasons.
            </p>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Hotel and travel booking cancellations are subject to the cancellation policy applicable to the particular booking.
            </p>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-[Vera] text-[#E39F25] mb-3">8. Third-Party Services</h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              The Luxe Yatra may provide access to hotels, travel providers, booking platforms, and other third-party services. Such services are subject to the respective third party's terms, policies, availability, and conditions.
            </p>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-[Vera] text-[#E39F25] mb-3">9. Intellectual Property</h2>
            <p className="text-sm text-neutral-600 leading-relaxed mb-2">
              All logos, trademarks, photographs, text, graphics, designs, and other content displayed on this website are owned by or used with permission by The Luxe Yatra or the respective rights holders.
            </p>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Unauthorised copying, reproduction, modification, distribution, or commercial use is prohibited.
            </p>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-[Vera] text-[#E39F25] mb-3">10. Prohibited Use</h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              You must not use this website for unlawful, fraudulent, abusive, or unauthorised purposes, interfere with its operation, attempt unauthorised access, or misuse any information or service provided through the website.
            </p>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-[Vera] text-[#E39F25] mb-3">11. Changes to Services and Terms</h2>
            <p className="text-sm text-neutral-600 leading-relaxed mb-2">
              The Luxe Yatra may update, modify, suspend, or discontinue website content, services, offers, participating properties, or membership benefits from time to time.
            </p>
            <p className="text-sm text-neutral-600 leading-relaxed">
              These Terms may also be updated periodically. The updated version will be effective when published on the website.
            </p>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-[Vera] text-[#E39F25] mb-3">12. Limitation of Liability</h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              To the extent permitted by applicable law, The Luxe Yatra shall not be liable for losses arising from circumstances beyond its reasonable control, including third-party service failures, hotel closures, travel disruptions, natural events, government restrictions, strikes, or other force majeure events.
            </p>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-[Vera] text-[#E39F25] mb-3">13. Privacy</h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Use of this website is also subject to our Privacy Policy, which explains how information may be collected, used, and handled.
            </p>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-[Vera] text-[#E39F25] mb-3">14. Governing Law</h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              These Terms shall be governed by the laws of India. Subject to applicable law, disputes shall be subject to the jurisdiction of the competent courts in Delhi, India.
            </p>
          </div>

          <div className="pt-6 border-t border-neutral-200">
            <h2 className="text-xl sm:text-2xl font-[Vera] text-[#E39F25] mb-3">15. Contact</h2>
            <div className="text-sm text-neutral-700 leading-relaxed space-y-1">
              <p className="font-semibold text-neutral-900">The Luxe Yatra</p>
              <p>Email: <a href="mailto:info@theluxeyatra.com" className="text-[#E39F25] underline">info@theluxeyatra.com</a></p>
              <p>Website: <a href="https://www.theluxeyatra.com" target="_blank" rel="noopener noreferrer" className="text-[#E39F25] underline">www.theluxeyatra.com</a></p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
