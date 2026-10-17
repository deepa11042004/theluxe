import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { prisma } from "../config/prisma";
import { getPlanPricing, COMPANY_CONFIG } from "../utils/pricing";
import { generateInvoicePdf } from "../utils/pdfService";
import { regenerateInvoicePdf } from "../utils/invoicePdf";
import { sendAutomatedEmail } from "../utils/emailService";
import { generateInvoiceNumber } from "./membershipController";

export async function getInvoices(req: Request, res: Response) {
  try {
    const page = Math.max(1, parseInt(req.query.page as string, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string, 10) || 15));
    const skip = (page - 1) * limit;

    const search = (req.query.search as string)?.trim();
    const status = (req.query.status as string)?.trim();
    const invoiceType = (req.query.invoiceType as string)?.trim();
    const sortBy = (req.query.sortBy as string)?.trim() || "invoice_date";
    const order = (req.query.order as string)?.toLowerCase() === "asc" ? "asc" : "desc";

    const where: any = {};

    if (search) {
      where.OR = [
        { invoice_number: { contains: search } },
        { client: { first_name: { contains: search } } },
        { client: { last_name: { contains: search } } },
        { client: { email: { contains: search } } },
        { client: { client_code: { contains: search } } },
        { company_name: { contains: search } },
      ];
    }

    if (status && status !== "ALL") {
      where.status = status;
    }

    if (invoiceType && invoiceType !== "ALL") {
      where.invoice_type = invoiceType;
    }

    const [total, invoices] = await Promise.all([
      prisma.invoice.count({ where }),
      prisma.invoice.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: order },
        include: {
          client: {
            select: {
              id: true,
              client_code: true,
              salutation: true,
              first_name: true,
              last_name: true,
              email: true,
              mobile: true,
              city: true,
              membership_plan: true,
            },
          },
          payment_attempt: {
            select: {
              id: true,
              gateway: true,
              gateway_payment_id: true,
              gateway_order_id: true,
              status: true,
              created_at: true,
            },
          },
        },
      }),
    ]);

    const totalPages = Math.ceil(total / limit) || 1;

    return res.status(200).json({
      success: true,
      data: invoices,
      meta: {
        total,
        page,
        limit,
        totalPages,
      },
    });
  } catch (err: any) {
    console.error("[InvoiceAdmin] getInvoices error:", err);
    return res.status(500).json({
      success: false,
      message: err?.message || "Failed to retrieve invoices list.",
    });
  }
}

export async function getInvoiceById(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const invoice = await prisma.invoice.findFirst({
      where: {
        OR: [{ id }, { invoice_number: id }],
      },
      include: {
        client: true,
        payment_attempt: true,
        email_logs: {
          orderBy: { sent_at: "desc" },
        },
      },
    });

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: invoice,
    });
  } catch (err: any) {
    console.error("[InvoiceAdmin] getInvoiceById error:", err);
    return res.status(500).json({
      success: false,
      message: err?.message || "Failed to retrieve invoice details.",
    });
  }
}

