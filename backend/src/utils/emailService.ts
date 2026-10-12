import nodemailer, { Transporter, SendMailOptions } from "nodemailer";
import { prisma } from "../config/prisma";
import { COMPANY_CONFIG } from "./pricing";

export type EmailTemplateType =
  | "WELCOME_PAID"
  | "MEMBERSHIP_PENDING"
  | "PAYMENT_FAILED"
  | "INVOICE_ISSUED"
  | "INVOICE_RESEND";

export interface SendEmailOptions {
  recipient: string;
  templateType: EmailTemplateType;
  clientId?: string;
  invoiceId?: string;
  createdByUserId?: string;
  data: {
    clientName: string;
    membershipPlan: string;
    membershipNumber?: string;
    amount?: number;
    invoiceNumber?: string;
    paymentStatus?: string;
    errorMessage?: string;
    loginUrl?: string;
    paymentUrl?: string;
  };
  attachment?: {
    filename: string;
    path: string;
  };
}

let transporterInstance: Transporter | null = null;

function getTransporter(): Transporter {
  if (transporterInstance) return transporterInstance;

  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (host && user && pass) {
    transporterInstance = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });
  } else {
    // Development fallback mock transporter (logs output and returns success)
    transporterInstance = nodemailer.createTransport({
      streamTransport: true,
      newline: "windows",
      buffer: true,
    });
  }

  return transporterInstance;
}

