"use client";

import React, { useEffect, useState } from "react";
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

interface PaymentOutcome {
  type: "success" | "failed" | "cancelled" | "pending" | "error";
  paymentId?: string;
  txnid?: string;
  message?: string;
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
  const [submittedType, setSubmittedType] = useState<"contact" | null>(null);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [loadingPayment, setLoadingPayment] = useState(false);
  const [paymentOutcome, setPaymentOutcome] = useState<PaymentOutcome | null>(null);
  const [testPlan, setTestPlan] = useState<string | null>(null);

  // The backend decides whether the temporary Rs 1 test plan is offered
  useEffect(() => {
    fetch("/api/v1/membership/config")
      .then((r) => r.json())
      .then((j) => setTestPlan(j?.data?.testPlan || null))
      .catch(() => setTestPlan(null));
  }, []);

  // PayU redirects the browser back to /join?payment=... after the payment attempt
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const payment = params.get("payment");
    if (!payment) return;
    setPaymentOutcome({
      type: payment as PaymentOutcome["type"],
      paymentId: params.get("paymentId") || undefined,
      txnid: params.get("txnid") || undefined,
      message: params.get("message") || undefined,
    });
    window.history.replaceState(null, "", window.location.pathname);
  }, []);

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

    try {
      // Save the client + a PENDING payment attempt on the server, get signed PayU fields back
      const res = await fetch("/api/v1/membership/payu/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          salutation: formData.salutation,
          firstName: formData.firstName,
          lastName: formData.lastName,
          mobile: formData.mobile,
          email: formData.email,
          city: formData.city,
          plan: formData.plan,
          needGst: formData.needGst,
          companyName: formData.companyName,
          gstin: formData.gstin,
          acceptTerms: formData.acceptTerms,
        }),
      });

      const json = await res.json();
      if (!json.success) {
        setLoadingPayment(false);
        alert(json.message || "Could not start the payment. Please try again.");
        return;
      }

      const { actionUrl, fields } = json.data as {
        actionUrl: string;
        fields: Record<string, string>;
      };

      // PayU hosted checkout expects a browser form POST
      const form = document.createElement("form");
      form.method = "POST";
      form.action = actionUrl;
      Object.entries(fields).forEach(([name, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = name;
        input.value = value;
        form.appendChild(input);
      });
      document.body.appendChild(form);
      form.submit();
    } catch (err: any) {
      console.error("Payment initialization error:", err);
      setLoadingPayment(false);
      alert("Error initializing payment: " + (err?.message || err));
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
            {paymentOutcome ? (
              <motion.div
                key="payment-outcome"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="py-12 px-4 text-center flex flex-col items-center justify-center space-y-6"
              >
                <div
                  className={`w-16 h-16 rounded-full border-2 flex items-center justify-center ${
                    paymentOutcome.type === "success"
                      ? "bg-[#E39F25]/15 border-[#E39F25] text-[#E39F25]"
                      : paymentOutcome.type === "pending"
                      ? "bg-neutral-100 border-neutral-400 text-neutral-500"
                      : "bg-red-50 border-red-400 text-red-500"
                  }`}
                >
                  {paymentOutcome.type === "success" ? (
                    <Check className="w-8 h-8 stroke-[3]" />
                  ) : (
                    <X className="w-8 h-8 stroke-[3]" />
                  )}
                </div>
                <h3 className="text-2xl font-serif text-[#0E2A3A]">
                  {paymentOutcome.type === "success" && "Payment Completed Successfully!"}
                  {paymentOutcome.type === "pending" && "Payment Pending"}
                  {paymentOutcome.type === "cancelled" && "Payment Cancelled"}
                  {paymentOutcome.type === "failed" && "Payment Failed"}
                  {paymentOutcome.type === "error" && "We Could Not Confirm Your Payment"}
                </h3>
                <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                  {paymentOutcome.type === "success" &&
                    "Thank you for joining the Luxe Club. Your membership is now active and a confirmation with your invoice has been sent to your email."}
                  {paymentOutcome.type === "pending" &&
                    "Your bank has not confirmed the payment yet. We will update your membership as soon as it is confirmed."}
                  {paymentOutcome.type === "cancelled" &&
                    "You cancelled the payment. Your details are safely saved - you can try again any time."}
                  {paymentOutcome.type === "failed" &&
                    `${paymentOutcome.message ? paymentOutcome.message + ". " : ""}Your details are safely saved - you can try again any time.`}
                  {paymentOutcome.type === "error" &&
                    "If any amount was debited it will be reconciled by our team. Please contact our concierge with your transaction reference."}
                </p>
                {(paymentOutcome.paymentId || paymentOutcome.txnid) && (
                  <div className="bg-[#FAF8F5] border border-[#E39F25]/30 rounded-xl p-4 text-xs space-y-1 font-mono text-[#0E2A3A] w-full max-w-sm mx-auto">
                    <span className="text-[10px] text-neutral-500 uppercase tracking-widest block font-sans">
                      Transaction Reference
                    </span>
                    <span className="font-bold text-[#E39F25] text-sm block break-all">
                      {paymentOutcome.paymentId || paymentOutcome.txnid}
                    </span>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => setPaymentOutcome(null)}
                  className="mt-4 text-xs font-semibold uppercase tracking-widest text-[#006699] hover:underline cursor-pointer"
                >
                  {paymentOutcome.type === "success" ? "Back to form" : "Try again"}
                </button>
              </motion.div>
            ) : submittedType === null ? (
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
                      {[...PLANS, ...(testPlan ? [testPlan] : [])].map((p) => (
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
                  Request Received!
                </h3>
                <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                  Thank you, {formData.salutation} {formData.firstName} {formData.lastName}. Our Luxe Concierge team will reach out to you shortly at {formData.mobile} or {formData.email}.
                </p>

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

