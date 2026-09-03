"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false);
      return;
    }

    const checkAuth = async () => {
      try {
        const res = await fetch("/api/v1/admin/auth/me");
        const json = await res.json();
        if (json.success && json.data) {
          setUser(json.data);
        } else {
          router.push("/admin/login");
        }
      } catch (err) {
        router.push("/admin/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [pathname, isLoginPage, router]);

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-[#B38E46] border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xs font-semibold text-gray-600 tracking-wider uppercase">
            Loading Admin Session...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row max-w-full overflow-x-hidden">
      <AdminSidebar
        userRole={user?.role}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <AdminHeader
        user={user}
        onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
      />
      <main className="flex-1 lg:ml-64 mt-16 p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-4rem)] max-w-full overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
