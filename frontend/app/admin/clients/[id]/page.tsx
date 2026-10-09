"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Crown,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building,
  CheckCircle2,
  Clock,
  ShieldCheck,
  CreditCard,
  Printer,
  Edit,
  Trash2,
  FileText,
  User,
} from "lucide-react";
import LuxeMembershipCard from "@/components/Club/LuxeMembershipCard";

interface Client {
  id: string;
  salutation: string;
  name: string;
  email: string;
  mobile: string;
  city: string;
  tier: "Luxe Signature" | "Luxe Prestige" | "Luxe Black (Limited Edition)";
  membershipNo: string;
  joinDate: string;
  status: "ACTIVE" | "PENDING" | "EXPIRED";
  companyName?: string;
  gstin?: string;
}

const DEFAULT_MOCK_CLIENTS: Client[] = [
  {
    id: "cl-1",
    salutation: "Mr.",
    name: "John Doe",
    email: "john.doe@example.com",
    mobile: "+91 9876543210",
    city: "Delhi NCR",
    tier: "Luxe Signature",
    membershipNo: "LY-100001",
    joinDate: "2026-10-08",
    status: "ACTIVE",
    companyName: "Acme Enterprises Pvt Ltd",
    gstin: "07AAAAA0000A1Z5",
  },
  {
    id: "cl-2",
    salutation: "Mrs.",
    name: "Ananya Sharma",
    email: "ananya.sharma@example.com",
    mobile: "+91 9123456789",
    city: "Mumbai",
    tier: "Luxe Prestige",
    membershipNo: "LY-100002",
    joinDate: "2026-10-07",
    status: "ACTIVE",
  },
  {
    id: "cl-3",
    salutation: "Mr.",
    name: "Vikramaditya Roy",
    email: "v.roy@royholdings.com",
    mobile: "+91 9988776655",
    city: "Bengaluru",
    tier: "Luxe Black (Limited Edition)",
    membershipNo: "LY-100003",
    joinDate: "2026-10-05",
    status: "ACTIVE",
    companyName: "Roy Holdings & Global Capital",
    gstin: "27BBBCA1234F1Z8",
  },
  {
    id: "cl-4",
    salutation: "Ms.",
    name: "Priya Malhotra",
    email: "priya.m@techventures.in",
    mobile: "+91 9711223344",
    city: "Pune",
    tier: "Luxe Signature",
    membershipNo: "LY-100004",
    joinDate: "2026-10-04",
    status: "PENDING",
    companyName: "TechVentures Digital Ltd",
    gstin: "19AAACT9876K1Z2",
  },
  {
    id: "cl-5",
    salutation: "Dr.",
    name: "Rajesh Kumar",
    email: "rajesh.kumar@gmail.com",
    mobile: "+91 9810098100",
    city: "Hyderabad",
    tier: "Luxe Prestige",
    membershipNo: "LY-100005",
    joinDate: "2026-09-28",
    status: "ACTIVE",
  },
];

