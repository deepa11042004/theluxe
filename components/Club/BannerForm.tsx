"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";

export default function BannerForm() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    city: "",
    age: "",
    email: "",
    consent: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
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

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.mobile.trim()) newErrors.mobile = "Mobile number is required";
    else if (!/^\d{10}$/.test(formData.mobile))
      newErrors.mobile = "Enter a valid 10-digit number";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.age) newErrors.age = "Select age group";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Enter a valid email address";
    if (!formData.consent) newErrors.consent = "Consent is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      setTimeout(() => {
        setFormData({
          name: "",
          mobile: "",
          city: "",
          age: "",
          email: "",
          consent: false,
        });
        setSubmitted(false);
      }, 3000);
    }
  };

  const ageOptions = [
    { value: "", label: "Select Age Group" },
    { value: "18-25", label: "18 - 25 years" },
    { value: "26-35", label: "26 - 35 years" },
    { value: "36-45", label: "36 - 45 years" },
    { value: "46-55", label: "46 - 55 years" },
    { value: "56+", label: "56+ years" },
  ];

  return (
    <section className="relative w-full min-h-[95vh] md:min-h-screen flex items-center justify-start overflow-hidden bg-[#0A0D14] select-none py-12">
      {/* 1. CINEMATIC BACKGROUND IMAGE FRAME */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <Image
          src="https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=2000&q=90"
          alt="Luxury ocean horizon background"
          fill
          priority
          className="object-cover object-center brightness-[0.85] contrast-[1.02]"
        />
        <div className="absolute inset-0 bg-linear-to-r from-black/20 via-transparent to-transparent hidden lg:block" />
      </div>

      {/* 2. LAYOUT CONTAINER */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 sm:px-12 items-center">
        {/* LEFT CARD: LUXURY FORM CONTAINER WITH ALL REQUESTED FIELDS */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="col-span-1 lg:col-span-6 xl:col-span-5 relative bg-[#FAF8F5] rounded-xs shadow-2xl p-6 sm:p-10 md:p-11 overflow-hidden text-neutral-900 border border-white/40"
        >
          <div className="absolute inset-0 z-0 opacity-[0.06] pointer-events-none select-none bg-[radial-gradient(#000_1px,transparent_1px)] bg-size-[16px_16px]" />

          <div className="relative z-10">
            {!submitted ? (
              <>
                {/* Header Title */}
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-2xl md:text-3xl font-[Vera] text-black tracking-wide">
                    Know More About the Club Elevate Programme
                  </h2>
                </div>

                {/* Form fields */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Row 1: Name & Mobile No. */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative border-b border-neutral-300 focus-within:border-neutral-900 transition-colors py-1">
                      <input
                        type="text"
                        name="name"
                        placeholder="Your full name*"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-transparent text-sm text-neutral-900 focus:outline-none font-sans font-light tracking-wide placeholder-neutral-400"
                      />
                      {errors.name && (
                        <span className="absolute -bottom-4 left-0 text-[10px] text-red-500">
                          {errors.name}
                        </span>
                      )}
                    </div>

                    <div className="relative border-b border-neutral-300 focus-within:border-neutral-900 transition-colors py-1">
                      <input
                        type="tel"
                        name="mobile"
                        placeholder="Mobile No.*"
                        value={formData.mobile}
                        onChange={handleChange}
                        className="w-full bg-transparent text-sm text-neutral-900 focus:outline-none font-sans font-light tracking-wide placeholder-neutral-400"
                      />
                      {errors.mobile && (
                        <span className="absolute -bottom-4 left-0 text-[10px] text-red-500">
                          {errors.mobile}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Row 2: City & Age */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="relative border-b border-neutral-300 focus-within:border-neutral-900 transition-colors py-1 flex items-center">
                      <input
                        type="text"
                        name="city"
                        placeholder="City*"
                        value={formData.city}
                        onChange={handleChange}
                        className="w-full bg-transparent text-sm text-neutral-900 focus:outline-none font-sans font-light tracking-wide placeholder-neutral-400 pr-6"
                      />
                      <Search className="w-3.5 h-3.5 text-neutral-400 absolute right-1 pointer-events-none" />
                      {errors.city && (
                        <span className="absolute -bottom-4 left-0 text-[10px] text-red-500">
                          {errors.city}
                        </span>
                      )}
                    </div>

                    <div className="relative border-b border-neutral-300 focus-within:border-neutral-900 transition-colors py-1 flex items-center">
                      <select
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        className="w-full bg-transparent text-sm text-neutral-900 focus:outline-none font-sans font-light tracking-wide placeholder-neutral-400 appearance-none pr-6 cursor-pointer"
                      >
                        {ageOptions.map((opt) => (
                          <option
                            key={opt.value}
                            value={opt.value}
                            className="text-neutral-900"
                          >
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-1 pointer-events-none" />
                      {errors.age && (
                        <span className="absolute -bottom-4 left-0 text-[10px] text-red-500">
                          {errors.age}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Row 3: Email ID */}
                  <div className="relative border-b border-neutral-300 focus-within:border-neutral-900 transition-colors py-1 pt-4">
                    <input
                      type="email"
                      name="email"
                      placeholder="Email ID*"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-transparent text-sm text-neutral-900 focus:outline-none font-sans font-light tracking-wide placeholder-neutral-400"
                    />
                    {errors.email && (
                      <span className="absolute -bottom-4 left-0 text-[10px] text-red-500">
                        {errors.email}
                      </span>
                    )}
                  </div>

                  {/* Custom Requested Club Mahindra Consent Checkbox */}
                  <div className="flex items-start gap-2.5 pt-4">
                    <input
                      type="checkbox"
                      name="consent"
                      id="consent"
                      checked={formData.consent}
                      onChange={handleChange}
                      className="mt-1 w-3.5 h-3.5 text-neutral-900 border-neutral-300 rounded focus:ring-neutral-900"
                    />
                    <label
                      htmlFor="consent"
                      className="text-[10px] text-neutral-500 font-sans font-light leading-relaxed select-none cursor-pointer"
                    >
                      I agree to be contacted by Club Mahindra regarding my
                      interest via phone call, WhatsApp, or any other medium. I
                      hereby provide my consent as per the{" "}
                      <a
                        href="#tnc"
                        className="underline font-normal text-neutral-700 hover:text-neutral-900 transition-colors"
                      >
                        T&C and Declaration
                      </a>
                      .
                    </label>
                  </div>
                  {errors.consent && (
                    <p className="text-red-500 text-[10px] mt-0.5">
                      {errors.consent}
                    </p>
                  )}

                  {/* Action Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full bg-[#0F1424] hover:bg-[#1A233D] text-white font-sans text-xs sm:text-sm font-medium tracking-wider py-3 rounded-xs transition-colors shadow-md active:scale-[0.99]"
                    >
                      Submit Information
                    </button>
                  </div>
                </form>
              </>
            ) : (
              /* Subscribed Success Frame view */
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-16 flex flex-col items-center justify-center"
              >
                <div className="w-12 h-12 rounded-full bg-neutral-900 text-white flex items-center justify-center mb-4 shadow-md">
                  <svg
                    className="w-5 h-5 stroke-[2.5]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-serif text-neutral-900 mb-1">
                  Thank You
                </h3>
                <p className="text-neutral-500 font-sans text-xs font-light">
                  Your information has been securely registered.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* RIGHT WATERMARK COMPONENT */}
        <div className="col-span-1 lg:col-span-6 xl:col-span-7 flex flex-col items-center lg:items-end justify-center pointer-events-none select-none text-right z-10">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex flex-col items-center lg:items-end text-center lg:text-right"
          >
            <span className="font-[Vera] italic font-light text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wide block leading-none opacity-95">
              Join Club Elevate
            </span>
            <span className="font-sans text-xs sm:text-sm font-semibold tracking-[0.35em] text-white/90 uppercase block mt-4 pr-1">
              Unlock a world of luxury travel
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
