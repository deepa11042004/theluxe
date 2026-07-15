"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Users,
  Mail,
  Calendar,
  Heart,
  Phone,
  MapPin,
  Hash,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Landmark,
  Navigation,
  Compass,
} from "lucide-react";
import Image from "next/image";

// ─── Types
interface FormData {
  membershipNumber: string;
  clientName: string;
  spouseName: string;
  email: string;
  dob: string;
  anniversary: string;
  primaryContact: string;
  secondaryContact: string;
  primaryAddress: string;
  primaryState: string;
  primaryPin: string;
  secondaryAddress: string;
  secondaryState: string;
  secondaryPin: string;
}

const STEPS = ["Identity", "Personal", "Contact", "Address"];

// ─── Premium Field Component
function Field({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="group flex flex-col gap-2 w-full">
      <label className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-neutral-400 group-focus-within:text-cyan-400 transition-colors">
        <span className="text-neutral-600 group-focus-within:text-cyan-400 transition-colors">
          {icon}
        </span>
        {label}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full bg-neutral-900/60 border border-neutral-800/80 rounded-2xl px-5 py-4 text-white placeholder:text-neutral-600 text-base focus:outline-none focus:border-cyan-500/50 focus:bg-neutral-900 transition-all duration-300 hover:border-neutral-700/60 shadow-inner";

function Divider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 my-4 w-full">
      <span className="text-xs tracking-[0.2em] uppercase text-cyan-400 font-bold whitespace-nowrap">
        {label}
      </span>
      <div className="h-px flex-1 bg-linear-to-r from-neutral-800 to-transparent" />
    </div>
  );
}

