export const colors = {
  background: "#25005D",
  backgroundOverlay: "rgba(37, 37, 37, 0.55)",
  heroGradient: [
    "rgba(212, 212, 212, 0)",
    "rgba(81, 53, 123, 0.752)",
    "rgba(53, 19, 104, 0.912)",
    "#25005D",
  ] as const,
  cardGradient: [
    "rgba(37, 2, 89, 0.52)",
    "rgba(53, 25, 104, 0.52)",
    "rgba(86, 72, 134, 0.52)",
    "rgba(237, 182, 102, 0.52)",
  ] as const,
  sessionGradient: [
    "#2B1A6C",
    "rgba(48, 33, 107, 0.91)",
    "rgba(63, 52, 106, 0.654)",
    "rgba(102, 102, 102, 0)",
    "rgba(54, 41, 107, 0.808)",
    "#2B1A6C",
  ] as const,
  sessionCardGradient: [
    "rgba(37, 2, 89, 0.5)",
    "rgba(237, 182, 102, 0.5)",
  ] as const,
  sessionBackgroundBase: "#331F69",
  textPrimary: "#FAF9FF",
  textOnDark: "#FFFFFF",
  accentGold: "#EDB666",
  borderPurple: "#47348C",
  glassLight: "rgba(255, 255, 255, 0.1)",
  glassFaint: "rgba(255, 255, 255, 0.04)",
  glassBorder: "rgba(255, 255, 255, 0.16)",
  // Figma "window glass" inset highlight: inset 0 1px 1px #FFFFFF99.
  glassHighlight: "rgba(255, 255, 255, 0.6)",
  badgeBackground: "rgba(34, 23, 70, 0.4)",
  tabBarTint: "rgba(37, 37, 37, 0.4)",
  tabActivePill: "rgba(255, 255, 255, 0.06)",
  shadowColor: "rgba(0, 0, 0, 0.05)",
  // Figma value — the design leans entirely on the backdrop blur for the
  // sheet's weight, so this tint is nearly transparent on its own. Used on iOS.
  sheetBackground: "rgba(53, 31, 111, 0.08)",
  // Android only: a React Native Modal is its own window there, so a backdrop
  // blur has nothing of the screen behind it to sample. Same hue, carrying the
  // sheet's weight itself instead of relying on a blur that cannot happen.
  sheetBackgroundAndroid: "rgba(53, 31, 111, 0.92)",
  sheetScrim: "rgba(0, 0, 0, 0.45)",
  ctaTextDark: "#250259",
  timeLabelDark: "#321556",
  progressTrackFaint: "rgba(32, 19, 47, 0.4)",
  progressFillFrom: "#FFFFFF",
  progressFillTo: "#FF9822",
  equalizerBar: "rgba(255, 255, 255, 0.85)",
  moodGradient: ["#2B1A6C", "rgba(102, 102, 102, 0)"] as const,
  moodSliderTrack: "rgba(255, 255, 255, 0.14)",
  chipBackground: "rgba(255, 255, 255, 0.2)",
  // Figma's `palette/tone-04` — a design-system token bound to this exact
  // chip component, distinct from the app's CTA gold (accentGold).
  chipBackgroundSelected: "#D89F53",
  noteInputBackground: "rgba(255, 255, 255, 0.08)",
  trackCardBackground: "rgba(255, 255, 255, 0.08)",
  trackActionBackground: "rgba(255, 255, 255, 0.15)",
} as const;
