"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock, Mail, ArrowRight, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@theluxeyatra.com");
  const [password, setPassword] = useState("Admin@123456");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/v1/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const json = await res.json();
      if (json.success) {
        router.push("/admin");
      } else {
        setError(json.message || "Invalid credentials.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#191919] border border-[#B38E46]/30 rounded-2xl p-8 shadow-2xl space-y-6">
        {/* LOGO & TITLE */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="relative h-16 w-16">
            <Image
              src="/Img/logo-emblem-v3.png"
              alt="The Luxe Yatra Logo"
              fill
              className="object-contain brightness-0 invert"
              priority
            />
          </div>
          <h2 className="text-xl font-bold tracking-wider text-white uppercase">
            Admin CMS Portal
          </h2>
          <p className="text-xs text-gray-400 font-light">
            Sign in with your authorized admin credentials
          </p>
        </div>

        {/* ERROR DISPLAY */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-xl flex items-center gap-2 text-xs text-red-400">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@theluxeyatra.com"
                className="w-full bg-black/40 border border-gray-700 text-white text-sm rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-[#B38E46] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-500 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-black/40 border border-gray-700 text-white text-sm rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-[#B38E46] transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#B38E46] hover:bg-[#967536] text-white font-semibold py-3 rounded-xl text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all disabled:opacity-50 shadow-lg shadow-[#B38E46]/20 cursor-pointer"
          >
            {loading ? "Authenticating..." : "Sign In to Admin Portal"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2">
          <p className="text-[11px] text-gray-500">
            Protected Phase-1 CMS • Restricted Access
          </p>
        </div>
      </div>
    </div>
  );
}
