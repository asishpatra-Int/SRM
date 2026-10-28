import type {TextStyle} from "react-native";

export const typography = {
  heading: {
    fontSize: 36,
    fontWeight: "300",
    letterSpacing: -0.36,
    textTransform: "capitalize",
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "700",
    letterSpacing: -0.24,
  },
  cardSubtitle: {
    fontSize: 16,
    fontWeight: "300",
    letterSpacing: -0.16,
  },
  listItemTitleSemibold: {
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: -0.18,
  },
  listItemTitleMedium: {
    fontSize: 18,
    fontWeight: "500",
    letterSpacing: -0.18,
  },
  durationLabel: {
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: -0.14,
  },
  badgeText: {
    fontSize: 14,
    letterSpacing: -0.14,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: "600",
  },
  sheetTitle: {
    fontSize: 32,
    fontWeight: "300",
    letterSpacing: -0.32,
    textAlign: "center",
  },
  sheetMessage: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 23,
    textAlign: "center",
  },
  ctaLabel: {
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: -0.5,
    textAlign: "center",
  },
  exitLabel: {
    fontSize: 12,
    fontWeight: "600",
  },
  timeLabel: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: -0.1,
  },
  moodLabel: {
    fontSize: 48,
    fontWeight: "600",
    letterSpacing: -0.48,
    textAlign: "center",
  },
  sliderEndLabel: {
    fontSize: 14,
    fontWeight: "500",
    letterSpacing: -0.14,
  },
  chipLabel: {
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: -1,
    textTransform: "capitalize",
  },
  noteLabel: {
    fontSize: 16,
    fontWeight: "500",
    letterSpacing: -0.16,
  },
  pageHeading: {
    fontSize: 21,
    fontWeight: "600",
    lineHeight: 28,
  },
  sectionLabel: {
    fontSize: 18,
    fontWeight: "400",
  },
  trackMeta: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
  },
  filterChipLabel: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 21,
  },
  resetFiltersLabel: {
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center",
  },
  detailTitle: {
    fontSize: 32,
    fontWeight: "400",
    lineHeight: 40,
    textTransform: "capitalize",
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 21,
    textTransform: "capitalize",
  },
  detailBody: {
    fontSize: 14,
    fontWeight: "400",
    lineHeight: 20,
  },
  splashWelcome: {
    fontSize: 32,
    fontWeight: "400",
    lineHeight: 40,
    letterSpacing: -0.32,
    textAlign: "center",
  },
  onboardingBody: {
    fontSize: 21,
    fontWeight: "400",
    lineHeight: 28,
    textAlign: "center",
  },
  inputText: {
    fontSize: 18,
    fontWeight: "400",
  },
  dividerLabel: {
    fontSize: 12,
    fontWeight: "500",
  },
} as const satisfies Record<string, TextStyle>;
