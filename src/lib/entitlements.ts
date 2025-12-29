export type Plan = "FREE" | "PAID" | "ADMIN";

export type Entitlements = {
  plan: Plan;
  canExportPdf: boolean;
  exportLimitPerDay: number; // FREE: 1/day; PAID/ADMIN: 999/day
  watermarkOnExports: boolean; // FREE true, PAID false
};

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS || "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export function getEntitlements(plan: Plan, email?: string | null): Entitlements {
  // ✅ Email-based admin override
  if (email && ADMIN_EMAILS.includes(email.toLowerCase())) {
    return { plan: "ADMIN", canExportPdf: true, exportLimitPerDay: 999, watermarkOnExports: false };
  }

  if (plan === "ADMIN") {
    return { plan, canExportPdf: true, exportLimitPerDay: 999, watermarkOnExports: false };
  }

  if (plan === "PAID") {
    return { plan, canExportPdf: true, exportLimitPerDay: 999, watermarkOnExports: false };
  }

  return { plan: "FREE", canExportPdf: true, exportLimitPerDay: 1, watermarkOnExports: true };
}
