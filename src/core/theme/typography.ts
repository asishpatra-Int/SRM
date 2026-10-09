import type { TextStyle } from "react-native";

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
} as const satisfies Record<string, TextStyle>;
