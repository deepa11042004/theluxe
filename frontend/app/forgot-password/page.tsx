"use client";

import React, { useState } from "react";
import Link from "next/link";
import AuthShell, { authInputClass, authButtonClass } from "@/components/member/AuthShell";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      const res = await fetch("/api/v1/client/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.success) setMessage(json.message);
      else setError(json.message || "Something went wrong. Please try again.");
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthShell title="Forgot Password" subtitle="Enter the email you used to join. We will email you a link to set a new password.">
      {message ? (
        <div className="text-white">
          <p className="text-sm bg-white/15 border border-white/25 rounded-lg px-4 py-3 leading-relaxed">{message}</p>
          <p className="text-xs text-white/70 mt-3">The link works for 1 hour. Check your spam folder if you cannot find it.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="text-xs font-semibold tracking-wider text-white uppercase mb-2">Email</label>
          <input type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className={authInputClass} />
          {error && (
            <p role="alert" className="mt-4 text-sm text-red-100 bg-red-500/30 border border-red-300/40 rounded-lg px-3 py-2">
              {error}
            </p>
          )}
          <button type="submit" disabled={isLoading} className={authButtonClass}>
            {isLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : "Send Link"}
          </button>
        </form>
      )}
      <p className="text-center text-sm text-white/80 mt-6">
        <Link href="/login" className="underline font-bold hover:text-white transition-colors">
          Back to sign in
        </Link>
      </p>
    </AuthShell>
  );
}