export async function createInvoice(req: Request, res: Response) {
  try {
    const { clientId, paymentAttemptId, notes } = req.body;

    if (!clientId) {
      return res.status(400).json({
        success: false,
        message: "clientId is required to generate an invoice.",
      });
    }

    const client = await prisma.client.findUnique({
      where: { id: clientId },
      include: {
        payment_attempts: {
          orderBy: { created_at: "desc" },
        },
      },
    });

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found for invoice creation.",
      });
    }

    // Determine payment attempt
    let attempt = null;
    if (paymentAttemptId) {
      attempt = client.payment_attempts.find((p) => p.id === paymentAttemptId) || null;
    } else {
      // Find latest successful, or latest attempt
      attempt =
        client.payment_attempts.find((p) => p.status === "SUCCESSFUL") ||
        client.payment_attempts[0] ||
        null;
    }

    const isPaid = attempt?.status === "SUCCESSFUL" || client.latest_payment_status === "SUCCESSFUL";
    const pricing = getPlanPricing(client.membership_plan);

    // Idempotency: check if an identical invoice already exists for this client & attempt
    if (attempt && isPaid) {
      const existing = await prisma.invoice.findFirst({
        where: {
          client_id: client.id,
          payment_attempt_id: attempt.id,
          status: "PAID",
        },
      });

      if (existing) {
        return res.status(200).json({
          success: true,
          message: "An authoritative paid invoice already exists for this verified transaction.",
          data: existing,
          alreadyExisted: true,
        });
      }
    }

    const now = new Date();
    const invoiceNumber = await generateInvoiceNumber();

    const invoice = await prisma.invoice.create({
      data: {
        invoice_number: invoiceNumber,
        client_id: client.id,
        payment_attempt_id: attempt?.id || null,
        invoice_date: now,
        paid_date: isPaid ? (attempt?.created_at || now) : null,
        invoice_type: isPaid ? "TAX_INVOICE" : "PRO_FORMA",
        status: isPaid ? "PAID" : "UNPAID",
        membership_plan: pricing.name,
        plan_description: pricing.description,
        quantity: 1,
        unit_price: pricing.baseAmount,
        discount: 0,
        taxable_amount: pricing.baseAmount,
        tax_rate: pricing.taxRate,
        tax_amount: pricing.taxAmount,
        total_amount: pricing.totalAmount,
        amount_paid: isPaid ? pricing.totalAmount : 0,
        balance_due: isPaid ? 0 : pricing.totalAmount,
        currency: "INR",
        company_name: client.company_name,
        company_gstin: client.gstin,
        seller_name: COMPANY_CONFIG.legalName,
        seller_address: COMPANY_CONFIG.address,
        seller_gstin: COMPANY_CONFIG.gstin,
        seller_email: COMPANY_CONFIG.accountsEmail,
        seller_phone: COMPANY_CONFIG.phone,
        created_by_user_id: req.user?.id || null,
        notes: notes ? String(notes).trim() : null,
      },
    });

    // Generate PDF
    const { filePath, relativeUrl } = await generateInvoicePdf({
      invoiceNumber: invoice.invoice_number,
      invoiceDate: invoice.invoice_date,
      paidDate: invoice.paid_date,
      invoiceType: isPaid ? "TAX_INVOICE" : "PRO_FORMA",
      status: isPaid ? "PAID" : "UNPAID",
      client: {
        clientCode: client.client_code,
        salutation: client.salutation,
        name: `${client.first_name} ${client.last_name}`,
        email: client.email,
        mobile: client.mobile,
        city: client.city,
        companyName: client.company_name,
        gstin: client.gstin,
      },
      membership: {
        planName: pricing.name,
        description: pricing.description,
        baseAmount: pricing.baseAmount,
        taxRate: pricing.taxRate,
        taxAmount: pricing.taxAmount,
        totalAmount: pricing.totalAmount,
        amountPaid: isPaid ? pricing.totalAmount : 0,
        balanceDue: isPaid ? 0 : pricing.totalAmount,
        currency: "INR",
      },
      payment: attempt
        ? {
            gateway: attempt.gateway,
            paymentId: attempt.gateway_payment_id,
            orderId: attempt.gateway_order_id,
            paymentDate: attempt.created_at,
            status: attempt.status,
          }
        : null,
      notes: invoice.notes || undefined,
    });

    const updatedInvoice = await prisma.invoice.update({
      where: { id: invoice.id },
      data: {
        pdf_path: filePath,
        pdf_url: relativeUrl,
      },
      include: {
        client: true,
      },
    });

    // Audit log
    await prisma.auditLog.create({
      data: {
        user_id: req.user?.id || null,
        action: "CREATE",
        entity: "Invoice",
        entity_id: invoice.id,
        new_data: JSON.stringify({
          invoice_number: invoice.invoice_number,
          total_amount: invoice.total_amount,
          status: invoice.status,
        }),
      },
    });

    return res.status(201).json({
      success: true,
      message: `Invoice ${invoice.invoice_number} created successfully.`,
      data: updatedInvoice,
    });
  } catch (err: any) {
    console.error("[InvoiceAdmin] createInvoice error:", err);
    return res.status(500).json({
      success: false,
      message: err?.message || "Failed to generate invoice.",
    });
  }
}

export async function downloadInvoicePdf(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const invoice = await prisma.invoice.findFirst({
      where: {
        OR: [{ id }, { invoice_number: id }],
      },
      include: {
        client: true,
        payment_attempt: true,
      },
    });

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice record not found.",
      });
    }

    // Always rebuild so the PDF reflects the current company details
    const { filePath } = await regenerateInvoicePdf(invoice.id);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `inline; filename="${invoice.invoice_number}.pdf"`);
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } catch (err: any) {
    console.error("[InvoiceAdmin] downloadInvoicePdf error:", err);
    return res.status(500).json({
      success: false,
      message: err?.message || "Failed to download invoice PDF.",
    });
  }
}

export async function sendInvoiceEmail(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const invoice = await prisma.invoice.findFirst({
      where: {
        OR: [{ id }, { invoice_number: id }],
      },
      include: {
        client: true,
      },
    });

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found.",
      });
    }

    // Always rebuild so the emailed PDF reflects the current company details
    const { filePath } = await regenerateInvoicePdf(invoice.id);

    const templateType = invoice.sent_count > 0 ? "INVOICE_RESEND" : "INVOICE_ISSUED";

    const result = await sendAutomatedEmail({
      recipient: invoice.client.email,
      templateType,
      clientId: invoice.client_id,
      invoiceId: invoice.id,
      createdByUserId: req.user?.id,
      data: {
        clientName: `${invoice.client.salutation} ${invoice.client.first_name} ${invoice.client.last_name}`.trim(),
        membershipPlan: invoice.membership_plan,
        amount: invoice.total_amount,
        invoiceNumber: invoice.invoice_number,
        paymentStatus: invoice.status,
      },
      attachment: {
        filename: `${invoice.invoice_number}.pdf`,
        path: filePath,
      },
    });

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: `Failed to dispatch email: ${result.error}`,
      });
    }

    // Update invoice sent status
    await prisma.invoice.update({
      where: { id: invoice.id },
      data: {
        sent_count: { increment: 1 },
        last_sent_at: new Date(),
      },
    });

    // Audit log
    await prisma.auditLog.create({
      data: {
        user_id: req.user?.id || null,
        action: "CREATE",
        entity: "EmailLog",
        entity_id: invoice.id,
        new_data: JSON.stringify({
          action: "INVOICE_EMAIL_SENT",
          invoice: invoice.invoice_number,
          recipient: invoice.client.email,
        }),
      },
    });

    return res.status(200).json({
      success: true,
      message: `Invoice ${invoice.invoice_number} sent to ${invoice.client.email}.`,
      data: { messageId: result.messageId },
    });
  } catch (err: any) {
    console.error("[InvoiceAdmin] sendInvoiceEmail error:", err);
    return res.status(500).json({
      success: false,
      message: err?.message || "Failed to send invoice email.",
    });
  }
}
