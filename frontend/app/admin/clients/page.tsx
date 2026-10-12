"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
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
  CreditCard,
  FileText,
  Send,
  AlertCircle,
  XCircle,
  HelpCircle,
  RefreshCw,
  Edit,
  History,
} from "lucide-react";

interface PaymentAttempt {
  id: string;
  gateway: string;
  gateway_payment_id?: string | null;
  gateway_order_id?: string | null;
  amount: number;
  status: string;
  error_description?: string | null;
  created_at: string;
}

interface Client {
  id: string;
  client_code: string;
  salutation: string;
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  city: string;
  membership_plan: string;
  membership_number?: string | null;
  membership_status: string;
  latest_payment_status: string;
  amount: number;
  currency: string;
  need_gst: boolean;
  company_name?: string | null;
  gstin?: string | null;
  welcome_email_sent_at?: string | null;
  created_at: string;
  invoices?: Array<{ id: string; invoice_number: string; status: string }>;
  _count?: {
    payment_attempts: number;
    invoices: number;
    email_logs: number;
  };
}

export default function AdminClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("ALL");
  const [planFilter, setPlanFilter] = useState("ALL");
  const [cityFilter, setCityFilter] = useState("ALL");
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState<{ total: number; totalPages: number }>({ total: 0, totalPages: 1 });

  // Modals state
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const [historyClient, setHistoryClient] = useState<any | null>(null);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [invoiceModalClient, setInvoiceModalClient] = useState<Client | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    fetchClients();
  }, [page, paymentStatusFilter, planFilter, cityFilter]);

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const fetchClients = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "15",
      });
      if (search) params.append("search", search);
      if (paymentStatusFilter !== "ALL") params.append("paymentStatus", paymentStatusFilter);
      if (planFilter !== "ALL") params.append("plan", planFilter);
      if (cityFilter !== "ALL") params.append("city", cityFilter);

      const res = await fetch(`/api/v1/admin/clients?${params.toString()}`);
      const json = await res.json();
      if (json.success) {
        setClients(json.data);
        setMeta(json.meta);
      } else {
        showToast(json.message || "Failed to load clients", "error");
      }
    } catch (err: any) {
      console.error(err);
      showToast("Error connecting to server", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchClients();
  };

  const handleSendWelcomeEmail = async (clientId: string, clientName: string) => {
    if (!window.confirm(`Send welcome/follow-up email to "${clientName}"?`)) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/v1/admin/clients/${clientId}/welcome-email`, {
        method: "POST",
      });
      const json = await res.json();
      if (json.success) {
        showToast(json.message || "Email dispatched successfully!");
        fetchClients();
      } else {
        showToast(json.message || "Failed to send email", "error");
      }
    } catch (err) {
      showToast("Network error dispatching email", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleViewHistory = async (clientId: string) => {
    setHistoryLoading(true);
    try {
      const res = await fetch(`/api/v1/admin/clients/${clientId}`);
      const json = await res.json();
      if (json.success) {
        setHistoryClient(json.data);
      } else {
        showToast(json.message || "Failed to fetch client history", "error");
      }
    } catch (err) {
      showToast("Network error fetching client details", "error");
    } finally {
      setHistoryLoading(false);
    }
  };

  const handleUpdateClientSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingClient) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/v1/admin/clients/${editingClient.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          salutation: editingClient.salutation,
          first_name: editingClient.first_name,
          last_name: editingClient.last_name,
          email: editingClient.email,
          mobile: editingClient.mobile,
          city: editingClient.city,
          company_name: editingClient.company_name,
          gstin: editingClient.gstin,
        }),
      });
      const json = await res.json();
      if (json.success) {
        showToast("Client details updated successfully!");
        setEditingClient(null);
        fetchClients();
      } else {
        showToast(json.message || "Update failed", "error");
      }
    } catch (err) {
      showToast("Error updating client", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleCreateInvoiceSubmit = async (client: Client) => {
    setActionLoading(true);
    try {
      const res = await fetch("/api/v1/admin/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientId: client.id }),
      });
      const json = await res.json();
      if (json.success) {
        showToast(`Invoice ${json.data.invoice_number} created successfully!`);
        setInvoiceModalClient(null);
        fetchClients();
      } else {
        showToast(json.message || "Failed to create invoice", "error");
      }
    } catch (err) {
      showToast("Network error creating invoice", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleSendInvoiceEmail = async (invoiceId: string) => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/v1/admin/invoices/${invoiceId}/send`, {
        method: "POST",
      });
      const json = await res.json();
      if (json.success) {
        showToast(json.message || "Invoice PDF emailed to client!");
      } else {
        showToast(json.message || "Failed to email invoice", "error");
      }
    } catch (err) {
      showToast("Error sending invoice", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const renderPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "SUCCESSFUL":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Successful
          </span>
        );
      case "FAILED":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-red-50 text-red-700 border border-red-200">
            <XCircle className="w-3 h-3 text-red-600" />
            Failed
          </span>
        );
      case "ABANDONED":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <AlertCircle className="w-3 h-3 text-amber-600" />
            Abandoned
          </span>
        );
      case "CANCELLED":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-gray-50 text-gray-700 border border-gray-200">
            <X className="w-3 h-3 text-gray-500" />
            Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3 h-3 text-amber-600" />
            Pending
          </span>
        );
    }
  };

  const renderMembershipBadge = (status: string) => {
    if (status === "ACTIVE") {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <ShieldCheck className="w-3 h-3 text-emerald-600" />
          ACTIVE
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-gray-100 text-gray-600 border border-gray-200">
        <Clock className="w-3 h-3 text-gray-400" />
        PENDING
      </span>
    );
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-8 bg-[#F8F9FA] text-neutral-900 min-h-screen">
      {/* TOAST NOTIFICATION */}
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
            Client & Membership Management
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Authoritative CRM records for Luxe Club registrations, payment attempts, invoices, and email logs.
          </p>
        </div>

        <button
          onClick={fetchClients}
          disabled={loading}
          className="flex items-center gap-2 bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-700 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all shadow-sm cursor-pointer w-fit"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-[#E39F25] ${loading ? "animate-spin" : ""}`} />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* STATS OVERVIEW */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-neutral-200 rounded-2xl p-4 shadow-sm">
          <span className="text-[11px] text-neutral-500 uppercase font-semibold tracking-wider">
            Total Registrations
          </span>
          <h3 className="text-2xl font-bold text-neutral-900 mt-1">{meta.total}</h3>
        </div>
        <div className="bg-white border border-neutral-200 rounded-2xl p-4 shadow-sm">
          <span className="text-[11px] text-neutral-500 uppercase font-semibold tracking-wider">
            Active Members
          </span>
          <h3 className="text-2xl font-bold text-emerald-600 mt-1">
            {clients.filter((c) => c.membership_status === "ACTIVE").length}
          </h3>
        </div>
        <div className="bg-white border border-neutral-200 rounded-2xl p-4 shadow-sm">
          <span className="text-[11px] text-neutral-500 uppercase font-semibold tracking-wider">
            Failed / Incomplete
          </span>
          <h3 className="text-2xl font-bold text-red-600 mt-1">
            {clients.filter((c) => c.latest_payment_status === "FAILED" || c.latest_payment_status === "ABANDONED").length}
          </h3>
        </div>
        <div className="bg-white border border-neutral-200 rounded-2xl p-4 shadow-sm">
          <span className="text-[11px] text-neutral-500 uppercase font-semibold tracking-wider">
            Pending Payment
          </span>
          <h3 className="text-2xl font-bold text-amber-600 mt-1">
            {clients.filter((c) => c.latest_payment_status === "PENDING").length}
          </h3>
        </div>
      </div>

      {/* SEARCH & FILTERS BAR */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
        <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
          <div className="sm:col-span-5 relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name, email, mobile, client ID, company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs border border-neutral-200 rounded-xl focus:outline-none focus:border-[#E39F25] bg-neutral-50/50"
            />
          </div>

          <div className="sm:col-span-2">
            <select
              value={paymentStatusFilter}
              onChange={(e) => {
                setPaymentStatusFilter(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-2 text-xs border border-neutral-200 rounded-xl focus:outline-none focus:border-[#E39F25] bg-white cursor-pointer"
            >
              <option value="ALL">All Payment Statuses</option>
              <option value="SUCCESSFUL">Successful</option>
              <option value="FAILED">Failed</option>
              <option value="PENDING">Pending</option>
              <option value="ABANDONED">Abandoned</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>

          <div className="sm:col-span-3">
            <select
              value={planFilter}
              onChange={(e) => {
                setPlanFilter(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-2 text-xs border border-neutral-200 rounded-xl focus:outline-none focus:border-[#E39F25] bg-white cursor-pointer"
            >
              <option value="ALL">All Membership Plans</option>
              <option value="Signature">Luxe Signature</option>
              <option value="Prestige">Luxe Prestige</option>
              <option value="Black">Luxe Black (Limited Edition)</option>
            </select>
          </div>

          <div className="sm:col-span-2 flex gap-2">
            <button
              type="submit"
              className="flex-1 bg-[#E39F25] hover:bg-[#c88a1e] text-white text-xs font-semibold py-2 rounded-xl transition-all shadow-sm cursor-pointer"
            >
              Search
            </button>
            {(search || paymentStatusFilter !== "ALL" || planFilter !== "ALL" || cityFilter !== "ALL") && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setPaymentStatusFilter("ALL");
                  setPlanFilter("ALL");
                  setCityFilter("ALL");
                  setPage(1);
                }}
                className="px-3 py-2 border border-neutral-200 hover:bg-neutral-100 rounded-xl text-neutral-600 text-xs"
                title="Reset Filters"
              >
                Reset
              </button>
            )}
          </div>
        </form>
      </div>

      {/* CLIENTS DATA TABLE */}
      <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 border-3 border-[#E39F25] border-t-transparent rounded-full animate-spin"></div>
            <span className="text-xs font-medium text-neutral-500">Loading client records...</span>
          </div>
        ) : clients.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <UserCheck className="w-10 h-10 text-neutral-300 mx-auto" />
            <h3 className="text-sm font-semibold text-neutral-700">No client records found</h3>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto">
              No clients matched your search criteria. Submit the membership form at /join to create real records.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-neutral-50/80 border-b border-neutral-200 text-neutral-500 uppercase font-semibold text-[10px] tracking-wider">
                  <th className="py-3.5 px-4">Client ID</th>
                  <th className="py-3.5 px-4">Client Name & Contact</th>
                  <th className="py-3.5 px-4">City</th>
                  <th className="py-3.5 px-4">Membership Tier</th>
                  <th className="py-3.5 px-4">Membership</th>
                  <th className="py-3.5 px-4">Payment Status</th>
                  <th className="py-3.5 px-4">Amount</th>
                  <th className="py-3.5 px-4">Registered Date</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {clients.map((cl) => {
                  const fullName = `${cl.salutation} ${cl.first_name} ${cl.last_name}`.trim();
                  const regDate = new Date(cl.created_at).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  });
                  const latestInv = cl.invoices && cl.invoices[0];

                  return (
                    <tr key={cl.id} className="hover:bg-neutral-50/60 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-medium text-neutral-700">
                        {cl.client_code}
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-neutral-900">{fullName}</div>
                        <div className="text-[11px] text-neutral-500 flex items-center gap-2 mt-0.5">
                          <span>{cl.email}</span>
                          <span>•</span>
                          <span>{cl.mobile}</span>
                        </div>
                        {cl.company_name && (
                          <div className="text-[10px] text-neutral-400 flex items-center gap-1 mt-0.5">
                            <Building className="w-2.5 h-2.5" />
                            <span>{cl.company_name}</span>
                          </div>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-neutral-600">{cl.city}</td>

                      <td className="py-3.5 px-4">
                        <span className="font-medium text-neutral-800">{cl.membership_plan}</span>
                        {cl.membership_number && (
                          <div className="text-[10px] font-mono text-[#E39F25] font-semibold mt-0.5">
                            {cl.membership_number}
                          </div>
                        )}
                      </td>

                      <td className="py-3.5 px-4">{renderMembershipBadge(cl.membership_status)}</td>

                      <td className="py-3.5 px-4">{renderPaymentStatusBadge(cl.latest_payment_status)}</td>

                      <td className="py-3.5 px-4 font-semibold text-neutral-900">
                        ₹{Number(cl.amount || 0).toLocaleString("en-IN")}
                      </td>

                      <td className="py-3.5 px-4 text-neutral-500 whitespace-nowrap">{regDate}</td>

                      <td className="py-3.5 px-4 text-right">
                        <div className="inline-flex items-center gap-1">
                          {/* View Details */}
                          <Link
                            href={`/admin/clients/${cl.id}`}
                            className="p-1.5 hover:bg-neutral-100 rounded-lg text-neutral-600 transition-colors"
                            title="View Full Profile"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </Link>

                          {/* Edit Client */}
                          <button
                            onClick={() => setEditingClient(cl)}
                            className="p-1.5 hover:bg-neutral-100 rounded-lg text-neutral-600 transition-colors cursor-pointer"
                            title="Edit Non-Financial Profile"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>

                          {/* View Payment History */}
                          <button
                            onClick={() => handleViewHistory(cl.id)}
                            className="p-1.5 hover:bg-neutral-100 rounded-lg text-neutral-600 transition-colors cursor-pointer"
                            title="View Payment History"
                          >
                            <History className="w-3.5 h-3.5" />
                          </button>

                          {/* Create Invoice */}
                          <button
                            onClick={() => setInvoiceModalClient(cl)}
                            className="p-1.5 hover:bg-amber-50 rounded-lg text-[#E39F25] transition-colors cursor-pointer"
                            title="Create Invoice"
                          >
                            <FileText className="w-3.5 h-3.5" />
                          </button>

                          {/* Send Welcome Email */}
                          <button
                            onClick={() => handleSendWelcomeEmail(cl.id, fullName)}
                            disabled={actionLoading}
                            className="p-1.5 hover:bg-emerald-50 rounded-lg text-emerald-600 transition-colors cursor-pointer"
                            title="Send Welcome / Follow-up Email"
                          >
                            <Mail className="w-3.5 h-3.5" />
                          </button>

                          {/* Send Invoice Email if invoice exists */}
                          {latestInv && (
                            <button
                              onClick={() => handleSendInvoiceEmail(latestInv.id)}
                              disabled={actionLoading}
                              className="p-1.5 hover:bg-blue-50 rounded-lg text-blue-600 transition-colors cursor-pointer"
                              title={`Send Invoice (${latestInv.invoice_number})`}
                            >
                              <Send className="w-3.5 h-3.5" />
                            </button>
                          )}
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
              Page {page} of {meta.totalPages} ({meta.total} clients)
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

      {/* EDIT CLIENT MODAL */}
      {editingClient && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-neutral-200 space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h3 className="font-semibold text-neutral-900 text-sm">
                Edit Client Profile ({editingClient.client_code})
              </h3>
              <button
                onClick={() => setEditingClient(null)}
                className="p-1 text-neutral-400 hover:text-neutral-600 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUpdateClientSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-neutral-500 mb-1">Title</label>
                  <select
                    value={editingClient.salutation}
                    onChange={(e) => setEditingClient({ ...editingClient, salutation: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  >
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Dr.">Dr.</option>
                  </select>
                </div>
                <div>
                  <label className="block text-neutral-500 mb-1">First Name</label>
                  <input
                    type="text"
                    value={editingClient.first_name}
                    onChange={(e) => setEditingClient({ ...editingClient, first_name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                    required
                  />
                </div>
                <div>
                  <label className="block text-neutral-500 mb-1">Last Name</label>
                  <input
                    type="text"
                    value={editingClient.last_name}
                    onChange={(e) => setEditingClient({ ...editingClient, last_name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-500 mb-1">Email</label>
                  <input
                    type="email"
                    value={editingClient.email}
                    onChange={(e) => setEditingClient({ ...editingClient, email: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                    required
                  />
                </div>
                <div>
                  <label className="block text-neutral-500 mb-1">Mobile</label>
                  <input
                    type="text"
                    value={editingClient.mobile}
                    onChange={(e) => setEditingClient({ ...editingClient, mobile: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-500 mb-1">City</label>
                <input
                  type="text"
                  value={editingClient.city}
                  onChange={(e) => setEditingClient({ ...editingClient, city: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-500 mb-1">Company Name</label>
                  <input
                    type="text"
                    value={editingClient.company_name || ""}
                    onChange={(e) => setEditingClient({ ...editingClient, company_name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                    placeholder="Optional for GST"
                  />
                </div>
                <div>
                  <label className="block text-neutral-500 mb-1">GSTIN</label>
                  <input
                    type="text"
                    value={editingClient.gstin || ""}
                    onChange={(e) => setEditingClient({ ...editingClient, gstin: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                    placeholder="e.g. 27AAAAA0000A1Z5"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setEditingClient(null)}
                  className="px-4 py-2 border rounded-xl text-neutral-600 hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-4 py-2 bg-[#E39F25] hover:bg-[#c88a1e] text-white font-semibold rounded-xl"
                >
                  {actionLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PAYMENT HISTORY MODAL */}
      {historyClient && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-neutral-200 space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div>
                <h3 className="font-semibold text-neutral-900 text-sm">
                  Payment History & Attempts — {historyClient.first_name} {historyClient.last_name}
                </h3>
                <span className="text-[11px] text-neutral-500 font-mono">
                  Client ID: {historyClient.client_code} | {historyClient.email}
                </span>
              </div>
              <button
                onClick={() => setHistoryClient(null)}
                className="p-1 text-neutral-400 hover:text-neutral-600 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {!historyClient.payment_attempts || historyClient.payment_attempts.length === 0 ? (
                <div className="py-8 text-center text-xs text-neutral-400">
                  No payment attempts recorded for this client.
                </div>
              ) : (
                <div className="divide-y divide-neutral-100 border border-neutral-100 rounded-xl overflow-hidden">
                  {historyClient.payment_attempts.map((att: PaymentAttempt) => (
                    <div key={att.id} className="p-3.5 text-xs flex items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-neutral-900">
                            ₹{Number(att.amount || 0).toLocaleString("en-IN")}
                          </span>
                          {renderPaymentStatusBadge(att.status)}
                        </div>
                        <div className="text-[11px] text-neutral-500 mt-1 font-mono">
                          {att.gateway_payment_id ? `Payment ID: ${att.gateway_payment_id}` : `Order ID: ${att.gateway_order_id || "N/A"}`}
                        </div>
                        {att.error_description && (
                          <div className="text-[11px] text-red-600 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3 shrink-0" />
                            <span>{att.error_description}</span>
                          </div>
                        )}
                      </div>
                      <div className="text-[11px] text-neutral-400 shrink-0 text-right">
                        {new Date(att.created_at).toLocaleString("en-IN")}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end pt-2 border-t border-neutral-100">
              <button
                onClick={() => setHistoryClient(null)}
                className="px-4 py-2 border rounded-xl text-neutral-600 hover:bg-neutral-50 text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATE INVOICE MODAL */}
      {invoiceModalClient && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-neutral-200 space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <div>
                <h3 className="font-semibold text-neutral-900 text-sm">
                  Generate Invoice for {invoiceModalClient.first_name} {invoiceModalClient.last_name}
                </h3>
                <span className="text-[11px] text-neutral-500">
                  Client ID: {invoiceModalClient.client_code}
                </span>
              </div>
              <button
                onClick={() => setInvoiceModalClient(null)}
                className="p-1 text-neutral-400 hover:text-neutral-600 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs bg-neutral-50 p-4 rounded-xl border border-neutral-200/70">
              <div className="flex justify-between">
                <span className="text-neutral-500">Membership Tier:</span>
                <span className="font-semibold text-neutral-900">{invoiceModalClient.membership_plan}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Authoritative Total:</span>
                <span className="font-semibold text-neutral-900">
                  ₹{Number(invoiceModalClient.amount || 0).toLocaleString("en-IN")} (incl. 18% GST)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Payment Status:</span>
                <span>{renderPaymentStatusBadge(invoiceModalClient.latest_payment_status)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Invoice Classification:</span>
                <span className="font-semibold text-neutral-800">
                  {invoiceModalClient.latest_payment_status === "SUCCESSFUL"
                    ? "TAX INVOICE (PAID)"
                    : "PRO FORMA INVOICE (UNPAID / PENDING)"}
                </span>
              </div>
              {invoiceModalClient.company_name && (
                <div className="flex justify-between border-t border-neutral-200/50 pt-2">
                  <span className="text-neutral-500">Company / GSTIN:</span>
                  <span className="text-neutral-700">
                    {invoiceModalClient.company_name} ({invoiceModalClient.gstin || "N/A"})
                  </span>
                </div>
              )}
            </div>

            <p className="text-[11px] text-neutral-500">
              Generating this invoice will assign an authoritative sequential number, calculate 18% GST breakdowns, and generate the signed A4 PDF document on the server.
            </p>

            <div className="flex justify-end gap-2 pt-2 border-t border-neutral-100">
              <button
                type="button"
                onClick={() => setInvoiceModalClient(null)}
                className="px-4 py-2 border rounded-xl text-neutral-600 hover:bg-neutral-50 text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={actionLoading}
                onClick={() => handleCreateInvoiceSubmit(invoiceModalClient)}
                className="px-4 py-2 bg-[#E39F25] hover:bg-[#c88a1e] text-white font-semibold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>{actionLoading ? "Generating..." : "Confirm & Create Invoice"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