export function generateEmailHtml(templateType: EmailTemplateType, data: SendEmailOptions["data"]): { subject: string; html: string; text: string } {
  const brandGold = "#E39F25";
  const brandDark = "#0E2A3A";
  const conciergeEmail = COMPANY_CONFIG.email;
  const conciergePhone = COMPANY_CONFIG.phone;

  const headerHtml = `
    <div style="background-color: ${brandDark}; padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0;">
      <h1 style="color: #FFFFFF; font-family: 'Playfair Display', Georgia, serif; font-size: 24px; margin: 0; letter-spacing: 2px;">THE LUXE YATRA</h1>
      <p style="color: ${brandGold}; font-family: sans-serif; font-size: 11px; margin: 5px 0 0 0; letter-spacing: 3px; text-transform: uppercase;">Worldwide Travels & Resorts</p>
    </div>
  `;

  const footerHtml = `
    <div style="background-color: #F8F9FA; border-top: 1px solid #E5E7EB; padding: 25px 20px; text-align: center; font-family: sans-serif; color: #6B7280; font-size: 12px; border-radius: 0 0 8px 8px;">
      <p style="margin: 0 0 8px 0; font-weight: 600; color: ${brandDark};">The Luxe Yatra Concierge</p>
      <p style="margin: 0 0 8px 0;">Email: <a href="mailto:${conciergeEmail}" style="color: ${brandGold}; text-decoration: none;">${conciergeEmail}</a> | Desk: ${conciergePhone}</p>
      <p style="margin: 0; font-size: 11px; color: #9CA3AF;">© ${new Date().getFullYear()} ${COMPANY_CONFIG.legalName}. All rights reserved.</p>
    </div>
  `;

  switch (templateType) {
    case "WELCOME_PAID": {
      const subject = `Welcome to The Luxe Club — ${data.membershipPlan}`;
      const html = `
        <div style="max-width: 600px; margin: 0 auto; background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 8px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
          ${headerHtml}
          <div style="padding: 35px 30px; color: #374151; line-height: 1.6;">
            <p style="font-size: 18px; color: ${brandDark}; font-weight: 600; margin-top: 0;">Dear ${data.clientName},</p>
            <p>Welcome to an elite circle of discerning travelers. It is our immense privilege to confirm your membership in <strong>${data.membershipPlan}</strong>.</p>
            
            <div style="background: #FAF8F5; border: 1px solid ${brandGold}30; border-radius: 8px; padding: 20px; margin: 25px 0;">
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr>
                  <td style="padding: 6px 0; color: #6B7280;">Membership Tier:</td>
                  <td style="padding: 6px 0; font-weight: 600; color: ${brandDark}; text-align: right;">${data.membershipPlan}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #6B7280;">Membership Number:</td>
                  <td style="padding: 6px 0; font-weight: 700; color: ${brandGold}; text-align: right;">${data.membershipNumber || "LY-" + Math.floor(100000 + Math.random() * 900000)}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #6B7280;">Status:</td>
                  <td style="padding: 6px 0; font-weight: 600; color: #166534; text-align: right;">ACTIVE</td>
                </tr>
              </table>
            </div>

            <p style="font-size: 15px; color: ${brandDark}; font-weight: 600;">What happens next?</p>
            <ul style="padding-left: 20px; margin-bottom: 25px;">
              <li>Your personal Luxe travel curator will reach out within 24 hours.</li>
              <li>You now have preferred privileges at over 500+ global boutique luxury resorts.</li>
              <li>Enjoy complimentary private concierge itineraries and airport transfer coordination.</li>
            </ul>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${data.loginUrl || "http://localhost:3001/login"}" style="background-color: ${brandGold}; color: #FFFFFF; padding: 12px 28px; text-decoration: none; font-weight: 600; font-size: 14px; border-radius: 6px; display: inline-block;">Access Member Portal</a>
            </div>

            <p style="font-size: 13px; color: #6B7280;">Warm regards,<br><strong>The Luxe Yatra Team</strong></p>
          </div>
          ${footerHtml}
        </div>
      `;
      const text = `Dear ${data.clientName},\n\nWelcome to The Luxe Club! Your membership in ${data.membershipPlan} is ACTIVE.\nMembership No: ${data.membershipNumber || "Issued"}\n\nOur concierge desk is at your service.\nContact: ${conciergeEmail} | ${conciergePhone}`;
      return { subject, html, text };
    }

    case "MEMBERSHIP_PENDING": {
      const subject = `Your Luxe Club Application Received — Complete Payment`;
      const html = `
        <div style="max-width: 600px; margin: 0 auto; background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 8px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
          ${headerHtml}
          <div style="padding: 35px 30px; color: #374151; line-height: 1.6;">
            <p style="font-size: 18px; color: ${brandDark}; font-weight: 600; margin-top: 0;">Dear ${data.clientName},</p>
            <p>Thank you for expressing your interest in joining <strong>The Luxe Club</strong> with selected plan <strong>${data.membershipPlan}</strong>.</p>
            <p>Your membership application has been safely saved in our system. We noticed that your payment is currently <strong>pending completion</strong>.</p>
            
            <div style="background: #FEF3C7; border: 1px solid #FCD34D; border-radius: 8px; padding: 16px; margin: 20px 0; color: #92400E; font-size: 14px;">
              Your privileges and welcome pack will be unlocked as soon as your payment is confirmed.
            </div>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${data.paymentUrl || "http://localhost:3001/join"}" style="background-color: ${brandGold}; color: #FFFFFF; padding: 12px 28px; text-decoration: none; font-weight: 600; font-size: 14px; border-radius: 6px; display: inline-block;">Complete Your Membership Payment</a>
            </div>

            <p style="font-size: 13px; color: #6B7280;">If you require assistance from a dedicated relationship manager, please reply directly to this email or call ${conciergePhone}.</p>
          </div>
          ${footerHtml}
        </div>
      `;
      const text = `Dear ${data.clientName},\n\nYour application for ${data.membershipPlan} is pending completion of payment.\nPlease visit http://localhost:3001/join to complete your enrollment.\n\nSupport: ${conciergeEmail}`;
      return { subject, html, text };
    }

    case "PAYMENT_FAILED": {
      const subject = `Action Required: Payment Attempt for ${data.membershipPlan}`;
      const html = `
        <div style="max-width: 600px; margin: 0 auto; background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 8px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
          ${headerHtml}
          <div style="padding: 35px 30px; color: #374151; line-height: 1.6;">
            <p style="font-size: 18px; color: ${brandDark}; font-weight: 600; margin-top: 0;">Dear ${data.clientName},</p>
            <p>We noticed an issue with your recent payment attempt for <strong>${data.membershipPlan}</strong>.</p>
            
            <div style="background: #FEE2E2; border: 1px solid #FCA5A5; border-radius: 8px; padding: 16px; margin: 20px 0; color: #991B1B; font-size: 14px;">
              <strong>Status:</strong> Payment Incomplete / Failed<br>
              ${data.errorMessage ? `<strong>Reason:</strong> ${data.errorMessage}` : "Your bank or card gateway was unable to complete this transaction."}
            </div>

            <p>No worries — your registration profile is safely saved. You can retry anytime via secure Razorpay checkout.</p>

            <div style="text-align: center; margin: 30px 0;">
              <a href="${data.paymentUrl || "http://localhost:3001/join"}" style="background-color: ${brandGold}; color: #FFFFFF; padding: 12px 28px; text-decoration: none; font-weight: 600; font-size: 14px; border-radius: 6px; display: inline-block;">Retry Payment Securely</a>
            </div>

            <p style="font-size: 13px; color: #6B7280;">Our concierge desk is also available to assist you with alternative bank transfer details.</p>
          </div>
          ${footerHtml}
        </div>
      `;
      const text = `Dear ${data.clientName},\n\nYour payment attempt for ${data.membershipPlan} could not be completed.\nPlease retry at http://localhost:3001/join or contact ${conciergeEmail}.`;
      return { subject, html, text };
    }

    case "INVOICE_ISSUED":
    case "INVOICE_RESEND": {
      const isResend = templateType === "INVOICE_RESEND";
      const subject = isResend
        ? `Invoice Copy: ${data.invoiceNumber || "LY-INV"} — The Luxe Yatra`
        : `Your Membership Invoice: ${data.invoiceNumber || "LY-INV"} — The Luxe Yatra`;
      const isPaid = (data.paymentStatus || "").toUpperCase() === "PAID";

      const html = `
        <div style="max-width: 600px; margin: 0 auto; background: #FFFFFF; border: 1px solid #E5E7EB; border-radius: 8px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
          ${headerHtml}
          <div style="padding: 35px 30px; color: #374151; line-height: 1.6;">
            <p style="font-size: 18px; color: ${brandDark}; font-weight: 600; margin-top: 0;">Dear ${data.clientName},</p>
            <p>${isResend ? "As requested, here is a copy of your" : "Thank you for choosing The Luxe Yatra. Please find attached your official"} invoice <strong>${data.invoiceNumber}</strong>.</p>
            
            <div style="background: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 8px; padding: 20px; margin: 25px 0;">
              <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                <tr>
                  <td style="padding: 6px 0; color: #6B7280;">Invoice Number:</td>
                  <td style="padding: 6px 0; font-weight: 600; color: ${brandDark}; text-align: right;">${data.invoiceNumber}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #6B7280;">Membership:</td>
                  <td style="padding: 6px 0; font-weight: 600; color: ${brandDark}; text-align: right;">${data.membershipPlan}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #6B7280;">Total Amount:</td>
                  <td style="padding: 6px 0; font-weight: 700; color: ${brandDark}; text-align: right;">₹${(data.amount || 0).toLocaleString("en-IN")}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #6B7280;">Status:</td>
                  <td style="padding: 6px 0; font-weight: 700; color: ${isPaid ? "#166534" : "#B45309"}; text-align: right;">${data.paymentStatus || (isPaid ? "PAID" : "UNPAID")}</td>
                </tr>
              </table>
            </div>

            <p style="font-size: 14px; color: #4B5563;">Your official PDF invoice is attached to this email for your records.</p>
            <p style="font-size: 13px; color: #6B7280;">For GST input credit or corporate accounts reconciliation, feel free to write to <a href="mailto:${COMPANY_CONFIG.accountsEmail}" style="color: ${brandGold};">${COMPANY_CONFIG.accountsEmail}</a>.</p>
          </div>
          ${footerHtml}
        </div>
      `;
      const text = `Dear ${data.clientName},\n\nPlease find attached invoice ${data.invoiceNumber} for ${data.membershipPlan}.\nAmount: ₹${(data.amount || 0).toLocaleString("en-IN")}\nStatus: ${data.paymentStatus || "Issued"}\n\nThe Luxe Yatra Accounts`;
      return { subject, html, text };
    }
  }
}

