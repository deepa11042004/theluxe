"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
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
  Send,
  AlertCircle,
  Plus,
  RefreshCw,
  User,
  ShieldCheck,
} from "lucide-react";

interface Invoice {
  id: string;
  invoice_number: string;
  client_id: string;
  invoice_date: string;
  paid_date?: string | null;
  invoice_type: string;
  status: string;
  membership_plan: string;
  quantity: number;
  unit_price: number;
  taxable_amount: number;
  tax_rate: number;
  tax_amount: number;
  total_amount: number;
  amount_paid: number;
  balance_due: number;
  company_name?: string | null;
  company_gstin?: string | null;
  pdf_url?: string | null;
  sent_count: number;
  last_sent_at?: string | null;
  client: {
    id: string;
    client_code: string;
    salutation?: string;
    first_name: string;
    last_name: string;
    email: string;
    mobile: string;
    city?: string;
  };
  payment_attempt?: {
    id: string;
    gateway: string;
    gateway_payment_id?: string | null;
    status: string;
  } | null;
}

export default function AdminInvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState<{ total: number; totalPages: number }>({ total: 0, totalPages: 1 });

  // Modals state
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [clientsList, setClientsList] = useState<any[]>([]);
  const [selectedClientId, setSelectedClientId] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    fetchInvoices();
  }, [page, statusFilter, typeFilter]);

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const fetchInvoices = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "15",
      });
      if (search) params.append("search", search);
      if (statusFilter !== "ALL") params.append("status", statusFilter);
      if (typeFilter !== "ALL") params.append("invoiceType", typeFilter);

      const res = await fetch(`/api/v1/admin/invoices?${params.toString()}`);
      const json = await res.json();
      if (json.success) {
        setInvoices(json.data);
        setMeta(json.meta);
      } else {
        showToast(json.message || "Failed to load invoices", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Error connecting to server", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchClientsForDropdown = async () => {
    try {
      const res = await fetch("/api/v1/admin/clients?limit=100");
      const json = await res.json();
      if (json.success) {
        setClientsList(json.data);
        if (json.data.length > 0 && !selectedClientId) {
          setSelectedClientId(json.data[0].id);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenCreateModal = () => {
    setCreateModalOpen(true);
    fetchClientsForDropdown();
  };

  const handleCreateInvoiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClientId) {
      showToast("Please select a client", "error");
      return;
    }
    setActionLoading(true);
    try {
      const res = await fetch("/api/v1/admin/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientId: selectedClientId }),
      });
      const json = await res.json();
      if (json.success) {
        showToast(json.message || "Invoice created successfully!");
        setCreateModalOpen(false);
        fetchInvoices();
      } else {
        showToast(json.message || "Failed to create invoice", "error");
      }
    } catch (err) {
      showToast("Network error creating invoice", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleSendInvoiceEmail = async (invoiceId: string, invoiceNo: string) => {
    if (!window.confirm(`Email invoice ${invoiceNo} with attached PDF to the member?`)) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/v1/admin/invoices/${invoiceId}/send`, {
        method: "POST",
      });
      const json = await res.json();
      if (json.success) {
        showToast(json.message || "Invoice PDF sent successfully!");
        fetchInvoices();
      } else {
        showToast(json.message || "Failed to send invoice email", "error");
      }
    } catch (err) {
      showToast("Error sending invoice email", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchInvoices();
  };

  const selectedClientData = clientsList.find((c) => c.id === selectedClientId);

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-8 bg-[#F8F9FA] text-neutral-900 min-h-screen">
      {/* TOAST */}
      {toastMessage && (
        <div
          className={`fixed top-6 right-6 z-50 px-4 py-3 rounded-xl shadow-lg border text-xs font-semibold flex items-center gap-2 transition-all ${
            toastMessage.type === "success"
              ? "bg-emerald-50 border-emerald-200 text-emerald-800"
              : "bg-red-50 border-red-200 text-red-800"
          }`}
        >
          {toastMessage.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-600" />
          )}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-wide text-neutral-900">
            Invoices & Billing Hub
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Authoritative GST tax invoices and pro forma billing records. Generated server-side with verified pricing.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchInvoices}
            disabled={loading}
            className="flex items-center gap-2 bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-700 text-xs font-semibold px-3.5 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#E39F25] ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={handleOpenCreateModal}
            className="flex items-center gap-2 bg-[#E39F25] hover:bg-[#c88a1e] text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-md shadow-[#E39F25]/20 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Invoice</span>
          </button>
        </div>
      </div>

      {/* SUMMARY STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-neutral-200 rounded-2xl p-4 shadow-sm">
          <span className="text-[11px] text-neutral-500 uppercase font-semibold tracking-wider">
            Total Invoices
          </span>
          <h3 className="text-2xl font-bold text-neutral-900 mt-1">{meta.total}</h3>
        </div>
        <div className="bg-white border border-neutral-200 rounded-2xl p-4 shadow-sm">
          <span className="text-[11px] text-neutral-500 uppercase font-semibold tracking-wider">
            Paid Tax Invoices
          </span>
          <h3 className="text-2xl font-bold text-emerald-600 mt-1">
            {invoices.filter((i) => i.status === "PAID").length}
          </h3>
        </div>
        <div className="bg-white border border-neutral-200 rounded-2xl p-4 shadow-sm">
          <span className="text-[11px] text-neutral-500 uppercase font-semibold tracking-wider">
            Pending / Unpaid
          </span>
          <h3 className="text-2xl font-bold text-amber-600 mt-1">
            {invoices.filter((i) => i.status === "UNPAID").length}
          </h3>
        </div>
        <div className="bg-white border border-neutral-200 rounded-2xl p-4 shadow-sm">
          <span className="text-[11px] text-neutral-500 uppercase font-semibold tracking-wider">
            Total Invoiced Volume
          </span>
          <h3 className="text-2xl font-bold text-neutral-900 mt-1">
            ₹
            {invoices
              .reduce((acc, curr) => acc + (curr.total_amount || 0), 0)
              .toLocaleString("en-IN")}
          </h3>
        </div>
      </div>

      {/* SEARCH & FILTERS BAR */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
        <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by invoice number, client name, email, company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs border border-neutral-200 rounded-xl focus:outline-none focus:border-[#E39F25] bg-neutral-50/50"
            />
          </div>

          <div className="sm:col-span-2">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-2 text-xs border border-neutral-200 rounded-xl focus:outline-none focus:border-[#E39F25] bg-white cursor-pointer"
            >
              <option value="ALL">All Statuses</option>
              <option value="PAID">Paid</option>
              <option value="UNPAID">Unpaid</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <select
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-2 text-xs border border-neutral-200 rounded-xl focus:outline-none focus:border-[#E39F25] bg-white cursor-pointer"
            >
              <option value="ALL">All Types</option>
              <option value="TAX_INVOICE">Tax Invoice</option>
              <option value="PRO_FORMA">Pro Forma</option>
            </select>
          </div>

          <div className="sm:col-span-2 flex gap-2">
            <button
              type="submit"
              className="flex-1 bg-[#E39F25] hover:bg-[#c88a1e] text-white text-xs font-semibold py-2 rounded-xl transition-all shadow-sm cursor-pointer"
            >
              Filter
            </button>
            {(search || statusFilter !== "ALL" || typeFilter !== "ALL") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setStatusFilter("ALL");
                  setTypeFilter("ALL");
                  setPage(1);
                }}
                className="px-3 py-2 border border-neutral-200 hover:bg-neutral-100 rounded-xl text-neutral-600 text-xs"
                title="Reset"
              >
                Reset
              </button>
            )}
          </div>
        </form>
      </div>

      {/* INVOICES DATA TABLE */}
      <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 border-3 border-[#E39F25] border-t-transparent rounded-full animate-spin"></div>
            <span className="text-xs font-medium text-neutral-500">Loading invoice records...</span>
          </div>
        ) : invoices.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <Receipt className="w-10 h-10 text-neutral-300 mx-auto" />
            <h3 className="text-sm font-semibold text-neutral-700">No invoices found</h3>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto">
              No invoices generated yet. Click "Create New Invoice" or generate one directly from a client record.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-neutral-50/80 border-b border-neutral-200 text-neutral-500 uppercase font-semibold text-[10px] tracking-wider">
                  <th className="py-3.5 px-4">Invoice No</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Client & Contact</th>
                  <th className="py-3.5 px-4">Membership Plan</th>
                  <th className="py-3.5 px-4">Classification</th>
                  <th className="py-3.5 px-4">Total Amount</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Dispatched</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {invoices.map((inv) => {
                  const clientName = `${inv.client.salutation || ""} ${inv.client.first_name} ${inv.client.last_name}`.trim();
                  const invDate = new Date(inv.invoice_date).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  });
                  const isPaid = inv.status === "PAID";

                  return (
                    <tr key={inv.id} className="hover:bg-neutral-50/60 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-neutral-900">
                        {inv.invoice_number}
                      </td>

                      <td className="py-3.5 px-4 text-neutral-500 whitespace-nowrap">{invDate}</td>

                      <td className="py-3.5 px-4">
                        <Link
                          href={`/admin/clients/${inv.client.id}`}
                          className="font-semibold text-neutral-900 hover:text-[#E39F25] transition-colors"
                        >
                          {clientName}
                        </Link>
                        <div className="text-[11px] text-neutral-500">{inv.client.email}</div>
                        {inv.company_name && (
                          <div className="text-[10px] text-neutral-400 flex items-center gap-1 mt-0.5">
                            <Building className="w-2.5 h-2.5" />
                            <span>{inv.company_name}</span>
                          </div>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-neutral-800 font-medium">
                        {inv.membership_plan}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="text-[11px] font-medium text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded">
                          {inv.invoice_type === "TAX_INVOICE" ? "Tax Invoice" : "Pro Forma"}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-bold text-neutral-900">
                          ₹{Number(inv.total_amount || 0).toLocaleString("en-IN")}
                        </div>
                        <div className="text-[10px] text-neutral-400">
                          Base ₹{Number(inv.taxable_amount || 0).toLocaleString("en-IN")} + 18% GST
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                            isPaid
                              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                              : "bg-amber-50 text-amber-700 border-amber-200"
                          }`}
                        >
                          {isPaid ? (
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <Clock className="w-3 h-3 text-amber-600" />
                          )}
                          {inv.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-neutral-500">
                        {inv.sent_count > 0 ? (
                          <span className="text-emerald-600 font-medium text-[11px]">
                            Sent ({inv.sent_count}x)
                          </span>
                        ) : (
                          <span className="text-neutral-400 text-[11px]">Not sent</span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1">
                          {/* View Invoice Preview Modal */}
                          <button
                            onClick={() => setSelectedInvoice(inv)}
                            className="p-1.5 hover:bg-neutral-100 rounded-lg text-neutral-600 transition-colors cursor-pointer"
                            title="Preview Invoice"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>

                          {/* Download PDF */}
                          <a
                            href={`/api/v1/admin/invoices/${inv.id}/pdf`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 hover:bg-neutral-100 rounded-lg text-neutral-600 transition-colors"
                            title="Download PDF"
                          >
                            <Download className="w-3.5 h-3.5" />
                          </a>

                          {/* Email Invoice */}
                          <button
                            onClick={() => handleSendInvoiceEmail(inv.id, inv.invoice_number)}
                            disabled={actionLoading}
                            className="p-1.5 hover:bg-blue-50 rounded-lg text-blue-600 transition-colors cursor-pointer"
                            title="Email Invoice PDF to Member"
                          >
                            <Send className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* PAGINATION */}
        {meta.totalPages > 1 && (
          <div className="p-4 border-t border-neutral-200 flex items-center justify-between text-xs text-neutral-500">
            <span>
              Page {page} of {meta.totalPages} ({meta.total} invoices)
            </span>
            <div className="flex gap-1">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-3 py-1.5 border border-neutral-200 rounded-lg disabled:opacity-40 hover:bg-neutral-50 cursor-pointer"
              >
                Previous
              </button>
              <button
                disabled={page >= meta.totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="px-3 py-1.5 border border-neutral-200 rounded-lg disabled:opacity-40 hover:bg-neutral-50 cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* CREATE INVOICE MODAL */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-neutral-200 space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h3 className="font-semibold text-neutral-900 text-sm">Create New Membership Invoice</h3>
              <button onClick={() => setCreateModalOpen(false)} className="p-1 text-neutral-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateInvoiceSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-600 font-medium mb-1">
                  Select Registered Client / Member
                </label>
                <select
                  value={selectedClientId}
                  onChange={(e) => setSelectedClientId(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl bg-white"
                  required
                >
                  {clientsList.map((cl) => (
                    <option key={cl.id} value={cl.id}>
                      {cl.client_code} — {cl.first_name} {cl.last_name} ({cl.membership_plan})
                    </option>
                  ))}
                </select>
              </div>

              {selectedClientData && (
                <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200/70 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Selected Tier:</span>
                    <span className="font-semibold text-neutral-900">
                      {selectedClientData.membership_plan}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Total Payable:</span>
                    <span className="font-semibold text-neutral-900">
                      ₹{Number(selectedClientData.amount || 0).toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Verified Payment:</span>
                    <span className="font-semibold text-neutral-800">
                      {selectedClientData.latest_payment_status === "SUCCESSFUL"
                        ? "Verified (Tax Invoice - PAID)"
                        : "Unverified (Pro Forma - UNPAID)"}
                    </span>
                  </div>
                  {selectedClientData.company_name && (
                    <div className="flex justify-between border-t border-neutral-200/50 pt-1.5">
                      <span className="text-neutral-500">Billing Entity:</span>
                      <span className="text-neutral-700">
                        {selectedClientData.company_name} ({selectedClientData.gstin || "N/A"})
                      </span>
                    </div>
                  )}
                </div>
              )}

              <p className="text-[11px] text-neutral-500">
                This will automatically generate a sequential invoice, compute 18% GST, generate the PDF, and store it securely.
              </p>

              <div className="flex justify-end gap-2 pt-2 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-4 py-2 border rounded-xl text-neutral-600 hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-4 py-2 bg-[#E39F25] hover:bg-[#c88a1e] text-white font-semibold rounded-xl flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{actionLoading ? "Generating..." : "Generate & Save Invoice"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PREVIEW INVOICE MODAL */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 space-y-6 animate-in fade-in duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
              <div>
                <span className="text-[11px] font-mono text-[#E39F25] font-semibold uppercase tracking-wider block">
                  {selectedInvoice.invoice_type === "TAX_INVOICE" ? "TAX INVOICE" : "PRO FORMA INVOICE"}
                </span>
                <h3 className="text-xl font-bold text-neutral-900">{selectedInvoice.invoice_number}</h3>
              </div>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="p-1.5 text-neutral-400 hover:text-neutral-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* BILLING ENTITIES */}
            <div className="grid grid-cols-2 gap-6 text-xs">
              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200/60">
                <span className="font-bold text-neutral-900 block mb-1">SERVICE PROVIDER</span>
                <p className="font-medium text-neutral-800">The Luxe Yatra Worldwide Travels & Resorts Pvt Ltd</p>
                <p className="text-neutral-500 mt-1">12th Floor, Express Towers, Nariman Point, Mumbai 400021</p>
                <p className="text-neutral-500 font-mono mt-1">GSTIN: 27AABCT8921M1ZQ</p>
              </div>

              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200/60">
                <span className="font-bold text-neutral-900 block mb-1">BILLED TO</span>
                <p className="font-medium text-neutral-800">
                  {selectedInvoice.client.salutation} {selectedInvoice.client.first_name} {selectedInvoice.client.last_name}
                </p>
                <p className="text-neutral-500 mt-1">
                  ID: {selectedInvoice.client.client_code} • {selectedInvoice.client.city}
                </p>
                <p className="text-neutral-500 mt-0.5">{selectedInvoice.client.email}</p>
                {selectedInvoice.company_name && (
                  <p className="text-neutral-700 font-semibold mt-1">
                    {selectedInvoice.company_name} (GST: {selectedInvoice.company_gstin || "N/A"})
                  </p>
                )}
              </div>
            </div>

            {/* LINE ITEM TABLE */}
            <div className="border border-neutral-200 rounded-xl overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-neutral-100/70 border-b border-neutral-200 text-neutral-600">
                  <tr>
                    <th className="py-2.5 px-3">Description</th>
                    <th className="py-2.5 px-3">Qty</th>
                    <th className="py-2.5 px-3 text-right">Taxable</th>
                    <th className="py-2.5 px-3 text-right">GST (18%)</th>
                    <th className="py-2.5 px-3 text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  <tr>
                    <td className="py-3 px-3">
                      <span className="font-semibold text-neutral-900 block">
                        {selectedInvoice.membership_plan}
                      </span>
                      <span className="text-[11px] text-neutral-500">Annual Luxury Membership Program</span>
                    </td>
                    <td className="py-3 px-3">{selectedInvoice.quantity}</td>
                    <td className="py-3 px-3 text-right font-medium">
                      ₹{Number(selectedInvoice.taxable_amount).toLocaleString("en-IN")}
                    </td>
                    <td className="py-3 px-3 text-right font-medium">
                      ₹{Number(selectedInvoice.tax_amount).toLocaleString("en-IN")}
                    </td>
                    <td className="py-3 px-3 text-right font-bold text-neutral-900">
                      ₹{Number(selectedInvoice.total_amount).toLocaleString("en-IN")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* TOTALS & RECONCILIATION */}
            <div className="flex justify-between items-start text-xs pt-2">
              <div className="space-y-1">
                <span className="text-neutral-500">Payment Status:</span>
                <div>
                  <span
                    className={`px-2.5 py-1 rounded-full font-semibold ${
                      selectedInvoice.status === "PAID"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}
                  >
                    {selectedInvoice.status}
                  </span>
                </div>
                {selectedInvoice.payment_attempt?.gateway_payment_id && (
                  <p className="text-[11px] font-mono text-neutral-500 mt-2">
                    Ref: {selectedInvoice.payment_attempt.gateway_payment_id}
                  </p>
                )}
              </div>

              <div className="w-56 space-y-1.5 text-right">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Taxable:</span>
                  <span>₹{Number(selectedInvoice.taxable_amount).toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">CGST (9%):</span>
                  <span>₹{(Number(selectedInvoice.tax_amount) / 2).toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">SGST (9%):</span>
                  <span>₹{(Number(selectedInvoice.tax_amount) / 2).toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between border-t border-neutral-200 pt-1.5 font-bold text-sm text-neutral-900">
                  <span>Grand Total:</span>
                  <span>₹{Number(selectedInvoice.total_amount).toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>

            {/* FOOTER ACTIONS */}
            <div className="flex items-center justify-end gap-2 pt-4 border-t border-neutral-200">
              <a
                href={`/api/v1/admin/invoices/${selectedInvoice.id}/pdf`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 border border-neutral-200 hover:bg-neutral-50 rounded-xl text-neutral-700 text-xs font-semibold"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </a>

              <button
                onClick={() => handleSendInvoiceEmail(selectedInvoice.id, selectedInvoice.invoice_number)}
                disabled={actionLoading}
                className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send PDF to Client</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
