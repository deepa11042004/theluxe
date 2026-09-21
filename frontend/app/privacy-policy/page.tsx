import React from "react";
import Heading from "@/components/Heading";

export const metadata = {
  title: "Privacy Policy - The Luxe Yatra",
  description: "Learn how The Luxe Yatra collects, uses, discloses, and protects your personal information.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Heading
        title="Privacy Policy"
        subtitle="Effective Date: September 2026 | Learn how we protect and manage your information."
        align="center"
        bgClassName="bg-neutral-900 text-white"
      />
      <section className="py-16 px-6 sm:px-12 lg:px-16 max-w-5xl mx-auto text-neutral-800 leading-relaxed space-y-8">
        <div className="p-6 bg-neutral-50 rounded-xl border border-neutral-200 space-y-3">
          <p className="text-xs uppercase tracking-widest text-[#E39F25] font-semibold">
            Effective Date: September 2026
          </p>
          <p className="text-sm sm:text-base text-neutral-700 leading-relaxed font-medium">
            The Luxe Yatra (“The Luxe Yatra”, “we”, “us”, or “our”) respects your privacy and is committed to protecting the personal information you provide when using our website, services, and membership programme.
          </p>
          <p className="text-sm text-neutral-600 leading-relaxed">
            This Privacy Policy explains how we collect, use, disclose, and protect your information.
          </p>
        </div>

        <div className="space-y-8 pt-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-[Vera] text-[#E39F25] mb-3">1. Information We Collect</h2>
            <p className="text-sm text-neutral-600 leading-relaxed mb-3">
              We may collect information that you provide to us, including:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm text-neutral-600 mb-4">
              <li>Name</li>
              <li>Contact number</li>
              <li>Email address</li>
              <li>Billing and payment-related information</li>
              <li>Booking and travel details</li>
              <li>Membership information</li>
              <li>Information provided when you contact our customer support team</li>
              <li>Other information voluntarily submitted through our website or services</li>
            </ul>
            <p className="text-sm text-neutral-600 leading-relaxed">
              We may also automatically collect certain technical information, such as browser type, device information, IP address, website usage information, and cookies.
            </p>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-[Vera] text-[#E39F25] mb-3">2. How We Use Your Information</h2>
            <p className="text-sm text-neutral-600 leading-relaxed mb-3">
              We may use your information to:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm text-neutral-600">
              <li>Create and manage your membership.</li>
              <li>Process bookings and travel requests.</li>
              <li>Provide customer support and concierge services.</li>
              <li>Communicate membership benefits, offers, updates, and service information.</li>
              <li>Process payments and transactions.</li>
              <li>Improve our website, services, and customer experience.</li>
              <li>Prevent fraud, misuse, or unauthorised activity.</li>
              <li>Comply with applicable legal and regulatory requirements.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-[Vera] text-[#E39F25] mb-3">3. Communications</h2>
            <p className="text-sm text-neutral-600 leading-relaxed mb-2">
              By providing your contact details, you may receive communications relating to your membership, bookings, transactions, customer service, offers, and other services.
            </p>
            <p className="text-sm text-neutral-600 leading-relaxed">
              You may opt out of promotional communications where applicable. Transactional and essential service communications may still be sent when necessary.
            </p>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-[Vera] text-[#E39F25] mb-3">4. Cookies</h2>
            <p className="text-sm text-neutral-600 leading-relaxed mb-2">
              Our website may use cookies and similar technologies to improve website functionality, understand website usage, remember preferences, and support marketing or analytics activities.
            </p>
            <p className="text-sm text-neutral-600 leading-relaxed">
              You may be able to manage or disable cookies through your browser settings. Certain website functions may not operate properly if cookies are disabled.
            </p>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-[Vera] text-[#E39F25] mb-3">5. Sharing of Information</h2>
            <p className="text-sm text-neutral-600 leading-relaxed mb-3">
              We may share relevant information with trusted third parties where necessary to provide our services, including:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm text-neutral-600 mb-4">
              <li>Hotels and accommodation providers</li>
              <li>Travel and booking partners</li>
              <li>Payment processors</li>
              <li>Technology and website service providers</li>
              <li>Customer support or service providers</li>
              <li>Professional advisers and legal authorities where required by law</li>
            </ul>
            <p className="text-sm text-neutral-600 leading-relaxed">
              We do not intend to sell your personal information to third parties.
            </p>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-[Vera] text-[#E39F25] mb-3">6. Third-Party Services</h2>
            <p className="text-sm text-neutral-600 leading-relaxed mb-2">
              Our website or services may contain links to third-party websites, booking platforms, hotels, or other service providers.
            </p>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Their privacy practices are governed by their own privacy policies. We encourage you to review their policies before providing personal information to them.
            </p>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-[Vera] text-[#E39F25] mb-3">7. Data Security</h2>
            <p className="text-sm text-neutral-600 leading-relaxed mb-2">
              We take reasonable technical and organisational measures to protect personal information against unauthorised access, misuse, alteration, disclosure, or loss.
            </p>
            <p className="text-sm text-neutral-600 leading-relaxed">
              However, no method of transmission or electronic storage can be guaranteed to be completely secure.
            </p>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-[Vera] text-[#E39F25] mb-3">8. Data Retention</h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              We retain personal information for as long as reasonably necessary to provide our services, maintain membership and transaction records, resolve disputes, comply with legal obligations, and fulfil legitimate business requirements.
            </p>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-[Vera] text-[#E39F25] mb-3">9. Your Rights</h2>
            <p className="text-sm text-neutral-600 leading-relaxed mb-2">
              Subject to applicable law, you may have rights relating to your personal information, including the right to request access, correction, updating, or deletion of certain information.
            </p>
            <p className="text-sm text-neutral-600 leading-relaxed">
              You may contact us using the details below to make a privacy-related request.
            </p>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-[Vera] text-[#E39F25] mb-3">10. Children's Privacy</h2>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Our website and membership services are not intended for children. We do not knowingly collect personal information from children where prohibited by applicable law.
            </p>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-[Vera] text-[#E39F25] mb-3">11. Changes to This Privacy Policy</h2>
            <p className="text-sm text-neutral-600 leading-relaxed mb-2">
              We may update this Privacy Policy from time to time to reflect changes in our services, technology, or applicable laws.
            </p>
            <p className="text-sm text-neutral-600 leading-relaxed">
              The updated Privacy Policy will be published on this website with the revised effective date.
            </p>
          </div>

          <div className="pt-6 border-t border-neutral-200">
            <h2 className="text-xl sm:text-2xl font-[Vera] text-[#E39F25] mb-3">12. Contact Us</h2>
            <p className="text-sm text-neutral-600 leading-relaxed mb-3">
              For questions, requests, or concerns regarding this Privacy Policy, please contact:
            </p>
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
