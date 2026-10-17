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
  FileText,
  User,
  AlertCircle,
  XCircle,
  Send,
  Download,
  RefreshCw,
  Edit,
  X,
} from "lucide-react";
import LuxeMembershipCard from "@/components/Club/LuxeMembershipCard";

export default function AdminClientDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [client, setClient] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState<any>({});
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    if (id) {
      fetchClientDetails();
    }
  }, [id]);

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const fetchClientDetails = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/v1/admin/clients/${id}`);
      const json = await res.json();
      if (json.success && json.data) {
        setClient(json.data);
        setEditForm({
          salutation: json.data.salutation,
          first_name: json.data.first_name,
          last_name: json.data.last_name,
          email: json.data.email,
          mobile: json.data.mobile,
          city: json.data.city,
          company_name: json.data.company_name || "",
          gstin: json.data.gstin || "",
          notes: json.data.notes || "",
        });
      } else {
        showToast(json.message || "Failed to find client record", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Error connecting to server", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSendWelcomeEmail = async () => {
    if (!client) return;
    setActionLoading(true);
    try {
      const res = await fetch(`/api/v1/admin/clients/${client.id}/welcome-email`, {
        method: "POST",
      });
      const json = await res.json();
      if (json.success) {
        showToast(json.message || "Email dispatched successfully!");
        fetchClientDetails();
      } else {
        showToast(json.message || "Failed to send email", "error");
      }
    } catch (err) {
      showToast("Error sending email", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleCreateInvoice = async () => {
    if (!client) return;
    setActionLoading(true);
    try {
      const res = await fetch("/api/v1/admin/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientId: client.id }),
      });
      const json = await res.json();
      if (json.success) {
        showToast(`Invoice ${json.data.invoice_number} generated!`);
        fetchClientDetails();
      } else {
        showToast(json.message || "Invoice creation failed", "error");
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
        showToast(json.message || "Invoice PDF emailed!");
        fetchClientDetails();
      } else {
        showToast(json.message || "Failed to send invoice", "error");
      }
    } catch (err) {
      showToast("Error sending invoice", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      const res = await fetch(`/api/v1/admin/clients/${client.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      const json = await res.json();
      if (json.success) {
        showToast("Client profile updated!");
        setEditing(false);
        fetchClientDetails();
      } else {
        showToast(json.message || "Update failed", "error");
      }
    } catch (err) {
      showToast("Error saving changes", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const renderPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "SUCCESSFUL":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Payment Successful
          </span>
        );
      case "FAILED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
            <XCircle className="w-3.5 h-3.5 text-red-600" />
            Payment Failed
          </span>
        );
      case "ABANDONED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
            Payment Abandoned
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            Payment Pending
          </span>
        );
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <div className="w-8 h-8 border-3 border-[#E39F25] border-t-transparent rounded-full animate-spin"></div>
        <span className="text-xs text-neutral-500 font-medium">Loading client details...</span>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="p-8 text-center space-y-4">
        <h2 className="text-lg font-bold text-neutral-800">Client not found</h2>
        <Link
          href="/admin/clients"
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#E39F25] hover:underline"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Clients</span>
        </Link>
      </div>
    );
  }

  const fullName = `${client.salutation} ${client.first_name} ${client.last_name}`.trim();
  const isPaid = client.latest_payment_status === "SUCCESSFUL" || client.membership_status === "ACTIVE";

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

      {/* TOP NAVIGATION & ACTIONS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-5">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/clients"
            className="p-2 border border-neutral-200 hover:bg-neutral-100 rounded-xl text-neutral-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl md:text-2xl font-bold text-neutral-900">{fullName}</h1>
              <span className="font-mono text-xs px-2.5 py-0.5 rounded-md bg-neutral-200 text-neutral-700 font-semibold">
                {client.client_code}
              </span>
            </div>
            <p className="text-xs text-neutral-500 mt-0.5">
              Registered on {new Date(client.created_at).toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-1.5 px-3 py-2 bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-700 rounded-xl text-xs font-semibold transition-all shadow-xs cursor-pointer"
          >
            <Edit className="w-3.5 h-3.5 text-neutral-500" />
            <span>Edit Profile</span>
          </button>

          <button
            onClick={handleCreateInvoice}
            disabled={actionLoading}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-[#E39F25] hover:bg-[#c88a1e] text-white rounded-xl text-xs font-semibold transition-all shadow-sm cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Generate Invoice</span>
          </button>

          <button
            onClick={handleSendWelcomeEmail}
            disabled={actionLoading}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition-all shadow-sm cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Send Email</span>
          </button>
        </div>
      </div>

      {/* CLIENT OVERVIEW GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: CLIENT PROFILE & MEMBERSHIP */}
        <div className="lg:col-span-5 space-y-6">
          {/* MEMBERSHIP CARD PREVIEW */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Luxe Club Digital Membership
            </h3>
            <LuxeMembershipCard
              tier={
                client.membership_plan?.toLowerCase().includes("black")
                  ? "imperial"
                  : client.membership_plan?.toLowerCase().includes("prestige")
                  ? "diamond"
                  : "signature"
              }
              title={client.membership_plan}
              membershipNo={client.membership_number || "PENDING ACTIVATION"}
            />

            <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                <span className="text-[11px] text-neutral-500 block">Membership Status</span>
                <span className="font-semibold text-neutral-900 mt-1 block">
                  {client.membership_status}
                </span>
              </div>
              <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-100">
                <span className="text-[11px] text-neutral-500 block">Latest Payment</span>
                <div className="mt-1">{renderPaymentStatusBadge(client.latest_payment_status)}</div>
              </div>
            </div>
          </div>

          {/* CONTACT & COMPANY INFO */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm space-y-4 text-xs">
            <h3 className="font-bold text-neutral-900 border-b border-neutral-100 pb-2">
              Profile & Contact Particulars
            </h3>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-neutral-600">
                <Mail className="w-4 h-4 text-[#E39F25] shrink-0" />
                <span className="font-medium text-neutral-900">{client.email}</span>
              </div>
              <div className="flex items-center gap-3 text-neutral-600">
                <Phone className="w-4 h-4 text-[#E39F25] shrink-0" />
                <span>{client.mobile}</span>
              </div>
              <div className="flex items-center gap-3 text-neutral-600">
                <MapPin className="w-4 h-4 text-[#E39F25] shrink-0" />
                <span>{client.city}</span>
              </div>
              {client.company_name && (
                <div className="flex items-center gap-3 text-neutral-600">
                  <Building className="w-4 h-4 text-[#E39F25] shrink-0" />
                  <span>
                    {client.company_name} {client.gstin ? `(GSTIN: ${client.gstin})` : ""}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-3 text-neutral-600">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Terms accepted on {new Date(client.terms_accepted_at).toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: PAYMENT ATTEMPTS, INVOICES & EMAIL LOGS */}
        <div className="lg:col-span-7 space-y-6">
          {/* PAYMENT ATTEMPTS */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h3 className="font-bold text-neutral-900 text-sm">
                Payment History & Gateways ({client.payment_attempts?.length || 0})
              </h3>
              <span className="text-xs text-neutral-500 font-mono">
                Gateway: {client.payment_attempts?.[0]?.gateway === "RAZORPAY" ? "Razorpay" : "PayU"}
              </span>
            </div>

            {!client.payment_attempts || client.payment_attempts.length === 0 ? (
              <div className="py-6 text-center text-xs text-neutral-400">
                No payment attempts recorded.
              </div>
            ) : (
              <div className="divide-y divide-neutral-100 border border-neutral-100 rounded-xl overflow-hidden">
                {client.payment_attempts.map((att: any) => (
                  <div key={att.id} className="p-3.5 text-xs flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-neutral-900">
                          ₹{Number(att.amount || 0).toLocaleString("en-IN")}
                        </span>
                        {renderPaymentStatusBadge(att.status)}
                      </div>
                      <div className="text-[11px] text-neutral-500 font-mono mt-1">
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

          {/* INVOICES */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h3 className="font-bold text-neutral-900 text-sm">
                Generated Invoices ({client.invoices?.length || 0})
              </h3>
            </div>

            {!client.invoices || client.invoices.length === 0 ? (
              <div className="py-6 text-center text-xs text-neutral-400 space-y-2">
                <p>No invoices generated yet for this client.</p>
                <button
                  onClick={handleCreateInvoice}
                  className="px-3 py-1.5 bg-[#E39F25] text-white rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Create First Invoice
                </button>
              </div>
            ) : (
              <div className="divide-y divide-neutral-100 border border-neutral-100 rounded-xl overflow-hidden">
                {client.invoices.map((inv: any) => (
                  <div key={inv.id} className="p-3.5 text-xs flex items-center justify-between gap-4">
                    <div>
                      <div className="font-mono font-semibold text-neutral-900">
                        {inv.invoice_number}
                      </div>
                      <div className="text-[11px] text-neutral-500 mt-0.5">
                        ₹{Number(inv.total_amount || 0).toLocaleString("en-IN")} • {inv.invoice_type}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          inv.status === "PAID"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}
                      >
                        {inv.status}
                      </span>

                      <a
                        href={`/api/v1/admin/invoices/${inv.id}/pdf`}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 hover:bg-neutral-100 rounded-lg text-neutral-600 transition-colors"
                        title="Download / View PDF"
                      >
                        <Download className="w-3.5 h-3.5" />
                      </a>

                      <button
                        onClick={() => handleSendInvoiceEmail(inv.id)}
                        disabled={actionLoading}
                        className="p-1.5 hover:bg-blue-50 rounded-lg text-blue-600 transition-colors cursor-pointer"
                        title="Send PDF to Client"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* EMAIL LOGS / COMMUNICATION HISTORY */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h3 className="font-bold text-neutral-900 text-sm">
                Email Automation Logs ({client.email_logs?.length || 0})
              </h3>
            </div>

            {!client.email_logs || client.email_logs.length === 0 ? (
              <div className="py-6 text-center text-xs text-neutral-400">
                No email communications dispatched yet.
              </div>
            ) : (
              <div className="divide-y divide-neutral-100 border border-neutral-100 rounded-xl overflow-hidden max-h-60 overflow-y-auto">
                {client.email_logs.map((log: any) => (
                  <div key={log.id} className="p-3 text-xs flex items-start justify-between gap-3">
                    <div>
                      <div className="font-semibold text-neutral-800">{log.template_type}</div>
                      <div className="text-[11px] text-neutral-500 mt-0.5">{log.subject}</div>
                      {log.error_message && (
                        <div className="text-[10px] text-red-600 mt-0.5">{log.error_message}</div>
                      )}
                    </div>
                    <div className="text-right shrink-0">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          log.status === "SENT"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-red-50 text-red-700"
                        }`}
                      >
                        {log.status}
                      </span>
                      <div className="text-[10px] text-neutral-400 mt-1">
                        {new Date(log.sent_at).toLocaleString("en-IN")}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* EDIT MODAL */}
      {editing && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-neutral-200 space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h3 className="font-semibold text-neutral-900 text-sm">Edit Client Profile</h3>
              <button onClick={() => setEditing(false)} className="p-1 text-neutral-400">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-neutral-500 mb-1">Title</label>
                  <select
                    value={editForm.salutation}
                    onChange={(e) => setEditForm({ ...editForm, salutation: e.target.value })}
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
                    value={editForm.first_name}
                    onChange={(e) => setEditForm({ ...editForm, first_name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                    required
                  />
                </div>
                <div>
                  <label className="block text-neutral-500 mb-1">Last Name</label>
                  <input
                    type="text"
                    value={editForm.last_name}
                    onChange={(e) => setEditForm({ ...editForm, last_name: e.target.value })}
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
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                    required
                  />
                </div>
                <div>
                  <label className="block text-neutral-500 mb-1">Mobile</label>
                  <input
                    type="text"
                    value={editForm.mobile}
                    onChange={(e) => setEditForm({ ...editForm, mobile: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-500 mb-1">City</label>
                <input
                  type="text"
                  value={editForm.city}
                  onChange={(e) => setEditForm({ ...editForm, city: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-500 mb-1">Company Name</label>
                  <input
                    type="text"
                    value={editForm.company_name}
                    onChange={(e) => setEditForm({ ...editForm, company_name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-neutral-500 mb-1">GSTIN</label>
                  <input
                    type="text"
                    value={editForm.gstin}
                    onChange={(e) => setEditForm({ ...editForm, gstin: e.target.value })}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={() => setEditing(false)}
                  className="px-4 py-2 border rounded-xl text-neutral-600 hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-4 py-2 bg-[#E39F25] text-white font-semibold rounded-xl"
                >
                  {actionLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
