"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PublicLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // Admin panel, member portal and the sign-in pages bring their own chrome
  const isAdmin = ["/admin", "/member", "/login", "/forgot-password", "/set-password", "/signup"].some((p) => pathname === p || pathname?.startsWith(p + "/"));

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
