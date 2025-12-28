export type Plan = 'FREE' | 'PAID' | 'ADMIN';

export type Entitlements = {
  plan: Plan;
  canExportPdf: boolean;
  exportLimitPerDay: number; // FREE: e.g. 1/day; PAID: unlimited (999)
  watermarkOnExports: boolean; // FREE true, PAID false
};

export function getEntitlements(plan: Plan): Entitlements {
  if (plan === 'ADMIN') {
    return { plan, canExportPdf: true, exportLimitPerDay: 999, watermarkOnExports: false };
  }
  if (plan === 'PAID') {
    return { plan, canExportPdf: true, exportLimitPerDay: 999, watermarkOnExports: false };
  }
  return { plan: 'FREE', canExportPdf: true, exportLimitPerDay: 1, watermarkOnExports: true };
}
