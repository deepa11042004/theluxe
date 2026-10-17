import { Request, Response } from "express";
import crypto from "crypto";
import Razorpay from "razorpay";
import { prisma } from "../config/prisma";
import { getPlanPricing, TEST_PLAN_NAME } from "../utils/pricing";
import { generateInvoicePdf } from "../utils/pdfService";
import { sendAutomatedEmail } from "../utils/emailService";

function getRazorpayInstance(): Razorpay | null {
  const key_id = (process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "").trim();
  const key_secret = (process.env.RAZORPAY_KEY_SECRET || "").trim();
  if (key_id && key_secret && key_id.length > 5) {
    return new Razorpay({ key_id, key_secret });
  }
  return null;
}

export async function generateClientCode(): Promise<string> {
  // Based on the highest existing code (not the row count) so deleting a client can't cause a duplicate code.
  const last = await prisma.client.findFirst({
    where: { client_code: { startsWith: "CL-" } },
    orderBy: { client_code: "desc" },
    select: { client_code: true },
  });
  const lastNum = last ? parseInt(last.client_code.replace("CL-", ""), 10) : 10000;
  return `CL-${(Number.isFinite(lastNum) ? lastNum : 10000) + 1}`;
}

export async function generateInvoiceNumber(): Promise<string> {
  const year = new Date().getFullYear();
  const count = await prisma.invoice.count();
  const pad = String(count + 1).padStart(4, "0");
  return `LY-INV-${year}-${pad}`;
}

export class RegistrationValidationError extends Error {}

export async function saveRegistrationClient(body: any) {
  const {
    salutation = "Mr.",
    firstName,
    lastName,
    mobile,
    email,
    city,
    plan,
    needGst = false,
    companyName,
    gstin,
    acceptTerms = true,
  } = body;

  if (!firstName || !lastName || !mobile || !email || !city || !plan) {
    throw new RegistrationValidationError(
      "Missing required registration fields (firstName, lastName, mobile, email, city, plan)."
    );
  }

  if (plan === TEST_PLAN_NAME && process.env.NODE_ENV === "production") {
    throw new RegistrationValidationError("Invalid membership plan selected.");
  }

  const cleanEmail = String(email).trim().toLowerCase();
  const cleanMobile = String(mobile).trim();
  const planPricing = getPlanPricing(plan);

  // Reuse a record only when BOTH email and mobile match (same person retrying / renewing).
  // Matching on either one would overwrite another client's details when an email or phone is shared.
  let client = await prisma.client.findFirst({
    where: { email: cleanEmail, mobile: cleanMobile },
    orderBy: { created_at: "desc" },
  });

  if (client) {
    // Update client profile with latest submitted details
    client = await prisma.client.update({
      where: { id: client.id },
      data: {
        salutation,
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: cleanEmail,
        mobile: cleanMobile,
        city: city.trim(),
        membership_plan: planPricing.name,
        amount: planPricing.totalAmount,
        need_gst: Boolean(needGst),
        company_name: companyName ? String(companyName).trim() : null,
        gstin: gstin ? String(gstin).trim() : null,
        terms_accepted: Boolean(acceptTerms),
        terms_accepted_at: new Date(),
        latest_payment_status: "PENDING",
        last_payment_attempt_at: new Date(),
      },
    });
  } else {
    const clientCode = await generateClientCode();
    client = await prisma.client.create({
      data: {
        client_code: clientCode,
        salutation,
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: cleanEmail,
        mobile: cleanMobile,
        city: city.trim(),
        membership_plan: planPricing.name,
        membership_status: "PENDING_PAYMENT",
        latest_payment_status: "PENDING",
        amount: planPricing.totalAmount,
        currency: "INR",
        need_gst: Boolean(needGst),
        company_name: companyName ? String(companyName).trim() : null,
        gstin: gstin ? String(gstin).trim() : null,
        terms_accepted: Boolean(acceptTerms),
        terms_accepted_at: new Date(),
        last_payment_attempt_at: new Date(),
      },
    });
  }

  return { client, planPricing };
}

