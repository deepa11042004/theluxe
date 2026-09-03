"use client";

import React, { useState, useEffect } from "react";
import { UserCheck, Lock, CheckCircle, AlertCircle } from "lucide-react";

export default function AdminProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/v1/admin/auth/me")
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setUser(json.data);
      });
  }, []);

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");
    setError("");

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/v1/admin/auth/password", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const json = await res.json();
      if (json.success) {
        setMsg("Password updated successfully.");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setError(json.message || "Failed to update password.");
      }
    } catch (err) {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Admin Profile Settings</h2>
        <p className="text-xs text-gray-500 mt-1">Manage your account information and update password credentials.</p>
      </div>

      {user && (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
          <div className="flex items-center gap-4 border-b pb-4">
            <div className="w-12 h-12 rounded-full bg-[#B38E46]/10 text-[#B38E46] flex items-center justify-center font-bold text-lg border border-[#B38E46]/30">
              {user.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-base">{user.name}</h3>
              <p className="text-xs text-gray-500">{user.email}</p>
              <span className="inline-block mt-1 text-[10px] font-bold tracking-wider text-[#B38E46] uppercase bg-[#B38E46]/10 px-2 py-0.5 rounded">
                Role: {user.role}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* CHANGE PASSWORD */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-gray-800 uppercase flex items-center gap-2">
          <Lock className="w-4 h-4 text-[#B38E46]" /> Update Password
        </h3>

        {msg && <div className="p-3 bg-emerald-50 text-emerald-600 text-xs rounded-xl flex items-center gap-2"><CheckCircle className="w-4 h-4" />{msg}</div>}
        {error && <div className="p-3 bg-red-50 text-red-600 text-xs rounded-xl flex items-center gap-2"><AlertCircle className="w-4 h-4" />{error}</div>}

        <form onSubmit={handlePasswordUpdate} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Current Password</label>
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">New Password (min 6 characters)</label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">Confirm New Password</label>
            <input
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3.5 py-2 border border-gray-300 rounded-xl text-sm outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-[#B38E46] text-white px-5 py-2.5 rounded-xl text-xs font-semibold hover:bg-[#967536] disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
