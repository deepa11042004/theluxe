"use client";

import React, { useState } from "react";
import {
  Search,
  Download,
  Eye,
  FileText,
  Filter,
  DollarSign,
  CheckCircle2,
  Clock,
  Building,
  Receipt,
  X,
} from "lucide-react";

interface Invoice {
  id: string;
  invoiceNo: string;
  customerName: string;
  email: string;
  mobile: string;
  plan: string;
  amount: number;
  gstAmount: number;
  totalAmount: number;
  needGst: boolean;
  companyName?: string;
  gstin?: string;
  date: string;
  status: "PAID" | "PENDING" | "REFUNDED" | "CANCELLED";
}

const MOCK_INVOICES: Invoice[] = [
  {
    id: "inv-1",
    invoiceNo: "LY-INV-2026-001",
    customerName: "John Doe",
    email: "john.doe@example.com",
    mobile: "+91 9876543210",
    plan: "Luxe Signature Membership",
    amount: 150000,
    gstAmount: 27000,
    totalAmount: 177000,
    needGst: true,
    companyName: "Acme Enterprises Pvt Ltd",
    gstin: "07AAAAA0000A1Z5",
    date: "2026-10-08",
    status: "PAID",
  },
  {
    id: "inv-2",
    invoiceNo: "LY-INV-2026-002",
    customerName: "Ananya Sharma",
    email: "ananya.sharma@example.com",
    mobile: "+91 9123456789",
    plan: "Luxe Prestige Membership",
    amount: 250000,
    gstAmount: 45000,
    totalAmount: 295000,
    needGst: false,
    date: "2026-10-07",
    status: "PAID",
  },
  {
    id: "inv-3",
    invoiceNo: "LY-INV-2026-003",
    customerName: "Vikramaditya Roy",
    email: "v.roy@royholdings.com",
    mobile: "+91 9988776655",
    plan: "Luxe Black Membership (Limited Edition)",
    amount: 500000,
    gstAmount: 90000,
    totalAmount: 590000,
    needGst: true,
    companyName: "Roy Holdings & Global Capital",
    gstin: "27BBBCA1234F1Z8",
    date: "2026-10-05",
    status: "PAID",
  },
  {
    id: "inv-4",
    invoiceNo: "LY-INV-2026-004",
    customerName: "Priya Malhotra",
    email: "priya.m@techventures.in",
    mobile: "+91 9711223344",
    plan: "Luxe Signature Membership",
    amount: 150000,
    gstAmount: 27000,
    totalAmount: 177000,
    needGst: true,
    companyName: "TechVentures Digital Ltd",
    gstin: "19AAACT9876K1Z2",
    date: "2026-10-04",
    status: "PENDING",
  },
  {
    id: "inv-5",
    invoiceNo: "LY-INV-2026-005",
    customerName: "Rajesh Kumar",
    email: "rajesh.kumar@gmail.com",
    mobile: "+91 9810098100",
    plan: "Luxe Prestige Membership",
    amount: 250000,
    gstAmount: 45000,
    totalAmount: 295000,
    needGst: false,
    date: "2026-09-28",
    status: "PAID",
  },
];

