"use client";

import React, { useEffect, useState } from "react";
import { FileText, Download } from "lucide-react";
import { formatDate } from "@/components/member/MemberContext";

interface InvoiceRow {
  id: string;
  invoice_number: string;
  invoice_date: string;
  paid_date: string | null;
  invoice_type: string;
  status: string;
  membership_plan: string;
  total_amount: number;
  currency: string;
}

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<InvoiceRow[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/v1/client/invoices")
      .then((r) => r.json())
      .then((j) => (j.success ? setInvoices(j.data) : setError(j.message || "Could not load invoices.")))
      .catch(() => setError("Network error. Please try again."));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Invoices</h1>
        <p className="text-sm text-neutral-500 mt-1">Your membership invoices. Download the PDF for your records or GST claims.</p>
      </div>

      {error && <p className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3">{error}</p>}
      {!invoices && !error && <div className="w-6 h-6 border-4 border-[#E39F25] border-t-transparent rounded-full animate-spin" />}
      {invoices && invoices.length === 0 && (
        <div className="bg-white border border-neutral-200 rounded-2xl p-10 text-center text-sm text-neutral-500">
          <FileText className="w-8 h-8 mx-auto mb-3 text-neutral-300" />
          No invoices yet.
        </div>
      )}

      {invoices && invoices.length > 0 && (
        <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm overflow-x-auto">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wider text-neutral-500 border-b border-neutral-100">
                <th className="px-5 py-3 font-semibold">Invoice</th>
                <th className="px-5 py-3 font-semibold">Date</th>
                <th className="px-5 py-3 font-semibold">Plan</th>
                <th className="px-5 py-3 font-semibold text-right">Amount</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} className="border-b border-neutral-50 last:border-0">
                  <td className="px-5 py-4 font-semibold">{inv.invoice_number}</td>
                  <td className="px-5 py-4 text-neutral-600">{formatDate(inv.invoice_date)}</td>
                  <td className="px-5 py-4 text-neutral-600">{inv.membership_plan}</td>
                  <td className="px-5 py-4 text-right font-semibold">₹{inv.total_amount.toLocaleString("en-IN")}</td>
                  <td className="px-5 py-4">
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${inv.status === "PAID" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>{inv.status}</span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <a href={`/api/v1/client/invoices/${inv.id}/pdf`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#E39F25] hover:text-[#430021]">
                      <Download className="w-4 h-4" />
                      PDF
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
