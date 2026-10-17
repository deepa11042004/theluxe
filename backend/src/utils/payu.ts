import crypto from "crypto";

export function getPayuConfig() {
  const key = (process.env.PAYU_KEY || "").trim();
  const salt = (process.env.PAYU_SALT || "").trim();
  const paymentUrl = (process.env.PAYU_PAYMENT_URL || "https://test.payu.in/_payment").trim();
  const callbackBase = (process.env.PAYU_CALLBACK_BASE_URL || "http://localhost:3000").trim().replace(/\/+$/, "");
  return { key, salt, paymentUrl, callbackBase };
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
