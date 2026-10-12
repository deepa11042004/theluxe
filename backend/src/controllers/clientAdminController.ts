import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { sendAutomatedEmail } from "../utils/emailService";
import { getPlanPricing } from "../utils/pricing";

export async function getClients(req: Request, res: Response) {
  try {
    const page = Math.max(1, parseInt(req.query.page as string, 10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string, 10) || 15));
    const skip = (page - 1) * limit;

    const search = (req.query.search as string)?.trim();
    const paymentStatus = (req.query.paymentStatus as string)?.trim();
    const membershipStatus = (req.query.membershipStatus as string)?.trim();
    const plan = (req.query.plan as string)?.trim();
    const city = (req.query.city as string)?.trim();
    const sortBy = (req.query.sortBy as string)?.trim() || "created_at";
    const order = (req.query.order as string)?.toLowerCase() === "asc" ? "asc" : "desc";

    const where: any = {};

    if (search) {
      where.OR = [
        { client_code: { contains: search } },
        { first_name: { contains: search } },
        { last_name: { contains: search } },
        { email: { contains: search } },
        { mobile: { contains: search } },
        { membership_number: { contains: search } },
        { company_name: { contains: search } },
      ];
    }

    if (paymentStatus && paymentStatus !== "ALL") {
      where.latest_payment_status = paymentStatus;
    }

    if (membershipStatus && membershipStatus !== "ALL") {
      where.membership_status = membershipStatus;
    }

    if (plan && plan !== "ALL") {
      where.membership_plan = { contains: plan };
    }

    if (city && city !== "ALL") {
      where.city = { contains: city };
    }

    const [total, clients] = await Promise.all([
      prisma.client.count({ where }),
      prisma.client.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortBy]: order },
        include: {
          _count: {
            select: {
              payment_attempts: true,
              invoices: true,
              email_logs: true,
            },
          },
          invoices: {
            take: 1,
            orderBy: { invoice_date: "desc" },
            select: { id: true, invoice_number: true, status: true },
          },
        },
      }),
    ]);

    const totalPages = Math.ceil(total / limit) || 1;

    return res.status(200).json({
      success: true,
      data: clients,
      meta: {
        total,
        page,
        limit,
        totalPages,
      },
    });
  } catch (err: any) {
    console.error("[ClientAdmin] getClients error:", err);
    return res.status(500).json({
      success: false,
      message: err?.message || "Failed to retrieve clients list.",
    });
  }
}

export async function getClientById(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const client = await prisma.client.findFirst({
      where: {
        OR: [{ id }, { client_code: id }],
      },
      include: {
        payment_attempts: {
          orderBy: { created_at: "desc" },
        },
        invoices: {
          orderBy: { invoice_date: "desc" },
        },
        email_logs: {
          orderBy: { sent_at: "desc" },
        },
      },
    });

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client record not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: client,
    });
  } catch (err: any) {
    console.error("[ClientAdmin] getClientById error:", err);
    return res.status(500).json({
      success: false,
      message: err?.message || "Failed to retrieve client details.",
    });
  }
}

export async function updateClient(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const {
      salutation,
      first_name,
      last_name,
      email,
      mobile,
      city,
      company_name,
      gstin,
      notes,
    } = req.body;

    const existing = await prisma.client.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Client not found for update.",
      });
    }

    const updated = await prisma.client.update({
      where: { id },
      data: {
        salutation: salutation !== undefined ? salutation : existing.salutation,
        first_name: first_name ? String(first_name).trim() : existing.first_name,
        last_name: last_name ? String(last_name).trim() : existing.last_name,
        email: email ? String(email).trim().toLowerCase() : existing.email,
        mobile: mobile ? String(mobile).trim() : existing.mobile,
        city: city ? String(city).trim() : existing.city,
        company_name: company_name !== undefined ? company_name : existing.company_name,
        gstin: gstin !== undefined ? gstin : existing.gstin,
        notes: notes !== undefined ? notes : existing.notes,
      },
    });

    // Audit log
    await prisma.auditLog.create({
      data: {
        user_id: req.user?.id || null,
        action: "UPDATE",
        entity: "Client",
        entity_id: id,
        old_data: JSON.stringify({
          name: `${existing.first_name} ${existing.last_name}`,
          email: existing.email,
          mobile: existing.mobile,
        }),
        new_data: JSON.stringify({
          name: `${updated.first_name} ${updated.last_name}`,
          email: updated.email,
          mobile: updated.mobile,
        }),
      },
    });

    return res.status(200).json({
      success: true,
      message: "Client non-financial details updated successfully.",
      data: updated,
    });
  } catch (err: any) {
    console.error("[ClientAdmin] updateClient error:", err);
    return res.status(500).json({
      success: false,
      message: err?.message || "Failed to update client details.",
    });
  }
}

export async function sendClientWelcomeEmail(req: Request, res: Response) {
  try {
    const { id } = req.params;

    const client = await prisma.client.findUnique({
      where: { id },
      include: {
        invoices: {
          take: 1,
          orderBy: { invoice_date: "desc" },
        },
      },
    });

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found.",
      });
    }

    const isPaid = client.latest_payment_status === "SUCCESSFUL" || client.membership_status === "ACTIVE";
    const templateType = isPaid ? "WELCOME_PAID" : client.latest_payment_status === "FAILED" ? "PAYMENT_FAILED" : "MEMBERSHIP_PENDING";

    const pricing = getPlanPricing(client.membership_plan);
    const latestInvoice = client.invoices[0];

    const result = await sendAutomatedEmail({
      recipient: client.email,
      templateType,
      clientId: client.id,
      invoiceId: latestInvoice?.id,
      createdByUserId: req.user?.id,
      data: {
        clientName: `${client.salutation} ${client.first_name} ${client.last_name}`.trim(),
        membershipPlan: client.membership_plan,
        membershipNumber: client.membership_number || undefined,
        amount: pricing.totalAmount,
        invoiceNumber: latestInvoice?.invoice_number,
        paymentStatus: client.latest_payment_status,
      },
      attachment:
        isPaid && latestInvoice?.pdf_path
          ? {
              filename: `${latestInvoice.invoice_number}.pdf`,
              path: latestInvoice.pdf_path,
            }
          : undefined,
    });

    if (!result.success) {
      return res.status(500).json({
        success: false,
        message: `Failed to dispatch email: ${result.error}`,
      });
    }

    await prisma.client.update({
      where: { id: client.id },
      data: { welcome_email_sent_at: new Date() },
    });

    // Audit log
    await prisma.auditLog.create({
      data: {
        user_id: req.user?.id || null,
        action: "CREATE",
        entity: "EmailLog",
        entity_id: client.id,
        new_data: JSON.stringify({
          template: templateType,
          recipient: client.email,
        }),
      },
    });

    return res.status(200).json({
      success: true,
      message: `Email (${templateType}) sent successfully to ${client.email}.`,
      data: { messageId: result.messageId },
    });
  } catch (err: any) {
    console.error("[ClientAdmin] sendWelcomeEmail error:", err);
    return res.status(500).json({
      success: false,
      message: err?.message || "Failed to send welcome email.",
    });
  }
}
