// Static auth-screen config. The dummy accounts and OTP live in the mock
// AuthService (src/service/network/api/AuthService.ts).

export const MOCK_COUNTRY_DIAL_CODE = "+91";

export const MOBILE_NUMBER_LENGTH = 10;

export const OTP_LENGTH = 5;

export const OTP_RESEND_SECONDS = 59;

export const ONBOARDING_COPY = {
  title: "Find Yourself",
  body: "Amidst the chaos of life awaits your original self, a bundle of energy and bliss. Sri Guru’s wisdom, meditation and the SRM Community are here for all those set to find themselves.",
  ctaLabel: "Start Exploring",
  secondaryCtaLabel: "Login",
} as const;
