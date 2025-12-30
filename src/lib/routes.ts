export const ROUTES = {
  landing: "/landing-page",
  signIn: "/sign-in",
  dashboard: "/user-dashboard",
  audit: "/resume-audit-tool",
  resumeBuilder: "/ai-resume-builder",
  coverLetter: "/cover-letter-generator",
  interview: "/interview-preparation",
  freeTools: "/free-tools-hub",
  pricing: "/pricing-plans",
} as const;

export const PUBLIC_ROUTES = new Set<string>([
  ROUTES.landing,
  ROUTES.signIn,
  ROUTES.freeTools,
  ROUTES.pricing,
  "/about-us",
  "/blog",
  "/faq",
  "/help-center",
  "/contact",
  "/privacy-policy",
  "/terms-of-service",
  "/legal",
]);

export const PROTECTED_PREFIXES = [
  "/user-dashboard",
  "/resume-audit-tool",
  "/ai-resume-builder",
  "/cover-letter-generator",
  "/interview-preparation",
  "/linkedin",
];
