export interface PlanPricing {
  name: string;
  code: string;
  description: string;
  baseAmount: number;
  taxRate: number; // 18%
  taxAmount: number;
  totalAmount: number;
  totalAmountPaise: number;
  currency: string;
}

export const MEMBERSHIP_PLANS: Record<string, PlanPricing> = {
  "Luxe Signature Membership": {
    name: "Luxe Signature Membership",
    code: "SIGNATURE",
    description:
      "Annual membership offering access to 500+ curated luxury resort partner estates, bespoke reservation services, and member dining privileges.",
    baseAmount: 150000,
    taxRate: 18.0,
    taxAmount: 27000,
    totalAmount: 177000,
    totalAmountPaise: 17700000,
    currency: "INR",
  },
  "Luxe Prestige Membership": {
    name: "Luxe Prestige Membership",
    code: "PRESTIGE",
    description:
      "Elite tier membership with dedicated 24/7 personal concierge, complimentary room upgrades, private airport transfers, and invitation-only global events.",
    baseAmount: 250000,
    taxRate: 18.0,
    taxAmount: 45000,
    totalAmount: 295000,
    totalAmountPaise: 29500000,
    currency: "INR",
  },
  "Luxe Black Membership (Limited Edition)": {
    name: "Luxe Black Membership (Limited Edition)",
    code: "BLACK",
    description:
      "Ultra-exclusive membership with private aviation coordination, yacht charters, bespoke VIP host assignment, and uncapped luxury travel benefits.",
    baseAmount: 500000,
    taxRate: 18.0,
    taxAmount: 90000,
    totalAmount: 590000,
    totalAmountPaise: 59000000,
    currency: "INR",
  },
};

// Development-only plan for end-to-end payment testing; rejected when NODE_ENV=production (see saveRegistrationClient).
export const TEST_PLAN_NAME = "Luxe Test Plan (Rs 1)";

MEMBERSHIP_PLANS[TEST_PLAN_NAME] = {
  name: TEST_PLAN_NAME,
  code: "TEST",
  description: "Development-only test plan used to verify the payment flow with a Rs 1 transaction.",
  baseAmount: 0.85,
  taxRate: 18.0,
  taxAmount: 0.15,
  totalAmount: 1,
  totalAmountPaise: 100,
  currency: "INR",
};

export function getPlanPricing(planName?: string): PlanPricing {
  if (!planName) {
    return MEMBERSHIP_PLANS["Luxe Signature Membership"];
  }

  // Exact match
  if (MEMBERSHIP_PLANS[planName]) {
    return MEMBERSHIP_PLANS[planName];
  }

  // Fuzzy match
  const lower = planName.toLowerCase();
  if (lower.includes("black")) {
    return MEMBERSHIP_PLANS["Luxe Black Membership (Limited Edition)"];
  }
  if (lower.includes("prestige")) {
    return MEMBERSHIP_PLANS["Luxe Prestige Membership"];
  }
  return MEMBERSHIP_PLANS["Luxe Signature Membership"];
}

export const COMPANY_CONFIG = {
  legalName:
    process.env.COMPANY_NAME ||
    "The Luxe Yatra Worldwide Travels & Resorts Private Limited",
  brandName: "The Luxe Yatra",
  address:
    process.env.COMPANY_ADDRESS ||
    "293, Lane 2, Westend Marg, Saket, New Delhi - 110030, India",
  gstin: process.env.COMPANY_GSTIN || "27AABCT8921M1ZQ",
  email: process.env.COMPANY_EMAIL || "info@theluxeyatra.com",
  accountsEmail: process.env.ACCOUNTS_EMAIL || "info@theluxeyatra.com",
  phone: process.env.COMPANY_PHONE || "+91 8796605843",
  website: process.env.COMPANY_WEBSITE || "https://theluxeyatra.com",
  cin: process.env.COMPANY_CIN || "U63040MH2024PTC392810",
  pan: process.env.COMPANY_PAN || "AABCT8921M",
};
