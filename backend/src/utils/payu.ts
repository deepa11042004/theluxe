import crypto from "crypto";

export function getPayuConfig() {
  const live = (process.env.PAYU_MODE || "test").trim().toLowerCase() === "live";
  const key = ((live ? process.env.PAYU_LIVE_KEY : process.env.PAYU_TEST_KEY) || "").trim();
  const salt = ((live ? process.env.PAYU_LIVE_SALT : process.env.PAYU_TEST_SALT) || "").trim();
  const paymentUrl = live ? "https://secure.payu.in/_payment" : "https://test.payu.in/_payment";
  // Optional override; when empty the website's own address is taken from the incoming request (never a hardcoded localhost).
  const callbackBase = (process.env.PAYU_CALLBACK_BASE_URL || "").trim().replace(/\/+$/, "");
  const verifyUrl = live
    ? "https://info.payu.in/merchant/postservice.php?form=2"
    : "https://test.payu.in/merchant/postservice.php?form=2";
  return { live, key, salt, paymentUrl, callbackBase, verifyUrl };
}

export interface PayuTransactionDetails {
  status: string;
  mihpayid: string;
  amount: number;
  mode: string | null;
  unmappedstatus: string;
  errorCode: string | null;
  errorMessage: string;
  rawJson: string;
}

// Server-to-server status lookup, used to complete payments whose browser return trip never reached us.
export async function verifyPayuTransaction(txnid: string): Promise<PayuTransactionDetails | null> {
  const { key, salt, verifyUrl } = getPayuConfig();
  const command = "verify_payment";
  const hash = sha512([key, command, txnid, salt].join("|"));

  const response = await fetch(verifyUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ key, command, var1: txnid, hash }).toString(),
  });
  if (!response.ok) throw new Error(`PayU verify_payment HTTP ${response.status}`);

  const json: any = await response.json();
  const d = json?.transaction_details?.[txnid];
  if (!d) return null;

  const errorMessage = String(d.error_Message || "").trim();
  return {
    status: String(d.status || "").toLowerCase(),
    mihpayid: String(d.mihpayid || ""),
    amount: Number(d.amt),
    mode: d.mode ? String(d.mode) : null,
    unmappedstatus: String(d.unmappedstatus || ""),
    errorCode: d.error_code ? String(d.error_code) : null,
    errorMessage: /^no error$/i.test(errorMessage) ? "" : errorMessage,
    rawJson: JSON.stringify({
      mihpayid: d.mihpayid,
      mode: d.mode,
      status: d.status,
      unmappedstatus: d.unmappedstatus,
      txnid,
      amount: d.amt,
      bank_ref_num: d.bank_ref_num,
      error_code: d.error_code,
      error_Message: d.error_Message,
      addedon: d.addedon,
      verifiedVia: "verify_payment",
    }),
  };
}

function sha512(input: string): string {
  return crypto.createHash("sha512").update(input).digest("hex");
}

export function formatAmount(amount: number): string {
  return amount.toFixed(2);
}

// PayU rejects many special characters in these fields.
export function sanitizeField(value: string, max = 100): string {
  return value.replace(/[^a-zA-Z0-9 .\-_@]/g, "").trim().slice(0, max);
}

export function generateTxnId(): string {
  return `LY${Date.now()}${crypto.randomBytes(3).toString("hex")}`;
}

interface RequestHashInput {
  txnid: string;
  amount: string;
  productinfo: string;
  firstname: string;
  email: string;
}

export function buildRequestHash(input: RequestHashInput): string {
  const { key, salt } = getPayuConfig();
  // key|txnid|amount|productinfo|firstname|email|udf1..udf5||||||salt
  return sha512(
    [key, input.txnid, input.amount, input.productinfo, input.firstname, input.email, "", "", "", "", "", "", "", "", "", "", salt].join("|")
  );
}

export function verifyResponseHash(body: Record<string, any>): boolean {
  const { key, salt } = getPayuConfig();
  const received = String(body.hash || "").toLowerCase();
  if (!received) return false;

  const field = (name: string) => (body[name] === undefined || body[name] === null ? "" : String(body[name]));
  // [additionalCharges|]salt|status||||||udf5|udf4|udf3|udf2|udf1|email|firstname|productinfo|amount|txnid|key
  const parts = [
    salt,
    field("status"),
    field("udf10"),
    field("udf9"),
    field("udf8"),
    field("udf7"),
    field("udf6"),
    field("udf5"),
    field("udf4"),
    field("udf3"),
    field("udf2"),
    field("udf1"),
    field("email"),
    field("firstname"),
    field("productinfo"),
    field("amount"),
    field("txnid"),
    key,
  ];
  if (body.additionalCharges) parts.unshift(field("additionalCharges"));

  const expected = sha512(parts.join("|"));
  const a = Buffer.from(expected);
  const b = Buffer.from(received);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
