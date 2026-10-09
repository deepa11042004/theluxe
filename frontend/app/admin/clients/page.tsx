"use client";

import React, { useState } from "react";
import {
  Search,
  UserCheck,
  UserPlus,
  Mail,
  Phone,
  MapPin,
  Crown,
  Eye,
  Filter,
  CheckCircle2,
  Clock,
  X,
  ShieldCheck,
  Building,
  Trash2,
} from "lucide-react";

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

const MOCK_CLIENTS: Client[] = [
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

export default function AdminClientsPage() {
  const [clients, setClients] = useState<Client[]>(MOCK_CLIENTS);
  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem("luxe_clients_list");
      if (saved) {
        const parsed = JSON.parse(saved);
        setClients((prev) => {
          const ids = new Set(parsed.map((item: any) => item.id));
          const rest = prev.filter((item) => !ids.has(item.id));
          return [...parsed, ...rest];
        });
      }
    } catch (err) {
      console.error("Error reading saved clients:", err);
    }
  }, []);

  const handleDeleteClient = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to delete client "${name}"?`)) {
      setClients((prev) => {
        const updated = prev.filter((cl) => cl.id !== id);
        try {
          localStorage.setItem("luxe_clients_list", JSON.stringify(updated));
        } catch (err) {
          console.error("Error updating local storage:", err);
        }
        return updated;
      });
    }
  };

  const filteredClients = clients.filter((cl) => {
    const matchesSearch =
      cl.name.toLowerCase().includes(search.toLowerCase()) ||
      cl.email.toLowerCase().includes(search.toLowerCase()) ||
      cl.mobile.includes(search) ||
      cl.city.toLowerCase().includes(search.toLowerCase()) ||
      cl.membershipNo.toLowerCase().includes(search.toLowerCase());

    const matchesTier = tierFilter ? cl.tier.includes(tierFilter) : true;
    const matchesStatus = statusFilter ? cl.status === statusFilter : true;

    return matchesSearch && matchesTier && matchesStatus;
  });

  return (
    <div className="p-6 md:p-10 space-y-8 bg-[#F8F9FA] text-neutral-900 min-h-screen">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-wide text-neutral-900">
            Clients & Members Management
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            View member profiles, active Luxe Club tiers, contact information, and membership status.
          </p>
        </div>

        <button
          onClick={() => alert("Add Client modal / form feature")}
          className="flex items-center gap-2 bg-[#E39F25] hover:bg-[#c88a1e] text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-md shadow-[#E39F25]/20 cursor-pointer w-fit"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add New Client</span>
        </button>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white border border-neutral-200 rounded-2xl p-5 flex items-center justify-between shadow-sm">
          <div>
            <span className="text-xs text-neutral-500 uppercase font-semibold tracking-wider">
              Total Registered Clients
            </span>
            <h3 className="text-2xl font-bold text-neutral-900 mt-1">
              {clients.length}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#E39F25]/10 border border-[#E39F25]/20 flex items-center justify-center text-[#E39F25]">
            <UserCheck className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-neutral-200 rounded-2xl p-5 flex items-center justify-between shadow-sm">
          <div>
            <span className="text-xs text-neutral-500 uppercase font-semibold tracking-wider">
              Active Luxe Members
            </span>
            <h3 className="text-2xl font-bold text-emerald-600 mt-1">
              {clients.filter((c) => c.status === "ACTIVE").length}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
            <Crown className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-neutral-200 rounded-2xl p-5 flex items-center justify-between shadow-sm">
          <div>
            <span className="text-xs text-neutral-500 uppercase font-semibold tracking-wider">
              Pending Approvals
            </span>
            <h3 className="text-2xl font-bold text-amber-600 mt-1">
              {clients.filter((c) => c.status === "PENDING").length}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
            <Clock className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* FILTER & SEARCH CONTROL */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-2xl border border-neutral-200 shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by client name, email, phone, city, or membership #..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-neutral-50 border border-neutral-200 rounded-xl pl-10 pr-4 py-2 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#E39F25]"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-neutral-400 shrink-0" />
          
          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value)}
            className="bg-neutral-50 border border-neutral-200 text-xs text-neutral-900 rounded-xl px-3 py-2 focus:outline-none focus:border-[#E39F25] cursor-pointer w-full sm:w-auto"
          >
            <option value="">All Tiers</option>
            <option value="Signature">Signature</option>
            <option value="Prestige">Prestige</option>
            <option value="Black">Black Edition</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-neutral-50 border border-neutral-200 text-xs text-neutral-900 rounded-xl px-3 py-2 focus:outline-none focus:border-[#E39F25] cursor-pointer w-full sm:w-auto"
          >
            <option value="">All Statuses</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="PENDING">PENDING</option>
            <option value="EXPIRED">EXPIRED</option>
          </select>
        </div>
      </div>

      {/* CLIENTS TABLE */}
      <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-100 text-neutral-600 uppercase tracking-wider font-semibold border-b border-neutral-200">
              <tr>
                <th className="py-3.5 px-5">MEMBERSHIP NO</th>
                <th className="py-3.5 px-5">CLIENT NAME</th>
                <th className="py-3.5 px-5">TIER</th>
                <th className="py-3.5 px-5">CITY</th>
                <th className="py-3.5 px-5">MOBILE</th>
                <th className="py-3.5 px-5">JOIN DATE</th>
                <th className="py-3.5 px-5">STATUS</th>
                <th className="py-3.5 px-5 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-neutral-800">
              {filteredClients.length > 0 ? (
                filteredClients.map((cl) => (
                  <tr key={cl.id} className="hover:bg-neutral-50/80 transition-colors">
                    <td className="py-4 px-5 font-mono text-[#E39F25] font-semibold">
                      {cl.membershipNo}
                    </td>
                    <td className="py-4 px-5">
                      <div className="font-semibold text-neutral-900">
                        {cl.salutation} {cl.name}
                      </div>
                      <div className="text-[10px] text-neutral-500">{cl.email}</div>
                    </td>
                    <td className="py-4 px-5 font-medium">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#E39F25]/10 text-[#E39F25] border border-[#E39F25]/20">
                        <Crown className="w-3 h-3" /> {cl.tier}
                      </span>
                    </td>
                    <td className="py-4 px-5 text-neutral-700">{cl.city}</td>
                    <td className="py-4 px-5 font-mono text-neutral-600">{cl.mobile}</td>
                    <td className="py-4 px-5 text-neutral-500">{cl.joinDate}</td>
                    <td className="py-4 px-5">
                      {cl.status === "ACTIVE" && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" /> ACTIVE
                        </span>
                      )}
                      {cl.status === "PENDING" && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                          <Clock className="w-3 h-3" /> PENDING
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedClient(cl)}
                          className="inline-flex items-center gap-1.5 text-neutral-700 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 px-3 py-1.5 rounded-lg transition-colors text-[11px] font-medium cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5 text-[#E39F25]" />
                          <span>Profile</span>
                        </button>
                        <button
                          onClick={() => handleDeleteClient(cl.id, `${cl.salutation} ${cl.name}`)}
                          className="inline-flex items-center gap-1 text-red-600 hover:text-white bg-red-50 hover:bg-red-600 border border-red-200 hover:border-red-600 px-2.5 py-1.5 rounded-lg transition-colors text-[11px] font-medium cursor-pointer"
                          title="Delete Client"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-neutral-400">
                    No clients found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CLIENT DETAILS MODAL */}
      {selectedClient && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-neutral-200 rounded-2xl max-w-lg w-full p-6 text-neutral-900 relative shadow-2xl space-y-6">
            <button
              onClick={() => setSelectedClient(null)}
              className="absolute top-4 right-4 p-1.5 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* MODAL HEADER */}
            <div className="flex items-center gap-3 border-b border-neutral-200 pb-4">
              <div className="w-12 h-12 rounded-full bg-[#E39F25]/15 border border-[#E39F25]/30 flex items-center justify-center text-[#E39F25] font-bold text-lg">
                {selectedClient.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-bold text-neutral-900">
                  {selectedClient.salutation} {selectedClient.name}
                </h3>
                <span className="text-xs font-mono text-[#E39F25]">
                  Membership #{selectedClient.membershipNo}
                </span>
              </div>
            </div>

            {/* DETAILS GRID */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="bg-neutral-50 p-3.5 rounded-xl border border-neutral-200">
                <span className="text-neutral-500 block text-[10px] font-semibold uppercase mb-1">
                  Email Address
                </span>
                <p className="font-semibold text-neutral-900 flex items-center gap-1.5 truncate">
                  <Mail className="w-3.5 h-3.5 text-[#E39F25]" /> {selectedClient.email}
                </p>
              </div>

              <div className="bg-neutral-50 p-3.5 rounded-xl border border-neutral-200">
                <span className="text-neutral-500 block text-[10px] font-semibold uppercase mb-1">
                  Mobile Contact
                </span>
                <p className="font-semibold text-neutral-900 flex items-center gap-1.5 font-mono">
                  <Phone className="w-3.5 h-3.5 text-[#E39F25]" /> {selectedClient.mobile}
                </p>
              </div>

              <div className="bg-neutral-50 p-3.5 rounded-xl border border-neutral-200">
                <span className="text-neutral-500 block text-[10px] font-semibold uppercase mb-1">
                  Location / City
                </span>
                <p className="font-semibold text-neutral-900 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#E39F25]" /> {selectedClient.city}
                </p>
              </div>

              <div className="bg-neutral-50 p-3.5 rounded-xl border border-neutral-200">
                <span className="text-neutral-500 block text-[10px] font-semibold uppercase mb-1">
                  Luxe Club Tier
                </span>
                <p className="font-bold text-[#E39F25] flex items-center gap-1.5">
                  <Crown className="w-3.5 h-3.5 text-[#E39F25]" /> {selectedClient.tier}
                </p>
              </div>
            </div>

            {/* COMPANY / GST DETAILS IF PRESENT */}
            {selectedClient.companyName && (
              <div className="bg-blue-50/60 border border-blue-200 p-4 rounded-xl text-xs space-y-1">
                <span className="text-blue-700 font-semibold uppercase text-[10px] tracking-wider block">
                  Company GST Billing Profile
                </span>
                <p className="font-bold text-neutral-900">{selectedClient.companyName}</p>
                <p className="font-mono text-neutral-600">GSTIN: {selectedClient.gstin}</p>
              </div>
            )}

            {/* MODAL ACTIONS */}
            <div className="flex items-center justify-between pt-2 border-t border-neutral-200">
              <button
                onClick={() => window.open(`mailto:${selectedClient.email}`)}
                className="flex items-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-xs font-semibold px-4 py-2 rounded-xl transition-colors cursor-pointer"
              >
                <Mail className="w-4 h-4 text-[#E39F25]" />
                <span>Send Email</span>
              </button>

              <button
                onClick={() => setSelectedClient(null)}
                className="bg-[#E39F25] hover:bg-[#c88a1e] text-white text-xs font-semibold px-5 py-2 rounded-xl transition-colors cursor-pointer"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