export async function sendAutomatedEmail(options: SendEmailOptions): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const { recipient, templateType, clientId, invoiceId, createdByUserId, data, attachment } = options;

  const { subject, html, text } = generateEmailHtml(templateType, data);
  const transporter = getTransporter();

  try {
    const fromAddress = process.env.SMTP_FROM || `"${COMPANY_CONFIG.brandName}" <${COMPANY_CONFIG.email}>`;
    
    const mailOptions: SendMailOptions = {
      from: fromAddress,
      to: recipient,
      subject,
      text,
      html,
    };

    if (attachment && attachment.path) {
      mailOptions.attachments = [
        {
          filename: attachment.filename,
          path: attachment.path,
        },
      ];
    }

    const info = await transporter.sendMail(mailOptions);
    const messageId = info.messageId || `msg-${Date.now()}`;

    // Log success into EmailLog table
    await prisma.emailLog.create({
      data: {
        client_id: clientId || null,
        invoice_id: invoiceId || null,
        recipient,
        template_type: templateType,
        subject,
        status: "SENT",
        provider_message_id: messageId,
        created_by_user_id: createdByUserId || null,
      },
    });

    return { success: true, messageId };
  } catch (err: any) {
    const errorMsg = err?.message || String(err);
    console.error(`[EmailService] Failed to send email to ${recipient}:`, errorMsg);

    // Log failure into EmailLog table
    try {
      await prisma.emailLog.create({
        data: {
          client_id: clientId || null,
          invoice_id: invoiceId || null,
          recipient,
          template_type: templateType,
          subject,
          status: "FAILED",
          error_message: errorMsg,
          created_by_user_id: createdByUserId || null,
        },
      });
    } catch (logErr) {
      console.error("[EmailService] Failed to record email error log:", logErr);
    }

    return { success: false, error: errorMsg };
  }
}
