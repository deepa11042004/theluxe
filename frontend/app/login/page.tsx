"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import AuthShell, { authInputClass, authButtonClass } from "@/components/member/AuthShell";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Already signed in: go straight to the member area
  useEffect(() => {
    fetch("/api/v1/client/me")
      .then((r) => r.json())
      .then((j) => {
        if (j?.success) router.replace("/member");
      })
      .catch(() => {});
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const res = await fetch("/api/v1/client/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.success) {
        router.replace("/member");
        return;
      }
      setError(json.message || "Could not sign in. Please try again.");
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthShell title="Member Sign In" subtitle="Sign in to see your membership card, invoices and stay requests.">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label className="text-xs font-semibold tracking-wider text-white uppercase mb-2">Email</label>
        <input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className={authInputClass} />

        <label className="text-xs font-semibold tracking-wider text-white uppercase mb-2 mt-6">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className={`${authInputClass} pr-11`}
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1" tabIndex={-1} aria-label={showPassword ? "Hide password" : "Show password"}>
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        <Link href="/forgot-password" className="text-xs text-white/90 hover:text-white underline mt-3 self-end font-medium">
          Forgot password?
        </Link>

        {error && (
          <p role="alert" className="mt-4 text-sm text-red-100 bg-red-500/30 border border-red-300/40 rounded-lg px-3 py-2">
            {error}
          </p>
        )}

        <button type="submit" disabled={isLoading} className={authButtonClass}>
          {isLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : "Sign In"}
        </button>
      </form>

      <div className="flex items-center my-6 text-white/60 text-xs tracking-wider font-semibold">
        <div className="flex-1 h-px bg-white/20" />
        <span className="px-4 uppercase">or</span>
        <div className="flex-1 h-px bg-white/20" />
      </div>

      <p className="text-center text-sm text-white/80">
        Not a member yet?{" "}
        <Link href="/join" className="underline font-bold hover:text-white transition-colors">
          Join The Luxe Club
        </Link>
      </p>
      <p className="text-center text-xs text-white/60 mt-3">First time here? Use the &ldquo;Create Password&rdquo; button in your welcome email, or the forgot password link above.</p>
    </AuthShell>
  );
}
