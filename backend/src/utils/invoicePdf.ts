import { prisma } from "../config/prisma";
import { generateInvoicePdf } from "./pdfService";
import { getPlanPricing } from "./pricing";

const GATEWAY_LABELS: Record<string, string> = {
  RAZORPAY: "Razorpay",
  PAYU: "PayU",
};

// Rebuilds the invoice PDF from current DB data so company details (address, phone, email) are never stale.
export async function regenerateInvoicePdf(invoiceId: string): Promise<{ filePath: string; relativeUrl: string }> {
  const invoice = await prisma.invoice.findUniqueOrThrow({
    where: { id: invoiceId },
    include: { client: true, payment_attempt: true },
  });

  const pricing = getPlanPricing(invoice.membership_plan);
  const attempt = invoice.payment_attempt;

  const generated = await generateInvoicePdf({
    invoiceNumber: invoice.invoice_number,
    invoiceDate: invoice.invoice_date,
    paidDate: invoice.paid_date,
    invoiceType: invoice.invoice_type as any,
    status: invoice.status as any,
    client: {
      clientCode: invoice.client.client_code,
      salutation: invoice.client.salutation,
      name: `${invoice.client.first_name} ${invoice.client.last_name}`,
      email: invoice.client.email,
      mobile: invoice.client.mobile,
      city: invoice.client.city,
      companyName: invoice.client.company_name,
      gstin: invoice.client.gstin,
    },
    membership: {
      planName: invoice.membership_plan,
      description: invoice.plan_description || pricing.description,
      baseAmount: invoice.taxable_amount,
      taxRate: invoice.tax_rate,
      taxAmount: invoice.tax_amount,
      totalAmount: invoice.total_amount,
      amountPaid: invoice.amount_paid,
      balanceDue: invoice.balance_due,
      currency: invoice.currency,
    },
    payment: attempt
      ? {
          gateway: GATEWAY_LABELS[attempt.gateway] || attempt.gateway,
          paymentId: attempt.gateway_payment_id,
          orderId: attempt.gateway_order_id,
          paymentMethod: attempt.payment_method,
          paymentDate: invoice.paid_date || attempt.updated_at,
          status: attempt.status,
        }
      : null,
  });

  await prisma.invoice.update({
    where: { id: invoice.id },
    data: { pdf_path: generated.filePath, pdf_url: generated.relativeUrl },
  });

  return generated;
}
