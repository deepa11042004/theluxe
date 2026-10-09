"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowRight, Check, X, ShieldCheck } from "lucide-react";
import Image from "next/image";

interface FormData {
  salutation: string;
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  city: string;
  plan: string;
  acceptTerms: boolean;
  needGst: boolean;
  companyName: string;
  gstin: string;
}

const CITIES = [
  "Delhi NCR",
  "Mumbai",
  "Bengaluru",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Pune",
  "Ahmedabad",
  "Jaipur",
  "Goa",
  "Chandigarh",
  "Kochi",
  "Lucknow",
  "International / Other",
];

const PLANS = [
  "Luxe Signature Membership",
  "Luxe Prestige Membership",
  "Luxe Black Membership (Limited Edition)",
];

const loadRazorpayScript = () => {
  return new Promise<boolean>((resolve) => {
    if (typeof window === "undefined") return resolve(false);
    if ((window as any).Razorpay) return resolve(true);

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const getPlanPriceInPaise = (planName: string) => {
  if (planName.includes("Signature")) return 17700000; // ₹1,77,000 (incl 18% GST)
  if (planName.includes("Prestige")) return 29500000;  // ₹2,95,000 (incl 18% GST)
  if (planName.includes("Black")) return 59000000;     // ₹5,90,000 (incl 18% GST)
  return 17700000;
};

export default function Joinsec() {
  const [formData, setFormData] = useState<FormData>({
    salutation: "Mr.",
    firstName: "",
    lastName: "",
    mobile: "",
    email: "",
    city: "",
    plan: "",
    acceptTerms: false,
    needGst: false,
    companyName: "",
    gstin: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedType, setSubmittedType] = useState<"pay" | "contact" | null>(null);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [paymentResult, setPaymentResult] = useState<{ paymentId?: string } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = (action: "pay" | "contact") => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobile.replace(/\D/g, ""))) {
      newErrors.mobile = "Enter a valid 10-digit mobile number";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (action === "pay") {
      if (!formData.city) newErrors.city = "Please select a city";
      if (!formData.plan) newErrors.plan = "Please select a membership plan";
      if (!formData.acceptTerms)
        newErrors.acceptTerms = "You must accept the Terms & Conditions";

      if (formData.needGst) {
        if (!formData.companyName.trim())
          newErrors.companyName = "Company name is required for GST invoice";
        if (!formData.gstin.trim())
          newErrors.gstin = "GSTIN is required for GST invoice";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayNow = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate("pay")) return;

    setLoadingPayment(true);
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      alert("Razorpay Payment Gateway SDK failed to load. Please check your connection.");
      setLoadingPayment(false);
      return;
    }

    const keyId = (process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "").trim();

    // Check if key_id is placeholder or incomplete
    if (!keyId || keyId.length < 15 || keyId.includes("...")) {
      setLoadingPayment(false);
      alert(
        "Invalid or truncated Razorpay Key ID!\n\nPlease check your Razorpay Dashboard and provide your complete Key ID (starts with rzp_test_...)."
      );
      return;
    }

    const amount = getPlanPriceInPaise(formData.plan);

    const options = {
      key: keyId,
      amount: amount,
      currency: "INR",
      name: "The Luxe Yatra",
      description: `Membership Payment - ${formData.plan}`,
      image: "/Img/logo-emblem-v3.png",
      prefill: {
        name: `${formData.salutation} ${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        contact: formData.mobile,
      },
      notes: {
        city: formData.city,
        plan: formData.plan,
        needGst: formData.needGst ? "Yes" : "No",
        companyName: formData.companyName || "",
        gstin: formData.gstin || "",
      },
      theme: {
        color: "#E39F25",
      },
      handler: function (response: any) {
        setLoadingPayment(false);
        setPaymentResult({ paymentId: response.razorpay_payment_id });
        setSubmittedType("pay");

        // Persist new client & invoice for Admin Panel
        try {
          const existingClientsJSON = localStorage.getItem("luxe_clients_list");
          const existingClients = existingClientsJSON ? JSON.parse(existingClientsJSON) : [];

          const newClient = {
            id: "cl-" + Date.now(),
            salutation: formData.salutation,
            name: `${formData.firstName} ${formData.lastName}`.trim(),
            email: formData.email,
            mobile: formData.mobile.startsWith("+91") ? formData.mobile : `+91 ${formData.mobile}`,
            city: formData.city,
            tier: formData.plan,
            membershipNo: `LY-${Math.floor(100000 + Math.random() * 900000)}`,
            joinDate: new Date().toISOString().split("T")[0],
            status: "ACTIVE",
            companyName: formData.companyName || undefined,
            gstin: formData.gstin || undefined,
          };

          const updatedClients = [newClient, ...existingClients];
          localStorage.setItem("luxe_clients_list", JSON.stringify(updatedClients));

          // Also persist invoice
          const existingInvoicesJSON = localStorage.getItem("luxe_invoices_list");
          const existingInvoices = existingInvoicesJSON ? JSON.parse(existingInvoicesJSON) : [];

          const planAmountMap: Record<string, number> = {
            "Luxe Signature Membership": 150000,
            "Luxe Prestige Membership": 250000,
            "Luxe Black Membership (Limited Edition)": 500000,
          };
          const baseAmt = planAmountMap[formData.plan] || 150000;
          const gstAmt = Math.round(baseAmt * 0.18);

          const newInvoice = {
            id: "inv-" + Date.now(),
            invoiceNo: `LY-INV-2026-${Math.floor(100 + Math.random() * 900)}`,
            customerName: `${formData.salutation} ${formData.firstName} ${formData.lastName}`.trim(),
            email: formData.email,
            mobile: formData.mobile,
            plan: formData.plan,
            amount: baseAmt,
            gstAmount: gstAmt,
            totalAmount: baseAmt + gstAmt,
            needGst: formData.needGst,
            companyName: formData.companyName || undefined,
            gstin: formData.gstin || undefined,
            date: new Date().toISOString().split("T")[0],
            status: "PAID",
            paymentId: response.razorpay_payment_id,
          };

          const updatedInvoices = [newInvoice, ...existingInvoices];
          localStorage.setItem("luxe_invoices_list", JSON.stringify(updatedInvoices));
        } catch (err) {
          console.error("Error saving client/invoice data:", err);
        }
      },
      modal: {
        ondismiss: function () {
          setLoadingPayment(false);
        },
      },
    };

    try {
      const rzp = new (window as any).Razorpay(options);
      rzp.on("payment.failed", function (response: any) {
        console.error("Razorpay Payment Failed:", response.error);
        setLoadingPayment(false);
        alert(`Payment Failed: ${response.error.description || response.error.reason || "Something went wrong"}`);
      });
      rzp.open();
    } catch (err: any) {
      console.error("Razorpay launch error:", err);
      setLoadingPayment(false);
      alert("Error initializing Razorpay payment window: " + (err?.message || err));
    }
  };

  const handleContactMe = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate("contact")) {
      setSubmittedType("contact");
    }
  };

  return (
    <section className="relative w-full min-h-[90vh] bg-[#FAF8F5] py-12 md:py-20 px-4 sm:px-8 lg:px-12 flex items-center justify-center font-sans text-[#0E2A3A]">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* LEFT COLUMN: BRAND STORY / VISUAL */}
        <div className="lg:col-span-4 flex flex-col justify-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E39F25]/15 border border-[#E39F25]/30 rounded-full w-fit">
            <ShieldCheck className="w-4 h-4 text-[#E39F25]" />
            <span className="text-[11px] font-semibold tracking-widest uppercase text-[#0E2A3A]">
              Exclusive Privileges
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#0E2A3A] leading-tight">
            Begin Your <br />
            <span className="italic font-light text-[#E39F25]">Luxe Journey</span>
          </h1>
          <p className="text-sm text-neutral-600 leading-relaxed">
            Join the elite circle of travelers. Enjoy bespoke hospitality, guaranteed room availability at premier global destinations, and tailor-made vacation experiences.
          </p>
          
          <div className="pt-4 border-t border-neutral-200 grid grid-cols-2 gap-4">
            <div>
              <span className="block text-2xl font-serif text-[#0E2A3A]">500+</span>
              <span className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Global Resorts</span>
            </div>
            <div>
              <span className="block text-2xl font-serif text-[#0E2A3A]">100%</span>
              <span className="text-xs text-neutral-500 uppercase tracking-wider font-medium">Personal Concierge</span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: THE EXACT FORM FROM IMAGE 1 */}
        <div className="lg:col-span-8 bg-white rounded-2xl shadow-xl shadow-black/5 p-6 sm:p-8 md:p-10 border border-neutral-100 relative">
          <AnimatePresence mode="wait">
            {submittedType === null ? (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6"
              >
                {/* SALUTATION + FIRST NAME + LAST NAME ROW */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* SALUTATION DROPDOWN */}
                  <div className="md:col-span-3 relative border-b border-neutral-300 focus-within:border-[#0E2A3A] transition-colors pb-1">
                    <label className="block text-xs font-semibold tracking-[0.15em] text-[#0E2A3A] uppercase mb-1">
                      SAL.
                    </label>
                    <div className="relative flex items-center">
                      <select
                        name="salutation"
                        value={formData.salutation}
                        onChange={handleChange}
                        className="w-full bg-transparent text-base font-medium text-[#0E2A3A] focus:outline-none appearance-none pr-6 cursor-pointer"
                      >
                        <option value="Mr.">Mr.</option>
                        <option value="Mrs.">Mrs.</option>
                        <option value="Ms.">Ms.</option>
                        <option value="Dr.">Dr.</option>
                        <option value="Prof.">Prof.</option>
                      </select>
                      <ChevronDown className="w-4 h-4 text-[#0E2A3A] absolute right-0 pointer-events-none" />
                    </div>
                  </div>

                  {/* FIRST NAME */}
                  <div className="md:col-span-4 relative border-b border-neutral-300 focus-within:border-[#0E2A3A] transition-colors pb-1">
                    <label className="block text-xs font-semibold tracking-[0.15em] text-[#0E2A3A] uppercase mb-1">
                      FIRST NAME<span className="text-[#E39F25] ml-0.5">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full bg-transparent text-base font-medium text-[#0E2A3A] placeholder:text-neutral-300 focus:outline-none"
                    />
                    {errors.firstName && (
                      <span className="text-[10px] text-red-500 block mt-1">
                        {errors.firstName}
                      </span>
                    )}
                  </div>

                  {/* LAST NAME */}
                  <div className="md:col-span-5 relative border-b border-neutral-300 focus-within:border-[#0E2A3A] transition-colors pb-1">
                    <label className="block text-xs font-semibold tracking-[0.15em] text-[#0E2A3A] uppercase mb-1">
                      LAST NAME<span className="text-[#E39F25] ml-0.5">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full bg-transparent text-base font-medium text-[#0E2A3A] placeholder:text-neutral-300 focus:outline-none"
                    />
                    {errors.lastName && (
                      <span className="text-[10px] text-red-500 block mt-1">
                        {errors.lastName}
                      </span>
                    )}
                  </div>
                </div>

                {/* MOBILE NUMBER ROW (+91 prefix) */}
                <div className="relative border-b border-neutral-300 focus-within:border-[#0E2A3A] transition-colors pb-1 pt-2">
                  <div className="flex items-center gap-3">
                    <span className="text-base font-semibold text-[#006699]">
                      +91
                    </span>
                    <div className="flex-1">
                      <label className="block text-xs font-semibold tracking-[0.15em] text-[#0E2A3A] uppercase mb-1">
                        MOBILE NUMBER<span className="text-[#E39F25] ml-0.5">*</span>
                      </label>
                      <input
                        type="tel"
                        name="mobile"
                        placeholder="9876543210"
                        maxLength={10}
                        value={formData.mobile}
                        onChange={handleChange}
                        className="w-full bg-transparent text-base font-medium text-[#0E2A3A] placeholder:text-neutral-300 focus:outline-none"
                      />
                    </div>
                  </div>
                  {errors.mobile && (
                    <span className="text-[10px] text-red-500 block mt-1">
                      {errors.mobile}
                    </span>
                  )}
                </div>

                {/* EMAIL ROW */}
                <div className="relative border-b border-neutral-300 focus-within:border-[#0E2A3A] transition-colors pb-1 pt-2">
                  <label className="block text-xs font-semibold tracking-[0.15em] text-[#0E2A3A] uppercase mb-1">
                    EMAIL<span className="text-[#E39F25] ml-0.5">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="john.doe@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-transparent text-base font-medium text-[#0E2A3A] placeholder:text-neutral-300 focus:outline-none"
                  />
                  {errors.email && (
                    <span className="text-[10px] text-red-500 block mt-1">
                      {errors.email}
                    </span>
                  )}
                </div>

                {/* SELECT CITY DROPDOWN */}
                <div className="relative border-b border-neutral-300 focus-within:border-[#0E2A3A] transition-colors pb-1 pt-2">
                  <label className="block text-xs font-semibold tracking-[0.15em] text-[#0E2A3A] uppercase mb-1">
                    SELECT CITY<span className="text-[#E39F25] ml-0.5">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full bg-transparent text-base font-medium text-[#0E2A3A] focus:outline-none appearance-none pr-6 cursor-pointer"
                    >
                      <option value="" disabled className="text-neutral-400">
                        Choose your city...
                      </option>
                      {CITIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#0E2A3A] absolute right-0 pointer-events-none" />
                  </div>
                  {errors.city && (
                    <span className="text-[10px] text-red-500 block mt-1">
                      {errors.city}
                    </span>
                  )}
                </div>

                {/* SELECT PLAN DROPDOWN */}
                <div className="relative border-b border-neutral-300 focus-within:border-[#0E2A3A] transition-colors pb-1 pt-2">
                  <label className="block text-xs font-semibold tracking-[0.15em] text-[#0E2A3A] uppercase mb-1">
                    SELECT PLAN<span className="text-[#E39F25] ml-0.5">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <select
                      name="plan"
                      value={formData.plan}
                      onChange={handleChange}
                      className="w-full bg-transparent text-base font-medium text-[#0E2A3A] focus:outline-none appearance-none pr-6 cursor-pointer"
                    >
                      <option value="" disabled className="text-neutral-400">
                        Select a membership plan...
                      </option>
                      {PLANS.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-[#0E2A3A] absolute right-0 pointer-events-none" />
                  </div>
                  {errors.plan && (
                    <span className="text-[10px] text-red-500 block mt-1">
                      {errors.plan}
                    </span>
                  )}
                </div>

                {/* CHECKBOXES ROW */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  {/* ACCEPT TERMS */}
                  <div className="flex flex-col">
                    <label className="flex items-center gap-2.5 cursor-pointer group">
                      <input
                        type="checkbox"
                        name="acceptTerms"
                        checked={formData.acceptTerms}
                        onChange={handleChange}
                        className="w-4 h-4 rounded-xs border-[#E39F25] text-[#E39F25] focus:ring-[#E39F25] cursor-pointer accent-[#E39F25]"
                      />
                      <span className="text-sm font-medium text-[#0E2A3A] select-none">
                        Accept{" "}
                        <button
                          type="button"
                          onClick={() => setShowTermsModal(true)}
                          className="text-[#006699] underline hover:text-[#004466] transition-colors font-semibold"
                        >
                          Terms & Conditions
                        </button>
                      </span>
                    </label>
                    {errors.acceptTerms && (
                      <span className="text-[10px] text-red-500 block mt-1 pl-6">
                        {errors.acceptTerms}
                      </span>
                    )}
                  </div>

                  {/* NEED GST INVOICE */}
                  <div className="flex flex-col">
                    <label className="flex items-center gap-2.5 cursor-pointer group">
                      <input
                        type="checkbox"
                        name="needGst"
                        checked={formData.needGst}
                        onChange={handleChange}
                        className="w-4 h-4 rounded-xs border-[#E39F25] text-[#E39F25] focus:ring-[#E39F25] cursor-pointer accent-[#E39F25]"
                      />
                      <span className="text-sm font-medium text-[#0E2A3A] select-none">
                        Need Company GST Invoice
                      </span>
                    </label>
                  </div>
                </div>

                {/* CONDITIONAL GST FIELDS */}
                {formData.needGst && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2"
                  >
                    <div className="border-b border-neutral-300 pb-1">
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#0E2A3A]">
                        COMPANY NAME*
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        placeholder="Company Pvt Ltd"
                        value={formData.companyName}
                        onChange={handleChange}
                        className="w-full bg-transparent text-sm text-[#0E2A3A] focus:outline-none"
                      />
                      {errors.companyName && (
                        <span className="text-[10px] text-red-500 block">
                          {errors.companyName}
                        </span>
                      )}
                    </div>
                    <div className="border-b border-neutral-300 pb-1">
                      <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#0E2A3A]">
                        GSTIN NUMBER*
                      </label>
                      <input
                        type="text"
                        name="gstin"
                        placeholder="22AAAAA0000A1Z5"
                        value={formData.gstin}
                        onChange={handleChange}
                        className="w-full bg-transparent text-sm text-[#0E2A3A] focus:outline-none uppercase"
                      />
                      {errors.gstin && (
                        <span className="text-[10px] text-red-500 block">
                          {errors.gstin}
                        </span>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* BOTTOM ACTION BUTTONS ROW */}
                <div className="pt-6 flex flex-wrap md:flex-nowrap items-center justify-between gap-4 sm:gap-6">
                  {/* BUY MEMBERSHIP -> PAY NOW */}
                  <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                    <span className="text-xs sm:text-sm font-medium text-[#0E2A3A] whitespace-nowrap">
                      Buy Membership
                    </span>
                    <button
                      type="button"
                      onClick={handlePayNow}
                      disabled={loadingPayment}
                      className="bg-[#E39F25] hover:bg-[#d4901f] disabled:opacity-70 text-white font-bold text-xs sm:text-sm uppercase tracking-wider px-6 sm:px-7 py-2.5 rounded-lg transition-all shadow-md shadow-[#E39F25]/20 active:scale-95 cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-2"
                    >
                      {loadingPayment ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>LAUNCHING GATEWAY...</span>
                        </>
                      ) : (
                        <span>PAY NOW</span>
                      )}
                    </button>
                  </div>

                  {/* NEED MORE DETAILS -> CONTACT ME */}
                  <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                    <span className="text-xs sm:text-sm font-medium text-[#0E2A3A] whitespace-nowrap">
                      Need More Details
                    </span>
                    <button
                      type="button"
                      onClick={handleContactMe}
                      className="group border-2 border-[#0E2A3A] hover:bg-[#0E2A3A] hover:text-white text-[#0E2A3A] font-bold text-xs sm:text-sm uppercase tracking-wider pl-4 pr-1.5 py-1.5 rounded-full transition-all flex items-center gap-2.5 cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <span>CONTACT ME</span>
                      <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#E39F25] flex items-center justify-center text-white transition-transform group-hover:translate-x-0.5 shrink-0">
                        <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                    </button>
                  </div>
                </div>
              </motion.form>

            ) : (
              /* SUCCESS STATE MODAL / VIEW */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="py-12 px-4 text-center flex flex-col items-center justify-center space-y-6"
              >
                <div className="w-16 h-16 rounded-full bg-[#E39F25]/15 border-2 border-[#E39F25] flex items-center justify-center text-[#E39F25]">
                  <Check className="w-8 h-8 stroke-[3]" />
                </div>
                <h3 className="text-2xl font-serif text-[#0E2A3A]">
                  {submittedType === "pay"
                    ? "Payment Completed Successfully!"
                    : "Request Received!"}
                </h3>
                <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                  {submittedType === "pay"
                    ? `Thank you, ${formData.salutation} ${formData.firstName} ${formData.lastName}. Your payment for ${formData.plan} has been processed.`
                    : `Thank you, ${formData.salutation} ${formData.firstName} ${formData.lastName}. Our Luxe Concierge team will reach out to you shortly at ${formData.mobile} or ${formData.email}.`}
                </p>

                {submittedType === "pay" && paymentResult?.paymentId && (
                  <div className="bg-[#FAF8F5] border border-[#E39F25]/30 rounded-xl p-4 text-xs space-y-1 font-mono text-[#0E2A3A] w-full max-w-sm mx-auto">
                    <span className="text-[10px] text-neutral-500 uppercase tracking-widest block font-sans">
                      Transaction Receipt ID
                    </span>
                    <span className="font-bold text-[#E39F25] text-sm block">
                      {paymentResult.paymentId}
                    </span>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setSubmittedType(null);
                    setFormData({
                      salutation: "Mr.",
                      firstName: "",
                      lastName: "",
                      mobile: "",
                      email: "",
                      city: "",
                      plan: "",
                      acceptTerms: false,
                      needGst: false,
                      companyName: "",
                      gstin: "",
                    });
                  }}
                  className="mt-4 text-xs font-semibold uppercase tracking-widest text-[#006699] hover:underline cursor-pointer"
                >
                  Fill form again
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* TERMS & CONDITIONS MODAL */}
      {showTermsModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative border border-neutral-200">
            <button
              onClick={() => setShowTermsModal(false)}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-[#0E2A3A] transition-colors rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-serif text-[#0E2A3A] mb-3">
              Luxe Club Terms & Conditions
            </h3>
            <div className="text-xs text-neutral-600 space-y-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
              <p>
                1. Membership in the Luxe Club is subject to approval and validation of member credentials.
              </p>
              <p>
                2. Privileges, stay credits, and room availability are guaranteed in accordance with the selected tier specifications.
              </p>
              <p>
                3. Cancellations and booking modifications must adhere to the standard 7-day notice period.
              </p>
              <p>
                4. GST Invoices will be generated using the provided Company Name and GSTIN upon payment confirmation.
              </p>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setFormData((prev) => ({ ...prev, acceptTerms: true }));
                  setShowTermsModal(false);
                }}
                className="bg-[#0E2A3A] text-white text-xs font-bold uppercase tracking-wider px-6 py-2.5 rounded-lg hover:bg-black transition-colors"
              >
                I Agree & Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