export default function AdminInvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>(MOCK_INVOICES);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem("luxe_invoices_list");
      if (saved) {
        const parsed = JSON.parse(saved);
        setInvoices((prev) => {
          const ids = new Set(parsed.map((item: any) => item.id));
          const rest = prev.filter((item) => !ids.has(item.id));
          return [...parsed, ...rest];
        });
      }
    } catch (err) {
      console.error("Error reading saved invoices:", err);
    }
  }, []);

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.invoiceNo.toLowerCase().includes(search.toLowerCase()) ||
      inv.customerName.toLowerCase().includes(search.toLowerCase()) ||
      inv.email.toLowerCase().includes(search.toLowerCase()) ||
      (inv.companyName && inv.companyName.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = statusFilter ? inv.status === statusFilter : true;

    return matchesSearch && matchesStatus;
  });

  const totalRevenue = invoices
    .filter((i) => i.status === "PAID")
    .reduce((acc, i) => acc + i.totalAmount, 0);

  const pendingAmount = invoices
    .filter((i) => i.status === "PENDING")
    .reduce((acc, i) => acc + i.totalAmount, 0);

  return (
    <div className="p-6 md:p-10 space-y-8 bg-[#F8F9FA] text-neutral-900 min-h-screen">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-wide text-neutral-900">
            Invoices & Billing Management
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Track luxury membership payments, GST tax invoices, and customer billing histories.
          </p>
        </div>

        <button
          onClick={() => alert("Exporting all invoices to CSV...")}
          className="flex items-center gap-2 bg-[#E39F25] hover:bg-[#c88a1e] text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-md shadow-[#E39F25]/20 cursor-pointer w-fit"
        >
          <Download className="w-4 h-4" />
          <span>Export Invoices</span>
        </button>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white border border-neutral-200 rounded-2xl p-5 flex items-center justify-between shadow-sm">
          <div>
            <span className="text-xs text-neutral-500 uppercase font-semibold tracking-wider">
              Total Revenue Collected
            </span>
            <h3 className="text-2xl font-bold text-emerald-600 mt-1">
              ₹{totalRevenue.toLocaleString("en-IN")}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-neutral-200 rounded-2xl p-5 flex items-center justify-between shadow-sm">
          <div>
            <span className="text-xs text-neutral-500 uppercase font-semibold tracking-wider">
              Pending Payments
            </span>
            <h3 className="text-2xl font-bold text-amber-600 mt-1">
              ₹{pendingAmount.toLocaleString("en-IN")}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white border border-neutral-200 rounded-2xl p-5 flex items-center justify-between shadow-sm">
          <div>
            <span className="text-xs text-neutral-500 uppercase font-semibold tracking-wider">
              GST Invoices Issued
            </span>
            <h3 className="text-2xl font-bold text-[#E39F25] mt-1">
              {invoices.filter((i) => i.needGst).length}
            </h3>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#E39F25]/10 border border-[#E39F25]/20 flex items-center justify-center text-[#E39F25]">
            <Building className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* FILTER & SEARCH CONTROL */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-2xl border border-neutral-200 shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by invoice #, name, email or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-neutral-50 border border-neutral-200 rounded-xl pl-10 pr-4 py-2 text-xs text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-[#E39F25]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-neutral-400 shrink-0" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-neutral-50 border border-neutral-200 text-xs text-neutral-900 rounded-xl px-3 py-2 focus:outline-none focus:border-[#E39F25] cursor-pointer w-full sm:w-auto"
          >
            <option value="">All Statuses</option>
            <option value="PAID">PAID</option>
            <option value="PENDING">PENDING</option>
            <option value="REFUNDED">REFUNDED</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>
        </div>
      </div>

      {/* INVOICES TABLE */}
      <div className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-100 text-neutral-600 uppercase tracking-wider font-semibold border-b border-neutral-200">
              <tr>
                <th className="py-3.5 px-5">INVOICE NO</th>
                <th className="py-3.5 px-5">CUSTOMER</th>
                <th className="py-3.5 px-5">PLAN</th>
                <th className="py-3.5 px-5">TOTAL AMOUNT</th>
                <th className="py-3.5 px-5">GST TYPE</th>
                <th className="py-3.5 px-5">DATE</th>
                <th className="py-3.5 px-5">STATUS</th>
                <th className="py-3.5 px-5 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-neutral-800">
              {filteredInvoices.length > 0 ? (
                filteredInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-neutral-50/80 transition-colors">
                    <td className="py-4 px-5 font-mono text-[#E39F25] font-semibold">
                      {inv.invoiceNo}
                    </td>
                    <td className="py-4 px-5">
                      <div className="font-semibold text-neutral-900">{inv.customerName}</div>
                      <div className="text-[10px] text-neutral-500">{inv.email}</div>
                    </td>
                    <td className="py-4 px-5 font-medium">{inv.plan}</td>
                    <td className="py-4 px-5 font-bold text-neutral-900">
                      ₹{inv.totalAmount.toLocaleString("en-IN")}
                    </td>
                    <td className="py-4 px-5">
                      {inv.needGst ? (
                        <span className="inline-flex items-center gap-1 text-[10px] bg-blue-50 border border-blue-200 text-blue-700 px-2 py-0.5 rounded-full font-mono font-medium">
                          B2B (GST)
                        </span>
                      ) : (
                        <span className="text-[10px] text-neutral-500">B2C Retail</span>
                      )}
                    </td>
                    <td className="py-4 px-5 text-neutral-500">{inv.date}</td>
                    <td className="py-4 px-5">
                      {inv.status === "PAID" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" /> PAID
                        </span>
                      )}
                      {inv.status === "PENDING" && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                          <Clock className="w-3 h-3" /> PENDING
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-5 text-right">
                      <button
                        onClick={() => setSelectedInvoice(inv)}
                        className="inline-flex items-center gap-1.5 text-neutral-700 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 px-3 py-1.5 rounded-lg transition-colors text-[11px] font-medium cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#E39F25]" />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-neutral-400">
                    No invoices found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* INVOICE DETAILS MODAL */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-neutral-200 rounded-2xl max-w-xl w-full p-6 text-neutral-900 relative shadow-2xl space-y-6">
            <button
              onClick={() => setSelectedInvoice(null)}
              className="absolute top-4 right-4 p-1.5 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* MODAL HEADER */}
            <div className="flex items-center gap-3 border-b border-neutral-200 pb-4">
              <Receipt className="w-6 h-6 text-[#E39F25]" />
              <div>
                <h3 className="text-lg font-bold text-neutral-900">
                  Invoice Details: {selectedInvoice.invoiceNo}
                </h3>
                <p className="text-xs text-neutral-500">Issued on {selectedInvoice.date}</p>
              </div>
            </div>

            {/* CUSTOMER & BILLING INFO */}
            <div className="grid grid-cols-2 gap-4 bg-neutral-50 p-4 rounded-xl border border-neutral-200 text-xs">
              <div>
                <span className="text-neutral-500 block mb-1 uppercase tracking-wider text-[10px] font-semibold">
                  Billed To:
                </span>
                <p className="font-bold text-neutral-900">{selectedInvoice.customerName}</p>
                <p className="text-neutral-600">{selectedInvoice.email}</p>
                <p className="text-neutral-600">{selectedInvoice.mobile}</p>
              </div>

              {selectedInvoice.needGst && (
                <div>
                  <span className="text-neutral-500 block mb-1 uppercase tracking-wider text-[10px] font-semibold">
                    GST Invoice Details:
                  </span>
                  <p className="font-bold text-[#E39F25]">{selectedInvoice.companyName}</p>
                  <p className="font-mono text-neutral-700">GSTIN: {selectedInvoice.gstin}</p>
                </div>
              )}
            </div>

            {/* LINE ITEM BREAKDOWN */}
            <div className="space-y-2 border-t border-b border-neutral-200 py-4 text-xs">
              <div className="flex justify-between font-semibold text-neutral-500 uppercase text-[10px] pb-1">
                <span>Description</span>
                <span>Amount</span>
              </div>
              <div className="flex justify-between py-1 font-medium">
                <span>{selectedInvoice.plan}</span>
                <span>₹{selectedInvoice.amount.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between py-1 text-neutral-500">
                <span>GST Tax (18%)</span>
                <span>₹{selectedInvoice.gstAmount.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between pt-3 font-bold text-sm text-neutral-900 border-t border-neutral-200">
                <span>Total Amount Paid</span>
                <span className="text-[#E39F25]">
                  ₹{selectedInvoice.totalAmount.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* MODAL ACTIONS */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => alert(`Downloading PDF for ${selectedInvoice.invoiceNo}...`)}
                className="flex items-center gap-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-xs font-semibold px-4 py-2 rounded-xl transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#E39F25]" />
                <span>Download PDF Invoice</span>
              </button>

              <button
                onClick={() => setSelectedInvoice(null)}
                className="bg-[#E39F25] hover:bg-[#c88a1e] text-white text-xs font-semibold px-5 py-2 rounded-xl transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