export default function ClientProfileDetailPage() {
  const params = useParams();
  const router = useRouter();
  const clientId = params?.id as string;

  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!clientId) return;

    try {
      const savedJSON = localStorage.getItem("luxe_clients_list");
      let allClients: Client[] = [];
      if (savedJSON) {
        allClients = JSON.parse(savedJSON);
      } else {
        allClients = DEFAULT_MOCK_CLIENTS;
        localStorage.setItem("luxe_clients_list", JSON.stringify(DEFAULT_MOCK_CLIENTS));
      }

      const found = allClients.find((c) => c.id === clientId || c.membershipNo === clientId);

      if (found) {
        setClient(found);
      } else {
        setClient({
          id: clientId,
          salutation: "Mr.",
          name: "Member Profile",
          email: "client@example.com",
          mobile: "+91 9876543210",
          city: "India",
          tier: "Luxe Signature",
          membershipNo: clientId.startsWith("LY") ? clientId : "LY-100001",
          joinDate: new Date().toISOString().split("T")[0],
          status: "ACTIVE",
        });
      }
    } catch (err) {
      console.error("Error loading client profile:", err);
    } finally {
      setLoading(false);
    }
  }, [clientId]);

  const handleDelete = () => {
    if (!client) return;
    if (window.confirm(`Are you sure you want to delete client profile "${client.name}"?`)) {
      try {
        const savedJSON = localStorage.getItem("luxe_clients_list");
        const listToUpdate: Client[] = savedJSON ? JSON.parse(savedJSON) : DEFAULT_MOCK_CLIENTS;
        const updated = listToUpdate.filter((c) => c.id !== client.id && c.membershipNo !== client.membershipNo);
        localStorage.setItem("luxe_clients_list", JSON.stringify(updated));
      } catch (err) {
        console.error("Error removing client:", err);
      }
      router.push("/admin/clients");
    }
  };

  if (loading) {
    return (
      <div className="p-10 min-h-screen bg-[#F8F9FA] flex items-center justify-center text-neutral-600">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-[#E39F25] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-semibold uppercase tracking-widest">
            Loading Client Profile...
          </span>
        </div>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="p-10 min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center space-y-4">
        <h2 className="text-xl font-bold text-neutral-900">Client Not Found</h2>
        <Link
          href="/admin/clients"
          className="text-xs font-semibold uppercase text-[#E39F25] hover:underline"
        >
          Return to Clients List
        </Link>
      </div>
    );
  }

  const getTierCardType = (tierStr: string) => {
    if (tierStr.includes("Prestige")) return "diamond";
    if (tierStr.includes("Black")) return "imperial";
    return "signature";
  };

  return (
    <div className="p-6 md:p-10 space-y-8 bg-[#F8F9FA] text-neutral-900 min-h-screen">
      {/* TOP BREADCRUMB & BACK BUTTON */}
      <div className="flex items-center justify-between border-b border-neutral-200 pb-5">
        <Link
          href="/admin/clients"
          className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900 bg-white border border-neutral-200 px-4 py-2 rounded-xl transition-all shadow-xs"
        >
          <ArrowLeft className="w-4 h-4 text-[#E39F25]" />
          <span>Back to Clients</span>
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-800 text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-xs cursor-pointer"
          >
            <Printer className="w-4 h-4 text-neutral-500" />
            <span>Print Profile</span>
          </button>
          <button
            onClick={() => window.open(`mailto:${client.email}`)}
            className="inline-flex items-center gap-2 bg-[#E39F25] hover:bg-[#c88a1e] text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-md shadow-[#E39F25]/20 cursor-pointer"
          >
            <Mail className="w-4 h-4" />
            <span>Email Client</span>
          </button>
          <button
            onClick={handleDelete}
            className="inline-flex items-center gap-2 bg-red-50 hover:bg-red-600 border border-red-200 text-red-600 hover:text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      {/* CLIENT HEADER BANNER */}
      <div className="bg-white rounded-2xl border border-neutral-200 p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-[#E39F25]/15 border border-[#E39F25]/30 flex items-center justify-center text-[#E39F25] font-serif text-2xl font-bold shadow-xs">
            {client.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl md:text-3xl font-bold text-neutral-900">
                {client.salutation} {client.name}
              </h1>
              {client.status === "ACTIVE" ? (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5" /> ACTIVE MEMBER
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                  <Clock className="w-3.5 h-3.5" /> PENDING
                </span>
              )}
            </div>
            <div className="flex items-center gap-4 text-xs text-neutral-500 mt-1 font-mono">
              <span className="text-[#E39F25] font-semibold">
                Membership #{client.membershipNo}
              </span>
              <span>•</span>
              <span>Joined: {client.joinDate}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-[#FAF8F5] border border-[#E39F25]/20 p-3.5 rounded-xl w-full md:w-auto">
          <ShieldCheck className="w-8 h-8 text-[#E39F25] shrink-0" />
          <div>
            <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold block">
              CURRENT TIER LEVEL
            </span>
            <span className="text-sm font-bold text-neutral-900 block">
              {client.tier}
            </span>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: CONTACT & ACCOUNT DETAILS */}
        <div className="lg:col-span-7 space-y-8">
          {/* PERSONAL & CONTACT INFORMATION */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm space-y-6">
            <h2 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-3 flex items-center gap-2">
              <User className="w-4 h-4 text-[#E39F25]" />
              Personal & Contact Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200/70">
                <span className="text-neutral-500 block text-[10px] uppercase tracking-wider font-semibold mb-1">
                  Full Name & Salutation
                </span>
                <p className="font-semibold text-neutral-900 text-sm">
                  {client.salutation} {client.name}
                </p>
              </div>

              <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200/70">
                <span className="text-neutral-500 block text-[10px] uppercase tracking-wider font-semibold mb-1">
                  Primary Email
                </span>
                <p className="font-semibold text-neutral-900 flex items-center gap-1.5 truncate">
                  <Mail className="w-3.5 h-3.5 text-[#E39F25] shrink-0" />
                  {client.email}
                </p>
              </div>

              <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200/70">
                <span className="text-neutral-500 block text-[10px] uppercase tracking-wider font-semibold mb-1">
                  Mobile Contact
                </span>
                <p className="font-semibold text-neutral-900 flex items-center gap-1.5 font-mono">
                  <Phone className="w-3.5 h-3.5 text-[#E39F25] shrink-0" />
                  {client.mobile}
                </p>
              </div>

              <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200/70">
                <span className="text-neutral-500 block text-[10px] uppercase tracking-wider font-semibold mb-1">
                  City / Location
                </span>
                <p className="font-semibold text-neutral-900 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#E39F25] shrink-0" />
                  {client.city}
                </p>
              </div>
            </div>
          </div>

          {/* COMPANY & GST BILLING PROFILE */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm space-y-6">
            <h2 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-3 flex items-center gap-2">
              <Building className="w-4 h-4 text-[#E39F25]" />
              Company GST & Invoicing Profile
            </h2>

            {client.companyName ? (
              <div className="bg-blue-50/60 border border-blue-200 p-5 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                    Business Tax Profile Registered
                  </span>
                  <span className="text-[10px] bg-blue-600 text-white font-mono px-2.5 py-0.5 rounded-full font-semibold">
                    18% GST Eligible
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
                  <div>
                    <span className="text-neutral-500 block text-[10px] uppercase">
                      Company Registered Name
                    </span>
                    <p className="font-bold text-neutral-900 text-sm">{client.companyName}</p>
                  </div>
                  <div>
                    <span className="text-neutral-500 block text-[10px] uppercase">
                      GSTIN Tax ID
                    </span>
                    <p className="font-mono font-bold text-blue-900">{client.gstin}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-500">
                No company GST profile was requested during registration. (Individual B2C Member)
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: DIGITAL MEMBERSHIP CARD & RECENT BILLING */}
        <div className="lg:col-span-5 space-y-8">
          {/* DIGITAL MEMBERSHIP CARD CARD */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm space-y-5">
            <h2 className="text-base font-bold text-neutral-900 border-b border-neutral-100 pb-3 flex items-center gap-2">
              <Crown className="w-4 h-4 text-[#E39F25]" />
              Digital Luxe Membership Card
            </h2>

            <div className="w-full max-w-sm mx-auto">
              <LuxeMembershipCard
                tier={getTierCardType(client.tier)}
                title={client.tier.toUpperCase()}
                membershipNo={client.membershipNo}
              />
            </div>

            <div className="pt-2 text-xs text-neutral-600 space-y-2 border-t border-neutral-100">
              <div className="flex justify-between py-1">
                <span>Tier Benefits:</span>
                <span className="font-semibold text-neutral-900">100% Concierge & Resort Credits</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Membership Status:</span>
                <span className="font-semibold text-emerald-600">Active / Valid</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
