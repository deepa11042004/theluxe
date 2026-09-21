import React from "react";
import Heading from "@/components/Heading";

export const metadata = {
  title: "Cancellation & Refund Policy - The Luxe Yatra",
  description: "Read the full Cancellation & Refund Policy governing memberships, bookings, and vouchers with The Luxe Yatra.",
};

export default function CancellationPolicyPage() {
  return (
    <>
      <Heading
        title="Cancellation & Refund Policy"
        subtitle="Effective Date: September 2026 | Guidelines on cancellations, refunds, and processing timelines."
        align="center"
        bgClassName="bg-neutral-900 text-white"
      />
      <section className="py-16 px-6 sm:px-12 lg:px-16 max-w-5xl mx-auto text-neutral-800 leading-relaxed space-y-8">
        <div className="p-6 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2">
          <p className="text-xs uppercase tracking-widest text-[#E39F25] font-semibold">
            Effective Date: September 2026
          </p>
          <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-medium">
            This Cancellation & Refund Policy applies to memberships, bookings, vouchers, and services offered by The Luxe Yatra through its website and other authorised channels.
          </p>
        </div>

        <div className="space-y-8 pt-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-[Vera] text-[#E39F25] mb-3">1. Membership Cancellation</h2>
            <p className="text-sm text-neutral-600 leading-relaxed mb-2">
              Membership cancellation requests may be submitted through the official customer support channels of The Luxe Yatra.
            </p>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Membership cancellation is subject to the applicable Membership Terms & Conditions and the terms communicated at the time of purchase.
            </p>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-[Vera] text-[#E39F25] mb-3">2. Membership Refunds</h2>
            <p className="text-sm text-neutral-600 leading-relaxed mb-2">
              Membership fees are generally non-refundable and non-cancellable for personal reasons, except where a refund is specifically approved under the applicable policy or required by applicable law.
            </p>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Any approved refund may be subject to applicable deductions, including amounts relating to services already used, bookings made, benefits redeemed, certificates used, or other applicable charges.
            </p>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-[Vera] text-[#E39F25] mb-3">3. Refund Processing</h2>
            <p className="text-sm text-neutral-600 leading-relaxed mb-2">
              Where a refund is approved, the refund will normally be processed to the original payment method, subject to verification and payment-provider processing.
            </p>
            <p className="text-sm text-neutral-600 leading-relaxed">
              The refund processing time may take approximately 60–90 days from the date of approval, depending on the nature of the request and the payment provider involved.
            </p>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-[Vera] text-[#E39F25] mb-3">4. Hotel and Travel Booking Cancellation</h2>
            <p className="text-sm text-neutral-600 leading-relaxed mb-2">
              Hotel and travel bookings are subject to the cancellation, modification, and no-show policies applicable to the specific booking, hotel, rate plan, travel provider, or service.
            </p>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Any cancellation charges, applicable taxes, or other deductions imposed under the booking conditions may be deducted from the refundable amount.
            </p>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-[Vera] text-[#E39F25] mb-3">5. Voucher and Certificate Cancellation</h2>
            <p className="text-sm text-neutral-600 leading-relaxed mb-3">
              Stay privilege certificates, gift certificates, promotional vouchers, or other benefits provided as part of a Membership generally:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm text-neutral-600">
              <li>Cannot be exchanged for cash.</li>
              <li>Cannot be refunded separately.</li>
              <li>May be subject to validity periods and minimum booking requirements.</li>
              <li>May become non-refundable or non-replaceable once used or expired.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-[Vera] text-[#E39F25] mb-3">6. Refund Eligibility</h2>
            <p className="text-sm text-neutral-600 leading-relaxed mb-3">
              Refund eligibility will be determined based on:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm text-neutral-600">
              <li>The Membership plan purchased.</li>
              <li>The date of purchase.</li>
              <li>The applicable Membership Terms & Conditions.</li>
              <li>Whether Membership benefits have been used or redeemed.</li>
              <li>Any bookings or services already processed.</li>
              <li>Applicable deductions and charges.</li>
              <li>Applicable laws and regulations.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-[Vera] text-[#E39F25] mb-3">7. Cancellation Request</h2>
            <p className="text-sm text-neutral-600 leading-relaxed mb-2">
              To request cancellation or a refund, Members should contact:
            </p>
            <p className="text-sm text-neutral-800 font-semibold mb-2">
              Email: <a href="mailto:info@theluxeyatra.com" className="text-[#E39F25] underline">info@theluxeyatra.com</a>
            </p>
            <p className="text-sm text-neutral-600 leading-relaxed mb-2">
              The request should include the Member's name, registered contact details, Membership information, transaction details, and reason for the request.
            </p>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Additional information or documents may be requested for verification.
            </p>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-[Vera] text-[#E39F25] mb-3">8. Chargebacks and Payment Disputes</h2>
            <p className="text-sm text-neutral-600 leading-relaxed mb-2">
              Members are requested to contact The Luxe Yatra customer support before initiating a payment dispute or chargeback.
            </p>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Where a chargeback is initiated, The Luxe Yatra may provide relevant transaction, Membership, booking, and acceptance records to the payment provider or financial institution for review.
            </p>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-[Vera] text-[#E39F25] mb-3">9. Changes to This Policy</h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              The Luxe Yatra may update this Cancellation & Refund Policy from time to time. The updated version will be published on this website and will apply from the stated effective date, subject to applicable law.
            </p>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-[Vera] text-[#E39F25] mb-3">10. Governing Law</h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              This Policy shall be governed by the laws of India. Subject to applicable law, disputes shall be subject to the jurisdiction of the competent courts in Delhi, India.
            </p>
          </div>

          <div className="pt-6 border-t border-neutral-200">
            <h2 className="text-xl sm:text-2xl font-[Vera] text-[#E39F25] mb-3">11. Contact Us</h2>
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
