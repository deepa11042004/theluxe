import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import { getUploadsDir } from "../middleware/upload";
import { COMPANY_CONFIG } from "./pricing";

export interface InvoicePdfData {
  invoiceNumber: string;
  invoiceDate: Date | string;
  dueDate?: Date | string | null;
  paidDate?: Date | string | null;
  invoiceType: "TAX_INVOICE" | "PRO_FORMA";
  status: "PAID" | "UNPAID" | "CANCELLED";
  client: {
    clientCode: string;
    salutation?: string;
    name: string;
    email: string;
    mobile: string;
    city?: string;
    companyName?: string | null;
    gstin?: string | null;
  };
  membership: {
    planName: string;
    description?: string;
    baseAmount: number;
    taxRate: number;
    taxAmount: number;
    totalAmount: number;
    amountPaid: number;
    balanceDue: number;
    currency: string;
  };
  payment?: {
    gateway?: string;
    paymentId?: string | null;
    orderId?: string | null;
    paymentMethod?: string | null;
    paymentDate?: Date | string | null;
    status?: string;
  } | null;
  notes?: string;
}

export function formatINR(val: number): string {
  return "INR " + Number(val || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export async function generateInvoicePdf(
  data: InvoicePdfData
): Promise<{ filePath: string; relativeUrl: string }> {
  const uploadsDir = getUploadsDir();
  const invoicesDir = path.join(uploadsDir, "invoices");
  if (!fs.existsSync(invoicesDir)) {
    fs.mkdirSync(invoicesDir, { recursive: true });
  }

  const safeFilename = `${data.invoiceNumber.replace(/[^a-zA-Z0-9_-]/g, "_")}.pdf`;
  const filePath = path.join(invoicesDir, safeFilename);
  const relativeUrl = `/uploads/invoices/${safeFilename}`;

  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({
      size: "A4",
      margin: 40,
      info: {
        Title: `Invoice ${data.invoiceNumber} - The Luxe Yatra`,
        Author: "The Luxe Yatra Worldwide Travels & Resorts",
        Subject: `Membership Invoice ${data.invoiceNumber}`,
      },
    });

    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    const goldColor = "#C88A1E";
    const darkNavy = "#0E2A3A";
    const charCoal = "#333333";
    const lightGray = "#F5F5F5";
    const borderColor = "#E5E5E5";

    // 1. HEADER BRANDING & INVOICE TITLE
    doc
      .fontSize(22)
      .fillColor(darkNavy)
      .font("Helvetica-Bold")
      .text("THE LUXE YATRA", 40, 40);

    doc
      .fontSize(9)
      .font("Helvetica")
      .fillColor(goldColor)
      .text("WORLDWIDE TRAVELS & RESORTS", 40, 66);

    const isPaid = data.status === "PAID";
    const isTaxInvoice = data.invoiceType === "TAX_INVOICE";
    const docTitle = isTaxInvoice ? "TAX INVOICE" : "PRO FORMA INVOICE";

    doc
      .fontSize(16)
      .font("Helvetica-Bold")
      .fillColor(darkNavy)
      .text(docTitle, 350, 40, { align: "right" });

    // Status Badge Box
    const badgeText = isPaid ? "STATUS: PAID" : "STATUS: UNPAID / PENDING";
    const badgeColor = isPaid ? "#166534" : "#B45309";
    const badgeBg = isPaid ? "#DCFCE7" : "#FEF3C7";

    doc
      .rect(420, 62, 135, 20)
      .fillAndStroke(badgeBg, borderColor);

    doc
      .fontSize(8.5)
      .font("Helvetica-Bold")
      .fillColor(badgeColor)
      .text(badgeText, 420, 67, { width: 135, align: "center" });

    // Decorative Line
    doc
      .moveTo(40, 95)
      .lineTo(555, 95)
      .strokeColor(goldColor)
      .lineWidth(1.5)
      .stroke();

    // 2. INVOICE META & PARTICULARS
    const formattedDate = new Date(data.invoiceDate).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    doc.fontSize(9).font("Helvetica-Bold").fillColor(charCoal);
    doc.text(`Invoice No: `, 40, 110);
    doc.font("Helvetica").text(data.invoiceNumber, 105, 110);

    doc.font("Helvetica-Bold").text(`Invoice Date: `, 40, 125);
    doc.font("Helvetica").text(formattedDate, 105, 125);

    if (data.dueDate) {
      const dueStr = new Date(data.dueDate).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
      doc.font("Helvetica-Bold").text(`Due Date: `, 40, 140);
      doc.font("Helvetica").text(dueStr, 105, 140);
    }

    doc.font("Helvetica-Bold").text(`Place of Supply: `, 340, 110);
    doc.font("Helvetica").text(data.client.city || "Maharashtra (27)", 420, 110);

    doc.font("Helvetica-Bold").text(`Currency: `, 340, 125);
    doc.font("Helvetica").text("INR (Indian Rupee)", 420, 125);

    // 3. TWO-COLUMN: SELLER & BUYER
    const boxY = 160;
    const boxHeight = 115;
    const colWidth = 248;

    // Seller Box
    doc
      .rect(40, boxY, colWidth, boxHeight)
      .fillAndStroke("#FAFAFA", borderColor);

    doc
      .fontSize(9.5)
      .font("Helvetica-Bold")
      .fillColor(darkNavy)
      .text("ISSUED BY (SERVICE PROVIDER)", 50, boxY + 10);

    doc.fontSize(8.5).font("Helvetica-Bold").fillColor(charCoal);
    doc.text(COMPANY_CONFIG.legalName, 50, boxY + 26, { width: 228 });

    doc.font("Helvetica").fillColor("#555555");
    doc.text(COMPANY_CONFIG.address, 50, boxY + 48, { width: 228 });
    doc.text(`GSTIN: ${COMPANY_CONFIG.gstin} | PAN: ${COMPANY_CONFIG.pan}`, 50, boxY + 75);
    doc.text(`Email: ${COMPANY_CONFIG.accountsEmail} | Tel: ${COMPANY_CONFIG.phone}`, 50, boxY + 88);

    // Buyer Box
    doc
      .rect(307, boxY, colWidth, boxHeight)
      .fillAndStroke("#FAFAFA", borderColor);

    doc
      .fontSize(9.5)
      .font("Helvetica-Bold")
      .fillColor(darkNavy)
      .text("BILLED TO (MEMBER / CLIENT)", 317, boxY + 10);

    const clientFullName = `${data.client.salutation ? data.client.salutation + " " : ""}${data.client.name}`.trim();
    doc.fontSize(8.5).font("Helvetica-Bold").fillColor(charCoal);
    doc.text(clientFullName, 317, boxY + 26);

    doc.font("Helvetica").fillColor("#555555");
    doc.text(`Client ID: ${data.client.clientCode}`, 317, boxY + 40);
    doc.text(`Email: ${data.client.email}`, 317, boxY + 52);
    doc.text(`Mobile: ${data.client.mobile}`, 317, boxY + 64);
    if (data.client.city) {
      doc.text(`City: ${data.client.city}`, 317, boxY + 76);
    }
    if (data.client.companyName) {
      doc.text(`Company: ${data.client.companyName}`, 317, boxY + 88, { width: 228 });
      if (data.client.gstin) {
        doc.text(`Client GSTIN: ${data.client.gstin}`, 317, boxY + 100);
      }
    }

    // 4. MEMBERSHIP PARTICULARS TABLE
    const tableTop = 295;
    // Table Header
    doc
      .rect(40, tableTop, 515, 24)
      .fillAndStroke(darkNavy, darkNavy);

    doc.fontSize(8.5).font("Helvetica-Bold").fillColor("#FFFFFF");
    doc.text("Description", 50, tableTop + 7);
    doc.text("SAC Code", 260, tableTop + 7);
    doc.text("Qty", 325, tableTop + 7);
    doc.text("Taxable Value", 365, tableTop + 7, { width: 85, align: "right" });
    doc.text("Total (INR)", 460, tableTop + 7, { width: 85, align: "right" });

    // Row
    const rowY = tableTop + 24;
    doc
      .rect(40, rowY, 515, 55)
      .fillAndStroke("#FFFFFF", borderColor);

    doc.fontSize(9).font("Helvetica-Bold").fillColor(darkNavy);
    doc.text(data.membership.planName, 50, rowY + 10, { width: 200 });

    doc.fontSize(7.5).font("Helvetica").fillColor("#666666");
    doc.text(
      data.membership.description || "Annual Luxury Membership Program & Concierge Privileges",
      50,
      rowY + 24,
      { width: 200 }
    );

    doc.fontSize(8.5).font("Helvetica").fillColor(charCoal);
    doc.text("998553", 260, rowY + 14);
    doc.text("1", 330, rowY + 14);
    doc.text(formatINR(data.membership.baseAmount), 365, rowY + 14, { width: 85, align: "right" });
    doc.text(formatINR(data.membership.totalAmount), 460, rowY + 14, { width: 85, align: "right" });

    // 5. TAX BREAKDOWN & TOTAL SUMMARY
    const calcY = rowY + 65;
    const calcWidth = 240;
    const calcX = 315;

    doc.rect(calcX, calcY, calcWidth, 120).fillAndStroke("#FAFAFA", borderColor);

    const halfGst = data.membership.taxAmount / 2;

    doc.fontSize(8.5).font("Helvetica").fillColor(charCoal);
    doc.text("Subtotal (Taxable Amount):", calcX + 10, calcY + 10);
    doc.text(formatINR(data.membership.baseAmount), calcX + 130, calcY + 10, { width: 100, align: "right" });

    doc.text("CGST @ 9%:", calcX + 10, calcY + 26);
    doc.text(formatINR(halfGst), calcX + 130, calcY + 26, { width: 100, align: "right" });

    doc.text("SGST @ 9%:", calcX + 10, calcY + 42);
    doc.text(formatINR(halfGst), calcX + 130, calcY + 42, { width: 100, align: "right" });

    doc.moveTo(calcX + 10, calcY + 58).lineTo(calcX + 230, calcY + 58).strokeColor(borderColor).stroke();

    doc.fontSize(9.5).font("Helvetica-Bold").fillColor(darkNavy);
    doc.text("Total Payable (Incl. GST):", calcX + 10, calcY + 66);
    doc.text(formatINR(data.membership.totalAmount), calcX + 130, calcY + 66, { width: 100, align: "right" });

    doc.fontSize(8.5).font("Helvetica-Bold").fillColor(isPaid ? "#166534" : "#B45309");
    doc.text("Amount Paid:", calcX + 10, calcY + 84);
    doc.text(formatINR(data.membership.amountPaid), calcX + 130, calcY + 84, { width: 100, align: "right" });

    doc.fontSize(8.5).font("Helvetica-Bold").fillColor(charCoal);
    doc.text("Balance Due:", calcX + 10, calcY + 100);
    doc.text(formatINR(data.membership.balanceDue), calcX + 130, calcY + 100, { width: 100, align: "right" });

    // Left Column: PAYMENT / TRANSACTION VERIFICATION
    const payBoxY = calcY;
    doc.rect(40, payBoxY, 260, 120).fillAndStroke("#FAFAFA", borderColor);

    doc.fontSize(9).font("Helvetica-Bold").fillColor(darkNavy);
    doc.text("PAYMENT RECONCILIATION", 50, payBoxY + 10);

    doc.fontSize(8).font("Helvetica").fillColor(charCoal);
    doc.text(`Gateway: ${data.payment?.gateway || "Razorpay Payment Gateway"}`, 50, payBoxY + 26);
    doc.text(`Transaction Ref: ${data.payment?.paymentId || "N/A (Pending)"}`, 50, payBoxY + 40, { width: 240 });
    if (data.payment?.orderId) {
      doc.text(`Order Reference: ${data.payment.orderId}`, 50, payBoxY + 54, { width: 240 });
    }
    const payDateStr = data.payment?.paymentDate
      ? new Date(data.payment.paymentDate).toLocaleString("en-IN")
      : (isPaid ? formattedDate : "Pending Completion");
    doc.text(`Payment Timestamp: ${payDateStr}`, 50, payBoxY + 68);
    doc.text(`Payment Status: ${data.payment?.status || (isPaid ? "SUCCESSFUL" : "UNPAID")}`, 50, payBoxY + 82);

    // 6. TERMS & FOOTER
    const termsY = calcY + 135;
    doc.moveTo(40, termsY).lineTo(555, termsY).strokeColor(goldColor).lineWidth(1).stroke();

    doc.fontSize(8).font("Helvetica-Bold").fillColor(darkNavy);
    doc.text("TERMS & CONDITIONS", 40, termsY + 10);

    doc.fontSize(7.5).font("Helvetica").fillColor("#666666");
    doc.text(
      "1. All Luxe Club membership fees are subject to verification and activation as per company charter.\n" +
      "2. This document is electronically generated and digitally authenticated. No signature required.\n" +
      "3. Tax treatment verified under Section 9 of the CGST Act 2017. For enquiries, contact accounts@theluxeyatra.com.",
      40,
      termsY + 22,
      { width: 515, lineGap: 3 }
    );

    // Support footer bar
    const footerY = 790;
    doc.rect(40, footerY, 515, 20).fill(lightGray);
    doc
      .fontSize(7.5)
      .font("Helvetica")
      .fillColor("#777777")
      .text(
        "The Luxe Yatra Worldwide Travels & Resorts | Concierge Desk: +91 22 6985 4000 | https://theluxeyatra.com",
        40,
        footerY + 5,
        { width: 515, align: "center" }
      );

    doc.end();

    writeStream.on("finish", () => {
      resolve({ filePath, relativeUrl });
    });

    writeStream.on("error", (err) => {
      reject(err);
    });
  });
}