export async function registerMembership(req: Request, res: Response) {
  try {
    const { client, planPricing } = await saveRegistrationClient(req.body);

    // 2. Create Razorpay order if keys available, or generate reference
    const rzp = getRazorpayInstance();
    let orderId: string | null = null;

    if (rzp) {
      try {
        const rzpOrder = await rzp.orders.create({
          amount: planPricing.totalAmountPaise,
          currency: "INR",
          receipt: `rcpt_${client.client_code}_${Date.now()}`,
          notes: {
            clientId: client.id,
            clientCode: client.client_code,
            plan: planPricing.name,
            email: client.email,
          },
        });
        orderId = rzpOrder.id;
      } catch (err) {
        console.error("[Razorpay] Failed to create order through API:", err);
        orderId = `order_${Date.now()}_${Math.random().toString(36).substring(7)}`;
      }
    } else {
      orderId = `order_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    }

    // 3. Record PaymentAttempt
    const paymentAttempt = await prisma.paymentAttempt.create({
      data: {
        client_id: client.id,
        gateway: "RAZORPAY",
        gateway_order_id: orderId,
        amount: planPricing.totalAmount,
        currency: "INR",
        status: "PENDING",
      },
    });

    const activeKeyId = (process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "").trim();

    return res.status(200).json({
      success: true,
      message: "Client registration saved successfully before payment.",
      data: {
        client: {
          id: client.id,
          clientCode: client.client_code,
          name: `${client.first_name} ${client.last_name}`,
          email: client.email,
          mobile: client.mobile,
          plan: client.membership_plan,
        },
        paymentAttemptId: paymentAttempt.id,
        orderId,
        amountPaise: planPricing.totalAmountPaise,
        amount: planPricing.totalAmount,
        currency: "INR",
        keyId: activeKeyId,
      },
    });
  } catch (err: any) {
    if (err instanceof RegistrationValidationError) {
      return res.status(400).json({ success: false, message: err.message });
    }
    console.error("[Membership] Register error:", err);
    return res.status(500).json({
      success: false,
      message: err?.message || "Internal server error registering client.",
    });
  }
}

interface ActivationInput {
  client: Awaited<ReturnType<typeof prisma.client.findUniqueOrThrow>>;
  attempt: { id: string };
  gatewayLabel: string;
  paymentId: string;
  orderId?: string | null;
}

export async function activateMembershipAfterPayment({
  client,
  attempt,
  gatewayLabel,
  paymentId,
  orderId,
}: ActivationInput) {
  // Activate Membership
  const now = new Date();
  const expiryDate = new Date();
  expiryDate.setFullYear(expiryDate.getFullYear() + 1);

  const membershipNumber =
    client.membership_number || `LY-${Math.floor(100000 + Math.random() * 900000)}`;

  const updatedClient = await prisma.client.update({
    where: { id: client.id },
    data: {
      membership_status: "ACTIVE",
      membership_number: membershipNumber,
      membership_activated_at: now,
      membership_expires_at: expiryDate,
      latest_payment_status: "SUCCESSFUL",
      last_payment_attempt_at: now,
    },
  });

  // 3. Create or Update Invoice (Idempotent)
  const pricing = getPlanPricing(client.membership_plan);
  let invoice = await prisma.invoice.findFirst({
    where: {
      client_id: client.id,
      payment_attempt_id: attempt.id,
    },
  });

  if (!invoice) {
    const invoiceNumber = await generateInvoiceNumber();
    invoice = await prisma.invoice.create({
      data: {
        invoice_number: invoiceNumber,
        client_id: client.id,
        payment_attempt_id: attempt.id,
        invoice_date: now,
        paid_date: now,
        invoice_type: "TAX_INVOICE",
        status: "PAID",
        membership_plan: pricing.name,
        plan_description: pricing.description,
        quantity: 1,
        unit_price: pricing.baseAmount,
        taxable_amount: pricing.baseAmount,
        tax_rate: pricing.taxRate,
        tax_amount: pricing.taxAmount,
        total_amount: pricing.totalAmount,
        amount_paid: pricing.totalAmount,
        balance_due: 0,
        currency: "INR",
        company_name: client.company_name,
        company_gstin: client.gstin,
      },
    });

    // Generate PDF Invoice
    try {
      const { filePath, relativeUrl } = await generateInvoicePdf({
        invoiceNumber: invoice.invoice_number,
        invoiceDate: invoice.invoice_date,
        paidDate: invoice.paid_date,
        invoiceType: "TAX_INVOICE",
        status: "PAID",
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
          amountPaid: pricing.totalAmount,
          balanceDue: 0,
          currency: "INR",
        },
        payment: {
          gateway: gatewayLabel,
          paymentId: paymentId,
          orderId: orderId,
          paymentDate: now,
          status: "SUCCESSFUL",
        },
      });

      invoice = await prisma.invoice.update({
        where: { id: invoice.id },
        data: {
          pdf_path: filePath,
          pdf_url: relativeUrl,
        },
      });
    } catch (pdfErr) {
      console.error("[Invoice] Failed to generate PDF during payment verification:", pdfErr);
    }
  }

  // 4. Send Welcome Email (Automatic)
  try {
    await sendAutomatedEmail({
      recipient: client.email,
      templateType: "WELCOME_PAID",
      clientId: client.id,
      invoiceId: invoice?.id,
      data: {
        clientName: `${client.salutation} ${client.first_name} ${client.last_name}`.trim(),
        membershipPlan: pricing.name,
        membershipNumber,
        amount: pricing.totalAmount,
        invoiceNumber: invoice?.invoice_number,
        paymentStatus: "PAID",
      },
      attachment:
        invoice?.pdf_path
          ? {
              filename: `${invoice.invoice_number}.pdf`,
              path: invoice.pdf_path,
            }
          : undefined,
    });

    await prisma.client.update({
      where: { id: client.id },
      data: { welcome_email_sent_at: new Date() },
    });
  } catch (mailErr) {
    console.error("[Email] Failed to send welcome email:", mailErr);
  }

  return { updatedClient, membershipNumber, invoice: invoice! };
}

export async function verifyPayment(req: Request, res: Response) {
  try {
    const {
      clientId,
      paymentAttemptId,
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    } = req.body;

    if (!clientId || !razorpay_payment_id) {
      return res.status(400).json({
        success: false,
        message: "Missing required verification fields (clientId, razorpay_payment_id).",
      });
    }

    const client = await prisma.client.findUnique({
      where: { id: clientId },
    });

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found for verification.",
      });
    }

    // Check if signature verification is needed
    const keySecret = (process.env.RAZORPAY_KEY_SECRET || "").trim();
    if (keySecret && razorpay_order_id && razorpay_signature) {
      const generatedSignature = crypto
        .createHmac("sha256", keySecret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex");

      if (generatedSignature !== razorpay_signature) {
        console.warn("[Razorpay] Signature mismatch for payment:", razorpay_payment_id);
        return res.status(400).json({
          success: false,
          message: "Payment signature verification failed.",
        });
      }
    }

    // 1. Update PaymentAttempt
    let attempt = null;
    if (paymentAttemptId) {
      attempt = await prisma.paymentAttempt.findUnique({
        where: { id: paymentAttemptId },
      });
    }

    if (attempt) {
      attempt = await prisma.paymentAttempt.update({
        where: { id: attempt.id },
        data: {
          status: "SUCCESSFUL",
          gateway_payment_id: razorpay_payment_id,
          gateway_order_id: razorpay_order_id || attempt.gateway_order_id,
          gateway_signature: razorpay_signature || null,
        },
      });
    } else {
      const pricing = getPlanPricing(client.membership_plan);
      attempt = await prisma.paymentAttempt.create({
        data: {
          client_id: client.id,
          gateway: "RAZORPAY",
          gateway_payment_id: razorpay_payment_id,
          gateway_order_id: razorpay_order_id || null,
          gateway_signature: razorpay_signature || null,
          amount: pricing.totalAmount,
          currency: "INR",
          status: "SUCCESSFUL",
        },
      });
    }

    const { updatedClient, membershipNumber, invoice } = await activateMembershipAfterPayment({
      client,
      attempt,
      gatewayLabel: "Razorpay",
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
    });

    return res.status(200).json({
      success: true,
      message: "Payment successfully verified. Membership activated and invoice issued.",
      data: {
        client: updatedClient,
        membershipNumber,
        invoiceNumber: invoice.invoice_number,
        invoiceId: invoice.id,
        paymentId: razorpay_payment_id,
      },
    });
  } catch (err: any) {
    console.error("[Membership] Verification error:", err);
    return res.status(500).json({
      success: false,
      message: err?.message || "Internal server error during payment verification.",
    });
  }
}

export async function recordFailedPayment(req: Request, res: Response) {
  try {
    const { clientId, paymentAttemptId, errorCode, errorDescription } = req.body;

    if (!clientId) {
      return res.status(400).json({ success: false, message: "clientId is required" });
    }

    if (paymentAttemptId) {
      await prisma.paymentAttempt.update({
        where: { id: paymentAttemptId },
        data: {
          status: "FAILED",
          error_code: errorCode ? String(errorCode) : null,
          error_description: errorDescription ? String(errorDescription) : null,
        },
      });
    }

    const client = await prisma.client.update({
      where: { id: clientId },
      data: {
        latest_payment_status: "FAILED",
        last_payment_attempt_at: new Date(),
      },
    });

    return res.status(200).json({
      success: true,
      message: "Payment failure recorded. Client record preserved.",
      data: client,
    });
  } catch (err: any) {
    console.error("[Membership] Failed payment recording error:", err);
    return res.status(500).json({
      success: false,
      message: err?.message || "Internal server error recording payment failure.",
    });
  }
}

export async function recordAbandonedPayment(req: Request, res: Response) {
  try {
    const { clientId, paymentAttemptId } = req.body;

    if (!clientId) {
      return res.status(400).json({ success: false, message: "clientId is required" });
    }

    if (paymentAttemptId) {
      await prisma.paymentAttempt.update({
        where: { id: paymentAttemptId },
        data: {
          status: "ABANDONED",
          error_description: "Payment modal was dismissed by user without completion",
        },
      });
    }

    const client = await prisma.client.update({
      where: { id: clientId },
      data: {
        latest_payment_status: "ABANDONED",
        last_payment_attempt_at: new Date(),
      },
    });

    return res.status(200).json({
      success: true,
      message: "Payment abandonment recorded. Client record preserved.",
      data: client,
    });
  } catch (err: any) {
    console.error("[Membership] Abandoned payment recording error:", err);
    return res.status(500).json({
      success: false,
      message: err?.message || "Internal server error recording abandoned payment.",
    });
  }
}

export async function handleWebhook(req: Request, res: Response) {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const signature = req.headers["x-razorpay-signature"] as string;

    if (webhookSecret && signature) {
      const shasum = crypto.createHmac("sha256", webhookSecret);
      shasum.update(JSON.stringify(req.body));
      const digest = shasum.digest("hex");
      if (digest !== signature) {
        return res.status(400).json({ success: false, message: "Invalid webhook signature" });
      }
    }

    const event = req.body.event;
    const payload = req.body.payload;

    if (event === "payment.captured") {
      const paymentEntity = payload.payment.entity;
      const paymentId = paymentEntity.id;
      const orderId = paymentEntity.order_id;
      const email = paymentEntity.email;

      // Look up payment attempt
      const attempt = await prisma.paymentAttempt.findFirst({
        where: {
          OR: [{ gateway_order_id: orderId }, { gateway_payment_id: paymentId }],
        },
        include: { client: true },
      });

      if (attempt && attempt.status !== "SUCCESSFUL") {
        await prisma.paymentAttempt.update({
          where: { id: attempt.id },
          data: {
            status: "SUCCESSFUL",
            gateway_payment_id: paymentId,
            raw_response: JSON.stringify(paymentEntity),
          },
        });

        await prisma.client.update({
          where: { id: attempt.client_id },
          data: {
            membership_status: "ACTIVE",
            latest_payment_status: "SUCCESSFUL",
            last_payment_attempt_at: new Date(),
          },
        });
      }
    }

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error("[Razorpay Webhook] Error:", err);
    return res.status(500).json({ status: "error" });
  }
}
