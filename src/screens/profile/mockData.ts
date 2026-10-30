// Mock data standing in for the Profile feature's backend/query layer.

import certificateSample from "@/assets/profile-certificate-sample.png";
import type {UserType} from "@/models/auth";

export type PracticeSummaryMock = {
  title: string;
  sessionsLabel: string;
  hoursLabel: string;
};

export type ProfileMock = {
  fullName: string;
  membershipLabel: string;
  // Program and leader chips — SwaRaj Kriya members only.
  programLabel?: string;
  leaderLabel?: string;
  // The "My Kriya" streak — SwaRaj Kriya members only.
  practiceSummary?: PracticeSummaryMock;
  subscriptionStatusLabel: string;
};

// One dummy profile per dummy account type. The SK profile is the one
// Figma 1671:1324 shows.
const MOCK_PROFILES: Record<UserType, ProfileMock> = {
  free: {
    fullName: "Rohan Mehta",
    membershipLabel: "Free Member",
    subscriptionStatusLabel: "Inactive",
  },
  premium: {
    fullName: "Priya Sharma",
    membershipLabel: "Premium Member",
    subscriptionStatusLabel: "Active",
  },
  sk: {
    fullName: "Ananya Bose",
    membershipLabel: "SwaRaj Kriya Member",
    programLabel: "Program P2",
    leaderLabel: "Leader: Sneh Arora",
    practiceSummary: {
      title: "7-Day Streak",
      sessionsLabel: "24 Sessions",
      hoursLabel: "12 Hours of Practice",
    },
    subscriptionStatusLabel: "Active",
  },
};

// Social sign-in has no dummy account yet (user is null), so it gets the
// Free profile — the one with no membership-only sections.
export function getMockProfile(userType: UserType | null | undefined) {
  return MOCK_PROFILES[userType ?? "free"];
}

// Events the member is registered for — ids from the Explore events mock,
// so each card opens the existing Event Details screen.
export const MOCK_REGISTERED_EVENT_IDS = [
  "gita-wisdom-delhi",
  "gita-wisdom-december",
] as const;

export type CertificateMock = {
  id: string;
  title: string;
  issuedOnLabel: string;
  image: number;
};

export const MOCK_CERTIFICATES: CertificateMock[] = [
  {
    id: "certificate-1",
    title: "Certificate Name",
    issuedOnLabel: "12 October 2026",
    image: certificateSample,
  },
  {
    id: "certificate-2",
    title: "Certificate Name",
    issuedOnLabel: "12 October 2026",
    image: certificateSample,
  },
  {
    id: "certificate-3",
    title: "Certificate Name",
    issuedOnLabel: "12 October 2026",
    image: certificateSample,
  },
  {
    id: "certificate-4",
    title: "Certificate Name",
    issuedOnLabel: "12 October 2026",
    image: certificateSample,
  },
];

export type LanguageId = "en" | "hi";

export const LANGUAGE_OPTIONS: {id: LanguageId; label: string}[] = [
  {id: "en", label: "English"},
  {id: "hi", label: "हिंदी"},
];

export type PlanBenefitMock = {
  id: string;
  icon: "leaf" | "sparkles";
  label: string;
};

export type SubscriptionPlanMock = {
  id: string;
  billingLabel: string;
  title: string;
  priceLabel: string;
  priceNote: string;
  memberLimitLabel: string;
  benefits: PlanBenefitMock[];
};

// Figma 1643:13304 offers a single plan.
export const MOCK_SUBSCRIPTION_PLANS: SubscriptionPlanMock[] = [
  {
    id: "srm-annual",
    billingLabel: "Yearly Subscription",
    title: "SRM Annual Plan",
    priceLabel: "₹ 3599/year",
    priceNote: "(Inclusive of Taxes)",
    memberLimitLabel: "Limit Upto One Member Per Login",
    benefits: [
      {id: "meditation-tracks", icon: "leaf", label: "Free Meditation Tracks"},
      {id: "all-content", icon: "sparkles", label: "Access to All Content"},
    ],
  },
];