// ─── Main Component
export default function Joinsec() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [direction, setDirection] = useState(1);

  const [form, setForm] = useState<FormData>({
    membershipNumber: "",
    clientName: "",
    spouseName: "",
    email: "",
    dob: "",
    anniversary: "",
    primaryContact: "",
    secondaryContact: "",
    primaryAddress: "",
    primaryState: "",
    primaryPin: "",
    secondaryAddress: "",
    secondaryState: "",
    secondaryPin: "",
  });

  const set =
    (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const next = () => {
    setDirection(1);
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };
  const prev = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  };
  const submit = () => setSubmitted(true);

  const slideVariants = {
    enter: (d: number) => ({
      x: d > 0 ? 30 : -30,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({
      x: d > 0 ? -30 : 30,
      opacity: 0,
    }),
  };

  // ── Step panels
  const panels = [
    <div key="identity" className="flex flex-col gap-6">
      <Field label="Membership Number" icon={<Hash size={14} />}>
        <input
          className={inputClass}
          placeholder="MEM-00001"
          value={form.membershipNumber}
          onChange={set("membershipNumber")}
        />
      </Field>
      <Field label="Client's Full Name" icon={<User size={14} />}>
        <input
          className={inputClass}
          placeholder="John Alexander"
          value={form.clientName}
          onChange={set("clientName")}
        />
      </Field>
      <Field label="Spouse's Full Name" icon={<Users size={14} />}>
        <input
          className={inputClass}
          placeholder="Jane Alexander"
          value={form.spouseName}
          onChange={set("spouseName")}
        />
      </Field>
      <Field label="Email Address" icon={<Mail size={14} />}>
        <input
          type="email"
          className={inputClass}
          placeholder="john@example.com"
          value={form.email}
          onChange={set("email")}
        />
      </Field>
    </div>,

    <div key="personal" className="flex flex-col gap-6">
      <Field label="Date of Birth" icon={<Calendar size={14} />}>
        <input
          type="date"
          className={`${inputClass} scheme-dark`}
          value={form.dob}
          onChange={set("dob")}
        />
      </Field>
      <Field label="Marriage Anniversary" icon={<Heart size={14} />}>
        <input
          type="date"
          className={`${inputClass} scheme-dark`}
          value={form.anniversary}
          onChange={set("anniversary")}
        />
      </Field>
    </div>,

    <div key="contact" className="flex flex-col gap-6">
      <Field label="Primary Contact" icon={<Phone size={14} />}>
        <input
          type="tel"
          className={inputClass}
          placeholder="+91 98765 43210"
          value={form.primaryContact}
          onChange={set("primaryContact")}
        />
      </Field>
      <Field label="Secondary Contact" icon={<Phone size={14} />}>
        <input
          type="tel"
          className={inputClass}
          placeholder="+91 91234 56789"
          value={form.secondaryContact}
          onChange={set("secondaryContact")}
        />
      </Field>
    </div>,

    <div key="address" className="flex flex-col gap-6">
      <Divider label="Primary Location" />
      <Field label="Street / Locality" icon={<MapPin size={14} />}>
        <input
          className={inputClass}
          placeholder="123, Park Street"
          value={form.primaryAddress}
          onChange={set("primaryAddress")}
        />
      </Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="State" icon={<Landmark size={14} />}>
          <input
            className={inputClass}
            placeholder="Uttar Pradesh"
            value={form.primaryState}
            onChange={set("primaryState")}
          />
        </Field>
        <Field label="Pin Code" icon={<Navigation size={14} />}>
          <input
            className={inputClass}
            placeholder="201001"
            maxLength={6}
            value={form.primaryPin}
            onChange={set("primaryPin")}
          />
        </Field>
      </div>

      <Divider label="Secondary Location" />
      <Field label="Street / Locality" icon={<MapPin size={14} />}>
        <input
          className={inputClass}
          placeholder="456, Lake Avenue"
          value={form.secondaryAddress}
          onChange={set("secondaryAddress")}
        />
      </Field>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="State" icon={<Landmark size={14} />}>
          <input
            className={inputClass}
            placeholder="Maharashtra"
            value={form.secondaryState}
            onChange={set("secondaryState")}
          />
        </Field>
        <Field label="Pin Code" icon={<Navigation size={14} />}>
          <input
            className={inputClass}
            placeholder="400001"
            maxLength={6}
            value={form.secondaryPin}
            onChange={set("secondaryPin")}
          />
        </Field>
      </div>
    </div>,
  ];

  if (submitted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="text-center flex flex-col items-center gap-6 max-w-sm"
        >
          <div className="w-20 h-20 rounded-full bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.15)]">
            <CheckCircle2 size={36} className="text-cyan-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Welcome, {form.clientName || "Member"}!
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Your registration application has been processed into the secure
              ecosystem.
            </p>
          </div>
          <button
            onClick={() => {
              setSubmitted(false);
              setStep(0);
              setForm({
                membershipNumber: "",
                clientName: "",
                spouseName: "",
                email: "",
                dob: "",
                anniversary: "",
                primaryContact: "",
                secondaryContact: "",
                primaryAddress: "",
                primaryState: "",
                primaryPin: "",
                secondaryAddress: "",
                secondaryState: "",
                secondaryPin: "",
              });
            }}
            className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors underline underline-offset-4 cursor-pointer"
          >
            Submit another profile
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans grid grid-cols-1 lg:grid-cols-12 overflow-x-hidden border-b border-neutral-900">
      {/* LEFT SIDE: THE ASYMMETRIC BRANDING PANEL (Responsive Height Match)*/}
      <div className="lg:col-span-5 bg-neutral-950 border-b lg:border-b-0 lg:border-r border-neutral-900 p-8 sm:p-12 lg:p-16 flex flex-col justify-center relative min-h-80 lg:h-full overflow-hidden select-none">
        {/* Premium Background Image with Readability Shader */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80" // Replace with your vacation/landscape asset
            alt="Onboarding Background"
            fill
            priority
            className="object-cover object-center brightness-[0.2] contrast-[1.05]"
          />
          {/* Dark radial vignetting gradient to pull focus onto typography */}
          <div className="absolute inset-0 bg-linear-to-tr from-black via-black/80 to-transparent" />
        </div>

        {/* Content Layer */}
        <div className="relative z-10 w-full max-w-sm">
          <div className="flex items-center gap-2 text-cyan-400 font-medium text-xs tracking-[0.3em] uppercase mb-6 sm:mb-8">
            <Compass className="w-4 h-4 animate-spin-slow" />
            <span>Portal Onboarding</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
            Join Our Membership
          </h1>
          <p className="text-neutral-400 text-sm font-light leading-relaxed">
            Create your account across four clear onboarding channels to
            seamlessly unlock exclusive member privileges.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: UNBOUNDED FLOATING INPUT FIELDS SECTION */}
      <div className="lg:col-span-7 flex flex-col justify-center p-6 sm:p-12 lg:p-20 xl:p-28 relative bg-black min-h-125">
        <div className="w-full max-w-xl mx-auto flex flex-col justify-between h-full">
          {/* Dynamic Input Form Wrapper (Completely outside traditional rigid cards) */}
          <div className="relative overflow-hidden min-h-85 py-4">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.25, 1, 0.5, 1] }}
                className="w-full"
              >
                <div className="mb-6">
                  <span className="text-[10px] tracking-[0.25em] font-mono text-cyan-500/80 uppercase font-bold">
                    Section // 0{step + 1}
                  </span>
                  <h2 className="text-xl font-bold text-neutral-200 tracking-wide mt-0.5">
                    Configure your {STEPS[step]} details
                  </h2>
                </div>
                {panels[step]}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Action Control Bar */}
          <div className="flex items-center justify-between mt-12 pt-6 border-t border-neutral-900 w-full">
            <motion.button
              onClick={prev}
              disabled={step === 0}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-300 disabled:opacity-0 disabled:pointer-events-none transition-colors cursor-pointer py-2"
            >
              <ChevronLeft size={16} />
              Back
            </motion.button>

            <span className="text-xs text-neutral-600 font-mono tracking-widest hidden sm:inline">
              {step + 1} &mdash; {STEPS.length}
            </span>

            {step < STEPS.length - 1 ? (
              <motion.button
                onClick={next}
                whileTap={{ scale: 0.96 }}
                className="flex items-center gap-1.5 text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors cursor-pointer py-2"
              >
                Continue
                <ChevronRight size={16} />
              </motion.button>
            ) : (
              <motion.button
                onClick={submit}
                whileHover={{
                  scale: 1.02,
                }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 bg-white text-black text-sm font-bold px-7 py-3 rounded-full transition-all cursor-pointer"
              >
                Complete Submission
                <CheckCircle2 size={15} />
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
