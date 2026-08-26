"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    setIsLoading(true);
    // Simulate signup
    setTimeout(() => {
      setIsLoading(false);
      alert("Account registration simulated successfully!");
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row relative overflow-x-hidden select-none font-sans">
      {/* Background Image */}
      <Image
        src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=2000&q=80"
        alt="Travel Destination Background"
        fill
        priority
        className="object-cover -z-10"
      />
      {/* Background Dark Overlay */}
      <div className="absolute inset-0 bg-black/35 -z-10" />

      {/* Back to Home Button */}
      <Link
        href="/"
        className="absolute top-6 left-6 z-20 flex items-center gap-2 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium transition-all group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        <span>Back to Home</span>
      </Link>

      {/* Left Column: Brand Marketing (TRAVEL Explore Horizons) */}
      <div className="flex-1 flex flex-col justify-center px-6 pt-28 pb-8 md:py-8 md:px-20 text-white z-10 select-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-xl"
        >
          <h1 className="text-xl md:text-2xl font-bold tracking-widest text-white uppercase mb-4 md:mb-8">
            The Luxe Yatra TRAVELS
          </h1>

          {/* Heading */}
          <h1 className="text-3xl md:text-6xl lg:text-7xl tracking-wide uppercase leading-[1.05] mb-4 md:mb-6">
            Explore <br />
            <span className="text-white">Horizons</span>
          </h1>

          {/* Subheading & Description */}
          <p className="text-base md:text-2xl text-white/90 mb-2 md:mb-4 leading-snug">
            Where Your Dream Destinations Become Reality.
          </p>
          <p className="text-xs md:text-base text-white/70 max-w-md leading-relaxed">
            Embark on a journey where every corner of the world is within your
            reach.
          </p>
        </motion.div>
      </div>

      {/* Right Column: Glassmorphic Form Card */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 md:p-20 z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl md:rounded-[2.5rem] border border-white/20 p-6 md:p-12 shadow-2xl flex flex-col"
        >
          <form onSubmit={handleSubmit} className="flex flex-col">
            {/* Full Name Field */}
            <div className="flex flex-col">
              <label className="text-xs font-semibold tracking-wider text-white uppercase mb-2">
                Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full bg-white rounded-xl px-4 py-3.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm shadow-sm transition-all border border-transparent focus:border-transparent font-medium"
              />
            </div>

            {/* Email Field */}
            <div className="flex flex-col mt-5">
              <label className="text-xs font-semibold tracking-wider text-white uppercase mb-2">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-white rounded-xl px-4 py-3.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm shadow-sm transition-all border border-transparent focus:border-transparent font-medium"
              />
            </div>

            {/* Password Field */}
            <div className="flex flex-col mt-5 relative">
              <label className="text-xs font-semibold tracking-wider text-white uppercase mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="***********"
                  className="w-full bg-white rounded-xl pl-4 pr-11 py-3.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm shadow-sm transition-all border border-transparent focus:border-transparent font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="flex flex-col mt-5 relative">
              <label className="text-xs font-semibold tracking-wider text-white uppercase mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="***********"
                  className="w-full bg-white rounded-xl pl-4 pr-11 py-3.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm shadow-sm transition-all border border-transparent focus:border-transparent font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                  tabIndex={-1}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* SIGN UP Action Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-8 bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white py-3.5 rounded-xl font-bold tracking-wider text-sm transition-all uppercase shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-5 text-white/60 text-xs tracking-wider font-semibold">
            <div className="flex-1 h-px bg-white/20" />
            <span className="px-4 uppercase">or</span>
            <div className="flex-1 h-px bg-white/20" />
          </div>

          {/* Footer Link */}
          <p className="text-center text-sm text-white/80">
            Already have an account?{" "}
            <Link
              href="/login"
              className="underline font-bold hover:text-white transition-colors"
            >
              Sign In
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
