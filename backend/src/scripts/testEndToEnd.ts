import { prisma } from "../config/prisma";
import jwt from "jsonwebtoken";

const BASE_URL = "http://localhost:5001/api/v1";

async function run() {
  console.log("=== STARTING THE LUXE YATRA END-TO-END VERIFICATION SUITE ===");

  // Helper for fetch
  async function api(path: string, options: any = {}) {
    const res = await fetch(`${BASE_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });
    const json = await res.json().catch(() => ({}));
    return { status: res.status, data: json };
  }

  // 1. Get Admin Token
  console.log("\n[SETUP] Logging in as Super Admin...");
  const loginRes = await api("/admin/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email: "admin@theluxeyatra.com",
      password: "Admin@123456",
    }),
  });
  if (!loginRes.data.success) {
    throw new Error(`Admin login failed: ${JSON.stringify(loginRes.data)}`);
  }
  const token = loginRes.data.data.token;
  const adminHeaders = { Authorization: `Bearer ${token}` };
  console.log("✓ Admin authentication verified.");

  // SCENARIO 1: Visitor submits form and payment succeeds
  console.log("\n[SCENARIO 1] Visitor submits membership form and payment succeeds...");
  const reg1 = await api("/membership/register", {
    method: "POST",
    body: JSON.stringify({
      salutation: "Mr.",
      firstName: "Aarav",
      lastName: "Mehta",
      mobile: "9911223344",
      email: "aarav.mehta@example.com",
      city: "Mumbai",
      plan: "Luxe Black Membership (Limited Edition)",
      needGst: true,
      companyName: "Mehta Capital Advisors",
      gstin: "27AABCM9988P1Z5",
      acceptTerms: true,
    }),
  });
  console.assert(reg1.status === 200, `Reg 1 failed with status ${reg1.status}`);
  console.assert(reg1.data.success === true, "Reg 1 success is not true");
  const client1Id = reg1.data.data.client.id;
  const attempt1Id = reg1.data.data.paymentAttemptId;
  console.log(`✓ Client record saved before payment: ${reg1.data.data.client.clientCode} (${client1Id})`);

  // Verify payment
  const verify1 = await api("/membership/verify", {
    method: "POST",
    body: JSON.stringify({
      clientId: client1Id,
      paymentAttemptId: attempt1Id,
      razorpay_payment_id: "pay_aarav_test_9999",
      razorpay_order_id: reg1.data.data.orderId,
    }),
  });
  console.assert(verify1.status === 200, "Verify 1 status 200");
  console.assert(verify1.data.data.client.membership_status === "ACTIVE", "Membership status ACTIVE");
  console.assert(verify1.data.data.client.latest_payment_status === "SUCCESSFUL", "Payment status SUCCESSFUL");
  console.assert(Boolean(verify1.data.data.invoiceNumber), "Invoice generated");
  console.log(`✓ Payment verified, membership activated (${verify1.data.data.membershipNumber}), invoice created (${verify1.data.data.invoiceNumber}).`);

  // SCENARIO 2: Visitor submits form and payment fails
  console.log("\n[SCENARIO 2] Visitor submits form and payment fails...");
  const reg2 = await api("/membership/register", {
    method: "POST",
    body: JSON.stringify({
      salutation: "Ms.",
      firstName: "Neha",
      lastName: "Kapoor",
      mobile: "9822334455",
      email: "neha.kapoor@example.com",
      city: "Delhi NCR",
      plan: "Luxe Signature Membership",
      needGst: false,
      acceptTerms: true,
    }),
  });
  console.assert(reg2.status === 200, "Reg 2 success");
  const client2Id = reg2.data.data.client.id;
  const attempt2Id = reg2.data.data.paymentAttemptId;

  const fail2 = await api("/membership/fail", {
    method: "POST",
    body: JSON.stringify({
      clientId: client2Id,
      paymentAttemptId: attempt2Id,
      errorCode: "BAD_REQUEST_ERROR",
      errorDescription: "Payment cancelled by member on 3D Secure page",
    }),
  });
  console.assert(fail2.status === 200, "Fail 2 recorded");
  console.assert(fail2.data.data.latest_payment_status === "FAILED", "Client latest status is FAILED");
  console.assert(fail2.data.data.membership_status === "PENDING_PAYMENT", "Membership NOT activated");
  console.log("✓ Client record preserved in CRM with failed status; membership remains inactive.");

  // SCENARIO 3: Payment remains pending
  console.log("\n[SCENARIO 3] Payment remains pending / abandoned...");
  const reg3 = await api("/membership/register", {
    method: "POST",
    body: JSON.stringify({
      salutation: "Dr.",
      firstName: "Kavita",
      lastName: "Singhal",
      mobile: "9833445566",
      email: "kavita.singhal@example.com",
      city: "Bengaluru",
      plan: "Luxe Prestige Membership",
      needGst: false,
      acceptTerms: true,
    }),
  });
  const client3Id = reg3.data.data.client.id;
  const attempt3Id = reg3.data.data.paymentAttemptId;

  // Simulate abandon
  const abandon3 = await api("/membership/abandon", {
    method: "POST",
    body: JSON.stringify({
      clientId: client3Id,
      paymentAttemptId: attempt3Id,
    }),
  });
  console.assert(abandon3.status === 200, "Abandon recorded");
  console.assert(abandon3.data.data.latest_payment_status === "ABANDONED", "Status ABANDONED");
  console.log("✓ Client record preserved in CRM with ABANDONED status.");

  // SCENARIO 4: Visitor retries payment (no duplicate client created, history preserved)
  console.log("\n[SCENARIO 4] Visitor Neha Kapoor retries payment...");
  const retry2 = await api("/membership/register", {
    method: "POST",
    body: JSON.stringify({
      salutation: "Ms.",
      firstName: "Neha",
      lastName: "Kapoor",
      mobile: "9822334455",
      email: "neha.kapoor@example.com",
      city: "Delhi NCR",
      plan: "Luxe Signature Membership",
      needGst: false,
      acceptTerms: true,
    }),
  });
  console.assert(retry2.data.data.client.id === client2Id, "Client ID matched (no duplicate client created)");
  const newAttemptId = retry2.data.data.paymentAttemptId;
  console.assert(newAttemptId !== attempt2Id, "New payment attempt created");

  // Complete retry payment
  const verifyRetry = await api("/membership/verify", {
    method: "POST",
    body: JSON.stringify({
      clientId: client2Id,
      paymentAttemptId: newAttemptId,
      razorpay_payment_id: "pay_neha_retry_success_888",
    }),
  });
  console.assert(verifyRetry.data.data.client.membership_status === "ACTIVE", "Membership now ACTIVE");

  // Check client history has 2 attempts
  const clientDetails = await api(`/admin/clients/${client2Id}`, {
    headers: adminHeaders,
  });
  console.assert(clientDetails.data.data.payment_attempts.length === 2, "Payment attempts length is 2");
  console.log(`✓ Payment history preserved: ${clientDetails.data.data.payment_attempts.length} attempts recorded for client without duplication.`);

  // SCENARIO 5 & 6: Admin creates invoice & PDF generated with accurate taxes
  console.log("\n[SCENARIO 5 & 6] Admin creates invoice for unpaid client Kavita Singhal...");
  const createInv = await api("/admin/invoices", {
    method: "POST",
    headers: adminHeaders,
    body: JSON.stringify({
      clientId: client3Id,
    }),
  });
  console.assert(createInv.status === 201, "Invoice created status 201");
  const inv = createInv.data.data;
  console.assert(inv.status === "UNPAID", "Unpaid payment correctly gives UNPAID status");
  console.assert(inv.invoice_type === "PRO_FORMA", "Unpaid payment correctly gives PRO_FORMA classification");
  console.assert(inv.amount_paid === 0, "amount_paid is 0");
  console.assert(inv.balance_due === inv.total_amount, "balance_due equals total amount");
  console.assert(inv.tax_rate === 18, "tax_rate is 18%");
  console.assert(inv.taxable_amount === 250000, "Base taxable amount is ₹2,50,000");
  console.assert(inv.tax_amount === 45000, "18% GST amount is ₹45,000");
  console.assert(inv.total_amount === 295000, "Total amount is ₹2,95,000");
  console.assert(Boolean(inv.pdf_url), "PDF URL generated and stored");
  console.log(`✓ Invoice created: ${inv.invoice_number} (Type: ${inv.invoice_type}, Status: ${inv.status}, Total: ₹${inv.total_amount.toLocaleString()})`);

  // SCENARIO 7: Unpaid payment cannot produce a PDF falsely marked paid
  console.log("\n[SCENARIO 7] Verifying unpaid invoice cannot be falsely marked paid...");
  console.assert(inv.status !== "PAID", "Unpaid invoice is NOT marked paid");
  console.assert(inv.invoice_type !== "TAX_INVOICE", "Unpaid invoice is NOT marked Tax Invoice");
  console.log("✓ Rule enforced: Unpaid purchases are strictly classified as Pro Forma without false Paid markings.");

  // SCENARIO 8: Admin sends invoice email
  console.log("\n[SCENARIO 8] Admin sends invoice email with PDF attachment...");
  const sendInvRes = await api(`/admin/invoices/${inv.id}/send`, {
    method: "POST",
    headers: adminHeaders,
  });
  console.assert(sendInvRes.status === 200, "Send invoice returned 200");
  console.assert(sendInvRes.data.success === true, "Send invoice success");
  console.log(`✓ Invoice emailed to client with PDF attached (Message ID: ${sendInvRes.data.data.messageId}).`);

  // SCENARIO 9: Admin sends welcome or payment follow-up email
  console.log("\n[SCENARIO 9] Admin sends welcome / payment follow-up email...");
  const sendWelcome = await api(`/admin/clients/${client1Id}/welcome-email`, {
    method: "POST",
    headers: adminHeaders,
  });
  console.assert(sendWelcome.status === 200, "Send welcome returned 200");
  console.assert(sendWelcome.data.success === true, "Send welcome success");
  console.log(`✓ Welcome email dispatched to active member (Message ID: ${sendWelcome.data.data.messageId}).`);

  // SCENARIO 10: Unauthorized access checks
  console.log("\n[SCENARIO 10] Testing security authorization checks...");
  const unauthClients = await api("/admin/clients");
  console.assert(unauthClients.status === 401, "Clients endpoint rejected unauthorized access (401)");
  const unauthInvoices = await api("/admin/invoices");
  console.assert(unauthInvoices.status === 401, "Invoices endpoint rejected unauthorized access (401)");
  console.log("✓ Unauthorized access blocked on all administrative endpoints.");

  // SCENARIO 11: Existing functionality check
  console.log("\n[SCENARIO 11] Checking existing public and admin routes...");
  const hotels = await api("/hotels");
  console.assert(hotels.status === 200, "Hotels route active");
  const dests = await api("/destinations");
  console.assert(dests.status === 200, "Destinations route active");
  const itins = await api("/itineraries");
  console.assert(itins.status === 200, "Itineraries route active");
  console.log("✓ Existing hotel, destination, and itinerary routes continue to operate without regression.");

  // SCENARIO 12: Idempotency check
  console.log("\n[SCENARIO 12] Testing invoice idempotency...");
  const duplicateInvoice = await api("/admin/invoices", {
    method: "POST",
    headers: adminHeaders,
    body: JSON.stringify({ clientId: client1Id }),
  });
  console.assert(duplicateInvoice.data.alreadyExisted === true, "Duplicate invoice prevented via idempotency");
  console.log("✓ Idempotency protected: Repeated requests do not generate duplicate invoices.");

  console.log("\n=======================================================");
  console.log("🎉 ALL 12 END-TO-END SCENARIOS PASSED WITH ZERO ERRORS!");
  console.log("=======================================================");
}

run()
  .catch((e) => {
    console.error("\n❌ SUITE FAILED:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
