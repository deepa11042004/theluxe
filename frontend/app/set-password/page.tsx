"use client";

import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import AuthShell, { authInputClass, authButtonClass } from "@/components/member/AuthShell";

function SetPasswordForm() {
  const router = useRouter();
  const token = useSearchParams().get("token") || "";
  const [state, setState] = useState<"checking" | "valid" | "invalid">(token ? "checking" : "invalid");
  const [isReset, setIsReset] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;
    fetch(`/api/v1/client/auth/check-token?token=${encodeURIComponent(token)}`)
      .then((r) => r.json())
      .then((j) => {
        if (j?.data?.valid) {
          setIsReset(j.data.purpose === "RESET_PASSWORD");
          setState("valid");
        } else setState("invalid");
      })
      .catch(() => setState("invalid"));
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password.length < 8 || !/[A-Za-z]/.test(password) || !/[0-9]/.test(password)) {
      setError("Use at least 8 characters with both letters and numbers.");
      return;
    }
    if (password !== confirm) {
      setError("The two passwords do not match.");
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch("/api/v1/client/auth/set-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.success) {
        router.replace("/member");
        return;
      }
      setError(json.message || "Could not save the password.");
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const title = isReset ? "Reset Password" : "Create Password";

  if (state === "checking") {
    return (
      <AuthShell title={title}>
        <div className="flex justify-center py-6">
          <div className="w-7 h-7 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
      </AuthShell>
    );
  }

  if (state === "invalid") {
    return (
      <AuthShell title="Link not valid" subtitle="This link has expired or was already used.">
        <Link href="/forgot-password" className={`${authButtonClass} mt-2 text-center no-underline`}>
          Get a new link
        </Link>
      </AuthShell>
    );
  }

  return (
    <AuthShell title={title} subtitle="Choose a password with at least 8 characters, including letters and numbers.">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label className="text-xs font-semibold tracking-wider text-white uppercase mb-2">New password</label>
        <div className="relative">
          <input type={show ? "text" : "password"} required autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} className={`${authInputClass} pr-11`} />
          <button type="button" onClick={() => setShow(!show)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1" tabIndex={-1} aria-label={show ? "Hide password" : "Show password"}>
            {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        <label className="text-xs font-semibold tracking-wider text-white uppercase mb-2 mt-6">Confirm password</label>
        <input type={show ? "text" : "password"} required autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} className={authInputClass} />
        {error && (
          <p role="alert" className="mt-4 text-sm text-red-100 bg-red-500/30 border border-red-300/40 rounded-lg px-3 py-2">
            {error}
          </p>
        )}
        <button type="submit" disabled={isLoading} className={authButtonClass}>
          {isLoading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : "Save & Sign In"}
        </button>
      </form>
    </AuthShell>
  );
}

export default function SetPasswordPage() {
  return (
    <Suspense fallback={null}>
      <SetPasswordForm />
    </Suspense>
  );
}
